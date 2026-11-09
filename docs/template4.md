# Template 4

Activate with `culture.template: 'template4'`; no existing template is replaced.
The existing BasisCore component, data sources, refresh/selected source callbacks,
process managers, sorting and pagination remain in use.

## Presentation

`presentation.view` accepts `table` (default), `list`, `grid` and `mobile`.
Mobile is a presentation of Template 4, not a registered Template 5. Set it
explicitly; `culture.deviceId: 2` alone does not select this presentation.
`density` accepts `comfortable` or `compact`.

The optional `titleKey`, `subtitleKey`, `imageKey` and `badgeKey` map columns to
card/list content. Mobile renders remaining columns vertically. A column named
`operation` uses its original trusted `cellMaker` HTML in the top action group;
it is not repeated in the body. No details button or inferred date footer is added.
`rowActions`/`onRowAction` supply the optional built-in action if no operation
column exists. Interactive trusted `operation.title` HTML supplies mobile bulk
actions; otherwise the selected-row bar shows count and clear only.

## Language

For English/LTR desktop and mobile configuration, see the
[English sample and complete label dictionary](template4-english.md).
The existing `direction` and `culture.labels` options remain the contract;
changing direction alone does not translate column titles or application HTML.

## Filtering

- `filter: 'none'`: no column filters.
- `filter: 'simple'`: the original simple-filter contract.
- `filter: 'row'`: inline desktop column filters, no advanced panel.
- `filter: 'advanced'`: an expandable desktop panel, no inline inputs.

`presentation.search` controls the global search field separately.
`presentation.filterMode: 'header'` replaces titles with inputs in desktop row
mode. Otherwise titles and inputs occupy separate aligned rows.
`presentation.showHeaderFilters` hides/shows the filter row without clearing
active values or sending a request. `true` explicitly opts into separate rows.

In mobile, row and advanced both use the same expandable typed column-filter
panel; the stored desktop options are not changed. Select inputs use
`filterData.fixValues` or current source values. `filterData.inputType` supports
`search`, `number` and `date`. Remote autocomplete is not implemented by Template 4.
For server/mixed processing, the backend still needs to implement its existing
filter/sort/page contract; callback payload tests are not live backend tests.
Remote row-filter selects currently send plain lowercase values rather than the
legacy remote `{id, value}` objects. Global query is sent for simple mode, not
combined with a remote row-filter object. Inputs are not debounced. Do not migrate
remote select/autocomplete or combined-search widgets without adapting/testing
that contract first.

## Refresh

With `refresh: true`, Template 4 retains `div[data-bc-refresh-container]` and its
descendant `span`. Existing widget code such as
`document.querySelector('[data-bc-refresh-container]').querySelector('span').click()`
still uses the same native refresh callback and payload. The visible button is a
form-safe keyboard-accessible `button`; clicking either target fires once.
`refresh: false` omits the control. No widget/config migration is needed for this
refresh selector; other DOM/migration limitations still apply.

## Selection

`selectable: 'multi'` uses checkboxes; `single` uses radios and ignores select-all;
`false`/`none` disables selection. Single selection replaces the previous selected
row even across pages. Events still flow through `selectedSourceId`.
`grid.getSelectedRows()` reads selection; `grid.setSelectedRows(rows)` is a new
Template-4-only helper and rejects legacy instances. In single mode it keeps only
the first supplied row. It matches row objects by identity, not an assumed key.

## Header And Guide

```js
headerMaker: element => '<h3>Passenger details</h3><p>Identity and age groups</p>',
```

Like `cellMaker`, `headerMaker` accepts trusted application HTML. It can also
populate the supplied element and return nothing. It runs once per instance
(again on reset), not during sort/filter/page redraws. Omission/empty output
creates no header. Escape untrusted values yourself; these callbacks are not an
HTML sanitizer or safe handlers for user-provided code.

Top-level `guide` is the tutorial switch: `true` enables configured column steps;
an object (including `{}`) can also hold global steps, title and optional metadata
(`schemaVersion`, integer `id`, integer `lid`, `revision`). Missing/`false` hides
the button even with active column guides; an enabled tour without steps also
hides it. Boolean mode uses the localized guide label and invents no identity or
language IDs. Supplied metadata is validated; `isGuideMetadata` still requires
complete metadata for database records. Column steps are defined in
`columns.<name>.guide` with `status`, a string step `id`, and `description`;
Template 4 highlights the column from its header through its first rendered cell
(the field label and value together on mobile), and adds that cell's text as an
example. Empty tables highlight only the header. `guideTargets` remains available for legacy external
steps and maps trusted names to resolver functions; JSON selectors/code are never
evaluated. Guide titles/descriptions are rendered as plain text. See the
[JSON](guides/flight-routes.json) and
[team explanation](guides/flight-routes.md). A column can instead supply `steps`
for multiple explanations/actions. Child `target`/`title` default to that column;
`optional` and numeric `priority` inherit from its guide. Smaller priorities run
first across all columns and global steps (default `1000`, stable ties). If both
`description` and `steps` exist, the column overview is an additional step.

Semantic HTML action targets `list.row.action.<key>` and `list.bulk.action.<key>`
are read-only menu previews, not action invocations. They use marked application
HTML and can be declared in `columns.operation.guide.steps` or in the existing
`options.guide.steps`. All global steps now coexist with column guides, including
search and external targets; they are no longer filtered to action targets only.
Final step IDs must be unique and the combined tour must contain at most 50 steps. See the complete
[HTML action-guide contract](guides/actions.md), including required markers,
permissions, ordering, mobile bulk selection and lifecycle restrictions.

## Styles And Lifecycle

`src/asset/template4.css` is the editable, scoped library stylesheet. It is loaded
only when a Template 4 instance is created. It uses the BasisPanel-hosted LineIcons
stylesheet and bundles the matching font locally. Provide Vazirmatn in the host page, or the
Tahoma/sans-serif fallback is used.

BasisCore reset/disposal closes guides/popovers, removes observers and clears
Template 4 markers before reusing a host for a legacy template. Direct consumers
must call `grid.materialTemplate.dispose()` before removing/reusing their host.

## Migration Limits

Template 4 is not an automatic replacement for every legacy configuration.
Keep templates 1-3 for `editMode`, `widthCard`/legacy mode buttons, custom loader
renderers, and remote autocomplete until those contracts are implemented/tested
for the new presentation. New views use `presentation`, not legacy mobile slot
`position` mappings. Changing only the template is not sufficient for these cases.
Explicit columns are required. Server/server-paged mixed sources require valid
`extra: {from, total}` metadata and paging enabled. Card view projects selected
fields rather than every column and does not expose the table's selection UI.
Source replacement clears selection; it is not persistent selection across
server pages. `information`/custom information-format strings and the legacy
loader callbacks are not mapped to Template 4's footer/progress UI.
