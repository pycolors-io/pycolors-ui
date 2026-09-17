import { existsSync, realpathSync } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

/** Public inputs are deliberately independent of any future private book. */
export const publicStoryGlobs = [
  "../stories/foundations/*.stories.tsx",
  "../stories/components/*.stories.tsx",
  "../stories/compositions/*.stories.tsx",
  "../stories/public-surface.stories.tsx",
];
export const publicConfigFiles = [
  "main.ts",
  "preview.ts",
  "preview.css",
  "manager.tsx",
  "manager-head.html",
  "preview-head.html",
  "public-boundary.ts",
  "public/pycolors-mark.svg",
];
export function isPublicInput(relative: string): boolean {
  return (
    /^src\/(?:[\w-]+\/)*[\w.-]+\.tsx?$/.test(relative) ||
    /^stories\/(?:components|foundations|compositions)\/[\w-]+\.stories\.tsx$/.test(
      relative,
    ) ||
    [
      "stories/fixtures.tsx",
      "stories/interaction-helpers.ts",
      "stories/public-surface.stories.tsx",
    ].includes(relative) ||
    publicConfigFiles.some((file) => relative === `.storybook/${file}`)
  );
}

/** Check resolved real paths, including aliases and symlinks, before bundling. */
export function assertPublicModule(id: string, uiRoot: string): void {
  if (id.startsWith("\0") || id.startsWith("virtual:")) return;
  const file = id.split("?")[0]!;
  if (!path.isAbsolute(file)) return;
  // Vite resolves the generated Storybook iframe inline style as an HTML proxy.
  if (
    file === path.join(uiRoot, "iframe.html") &&
    /^\?html-proxy&inline-css&index=\d+\.css$/.test(id.slice(file.length))
  )
    return;
  if (!existsSync(file))
    throw new Error(
      `Public Explorer: unresolved module outside the reviewed graph (${id})`,
    );
  const real = realpathSync(file);
  const relative = path
    .relative(realpathSync(uiRoot), real)
    .split(path.sep)
    .join("/");
  if (isPublicInput(relative)) return;
  if (real === realpathSync(path.resolve(uiRoot, "../tokens/tokens.css")))
    return;
  // Only installed registry dependencies. Workspace links resolve outside this
  // directory and must pass the first-party allowlist above instead.
  if (real.split(path.sep).includes("node_modules")) return;
  throw new Error(
    `Public Explorer: prohibited resolved import (${path.basename(file)})`,
  );
}

export function publicBoundary(uiRoot: string): Plugin {
  return {
    name: "pycolors-public-explorer-boundary",
    apply: "build",
    enforce: "pre",
    async resolveId(source, importer, options) {
      const resolved = await this.resolve(source, importer, {
        ...options,
        skipSelf: true,
      });
      if (resolved && !resolved.external)
        assertPublicModule(resolved.id, uiRoot);
      return null;
    },
  };
}
