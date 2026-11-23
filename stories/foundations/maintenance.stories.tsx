import type { Meta, StoryObj } from "@storybook/react-vite";
import { getUiRelease } from "../../.storybook/explorer-tools.js";

const meta = {
  id: "foundations-maintenance",
  title: "Foundations/Release information",
  tags: ["theme", "responsive"],
  parameters: { controls: { disable: true } },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const uiRelease = getUiRelease();
    return (
      <div className="explorer-page explorer-foundations">
        <header className="explorer-foundations-header mb-8">
          <p className="explorer-eyebrow">Package / Maintenance</p>
          <h1>Versioned and documented.</h1>
          <p className="explorer-description">
            Release information for the public component package used by this
            Explorer.
          </p>
        </header>
        <dl className="grid gap-4 sm:grid-cols-3">
          {[
            ["Package version", `@pycolors/ui ${uiRelease.version}`],
            [
              "Declared React peer range",
              `React ${uiRelease.react} / React DOM ${uiRelease.reactDom}`,
            ],
            ["License", uiRelease.license],
          ].map(([label, value]) => (
            <div key={label} className="rounded-md border border-border p-5">
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="mt-2 text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          Compatibility ranges come from the package manifest. Follow the{" "}
          <a
            className="underline underline-offset-4"
            href="https://pycolors.io/docs/ui/installation"
            target="_blank"
            rel="noopener noreferrer"
          >
            installation guide
            <span className="sr-only"> (opens in a new tab)</span>
          </a>{" "}
          for required styles and setup.
        </p>
        <section aria-label="Package changelog" className="mt-10">
          <h2>Release history</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Package release notes, included from its own changelog.
          </p>
          <div className="mt-5 space-y-3">
            {uiRelease.changelog
              .split(/^## /m)
              .slice(1)
              .map((entry, index) => {
                const [version, ...body] = entry.split("\n");
                return (
                  <details
                    key={version}
                    open={index === 0}
                    className="explorer-release-note"
                  >
                    <summary>v{version}</summary>
                    <div className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                      {body.join("\n").trim().replace(/^### /gm, "")}
                    </div>
                  </details>
                );
              })}
          </div>
        </section>
      </div>
    );
  },
};
