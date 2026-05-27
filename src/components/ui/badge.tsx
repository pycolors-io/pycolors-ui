import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ' +
    'transition-colors ring-offset-background focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground',
        muted: 'border-transparent bg-muted text-muted-foreground',
        outline: 'border-border bg-background text-foreground',
        success:
          'border-transparent bg-success text-success-foreground text-primary-foreground',
        warning:
          'border-transparent bg-warning text-warning-foreground',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground',
      },
      size: {
        sm: 'h-5 text-[11px]',
        md: 'h-6',
        lg: 'h-7 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

type BadgeElement = React.ElementRef<'span'>;

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Render the badge as a Slot wrapper instead of a plain span,
   * useful to style links or custom components as badges.
   */
  asChild?: boolean;
}

export type BadgeVariant = NonNullable<BadgeProps['variant']>;
export type BadgeSize = NonNullable<BadgeProps['size']>;

const Badge = React.forwardRef<BadgeElement, BadgeProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';

    return (
      <Comp
        ref={ref}
        data-slot="badge"
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
