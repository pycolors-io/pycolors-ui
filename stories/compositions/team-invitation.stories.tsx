import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useId, useState } from "react";
import {
  Alert,
  AlertDescription,
  Button,
  Card,
  Input,
} from "../../src/index.js";

type InvitationState = "empty" | "invalid" | "saved";
type InvitationRole = "member" | "admin";

function TeamInvitation({
  initialState = "empty",
}: {
  initialState?: InvitationState;
}) {
  const roleId = useId();
  const [email, setEmail] = useState(
    initialState === "saved"
      ? "teammate@example.com"
      : initialState === "invalid"
        ? "not-an-email"
        : "",
  );
  const [role, setRole] = useState<InvitationRole>("member");
  const [error, setError] = useState<string | undefined>(
    initialState === "invalid" ? "Enter a valid email address." : undefined,
  );
  const [saved, setSaved] = useState(initialState === "saved");

  return (
    <Card className="max-w-lg p-5 sm:p-6">
      <form
        aria-label="Prepare a team invitation"
        className="space-y-5"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          const field = event.currentTarget.elements.namedItem("email");
          if (!(field instanceof HTMLInputElement) || !field.validity.valid) {
            setError("Enter a valid email address.");
            setSaved(false);
            if (field instanceof HTMLInputElement) field.focus();
            return;
          }
          setError(undefined);
          setSaved(true);
        }}
        onReset={() => {
          setEmail("");
          setRole("member");
          setError(undefined);
          setSaved(false);
        }}
      >
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Prepare a team invitation</h2>
          <p className="text-sm text-muted-foreground">
            Local example. No invitation or email is sent.
          </p>
        </div>
        <Input
          name="email"
          label="Teammate email"
          type="email"
          required
          value={email}
          error={error}
          placeholder="teammate@example.com"
          onChange={(event) => {
            setEmail(event.target.value);
            setError(undefined);
            setSaved(false);
          }}
        />
        <div className="space-y-2">
          <label htmlFor={roleId} className="block text-sm font-medium">
            Role
          </label>
          <select
            id={roleId}
            value={role}
            className="min-h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            onChange={(event) => {
              const next = event.target.value;
              if (next === "member" || next === "admin") setRole(next);
              setSaved(false);
            }}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="submit">Prepare invitation</Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </div>
        {saved ? (
          <Alert variant="success">
            <AlertDescription>
              Invitation prepared locally for {email.trim()} as{" "}
              {role === "member" ? "Member" : "Admin"}. No email was sent.
            </AlertDescription>
          </Alert>
        ) : null}
      </form>
    </Card>
  );
}

const source = `"use client";

import { useId, useState } from "react";
import { Alert, AlertDescription, Button, Card, Input } from "@pycolors/ui";

type InvitationState = "empty" | "invalid" | "saved";
type InvitationRole = "member" | "admin";

export default function TeamInvitation({
  initialState = "empty",
}: {
  initialState?: InvitationState;
}) {
  const roleId = useId();
  const [email, setEmail] = useState(
    initialState === "saved"
      ? "teammate@example.com"
      : initialState === "invalid"
        ? "not-an-email"
        : "",
  );
  const [role, setRole] = useState<InvitationRole>("member");
  const [error, setError] = useState<string | undefined>(
    initialState === "invalid" ? "Enter a valid email address." : undefined,
  );
  const [saved, setSaved] = useState(initialState === "saved");

  return (
    <Card className="max-w-lg p-5 sm:p-6">
      <form
        aria-label="Prepare a team invitation"
        className="space-y-5"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          const field = event.currentTarget.elements.namedItem("email");
          if (!(field instanceof HTMLInputElement) || !field.validity.valid) {
            setError("Enter a valid email address.");
            setSaved(false);
            if (field instanceof HTMLInputElement) field.focus();
            return;
          }
          setError(undefined);
          setSaved(true);
        }}
        onReset={() => {
          setEmail("");
          setRole("member");
          setError(undefined);
          setSaved(false);
        }}
      >
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Prepare a team invitation</h2>
          <p className="text-sm text-muted-foreground">
            Local example. No invitation or email is sent.
          </p>
        </div>
        <Input
          name="email"
          label="Teammate email"
          type="email"
          required
          value={email}
          error={error}
          placeholder="teammate@example.com"
          onChange={(event) => {
            setEmail(event.target.value);
            setError(undefined);
            setSaved(false);
          }}
        />
        <div className="space-y-2">
          <label htmlFor={roleId} className="block text-sm font-medium">
            Role
          </label>
          <select
            id={roleId}
            value={role}
            className="min-h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            onChange={(event) => {
              const next = event.target.value;
              if (next === "member" || next === "admin") setRole(next);
              setSaved(false);
            }}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="submit">Prepare invitation</Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </div>
        {saved ? (
          <Alert variant="success">
            <AlertDescription>
              Invitation prepared locally for {email.trim()} as{" "}
              {role === "member" ? "Member" : "Admin"}. No email was sent.
            </AlertDescription>
          </Alert>
        ) : null}
      </form>
    </Card>
  );
}
`;

const meta = {
  id: "compositions-team-invitation",
  title: "Compositions/Team invitation",
  component: TeamInvitation,
  tags: ["theme", "responsive"],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Local email validation, role selection and confirmation using public primitives. Nothing is sent. [Composition](https://pycolors.io/docs/ui/composition).",
      },
      source: { code: source, language: "tsx" },
    },
  },
} satisfies Meta<typeof TeamInvitation>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TeamInvitation />,
  play: async ({ canvasElement, globals }) => {
    if (globals.runStoryInteractions !== true) return;
    const view = within(canvasElement);
    const email = view.getByRole("textbox", { name: /^Teammate email/ });
    await userEvent.click(
      view.getByRole("button", { name: "Prepare invitation" }),
    );
    await expect(email).toHaveFocus();
    await expect(email).toHaveAttribute("aria-invalid", "true");
    await expect(email).toHaveAccessibleDescription(
      "Enter a valid email address.",
    );
    await userEvent.type(email, "teammate@example.com");
    await userEvent.selectOptions(
      view.getByRole("combobox", { name: "Role" }),
      "admin",
    );
    await userEvent.click(
      view.getByRole("button", { name: "Prepare invitation" }),
    );
    await expect(view.getByRole("status")).toHaveTextContent(
      "Invitation prepared locally for teammate@example.com as Admin. No email was sent.",
    );
    await userEvent.click(view.getByRole("button", { name: "Reset" }));
    await expect(email).toHaveValue("");
    await expect(email).toHaveAttribute("aria-invalid", "false");
    await expect(view.getByRole("combobox", { name: "Role" })).toHaveValue(
      "member",
    );
    await expect(view.queryByRole("status")).not.toBeInTheDocument();
  },
};

export const ValidationError: Story = {
  render: () => <TeamInvitation initialState="invalid" />,
  parameters: {
    docs: {
      source: {
        code: source.replace(
          'initialState = "empty"',
          'initialState = "invalid"',
        ),
        language: "tsx",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const email = within(canvasElement).getByRole("textbox", {
      name: /^Teammate email/,
    });
    await expect(email).toHaveAttribute("aria-invalid", "true");
    await expect(email).toHaveAccessibleDescription(
      "Enter a valid email address.",
    );
  },
};

export const LocalSuccess: Story = {
  render: () => <TeamInvitation initialState="saved" />,
  parameters: {
    docs: {
      source: {
        code: source.replace(
          'initialState = "empty"',
          'initialState = "saved"',
        ),
        language: "tsx",
      },
    },
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("status")).toHaveTextContent(
      "No email was sent.",
    );
  },
};
