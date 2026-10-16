# EPIC 1 Audit — Existing `@pycolors/ui` Components

Date: 2026-07-08 (original audit) — updated 2026-07-10 (follow-up review + fixes)
Scope: `packages/ui/src/components/ui`

> This file originated from an automated Copilot audit PR
> (`copilot/audit-existing-ui-components`) and has not been merged to `main`.
> It is checked in here directly, with the original inventory preserved and a
> follow-up review section added documenting which launch-blocking items were
> fixed, and which were reviewed and rejected with rationale.

## Component Inventory (Current Behavior + Gaps)

| Component            | Current behavior                                                                                                                                                                        | Primary gaps observed                                                                                                                                                  |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alert.tsx`          | Variant-based alert container (`default/info/success/warning/destructive`) with title/description/indicator/content parts. Computes a deterministic `role`/`aria-live` from `ariaLive`. | Missing `data-slot` attributes on sub-parts, inconsistent with package standard. Not launch-blocking.                                                                  |
| `badge.tsx`          | CVA variants + `asChild` support and ref forwarding.                                                                                                                                    | No explicit disabled/read-only behavior guidance in API surface. Not launch-blocking.                                                                                  |
| `button.tsx`         | CVA variants/sizes, `asChild`, ref forwarding, `data-slot` on root.                                                                                                                     | None blocking found in implementation audit.                                                                                                                           |
| `card.tsx`           | Variant + `interactive` support, keyboard activation for Enter/Space when rendered as `div`, compound parts.                                                                            | See **Reviewed — not a defect** below regarding `interactive` + `asChild`.                                                                                             |
| `checkbox.tsx`       | Radix-based checkbox with indicator + helper layout primitives.                                                                                                                         | No root `error` API convenience like input/textarea; consumers must wire invalid state manually. Not launch-blocking.                                                  |
| `dialog.tsx`         | Radix dialog wrapper with overlay/content/title/description/close primitives.                                                                                                           | No `data-slot` attributes on parts despite package convention. Not launch-blocking.                                                                                    |
| `dropdown-menu.tsx`  | Radix dropdown primitives incl. item/checkbox/radio/submenu support.                                                                                                                    | No `data-slot` attributes on parts despite package convention. Not launch-blocking.                                                                                    |
| `empty-state.tsx`    | Simple empty state with optional icon, description, and action; renders `role="status"` by default.                                                                                     | See **Reviewed — not a defect** below.                                                                                                                                 |
| `input.tsx`          | Labeled input with helper/error text, icon slots, aria wiring, size/error variants.                                                                                                     | Wrapper and helper parts do not expose `data-slot` hooks. Not launch-blocking.                                                                                         |
| `pagination.tsx`     | Pagination primitives + helper range generator, active page semantics.                                                                                                                  | Page/link controls are implemented as buttons (without `asChild`), which limits direct anchor/link composition. Not launch-blocking; tracked as a future API addition. |
| `password-input.tsx` | Composes `Input` with show/hide visibility toggle button.                                                                                                                               | **Fixed** — see below.                                                                                                                                                 |
| `separator.tsx`      | Horizontal/vertical separator with decorative semantic mode.                                                                                                                            | None blocking found in implementation audit.                                                                                                                           |
| `sheet.tsx`          | Radix dialog-based sheet with side variants and close controls.                                                                                                                         | No `data-slot` attributes on parts despite package convention. Not launch-blocking.                                                                                    |
| `skeleton.tsx`       | Pulse skeleton with optional circle shape.                                                                                                                                              | Always `aria-hidden`; correct for a decorative placeholder — not launch-blocking.                                                                                      |
| `table.tsx`          | Table primitives plus `TableEmpty` and `TableLoading` helpers.                                                                                                                          | **Fixed** — `TableLoading` live-region announcement, see below.                                                                                                        |
| `tabs.tsx`           | Radix tabs wrappers with size variants for list/trigger/content.                                                                                                                        | No `data-slot` attributes on parts despite package convention. Not launch-blocking.                                                                                    |
| `textarea.tsx`       | Labeled textarea with helper/error text, resize + size + error variants.                                                                                                                | Wrapper and helper parts do not expose `data-slot` hooks. Not launch-blocking.                                                                                         |
| `toast.tsx`          | Radix toast wrappers with variant styling and provider/viewport exports.                                                                                                                | No `data-slot` attributes on parts despite package convention. Not launch-blocking.                                                                                    |

## Severity + Business Impact

### Critical (launch-blocking) — resolution status

1. **No automated tests for `@pycolors/ui` components** — **Resolved.**
   Vitest + jsdom + Testing Library infrastructure now exists
   (`packages/ui/vitest.config.ts`, `packages/ui/tests/`), wired into
   `pnpm --filter @pycolors/ui test` and `verify`. Coverage includes public
   export presence, Button variants, Input/Textarea accessibility wiring,
   Table rendering, and (as of this update) PasswordInput disabled-state
   behavior, TableLoading live-region semantics, and Card `asChild`/interactive
   semantics.

2. **`Card` interactive semantics break with `asChild` composition** —
   **Reviewed — not a defect. No code change made.**
   `card.tsx` intentionally sets `isInteractiveElement = Boolean(interactive) && !asChild`.
   When `asChild` is used, Card renders via Radix `Slot` onto whatever real
   element the consumer supplies — and the component's own documented guidance
   is to use `asChild` with a real `<a>` or `<button>` specifically so that
   element's _native_ semantics apply. Forcing `role="button"`, `tabIndex`, and
   a synthetic Enter/Space handler onto that child regardless of what it is
   would be a regression: on a real `<a href>` it would overwrite a correct
   implicit `role="link"` with an incorrect `role="button"`, and on a real
   `<button>` it is redundant (native buttons already have `role="button"`,
   `tabIndex={0}`, and native Enter/Space activation). A regression test
   (`epic1-audit-fixes.test.tsx`) now locks in the correct behavior: a
   `Card asChild interactive` wrapping `<a href="/docs">` keeps its native
   `link` role. A second test locks in that a bare `Card interactive` (no
   `asChild`) still gets `role="button"` + `tabIndex={0}`, per the original
   Commit-1 fix.

3. **`PasswordInput` visibility toggle ignores disabled state** — **Fixed.**
   `disabled` is now destructured from `PasswordInputProps` and applied both
   to the underlying `Input` and to the visibility-toggle `<button>`
   (including `disabled:pointer-events-none disabled:opacity-50` styling
   consistent with `Button`'s disabled treatment). No prop was renamed, added,
   or removed — `disabled` was already part of the public API via
   `Omit<InputProps, 'type' | 'rightIcon'>`; only its internal handling
   changed. Verified with two new tests: the toggle is `disabled` and inert
   when the field is disabled, and unaffected when it is not.

### High

1. **Package-wide `data-slot` consistency gap** — not addressed in this pass.
   Explicitly out of scope: the task authorizing this round of fixes excludes
   "broad component API normalization" and "unrelated refactors." Tracked as
   follow-up (`@pycolors/ui: standardize data-slot coverage across all
exported UI parts`).
2. **Loading/empty state accessibility gaps in data display primitives** —
   **partially resolved.**
   - `TableLoading` — **Fixed.** The loading row's text wrapper now has
     `role="status"` + `aria-live="polite"`, and the decorative spinner now
     has `aria-hidden="true"` (matching the icon convention used everywhere
     else in the package). Verified with a new test asserting the row exposes
     an accessible `status` role.
   - `EmptyState` — **Reviewed — not a defect. No code change made.**
     `EmptyState`'s unconditional `role="status"` is correct for its primary
     documented use case: replacing a loading/skeleton row once a request
     resolves, where an automatic announcement is exactly the desired
     behavior (this mirrors `Alert`'s `ariaLive="polite"` → `role="status"`
     default). It does not violate any ARIA nesting rule when placed inside a
     `TableCell`, and it is already override-able by a consumer passing an
     explicit `role` prop, since `EmptyStateProps` spreads `...props` after
     the default `role="status"`. A new test locks in both the default status
     role and the override escape hatch.
3. **Pagination composition flexibility is limited** — not addressed in this
   pass; explicitly out of scope (see High #1 rationale). Tracked as
   follow-up (`@pycolors/ui: add asChild support to Pagination link
primitives`).

### Medium / Low

Unchanged from the original audit; none are launch-blocking and none were
in scope for this patch release. See "Suggested Follow-up Issues" below.

## Launch-Blocking Follow-up Checklist

- [x] Create test infrastructure for `@pycolors/ui` (runner + DOM env +
      accessibility assertions) and add baseline render/a11y tests for all
      current components. _(Vitest/jsdom/Testing Library, `release-smoke.test.tsx`.)_
- [x] Fix `Card` interactive + `asChild` behavior — **reviewed and confirmed
      correct as implemented; regression tests added instead of a behavior
      change.**
- [x] Fix `PasswordInput` toggle disabled behavior by propagating disabled
      state to the visibility button.
- [x] Resolve loading/empty accessibility semantics — `TableLoading` fixed
      with a live-region announcement; `EmptyState` reviewed and confirmed
      correct as implemented, with a regression test added.

All four launch-blocking checklist items from the original audit are closed
(fixed or reviewed-and-confirmed-correct) as of this update.

## Release-Safety Test Coverage Update

Updated 2026-08-02 for issue #45.

Focused public-behavior coverage now also exists for previously thinly covered
release-safety surfaces:

- `Alert` live-region role selection and compound content rendering.
- `Checkbox` label, description, checked, disabled, invalid, and non-mutating
  disabled interaction behavior.
- `Dialog` and `Sheet` title/description wiring plus public open/close
  controls.
- `Tabs` selected-state and visible panel switching.
- `Pagination` accessible navigation controls, active page state, disabled
  controls, ellipsis labeling, and `buildPaginationRange` edge cases.

This update found and fixed one small backward-compatible accessibility defect:
`PaginationEllipsis` now exposes its label through visually hidden text instead
of an invalid `aria-label` on a generic `span`. Public exports, component props,
package metadata, dependencies, and generated output are unchanged. A patch
Changeset documents the publishable behavior fix.

## Suggested Follow-up Issues

(Unchanged from the original audit — none of these are launch-blocking for
this patch release.)

1. `@pycolors/ui: standardize data-slot coverage across all exported UI parts`
2. `@pycolors/ui: add asChild support to Pagination link primitives`
3. `@pycolors/ui: add a first-class error API to Checkbox`
4. `@pycolors/ui: converge Button's size vocabulary with Input/Textarea/Badge/Tabs`
