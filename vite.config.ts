import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: ".",                 // root now is the repo root (index.html here)
  publicDir: "public",       // serve static files from /public at site root
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),              // keep if used
      "@assets": path.resolve(__dirname, "attached_assets"),     // keep if used
    },
  },
  build: {
    outDir: "dist",          // Netlify publish dir
    emptyOutDir: true,
  },
  server: {
    fs: { strict: true, deny: ["**/.*"] },
  },
});
