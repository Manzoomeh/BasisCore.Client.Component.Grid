# Template 4 + Guide Compatibility

## Baseline And Editions

- Upstream baseline: `ede9f9a03aaf329c5e01d25d665fd1e53c88cfb1`, version 1.4.2.
- Core on `basisfly/template4-core`: `1.5.0-rc.1` at `30e0aae`, without Guide.
- Additive Guide candidate on `master`: `1.6.0-rc.1`, prepared on
  `basisfly/template4-guide` and based on that Core commit. No changes to the
  processing managers or legacy templates.
- Full experimental snapshot: branch `basisfly/template4-with-guide`, commit
  `ada5e1f`. Its historical 1.4.2 package number is not a new published release.
- No push, package publication or upstream PR is performed by the release check.

The native TypeScript, scoped styles and editable private studio are all in this
repository. `build:demo` rebuilds the component and shell and updates the local
asset hashes/version. The studio uses native `component.grid.grid` commands,
not a separate implementation or a React renderer.

## Isolation

All original layout HTML, images and legacy CSS remain unchanged. Defaults still
select `template1`; templates 1-3 keep their original rendering paths. Template 4
owns its new DOM, header, filters, mobile cards and styles. This candidate adds
Guide code/types/styles and samples; activation requires an explicit root
`guide` switch and configured steps. Omission/false initializes no Guide instance.

| Shared location | Template 4 behavior | Legacy behavior |
| --- | --- | --- |
| Grid hooks | Delegate rendering/source/progress/selection | Existing paths retained |
| GridRow | Native rows, typed filters, optional comparator | Guarded by Template 4 |
| ProcessManager | Advanced filters, query, copy before sorting | Original behavior retained |
| PaginateProcessManager | Empty list stays on page 1 | New guard only |
| BasisCore component | Instance exposure and reset/disposal | No Template 4 helpers on old grids |
| Options | Template/presentation/header options | Existing fields/types retained |

Legacy-only pages do not initialize the new stylesheet. The parity test mounts
Template 4 beside old instances and compares sampled DOM/styles/state. Native
reset tests switch between Template 4 and every old template/device combination.
This demonstrates preservation of the tested old paths, **not** drop-in
compatibility when arbitrary old widgets switch to Template 4.

## Checks

- Type checking for the library and the private studio, including actual native
  option/state types rather than a copied component implementation.
- Production Webpack entry points and declarations, cycle detection, package
  and lockfile version equality, manifest hashes and version banners.
- Artifact assertions verify Guide runtime/styles/options in every shipped
  component bundle and the public declarations, with synchronized version identity.
- 216 legacy comparisons against a freshly built baseline; 72 original files
  and 24 Grid methods are checked unchanged before browser comparisons.
- Core browser suites: real BasisCore mount/reset, header HTML, filter modes,
  English/LTR, mobile bounds/touch, radio/multi selection, HTML menus, native
  refresh selectors, server/mix callback fixtures and export success/failure.
- Guide suites cover schema validation, priorities, switches, column geometry,
  action-menu previews, safe text, keyboard/focus, missing/external targets and
  disposal. They assert that tutorials do not execute handlers or change data.
- Edition tests preserve both Core and archived full-version browser keys.
  Guide changes are saved only to `basiscore-grid-template4-guide-datasets-v1`.

`npm run test:release` rebuilds and runs these checks. Browser tests serve the
checked-in production demo bundle, cache the BasisPanel icon stylesheet and
font, and block unexpected external requests. The legacy parity comparison
mocks external icon CSS. Physical devices, live fonts/CDNs, Safari/Firefox and
backend behavior are not certified by these local tests.

## Migration Limits

Changing only `culture.template` is not sufficient for every widget. Existing
limitations remain: remote autocomplete/link options, remote select payloads
(`{id,value}` versus plain values), debounce and combined server search,
`editMode`, `widthCard`/legacy mode buttons, custom loaders, implicit columns,
legacy mobile slot mappings and arbitrary external DOM/lifecycle dependencies.
Use templates 1-3 for unsupported workflows; see [configuration](template4.md).

The legacy refresh pattern `div[data-bc-refresh-container] span` is explicitly
preserved and tested in desktop/mobile and client/server/mix configurations.
That fix does not promise compatibility with all other widget selectors.

HTML header/cell callbacks are trusted application code, not an HTML sanitizer.
The JSON studio escapes content before generating HTML. Current new-template
menus use Popover where supported, with a fallback; legacy CSS is unchanged.
Shared downloads/bundle size and modern browser APIs remain release concerns.
Existing upstream Webpack/Uglify deprecation/size warnings have not been hidden.
