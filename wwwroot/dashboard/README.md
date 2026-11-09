# Grid Examples Dashboard

The dashboard at `/` is plain HTML, CSS and JavaScript. Its first three template links
open the existing sample pages inside an iframe; they do not mount or configure
a second grid implementation. `/examples.html` preserves the original catalog.

The original templates' sample HTML, BasisCore script URLs, grid options and
data sources stay unchanged. The native library now includes the opt-in Template 4
implementation; its styles do not restyle the old previews. Viewport controls
resize the iframe without reloading it. Browser history selects samples, and
reload explicitly recreates the current sample frame.

From the repository root:

```sh
npm ci --legacy-peer-deps
npm run build:demo
npm run dev -- --host 127.0.0.1 --port 18477 --no-open
node tests/dashboard.test.mjs
```

Examples retain their existing external dependencies and placeholder data.
The Template 4 card opens `/component/configuration/mobileDesign/template4.html`
on the same server as the catalog, as the full studio rather than a nested iframe.
The studio shell assets from port 18474 are checked in locally: no redirect,
proxy, separate server, or runtime connection to port 18474 is needed.
`wwwroot/template4/manifest.json` records their provenance and SHA-256 hashes.
Its grids use BasisCore `component.grid.grid` commands, the local component
repository, and BasisCore data sources; the dashboard does not instantiate Grid
directly. Original template assets/rendering paths remain unchanged. The native
component is now built from `src/StudioLoader.ts` in this repository with the
same implementation included in the standard library entry points. `npm run
build:demo` refreshes its checked-in bundle and hash. The studio shell itself
remains a compiled snapshot, not editable source for the component. External
font dependencies of the shell are preserved; the native stylesheet imports no
remote fonts.
The favicon comes from the existing local studio. Interface icons use the
BasisPanel-hosted LineIcons stylesheet and the locally bundled LineIcons font.

Template 4's static assets were refreshed from the List Studio on port 18474.
The mobile filter selector offers simple, row and none; row opens typed column
filters, while the desktop filter configuration remains intact. Template 4 is
still a presentation of the native BasisCore grid. The shared library now accepts
`culture.template: 'template4'`; this does not replace templates 1–3 or register
a separate mobile Template 5.

The second gallery card inside Template 4 now demonstrates native
`selectable: 'single'` radio selection. The standard/selected-table cards retain
`selectable: 'multi'` checkboxes. This preset does not rewrite saved dataset JSON.
The flight-route sample uses one shared plane icon for airline cells; it does
not bundle a separate image for every airline. The manifest's `resources` array
records shared assets such as the locally bundled LineIcons font.

The flight-route sample's three-dot menu is custom HTML in the native
`columns.operation.cellMaker`; its tutorial lives in `columns.operation.guide.steps`.
The studio dataset uses `operationGuide` only as an adapter field and passes it
unchanged to that native column. It is not a new top-level Grid option.
Column/step `priority` orders all tutorial steps (smaller first, default 1000).
The editable shell source/build are recorded in `wwwroot/template4/manifest.json`.
Updating the stock saved tour preserves rows/settings and does not replace
customized guides; “restore sample” explicitly restores the new stock sample.

The preview header includes **فارسی / English** for the flight-route samples.
English uses `direction: 'ltr'` and the existing `culture.labels` configuration,
including HTML action captions and guide controls. Desktop/table and mobile
share that configuration. Switching language changes the sample source, keeps
presentation controls and never overwrites saved Persian rows. The shell stays
Persian. See `docs/template4-english.md` for the reusable configuration and tests.
