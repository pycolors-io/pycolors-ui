import { createElement } from "react";
import type { Preview } from "@storybook/react-vite";

import "./preview.css";

const preview: Preview = {
  initialGlobals: {
    theme: "light",
  },
  globalTypes: {
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

      return createElement(
        "main",
        { "aria-label": "Component preview" },
        createElement(Story),
      );
    },
  ],
  parameters: {
    layout: "padded",
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
          ["Tokens", ["Default", "*"]],
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
