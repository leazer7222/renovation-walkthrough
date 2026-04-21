const REFORM_API_BASE = "/api/v1";
const VISUALIZATION_COUNT_KEY = "visualization_call_count";
const VISUALIZATION_LIMIT = 200;

export function getVisualizationCount(): number {
  const count = localStorage.getItem(VISUALIZATION_COUNT_KEY);
  return count ? parseInt(count, 10) : 0;
}

function incrementVisualizationCount() {
  const count = getVisualizationCount();
  localStorage.setItem(VISUALIZATION_COUNT_KEY, (count + 1).toString());
}

export function isVisualizationLimitReached(): boolean {
  return getVisualizationCount() >= VISUALIZATION_LIMIT;
}

/** Returns a stable device ID stored in localStorage (mirrors reform-ai's device tracking). */
function getOrCreateDeviceId(): string {
  const key = "reform_device_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

/**
 * Fetches a local image URL (served by Vite's dev server) and converts it to a File
 * so it can be sent as multipart/form-data to the visualization API.
 */
async function imageUrlToFile(imageUrl: string, filename = "reference.jpg"): Promise<File> {
  const response = await fetch(imageUrl);
  if (!response.ok) throw new Error(`Failed to fetch reference image: ${response.status}`);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type || "image/jpeg" });
}

export interface GenerateVisualizationParams {
  /** One of: "kitchen" | "bathroom" | "living room" */
  roomType: string;
  /** The transformation prompt text (Prompt 2) */
  textPrompt: string;
  /** Primary style name from the user's selections */
  stylePreset: string;
  /** Local URL of the final design image shown in the reveal */
  roomImageUrl: string;
}

export interface GenerateVisualizationResult {
  /** Ready-to-use data URL: "data:image/png;base64,..." */
  imageDataUrl: string;
}

/**
 * Calls the reform-ai visualization engine to generate an AI image.
 * Uses the transformation prompt (prompt 2) + the final design image as the room reference.
 * Proxied through Vite → http://localhost:3001/api/v1/visualization/generate
 */
export async function generateVisualization(
  params: GenerateVisualizationParams,
): Promise<GenerateVisualizationResult> {
  if (isVisualizationLimitReached()) {
    throw new Error("You have reached the limit of 200 visualizations. Please contact us for more.");
  }

  const roomImage = await imageUrlToFile(params.roomImageUrl);

  const formData = new FormData();
  formData.append(
    "data",
    JSON.stringify({
      roomType: params.roomType,
      stylePreset: { name: params.stylePreset },
      textPrompt: params.textPrompt,
      styleInfluence: 50,
      isRefinement: false,
      metadata: { source: "renovation-walkthrough" },
    }),
  );
  formData.append("roomImage", roomImage);

  const response = await fetch(`${REFORM_API_BASE}/visualization/generate`, {
    method: "POST",
    headers: {
      "x-device-id": getOrCreateDeviceId(),
    },
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText);
    throw new Error(`Visualization API error ${response.status}: ${text}`);
  }

  incrementVisualizationCount();

  const json = await response.json();
  const base64: string = json?.data?.image ?? "";
  if (!base64) throw new Error("No image returned from visualization API");

  const imageDataUrl = base64.startsWith("data:") ? base64 : `data:image/png;base64,${base64}`;
  return { imageDataUrl };
}
