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
  addons.setConfig({
    theme: create({
      base: appearance.matches ? "dark" : "light",
      brandTitle: "PyColors UI Explorer",
      brandUrl: "https://pycolors.io/ui",
      brandImage: "./pycolors-mark.svg",
      brandTarget: "_blank",
      colorPrimary: "#6A30D4",
      colorSecondary: appearance.matches ? "#a78bfa" : "#6A30D4",
      fontBase: "ui-sans-serif, system-ui, sans-serif",
    }),
    showOnboarding: false,
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
            gap: 12,
            minWidth: 150,
            padding: 16,
            fontSize: 13,
          }}
        >
          <a
            href={docs}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit" }}
          >
            Docs
          </a>
          <a
            href="https://pycolors.io/docs/ui/installation"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit" }}
          >
            Install
          </a>
          <a
            href="https://pycolors.io/ui"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit" }}
          >
            PyColors UI
          </a>
          <a
            href="https://pycolors.io/starters/free"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit" }}
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
