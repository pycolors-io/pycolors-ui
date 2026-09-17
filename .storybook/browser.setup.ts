import { afterEach, beforeEach, inject } from "vitest";
import { setProjectAnnotations } from "@storybook/react-vite";
import * as a11y from "@storybook/addon-a11y/preview";
import { expect, waitFor, within } from "storybook/test";
import preview from "./preview.js";

declare module "vitest" {
  interface ProvidedContext {
    qualityCase: {
      theme: "light" | "dark";
      width: number;
      height: number;
      tokens: Record<string, string>;
    };
  }
}

const matrix = inject("qualityCase");
beforeEach(() => {
  // Deliberately start in the opposite mode: each story must initialize itself.
  document.documentElement.classList.toggle("dark", matrix.theme === "light");
  document.documentElement.style.colorScheme =
    matrix.theme === "light" ? "dark" : "light";
});
afterEach(() => {
  document.documentElement.classList.remove("dark");
  document.documentElement.style.removeProperty("color-scheme");
});

// Explicit annotations add our checks while retaining the authoritative preview
// and official a11y afterEach. No Testing Library/jsdom setup enters this project.
setProjectAnnotations([
  a11y,
  preview,
  {
    afterEach: async ({ id, canvasElement, globals }) => {
      const label = `${id} [${matrix.theme} ${matrix.width}x${matrix.height}]`;
      const root = document.documentElement;
      await expect(globals.theme, `${label} theme/global`).toBe(matrix.theme);
      await expect(
        root.classList.contains("dark"),
        `${label} theme/initialization`,
      ).toBe(matrix.theme === "dark");
      await expect(root.style.colorScheme, `${label} theme/color-scheme`).toBe(
        matrix.theme,
      );
      const style = getComputedStyle(root);
      for (const [name, value] of Object.entries(matrix.tokens)) {
        await expect(
          style.getPropertyValue(`--${name}`).trim(),
          `${label} theme/token --${name}`,
        ).toBe(value);
      }
      const probe = document.createElement("span");
      document.body.append(probe);
      try {
        for (const [property, token] of [
          ["backgroundColor", "background"],
          ["color", "foreground"],
        ] as const) {
          probe.style.color = `var(--${token})`;
          await expect(
            getComputedStyle(document.body)[property],
            `${label} theme/applied ${property}`,
          ).toBe(getComputedStyle(probe).color);
        }
      } finally {
        probe.remove();
      }
      const main = within(canvasElement).getByRole("main", { hidden: true });
      await expect(main, `${label} render/visible`).toBeVisible();
      await expect(
        main.firstElementChild,
        `${label} render/content`,
      ).toBeVisible();
      await expect(window.innerWidth, `${label} viewport/width`).toBe(
        matrix.width,
      );
      await expect(window.innerHeight, `${label} viewport/height`).toBe(
        matrix.height,
      );
      await expect(
        root.scrollWidth,
        `${label} viewport/page overflow`,
      ).toBeLessThanOrEqual(matrix.width);
      for (const control of document.querySelectorAll<HTMLElement>(
        'button, a[href], input, textarea, [role="tab"]',
      )) {
        if (
          control.closest('[aria-hidden="true"]') ||
          !control.getClientRects().length
        )
          continue;
        control.scrollIntoView({ block: "nearest", inline: "nearest" });
        // Intentionally scrollable tables/panels may scroll; the page must not
        // overflow, and their visible controls must still be reachable.
        await waitFor(() => {
          const box = control.getBoundingClientRect();
          expect(
            box.left,
            `${label} viewport/control left`,
          ).toBeGreaterThanOrEqual(-1);
          expect(
            box.right,
            `${label} viewport/control right`,
          ).toBeLessThanOrEqual(matrix.width + 1);
          expect(
            box.top,
            `${label} viewport/control top`,
          ).toBeGreaterThanOrEqual(-1);
          expect(
            box.bottom,
            `${label} viewport/control bottom`,
          ).toBeLessThanOrEqual(matrix.height + 1);
        });
      }
    },
  },
]);
