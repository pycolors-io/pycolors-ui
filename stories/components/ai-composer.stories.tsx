import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AIComposer, type AIComposerProps } from "../../src/index.js";

function ControlledComposer(args: AIComposerProps) {
  const [value, setValue] = useState(args.value);
  const [busy, setBusy] = useState(args.busy ?? false);
  return (
    <div className="w-full max-w-xl space-y-4">
      <p className="text-sm text-muted-foreground">
        Local interaction example. No model is connected.
      </p>
      <AIComposer
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        busy={busy}
        onSubmit={() => setBusy(true)}
        onStop={() => setBusy(false)}
      />
      <p role="status" className="text-sm text-muted-foreground">
        {busy
          ? "Submission received locally. Use Stop response to reset."
          : "Ready for a local submission."}
      </p>
    </div>
  );
}

const meta = {
  id: "components-ai-composer",
  title: "Components/Forms/AI Composer",
  component: AIComposer,
  tags: ["theme", "responsive"],
  parameters: {
    docs: {
      description: {
        component:
          "Controlled chat input built from Textarea and Button. No model or transport. [Usage and accessibility](https://pycolors.io/docs/ui/ai-composer).",
      },
    },
    controls: { disable: true },
  },
  args: {
    label: "Message",
    value: "",
    onChange: () => {},
    onSubmit: () => {},
    helperText:
      "Enter sends on desktop. Shift+Enter adds a line. On touch screens, use Send message.",
  },
  render: (args) => <ControlledComposer {...args} />,
} satisfies Meta<typeof AIComposer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Message" });
    await userEvent.type(input, "Summarize this release");
    await userEvent.keyboard("{Shift>}{Enter}{/Shift}Keep it concise");
    await expect(input).toHaveValue("Summarize this release\nKeep it concise");
    await userEvent.click(canvas.getByRole("button", { name: "Send message" }));
    await expect(
      canvas.getByRole("button", { name: "Stop response" }),
    ).toBeEnabled();
    await expect(input).toHaveValue("Summarize this release\nKeep it concise");
    await userEvent.click(
      canvas.getByRole("button", { name: "Stop response" }),
    );
    await expect(
      canvas.getByRole("button", { name: "Send message" }),
    ).toBeEnabled();
  },
};
export const Busy: Story = {
  args: { value: "Keep this draft while the application is busy.", busy: true },
};
export const Error: Story = {
  args: {
    value: "Draft preserved after a failed request.",
    error: "The application could not send your message. Try again.",
  },
};
export const Disabled: Story = {
  args: { disabled: true, value: "Messaging is unavailable." },
};
export const LongContent: Story = {
  args: {
    value:
      "Review the accessible settings screen and explain the tradeoffs.\n".repeat(
        20,
      ),
    className: "max-h-64",
    submitLabel: "Send this message for a detailed review",
  },
};
