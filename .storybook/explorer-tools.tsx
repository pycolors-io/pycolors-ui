import { useRef, useState } from "react";
import { BookOpen, Check, Copy } from "lucide-react";

declare const __PYCOLORS_UI_RELEASE__: {
  readonly version: string;
  readonly license: string;
  readonly react: string;
  readonly reactDom: string;
  readonly changelog: string;
};

/** Build-time data from the public package manifest and its own changelog. */
export function getUiRelease() {
  return __PYCOLORS_UI_RELEASE__;
}

export function ConsumerSource({ code, docs }: { code: string; docs: string }) {
  const source = useRef<HTMLPreElement>(null);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<{
    code: string;
    mode: "copied" | "manual";
  } | null>(null);
  const feedback = result?.code === code ? result.mode : null;

  async function copy() {
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(code);
      setResult({ code, mode: "copied" });
    } catch {
      source.current?.focus();
      const selection = window.getSelection();
      if (selection && source.current) {
        const range = document.createRange();
        range.selectNodeContents(source.current);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setResult({ code, mode: "manual" });
    }
  }

  return (
    <section aria-label="Consumer example" className="explorer-source">
      <details
        onToggle={(event) => {
          const next = event.currentTarget.open;
          setOpen(next);
          if (!next) setResult(null);
        }}
      >
        <summary>Code example</summary>
        {open ? (
          <>
            <div className="explorer-source-toolbar">
              <p>React · TypeScript · public imports</p>
              <div className="explorer-source-actions">
                <a href={docs} target="_blank" rel="noopener noreferrer">
                  <BookOpen
                    size={14}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    focusable="false"
                  />
                  Usage guide
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <button type="button" onClick={() => void copy()}>
                  {feedback === "copied" ? (
                    <Check size={14} aria-hidden="true" />
                  ) : (
                    <Copy size={14} aria-hidden="true" />
                  )}
                  {feedback === "copied" ? "Copied" : "Copy example"}
                </button>
              </div>
            </div>
            <pre
              ref={source}
              tabIndex={0}
              aria-label="Consumer code"
              className="explorer-source-code"
            >
              <code>{code}</code>
            </pre>
            {feedback ? (
              <p role="status" className="explorer-source-feedback">
                {feedback === "copied"
                  ? "Example copied to the clipboard."
                  : "Clipboard access is unavailable. The code is selected; copy it manually."}
              </p>
            ) : null}
          </>
        ) : null}
      </details>
    </section>
  );
}

export function MaintenanceFooter() {
  const uiRelease = getUiRelease();
  return (
    <footer className="explorer-maintenance">
      <p>
        <strong>PyColors UI v{uiRelease.version}</strong>
        <span>
          React {uiRelease.react} · {uiRelease.license}
        </span>
      </p>
      <nav aria-label="Package maintenance">
        <a href="./?path=/story/foundations-maintenance--default" target="_top">
          Release notes
        </a>
        <a
          href="https://pycolors.io/docs/ui/installation"
          target="_blank"
          rel="noopener noreferrer"
        >
          Installation &amp; compatibility
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </nav>
    </footer>
  );
}
