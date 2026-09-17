import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../src/index.js";

const meta = {
  tags: ["theme", "responsive"],
  id: "components-button",
  title: "Components/Forms/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
    },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Native actions, accessible icon buttons and link composition. [Usage and accessibility](https://pycolors.io/docs/ui/button).",
      },
    },
    controls: { include: ["children", "variant", "size", "disabled"] },
  },
  args: {
    children: "Save changes",
    variant: "default",
    size: "default",
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ["theme"],
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex max-w-4xl flex-wrap items-center gap-3">
      {(
        [
          "default",
          "secondary",
          "outline",
          "ghost",
          "destructive",
          "link",
        ] as const
      ).map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
      <Button disabled>Disabled</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
      {(["icon-sm", "icon", "icon-lg"] as const).map((size) => (
        <Button key={size} size={size} aria-label={`Add project (${size})`}>
          <span aria-hidden="true">+</span>
        </Button>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
export const Disabled: Story = { args: { disabled: true } };
export const LoadingComposition: Story = {
  args: { disabled: true, "aria-busy": true, children: "Saving…" },
};
export const NativeLink: Story = {
  render: () => (
    <Button asChild>
      <a href="https://pycolors.io/docs/ui/button">Read Button documentation</a>
    </Button>
  ),
  parameters: { controls: { disable: true } },
};
