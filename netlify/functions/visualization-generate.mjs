import Busboy from "busboy";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const serviceUrl = process.env.VISUALIZATION_SERVICE_URL;
  if (!serviceUrl) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "VISUALIZATION_SERVICE_URL not configured" }),
    };
  }

  try {
    const { fields, files } = await parseMultipart(event);

    const data = fields.data ? JSON.parse(fields.data) : {};

    const stylePreset =
      typeof data.stylePreset === "string"
        ? { name: data.stylePreset }
        : { ...data.stylePreset };
    stylePreset.imageUrl = stylePreset.imageUrl || "https://placeholder.com/style.jpg";

    const outForm = new FormData();

    if (files.roomImage) {
      const f = files.roomImage;
      outForm.append("roomImage", new Blob([f.data], { type: f.contentType }), f.filename);
    }
    if (files.moodBoardImages) {
      for (const f of files.moodBoardImages) {
        outForm.append("moodBoardImages", new Blob([f.data], { type: f.contentType }), f.filename);
      }
    }
    if (files.furnitureImage) {
      const f = files.furnitureImage;
      outForm.append("furnitureImage", new Blob([f.data], { type: f.contentType }), f.filename);
    }
    if (files.previousResultImage) {
      const f = files.previousResultImage;
      outForm.append("previousResultImage", new Blob([f.data], { type: f.contentType }), f.filename);
    }

    outForm.append("roomType", data.roomType || "");
    outForm.append("stylePreset", JSON.stringify(stylePreset));
    if (data.textPrompt) outForm.append("textPrompt", data.textPrompt);
    outForm.append("styleInfluence", String(data.styleInfluence ?? 50));
    outForm.append("isRefinement", String(data.isRefinement ?? false));

    const gcpResponse = await fetch(`${serviceUrl}/generate-visualization`, {
      method: "POST",
      body: outForm,
    });

    if (!gcpResponse.ok) {
      const text = await gcpResponse.text().catch(() => gcpResponse.statusText);
      return {
        statusCode: gcpResponse.status,
        body: JSON.stringify({ success: false, message: text }),
      };
    }

    const json = await gcpResponse.json();
    const payload = json?.data ?? json;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, data: payload }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: err.message ?? "Visualization generation failed" }),
    };
  }
};

function parseMultipart(event) {
  return new Promise((resolve, reject) => {
    const contentType =
      event.headers["content-type"] || event.headers["Content-Type"] || "";
    const bb = Busboy({ headers: { "content-type": contentType } });

    const fields = {};
    const files = {};

    bb.on("field", (name, value) => {
      fields[name] = value;
    });

    bb.on("file", (name, stream, info) => {
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("end", () => {
        const entry = {
          data: Buffer.concat(chunks),
          filename: info.filename,
          contentType: info.mimeType,
        };
        if (name === "moodBoardImages") {
          files.moodBoardImages = files.moodBoardImages ?? [];
          files.moodBoardImages.push(entry);
        } else {
          files[name] = entry;
        }
      });
    });

    bb.on("finish", () => resolve({ fields, files }));
    bb.on("error", reject);

    const body = event.isBase64Encoded
      ? Buffer.from(event.body, "base64")
      : Buffer.from(event.body || "");

    bb.write(body);
    bb.end();
  });
}
