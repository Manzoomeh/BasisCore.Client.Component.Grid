# Template 4 + Guide Studio

Editable source for the same-server review dashboard. This private package only
builds the shell; it never bundles or mounts another grid implementation.
`src/basis.ts` creates `component.grid.grid` commands and BasisCore sources.
Type-only imports reference the actual component source; Vite erases them.
Guide JSON validation imports the actual component's `GuideConfig`, not a
forked implementation. `operationGuide` is a demo adapter field mapped unchanged
to the native `columns.operation.guide`; root `guide` and column guides are
also forwarded unchanged. `guideTargets['page.create']` demonstrates a target
outside the grid. See `docs/guides/actions.md` for application integration.

```sh
# From the repository root:
npm --prefix demo/template4 ci
npm --prefix demo/template4 run typecheck
npm --prefix demo/template4 test
npm run build:demo
npm run dev -- --host 127.0.0.1 --port 18477 --no-open
```

Do not serve this package's `dist` alone: the root build assembles its shell,
BasisCore runtime, locally built component, favicon and font under `wwwroot`.
Do not run the former external studio's vendor build to update this component.

Version comes from root `package.json`. Writes use
`basiscore-grid-template4-guide-datasets-v1`; the archived
`material-list-studio-datasets` key is a read-only fallback. Core's
`basiscore-grid-template4-core-datasets-v1` is never read or overwritten.
Only known unchanged built-in old tours are upgraded on import; custom guides,
rows and settings remain intact. Read `docs/releases.md` before publishing.
