import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, EmptyState } from "../../src/index.js";

const meta = {
  tags: ["theme"],
  id: "components-empty-state",
  title: "Components/Feedback/EmptyState",
  component: EmptyState,
  argTypes: {
    ariaLive: { control: "select", options: ["off", "polite", "assertive"] },
    title: { control: "text" },
    description: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Empty results with a title, optional description and consumer-owned action. [Usage and accessibility](https://pycolors.io/docs/ui/empty-state).",
      },
    },
    controls: { include: ["title", "description", "ariaLive"] },
  },
  args: { title: "No projects yet", ariaLive: "off" },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["theme"],
};

export const WithAction: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="max-w-xl">
      <EmptyState
        ariaLive="off"
        icon={
          <span aria-hidden="true" className="text-2xl">
            +
          </span>
        }
        title="No projects yet"
        description="Create a project to start organizing your workspace."
        action={<Button size="sm">Create project</Button>}
      />
    </div>
  ),
};

export const LongContent: Story = {
  tags: ["theme", "responsive"],
  args: {
    title: "No projects match all of these filters",
    description:
      "Try a broader search or clear a filter to see more projects in this workspace.",
    className: "max-w-xs",
  },
};
