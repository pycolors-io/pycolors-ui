import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "../../src/index.js";

const meta = {
  id: "components-separator",
  title: "Components/Layout/Separator",
  component: Separator,
  parameters: {
    docs: {
      description: {
        component:
          "Decorative and semantic separation in both orientations. [Usage and accessibility](https://pycolors.io/docs/ui/separator).",
      },
    },
    controls: { include: [] },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["theme"],
  render: () => (
    <div className="grid max-w-xl gap-6">
      <div>
        <p className="text-sm font-medium">Workspace settings</p>
        <Separator className="my-3" />
        <p className="text-sm text-muted-foreground">
          Horizontal decorative separation.
        </p>
      </div>
      <div className="flex h-8 items-center gap-4">
        <span className="text-sm">Profile</span>
        <Separator orientation="vertical" decorative={false} />
        <span className="text-sm">Security</span>
      </div>
    </div>
  ),
};
