# Maintaining the public Storybook catalog

Issues #417 and #418 implement the public catalog and browser quality contract
of #416. The owner approved the coherent Vitest 4 alignment in
[#418](https://github.com/pycolors-io/pycolors/issues/418#issuecomment-5720204149).
This does not authorize private Pro, infrastructure, MCP or public behavior changes.

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
controlled value without its state handler. Use awaited `play` functions from
`storybook/test` for meaningful browser behavior; Autodocs remains separate work.

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
The separate `test:storybook` project executes browser/play/a11y checks. A static
build alone is not browser or assistive-technology evidence.
Review both themes, representative desktop/mobile widths and interactive states.
If usage changes, update the matching Fumadocs page and its docs typecheck.

Stories/fixtures are not npm package API and require no release by themselves.
Public component changes require their real release classification/Changeset,
package tests and docs. The package tree is publicly mirrored: no proprietary
source, private stories, credentials, customer data or Pro showcases belong here.
#422/#423 own future premium boundaries; #424 owns the optional agent pilot.

## Browser prerequisites and commands

Use the root Node 24 and pnpm 10.32.1 toolchain. Install dependencies and the
versioned Playwright Chromium runtime explicitly, before running tests:

```bash
pnpm install --frozen-lockfile
pnpm --filter @pycolors/ui test:storybook:install
pnpm --filter @pycolors/ui test:storybook
```

On Linux CI, install the browser's system libraries as well:

```bash
pnpm --filter @pycolors/ui exec playwright install --with-deps chromium
```

The install command may require network/system package privileges. Test execution
never downloads a browser implicitly and never skips tests when one is missing.
No deployed Storybook, account, backend, environment secret or pixel baseline is
required. Keep the browser binary/cache and generated `storybook-static` out of Git.

Target a story while diagnosing a failure (the test name is its Storybook label):

```bash
pnpm --filter @pycolors/ui test:storybook --project=storybook-light-desktop-1280x800 stories/components/checkbox.stories.tsx -t Default
```

For interactive diagnosis, run `pnpm --filter @pycolors/ui storybook`, select the
story and inspect/replay its Interactions panel and Accessibility results. The
Vitest addon runs the canonical light/desktop selection from the Storybook test
widget; enable its Accessibility checkbox to include those UI results (the CLI
always runs them). Its official child-process flag selects the isolated browser config
through `vitest.config.ts`; ordinary unit runs retain the existing jsdom setup.
The headless CLI remains
the authority for the complete four-project matrix; changing a toolbar by itself
is not proof that the matrix ran. CLI failures include a local Storybook debug URL.

## Selection and evidence

| Project                            | Selection                                        | Actual browser viewport |
| ---------------------------------- | ------------------------------------------------ | ----------------------- |
| `storybook-light-desktop-1280x800` | Every canonical story via the default `test` tag | 1280 × 800              |
| `storybook-dark-desktop-1280x800`  | `theme` stories                                  | 1280 × 800              |
| `storybook-light-mobile-390x844`   | `responsive` stories                             | 390 × 844               |
| `storybook-dark-mobile-390x844`    | `responsive` stories                             | 390 × 844               |

The Storybook glob discovers the catalog; never maintain a count-based allowlist.
Every family Default and meaningful disabled/error/feedback/overlay/token state
has `theme`. Forms, overlays, tables/pagination, long content and compositions
carry `responsive` as well as `theme`. Meta tags apply to all stories in that
module. The catalog contract test rejects canonical opt-outs, missing Default
coverage and `responsive` without `theme`. Add meaningful states as the real public
API evolves; never invent artificial states for stateless display primitives.

The `legacy` tag excludes only the compatibility module from redundant browser
execution. Every alias shares its canonical render and its mapping is checked by
the existing migration test; all old IDs remain in the static build. Vitest may
report a project/file as skipped when none of its stories matches the theme/mobile
selection. No canonical story may be skipped in the light desktop project.

Each test reuses preview styles, decorators and globals. The setup deliberately
starts in the opposite theme, then verifies the selected mode, four semantic
variables derived from `packages/tokens/tokens.css`, actual body styles and visible
content. Each viewport is applied through the official addon and independently
asserted through `window.innerWidth/innerHeight`. Page overflow fails; intentional
inner scrolling is allowed, and visible controls must fit the viewport after
scrolling them into view. These checks are not pixel comparisons or proof of every
possible layout, zoom level or contrast combination.

`play` steps use accessible names/roles, real browser DOM and awaited actions.
Portal queries use `document.body`. Dialog/Sheet/menu/Toast stories finish open so
the official a11y scan sees their content. The form has separate success and
validation-error endings. Component unit tests remain in jsdom, metadata tests in
Node, and their mocks/setup never enter the browser project. Storybook owns fixture
unmounting; browser setup resets the theme after each test.

The official addon-a11y hook uses `a11y.test: "error"`. The former global `region`
exception is removed: the preview has a named `main` landmark. **No rule exceptions
are currently configured.** A failure must be repaired or reported; do not set
`off`, `todo`, disable a rule globally, remove a canonical tag or close an overlay
to conceal it. Any future justified local exception needs the rule, exact story,
reason, accountable owner, issue reference and removal condition/date in this guide.

`verify` includes the browser suite. Required `CI / validate` separately installs
Chromium and runs `test:storybook` after root unit tests, before the build. Root
Turbo `test` does not call UI `verify`, so this direct step is necessary and does
not duplicate browser execution. It has no conditional skip, retries or
`continue-on-error`; a cached root task cannot replace it.

For failures, first reproduce the exact project/file/story, then read the `play`
step, axe rule or `render/`, `theme/`, `viewport/` assertion. Confirm the installed
runtime and frozen lockfile before changing a dependency. Run the full matrix twice
from fresh CLI/browser processes after a correction, and check the current PR HEAD
and latest policy. Pending, skipped, cancelled or absent required checks are not
success. See the [#418 validation record](../../../docs/internal/storybook-quality-validation.md)
for measured runs, controlled failure probes and unresolved findings.

Automated Chromium/axe checks do not certify WCAG conformance or replace a human
keyboard, screen-reader, 200% zoom, 320 CSS-pixel reflow, reduced-motion and visual
review in both themes. Other browser engines and production hosting are outside
this test contract.

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
