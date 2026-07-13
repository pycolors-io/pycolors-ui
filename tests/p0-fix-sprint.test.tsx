import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import * as ui from '../src/index.js';
import { expectNoA11yViolations } from './a11y.js';

describe('P0 fix sprint regressions', () => {
  describe('Input — disabled visual state', () => {
    it('visually communicates disabled via the field wrapper, not only the native attribute', () => {
      render(<ui.Input label="Email" disabled />);

      const input = screen.getByLabelText('Email');
      expect(input).toBeDisabled();

      // The wrapper (not the <input>) owns the border/background, so it
      // must carry the visual disabled styling explicitly.
      const wrapper = input.parentElement;
      expect(wrapper).toHaveClass('opacity-50');
      expect(wrapper).toHaveClass('cursor-not-allowed');
    });

    it('does not apply disabled styling when the field is enabled', () => {
      render(<ui.Input label="Email" />);

      const wrapper = screen.getByLabelText('Email').parentElement;
      expect(wrapper).not.toHaveClass('opacity-50');
      expect(wrapper).not.toHaveClass('cursor-not-allowed');
    });

    it('has no detectable accessibility violations when disabled', async () => {
      const { container } = render(
        <ui.Input label="Email" disabled />,
      );
      await expectNoA11yViolations(container);
    });
  });

  describe('Input — error announcement and ARIA composition', () => {
    it('announces a validation error via an alert live region', () => {
      render(
        <ui.Input label="Email" error="Invalid email address" />,
      );

      expect(screen.getByRole('alert')).toHaveTextContent(
        'Invalid email address',
      );
    });

    it('associates helper text via aria-describedby when there is no error', () => {
      render(
        <ui.Input
          id="email"
          label="Email"
          helperText="Use your work email"
        />,
      );

      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute(
        'aria-describedby',
        'email-helper',
      );
      expect(input).toHaveAttribute('aria-invalid', 'false');
      expect(input).not.toHaveAttribute('aria-errormessage');
    });

    it('associates the error text via aria-describedby and aria-errormessage', () => {
      render(<ui.Input id="email" label="Email" error="Required" />);

      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('aria-describedby', 'email-error');
      expect(input).toHaveAttribute(
        'aria-errormessage',
        'email-error',
      );
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('preserves a consumer-supplied aria-describedby when there is no internal description', () => {
      render(
        <ui.Input
          id="email"
          label="Email"
          aria-describedby="external-hint"
        />,
      );

      expect(screen.getByLabelText('Email')).toHaveAttribute(
        'aria-describedby',
        'external-hint',
      );
    });

    it('merges a consumer-supplied aria-describedby with the internal error id instead of replacing it', () => {
      render(
        <ui.Input
          id="email"
          label="Email"
          error="Required"
          aria-describedby="external-hint"
        />,
      );

      expect(screen.getByLabelText('Email')).toHaveAttribute(
        'aria-describedby',
        'email-error external-hint',
      );
    });

    it('never lets a conflicting consumer aria-invalid or aria-errormessage override the computed error state', () => {
      render(
        <ui.Input
          id="email"
          label="Email"
          error="Required"
          aria-invalid={false}
          aria-errormessage="something-else"
        />,
      );

      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute(
        'aria-errormessage',
        'email-error',
      );
    });

    it('forwards the ref to the underlying input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<ui.Input label="Email" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('has no detectable accessibility violations with an error', async () => {
      const { container } = render(
        <ui.Input label="Email" error="Required" />,
      );
      await expectNoA11yViolations(container);
    });
  });

  describe('Textarea — error announcement and ARIA composition', () => {
    it('announces a validation error via an alert live region', () => {
      render(
        <ui.Textarea
          label="Launch notes"
          error="Notes must be at least 20 characters."
        />,
      );

      expect(screen.getByRole('alert')).toHaveTextContent(
        'Notes must be at least 20 characters.',
      );
    });

    it('associates helper text via aria-describedby when there is no error', () => {
      render(
        <ui.Textarea
          id="notes"
          label="Launch notes"
          helperText="Summarize the release"
        />,
      );

      const textarea = screen.getByLabelText('Launch notes');
      expect(textarea).toHaveAttribute(
        'aria-describedby',
        'notes-helper',
      );
      expect(textarea).toHaveAttribute('aria-invalid', 'false');
    });

    it('merges a consumer-supplied aria-describedby with the internal error id instead of replacing it', () => {
      render(
        <ui.Textarea
          id="notes"
          label="Launch notes"
          error="Required"
          aria-describedby="external-hint"
        />,
      );

      expect(screen.getByLabelText('Launch notes')).toHaveAttribute(
        'aria-describedby',
        'notes-error external-hint',
      );
    });

    it('never lets a conflicting consumer aria-invalid override the computed error state', () => {
      render(
        <ui.Textarea
          id="notes"
          label="Launch notes"
          error="Required"
          aria-invalid={false}
        />,
      );

      expect(screen.getByLabelText('Launch notes')).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    });

    it('forwards the ref to the underlying textarea element', () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      render(<ui.Textarea label="Launch notes" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });

    it('has no detectable accessibility violations', async () => {
      const { container } = render(
        <ui.Textarea label="Launch notes" />,
      );
      await expectNoA11yViolations(container);
    });
  });

  describe('Badge — semantic foreground tokens', () => {
    it('uses the real success foreground token instead of a stray conflicting class', () => {
      render(<ui.Badge variant="success">Active</ui.Badge>);

      const badge = screen.getByText('Active');
      expect(badge).toHaveClass('text-success-foreground');
      expect(badge).not.toHaveClass('text-primary-foreground');
    });

    it('uses the real warning foreground token', () => {
      render(<ui.Badge variant="warning">Pending</ui.Badge>);
      expect(screen.getByText('Pending')).toHaveClass(
        'text-warning-foreground',
      );
    });

    it('forwards the ref to the underlying span element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<ui.Badge ref={ref}>Label</ui.Badge>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('has no detectable accessibility violations', async () => {
      const { container } = render(
        <ui.Badge variant="success">Active</ui.Badge>,
      );
      await expectNoA11yViolations(container);
    });
  });

  describe('Toast — announcement urgency', () => {
    function renderToast(toast: React.ReactElement) {
      return render(
        <ui.ToastProvider>
          {toast}
          <ui.ToastViewport />
        </ui.ToastProvider>,
      );
    }

    it.each([
      ['default', 'polite'],
      ['success', 'polite'],
      ['warning', 'assertive'],
      ['destructive', 'assertive'],
    ] as const)(
      'maps the %s variant to a %s live-region announcement',
      (variant, expectedLive) => {
        renderToast(
          <ui.Toast open onOpenChange={() => {}} variant={variant}>
            <ui.ToastTitle>Message</ui.ToastTitle>
          </ui.Toast>,
        );

        expect(screen.getByRole('status')).toHaveAttribute(
          'aria-live',
          expectedLive,
        );
      },
    );

    it('lets an explicit type prop override the variant-inferred default', () => {
      renderToast(
        <ui.Toast
          open
          onOpenChange={() => {}}
          variant="destructive"
          type="background"
        >
          <ui.ToastTitle>Message</ui.ToastTitle>
        </ui.Toast>,
      );

      expect(screen.getByRole('status')).toHaveAttribute(
        'aria-live',
        'polite',
      );
    });

    it('forwards the ref to the underlying toast element', () => {
      const ref = React.createRef<HTMLLIElement>();
      renderToast(
        <ui.Toast open onOpenChange={() => {}} ref={ref}>
          <ui.ToastTitle>Message</ui.ToastTitle>
        </ui.Toast>,
      );
      expect(ref.current).toBeInstanceOf(HTMLLIElement);
    });

    it('has no detectable accessibility violations while open', async () => {
      const { container } = renderToast(
        <ui.Toast open onOpenChange={() => {}} variant="destructive">
          <ui.ToastTitle>Something went wrong</ui.ToastTitle>
          <ui.ToastDescription>
            Please try again.
          </ui.ToastDescription>
        </ui.Toast>,
      );
      await expectNoA11yViolations(container);
    });
  });

  describe('Table — TableHead default scope', () => {
    it('defaults TableHead to a column header scope', () => {
      render(
        <ui.Table>
          <ui.TableHeader>
            <ui.TableRow>
              <ui.TableHead>Name</ui.TableHead>
            </ui.TableRow>
          </ui.TableHeader>
        </ui.Table>,
      );

      expect(
        screen.getByRole('columnheader', { name: 'Name' }),
      ).toHaveAttribute('scope', 'col');
    });

    it('lets a consumer override the scope for a row header', () => {
      render(
        <ui.Table>
          <ui.TableBody>
            <ui.TableRow>
              <ui.TableHead scope="row">Total</ui.TableHead>
              <ui.TableCell>$42</ui.TableCell>
            </ui.TableRow>
          </ui.TableBody>
        </ui.Table>,
      );

      expect(
        screen.getByRole('rowheader', { name: 'Total' }),
      ).toHaveAttribute('scope', 'row');
    });

    it('has no detectable accessibility violations', async () => {
      const { container } = render(
        <ui.Table>
          <ui.TableHeader>
            <ui.TableRow>
              <ui.TableHead>Name</ui.TableHead>
            </ui.TableRow>
          </ui.TableHeader>
          <ui.TableBody>
            <ui.TableRow>
              <ui.TableCell>Website</ui.TableCell>
            </ui.TableRow>
          </ui.TableBody>
        </ui.Table>,
      );
      await expectNoA11yViolations(container);
    });
  });

  describe('Skeleton — aria-hidden guarantee', () => {
    it('always remains aria-hidden even if a caller tries to override it', () => {
      render(<ui.Skeleton data-testid="skeleton" aria-hidden="false" />);
      expect(screen.getByTestId('skeleton')).toHaveAttribute(
        'aria-hidden',
        'true',
      );
    });

    it('disables the pulse animation for prefers-reduced-motion', () => {
      render(<ui.Skeleton data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass(
        'motion-reduce:animate-none',
      );
    });

    it('has no detectable accessibility violations', async () => {
      const { container } = render(<ui.Skeleton />);
      await expectNoA11yViolations(container);
    });
  });
});
