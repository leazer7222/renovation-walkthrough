import { Router, Request, Response } from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024, files: 15 },
});

router.post(
  "/generate",
  upload.fields([
    { name: "roomImage", maxCount: 1 },
    { name: "moodBoardImages", maxCount: 10 },
    { name: "furnitureImage", maxCount: 1 },
    { name: "previousResultImage", maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    try {
      const serviceUrl = process.env.VISUALIZATION_SERVICE_URL;
      if (!serviceUrl) {
        res.status(500).json({ success: false, message: "VISUALIZATION_SERVICE_URL not configured" });
        return;
      }

      const files = req.files as Record<string, Express.Multer.File[]> | undefined;
      const data = req.body.data ? JSON.parse(req.body.data as string) : req.body;

      const form = new FormData();

      if (files?.roomImage?.[0]) {
        const file = files.roomImage[0];
        form.append("roomImage", file.buffer, { filename: file.originalname, contentType: file.mimetype });
      }

      if (files?.moodBoardImages) {
        for (const file of files.moodBoardImages) {
          form.append("moodBoardImages", file.buffer, { filename: file.originalname, contentType: file.mimetype });
        }
      }

      if (files?.furnitureImage?.[0]) {
        const file = files.furnitureImage[0];
        form.append("furnitureImage", file.buffer, { filename: file.originalname, contentType: file.mimetype });
      }

      if (files?.previousResultImage?.[0]) {
        const file = files.previousResultImage[0];
        form.append("previousResultImage", file.buffer, { filename: file.originalname, contentType: file.mimetype });
      }

      form.append("roomType", data.roomType);
      const stylePreset = typeof data.stylePreset === "string"
        ? { name: data.stylePreset }
        : { ...data.stylePreset };
      stylePreset.imageUrl = stylePreset.imageUrl || "https://placeholder.com/style.jpg";
      form.append("stylePreset", JSON.stringify(stylePreset));
      if (data.textPrompt) form.append("textPrompt", data.textPrompt);
      form.append("styleInfluence", String(data.styleInfluence ?? 50));
      form.append("isRefinement", String(data.isRefinement ?? false));

      const response = await axios.post(`${serviceUrl}/generate-visualization`, form, {
        headers: form.getHeaders(),
        timeout: Number(process.env.VISUALIZATION_TIMEOUT) || 120_000,
      });

      // GCP service returns { data: { image } } — unwrap one level so frontend sees { data: { image } }
      const payload = response.data?.data ?? response.data;
      res.json({ success: true, data: payload });
    } catch (err: unknown) {
      const error = err as { response?: { status?: number; data?: { message?: string } }; message?: string };
      const status = error.response?.status ?? 500;
      res.status(status).json({
        success: false,
        message: error.response?.data?.message ?? error.message ?? "Visualization generation failed",
      });
    }
  },
);

export { router as visualizationRouter };
