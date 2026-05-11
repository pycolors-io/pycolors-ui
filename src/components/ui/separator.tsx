import * as React from 'react';

import { cn } from '../../lib/utils.js';

/* -----------------------------------------------------------------------------
 * Root
 * -------------------------------------------------------------------------- */

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = 'horizontal',
      decorative = true,
      ...props
    },
    ref,
  ) => {
    const semanticProps = decorative
      ? { role: 'none' }
      : {
          role: 'separator',
          'aria-orientation': orientation,
        };

    return (
      <div
        ref={ref}
        data-slot="separator"
        data-orientation={orientation}
        className={cn(
          'shrink-0 bg-border',
          orientation === 'horizontal'
            ? 'h-px w-full'
            : 'h-full w-px',
          className,
        )}
        {...semanticProps}
        {...props}
      />
    );
  },
);
Separator.displayName = 'Separator';

/* -----------------------------------------------------------------------------
 * Exports
 * -------------------------------------------------------------------------- */

export { Separator };
