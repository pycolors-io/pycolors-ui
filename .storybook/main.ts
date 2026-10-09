import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { publicBoundary, publicStoryGlobs } from "./public-boundary.js";

const config: StorybookConfig = {
  stories: publicStoryGlobs,
  staticDirs: ["./public"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-vitest"],
  core: { disableTelemetry: true, disableProjectJson: true },
  features: { componentsManifest: false },
  env: () => ({}),
  framework: { name: "@storybook/react-vite", options: {} },
  async viteFinal(viteConfig) {
    viteConfig.envDir = false;
    viteConfig.envPrefix = [];
    viteConfig.build = { ...viteConfig.build, sourcemap: false };
    viteConfig.plugins ??= [];
    viteConfig.plugins.push(
      publicBoundary(fileURLToPath(new URL("..", import.meta.url))),
      tailwindcss(),
    );
    return viteConfig;
  },
};
export default config;
