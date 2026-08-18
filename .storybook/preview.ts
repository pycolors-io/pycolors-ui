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
      const isDark = context.globals.theme === "dark";

      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";

      return Story();
    },
  ],
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        rules: [{ id: "region", enabled: false }],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ["UI", ["Public component surface"]],
      },
    },
  },
};

export default preview;
