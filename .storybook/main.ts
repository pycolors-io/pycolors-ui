import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { publicBoundary, publicStoryGlobs } from "./public-boundary.js";

const manifest = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as {
  version: string;
  license: string;
  peerDependencies: { react: string; "react-dom": string };
};
const changelog = readFileSync(
  new URL("../CHANGELOG.md", import.meta.url),
  "utf8",
);
if (!changelog.includes(`## ${manifest.version}\n`))
  throw new Error("The UI version must have matching public release notes.");

const config: StorybookConfig = {
  stories: publicStoryGlobs,
  staticDirs: ["./public"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-vitest"],
  core: { disableTelemetry: true, disableProjectJson: true },
  features: {
    componentsManifest: false,
    sidebarOnboardingChecklist: false,
  },
  env: () => ({}),
  framework: { name: "@storybook/react-vite", options: {} },
  async viteFinal(viteConfig) {
    viteConfig.define = {
      ...viteConfig.define,
      __PYCOLORS_UI_RELEASE__: JSON.stringify({
        version: manifest.version,
        license: manifest.license,
        react: manifest.peerDependencies.react,
        reactDom: manifest.peerDependencies["react-dom"],
        changelog,
      }),
    };
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
