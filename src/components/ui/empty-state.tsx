import { cn } from '../../lib/utils.js';
import * as React from 'react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        'flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-border p-8 text-center',
        className,
      )}
      {...props}
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
