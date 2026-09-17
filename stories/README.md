# Maintaining the public Storybook catalog

Issue #417 implements the public catalog subset of #416 approved by the owner
in the task instruction; it does not approve private Pro, infrastructure,
Storybook/Vitest integration or MCP.

## Authoring and verification

The public `src/index.ts` barrel remains the family authority. Add or update
`components/<family>.stories.tsx`, using `Meta` and `StoryObj` from
`@storybook/react-vite` and `../../src/index.js` imports. Consumer snippets use
`@pycolors/ui`. Never import component internals or copy a Block/Starter.

Use explicit `meta.id: "components-<family>"`, a singular display title under
`Components/<category>/<Family>`, `component`, a concise description and the
matching real Fumadocs URL. Each family has `Default`; add only meaningful
supported states. Args/controls must operate on the rendered component. Disable
controls for fixed multi-example fixtures; never expose invented props or a
controlled value without its state handler. Autodocs and interaction tests are
not configured by this migration.

Navigation is Foundations, Components (Forms, Feedback, Overlays, Navigation,
Data display, Layout), then Compositions. Default precedes named states. The
legacy UI group is last. Foundations use existing semantic tokens and utility
styles; compositions are bounded synthetic teaching fixtures, not product APIs.

IDs are independent of filenames/titles through explicit meta IDs and stable
story export keys. Renaming a key still changes its story URL. Update owned
links and record a compatibility mapping before removing any ID. Do not infer
that an HTTP redirect repairs Storybook query IDs. No public Explorer deployment
is claimed here; run the local `storybook` script or serve `storybook-static`.

Run `pnpm --filter @pycolors/ui verify`, `pnpm check:ui-package`, and the
repository-required checks. The catalog test checks barrel coverage, stable IDs,
docs links and legacy render reuse; the static build must also be inspected
for generated IDs. Existing unit tests stay authoritative for component behavior.
#418 owns future browser/play/a11y execution and the Vitest 5 compatibility gate.
A build or installed a11y addon is not browser/keyboard/screen-reader proof.
Review both themes, representative desktop/mobile widths and interactive states.
If usage changes, update the matching Fumadocs page and its docs typecheck.

Stories/fixtures are not npm package API and require no release by themselves.
Public component changes require their real release classification/Changeset,
package tests and docs. The package tree is publicly mirrored: no proprietary
source, private stories, credentials, customer data or Pro showcases belong here.
#422/#423 own future premium boundaries; #424 owns the optional agent pilot.

## Legacy migration ledger

Baseline: main `c1a3c1f9ef879b42d42e187ade3cd78fa25c1562`, 19 stories across
18 public families. All legacy IDs remain because external local-bookmark use
cannot be ruled out. `public-surface.stories.tsx` is now only a typed compatibility
shim delegating to canonical stories; never add a render implementation there.
No deprecation/removal date is approved. Future removal needs owner approval and
a documented transition. Repository search found only the former Fumadocs
maintenance pointer and the historical architecture audit reference; the former
now points to the family directory, while the audit remains a dated baseline.

| Legacy ID                                                  | Canonical ID                               | Module                                  |
| ---------------------------------------------------------- | ------------------------------------------ | --------------------------------------- |
| `ui-public-component-surface--buttons`                     | `components-button--variants`              | `components/button.stories.tsx`         |
| `ui-public-component-surface--cards`                       | `components-card--composition`             | `components/card.stories.tsx`           |
| `ui-public-component-surface--checkboxes`                  | `components-checkbox--states`              | `components/checkbox.stories.tsx`       |
| `ui-public-component-surface--badges`                      | `components-badge--variants`               | `components/badge.stories.tsx`          |
| `ui-public-component-surface--inputs`                      | `components-input--states`                 | `components/input.stories.tsx`          |
| `ui-public-component-surface--skeletons`                   | `components-skeleton--default`             | `components/skeleton.stories.tsx`       |
| `ui-public-component-surface--empty-states`                | `components-empty-state--with-action`      | `components/empty-state.stories.tsx`    |
| `ui-public-component-surface--alerts`                      | `components-alert--variants`               | `components/alert.stories.tsx`          |
| `ui-public-component-surface--dialogs`                     | `components-dialog--default`               | `components/dialog.stories.tsx`         |
| `ui-public-component-surface--separators`                  | `components-separator--default`            | `components/separator.stories.tsx`      |
| `ui-public-component-surface--sheets`                      | `components-sheet--default`                | `components/sheet.stories.tsx`          |
| `ui-public-component-surface--dropdown-menus`              | `components-dropdown-menu--default`        | `components/dropdown-menu.stories.tsx`  |
| `ui-public-component-surface--tab-sets`                    | `components-tabs--default`                 | `components/tabs.stories.tsx`           |
| `ui-public-component-surface--toasts`                      | `components-toast--default`                | `components/toast.stories.tsx`          |
| `ui-public-component-surface--pagination-link-composition` | `components-pagination--link-composition`  | `components/pagination.stories.tsx`     |
| `ui-public-component-surface--pagination-controls`         | `components-pagination--default`           | `components/pagination.stories.tsx`     |
| `ui-public-component-surface--tables`                      | `components-table--rows-and-empty-section` | `components/table.stories.tsx`          |
| `ui-public-component-surface--textareas`                   | `components-textarea--states`              | `components/textarea.stories.tsx`       |
| `ui-public-component-surface--password-inputs`             | `components-password-input--default`       | `components/password-input.stories.tsx` |

All representative content is retained. Pagination link destinations now use
local fragments instead of `/page/1`–`/page/3`, which were nonexistent routes in
the static Explorer; native link/current-page composition remains unchanged.
New separate table states complement the retained rows-and-empty-section example.
Disabled/read-only/error/long-content states, sizes and controlled fixtures fill
meaningful gaps without changing any primitive. Stateless display families do
not acquire artificial loading, disabled or interaction props.
