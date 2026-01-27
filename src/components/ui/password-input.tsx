'use client';

import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input, type InputProps } from './input.js';

export interface PasswordInputProps extends Omit<
  InputProps,
  'type' | 'rightIcon'
> {}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>((props, ref) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <Input
      {...props}
      ref={ref}
      type={visible ? 'text' : 'password'}
      rightIcon={
        <button
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
          className="
            rounded-sm p-1
            text-muted-foreground
            hover:text-foreground
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-ring
            focus-visible:ring-offset-1
          "
        >
          {visible ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      }
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
