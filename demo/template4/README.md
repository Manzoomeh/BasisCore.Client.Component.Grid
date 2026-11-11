# Template 4 Core Studio

Editable source for the same-server review dashboard. This private package only
builds the shell; it never bundles or mounts another grid implementation.
`src/basis.ts` creates `component.grid.grid` commands and BasisCore sources.
Type-only imports reference the actual component source; Vite erases them.

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

Version comes from root `package.json`. This core edition has no tutorial
schema/runtime/UI. Its browser storage is separate from the archived full
edition. Read `docs/releases.md` before preparing the later Guide release.
