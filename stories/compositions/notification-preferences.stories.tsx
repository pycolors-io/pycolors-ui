import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useId, useState } from "react";
import {
  Alert,
  AlertDescription,
  Button,
  Card,
  Checkbox,
  CheckboxContent,
  CheckboxDescription,
  CheckboxField,
  CheckboxLabel,
} from "../../src/index.js";

const notificationOptions = [
  {
    key: "activity",
    label: "Project activity",
    description: "Updates when a project changes.",
  },
  {
    key: "summary",
    label: "Weekly summary",
    description: "A weekly overview of workspace activity.",
  },
  {
    key: "product",
    label: "Product updates",
    description: "Announcements about new interface features.",
  },
] as const;
type Preferences = Record<(typeof notificationOptions)[number]["key"], boolean>;
const initialPreferences: Preferences = {
  activity: true,
  summary: true,
  product: false,
};

function NotificationPreferences({
  initialSaved = false,
}: {
  initialSaved?: boolean;
}) {
  const id = useId();
  const [preferences, setPreferences] = useState(initialPreferences);
  const [savedPreferences, setSavedPreferences] = useState(initialPreferences);
  const [saved, setSaved] = useState(initialSaved);

  return (
    <Card className="max-w-xl p-5 sm:p-6">
      <form
        aria-label="Notification preferences"
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          setSavedPreferences({ ...preferences });
          setSaved(true);
        }}
        onReset={() => {
          setPreferences({ ...savedPreferences });
          setSaved(false);
        }}
      >
        <fieldset className="space-y-5">
          <legend className="mb-2 text-lg font-semibold">
            Notification preferences
          </legend>
          <p className="text-sm text-muted-foreground">
            This preview keeps changes in memory. No notification settings are
            sent or stored.
          </p>
          {notificationOptions.map((option) => (
            <CheckboxField key={option.key}>
              <Checkbox
                id={`${id}-${option.key}`}
                aria-describedby={`${id}-${option.key}-description`}
                checked={preferences[option.key]}
                onCheckedChange={(checked) => {
                  setPreferences((current) => ({
                    ...current,
                    [option.key]: checked === true,
                  }));
                  setSaved(false);
                }}
              />
              <CheckboxContent>
                <CheckboxLabel
                  htmlFor={`${id}-${option.key}`}
                  className="flex min-h-11 items-center"
                >
                  {option.label}
                </CheckboxLabel>
                <CheckboxDescription id={`${id}-${option.key}-description`}>
                  {option.description}
                </CheckboxDescription>
              </CheckboxContent>
            </CheckboxField>
          ))}
        </fieldset>
        <div className="flex flex-wrap gap-3">
          <Button type="submit">Save preferences</Button>
          <Button type="reset" variant="outline">
            Reset changes
          </Button>
        </div>
        {saved ? (
          <Alert variant="success">
            <AlertDescription>
              Preferences saved in this preview only. Reset changes returns to
              these local values.
            </AlertDescription>
          </Alert>
        ) : null}
      </form>
    </Card>
  );
}

const source = `"use client";

import { useId, useState } from "react";
import {
  Alert,
  AlertDescription,
  Button,
  Card,
  Checkbox,
  CheckboxContent,
  CheckboxDescription,
  CheckboxField,
  CheckboxLabel,
} from "@pycolors/ui";

const notificationOptions = [
  {
    key: "activity",
    label: "Project activity",
    description: "Updates when a project changes.",
  },
  {
    key: "summary",
    label: "Weekly summary",
    description: "A weekly overview of workspace activity.",
  },
  {
    key: "product",
    label: "Product updates",
    description: "Announcements about new interface features.",
  },
] as const;
type Preferences = Record<(typeof notificationOptions)[number]["key"], boolean>;
const initialPreferences: Preferences = {
  activity: true,
  summary: true,
  product: false,
};

export default function NotificationPreferences({
  initialSaved = false,
}: {
  initialSaved?: boolean;
}) {
  const id = useId();
  const [preferences, setPreferences] = useState(initialPreferences);
  const [savedPreferences, setSavedPreferences] = useState(initialPreferences);
  const [saved, setSaved] = useState(initialSaved);

  return (
    <Card className="max-w-xl p-5 sm:p-6">
      <form
        aria-label="Notification preferences"
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          setSavedPreferences({ ...preferences });
          setSaved(true);
        }}
        onReset={() => {
          setPreferences({ ...savedPreferences });
          setSaved(false);
        }}
      >
        <fieldset className="space-y-5">
          <legend className="mb-2 text-lg font-semibold">
            Notification preferences
          </legend>
          <p className="text-sm text-muted-foreground">
            This preview keeps changes in memory. No notification settings are
            sent or stored.
          </p>
          {notificationOptions.map((option) => (
            <CheckboxField key={option.key}>
              <Checkbox
                id={\`\${id}-\${option.key}\`}
                aria-describedby={\`\${id}-\${option.key}-description\`}
                checked={preferences[option.key]}
                onCheckedChange={(checked) => {
                  setPreferences((current) => ({
                    ...current,
                    [option.key]: checked === true,
                  }));
                  setSaved(false);
                }}
              />
              <CheckboxContent>
                <CheckboxLabel
                  htmlFor={\`\${id}-\${option.key}\`}
                  className="flex min-h-11 items-center"
                >
                  {option.label}
                </CheckboxLabel>
                <CheckboxDescription id={\`\${id}-\${option.key}-description\`}>
                  {option.description}
                </CheckboxDescription>
              </CheckboxContent>
            </CheckboxField>
          ))}
        </fieldset>
        <div className="flex flex-wrap gap-3">
          <Button type="submit">Save preferences</Button>
          <Button type="reset" variant="outline">
            Reset changes
          </Button>
        </div>
        {saved ? (
          <Alert variant="success">
            <AlertDescription>
              Preferences saved in this preview only. Reset changes returns to
              these local values.
            </AlertDescription>
          </Alert>
        ) : null}
      </form>
    </Card>
  );
}
`;

const meta = {
  id: "compositions-notification-preferences",
  title: "Compositions/Notification preferences",
  component: NotificationPreferences,
  tags: ["theme", "responsive"],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Controlled checkbox preferences with local save and reset feedback. No settings leave the preview. [Composition](https://pycolors.io/docs/ui/composition).",
      },
      source: { code: source, language: "tsx" },
    },
  },
} satisfies Meta<typeof NotificationPreferences>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <NotificationPreferences />,
  play: async ({ canvasElement, globals }) => {
    if (globals.runStoryInteractions !== true) return;
    const view = within(canvasElement);
    const product = view.getByRole("checkbox", { name: "Product updates" });
    const summary = view.getByRole("checkbox", { name: "Weekly summary" });
    await expect(product).not.toBeChecked();
    await userEvent.click(product);
    await expect(product).toHaveFocus();
    await expect(product).toBeChecked();
    await userEvent.keyboard(" ");
    await expect(product).not.toBeChecked();
    await userEvent.click(product);
    await userEvent.click(view.getByRole("button", { name: "Reset changes" }));
    await expect(product).not.toBeChecked();
    await userEvent.click(product);
    await userEvent.click(
      view.getByRole("button", { name: "Save preferences" }),
    );
    await expect(view.getByRole("status")).toHaveTextContent(
      "Preferences saved in this preview only.",
    );
    await userEvent.click(summary);
    await expect(summary).not.toBeChecked();
    await userEvent.click(view.getByRole("button", { name: "Reset changes" }));
    await expect(summary).toBeChecked();
    await expect(product).toBeChecked();
    await expect(view.queryByRole("status")).not.toBeInTheDocument();
  },
};

export const Saved: Story = {
  render: () => <NotificationPreferences initialSaved />,
  parameters: {
    docs: {
      source: {
        code: source.replace("initialSaved = false", "initialSaved = true"),
        language: "tsx",
      },
    },
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("status")).toHaveTextContent(
      "Preferences saved in this preview only.",
    );
  },
};
