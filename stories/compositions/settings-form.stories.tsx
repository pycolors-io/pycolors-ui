import { expect, userEvent, within } from "storybook/test";
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Alert,
  AlertDescription,
  Button,
  Input,
  Textarea,
} from "../../src/index.js";

function SettingsForm() {
  const [name, setName] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const error =
    submitted && !name.trim() ? "Enter a workspace name." : undefined;
  return (
    <form
      className="max-w-md space-y-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <Input
        label="Workspace name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          setSubmitted(false);
        }}
        required
        error={error}
      />
      <Textarea
        label="Review notes"
        value={notes}
        onChange={(event) => {
          setNotes(event.target.value);
          setSubmitted(false);
        }}
        helperText="Synthetic local example; nothing is sent or stored."
      />
      <Button type="submit">Save locally</Button>
      {submitted && !error ? (
        <Alert variant="success" ariaLive="polite">
          <AlertDescription>
            Example saved in this preview only.
          </AlertDescription>
        </Alert>
      ) : null}
    </form>
  );
}
const meta = {
  tags: ["theme", "responsive"],
  id: "compositions-settings-form",
  title: "Compositions/Settings form",
  component: SettingsForm,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Local controlled form using public primitives. [Composition](https://pycolors.io/docs/ui/composition). Not a Block or Starter implementation.",
      },
    },
  },
} satisfies Meta<typeof SettingsForm>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    await step("interaction: Default", async () => {
      const view = within(canvasElement);
      await userEvent.click(view.getByRole("button", { name: "Save locally" }));
      await expect(
        view.getByRole("textbox", { name: /^Workspace name/ }),
      ).toHaveAccessibleDescription("Enter a workspace name.");
      await userEvent.type(
        view.getByRole("textbox", { name: /^Workspace name/ }),
        "Demo workspace",
      );
      await userEvent.type(
        view.getByRole("textbox", { name: "Review notes" }),
        "Synthetic review",
      );
      await userEvent.click(view.getByRole("button", { name: "Save locally" }));
      await expect(
        await view.findByText("Example saved in this preview only."),
      ).toBeVisible();
    });
  },
  tags: ["theme"],
};

// Separate final error state so the official a11y scan sees validation feedback.
export const ValidationError: Story = {
  play: async ({ canvasElement, step }) => {
    await step("interaction: validation error", async () => {
      const view = within(canvasElement);
      await userEvent.click(view.getByRole("button", { name: "Save locally" }));
      await expect(
        view.getByRole("textbox", { name: /^Workspace name/ }),
      ).toHaveAttribute("aria-invalid", "true");
      await expect(
        view.getByRole("textbox", { name: /^Workspace name/ }),
      ).toHaveAccessibleDescription("Enter a workspace name.");
    });
  },
};
