import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../../src/index.js";

const meta = {
  tags: ["theme"],
  id: "components-badge",
  title: "Components/Feedback/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "muted",
        "outline",
        "success",
        "warning",
        "destructive",
        "info",
      ],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Compact status labels with semantic variants and optional native links. [Usage and accessibility](https://pycolors.io/docs/ui/badge).",
      },
    },
    controls: { include: ["children", "variant", "size"] },
  },
  args: { children: "Active", variant: "default", size: "md" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["theme"],
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex max-w-3xl flex-wrap items-center gap-3">
      {(
        [
          "default",
          "secondary",
          "muted",
          "outline",
          "success",
          "warning",
          "destructive",
          "info",
        ] as const
      ).map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Badge key={size} size={size}>
          {size}
        </Badge>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
export const LongContent: Story = {
  tags: ["theme", "responsive"],
  args: {
    children: "Waiting for the workspace administrator to review this request",
    className: "max-w-xs h-auto whitespace-normal",
  },
};
export const NativeLink: Story = {
  render: () => (
    <Badge asChild variant="outline">
      <a href="https://pycolors.io/docs/ui/badge">Badge documentation</a>
    </Badge>
  ),
  parameters: { controls: { disable: true } },
};
