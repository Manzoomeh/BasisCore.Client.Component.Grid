# Release Editions And Versioning

## Current Review Candidate

| Branch | Edition | Package version | State |
| --- | --- | --- | --- |
| `master` | Template 4 core, without Guide | `1.5.0-rc.1` | Local candidate for review |
| `basisfly/template4-with-guide` | Full Template 4 + Guide snapshot | historical `1.4.2` | Backup at `ada5e1f`, not a publishable new release |
| `basisfly/template4-upstream` | Earlier full-feature PR preparation | historical `1.4.2` | Preserved, not used for the core PR |

The backup branch points to exactly the complete tracked state before the split.
It preserves Persian/English desktop/mobile, tutorials, docs, tests and served
studio assets. Untracked IDE files/old local asset snapshots are not releases
and are not added to any backup commit. No existing history is reset/rebased.

The core change removes tutorial source/types/styles/examples, not merely its
button. HTML row/bulk operations, headers, filters, selection, language and mobile
features remain native. Public component production dependencies are unchanged.

## Publication Policy

- `1.4.2` is the upstream baseline. Never publish a different artifact under it.
- `1.5.0-rc.1` identifies this core preview, not production approval. Any changed
  distributed candidate must get a new RC number instead of overwriting rc.1.
- After maintainer review/acceptance, the intended core stable version is 1.5.0.
  No stable tag, npm publication or deployment is performed here.
- The later opt-in Guide feature is intended for a separate additive minor
  release, provisionally `1.6.0-rc.1`, after integration and its own tests. It is
  not prepared or published by this core task. Do not publish the backup's old
  package.json as a Guide release.
- Keep guides additive to the accepted core. Do not blindly merge the backup
  into master: it has the old package number, tutorial-dependent tests and the
  old compiled shell. Port only the feature delta, retaining core fixes,
  reproducible studio source, version metadata and original template isolation.

## Local Review

```sh
npm ci --legacy-peer-deps
npm --prefix demo/template4 ci
npm run build:demo
npm run dev -- --host 127.0.0.1 --port 18477 --no-open
# Second terminal, while the preview server is running:
npm run test:release
npm pack --dry-run --ignore-scripts
```

`test:release` leaves fresh production artifacts and types after comparison
builds. It requires local Git history containing the baseline and Chrome (or
Playwright Chromium via BROWSER_CHANNEL). Browser suites mock network data and
font assets; test success is not certification for every downstream widget.
The historical `rel` and `pub` scripts now both run the production build and
declaration emission; neither publishes to npm. Output cleanup is handled by
Webpack instead of Windows-only shell commands or a missing declaration tool.

The component options `culture.template` and `presentation.view` are not package
version selectors. `template4` remains opt-in; old templates remain available.
Guide removal does not fix the pre-existing Template 4 migration limitations:
remote filters, some old layout/edit options and external selector/lifecycle
contracts still need review before broad rollout. No PR/push until approval.

## Candidate Verification: 2026-11-11

- `npm run test:release`: passed, including both type checks, studio units,
  production/type builds and version/artifact assertions.
- Legacy parity: 216 scenarios passed; 72 original files and 24 Grid methods
  matched the upstream baseline before execution.
- Nine core browser suites passed: edition/storage, English, filters, headers,
  lifecycle, mobile cards, mobile list, panel transfer and selection.
- Panel transfer includes 83 checks; filter modes cover 32 native combinations.
- FA/EN desktop and 320/390px mobile screenshots inspected. Tutorial UI absent;
  mobile grids had no horizontal overflow. Font/icon assets used cached fixtures.
- Backend services, physical phones, Safari/Firefox and universal old-widget
  migration compatibility were not tested. Existing migration limits remain.
