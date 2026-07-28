import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
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

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, CardVariantProps {
  /**
   * Renders the card through Radix Slot.
   *
   * Use this when the card must behave as a native interactive element:
   *
   * @example
   * <Card asChild interactive>
   *   <a href="/products">...</a>
   * </Card>
   *
   * @example
   * <Card asChild interactive>
   *   <button type="button" onClick={handleClick}>...</button>
   * </Card>
   */
  asChild?: boolean;

  /**
   * Applies interactive visual styles only.
   *
   * This prop does not add `role`, `tabIndex`, `onClick`, or keyboard
   * handlers. Use `asChild` with a native `<a>` or `<button>` to provide
   * accessible interaction semantics.
   */
  interactive?: boolean;
}

export type CardVariant = NonNullable<CardProps['variant']>;
export type CardInteractive = NonNullable<CardProps['interactive']>;

/**
 * Structural card primitive compatible with React Server Components.
 *
 * Card deliberately does not synthesize event handlers or accessibility
 * semantics. Interactive behavior must be provided by the underlying native
 * element through `asChild`.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      asChild = false,
      className,
      variant,
      interactive = false,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : 'div';

    return (
      <Component
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
    );
  },
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
