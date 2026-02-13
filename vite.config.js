import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    host: true, // Expõe na rede local
    port: 5173,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    // Otimizações para Electron
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
