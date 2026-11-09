# Template 4 Compatibility And Merge Handoff

## Baseline And Scope

- Fork: `daniyalsh1/BasisCore.Client.Component.Grid`.
- Upstream: `Manzoomeh/BasisCore.Client.Component.Grid`.
- Both remote default branches were `master` at
  `ede9f9a03aaf329c5e01d25d665fd1e53c88cfb1` when checked on 2026-11-08.
- Work branch: `codex/grid-template-dashboard`; requested local merge target: `master`.
- No push, upstream PR/MR creation, deployment or package publication is part of this change.

Previously the fork contained only an imported studio bundle. The native Template
4 TypeScript and scoped styles now live in this repository and build with the
existing Webpack/TypeScript toolchain. The studio shell remains a compiled demo
snapshot from the separate List Studio project; it is not the editable component
source and is not required by production grids. `build:demo` regenerates its grid
bundle from this repository, preserving the separate shell and asset manifest.

## What Is Independent

All original layout HTML, images and legacy CSS files remain byte-for-byte
unchanged. The default template, original Loader/ComponentLoader exports, legacy
filter placement, export implementation and rendering methods remain unchanged.
Template 4 is opt-in. Its DOM, header, guide, filter controls, mobile cards,
selection summary and styles are owned by `MaterialTemplate` and new files.

There are small shared hooks, so this is not 100% isolated code:

| Shared location | New behavior | Legacy path |
| --- | --- | --- |
| `Grid` constructor/render/source/progress/selection | Delegate to Template 4 only | Existing paths retained |
| `GridRow` | New rows, typed filters, null normalization, optional comparator | Guarded by Template 4 instance |
| `ProcessManager` | Advanced filter, combined query, copy before sorting | Guarded by `culture.template === 'template4'`; old in-place sort preserved |
| `PaginateProcessManager` | Keep an empty list on page 1 | Template-4-only guard |
| BasisCore component | Expose instance and dispose/reset new helpers | Cleanup is a no-op without Template 4 |
| Options | Add template/presentation/header/guide options | Existing fields/types retained; no default-template override |

Importing the library does not initialize Template 4 styles/helpers on a
legacy-only page. Creating a new template beside a legacy one is explicitly
tested for DOM/computed-style/state changes. Resetting the same native component
from Template 4 to templates 1/2/3 removes new markers/classes and closes its guide.

Unrelated earlier fixes were deliberately kept out of legacy paths: global
filter lookup was not changed; custom comparison and copy-sorting are new-template
only; the improved export error handling/default GET/URL cleanup lives inside
Template 4 instead of changing the legacy download method. The existing required
`IExportInfo.method` type is retained.

## Verification

- TypeScript checking and all original Webpack entry points build successfully.
- Production build includes the new standalone demo entry and passes cycle detection.
- `npm test`: gallery paths/asset hashes/BasisCore entry and guide validation.
- `npm run test:compat`: rebuilds the upstream baseline, checks unchanged legacy
  files and methods (72 original files and 24 methods), then compares normalized DOM, controls, computed styles,
  state and callbacks across templates 1/2/3, device 1/2, RTL/LTR, filter modes,
  selection, client/server/mixed paging, sort/filter, makers and empty/source updates.
  All 216 fixture scenarios passed in Chrome, including creating a Template 4
  instance beside the legacy grid without changing its sampled styles/state.
  The external LineIcons stylesheet is mocked; its live CSS/font effects are not
  part of these local DOM/style comparisons.
- `npm run test:template4`: native component lifecycle/reset, HTML header,
  desktop/mobile filters, radio/multi selection, operation menus, export
  success/failure, guide accessibility/isolation, mobile layout and bounds.

The browser parity suite uses deterministic local fixtures. Legacy direct-Grid
tests use a minimal BasisCore HTML utility; separate lifecycle/studio tests use
the real BasisCore component loader/data sources.
TypeScript declaration emission and `npm pack --dry-run --ignore-scripts` were
also checked; the npm package was not published. The original package-version
number remains unchanged for the upstream maintainer to choose at release time.

## Limits And Remaining Risk

### English/LTR Preview

The native English studio sample exercises `direction: 'ltr'` plus
`culture.labels` in desktop and mobile presentations. Guide controls and the
first-row example caption now accept that dictionary; Persian fallbacks remain
unchanged. Page-size digits follow the existing direction convention. The
English browser test covers local interaction and 390/320px mobile bounds,
not live backend contracts. Application column titles, HTML and data still need
their own translations; the component does not infer language from `guide.lid`.

### Legacy Refresh Selector

The Template 4 refresh button now preserves `div[data-bc-refresh-container] span`
for existing widget refresh functions, without changing those widgets or their
configurations. `panel-transfer.browser.cjs` compares the legacy click with the
visible button in client/server/mixed processing and desktop/mobile views:
one callback, identical payload/encoding, no control when disabled, and no form
submission on pointer/Enter/Space activation. This fixes the refresh selector
only; it does not establish compatibility with all legacy DOM selectors or row
lifecycle behavior.

### Semantic Action Guides

Template 4 supports opt-in HTML action markers without replacing widget
`cellMaker`/header HTML or invoking widget handlers. Action steps append to column
steps; a noninteractive, handler-free menu preview is owned and cleaned up by the
guide dialog. Existing live menus/selection remain untouched. Templates 1-3 do
not use this path. See [the authoring contract](guides/actions.md) and
`tests/template4/action-guide.browser.cjs` for desktop/mobile, permission-hidden
items, unchanged handlers/state, missing actions, Escape and disposal coverage.
The preview requires a menu already rendered inside the grid; external/lazy
portals and nested submenus are not supported. Ancestor-dependent widget CSS is
not guaranteed inside the dialog preview.

The combined library is larger even when only a legacy template is selected.
Measured production standalone minified output was about 151 KiB before versus
281 KiB after; gzip was about 39 KiB versus 63 KiB (roughly +25 KB compressed).
This is not unchanged download/parse cost. Splitting a separate optional bundle
would be a separate packaging decision; no asynchronous loading/API change was
introduced merely to hide this cost.

No zero-regression guarantee is claimed. Chrome and emulated phone viewports are
covered; physical phones, Safari/Firefox/older engines, live server/mixed API
behavior, remote autocomplete, backend contracts and every downstream widget
configuration have not been exhaustively tested. The legacy compatibility suite
does not attempt to repair pre-existing upstream bugs.

New UI uses modern CSS and browser APIs; legacy CSS remains unchanged. The guide
uses dialog/ResizeObserver/visualViewport. Popover menus have a fallback. Test
tooling adds Playwright only as a development dependency (Node 18+); production
dependencies and the TypeScript ES5 target remain unchanged. Existing upstream
Uglify/Webpack peer/deprecation and bundle-size warnings are disclosed, not removed.

Before broad migration, review the unsupported Template 4 contracts listed in
[template4.md](template4.md). Existing templates do not need config changes.
The compiled studio shell has its own demo/font assets; production users need
only the grid library and their options, not that dashboard.
