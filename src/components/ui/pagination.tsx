import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Slottable } from "@radix-ui/react-slot";

import { Button, type ButtonProps } from "./button.js";
import { cn } from "../../lib/utils.js";

/* -----------------------------------------------------------------------------
 * Pagination (Primitive)
 * - Stateless, composable
 * - No routing / fetching logic
 * - Works with links or buttons
 * -------------------------------------------------------------------------- */

export type PaginationProps = React.ComponentPropsWithoutRef<"nav">;

export function Pagination({ className, ...props }: PaginationProps) {
  return (
    <nav
      aria-label="Pagination"
      data-slot="pagination"
      className={cn("flex w-full justify-center", className)}
      {...props}
    />
  );
}

export type PaginationContentProps = React.ComponentPropsWithoutRef<"ul">;

export function PaginationContent({
  className,
  ...props
}: PaginationContentProps) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

export type PaginationItemProps = React.ComponentPropsWithoutRef<"li">;

export function PaginationItem({ className, ...props }: PaginationItemProps) {
  return (
    <li
      data-slot="pagination-item"
      className={cn("list-none", className)}
      {...props}
    />
  );
}

export interface PaginationLinkProps extends React.ComponentPropsWithoutRef<"button"> {
  /**
   * Marks the current page for accessibility and styling.
   */
  isActive?: boolean;
  /**
   * Optional size mapping to Button sizes.
   * Defaults to "icon-sm" for compact pagination.
   */
  size?: ButtonProps["size"];
  /**
   * Render the control as a Slot wrapper so a real link element can be
   * supplied as the child while keeping all pagination styling.
   *
   * @example
   * <PaginationLink asChild isActive>
   *   <a href="/page/2">2</a>
   * </PaginationLink>
   */
  asChild?: boolean;
}

export const PaginationLink = React.forwardRef<
  HTMLButtonElement,
  PaginationLinkProps
>(function PaginationLink(
  { className, isActive = false, size = "icon-sm", asChild = false, ...props },
  ref,
) {
  return (
    <Button
      ref={ref}
      data-slot="pagination-link"
      type={asChild ? undefined : "button"}
      asChild={asChild}
      variant={isActive ? "secondary" : "outline"}
      size={size}
      aria-current={isActive ? "page" : undefined}
      className={cn("min-w-8 px-2", isActive && "font-semibold", className)}
      {...props}
    />
  );
});

export interface PaginationPreviousProps extends React.ComponentPropsWithoutRef<"button"> {
  /**
   * Optional label for accessibility and i18n.
   */
  label?: string;
  /**
   * Render the control as a Slot wrapper so a real link element can be
   * supplied as the child while keeping all pagination styling, the built-in
   * ChevronLeft icon, and the visible "Previous" text.
   *
   * @example
   * <PaginationPrevious asChild>
   *   <a href="/page/1" />
   * </PaginationPrevious>
   */
  asChild?: boolean;
}

export const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  PaginationPreviousProps
>(function PaginationPrevious(
  { className, label = "Previous page", asChild = false, children, ...props },
  ref,
) {
  return (
    <Button
      ref={ref}
      data-slot="pagination-previous"
      type={asChild ? undefined : "button"}
      asChild={asChild}
      variant="outline"
      size="sm"
      aria-label={label}
      className={cn("gap-2 px-3", className)}
      {...props}
    >
      <Slottable>{children}</Slottable>
      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">Previous</span>
    </Button>
  );
});

export interface PaginationNextProps extends React.ComponentPropsWithoutRef<"button"> {
  /**
   * Optional label for accessibility and i18n.
   */
  label?: string;
  /**
   * Render the control as a Slot wrapper so a real link element can be
   * supplied as the child while keeping all pagination styling, the built-in
   * ChevronRight icon, and the visible "Next" text.
   *
   * @example
   * <PaginationNext asChild>
   *   <a href="/page/3" />
   * </PaginationNext>
   */
  asChild?: boolean;
}

export const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  PaginationNextProps
>(function PaginationNext(
  { className, label = "Next page", asChild = false, children, ...props },
  ref,
) {
  return (
    <Button
      ref={ref}
      data-slot="pagination-next"
      type={asChild ? undefined : "button"}
      asChild={asChild}
      variant="outline"
      size="sm"
      aria-label={label}
      className={cn("gap-2 px-3", className)}
      {...props}
    >
      <Slottable>{children}</Slottable>
      <span className="hidden sm:inline">Next</span>
      <ChevronRight className="h-4 w-4" aria-hidden="true" />
    </Button>
  );
});

export interface PaginationEllipsisProps extends React.ComponentPropsWithoutRef<"span"> {
  /**
   * Accessible label read by screen readers.
   */
  label?: string;
}

export function PaginationEllipsis({
  className,
  label = "More pages",
  ...props
}: PaginationEllipsisProps) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn(
        "flex h-8 w-8 items-center justify-center text-muted-foreground",
        className,
      )}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}

/* -----------------------------------------------------------------------------
 * Optional helper: build a simple page range (UI-only)
 * -----------------------------------------------------------------------------
 * If you prefer to keep all logic outside UI, you can ignore this.
 * This helper stays small and predictable: it returns a page list with ellipsis.
 */

export type PaginationToken =
  | { type: "page"; value: number; isActive?: boolean }
  | { type: "ellipsis"; key: string };

export function buildPaginationRange(args: {
  page: number;
  totalPages: number;
  siblingCount?: number;
  boundaryCount?: number;
}): PaginationToken[] {
  const { page, totalPages, siblingCount = 1, boundaryCount = 1 } = args;

  const clamp = (n: number) => Math.max(1, Math.min(totalPages, n));
  const current = clamp(page);

  // If total pages is small, show all pages.
  const totalNumbers = boundaryCount * 2 + siblingCount * 2 + 3; // incl current + 2 ellipsis
  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => ({
      type: "page" as const,
      value: i + 1,
      isActive: i + 1 === current,
    }));
  }

  const leftBoundaryEnd = boundaryCount;
  const rightBoundaryStart = totalPages - boundaryCount + 1;

  const leftSiblingStart = Math.max(
    current - siblingCount,
    leftBoundaryEnd + 2,
  );
  const rightSiblingEnd = Math.min(
    current + siblingCount,
    rightBoundaryStart - 2,
  );

  const showLeftEllipsis = leftSiblingStart > leftBoundaryEnd + 2;
  const showRightEllipsis = rightSiblingEnd < rightBoundaryStart - 2;

  const range: PaginationToken[] = [];

  // Left boundary
  for (let p = 1; p <= leftBoundaryEnd; p++) {
    range.push({ type: "page", value: p, isActive: p === current });
  }

  // Left ellipsis or gap page
  if (showLeftEllipsis) {
    range.push({ type: "ellipsis", key: "left" });
  } else {
    const gapPage = leftBoundaryEnd + 1;
    range.push({
      type: "page",
      value: gapPage,
      isActive: gapPage === current,
    });
  }

  // Siblings
  for (let p = leftSiblingStart; p <= rightSiblingEnd; p++) {
    range.push({ type: "page", value: p, isActive: p === current });
  }

  // Right ellipsis or gap page
  if (showRightEllipsis) {
    range.push({ type: "ellipsis", key: "right" });
  } else {
    const gapPage = rightBoundaryStart - 1;
    range.push({
      type: "page",
      value: gapPage,
      isActive: gapPage === current,
    });
  }

  // Right boundary
  for (let p = rightBoundaryStart; p <= totalPages; p++) {
    range.push({ type: "page", value: p, isActive: p === current });
  }

  return range;
}
