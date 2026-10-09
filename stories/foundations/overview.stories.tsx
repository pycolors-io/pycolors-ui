import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import {
  TextCursorInput,
  MessageSquare,
  PanelsTopLeft,
  MousePointer2,
  Table2,
  LayoutTemplate,
} from "lucide-react";
import { Badge, Button, Checkbox, Input } from "../../src/index.js";

const meta = {
  id: "foundations-overview",
  title: "Foundations/Overview",
  tags: ["theme", "responsive"],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Start with public components, inspect their states, then follow the canonical [installation guide](https://pycolors.io/docs/ui/installation).",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const categories = [
  [
    "Forms",
    "Buttons, inputs and selection controls.",
    "components-button--default",
    TextCursorInput,
  ],
  [
    "Feedback",
    "Alerts, status badges and empty states.",
    "components-alert--default",
    MessageSquare,
  ],
  [
    "Overlays",
    "Dialogs, sheets and contextual menus.",
    "components-dialog--default",
    PanelsTopLeft,
  ],
  [
    "Navigation",
    "Tabs and pagination for moving through content.",
    "components-tabs--default",
    MousePointer2,
  ],
  [
    "Data display",
    "Tables and loading placeholders.",
    "components-table--default",
    Table2,
  ],
  [
    "Layout",
    "Cards and separators for structured interfaces.",
    "components-card--default",
    LayoutTemplate,
  ],
] as const;

function WorkspacePreview() {
  const updatesId = useId();
  const [workspace, setWorkspace] = useState("Acme Studio");
  const [updates, setUpdates] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="explorer-demo"
      aria-label="Workspace component demo"
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(true);
      }}
      onReset={() => {
        setWorkspace("Acme Studio");
        setUpdates(true);
        setSaved(false);
      }}
    >
      <div className="explorer-demo-bar">
        <span className="explorer-demo-indicator" aria-hidden="true" />
        <span>Live component preview</span>
        <Badge variant="outline">Local demo</Badge>
      </div>
      <div className="explorer-demo-body">
        <h2>Make it your workspace.</h2>
        <p>Real components. Try the fields and actions.</p>
        <Input
          label="Workspace name"
          required
          value={workspace}
          onChange={(event) => {
            setWorkspace(event.target.value);
            setSaved(false);
          }}
        />
        <div className="explorer-demo-preference">
          <Checkbox
            id={updatesId}
            checked={updates}
            onCheckedChange={(checked) => {
              setUpdates(checked === true);
              setSaved(false);
            }}
          />
          <label htmlFor={updatesId}>Send product updates</label>
        </div>
        <div className="explorer-demo-actions">
          <Button type="submit">Save preferences</Button>
          <Button type="reset" variant="ghost">
            Reset
          </Button>
        </div>
        <p role="status" className="explorer-demo-status">
          {saved
            ? "Preferences updated in this preview."
            : "Nothing is sent or saved outside this preview."}
        </p>
      </div>
    </form>
  );
}

export const Default: Story = {
  render: () => (
    <div className="explorer-page">
      <header className="explorer-intro">
        <div>
          <p className="explorer-eyebrow">
            <span className="explorer-brand-mark" aria-hidden="true" /> PyColors
            UI / Component explorer
          </p>
          <h1>Build your next interface.</h1>
          <p className="explorer-description">
            Start with public React components that work together. Explore their
            states, try the interactions and bring the right pieces into your
            product.
          </p>
          <div className="explorer-actions">
            <Button asChild>
              <a href="./?path=/story/components-button--default" target="_top">
                Explore components
              </a>
            </Button>
            <Button asChild variant="outline">
              <a
                href="https://pycolors.io/docs/ui/installation"
                target="_blank"
                rel="noopener noreferrer"
              >
                Installation guide{" "}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Button>
          </div>
          <ul className="explorer-hero-notes" aria-label="Library foundations">
            <li>Semantic tokens</li>
            <li>Light &amp; dark</li>
            <li>Keyboard interactions</li>
          </ul>
        </div>
        <WorkspacePreview />
      </header>

      <aside className="explorer-install" aria-label="Package installation">
        <div>
          <h2>Bring it into your project.</h2>
          <p>Follow the installation guide for dependencies and styles.</p>
        </div>
        <code>pnpm add @pycolors/ui @pycolors/tokens</code>
      </aside>

      <section
        aria-labelledby="explorer-browse-heading"
        className="explorer-section"
      >
        <div className="explorer-section-heading">
          <h2 id="explorer-browse-heading">Find the right component.</h2>
          <p>Choose a family, then explore its variants and states.</p>
        </div>
        <nav aria-label="Component families" className="explorer-categories">
          {categories.map(([label, description, id, Icon]) => (
            <a
              key={id}
              href={`./?path=/story/${id}`}
              target="_top"
              className="explorer-category"
            >
              <span className="explorer-category-icon" aria-hidden="true">
                <Icon size={18} strokeWidth={1.5} />
              </span>
              <h3>
                {label}
                <span aria-hidden="true">↗</span>
              </h3>
              <p>{description}</p>
            </a>
          ))}
        </nav>
      </section>

      <section
        aria-labelledby="explorer-inspect-heading"
        className="explorer-footer"
      >
        <div>
          <h2 id="explorer-inspect-heading">Inspect before you integrate.</h2>
          <p>
            Use the toolbar to switch theme and viewport. Try the keyboard
            interactions and review the accessibility results in the addon
            panel.
          </p>
        </div>
        <nav aria-label="Design system resources">
          <a href="./?path=/story/foundations-tokens--default" target="_top">
            Explore design tokens <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://pycolors.io/docs/ui"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the documentation{" "}
            <span className="sr-only">(opens in a new tab)</span>
            <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </section>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Build your next interface.",
    );
    const families = within(
      canvas.getByRole("navigation", { name: "Component families" }),
    );
    await expect(families.getAllByRole("link")).toHaveLength(6);
    for (const [label, , id] of categories) {
      await expect(
        families.getByRole("link", { name: new RegExp(label) }),
      ).toHaveAttribute("href", `./?path=/story/${id}`);
    }
    const demo = within(
      canvas.getByRole("form", { name: "Workspace component demo" }),
    );
    const input = demo.getByRole("textbox", { name: /^Workspace name/ });
    await userEvent.clear(input);
    await userEvent.type(input, "Design team");
    const checkbox = demo.getByRole("checkbox", {
      name: "Send product updates",
    });
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
    await userEvent.click(
      demo.getByRole("button", { name: "Save preferences" }),
    );
    await expect(demo.getByRole("status")).toHaveTextContent(
      "Preferences updated in this preview.",
    );
    await expect(input).toHaveValue("Design team");
    await userEvent.click(demo.getByRole("button", { name: "Reset" }));
    await expect(input).toHaveValue("Acme Studio");
    await expect(checkbox).toBeChecked();
  },
};
