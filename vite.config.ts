import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";
// import { configDefaults } from "vitest/config"; //This is required to import for defineConfig eventho it's not used

export default defineConfig({
  plugins: [vue(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
});
