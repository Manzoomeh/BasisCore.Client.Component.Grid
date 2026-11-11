# Grid Examples Dashboard

The root dashboard previews templates 1, 2 and 3 in their original sample pages;
the Template 4 card opens `/component/configuration/mobileDesign/template4.html`
on the same server. `/examples.html` preserves all 31 original examples.
No original sample configuration or rendering path is rewritten.

The current edition is Template 4 core, without Guide. The gallery/version badge
and studio identify the package version. The studio offers desktop/mobile,
Persian/English, filters, sorting, paging, radio/checkbox selection, trusted HTML
actions, JSON editing/import/export and a classic comparison.

Its editable source is in `demo/template4`, a private build package. Install
`npm --prefix demo/template4 ci`, then run `npm run build:demo` at the repo root.
The library build remains independent (`npm run build`). The demo's own
Zod/Vite/Tailwind dependencies are not component runtime dependencies.

The studio always mounts native `component.grid.grid` commands, uses the local
component repository and BasisCore data sources. It does not instantiate an
alternative table engine. The same native Template 4 source is used by standard
component/standalone exports and the studio bundle.

The manifest in `wwwroot/template4/manifest.json` records version, edition,
relative source paths and SHA-256 hashes of served assets. Rebuilding removes
only obsolete assets listed in the previous manifest, not other local snapshots.
No separate server, proxy, port 18474 or external source checkout is needed.

Core browser storage is isolated from the full snapshot. If only old studio data
exists, its rows/settings are read into the core schema without mutating the
original key. New writes go to `basiscore-grid-template4-core-datasets-v1`;
unsupported tutorial metadata is not exposed by the core JSON editor.

The favicon and shared LineIcons font remain local; the live page also uses
BasisPanel-hosted icon CSS and the existing font fallbacks. Test fixtures cache
that stylesheet and block live API/CDN requests. Airline cells share one sample
plane icon, not separate logo images. See `docs/releases.md` for the full-version
backup and publication policy, and `docs/template4.md` for migration limitations.
