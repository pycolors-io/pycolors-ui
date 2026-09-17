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
export const Default: Story = {};
