import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  base: "/mixersstore/",
  build: {
    chunkSizeWarningLimit: 1000,
  },
  plugins: [react()],
}));
