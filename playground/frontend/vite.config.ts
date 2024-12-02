import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// Vite configuration with alias
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@frontend": path.resolve(__dirname, "../../frontend"),
      "@app-shared": path.resolve(__dirname, "../shared"),
    },
  },
});
