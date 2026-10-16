"use client";

import * as React from "react";
import { Button } from "./button.js";
import { Textarea, type TextareaProps } from "./textarea.js";

export interface AIComposerProps extends Omit<
  TextareaProps,
  "value" | "defaultValue" | "onSubmit" | "children" | "form"
> {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit: () => void;
  busy?: boolean;
  onStop?: () => void;
  submitLabel?: string;
  stopLabel?: string;
  /** Disable Enter-to-send for editors that should always insert newlines. */
  submitOnEnter?: boolean;
}

/** Controlled chat input. Requests, cancellation and draft updates belong to the consumer. */
const AIComposer = React.forwardRef<HTMLTextAreaElement, AIComposerProps>(
  (
    {
      value,
      onChange,
      onSubmit,
      busy = false,
      onStop,
      disabled,
      submitLabel = "Send message",
      stopLabel = "Stop response",
      submitOnEnter = true,
      onKeyDown,
      onCompositionStart,
      onCompositionEnd,
      ...props
    },
    ref,
  ) => {
    const composing = React.useRef(false);
    const submitting = React.useRef(false);
    const canSubmit = !disabled && !busy && value.trim().length > 0;

    return (
      <form
        data-slot="ai-composer"
        className="flex min-w-0 w-full flex-col gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (!canSubmit || composing.current || submitting.current) return;
          // Cover duplicate events in one turn; the consumer owns the request's busy state.
          submitting.current = true;
          queueMicrotask(() => {
            submitting.current = false;
          });
          onSubmit();
        }}
      >
        <Textarea
          {...props}
          ref={ref}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onCompositionStart={(event) => {
            composing.current = true;
            onCompositionStart?.(event);
          }}
          onCompositionEnd={(event) => {
            composing.current = false;
            onCompositionEnd?.(event);
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (
              event.defaultPrevented ||
              !submitOnEnter ||
              event.key !== "Enter" ||
              event.shiftKey ||
              event.altKey ||
              event.ctrlKey ||
              event.metaKey ||
              composing.current ||
              event.nativeEvent.isComposing ||
              event.nativeEvent.keyCode === 229 ||
              window.matchMedia?.("(hover: none) and (pointer: coarse)").matches
            )
              return;
            event.preventDefault();
            if (!event.repeat && canSubmit)
              event.currentTarget.form?.requestSubmit();
          }}
        />
        <div
          data-slot="ai-composer-actions"
          className="flex flex-wrap justify-end gap-2"
        >
          {busy && onStop ? (
            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              onClick={onStop}
              className="min-h-11 h-auto max-w-full whitespace-normal break-words motion-reduce:transition-none"
            >
              {stopLabel}
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!canSubmit}
              className="min-h-11 h-auto max-w-full whitespace-normal break-words motion-reduce:transition-none"
            >
              {submitLabel}
            </Button>
          )}
        </div>
      </form>
    );
  },
);
AIComposer.displayName = "AIComposer";
export { AIComposer };
