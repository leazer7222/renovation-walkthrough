import type { Config } from "@netlify/functions";

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const serviceUrl = process.env.VISUALIZATION_SERVICE_URL;
  if (!serviceUrl) {
    return Response.json(
      { success: false, message: "VISUALIZATION_SERVICE_URL not configured" },
      { status: 500 },
    );
  }

  const timeout = Number(process.env.VISUALIZATION_TIMEOUT) || 120_000;

  let inForm: FormData;
  try {
    inForm = await request.formData();
  } catch {
    return Response.json({ success: false, message: "Invalid multipart body" }, { status: 400 });
  }

  const dataStr = inForm.get("data");
  if (!dataStr || typeof dataStr !== "string") {
    return Response.json({ success: false, message: "Missing data field" }, { status: 400 });
  }

  let data: {
    roomType?: string;
    stylePreset?: string | { name?: string; imageUrl?: string };
    textPrompt?: string;
    styleInfluence?: number;
    isRefinement?: boolean;
  };
  try {
    data = JSON.parse(dataStr);
  } catch {
    return Response.json({ success: false, message: "Invalid JSON in data field" }, { status: 400 });
  }

  const roomImageFile = inForm.get("roomImage");

  // Re-package for GCP service (mirrors server/src/routes/visualization.ts)
  const outForm = new FormData();
  if (roomImageFile instanceof File) {
    outForm.append("roomImage", roomImageFile);
  }
  if (data.roomType) outForm.append("roomType", data.roomType);
  const stylePreset =
    typeof data.stylePreset === "string"
      ? { name: data.stylePreset }
      : { ...data.stylePreset };
  stylePreset.imageUrl = stylePreset.imageUrl || "https://placeholder.com/style.jpg";
  outForm.append("stylePreset", JSON.stringify(stylePreset));
  if (data.textPrompt) outForm.append("textPrompt", data.textPrompt);
  outForm.append("styleInfluence", String(data.styleInfluence ?? 50));
  outForm.append("isRefinement", String(data.isRefinement ?? false));

  const forwardHeaders: Record<string, string> = {};
  const deviceId = request.headers.get("x-device-id");
  if (deviceId) forwardHeaders["x-device-id"] = deviceId;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const gcpResponse = await fetch(`${serviceUrl}/generate-visualization`, {
      method: "POST",
      headers: forwardHeaders,
      body: outForm,
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!gcpResponse.ok) {
      const text = await gcpResponse.text().catch(() => gcpResponse.statusText);
      return Response.json({ success: false, message: text }, { status: gcpResponse.status });
    }

    const json = (await gcpResponse.json()) as { data?: unknown };
    const payload = json?.data ?? json;
    return Response.json({ success: true, data: payload });
  } catch (err) {
    clearTimeout(timer);
    const message = err instanceof Error ? err.message : "Visualization generation failed";
    return Response.json({ success: false, message }, { status: 500 });
  }
}

export const config: Config = {
  path: "/api/v1/visualization/generate",
};
