import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/mixersstore/",
  build: {
    chunkSizeWarningLimit: 1000, // или любое другое значение в KB
  },
  plugins: [react(), tailwindcss()],
});
