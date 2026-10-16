import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PasswordInput } from "../../src/index.js";

const meta = {
  tags: ["theme", "responsive"],
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
  play: async ({ canvasElement, step }) => {
    await step("interaction: Default", async () => {
      const view = within(canvasElement);
      const input = view.getByLabelText("Password", { selector: "input" });
      await expect(input).toHaveAttribute("type", "password");
      await userEvent.clear(input);
      await userEvent.type(input, "synthetic-password");
      await userEvent.click(
        view.getByRole("button", { name: "Show password" }),
      );
      await expect(input).toHaveAttribute("type", "text");
      await expect(input).toHaveValue("synthetic-password");
      await userEvent.click(
        view.getByRole("button", { name: "Hide password" }),
      );
      await expect(input).toHaveAttribute("type", "password");
    });
  },
  tags: ["theme"],
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
  play: async ({ canvasElement, step }) => {
    await step("interaction: Error", async () => {
      await expect(
        within(canvasElement).getByLabelText("Password", { selector: "input" }),
      ).toHaveAccessibleDescription("Use a longer password.");
    });
  },
  render: () => (
    <PasswordInput
      label="Password"
      defaultValue="demo"
      error="Use a longer password."
    />
  ),
};
export const Disabled: Story = {
  play: async ({ canvasElement, step }) => {
    await step("interaction: Disabled", async () => {
      const view = within(canvasElement);
      await expect(
        view.getByLabelText("Password", { selector: "input" }),
      ).toBeDisabled();
      await expect(
        view.getByRole("button", { name: "Show password" }),
      ).toBeDisabled();
    });
  },
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
