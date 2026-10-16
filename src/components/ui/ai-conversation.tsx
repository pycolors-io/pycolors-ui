"use client";

import * as React from "react";
import { Button } from "./button.js";
import { cn } from "../../lib/utils.js";

export interface AIConversationProps extends React.ComponentPropsWithoutRef<"div"> {
  label?: string;
  messagesLabel?: string;
  jumpLabel?: string;
  viewportClassName?: string;
}

export const AIConversation = React.forwardRef<
  HTMLDivElement,
  AIConversationProps
>(
  (
    {
      children,
      className,
      label = "Conversation",
      messagesLabel = "Messages",
      jumpLabel = "Jump to latest",
      viewportClassName,
      ...props
    },
    ref,
  ) => {
    const viewport = React.useRef<HTMLDivElement>(null);
    const content = React.useRef<HTMLOListElement>(null);
    const following = React.useRef(true);
    const observedSize = React.useRef<{
      height: number;
      viewportHeight: number;
    } | null>(null);
    const [atBottom, setAtBottom] = React.useState(true);
    React.useLayoutEffect(() => {
      if (following.current && viewport.current) {
        viewport.current.scrollTop = viewport.current.scrollHeight;
      }
    }, [children]);
    React.useLayoutEffect(() => {
      const element = viewport.current;
      const list = content.current;
      if (!element || !list || typeof ResizeObserver === "undefined") return;

      const measure = () => ({
        height: element.scrollHeight,
        viewportHeight: element.clientHeight,
      });
      observedSize.current = measure();
      const observer = new ResizeObserver(() => {
        observedSize.current = measure();
        // Reflow can move the end without changing messages. Respect a reader who
        // scrolled back; resume following once the entire conversation fits.
        if (following.current || element.scrollHeight <= element.clientHeight) {
          following.current = true;
          element.scrollTop = element.scrollHeight;
          setAtBottom(true);
        }
      });
      observer.observe(element);
      observer.observe(list);
      return () => {
        observer.disconnect();
        observedSize.current = null;
      };
    }, []);
    return (
      <div
        ref={ref}
        data-slot="ai-conversation"
        className={cn("min-w-0", className)}
        {...props}
      >
        <div
          ref={viewport}
          role="group"
          aria-label={label}
          tabIndex={0}
          data-slot="ai-conversation-viewport"
          className={cn(
            "max-h-[28rem] min-w-0 overflow-y-auto overscroll-contain px-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-8",
            viewportClassName,
          )}
          onScroll={(event) => {
            const element = event.currentTarget;
            const size = observedSize.current;
            // Browser anchoring may scroll during reflow before ResizeObserver
            // runs. Let that observer reconcile the layout without pausing follow.
            if (
              size &&
              (size.height !== element.scrollHeight ||
                size.viewportHeight !== element.clientHeight)
            )
              return;
            following.current =
              element.scrollHeight - element.scrollTop - element.clientHeight <=
              32;
            setAtBottom(following.current);
          }}
        >
          <ol
            ref={content}
            aria-label={messagesLabel}
            className="m-0 list-none p-0"
          >
            {children}
          </ol>
        </div>
        {!atBottom ? (
          <div className="flex justify-center border-t border-border px-4 py-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="min-h-11"
              onClick={() => {
                const element = viewport.current;
                if (!element) return;
                following.current = true;
                element.scrollTop = element.scrollHeight;
                setAtBottom(true);
                element.focus({ preventScroll: true });
              }}
            >
              {jumpLabel}
            </Button>
          </div>
        ) : null}
      </div>
    );
  },
);
AIConversation.displayName = "AIConversation";
