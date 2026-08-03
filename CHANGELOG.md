# Changelog

## 1.2.3

### Patch Changes

- 9e0656b: Update ESLint dependency metadata for the publishable packages.

## 1.2.2

### Patch Changes

- e81dae3: Fix `PaginationEllipsis` accessibility by exposing its label through visually hidden text instead of an invalid `aria-label` on a generic span.

## 1.2.1

### Patch Changes

- 68d8d11: Update the Radix UI Tabs dependency to 1.1.21.

## 1.2.0

### Minor Changes

- 9b2d872: Converge `EmptyState` and `TableLoading` on a typed `ariaLive` prop (`'off' | 'polite' | 'assertive'`) so live-region role and announcement behavior are computed consistently and preserve current default semantics.

## 1.1.4

### Patch Changes

- 90d9797: Refactor `Card`'s internal structure and expand its JSDoc to explain the
  `asChild`/`interactive` React Server Component contract more explicitly
  (class list expressed as an array for readability, `CardVariantProps`
  extracted as a named type, more detailed usage examples for interactive
  cards).

  No public props, exports, types, variants, or rendered output changed.
  `Card` still never synthesizes `onKeyDown`/`role`/`tabIndex`; `interactive`
  remains purely visual, and real keyboard/focus/click semantics still come
  from composing `asChild` with a native `<a>`/`Link` or `<button>`.

- 217ab0b: Fix nine production-readiness blockers found in the P0 accessibility and reliability audit:
  - `Input` now visually reflects the `disabled` state instead of relying on an inert `disabled:` utility on a non-form wrapper.
  - `Input` and `Textarea` validation errors are announced live via `role="alert"`, even while the field is already focused.
  - `Input` and `Textarea` no longer let a caller-supplied `aria-invalid`/`aria-errormessage` silently override the computed error state, and a caller-supplied `aria-describedby` is now composed with the field's own helper/error ids instead of replacing them.
  - `Badge`'s `success` and `warning` variants use new, dedicated `--success-foreground` / `--warning-foreground` design tokens (added to `@pycolors/tokens`) that meet WCAG AA contrast, replacing a missing token reference and a stray conflicting text-color class.
  - `Toast` now maps `variant` to Radix's `type` prop so routine `default`/`success` toasts announce politely and only `warning`/`destructive` toasts interrupt assertively; an explicit `type` prop still overrides the default.
  - `TableHead` now defaults to `scope="col"`, overridable with an explicit `scope` (including `"row"`).
  - `Skeleton`'s `aria-hidden="true"` can no longer be silently overridden by a passed-through prop, and its pulse animation now respects `prefers-reduced-motion`.
  - Added an axe-core-based accessibility test suite (`vitest-axe`) covering `Input`, `Textarea`, `Badge`, `Toast`, `Table`, and `Skeleton`, plus regression tests for every fix above.

  Also restores `Card`'s compatibility with React Server Components and static prerendering:
  - `Card` no longer synthesizes an `onKeyDown` handler or injects `role`/`tabIndex` during render. A Server Component can never pass a function prop across the RSC boundary, so the previous implementation broke `next build` for _any_ page that rendered a `Card` from a Server Component (not only `interactive` ones) — this was the root cause of a `pnpm --filter pycolors-marketing build` prerender failure.
  - `interactive` is now purely visual (cursor, hover background, focus-visible ring). Real keyboard/focus/click semantics come from composing `asChild` with a real `<button>` (actions) or a real `<a>`/`Link` (navigation) — both already provide correct behavior natively, so Card no longer needs to recreate it.
  - Migrated the docs' interactive-card examples to the `asChild` + real-element pattern and corrected the accessibility guidance that previously (and incorrectly) claimed a bare `Card interactive` was keyboard-operable on its own.

  All changes are additive or internal; no public props, exports, or types were renamed or removed. `Card`'s `interactive` behavior is a correctness fix (it never reliably worked for Server Components) rather than a new breaking change.

  `@pycolors/tokens` receives the new `--success-foreground` and `--warning-foreground` custom properties (light and dark) and their Tailwind v4 `@theme inline` bridges described above — an additive, backward-compatible token addition.

## 1.1.2

### Patch Changes

- 7d2dd2e: Fixes two accessibility gaps and adds regression test coverage across `@pycolors/ui`.
  - `PasswordInput` now fully respects the `disabled` state: the show/hide visibility toggle is disabled along with the field, instead of remaining clickable on a disabled input.
  - `TableLoading` now exposes accessible live-region semantics, so assistive technology users are notified when a table starts loading instead of the state being visual-only.
  - Added focused regression tests covering the public export surface, form field accessibility wiring, password visibility toggling, table rendering, `Card` interactive/`asChild` semantics, and `EmptyState` status semantics.

  No public API, export, prop, variant, or size changed.

## 1.1.1

### Patch Changes

- Improve badge foreground color consistency with primary surfaces

## 1.1.0

### Minor Changes

- 52e9c18: Adds Checkbox, Separator, and Textarea components to PyColors UI.

  Introduces new production-ready form and layout primitives with:
  - accessibility-first behavior
  - semantic token integration
  - improved form layout consistency
  - indeterminate checkbox support
  - validation and helper text support
  - comprehensive MDX documentation

## 1.0.6

### Patch Changes

- 243d833: docs: clarify project status and release architecture in README

  Adds a new "Status" section to better communicate:
  - production-readiness
  - automated release pipeline (monorepo → mirror → GitHub Release → npm)
  - active maintenance

  This improves transparency for users and reinforces the distribution model of the library.

## 1.0.5

### Patch Changes

- a0de088: Removes unnecessary prop from UI component example.
  - Simplifies usage by eliminating the redundant bordered prop.
  - Improves clarity for users referencing the example.

## 1.0.4

### Patch Changes

- 0f9d818: Improve release automation and GitHub distribution workflow.
  - Enable automated GitHub Releases for the mirror repository
  - Align versioning between monorepo, npm, and GitHub
  - Strengthen CI pipeline for production-grade publishing

## 1.0.3

### Patch Changes

- 18b87c8: Improve release infrastructure and documentation to support a production-grade distribution workflow.
  - Add automated release pipeline with Changesets
  - Clarify monorepo as the source of truth
  - Enhance README with badges and installation guidance
  - Strengthen repository sync and versioning strategy

All notable changes to **@pycolors/ui** are documented here.

This project follows **Semantic Versioning** and is powered by **Changesets**.

👉 See GitHub Releases for compiled release notes:
https://github.com/pycolors-io/pycolors-ui/releases
