import * as React from "react";
import { addons, types, useStorybookState } from "storybook/manager-api";
import {
  Button as ManagerButton,
  WithTooltip,
} from "storybook/internal/components";
import { create } from "storybook/theming";

// Storybook 10 hardcodes its document-title suffix independently of brandTitle.
// Observe only the title node so story navigation keeps its context and branding.
const titleNode = document.querySelector("title");
function brandDocumentTitle() {
  const branded = document.title.replace(/Storybook$/, "PyColors UI Explorer");
  if (branded !== document.title) document.title = branded;
}
if (titleNode)
  new MutationObserver(brandDocumentTitle).observe(titleNode, {
    childList: true,
    subtree: true,
    characterData: true,
  });
brandDocumentTitle();

const appearance = window.matchMedia("(prefers-color-scheme: dark)");
function applyBrand() {
  const dark = appearance.matches;
  addons.setConfig({
    theme: create({
      base: appearance.matches ? "dark" : "light",
      brandTitle: "PyColors UI Explorer home",
      brandUrl: "./?path=/story/foundations-overview--default",
      brandImage: "./pycolors-symbol.svg",
      brandTarget: "_self",
      colorPrimary: "#6A30D4",
      colorSecondary: appearance.matches ? "#a78bfa" : "#6A30D4",
      fontBase: "ui-sans-serif, system-ui, sans-serif",
      appBg: dark ? "#111113" : "#fafafa",
      appContentBg: dark ? "#18181b" : "#ffffff",
      appBorderColor: dark ? "#2b2b30" : "#e4e4e7",
      appBorderRadius: 6,
      textColor: dark ? "#f4f4f5" : "#18181b",
      textMutedColor: dark ? "#a1a1aa" : "#64646f",
      barBg: dark ? "#111113" : "#ffffff",
      barTextColor: dark ? "#a1a1aa" : "#64646f",
      inputBg: dark ? "#18181b" : "#ffffff",
      inputBorder: dark ? "#3f3f46" : "#d4d4d8",
      inputTextColor: dark ? "#f4f4f5" : "#18181b",
      inputBorderRadius: 6,
    }),
    showOnboarding: false,
    sidebar: { collapsedRoots: ["ui"] },
    layoutCustomisations: {
      showPanel: (state, defaultValue) =>
        state.storyId === "foundations-overview--default"
          ? false
          : defaultValue,
    },
  });
}
applyBrand();
appearance.addEventListener("change", applyBrand);

function DocumentationLinks() {
  const { storyId } = useStorybookState();
  const family = /^components-([a-z-]+)--/.exec(storyId ?? "")?.[1];
  const docs = `https://pycolors.io/docs/ui${family ? `/${family}` : ""}`;
  return (
    <WithTooltip
      trigger="click"
      closeOnOutsideClick
      placement="bottom"
      tooltip={
        <nav
          aria-label="PyColors UI Explorer resources"
          style={{
            display: "grid",
            gap: 4,
            minWidth: 220,
            padding: 8,
            fontSize: 13,
          }}
        >
          <a
            href={docs}
            target="_blank"
            rel="noopener noreferrer"
            className="pycolors-resource-link"
          >
            Docs
          </a>
          <a
            href="https://pycolors.io/docs/ui/installation"
            target="_blank"
            rel="noopener noreferrer"
            className="pycolors-resource-link"
          >
            Install
          </a>
          <a
            href="https://pycolors.io/ui"
            target="_blank"
            rel="noopener noreferrer"
            className="pycolors-resource-link"
          >
            PyColors UI
          </a>
          <a
            href="https://pycolors.io/starters/free"
            target="_blank"
            rel="noopener noreferrer"
            className="pycolors-resource-link"
          >
            Starter Free
          </a>
        </nav>
      }
    >
      <ManagerButton variant="ghost" ariaLabel={false}>
        UI Explorer
      </ManagerButton>
    </WithTooltip>
  );
}
addons.register("pycolors/resources", () => {
  addons.add("pycolors/resources/links", {
    type: types.TOOL,
    title: "PyColors resources",
    render: DocumentationLinks,
  });
});
