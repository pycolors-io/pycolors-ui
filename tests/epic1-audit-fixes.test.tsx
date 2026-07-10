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

  it('announces TableLoading as a live status region with a decorative spinner', () => {
    render(
      <ui.Table>
        <ui.TableBody>
          <ui.TableLoading colSpan={2} />
        </ui.TableBody>
      </ui.Table>,
    );

    const status = screen.getByRole('status');

    expect(status).toHaveTextContent('Loading…');
    expect(status.querySelector('span[aria-hidden="true"]')).not.toBeNull();
  });

  it('renders EmptyState as a status live region by default', () => {
    render(
      <ui.EmptyState
        title="No projects yet"
        description="Create your first project to get started."
      />,
    );

    expect(screen.getByRole('status')).toHaveTextContent('No projects yet');
  });

  it('lets a consumer opt out of EmptyState default status semantics via role', () => {
    render(<ui.EmptyState title="Static note" role="presentation" />);

    expect(screen.queryByRole('status')).toBeNull();
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

  it('still applies keyboard-operable button semantics for a bare interactive Card', () => {
    render(
      <ui.Card interactive onClick={() => {}}>
        Selectable card
      </ui.Card>,
    );

    const card = screen.getByRole('button', { name: 'Selectable card' });

    expect(card).toHaveAttribute('tabIndex', '0');
  });
});
