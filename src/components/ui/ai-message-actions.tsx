"use client";

import * as React from "react";
import { Check, Copy, LoaderCircle, TriangleAlert } from "lucide-react";
import { Button } from "./button.js";
import { cn } from "../../lib/utils.js";

export interface AIMessageActionsProps extends Omit<
  React.ComponentPropsWithoutRef<"div">,
  "onCopy"
> {
  value: string;
  /** Receives a snapshot. Supply clipboard access or another application action. */
  onCopy: (value: string) => void | Promise<void>;
  disabled?: boolean;
  copyLabel?: string;
  copyAriaLabel?: string;
  pendingLabel?: string;
  successLabel?: string;
  errorLabel?: string;
}

export const AIMessageActions = React.forwardRef<
  HTMLDivElement,
  AIMessageActionsProps
>(
  (
    {
      value,
      onCopy,
      disabled = false,
      copyLabel = "Copy",
      copyAriaLabel = "Copy message",
      pendingLabel = "Copying…",
      successLabel = "Copied.",
      errorLabel = "Could not copy. Select the text to copy it manually.",
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const [feedback, setFeedback] = React.useState<{
      value: string;
      state: "pending" | "success" | "error";
    }>();
    const pending = React.useRef(false);
    const generation = React.useRef(0);
    React.useEffect(() => {
      const token = ++generation.current;
      pending.current = false;
      setFeedback(undefined);
      return () => {
        generation.current = token + 1;
      };
    }, [value]);
    const state = feedback?.value === value ? feedback.state : undefined;
    return (
      <div
        ref={ref}
        data-slot="ai-message-actions"
        className={cn("flex flex-wrap items-center gap-x-3 gap-y-1", className)}
        {...props}
      >
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="min-h-11 text-muted-foreground motion-reduce:transition-none"
          aria-label={copyAriaLabel}
          disabled={disabled || !value || state === "pending"}
          onClick={async () => {
            if (pending.current) return;
            pending.current = true;
            const token = generation.current;
            const snapshot = value;
            setFeedback({ value: snapshot, state: "pending" });
            try {
              await onCopy(snapshot);
              if (token === generation.current)
                setFeedback({ value: snapshot, state: "success" });
            } catch {
              if (token === generation.current)
                setFeedback({ value: snapshot, state: "error" });
            } finally {
              if (token === generation.current) pending.current = false;
            }
          }}
        >
          {state === "pending" ? (
            <LoaderCircle
              className="size-4 animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
          ) : state === "success" ? (
            <Check className="size-4" aria-hidden="true" />
          ) : state === "error" ? (
            <TriangleAlert className="size-4" aria-hidden="true" />
          ) : (
            <Copy className="size-4" aria-hidden="true" />
          )}
          {copyLabel}
        </Button>
        <span role="status" className="text-xs text-muted-foreground">
          {state === "pending"
            ? pendingLabel
            : state === "success"
              ? successLabel
              : state === "error"
                ? errorLabel
                : ""}
        </span>
        {children}
      </div>
    );
  },
);
AIMessageActions.displayName = "AIMessageActions";
