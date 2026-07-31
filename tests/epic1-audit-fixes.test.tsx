import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import * as ui from '../src/index.js';

describe('EPIC 1 audit follow-up fixes', () => {
  it('disables the PasswordInput visibility toggle when the field is disabled', () => {
    render(
      <ui.PasswordInput id="password" label="Password" disabled />,
    );

    const input = screen.getByLabelText('Password');
    const toggle = screen.getByRole('button', { name: 'Show password' });

    expect(input).toBeDisabled();
    expect(toggle).toBeDisabled();

    fireEvent.click(toggle);

    // A disabled button does not dispatch click, so visibility must not change.
    expect(input).toHaveAttribute('type', 'password');
    expect(
      screen.getByRole('button', { name: 'Show password' }),
    ).toBeInTheDocument();
  });

  it('keeps the PasswordInput toggle enabled and functional when the field is not disabled', () => {
    render(<ui.PasswordInput id="password-active" label="Password" />);

    const input = screen.getByLabelText('Password');
    const toggle = screen.getByRole('button', { name: 'Show password' });

    expect(toggle).not.toBeDisabled();

    fireEvent.click(toggle);

    expect(input).toHaveAttribute('type', 'text');
  });

  it('uses polite live-region semantics for TableLoading by default', () => {
    render(
      <ui.Table>
        <ui.TableBody>
          <ui.TableLoading colSpan={2} />
        </ui.TableBody>
      </ui.Table>,
    );

    const status = screen.getByRole('status');

    expect(status).toHaveTextContent('Loading…');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status.querySelector('span[aria-hidden="true"]')).not.toBeNull();
  });

  it('supports off, polite, and assertive ariaLive values for TableLoading', () => {
    const { rerender } = render(
      <ui.Table>
        <ui.TableBody>
          <ui.TableLoading colSpan={2} ariaLive="off" />
        </ui.TableBody>
      </ui.Table>,
    );

    expect(screen.queryByRole('status')).toBeNull();
    expect(screen.queryByRole('alert')).toBeNull();

    rerender(
      <ui.Table>
        <ui.TableBody>
          <ui.TableLoading colSpan={2} ariaLive="polite" />
        </ui.TableBody>
      </ui.Table>,
    );

    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-live',
      'polite',
    );

    rerender(
      <ui.Table>
        <ui.TableBody>
          <ui.TableLoading colSpan={2} ariaLive="assertive" />
        </ui.TableBody>
      </ui.Table>,
    );

    expect(screen.getByRole('alert')).toHaveAttribute(
      'aria-live',
      'assertive',
    );
  });

  it('renders EmptyState as a polite status live region by default', () => {
    render(
      <ui.EmptyState
        title="No projects yet"
        description="Create your first project to get started."
      />,
    );

    expect(screen.getByRole('status')).toHaveTextContent('No projects yet');
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-live',
      'polite',
    );
  });

  it('supports off, polite, and assertive ariaLive values for EmptyState', () => {
    const { rerender } = render(
      <ui.EmptyState title="Static note" ariaLive="off" />,
    );

    expect(screen.queryByRole('status')).toBeNull();
    expect(screen.queryByRole('alert')).toBeNull();

    rerender(<ui.EmptyState title="Static note" ariaLive="polite" />);

    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-live',
      'polite',
    );

    rerender(<ui.EmptyState title="Static note" ariaLive="assertive" />);

    expect(screen.getByRole('alert')).toHaveAttribute(
      'aria-live',
      'assertive',
    );
  });

  it('does not allow raw passthrough props to override EmptyState computed live-region semantics', () => {
    render(
      <ui.EmptyState
        title="No overrides"
        role="presentation"
        aria-live="off"
      />,
    );

    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-live',
      'polite',
    );
  });

  it('preserves native semantics of a real anchor when Card uses asChild + interactive', () => {
    render(
      <ui.Card asChild interactive>
        <a href="/docs">Read the docs</a>
      </ui.Card>,
    );

    const link = screen.getByRole('link', { name: 'Read the docs' });

    // Card must not override the anchor's native link role/semantics.
    expect(link).not.toHaveAttribute('role', 'button');
    expect(link.tagName).toBe('A');
  });

  it('never synthesizes button semantics for a bare interactive Card — compose asChild with a real button instead', () => {
    render(
      <ui.Card interactive onClick={() => {}}>
        Selectable card
      </ui.Card>,
    );

    const card = screen.getByText('Selectable card');

    // A bare `interactive` Card is visual-only: no role, no tabIndex, and no
    // synthesized keyboard handling. See packages/ui/tests/card-rsc-safety.test.tsx
    // for the full regression suite covering this contract.
    expect(card).not.toHaveAttribute('role');
    expect(card).not.toHaveAttribute('tabindex');
  });
});
