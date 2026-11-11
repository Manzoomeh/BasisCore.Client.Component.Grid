# BasisCore Grid

## Template 4 + Guide: 1.6.0-rc.1

This additive release candidate builds on Template 4 Core `1.5.0-rc.1`
(`30e0aae`). It retains desktop/mobile, Persian/RTL, English/LTR and the native
comparison studio, and adds opt-in guided tours for columns and HTML actions.
The Guide candidate is now on `master`, prepared on `basisfly/template4-guide`.
Core is preserved separately on `basisfly/template4-core`. The original full snapshot remains untouched at
`basisfly/template4-with-guide` (`ada5e1f`). See [release versions](docs/releases.md).

The implementation is native BasisCore/TypeScript, with no React runtime.
The default remains `template1`; templates 1, 2 and 3 remain available with
their original rendering paths and assets. Template 4 is not a universal
drop-in replacement for all legacy options; read the [migration limits](docs/template4.md#migration-limits).

```html
<basis core="component.grid.grid" run="atclient"
  datamembername="sample.rows" options="options"></basis>
```

Register `dist/basiscore.grid.component.js` and opt in using the existing options:

```js
const options = {
  columns: {name: {title: 'Name'}, city: {title: 'City'}},
  culture: {deviceId: 1, template: 'template4', labels: {}},
  process: 'client', direction: 'rtl', filter: 'row',
  paging: [10, 30, 50], selectable: 'multi', selectAll: true,
  presentation: {view: 'table', search: true}, // Use 'mobile' for vertical cards.
  selectedSourceId: 'sample.selected', refreshSourceId: 'sample.refresh',
};
```

The standalone entry remains `dist/basiscore.grid.js`. The studio entry combines
the native exports from `src/StudioLoader.ts`; it is not a second grid engine.
Public declarations are emitted to `dist/types` by the production build.

## Opt-In Guide

The Guide runtime is included in this edition, but no tour or help button is
initialized without `guide: true` or a valid object and configured steps.
`guide: false`, omission, or an empty tour keeps the button hidden. Existing
Core configurations need no Guide fields and keep their normal grid behavior.

```js
options.guide = {schemaVersion: 2, id: 1001, lid: 2, revision: 1, title: 'Routes guide'};
options.columns.name.guide = {
  status: 'active', id: 'route-name', priority: 10,
  description: 'Check this route name before editing.',
};
```

Column guidance highlights its header through the first visible row's value.
Global steps can target list/page controls; action steps use semantic HTML
markers without replacing `cellMaker` or real handlers. Action menus are
previewed inertly: the tour never invokes edit/delete or selects rows for you.
See the [Guide JSON contract](docs/guides/flight-routes.md) and
[HTML action integration](docs/guides/actions.md) for complete examples.

## Build And Verify

Use Node 22. Install the private studio dependencies separately; they are not
added to the component's production dependencies. Both installs have lockfiles.

```sh
npm ci --legacy-peer-deps
npm --prefix demo/template4 ci
npm run build:demo
npm test
npm run dev -- --host 127.0.0.1 --port 18477 --no-open
```

In a second terminal, with that server running:

```sh
npm run test:release
```

The release check runs component/studio type checks, studio unit tests, 216
legacy comparisons, a fresh production build, artifact/version assertions and
all grid/Guide browser suites. `GRID_STUDIO_URL` overrides the preview URL.
Chrome is the default test engine. Alternatively install Playwright Chromium
and set `BROWSER_CHANNEL=chromium`.

The root dashboard compares the templates. Open
`/component/configuration/mobileDesign/template4.html` for the full studio,
including **فارسی / English**, desktop/mobile, row filters, radio/checkbox
selection, HTML actions, paging and classic comparison.

The editable shell lives in `demo/template4`; `build:demo` rebuilds and copies
only its generated assets and the native component into `wwwroot`. There is no
runtime dependency on another local project or port. Tests use deterministic
local data, cached LineIcons CSS and the bundled icon font, not live APIs/CDNs.
Actual host styles and live backend contracts still require downstream testing.

See [Template 4 configuration](docs/template4.md),
[English configuration](docs/template4-english.md),
[compatibility](docs/template4-compatibility.md) and
[the dashboard](wwwroot/dashboard/README.md).
