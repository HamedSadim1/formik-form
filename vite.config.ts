import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // "@"-alias: verwijst naar src/, zodat imports zonder relatieve paden
      // (../../) kunnen — één bron van waarheid voor de src-roots.
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
