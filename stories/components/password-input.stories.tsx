import type { Meta, StoryObj } from "@storybook/react-vite";
import { PasswordInput } from "../../src/index.js";

const meta = {
  id: "components-password-input",
  title: "Components/Forms/PasswordInput",
  component: PasswordInput,
  parameters: {
    docs: {
      description: {
        component:
          "Password fields with accessible visibility controls and field states. [Usage and accessibility](https://pycolors.io/docs/ui/password-input).",
      },
    },
    controls: { include: [] },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="max-w-md">
      <PasswordInput
        label="Password"
        defaultValue="correct-horse-battery-staple"
        helperText="Use the visibility control to inspect the value."
      />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <PasswordInput
      label="Password"
      defaultValue="demo"
      error="Use a longer password."
    />
  ),
};
export const Disabled: Story = {
  render: () => (
    <PasswordInput
      label="Password"
      defaultValue="synthetic-demo-password"
      disabled
    />
  ),
};
export const ReadOnly: Story = {
  render: () => (
    <PasswordInput
      label="Password"
      defaultValue="synthetic-demo-password"
      readOnly
    />
  ),
};
