'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';

import { cn } from '../../lib/utils.js';

/* -----------------------------------------------------------------------------
 * Root
 * -------------------------------------------------------------------------- */

export type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>;

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, checked, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    checked={checked}
    className={cn(
      'peer mt-0.5 size-4 shrink-0 rounded-sm border border-input bg-background shadow-xs transition-colors',
      'hover:border-foreground/30',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      'data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
      'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="flex items-center justify-center text-current"
    >
      {checked === 'indeterminate' ? (
        <Minus className="size-3" aria-hidden="true" />
      ) : (
        <Check className="size-3" aria-hidden="true" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = 'Checkbox';

/* -----------------------------------------------------------------------------
 * Field helpers
 * -------------------------------------------------------------------------- */

export type CheckboxFieldProps = React.HTMLAttributes<HTMLDivElement>;

function CheckboxField({
  className,
  ...props
}: Readonly<CheckboxFieldProps>) {
  return (
    <div
      data-slot="checkbox-field"
      className={cn('flex items-start gap-3', className)}
      {...props}
    />
  );
}

export type CheckboxContentProps =
  React.HTMLAttributes<HTMLDivElement>;

function CheckboxContent({
  className,
  ...props
}: Readonly<CheckboxContentProps>) {
  return (
    <div
      data-slot="checkbox-content"
      className={cn('grid min-w-0 gap-1', className)}
      {...props}
    />
  );
}

export type CheckboxLabelProps =
  React.LabelHTMLAttributes<HTMLLabelElement>;

function CheckboxLabel({
  className,
  ...props
}: Readonly<CheckboxLabelProps>) {
  return (
    <label
      data-slot="checkbox-label"
      className={cn(
        'block cursor-pointer text-sm font-medium leading-5 text-foreground',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        '[&_p]:m-0 [&_p]:text-sm [&_p]:font-medium [&_p]:leading-5 [&_p]:text-foreground',
        className,
      )}
      {...props}
    />
  );
}

export type CheckboxDescriptionProps =
  React.HTMLAttributes<HTMLDivElement>;

function CheckboxDescription({
  className,
  ...props
}: Readonly<CheckboxDescriptionProps>) {
  return (
    <div
      data-slot="checkbox-description"
      className={cn(
        'text-sm leading-5 text-muted-foreground',
        '[&_p]:m-0 [&_p]:text-sm [&_p]:leading-5 [&_p]:text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}

/* -----------------------------------------------------------------------------
 * Exports
 * -------------------------------------------------------------------------- */

export {
  Checkbox,
  CheckboxField,
  CheckboxContent,
  CheckboxLabel,
  CheckboxDescription,
};
