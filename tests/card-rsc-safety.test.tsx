import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import * as ui from '../src/index.js';
import { expectNoA11yViolations } from './a11y.js';

// Card must stay a purely structural, server-renderable primitive: no
// synthesized event handler, no injected role/tabIndex. Real keyboard/click
// semantics come only from composing `asChild` with a real `<button>` or
// `<a>`/`Link`. These tests assert rendered semantics and user-visible
// behavior — not the presence/absence of a React event-handler reference,
// which Testing Library cannot reliably inspect.
describe('Card — server-safe structural primitive', () => {
  it('renders a static card with no role or tabIndex', () => {
    render(<ui.Card>Static content</ui.Card>);

    const card = screen.getByText('Static content');
    expect(card).not.toHaveAttribute('role');
    expect(card).not.toHaveAttribute('tabindex');
  });

  it('does not translate Enter/Space into a click on a static card', () => {
    const onClick = vi.fn();
    render(<ui.Card onClick={onClick}>Static content</ui.Card>);

    const card = screen.getByText('Static content');
    fireEvent.keyDown(card, { key: 'Enter' });
    fireEvent.keyDown(card, { key: ' ' });

    expect(onClick).not.toHaveBeenCalled();
  });

  it('interactive adds only visual affordance classes, no role/tabIndex/keyboard handling', () => {
    const onClick = vi.fn();
    render(
      <ui.Card interactive onClick={onClick}>
        Selectable
      </ui.Card>,
    );

    const card = screen.getByText('Selectable');
    expect(card).toHaveClass('cursor-pointer');
    expect(card).not.toHaveAttribute('role');
    expect(card).not.toHaveAttribute('tabindex');

    fireEvent.keyDown(card, { key: 'Enter' });
    fireEvent.keyDown(card, { key: ' ' });
    expect(onClick).not.toHaveBeenCalled();
  });

  it('asChild with a real anchor preserves its href and native link semantics', () => {
    render(
      <ui.Card asChild interactive>
        <a href="/blog/my-post">Read the post</a>
      </ui.Card>,
    );

    const link = screen.getByRole('link', { name: 'Read the post' });
    expect(link).toHaveAttribute('href', '/blog/my-post');
    expect(link.tagName).toBe('A');
    expect(link).not.toHaveAttribute('role', 'button');
  });

  it('asChild with a real button preserves native button semantics', () => {
    const onClick = vi.fn();
    render(
      <ui.Card asChild interactive>
        <button type="button" onClick={onClick}>
          Select plan
        </button>
      </ui.Card>,
    );

    const button = screen.getByRole('button', { name: 'Select plan' });
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('type', 'button');

    // Native <button> elements provide Enter/Space activation as a browser
    // platform guarantee; what Card must provide is only that the real
    // button — and its click handling — reaches the DOM unmodified.
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('forwards the ref to the underlying div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ui.Card ref={ref}>Content</ui.Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('preserves data-slot, variant, and className on the root element', () => {
    render(
      <ui.Card variant="muted" className="max-w-sm">
        Content
      </ui.Card>,
    );

    const card = screen.getByText('Content');
    expect(card).toHaveAttribute('data-slot', 'card');
    expect(card).toHaveClass('bg-muted/40');
    expect(card).toHaveClass('max-w-sm');
  });

  it('has no detectable accessibility violations in static mode', async () => {
    const { container } = render(
      <ui.Card>
        <ui.CardHeader>
          <ui.CardTitle>Account</ui.CardTitle>
          <ui.CardDescription>Manage your account.</ui.CardDescription>
        </ui.CardHeader>
      </ui.Card>,
    );
    await expectNoA11yViolations(container);
  });

  it('has no detectable accessibility violations in link-card mode', async () => {
    const { container } = render(
      <ui.Card asChild interactive>
        <a href="/blog/my-post">
          <ui.CardHeader>
            <ui.CardTitle>Read the post</ui.CardTitle>
          </ui.CardHeader>
        </a>
      </ui.Card>,
    );
    await expectNoA11yViolations(container);
  });

  it('has no detectable accessibility violations in button-card mode', async () => {
    const { container } = render(
      <ui.Card asChild interactive>
        <button type="button" onClick={() => {}}>
          <ui.CardHeader>
            <ui.CardTitle>Select plan</ui.CardTitle>
          </ui.CardHeader>
        </button>
      </ui.Card>,
    );
    await expectNoA11yViolations(container);
  });
});
