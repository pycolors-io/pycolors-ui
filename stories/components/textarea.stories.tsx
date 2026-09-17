import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "../../src/index.js";
import { StoryGrid } from "../fixtures.js";

const meta = {
  id: "components-textarea",
  title: "Components/Forms/Textarea",
  component: Textarea,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
    },
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
          "Multiline fields with labels, validation, resizing and read-only content. [Usage and accessibility](https://pycolors.io/docs/ui/textarea).",
      },
    },
    controls: {
      include: [
        "label",
        "placeholder",
        "size",
        "resize",
        "disabled",
        "readOnly",
        "required",
        "error",
      ],
    },
  },
  args: {
    label: "Release notes",
    placeholder: "Describe the change",
    size: "md",
    resize: "vertical",
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryGrid>
      <Textarea
        label="Release notes"
        placeholder="Describe the user-facing change"
        helperText="Keep the summary concrete and concise."
      />
      <Textarea
        label="Required context"
        defaultValue="Too short"
        error="Add at least one validation note."
      />
    </StoryGrid>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryGrid>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Textarea key={size} size={size} label={`${size} notes`} />
      ))}
    </StoryGrid>
  ),
  parameters: { controls: { disable: true } },
};
export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Notes are unavailable while saving." },
};
export const LongContent: Story = {
  args: {
    readOnly: true,
    defaultValue:
      "These synthetic notes contain several lines of content.\nReview the long text at a narrow viewport and check that resizing keeps the field usable.\nThe content is read-only but remains selectable.",
    className: "max-w-xs",
  },
};
