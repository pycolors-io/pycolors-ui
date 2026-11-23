import * as React from "react";
import { addons, types, useStorybookState } from "storybook/manager-api";
import {
  Button as ManagerButton,
  WithTooltip,
} from "storybook/internal/components";
import { create } from "storybook/theming";
import { nativeColors } from "@pycolors/tokens/native";

// Storybook 10 hardcodes its document-title suffix independently of brandTitle.
// Observe only the title node so story navigation keeps its context and branding.
const titleNode = document.querySelector("title");
function brandDocumentTitle() {
  const branded = document.title.replace(/Storybook$/, "PyColors UI Explorer");
  if (branded !== document.title) document.title = branded;
}
if (titleNode)
  new MutationObserver(brandDocumentTitle).observe(titleNode, {
    childList: true,
    subtree: true,
    characterData: true,
  });
brandDocumentTitle();

const appearance = window.matchMedia("(prefers-color-scheme: dark)");
function applyBrand() {
  const dark = appearance.matches;
  const colors = nativeColors[dark ? "dark" : "light"];
  for (const [name, value] of Object.entries({
    "--pycolors-manager-text": colors.foreground,
    "--pycolors-manager-muted": colors.mutedForeground,
    "--pycolors-manager-accent": colors.primary,
    "--pycolors-manager-border": colors.border,
    "--pycolors-manager-hover": colors.accent,
  }))
    document.documentElement.style.setProperty(name, value);
  addons.setConfig({
    theme: create({
      base: dark ? "dark" : "light",
      brandTitle: "PyColors UI Explorer home",
      brandUrl: "./?path=/story/foundations-overview--default",
      brandImage: "./pycolors-symbol.svg",
      brandTarget: "_self",
      colorPrimary: nativeColors.light.primary,
      colorSecondary: colors.primary,
      fontBase: '"PyColors Geist", ui-sans-serif, system-ui, sans-serif',
      appBg: colors.card,
      appContentBg: colors.background,
      appBorderColor: colors.border,
      appBorderRadius: 6,
      textColor: colors.foreground,
      textInverseColor: colors.primaryForeground,
      textMutedColor: colors.mutedForeground,
      barBg: colors.background,
      barTextColor: colors.mutedForeground,
      barHoverColor: colors.foreground,
      barSelectedColor: colors.primary,
      buttonBg: colors.card,
      buttonBorder: colors.border,
      inputBg: colors.background,
      inputBorder: colors.borderStrong,
      inputTextColor: colors.foreground,
      inputBorderRadius: 6,
    }),
    sidebar: { collapsedRoots: ["ui"] },
    layoutCustomisations: {
      showPanel: (state, defaultValue) =>
        state.storyId === "foundations-overview--default"
          ? false
          : defaultValue,
    },
  });
}
applyBrand();
appearance.addEventListener("change", applyBrand);

function ResourceNavigation({
  docs,
  id,
  onDismiss,
  onRestoreFocus,
}: {
  docs: string;
  id: string;
  onDismiss: () => void;
  onRestoreFocus: () => void;
}) {
  const firstLink = React.useRef<HTMLAnchorElement>(null);
  const lastLink = React.useRef<HTMLAnchorElement>(null);
  React.useEffect(() => {
    firstLink.current?.focus();
  }, []);

  const resources = [
    {
      label: "Docs",
      href: docs,
      description: "Usage, accessibility and examples.",
    },
    {
      label: "Install",
      href: "https://pycolors.io/docs/ui/installation",
      description: "Set up the public packages and styles.",
    },
    {
      label: "PyColors UI",
      href: "https://pycolors.io/ui",
      description: "Explore the design system.",
    },
    {
      label: "Starter Free",
      href: "https://pycolors.io/starters/free",
      description: "Start with a complete SaaS interface.",
    },
  ];

  return (
    <nav
      id={id}
      aria-label="PyColors UI Explorer resources"
      className="pycolors-resource-nav"
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          const leavingBackwards =
            event.shiftKey && event.target === firstLink.current;
          const leavingForwards =
            !event.shiftKey && event.target === lastLink.current;
          if (leavingBackwards || leavingForwards) {
            if (leavingBackwards) event.preventDefault();
            event.stopPropagation();
            onDismiss();
            onRestoreFocus();
          }
          return;
        }
        if (event.key !== "Escape") return;
        event.preventDefault();
        event.stopPropagation();
        onDismiss();
        onRestoreFocus();
      }}
    >
      <p className="pycolors-resource-heading">Explore with PyColors</p>
      {resources.map(({ label, href, description }, index) => (
        <a
          key={label}
          ref={
            index === 0
              ? firstLink
              : index === resources.length - 1
                ? lastLink
                : undefined
          }
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          aria-describedby={`${id}-${index}`}
          className="pycolors-resource-link"
        >
          <span className="pycolors-resource-copy">
            <span className="pycolors-resource-label">{label}</span>
            <span
              id={`${id}-${index}`}
              className="pycolors-resource-description"
            >
              {description}
              <span className="pycolors-sr-only"> Opens in a new tab.</span>
            </span>
          </span>
          <span className="pycolors-resource-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      ))}
    </nav>
  );
}

function DocumentationLinks() {
  const { storyId } = useStorybookState();
  const family = /^components-([a-z-]+)--/.exec(storyId ?? "")?.[1];
  const docs = `https://pycolors.io/docs/ui${family ? `/${family}` : ""}`;
  const id = React.useId();
  const trigger = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  return (
    <WithTooltip
      trigger="click"
      closeOnOutsideClick
      placement="bottom"
      onVisibleChange={setOpen}
      tooltip={({ onHide }) => (
        <ResourceNavigation
          docs={docs}
          id={id}
          onDismiss={onHide}
          onRestoreFocus={() => trigger.current?.focus()}
        />
      )}
    >
      <ManagerButton
        ref={trigger}
        variant="ghost"
        ariaLabel="UI Explorer"
        disableAllTooltips
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        className="pycolors-resource-trigger"
      >
        <span className="pycolors-resource-trigger-full">UI Explorer</span>
        <span className="pycolors-resource-trigger-compact" aria-hidden="true">
          UI
        </span>
        <span aria-hidden="true" className="pycolors-resource-chevron">
          ⌄
        </span>
      </ManagerButton>
    </WithTooltip>
  );
}
addons.register("pycolors/resources", () => {
  addons.add("pycolors/resources/links", {
    type: types.TOOL,
    title: "PyColors resources",
    render: DocumentationLinks,
  });
});
