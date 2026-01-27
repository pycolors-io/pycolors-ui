'use client';

import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';

const toastVariants = cva(
  'pointer-events-auto relative flex w-full items-center justify-between gap-4 rounded-md border px-4 py-3 text-sm shadow-lg',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        success:
          'bg-background text-foreground border-success/40 text-success',
        warning:
          'bg-background text-foreground border-warning/40 text-warning',
        destructive:
          'bg-background text-foreground border-destructive/40 text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = ToastPrimitive.Viewport;

export interface ToastProps
  extends
    React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {}

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
));
Toast.displayName = 'Toast';

export const ToastTitle = ToastPrimitive.Title;
export const ToastDescription = ToastPrimitive.Description;
export const ToastClose = ToastPrimitive.Close;
