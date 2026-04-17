import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { visualizationRouter } from "./routes/visualization.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const PORT = Number(process.env.PORT) || 3001;
const WEBAPP_ROOT = path.resolve(__dirname, "../../webapp");

async function bootstrap() {
  const app = express();

  app.use(express.json());

  // API routes
  app.use("/api/v1/visualization", visualizationRouter);

  if (isProd) {
    const distPath = path.join(WEBAPP_ROOT, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    // Embed Vite dev server as middleware — HMR works on the same port
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      root: WEBAPP_ROOT,
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}  [${isProd ? "production" : "development"}]`);
  });
}

bootstrap().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
