import * as React from 'react';
import { cn } from '../../lib/utils.js';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  ariaLive?: 'off' | 'polite' | 'assertive';
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  ariaLive = 'polite',
  className,
  ...props
}: EmptyStateProps) {
  const role =
    ariaLive === 'assertive'
      ? 'alert'
      : ariaLive === 'polite'
        ? 'status'
        : undefined;

  return (
    <div
      {...props}
      role={role}
      aria-live={ariaLive === 'off' ? undefined : ariaLive}
      className={cn(
        'flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-border p-8 text-center',
        className,
      )}
    >
      {icon && (
        <div className="mb-4 text-muted-foreground">{icon}</div>
      )}

      <h3 className="text-sm font-medium">{title}</h3>

      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
