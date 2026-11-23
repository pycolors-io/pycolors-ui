# Maintaining the public Storybook catalog

Issues #417 and #418 implement the public catalog and browser quality contract
of #416. The owner approved the coherent Vitest 4 alignment in
[#418](https://github.com/pycolors-io/pycolors/issues/418#issuecomment-5720204149).
The owner subsequently authorized the targeted token/Toast contrast repairs in
[this follow-up](https://github.com/pycolors-io/pycolors/issues/418#issuecomment-5721531487).
Those public corrections have real patch Changesets; private Pro, infrastructure
and MCP remain outside this contract.

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

The **Code example** disclosure below component and composition previews contains
complete React/TypeScript consumer code with public package imports. The
repository-owned example catalog covers all 22 public component families;
compositions provide their code through `parameters.docs.source.code`. Keep the
snippet aligned with its rendered state and public API. **Copy example** uses the
clipboard when available and otherwise selects the code for manual copying.
The linked Fumadocs guide remains canonical; this disclosure does not install
Autodocs or another documentation library.

Navigation is Foundations, Components (Forms, Feedback, Overlays, Navigation,
Data display, Layout), then Compositions. Default precedes named states. The
legacy UI group is last. Foundations use existing semantic tokens and utility
styles; compositions are bounded synthetic teaching fixtures, not product APIs.
The built-in development "Get started" checklist is disabled with Storybook's
`sidebarOnboardingChecklist` feature; Overview is the Explorer's entry point.

`foundations-overview--default` is the first entry for new visitors. Its editorial
layout combines six component-family links, compact installation guidance and
semantic-token resources. Its links target the manager so navigation also works
from the preview iframe. The manager hides
the addon panel only on this overview and retains the visitor's preference for
component stories. Existing story IDs remain unchanged. The compact PyColors
lockup and neutral manager surfaces support the system light/dark preference;
preview themes remain independently selectable. Its transparent 17px symbol and
Geist wordmark match the site header; the logo returns to the Explorer home.
The **UI Explorer** toolbar disclosure presents Docs, Install, PyColors UI and
Starter Free as labelled resource links with short descriptions. Docs follows
the selected component family. At widths of 360px or less, the visible label is
**UI**; its accessible name remains **UI Explorer**.

The overview masthead identifies **PyColors UI / Component explorer** and the
component package's MIT license. Three starting paths lead to Components
(`components-button--default`), Appearance (`foundations-tokens--appearance`)
and Compositions (`compositions-settings-form--default`).

Its technical proof points describe the existing React/TypeScript components,
Radix-backed interactions and shared light/dark tokens. The local workspace form
remains interactive, with a link to
`compositions-settings-form--validation-error` for inspecting validation feedback.

Overview's shell carries one continuous full-page gradient with a progressive
fade, inspired by the public marketing home. The hero shares this background
without a separate local gradient.
The form retains its **UI preview** frame and a short diagonal divider introduces
the three paths. These decorative layers adapt to accessibility preferences;
component canvases retain their existing token styling.

Internal stories use a lighter workbench background around a plain preview
surface. Its non-interactive header identifies the category, family and selected
state; the canvas bar identifies the preview theme. The named `main` still
contains the story directly, preserving component keyboard order and portal
behavior. Overview and Docs mode keep their own presentation; public component
styles and root tokens are unchanged.

Dialog and Sheet stories start closed and open from their visible triggers.
Their scripted interaction paths run only when test projects enable
`runOverlayInteractions`; public visits leave this flag off.

Component and Settings form `play` paths use `runStoryInteractions`, which defaults to
`false` publicly and is enabled by the browser test projects. Together with the
dedicated Overview, Appearance and Overlay flags, this keeps scripted typing,
clicking and focus movement in the opt-in test runs. Named states render directly
from their props or initial state, so public visitors can inspect them without
running an interaction script.

Three additional local compositions provide eight stable stories alongside the
existing Settings form. They use synthetic data and public primitives, with no
backend, email sending or persisted notification settings:

| Composition              | Stable story IDs                                                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Team invitation          | `compositions-team-invitation--default`, `compositions-team-invitation--validation-error`, `compositions-team-invitation--local-success` |
| Filtered list            | `compositions-filtered-list--default`, `compositions-filtered-list--empty-results`, `compositions-filtered-list--second-page`            |
| Notification preferences | `compositions-notification-preferences--default`, `compositions-notification-preferences--saved`                                         |

The maintenance footer links to `foundations-maintenance--default`. Its version,
React/React DOM peer ranges and license are injected at build time from the public
UI package manifest, and its release history comes from `packages/ui/CHANGELOG.md`.
The build requires an entry matching the package version. Declared peer ranges
are package metadata, not evidence that every matching runtime combination was
tested; keep the separately verified consumer setup documented in Fumadocs.

Reach the toolbar with Tab and use its arrow-key navigation to select
**UI Explorer**. Enter or Space opens the resources and focuses Docs. Tab and
Shift+Tab move through the links; Escape closes the disclosure and returns focus
to its trigger. Shift+Tab from Docs also returns to the trigger; Tab from the
last resource closes the disclosure and continues the native tab order. Clicking
outside closes it without taking focus away from the chosen control. Each
resource opens in a new tab, announced in its accessible description.

The checked-in font and its OFL license are copied from the site's public assets
and verified for drift during public preflight. The home includes a small public
Input/Checkbox/Button composition: edits, save feedback and reset stay local to
the preview. No backend or persistent storage is connected.
Its scripted form checks run only when `runOverviewInteractions` is enabled by
the Vitest project's initial globals. The public preview leaves it off so opening
the welcome page does not type into fields, move focus or scroll past the hero.
The browser setup asserts this global is enabled for Overview tests, preserving
the existing form-interaction coverage in every selected matrix case.
The token gallery pairs every
surface with its actual semantic foreground rather than hardcoded sample colors.

`foundations-tokens--appearance` demonstrates the shared palette and radius
choices using `nativePalettes`, `nativePaletteOptions` and
`nativeRadiusPreferences` from `@pycolors/tokens/native`. This framework-independent
public ESM data is generated from `config/appearance-presets.json`; no Starter Pro
source or copied preset constants are imported. Changes apply only to the local
demonstration, preserving the published token defaults and the surrounding
Explorer. Starter Pro's Signature and Classic compositions remain app-owned.
The test projects enable `runAppearanceInteractions` to exercise every palette,
radius extremes and local save feedback; public visits leave this flag off.

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
exception is removed: the preview has a named `main` landmark. A failure must be
repaired or reported; do not set
`off`, `todo`, disable a rule globally, remove a canonical tag or close an overlay
to conceal it. Any future justified local exception needs the rule, exact story,
reason, accountable owner, issue reference and removal condition/date in this guide.

### Local axe exception ledger

- Rule: `aria-hidden-focus`, only `components-dropdown-menu--default` and
  `components-dropdown-menu--controlled`, including their theme/viewport executions.
- Scope: the rule selector excludes only hidden background subtrees marked
  `data-aria-hidden="true"` by Radix. The rule still scans hidden content inside the
  menu; no rule is disabled globally or at component meta level.
- Reason: installed Radix Menu 2.1.17 hides the background and traps focus while
  open. axe-core 4.12.0 recognizes modal dialogs/large overlays, but not this menu
  focus trap. Its static background check flags the unreachable trigger. The
  stories assert Tab, Shift+Tab and forced programmatic focus containment; Default
  also checks Escape and focus return, then reopens for the scan.
- Owner: UI/QA maintainers. Tracking: [#418](https://github.com/pycolors-io/pycolors/issues/418).
  Review/remove by **2026-10-17**, or sooner when the Radix/axe integration changes
  or axe correctly recognizes this focus trap. Retest with the original selector
  before removal; remove immediately if the justification no longer holds.
- Evidence: temporarily disabling modality fails the focus assertion; temporarily
  inserting a focusable button under `aria-hidden` inside the open menu still
  fails the official rule. Both mutations were restored before the full runs.
  The exact-version investigation is in the validation record linked below.

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
for measured runs, controlled failure probes and the scoped contrast repairs.

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

## Public UI Explorer artifact

Issue #419 provides the root-level public hosting entry point:

```bash
pnpm build:ui-explorer --repeat
pnpm check:ui-explorer
pnpm test:ui-explorer
python3 -m http.server 6006 --bind 127.0.0.1 --directory packages/ui/storybook-static
```

Open `http://127.0.0.1:6006/` or a stable `?path=/story/<id>` URL.
`--repeat` builds twice in fresh temporary directories and compares every output
filename and SHA-256 hash. Omit it for a single local build. `check:ui-explorer`
requires the installed Chromium runtime above; it serves the artifact on a random
loopback port and checks manager/iframe URLs, bundled assets, real interactions,
resource links, light/dark, desktop/mobile and legacy IDs. Browser, request and
artifact failures fail the command. `test:ui-explorer` exercises the rejection
paths without a browser. Required CI runs all three checks without conditional
skips. The ordinary package `build-storybook` remains the development build;
**use the root public command for the hosting handoff**.

These root script names implement the proposed public/private entry-point split
in #416 without changing the published package manifest for internal tooling.
No private build exists yet. The output is always
`packages/ui/storybook-static/`, relative to the monorepo root, and stays ignored
by Git. A failure removes the output so stale artifacts cannot look deployable.

The public build admits only the explicitly reviewed Storybook config, immediate
Foundations/Components/Compositions stories, compatibility story, shared synthetic
helpers and public UI source. Every local source import (including literal dynamic
imports and re-exports) must resolve into those inputs. Variable imports,
unreviewed aliases and environment access fail. Symlinks in inputs fail; the Vite
plugin checks resolved real paths before tree shaking, including dependency
imports. CSS auto-discovery is disabled and its two public scan roots are checked.
Only the reviewed PyColors favicon, transparent symbol, Geist font and its license
are admitted by `staticDirs`.

The command copies these inputs, the public UI package manifest and changelog,
the public token CSS and the framework-independent
`native.js` data module with its types and package manifest into a fresh tree with
no applications, core packages, Pro code or dotenv files, shares the frozen registry
dependency store, and supplies a minimal non-secret process environment. It is a
build-input boundary, **not an operating-system sandbox for malicious dependency
code**: pinned packages, build configuration and Node are trusted and still need
normal dependency/code review. Arbitrary secret detection is not claimed. Narrow
credential/path/URL signatures supplement the structural boundary. Never place
private code, data or credentials inside an approved public source file.
The resolved token import boundary admits exactly `tokens.css` and `native.js`,
including verification of their real paths; sibling files and symlink escapes
remain prohibited.

Output inspection compares all generated story IDs to source exports (including
legacy IDs), checks local entry assets, rejects source maps, extra HTML/JSON
manifests and unexpected file types, and scans text artifacts. Storybook telemetry,
project metadata and component manifests are disabled. Both HTML entries have the
exact `noindex, follow` directive, no canonical and the PyColors UI Explorer title.
No sitemap or crawler-blocking robots file is generated. Fumadocs owns indexable
documentation and canonical SEO.

The manager uses the repository-owned mark and system light/dark appearance.
Its toolbar links to the selected family's Fumadocs page, installation guide and
UI product page. The preview theme remains independently selectable. The pinned
Storybook manager hardcodes its browser-title suffix; a title-only observer keeps
that suffix branded when navigating. The public builder normalizes the two
initial HTML titles; all other files must be byte-identical across repeated builds.
Recheck this behavior on Storybook upgrades.

This is a locally validated, root-hosted static artifact, not a deployed service.
Human-only #420 owns the Vercel project, output-directory setting, deployment
protection decision, DNS and domain; none is configured here. Production Marketing
navigation must wait for that verified hosting handoff. No Pro source, entitlement
flow, access boundary or credential-bearing URL belongs in this public artifact.
