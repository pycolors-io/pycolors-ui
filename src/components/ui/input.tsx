'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';

const inputVariants = cva(
  'flex w-full items-center gap-2 rounded-md border bg-background text-sm ring-offset-background transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-3.5',
        lg: 'h-11 px-4',
      },
      hasError: {
        false: 'border-input',
        true: 'border-destructive focus-within:ring-destructive',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
    },
  },
);

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Accessible label displayed above the input.
   */
  label?: string;
  /**
   * Helper text displayed below the field when there is no error.
   */
  helperText?: string;
  /**
   * Error message – also toggles the error styles.
   */
  error?: string;
  /**
   * Optional icon rendered on the left inside the field.
   */
  leftIcon?: React.ReactNode;
  /**
   * Optional icon rendered on the right inside the field.
   */
  rightIcon?: React.ReactNode;
  /**
   * Design system size (not the native HTML `size` attribute).
   */
  size?: InputSize;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      className,
      size,
      id,
      disabled,
      required,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const describedByIds: string[] = [];
    if (helperText && !error)
      describedByIds.push(`${inputId}-helper`);
    if (error) describedByIds.push(`${inputId}-error`);

    const describedBy =
      describedByIds.length > 0
        ? describedByIds.join(' ')
        : undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 block text-sm font-medium text-foreground"
          >
            {label}
            {required ? (
              <span className="ml-1 text-destructive">*</span>
            ) : null}
          </label>
        )}

        <div
          className={cn(
            inputVariants({ size, hasError: !!error }),
            className,
          )}
        >
          {leftIcon && (
            <span className="inline-flex shrink-0 items-center justify-center text-muted-foreground">
              {leftIcon}
            </span>
          )}

          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            aria-errormessage={error ? `${inputId}-error` : undefined}
            aria-required={required ? true : undefined}
            className={cn(
              'flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground',
              !leftIcon && 'pl-1',
              !rightIcon && 'pr-1',
            )}
            {...props}
          />

          {rightIcon && (
            <span className="inline-flex shrink-0 items-center justify-center text-muted-foreground">
              {rightIcon}
            </span>
          )}
        </div>

        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-1 text-xs text-muted-foreground"
          >
            {helperText}
          </p>
        )}

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-xs text-destructive"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input, inputVariants };
