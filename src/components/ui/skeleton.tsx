import * as React from 'react';
import { cn } from '../../lib/utils.js';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Render the skeleton as a circle.
   * Useful for avatars and icons.
   */
  circle?: boolean;
}

export function Skeleton({
  className,
  circle = false,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse motion-reduce:animate-none bg-muted',
        circle ? 'rounded-full' : 'rounded-md',
        className,
      )}
      {...props}
      // Placed after the spread: Skeleton is decorative-only and must
      // never be exposed to assistive tech, even if a caller (or a
      // forwarded ...rest spread) passes its own aria-hidden value.
      aria-hidden="true"
    />
  );
}
