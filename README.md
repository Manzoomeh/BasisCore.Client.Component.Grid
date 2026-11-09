# BasisCore Grid

This fork adds the opt-in `template4` renderer to BasisCore Grid 1.4.2, based on
upstream commit `ede9f9a03aaf329c5e01d25d665fd1e53c88cfb1`. The default remains
`template1`. Templates 1, 2 and 3 retain their original rendering paths and assets.

The implementation is native BasisCore/TypeScript. No React runtime or dependency
is introduced. A page continues to use its existing component command:

```html
<basis core="component.grid.grid" run="atclient"
  datamembername="sample.rows" options="options"></basis>
```

Register `dist/basiscore.grid.component.js` as the component library and opt in:

```js
const options = {
  columns: {name: {title: 'Name'}, city: {title: 'City'}},
  culture: {deviceId: 1, template: 'template4', labels: {}},
  process: 'client', direction: 'rtl', filter: 'row',
  paging: [10, 30, 50], selectable: 'multi', selectAll: true,
  presentation: {view: 'table', search: true},
  selectedSourceId: 'sample.selected',
  refreshSourceId: 'sample.refresh',
};
```

`dist/basiscore.grid.js` retains the standalone `grid.Grid` entry point.
`dist/basiscore-grid/basiscore.grid.js` combines the two original exports for the
demo studio; it is built from the same component source, not a second grid engine.

## Build And Check

Use Node 18+ for browser tests (verified with Node 22). The existing upstream
Uglify/Webpack peer conflict requires `--legacy-peer-deps`; production dependencies
and versions are not upgraded by this change.

```sh
npm ci --legacy-peer-deps
npm run typecheck
npm run build
npm run build:demo
npm test
npm run test:compat
```

The compatibility runner builds the upstream commit from the local Git history,
checks unchanged legacy files/methods, then compares both builds in a browser.
It needs Git, tar and Chrome. Alternatively install Playwright Chromium with
`npx playwright install chromium` and set `BROWSER_CHANNEL=chromium`.

For the full studio and native component checks, start a separate terminal:

```sh
npm run dev -- --host 127.0.0.1 --port 18477 --no-open
npm run test:template4
```

The studio is at `/component/configuration/mobileDesign/template4.html` on that
server. `GRID_STUDIO_URL` overrides its URL for browser tests.
The Template 4 studio offers **فارسی / English** for the flight-route sample in
desktop and mobile views. See the [English/LTR configuration](docs/template4-english.md).

## HTML Action Guides

Set top-level `guide: true` or a guide object to enable configured tutorial steps.
Missing/`false`, or a tour with no steps, shows no guide button. No synthetic
guide ID is assigned when using the boolean switch.

Keep your existing `operation.title`, `cellMaker` HTML and action handlers.
Add semantic `data-grid-actions`, `data-grid-action-trigger`,
`data-grid-action-menu` and `data-grid-action` markers, then reference actions as
`list.row.action.edit` or `list.bulk.action.delete` in
`columns.operation.guide.steps` (existing `options.guide.steps` also works).
Use `priority` on column guides or individual steps to order the combined tour;
smaller numbers run first, with a stable default of `1000`. Global list/page steps
and multi-step column explanations can coexist.
The guide shows a read-only menu preview; it never invokes action handlers.
See the complete [action-guide contract and examples (Persian)](docs/guides/actions.md)
and the [runnable desktop/mobile example](wwwroot/component/configuration/mobileDesign/action-guides.html).

See [Template 4](docs/template4.md), the
[compatibility report](docs/template4-compatibility.md), and the
[example gallery](wwwroot/dashboard/README.md).
