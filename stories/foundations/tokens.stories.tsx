import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Input } from "../../src/index.js";

const meta = {
  tags: ["theme", "responsive"],
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
  tags: ["theme"],
  render: () => (
    <div className="explorer-page">
      <header className="mb-8">
        <p className="explorer-eyebrow">Foundations / Semantic tokens</p>
        <h1>Color with a purpose.</h1>
        <p className="explorer-description">
          Shared surfaces, accents and status colors. Switch the preview theme
          to inspect each surface with its paired foreground.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
            className="overflow-hidden rounded-md border border-border bg-background"
          >
            <div
              className={`flex h-24 items-center justify-between border-b border-border px-5 ${classes}`}
            >
              <span className="text-3xl font-medium" aria-hidden="true">
                Aa
              </span>
              <span className="text-xs">Foreground</span>
            </div>
            <div className="p-4">
              <h2 className="!text-sm !tracking-normal">{label}</h2>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {classes?.split(" ")[0]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
export const TypeSpacingAndFocus: Story = {
  render: () => (
    <div className="explorer-page">
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
    </div>
  ),
};
