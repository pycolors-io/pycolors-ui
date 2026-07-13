import * as React from 'react';
import { cn } from '../../lib/utils.js';

export function Table({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-auto rounded-lg border border-border/60">
      <table
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
}

export function TableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn('bg-muted/40', className)} {...props} />
  );
}

export function TableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
}

export function TableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        'border-b border-border/60 transition-colors hover:bg-accent/30',
        className,
      )}
      {...props}
    />
  );
}

/* eslint-disable react/prop-types -- TypeScript validates intrinsic table header props. */
export function TableHead({
  scope = 'col',
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  /* eslint-enable react/prop-types */
  return (
    <th
      scope={scope}
      className={cn(
        'h-10 px-4 text-left align-middle font-medium text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({
  // eslint-disable-next-line react/prop-types -- TypeScript validates intrinsic table cell props.
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn('p-4 align-middle', className)} {...props} />
  );
}

export function TableCaption({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption
      className={cn('mt-3 text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export function TableEmpty({
  colSpan,
  title = 'No results',
  description = 'Try adjusting your filters or create a new item.',
}: {
  colSpan: number;
  title?: string;
  description?: string;
}) {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={colSpan} className="py-10">
        <div className="text-center">
          <div className="font-medium">{title}</div>
          <div className="mt-1 text-sm text-muted-foreground">
            {description}
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function TableLoading({ colSpan }: { colSpan: number }) {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={colSpan} className="py-10">
        <div
          role="status"
          aria-live="polite"
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <span
            aria-hidden="true"
            className="inline-block size-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground"
          />
          Loading…
        </div>
      </TableCell>
    </TableRow>
  );
}
