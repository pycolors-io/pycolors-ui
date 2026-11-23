import { createElement, Fragment } from "react";
import type { Preview } from "@storybook/react-vite";
import { ConsumerSource, MaintenanceFooter } from "./explorer-tools.js";
import { getConsumerExample } from "./source-examples.js";

import "./preview.css";

const preview: Preview = {
  initialGlobals: {
    theme: "light",
    // Visitors control the previews themselves; test projects opt in.
    runOverviewInteractions: false,
    runAppearanceInteractions: false,
    runOverlayInteractions: false,
    runStoryInteractions: false,
  },
  globalTypes: {
    runStoryInteractions: {
      description: "Run the catalog's scripted interaction checks.",
    },
    runOverlayInteractions: {
      description: "Run the dialog and sheet scripted interaction checks.",
    },
    runAppearanceInteractions: {
      description: "Run the appearance preview's scripted interaction checks.",
    },
    runOverviewInteractions: {
      description: "Run the welcome form's scripted interaction checks.",
    },
    theme: {
      description: "PyColors color theme",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.title = `${context.title} - ${context.name} ⋅ PyColors UI Explorer`;
      const isDark = context.globals.theme === "dark";

      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";

      const story = createElement(
        "main",
        { "aria-label": "Component preview" },
        createElement(Story),
      );
      if (context.viewMode !== "story") return story;
      if (context.id === "foundations-overview--default")
        return createElement(
          Fragment,
          null,
          story,
          createElement(MaintenanceFooter),
        );

      const hierarchy = context.title.split("/");
      const family = hierarchy.pop();
      const foundations = hierarchy[0] === "Foundations";
      const configuredSource: unknown = context.parameters.docs?.source?.code;
      const example =
        typeof configuredSource === "string"
          ? configuredSource
          : getConsumerExample(context.id, context.args);
      const componentFamily = /^components-([a-z-]+)--/.exec(context.id)?.[1];
      const docs = `https://pycolors.io/docs/ui/${componentFamily ?? "composition"}`;

      return createElement(
        "div",
        { className: "explorer-workbench" },
        createElement(
          "div",
          { className: "explorer-workbench-inner" },
          createElement(
            "header",
            { className: "explorer-workbench-header" },
            createElement(
              "div",
              null,
              createElement(
                "p",
                { className: "explorer-workbench-context" },
                hierarchy.join(" / "),
              ),
              createElement(
                "div",
                { className: "explorer-workbench-title" },
                createElement("p", null, family),
                createElement(
                  "span",
                  { className: "explorer-story-state" },
                  context.name,
                ),
              ),
            ),
            createElement(
              "p",
              { className: "explorer-workbench-brand" },
              createElement("span", {
                className: "explorer-brand-mark",
                "aria-hidden": true,
              }),
              "PyColors UI",
            ),
          ),
          createElement(
            "div",
            {
              className: `explorer-canvas${foundations ? " explorer-canvas--foundations" : ""}`,
            },
            createElement(
              "aside",
              {
                className: "explorer-canvas-bar",
                "aria-label": "Preview information",
              },
              createElement("span", null, "Preview"),
              createElement(
                "span",
                null,
                isDark ? "Dark theme" : "Light theme",
              ),
            ),
            createElement(
              "div",
              { className: "explorer-canvas-content" },
              story,
            ),
          ),
          example
            ? createElement(ConsumerSource, {
                key: context.id,
                code: example,
                docs,
              })
            : null,
          createElement(MaintenanceFooter),
        ),
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
    viewport: {
      options: {
        desktop: {
          name: "Desktop",
          styles: { width: "1280px", height: "800px" },
        },
        mobile: { name: "Mobile", styles: { width: "390px", height: "844px" } },
      },
    },
    a11y: { test: "error" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Foundations",
          ["Overview", ["Default"], "Tokens", ["Default", "*"]],
          "Components",
          [
            "Forms",
            ["*", ["Default", "*"]],
            "Feedback",
            ["*", ["Default", "*"]],
            "Overlays",
            ["*", ["Default", "*"]],
            "Navigation",
            ["*", ["Default", "*"]],
            "Data display",
            ["*", ["Default", "*"]],
            "Layout",
            ["*", ["Default", "*"]],
          ],
          "Compositions",
          ["*", ["Default", "*"]],
          "UI",
          ["Public component surface"],
        ],
      },
    },
  },
};

export default preview;
