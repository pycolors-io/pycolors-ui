import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  TextCursorInput,
  MessageSquare,
  PanelsTopLeft,
  MousePointer2,
  Table2,
  LayoutTemplate,
  Palette,
  RotateCcw,
  Save,
  SunMoon,
  Terminal,
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
    "Inputs, selection controls and their validation states.",
    "components-button--default",
    TextCursorInput,
  ],
  [
    "Feedback",
    "Loading, empty states and status feedback.",
    "components-alert--default",
    MessageSquare,
  ],
  [
    "Overlays",
    "Dialogs, contextual menus and focus behavior.",
    "components-dialog--default",
    PanelsTopLeft,
  ],
  [
    "Navigation",
    "Tabs, current pages and navigation states.",
    "components-tabs--default",
    MousePointer2,
  ],
  [
    "Data display",
    "Structured tables and conversation content.",
    "components-table--default",
    Table2,
  ],
  [
    "Layout",
    "Surfaces, spacing and composed interfaces.",
    "components-card--default",
    LayoutTemplate,
  ],
] as const;

const pathways = [
  [
    "Components",
    "Inspect variants, states and keyboard behavior.",
    "components-button--default",
    MousePointer2,
  ],
  [
    "Appearance",
    "Try shared palettes and radii in light and dark.",
    "foundations-tokens--appearance",
    Palette,
  ],
  [
    "Compositions",
    "See fields, validation and feedback work together.",
    "compositions-settings-form--default",
    LayoutTemplate,
  ],
] as const;

function WorkspacePreview() {
  const updatesId = useId();
  const [workspace, setWorkspace] = useState("Acme Studio");
  const [updates, setUpdates] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <div className="explorer-demo-window">
      <div className="explorer-window-bar">
        <span className="explorer-window-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="explorer-window-title">UI preview</span>
        <Badge variant="outline">Interactive</Badge>
      </div>
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
        <div className="explorer-demo-body">
          <p className="explorer-demo-context">Acme Studio / Settings</p>
          <h2>Workspace preferences</h2>
          <p className="explorer-demo-description">
            Edit a field, change a preference and save.
          </p>
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
            <Button type="submit">
              <Save aria-hidden="true" focusable="false" strokeWidth={1.5} />
              Save preferences
            </Button>
            <Button type="reset" variant="ghost">
              <RotateCcw
                aria-hidden="true"
                focusable="false"
                strokeWidth={1.5}
              />
              Reset
            </Button>
          </div>
          <p role="status" className="explorer-demo-status">
            {saved
              ? "Preferences updated in this preview."
              : "Nothing is sent or saved outside this preview."}
          </p>
          <a
            className="explorer-demo-link"
            href="./?path=/story/compositions-settings-form--validation-error"
            target="_top"
          >
            Explore validation states
            <ArrowRight
              className="explorer-link-arrow"
              size={14}
              strokeWidth={1.5}
              aria-hidden="true"
              focusable="false"
            />
          </a>
        </div>
      </form>
    </div>
  );
}

export const Default: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="explorer-overview">
      <div className="explorer-page">
        <div className="explorer-masthead">
          <p className="explorer-masthead-brand">
            <span className="explorer-brand-mark" aria-hidden="true" />
            <span>PyColors UI</span>
            <span className="explorer-masthead-label">Component explorer</span>
          </p>
          <span className="explorer-license">Open source · MIT</span>
        </div>
        <header className="explorer-intro">
          <div className="explorer-hero-copy">
            <p className="explorer-eyebrow">
              Foundations for product interfaces
            </p>
            <h1>Build your next interface.</h1>
            <p className="explorer-description">
              React components for forms, settings, navigation and data. Inspect
              their behavior, tune the shared tokens and follow the
              documentation into your application.
            </p>
            <div className="explorer-actions">
              <Button asChild>
                <a
                  href="./?path=/story/components-button--default"
                  target="_top"
                >
                  Explore components
                  <ArrowRight
                    aria-hidden="true"
                    focusable="false"
                    strokeWidth={1.5}
                  />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a
                  href="https://pycolors.io/docs/ui/installation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BookOpen
                    aria-hidden="true"
                    focusable="false"
                    strokeWidth={1.5}
                  />
                  Installation guide{" "}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Button>
            </div>
            <ul
              className="explorer-hero-notes"
              aria-label="Library foundations"
            >
              <li>
                <Code2
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  focusable="false"
                />
                Typed React APIs
              </li>
              <li>
                <MousePointer2
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  focusable="false"
                />
                Radix interactions
              </li>
              <li>
                <SunMoon
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  focusable="false"
                />
                Light &amp; dark tokens
              </li>
            </ul>
          </div>
          <WorkspacePreview />
        </header>

        <div className="explorer-section-divider" aria-hidden="true" />

        <nav aria-label="Explore the system" className="explorer-paths">
          {pathways.map(([label, description, id, Icon], index) => (
            <a key={id} href={`./?path=/story/${id}`} target="_top">
              <span className="explorer-path-meta" aria-hidden="true">
                <span>0{index + 1}</span>
                <Icon size={18} strokeWidth={1.5} focusable="false" />
              </span>
              <h2>{label}</h2>
              <p>{description}</p>
              <span className="explorer-path-action">
                Explore {label.toLowerCase()}
                <ArrowRight
                  className="explorer-link-arrow"
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  focusable="false"
                />
              </span>
            </a>
          ))}
        </nav>

        <aside className="explorer-install" aria-label="Package installation">
          <div>
            <h2>Bring it into your project.</h2>
            <p>
              <a
                href="https://pycolors.io/docs/ui/installation"
                target="_blank"
                rel="noopener noreferrer"
              >
                Installation, dependencies and styles
                <span className="sr-only"> (opens in a new tab)</span>
                <ArrowUpRight
                  className="explorer-link-arrow"
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  focusable="false"
                />
              </a>
            </p>
          </div>
          <div className="explorer-install-command">
            <span className="explorer-code-label">
              <Terminal
                size={14}
                strokeWidth={1.5}
                aria-hidden="true"
                focusable="false"
              />
              Terminal
            </span>
            <code>pnpm add @pycolors/ui @pycolors/tokens</code>
          </div>
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
                  <Icon size={18} strokeWidth={1.5} focusable="false" />
                </span>
                <div className="explorer-category-copy">
                  <h3>
                    {label}
                    <ArrowRight
                      className="explorer-link-arrow"
                      size={14}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      focusable="false"
                    />
                  </h3>
                  <p>{description}</p>
                </div>
              </a>
            ))}
          </nav>
        </section>

        <section
          aria-labelledby="explorer-inspect-heading"
          className="explorer-footer"
        >
          <div>
            <p className="explorer-kicker">A closer look</p>
            <h2 id="explorer-inspect-heading">
              The details are part of the system.
            </h2>
            <p>
              Check keyboard behavior, focus and state changes in the examples.
              The documentation explains each component’s API, composition and
              accessibility responsibilities.
            </p>
          </div>
          <nav aria-label="Design system resources">
            <a href="./?path=/story/foundations-tokens--default" target="_top">
              <span className="explorer-resource-label">
                <Palette
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  focusable="false"
                />
                Explore design tokens
              </span>
              <ArrowRight
                className="explorer-link-arrow"
                size={14}
                strokeWidth={1.5}
                aria-hidden="true"
                focusable="false"
              />
            </a>
            <a
              href="https://pycolors.io/docs/ui/accessibility"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="explorer-resource-label">
                <Accessibility
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  focusable="false"
                />
                Accessibility guidance
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
              <ArrowUpRight
                className="explorer-link-arrow"
                size={14}
                strokeWidth={1.5}
                aria-hidden="true"
                focusable="false"
              />
            </a>
            <a
              href="https://pycolors.io/docs/ui"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="explorer-resource-label">
                <BookOpen
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  focusable="false"
                />
                Read the documentation
              </span>{" "}
              <span className="sr-only">(opens in a new tab)</span>
              <ArrowUpRight
                className="explorer-link-arrow"
                size={14}
                strokeWidth={1.5}
                aria-hidden="true"
                focusable="false"
              />
            </a>
          </nav>
        </section>
      </div>
    </div>
  ),
  play: async ({ canvasElement, globals }) => {
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
    const paths = within(
      canvas.getByRole("navigation", { name: "Explore the system" }),
    );
    await expect(paths.getAllByRole("link")).toHaveLength(3);
    await expect(
      paths.getByRole("link", { name: /Appearance/ }),
    ).toHaveAttribute("href", "./?path=/story/foundations-tokens--appearance");
    await expect(
      paths.getByRole("link", { name: /Compositions/ }),
    ).toHaveAttribute(
      "href",
      "./?path=/story/compositions-settings-form--default",
    );
    await expect(
      canvas.getByRole("link", { name: "Explore validation states" }),
    ).toHaveAttribute(
      "href",
      "./?path=/story/compositions-settings-form--validation-error",
    );
    if (globals.runOverviewInteractions !== true) return;

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
