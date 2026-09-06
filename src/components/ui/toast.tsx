"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils.js";

const toastVariants = cva(
  "pointer-events-auto relative flex w-full items-center justify-between gap-4 rounded-md border px-4 py-3 text-sm shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        success: "bg-background text-foreground border-success/40 text-success",
        warning: "bg-background text-foreground border-warning/40 text-warning",
        destructive:
          "bg-background text-foreground border-destructive/40 text-destructive",
        info: "bg-background text-foreground border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = ToastPrimitive.Viewport;

export interface ToastProps
  extends
    React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {}

// Radix announces `type="foreground"` toasts at aria-live="assertive" and
// `type="background"` toasts at "polite". Only genuinely urgent variants
// should interrupt; routine confirmations should announce politely. An
// explicit `type` prop from the consumer always wins over this default.
const toastTypeByVariant: Record<
  NonNullable<ToastProps["variant"]>,
  NonNullable<ToastProps["type"]>
> = {
  default: "background",
  success: "background",
  warning: "foreground",
  destructive: "foreground",
  info: "background",
};

export const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant, type, ...props }, ref) => {
  const resolvedVariant = variant ?? "default";

  return (
    <ToastPrimitive.Root
      ref={ref}
      type={type ?? toastTypeByVariant[resolvedVariant]}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = "Toast";

export const ToastTitle = ToastPrimitive.Title;
export const ToastDescription = ToastPrimitive.Description;
export const ToastClose = ToastPrimitive.Close;
