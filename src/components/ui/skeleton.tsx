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
      aria-hidden="true"
      className={cn(
        'animate-pulse bg-muted',
        circle ? 'rounded-full' : 'rounded-md',
        className,
      )}
      {...props}
    />
  );
}
