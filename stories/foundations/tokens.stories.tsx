import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Input } from "../../src/index.js";

const meta = {
  id: "foundations-tokens",
  title: "Foundations/Tokens",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Existing semantic tokens, typography, spacing and focus styles. [Theming](https://pycolors.io/docs/ui/theming).",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
      {[
        ["Background", "bg-background text-foreground"],
        ["Card", "bg-card text-card-foreground"],
        ["Primary", "bg-primary text-primary-foreground"],
        ["Secondary", "bg-secondary text-secondary-foreground"],
        ["Muted", "bg-muted text-muted-foreground"],
        ["Accent", "bg-accent text-accent-foreground"],
        ["Success", "bg-success text-success-foreground"],
        ["Warning", "bg-warning text-warning-foreground"],
        ["Destructive", "bg-destructive text-destructive-foreground"],
      ].map(([label, classes]) => (
        <div
          key={label}
          className={`rounded-md border border-border p-4 ${classes}`}
        >
          <p className="font-medium">{label}</p>
          <p className="text-sm">Semantic surface and foreground</p>
        </div>
      ))}
    </div>
  ),
};
export const TypeSpacingAndFocus: Story = {
  render: () => (
    <div className="max-w-xl space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Workspace typography</h2>
        <p className="text-sm text-muted-foreground">
          Existing utilities and tokens; use Tab to inspect focus.
        </p>
      </div>
      <Input label="Workspace" placeholder="Project name" />
      <div className="flex flex-wrap gap-3">
        <Button>Save changes</Button>
        <Button disabled>Unavailable</Button>
      </div>
    </div>
  ),
};
