"use client";

import * as React from "react";
import { cn } from "../../lib/utils.js";

export interface AIMessageProps extends React.ComponentPropsWithoutRef<"li"> {
  /** Visible speaker label; the application owns names and localization. */
  author: string;
  actions?: React.ReactNode;
}

export const AIMessage = React.forwardRef<HTMLLIElement, AIMessageProps>(
  ({ author, actions, children, className, ...props }, ref) => (
    <li
      ref={ref}
      data-slot="ai-message"
      className={cn(
        "min-w-0 space-y-3 border-b border-border/60 py-6 last:border-0",
        className,
      )}
      {...props}
    >
      <p className="text-xs font-semibold tracking-wide text-muted-foreground">
        {author}
      </p>
      <div
        data-slot="ai-message-content"
        className="whitespace-pre-wrap text-sm leading-7 [overflow-wrap:anywhere] text-foreground"
      >
        {children}
      </div>
      {actions}
    </li>
  ),
);
AIMessage.displayName = "AIMessage";
