import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../../src/index.js";
import { StoryGrid } from "../fixtures.js";

const meta = {
  id: "components-input",
  title: "Components/Forms/Input",
  component: Input,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    required: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Labeled text fields with sizes, helper/error text and native input states. [Usage and accessibility](https://pycolors.io/docs/ui/input).",
      },
    },
    controls: {
      include: [
        "label",
        "placeholder",
        "size",
        "disabled",
        "readOnly",
        "required",
        "error",
      ],
    },
  },
  args: { label: "Work email", placeholder: "you@example.com", size: "md" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryGrid>
      <Input
        type="email"
        label="Work email"
        placeholder="you@example.com"
        helperText="Used for workspace notifications."
      />
      <Input
        label="Workspace slug"
        defaultValue="PyColors Demo"
        error="Use lowercase letters, numbers, and hyphens only."
      />
      <Input label="Disabled field" defaultValue="Read only" disabled />
    </StoryGrid>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryGrid>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Input
          key={size}
          size={size}
          label={`${size} field`}
          placeholder="Workspace name"
        />
      ))}
    </StoryGrid>
  ),
  parameters: { controls: { disable: true } },
};
export const ReadOnly: Story = {
  args: {
    label: "Workspace ID",
    defaultValue: "workspace-demo-2026",
    readOnly: true,
  },
};
export const Required: Story = { args: { required: true } };
export const LongContent: Story = {
  args: {
    label: "Workspace name",
    defaultValue:
      "Research and documentation workspace with a deliberately long descriptive name",
  },
};
