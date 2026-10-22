import { expect, userEvent, within } from "storybook/test";
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Checkbox,
  CheckboxContent,
  CheckboxDescription,
  CheckboxField,
  CheckboxLabel,
  Button,
} from "../../src/index.js";

const meta = {
  tags: ["theme", "responsive"],
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
  play: async ({ canvasElement, step }) => {
    await step("interaction: Default", async () => {
      const checkbox = within(canvasElement).getByRole("checkbox", {
        name: "Release updates",
      });
      await expect(checkbox).not.toBeChecked();
      await userEvent.click(within(canvasElement).getByText("Release updates"));
      await expect(checkbox).toBeChecked();
      await userEvent.keyboard(" ");
      await expect(checkbox).not.toBeChecked();
    });
  },
  tags: ["theme"],
  render: (args) => (
    <CheckboxField>
      <Checkbox {...args} id="updates" />
      <CheckboxLabel htmlFor="updates">Release updates</CheckboxLabel>
    </CheckboxField>
  ),
};

export const States: Story = {
  play: async ({ canvasElement, step }) => {
    await step("interaction: States", async () => {
      const view = within(canvasElement);
      await expect(
        view.getByRole("checkbox", { name: "Select workspace projects" }),
      ).toBePartiallyChecked();
      await expect(
        view.getByRole("checkbox", { name: "Accept the terms" }),
      ).toHaveAttribute("aria-invalid", "true");
      await expect(
        view.getByRole("checkbox", { name: "Accept the terms" }),
      ).toHaveAccessibleDescription(/You must accept the terms/);
      const partial = view.getByRole("checkbox", {
        name: "Select local projects",
      });
      await expect(partial).toBePartiallyChecked();
      await expect(partial.querySelector(".lucide-minus")).toBeVisible();
      const form = partial.closest("form")!;
      await expect(new FormData(form).has("projects")).toBe(false);
      partial.focus();
      await userEvent.keyboard(" ");
      await expect(partial).toBeChecked();
      await expect(new FormData(form).get("projects")).toBe("all");
      await expect(partial.querySelector(".lucide-check")).toBeVisible();
      await expect(partial.querySelector(".lucide-minus")).not.toBeVisible();
      await userEvent.click(
        view.getByRole("button", { name: "Reset selection" }),
      );
      await expect(partial).toBePartiallyChecked();
      await expect(new FormData(form).has("projects")).toBe(false);
      await expect(partial.querySelector(".lucide-minus")).toBeVisible();
      await expect(partial.querySelector(".lucide-check")).not.toBeVisible();
    });
  },
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
      <form className="grid gap-3">
        <CheckboxField>
          <Checkbox
            id="local-projects"
            name="projects"
            value="all"
            defaultChecked="indeterminate"
          />
          <CheckboxContent>
            <CheckboxLabel htmlFor="local-projects">
              Select local projects
            </CheckboxLabel>
            <CheckboxDescription>
              Uncontrolled selection; reset restores the partial state.
            </CheckboxDescription>
          </CheckboxContent>
        </CheckboxField>
        <Button
          type="reset"
          variant="outline"
          size="sm"
          className="justify-self-start"
        >
          Reset selection
        </Button>
      </form>
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
  play: async ({ canvasElement, step }) => {
    await step("interaction: Controlled", async () => {
      const view = within(canvasElement);
      await userEvent.click(
        view.getByRole("checkbox", { name: "Send release updates" }),
      );
      await expect(view.getByRole("status")).toHaveTextContent(
        "Updates enabled",
      );
    });
  },
  render: () => <ControlledCheckbox />,
  parameters: { controls: { disable: true } },
};
export const Disabled: Story = {
  play: async ({ canvasElement, step }) => {
    await step("interaction: Disabled", async () => {
      const checkbox = within(canvasElement).getByRole("checkbox", {
        name: "Release updates",
      });
      await expect(checkbox).toBeDisabled();
      await userEvent.click(within(canvasElement).getByText("Release updates"));
      await expect(checkbox).not.toBeChecked();
    });
  },
  args: { disabled: true },
  render: Default.render,
};
