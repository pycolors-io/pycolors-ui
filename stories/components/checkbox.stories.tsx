import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Checkbox,
  CheckboxContent,
  CheckboxDescription,
  CheckboxField,
  CheckboxLabel,
} from "../../src/index.js";

const meta = {
  id: "components-checkbox",
  title: "Components/Forms/Checkbox",
  component: Checkbox,
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Labeled checked, indeterminate, required-error and controlled selections. [Usage and accessibility](https://pycolors.io/docs/ui/checkbox).",
      },
    },
    controls: { include: ["disabled", "required"] },
  },
  args: { disabled: false },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <CheckboxField>
      <Checkbox {...args} id="updates" />
      <CheckboxLabel htmlFor="updates">Release updates</CheckboxLabel>
    </CheckboxField>
  ),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid max-w-xl gap-5">
      <CheckboxField>
        <Checkbox id="release-updates" defaultChecked />
        <CheckboxContent>
          <CheckboxLabel htmlFor="release-updates">
            Release updates
          </CheckboxLabel>
          <CheckboxDescription>
            Receive a summary when a new package version is available.
          </CheckboxDescription>
        </CheckboxContent>
      </CheckboxField>

      <CheckboxField>
        <Checkbox id="partial-selection" checked="indeterminate" />
        <CheckboxContent>
          <CheckboxLabel htmlFor="partial-selection">
            Select workspace projects
          </CheckboxLabel>
          <CheckboxDescription>Some projects are selected.</CheckboxDescription>
        </CheckboxContent>
      </CheckboxField>

      <CheckboxField>
        <Checkbox
          id="terms"
          required
          error="You must accept the terms before continuing."
        />
        <CheckboxContent>
          <CheckboxLabel htmlFor="terms">Accept the terms</CheckboxLabel>
          <CheckboxDescription>
            Required before creating a workspace.
          </CheckboxDescription>
        </CheckboxContent>
      </CheckboxField>
    </div>
  ),
};

function ControlledCheckbox() {
  const [checked, setChecked] = React.useState(false);
  return (
    <div className="space-y-3">
      <CheckboxField>
        <Checkbox
          id="controlled-updates"
          checked={checked}
          onCheckedChange={(value) => setChecked(value === true)}
        />
        <CheckboxLabel htmlFor="controlled-updates">
          Send release updates
        </CheckboxLabel>
      </CheckboxField>
      <p role="status">Updates {checked ? "enabled" : "disabled"}</p>
    </div>
  );
}
export const Controlled: Story = {
  render: () => <ControlledCheckbox />,
  parameters: { controls: { disable: true } },
};
export const Disabled: Story = { ...Default, args: { disabled: true } };
