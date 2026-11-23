import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState, type CSSProperties } from "react";
import {
  nativePaletteOptions,
  nativePalettes,
  nativeRadiusPreferences,
  type NativeColorScheme,
  type NativePaletteName,
} from "@pycolors/tokens/native";
import { expect, userEvent, within } from "storybook/test";
import { Badge, Button, Card, Input } from "../../src/index.js";

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
    <div className="explorer-page explorer-foundations">
      <header className="explorer-foundations-header mb-8">
        <p className="explorer-eyebrow">Foundations / Semantic tokens</p>
        <h1>Color with a purpose.</h1>
        <p className="explorer-description">
          Shared surfaces, accents and status colors. Switch the preview theme
          to inspect each surface with its paired foreground.
        </p>
      </header>
      <section aria-label="Semantic color roles">
        <div className="explorer-foundations-section-heading mb-5">
          <h2>Semantic color roles</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Each surface is paired with its intended foreground.
          </p>
        </div>
        <div className="explorer-token-grid grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
              className="explorer-token-card min-w-0 overflow-hidden rounded-md border border-border bg-background"
            >
              <div
                className={`explorer-token-preview flex h-24 items-center justify-between border-b border-border px-5 ${classes}`}
              >
                <span className="text-3xl font-medium" aria-hidden="true">
                  Aa
                </span>
                <span className="text-xs">Foreground</span>
              </div>
              <div className="explorer-token-meta p-4">
                <h3 className="text-sm font-medium">{label}</h3>
                <dl className="explorer-token-values mt-3 space-y-2 text-xs">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <dt className="text-muted-foreground">Surface</dt>
                    <dd className="min-w-0 break-all font-mono">
                      {classes?.split(" ")[0]}
                    </dd>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <dt className="text-muted-foreground">Content</dt>
                    <dd className="min-w-0 break-all font-mono">
                      {classes?.split(" ")[1]}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};
export const TypeSpacingAndFocus: Story = {
  render: () => (
    <div className="explorer-page explorer-foundations">
      <header className="explorer-foundations-header mb-8">
        <p className="explorer-eyebrow">
          Foundations / Type, spacing and focus
        </p>
        <h1>Readable by design.</h1>
        <p className="explorer-description">
          Inspect the default type hierarchy, field spacing and action states.
          Use Tab to follow the keyboard focus.
        </p>
      </header>
      <Card className="max-w-xl space-y-6 p-5 sm:p-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Workspace typography</h2>
          <p className="text-sm text-muted-foreground">
            A field and two actions using the shared component styles.
          </p>
        </div>
        <Input label="Workspace" placeholder="Project name" />
        <div className="flex flex-wrap gap-3">
          <Button>Save changes</Button>
          <Button disabled>Unavailable</Button>
        </div>
      </Card>
    </div>
  ),
};

function AppearancePreview({ theme }: { theme: NativeColorScheme }) {
  const paletteId = useId();
  const radiusId = useId();
  const [palette, setPalette] = useState<NativePaletteName>("pycolors");
  const [radius, setRadius] = useState(nativeRadiusPreferences.medium);
  const [saved, setSaved] = useState(false);
  const style: CSSProperties & Record<`--${string}`, string> = {
    // Native data uses a documented 16px rem baseline; retain Web rem scaling.
    "--radius": `${radius / 16}rem`,
    colorScheme: theme,
  };
  for (const [role, value] of Object.entries(nativePalettes[palette][theme])) {
    if (role === "elevated") continue; // Native alias of surfaceElevated.
    style[
      `--${role.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`
    ] = value;
  }

  return (
    <div className="explorer-page explorer-foundations">
      <header className="explorer-foundations-header mb-8">
        <p className="explorer-eyebrow">Foundations / Appearance</p>
        <h1>One foundation, different looks.</h1>
        <p className="explorer-description">
          Try the shared palettes and radius choices on public components.
          Switch the toolbar theme to compare light and dark appearances.
        </p>
      </header>
      <fieldset className="explorer-appearance-controls min-w-0 rounded-md border border-border bg-card p-5 sm:p-6">
        <legend className="px-2 text-sm font-medium">Preview appearance</legend>
        <p className="mb-5 text-xs leading-6 text-muted-foreground">
          Choose shared design values. The toolbar controls light and dark
          appearance.
        </p>
        <div className="explorer-appearance-controls-grid grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor={paletteId} className="block text-sm font-medium">
              Palette
            </label>
            <select
              id={paletteId}
              value={palette}
              className="min-h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              onChange={(event) => {
                const selected = nativePaletteOptions.find(
                  (option) => option.value === event.target.value,
                );
                if (selected) setPalette(selected.value);
              }}
            >
              {nativePaletteOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor={radiusId} className="block text-sm font-medium">
              Radius
            </label>
            <select
              id={radiusId}
              value={radius}
              className="min-h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              onChange={(event) => setRadius(Number(event.target.value))}
            >
              {Object.entries(nativeRadiusPreferences).map(([name, value]) => (
                <option key={name} value={value}>
                  {name} · {value / 16}rem
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <section
        aria-label="Appearance preview"
        style={style}
        className="mt-6 rounded-md border border-border bg-background p-4 text-foreground sm:p-6"
      >
        <div className="explorer-appearance-preview-caption mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium">Component preview</p>
          <p className="text-xs text-muted-foreground">
            Public components · local state
          </p>
        </div>
        <Card className="rounded-md p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Workspace preferences</h2>
            <Badge variant="success">Active</Badge>
          </div>
          <form
            className="space-y-4"
            onChange={() => setSaved(false)}
            onSubmit={(event) => {
              event.preventDefault();
              setSaved(true);
            }}
          >
            <Input label="Workspace name" defaultValue="Acme Studio" required />
            <div className="flex flex-wrap gap-3">
              <Button type="submit">Save preferences</Button>
              <Button type="button" variant="outline" disabled>
                Unavailable
              </Button>
            </div>
            <p role="status" className="text-sm text-muted-foreground">
              {saved
                ? "Preferences updated in this preview."
                : "Changes stay in this preview."}
            </p>
          </form>
        </Card>
      </section>
      <p className="explorer-appearance-note mt-4 rounded-md border border-border bg-card px-4 py-3 text-xs leading-6 text-muted-foreground">
        Palettes and radii are shared design values. Page layout and product
        compositions belong to each application.
      </p>
    </div>
  );
}

export const Appearance: Story = {
  render: (_args, { globals }) => (
    <AppearancePreview theme={globals.theme === "dark" ? "dark" : "light"} />
  ),
  play: async ({ canvasElement, globals }) => {
    const canvas = within(canvasElement);
    const palette = canvas.getByRole("combobox", { name: "Palette" });
    const radius = canvas.getByRole("combobox", { name: "Radius" });
    const preview = canvas.getByRole("region", { name: "Appearance preview" });
    await expect(palette).toHaveValue("pycolors");
    await expect(within(palette).getAllByRole("option")).toHaveLength(
      nativePaletteOptions.length,
    );
    await expect(within(radius).getAllByRole("option")).toHaveLength(
      Object.keys(nativeRadiusPreferences).length,
    );
    if (globals.runAppearanceInteractions !== true) return;

    const root = document.documentElement;
    const rootPrimary = getComputedStyle(root).getPropertyValue("--primary");
    const theme = globals.theme === "dark" ? "dark" : "light";
    for (const option of nativePaletteOptions) {
      await userEvent.selectOptions(palette, option.value);
      await expect(preview.style.getPropertyValue("--primary")).toBe(
        nativePalettes[option.value][theme].primary,
      );
      await expect(preview.style.getPropertyValue("--primary-foreground")).toBe(
        nativePalettes[option.value][theme].primaryForeground,
      );
    }
    for (const value of [
      nativeRadiusPreferences.none,
      nativeRadiusPreferences.large,
    ]) {
      await userEvent.selectOptions(radius, String(value));
      await expect(getComputedStyle(preview).borderRadius).toBe(`${value}px`);
    }
    await expect(getComputedStyle(root).getPropertyValue("--primary")).toBe(
      rootPrimary,
    );
    await expect(root.style.getPropertyValue("--radius")).toBe("");
    await userEvent.click(
      canvas.getByRole("button", { name: "Save preferences" }),
    );
    await expect(canvas.getByRole("status")).toHaveTextContent(
      "Preferences updated in this preview.",
    );
    await userEvent.selectOptions(palette, "pycolors");
    await userEvent.selectOptions(
      radius,
      String(nativeRadiusPreferences.medium),
    );
  },
};
