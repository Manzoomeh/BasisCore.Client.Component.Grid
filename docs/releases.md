# Release Editions And Versioning

## Current Review Candidate

| Branch | Edition | Package version | State |
| --- | --- | --- | --- |
| `master` | Template 4 + opt-in Guide | `1.6.0-rc.1` | Guide candidate prepared for the requester to push |
| `basisfly/template4-core` | Template 4 core, without Guide | `1.5.0-rc.1` | Preserved at `30e0aae`; approved by the requester |
| `basisfly/template4-guide` | Template 4 + opt-in Guide | `1.6.0-rc.1` | Feature commit `573e16b`, based on `30e0aae` |
| `basisfly/template4-with-guide` | Full Template 4 + Guide snapshot | historical `1.4.2` | Backup at `ada5e1f`, not a publishable new release |
| `basisfly/template4-upstream` | Earlier full-feature PR preparation | historical `1.4.2` | Preserved, not used for the core PR |

The backup branch points to exactly the complete tracked state before the split.
It preserves Persian/English desktop/mobile, tutorials, docs, tests and served
studio assets. Untracked IDE files/old local asset snapshots are not releases
and are not added to any backup commit. No existing history is reset/rebased.

The preserved core change removes tutorial source/types/styles/examples, not merely its
button. HTML row/bulk operations, headers, filters, selection, language and mobile
features remain native. Public component production dependencies are unchanged.

The Guide candidate reintroduces only tutorial code/types/styles/examples on top
of Core. It retains Core's release tooling, editable studio, refresh fix and
native FA/EN desktop/mobile behavior. It does not merge the backup wholesale.
The guide runtime is bundled, but no help button or Guide instance is initialized
without a valid root opt-in and configured steps. Templates 1-3 are unchanged.

## Publication Policy

- `1.4.2` is the upstream baseline. Never publish a different artifact under it.
- `1.5.0-rc.1` identifies this core preview, not production approval. Any changed
  distributed candidate must get a new RC number instead of overwriting rc.1.
- After maintainer review/acceptance, the intended core stable version is 1.5.0.
  No stable tag, npm publication or deployment is performed here.
- `1.6.0-rc.1` identifies the separately prepared Guide candidate. It is not a
  stable release or a published package. Any changed distributed candidate
  needs a new RC. Never publish the backup's historical package.json.
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

## Core Verification: 2026-11-11

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

## Guide Candidate And Storage

The Guide feature was prepared on `basisfly/template4-guide`, then fast-forwarded
onto local `master` at the requester's direction. The previous Core tip is kept
on `basisfly/template4-core`; `basisfly/template4-with-guide` remains untouched.
Compare against the Core branch for the additive feature, documentation/tests,
demo metadata and release identity. For a Guide-only upstream PR, the target
must already include the Core history; otherwise the PR also includes Core.

The editable Guide studio writes `basiscore-grid-template4-guide-datasets-v1`.
Archived `material-list-studio-datasets` data is a read-only import fallback;
only known unchanged built-in tours are upgraded in memory. Custom guide text,
rows and settings are preserved. Core's separate key is neither read nor
overwritten. This isolation concerns the demo only, not consumer grid data.

No fetch/push, PR creation, tag, deployment or package publication is performed.
The requester will push `master` after reviewing the local commits.

## Guide Verification: 2026-11-11

- Library/studio type checks and studio unit tests passed.
- All 216 legacy parity scenarios passed during the release pipeline; 72 original
  files and 24 Grid methods still matched the upstream baseline.
- Production bundles, declarations, demo generation and `npm test` passed with
  `1.6.0-rc.1` identity and Guide APIs/assets included.
- The combined `test:release` process received SIGTERM before the final browser
  suite completed. The entire `npm run test:template4` stage was rerun separately
  and exited successfully: all 15 suites passed, including the final studio
  action scenario and custom dataset IDs. The interrupted combined run is not
  reported as a successful end-to-end command.
- `npm pack --dry-run --ignore-scripts --json` verified the package layout and
  Guide declarations/docs, without publishing or bundling private demo dependencies.
- FA desktop/mobile spotlight screenshots inspected; EN/LTR guide bounds,
  320/390px views, touch, keyboard/focus and inert action previews tested.
- No changes to Core's processing managers, legacy templates, defaults or
  production dependencies. Guide opt-out initializes no tour; old Core/archive
  demo storage remains untouched.
- Live backends, physical devices and Safari/Firefox are untested. Existing
  Template 4 migration limits still apply; Guide does not repair those contracts.
