import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils.js';

export const cardVariants = cva(
  'rounded-lg border text-card-foreground',
  {
    variants: {
      variant: {
        default: 'bg-card',
        muted: 'bg-muted/40',
        transparent: 'bg-transparent',
      },
      interactive: {
        false: null,
        true: [
          'cursor-pointer',
          'transition-colors',
          'hover:bg-accent/40',
          'focus-visible:outline-none',
          'focus-visible:ring-2',
          'focus-visible:ring-ring',
          'focus-visible:ring-offset-2',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
    },
  },
);

type CardVariantProps = VariantProps<typeof cardVariants>;

type CardElementProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'role' | 'tabIndex' | 'onClick' | 'onKeyDown' | 'onKeyUp'
>;

export interface CardProps
  extends CardElementProps, CardVariantProps {
  /**
   * Applies interactive visual styles only.
   *
   * This prop does not provide interaction semantics or event handlers.
   * Wrap the card with a native interactive element such as a Link,
   * anchor, or button.
   */
  interactive?: boolean;
}

export type CardVariant = NonNullable<CardProps['variant']>;
export type CardInteractive = NonNullable<CardProps['interactive']>;

/**
 * Purely structural Card primitive compatible with React Server Components.
 *
 * Card never adds:
 * - event handlers;
 * - role="button";
 * - tabIndex;
 * - client-side interaction behavior.
 *
 * Use a native anchor, Link, or button as the interactive parent.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive = false, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card"
      className={cn(
        cardVariants({
          variant,
          interactive,
        }),
        className,
      )}
      {...props}
    />
  ),
);

Card.displayName = 'Card';

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col gap-1.5 p-6', className)}
      {...props}
    />
  );
}

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        'text-base font-semibold leading-none tracking-tight',
        className,
      )}
      {...props}
    />
  );
}

export type CardDescriptionProps =
  React.HTMLAttributes<HTMLParagraphElement>;

export function CardDescription({
  className,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function CardContent({
  className,
  ...props
}: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  );
}

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  );
}
