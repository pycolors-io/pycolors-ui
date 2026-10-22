import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { AIMessageActions } from "../../src/index.js";
const meta = {
  id: "components-ai-message-actions",
  title: "Components/Feedback/AI Message Actions",
  component: AIMessageActions,
  tags: ["theme", "responsive"],
  parameters: {
    docs: {
      description: {
        component:
          "Application-owned copy with explicit feedback. Story callbacks simulate results, not clipboard writes. [Usage and accessibility](https://pycolors.io/docs/ui/ai-message-actions).",
      },
    },
  },
  args: { value: "Sample text", onCopy: async () => {} },
} satisfies Meta<typeof AIMessageActions>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(
      canvas.getByRole("button", { name: "Copy message" }),
    ).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(canvas.getByRole("status")).toHaveTextContent("Copied.");
  },
};
export const Error: Story = {
  args: {
    onCopy: async () => {
      throw new globalThis.Error("Simulated failure");
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(canvas.getByRole("status")).toHaveTextContent(
      "Could not copy",
    );
    await expect(canvas.getByRole("button")).toBeEnabled();
  },
};
export const Disabled: Story = { args: { disabled: true } };
