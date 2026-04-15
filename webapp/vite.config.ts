import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }]
  },
  server: {
    proxy: {
      // Proxies /reform-api/* → http://localhost:3001/*
      // e.g. /reform-api/api/v1/visualization/generate → http://localhost:3001/api/v1/visualization/generate
      "/reform-api": {
        target: "http://localhost:3001",
        rewrite: (path) => path.replace(/^\/reform-api/, ""),
        changeOrigin: true,
      },
    },
  },
});
