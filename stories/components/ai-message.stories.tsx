import type { Meta, StoryObj } from "@storybook/react-vite";
import { AIMessage } from "../../src/index.js";
const meta = {
  id: "components-ai-message",
  title: "Components/Data display/AI Message",
  component: AIMessage,
  tags: ["theme", "responsive"],
  parameters: {
    docs: {
      description: {
        component:
          "Semantic message presentation. [Usage and accessibility](https://pycolors.io/docs/ui/ai-message).",
      },
    },
  },
  args: {
    author: "Assistant",
    children: "A fixed example. Your application supplies the content.",
  },
  decorators: [
    (Story) => (
      <ol className="w-full max-w-xl list-none">
        <Story />
      </ol>
    ),
  ],
} satisfies Meta<typeof AIMessage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const LongContent: Story = {
  args: { children: "Long_unbroken_message_".repeat(30) },
};
