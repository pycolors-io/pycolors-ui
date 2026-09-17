// @vitest-environment node
// Source/metadata contract only: no DOM or Storybook browser runner.
/// <reference types="vite/client" />
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import * as legacy from "../stories/public-surface.stories.js";

type Selection = {
  tags?: string[];
  parameters?: { a11y?: { test?: string; disable?: boolean } };
};
type CatalogModule = {
  default: {
    tags?: string[];
    id: string;
    title: string;
    component: unknown;
    parameters: { docs: { description: { component: string } } };
  };
  [exportName: string]: unknown;
};
const families = import.meta.glob<CatalogModule>(
  "../stories/components/*.stories.tsx",
  { eager: true },
);
const catalog = import.meta.glob<CatalogModule>(
  "../stories/**/*.stories.{ts,tsx}",
  { eager: true },
);
const read = (relative: string) =>
  readFileSync(new URL(relative, import.meta.url), "utf8");
const slug = (name: string) =>
  name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

describe("public Storybook catalog migration", () => {
  it("covers the live public barrel with one stable default and canonical docs link per family", () => {
    const publicFamilies = [
      ...read("../src/index.ts").matchAll(/components\/ui\/(.+)\.js/g),
    ]
      .map((match) => match[1])
      .sort();
    const files = Object.keys(families)
      .map((file) => file.split("/").pop()!.replace(".stories.tsx", ""))
      .sort();
    expect(files).toEqual(publicFamilies);
    const ids = new Set<string>();
    for (const [file, module] of Object.entries(families)) {
      const family = file.split("/").pop()!.replace(".stories.tsx", "");
      expect(module.default.id).toBe(`components-${family}`);
      expect(module.default.component).toBeDefined();
      expect(module.Default).toBeDefined();
      expect(module.default.title).toMatch(
        /^Components\/(Forms|Feedback|Overlays|Navigation|Data display|Layout)\//,
      );
      expect(module.default.parameters.docs.description.component).toContain(
        `https://pycolors.io/docs/ui/${family}`,
      );
      for (const key of Object.keys(module).filter(
        (key) => key !== "default",
      )) {
        const id = `${module.default.id}--${slug(key)}`;
        expect(ids.has(id), `duplicate ${id}`).toBe(false);
        ids.add(id);
      }
      const source = read(file);
      expect(source).toContain('from "../../src/index.js"');
      expect(source).not.toMatch(
        /from\s+["'][^"']*(?:src\/components|ui-pro|blocks-pro|starter-)[^"']*["']/,
      );
    }
  });

  it("preserves the historical IDs through the canonical render functions", () => {
    expect(legacy.default.id).toBe("ui-public-component-surface");
    const legacyEntries = Object.entries(legacy).filter(
      ([key]) => key !== "default",
    );
    const ledger = [
      ...read("../stories/README.md").matchAll(
        /\|\s+`(ui-public-component-surface--[^`]+)`\s+\|\s+`(components-[^`]+)`\s+\|/g,
      ),
    ];
    expect(ledger).toHaveLength(19);
    expect(legacyEntries).toHaveLength(ledger.length);
    for (const [, oldId, newId] of ledger) {
      if (!oldId || !newId) throw new Error("Incomplete migration mapping");
      const old = legacyEntries.find(
        ([key]) => `ui-public-component-surface--${slug(key)}` === oldId,
      )?.[1];
      const module = Object.values(families).find((entry) =>
        newId.startsWith(`${entry.default.id}--`),
      );
      expect(module, newId).toBeDefined();
      const canonical = Object.entries(module!).find(
        ([key]) =>
          key !== "default" && `${module!.default.id}--${slug(key)}` === newId,
      )?.[1];
      expect(old, oldId).toBeDefined();
      expect(canonical, newId).toBeDefined();
      if (
        !old ||
        typeof old !== "object" ||
        !("render" in old) ||
        !canonical ||
        typeof canonical !== "object" ||
        !("render" in canonical)
      ) {
        throw new Error(`Missing shared render for ${oldId}`);
      }
      expect(old.render).toBe(canonical.render);
    }
  });
});

describe("browser matrix selection", () => {
  it("keeps every canonical export in the default test selection", () => {
    expect(read("../.storybook/main.ts")).toContain(
      "../stories/**/*.stories.@(ts|tsx)",
    );
    for (const [file, module] of Object.entries(catalog)) {
      if (file.endsWith("/public-surface.stories.tsx")) {
        expect(module.default.tags).toContain("legacy");
        continue;
      }
      expect(read(file), file).not.toMatch(
        /(?:includeStories|excludeStories)\s*:/,
      );
      const stories = Object.entries(module).filter(
        ([name]) => name !== "default",
      );
      expect(stories.length, file).toBeGreaterThan(0);
      for (const [name, story] of stories) {
        const selection = story as Selection;
        const tags = [
          ...(module.default.tags ?? []),
          ...(selection.tags ?? []),
        ];
        for (const tag of tags) {
          expect(tag, `${file} ${name}`).not.toMatch(
            /^(legacy|!test|!theme|!responsive)$/,
          );
        }
        for (const entry of [module.default as Selection, selection]) {
          expect(entry.parameters?.a11y?.disable, `${file} ${name}`).not.toBe(
            true,
          );
          expect(
            entry.parameters?.a11y?.test ?? "error",
            `${file} ${name}`,
          ).toBe("error");
        }
        if (name === "Default") expect(tags, file).toContain("theme");
        if (tags.includes("responsive"))
          expect(tags, `${file} ${name}`).toContain("theme");
        if (/LongContent|Error|Disabled/.test(name)) {
          expect(tags, `${file} ${name}`).toContain("theme");
        }
      }
    }
  });
});
