'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function Preview({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground p-4 shadow-sm',
        className
      )}
      {...props}
    />
  );
}
