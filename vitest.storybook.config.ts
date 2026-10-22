import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const configDir = fileURLToPath(new URL(".storybook", import.meta.url));
const tokens = readFileSync(
  new URL("../tokens/tokens.css", import.meta.url),
  "utf8",
);
function expectedTokens(theme: "light" | "dark") {
  const declarations = (selector: string) =>
    Object.fromEntries(
      [
        ...tokens
          .slice(tokens.indexOf(`${selector} {`))
          .split("}")[0]!
          .matchAll(/--([\w-]+):\s*([^;]+);/g),
      ].map((match) => [match[1]!, match[2]!.trim()]),
    );
  const light = declarations(":root");
  const mode = theme === "light" ? light : declarations(".dark");
  const all = { ...light, ...mode };
  const resolve = (value: string): string =>
    value.replace(/var\(--([\w-]+)\)/g, (_, name: string) =>
      resolve(all[name] ?? ""),
    );
  return Object.fromEntries(
    ["background", "foreground", "primary", "muted-foreground"].map((name) => {
      const value = mode[name];
      if (!value)
        throw new Error(`Missing authoritative ${theme} token: --${name}`);
      return [name, resolve(value)];
    }),
  );
}
const cases = [
  {
    theme: "light",
    viewport: "desktop",
    width: 1280,
    height: 800,
    tag: "test",
  },
  {
    theme: "dark",
    viewport: "desktop",
    width: 1280,
    height: 800,
    tag: "theme",
  },
  {
    theme: "light",
    viewport: "mobile",
    width: 390,
    height: 844,
    tag: "responsive",
  },
  {
    theme: "dark",
    viewport: "mobile",
    width: 390,
    height: 844,
    tag: "responsive",
  },
] as const;

// The addon UI assigns one shared project name, so it runs the canonical light
// desktop selection. CLI/required CI always run the complete matrix below.
const selectedCases =
  process.env.VITEST_STORYBOOK === "true" ? cases.slice(0, 1) : cases;

// Independent browser projects: never extend the jsdom config or its setup/mocks.
export default defineConfig({
  test: {
    reporters: ["verbose"],
    projects: selectedCases.map(({ theme, viewport, width, height, tag }) => ({
      plugins: [
        storybookTest({
          configDir,
          initialGlobals: {
            theme,
            viewport: { value: viewport, isRotated: false },
          },
          tags: { include: [tag], exclude: ["legacy"] },
        }),
      ],
      test: {
        name: `storybook-${theme}-${viewport}-${width}x${height}`,
        provide: {
          qualityCase: { theme, width, height, tokens: expectedTokens(theme) },
        },
        setupFiles: ["./.storybook/browser.setup.ts"],
        browser: {
          enabled: true,
          headless: true,
          provider: playwright(),
          instances: [{ browser: "chromium" }],
          viewport: { width, height },
          screenshotFailures: false,
        },
      },
    })),
  },
});
