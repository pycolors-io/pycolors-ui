'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils.js';

const textareaVariants = cva(
  'flex min-h-24 w-full rounded-md border bg-background px-3.5 py-2.5 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'min-h-20 px-3 py-2 text-sm',
        md: 'min-h-24 px-3.5 py-2.5 text-sm',
        lg: 'min-h-32 px-4 py-3 text-base',
      },
      hasError: {
        false: 'border-input',
        true: 'border-destructive focus-visible:ring-destructive',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
      resize: 'vertical',
    },
  },
);

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaResize =
  | 'none'
  | 'vertical'
  | 'horizontal'
  | 'both';

export interface TextareaProps
  extends
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: TextareaSize;
  resize?: TextareaResize;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      className,
      size,
      resize,
      id,
      disabled,
      required,
      'aria-describedby': consumerDescribedBy,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;

    const internalDescribedByIds: string[] = [];

    if (helperText && !error) {
      internalDescribedByIds.push(`${textareaId}-helper`);
    }

    if (error) {
      internalDescribedByIds.push(`${textareaId}-error`);
    }

    // Compose the consumer's own aria-describedby (if any) with the ids this
    // component owns, rather than letting either side silently clobber the
    // other — both descriptions are legitimate and should be announced.
    const describedBy =
      [...internalDescribedByIds, consumerDescribedBy]
        .filter(Boolean)
        .join(' ') || undefined;

    return (
      <div className="w-full">
        {label ? (
          <label
            htmlFor={textareaId}
            className="mb-1 block text-sm font-medium text-foreground"
          >
            {label}
            {required ? (
              <span className="ml-1 text-destructive">*</span>
            ) : null}
          </label>
        ) : null}

        <textarea
          id={textareaId}
          ref={ref}
          disabled={disabled}
          required={required}
          className={cn(
            textareaVariants({
              size,
              resize,
              hasError: !!error,
            }),
            className,
          )}
          {...props}
          // Placed after the spread so a caller-supplied aria-invalid /
          // aria-errormessage can never silently disagree with the
          // component's own error state.
          aria-invalid={!!error}
          aria-describedby={describedBy}
          aria-errormessage={
            error ? `${textareaId}-error` : undefined
          }
          aria-required={required ? true : undefined}
        />

        {helperText && !error ? (
          <p
            id={`${textareaId}-helper`}
            className="mt-1 text-xs text-muted-foreground"
          >
            {helperText}
          </p>
        ) : null}

        {error ? (
          <p
            id={`${textareaId}-error`}
            role="alert"
            className="mt-1 text-xs text-destructive"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
