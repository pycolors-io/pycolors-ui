import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fireEvent, userEvent, within } from "storybook/test";
import { AIConversation, AIMessage } from "../../src/index.js";
const meta = {
  id: "components-ai-conversation",
  title: "Components/Layout/AI Conversation",
  component: AIConversation,
  tags: ["theme", "responsive"],
  parameters: {
    docs: {
      description: {
        component:
          "Reader-aware scrolling without model transport. [Usage and accessibility](https://pycolors.io/docs/ui/ai-conversation).",
      },
    },
  },
  args: {
    children: (
      <>
        <AIMessage author="You">What should I build first?</AIMessage>
        <AIMessage author="Assistant">Start with one useful flow.</AIMessage>
      </>
    ),
  },
} satisfies Meta<typeof AIConversation>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const LongConversation: Story = {
  args: {
    viewportClassName: "max-h-64",
    children: Array.from({ length: 20 }, (_, i) => (
      <AIMessage key={i} author={i % 2 ? "Assistant" : "You"}>
        Sample message {i + 1}. {"Readable content. ".repeat(8)}
      </AIMessage>
    )),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const viewport = canvas.getByRole("group", { name: "Conversation" });
    await expect(viewport.scrollTop).toBeGreaterThan(0);
    viewport.scrollTop = 0;
    await fireEvent.scroll(viewport);
    await userEvent.click(
      await canvas.findByRole("button", { name: "Jump to latest" }),
    );
    await expect(viewport).toHaveFocus();
    await expect(viewport.scrollTop).toBeGreaterThan(0);
  },
};
