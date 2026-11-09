# English Template 4

Open `/component/configuration/mobileDesign/template4.html`, then select **English**
in the grid-language control above the preview. The standard table and the mobile
view both use the same native BasisCore component. The dashboard shell stays
Persian; the sample grid, HTML actions and tutorial are English and left-to-right.
The data menu also contains **Flight routes** as a separate English sample.

Changing the sample language keeps the presentation, density, page size and
feature switches. It selects a separate sample source, so search, filters, sort
and selection start fresh. It does not translate, overwrite or save changes to
the Persian dataset. Existing customized/saved Persian samples are preserved.

## Existing Configuration Contract

No new language option is required. Use `direction: 'ltr'` and `culture.labels`,
as in the original English examples. Direction controls layout and number
formatting; it does **not** translate application data, HTML or column titles.
Set `lang="en" dir="ltr"` on the component's containing element so assistive
technology also identifies the language. The guide dialog inherits that language.

```js
const englishLabels = {
  pageSize: 'Rows per page', search: 'Search', searchPlaceholder: 'Search routes...',
  chooseItem: 'All items', goto: 'Page', information: 'Showing ${from} to ${to} of ${total}',
  noData: 'No results found', refresh: 'Refresh',
  quickFilters: 'Quick filters; counts include all routes', clearSelection: 'Clear selection',
  actions: 'Actions', tableSettings: 'Table settings', exportFailed: 'The download failed. Please try again.',
  guide: 'Guide', selectAll: 'Select all', select: 'Select', sort: 'Sort', sourceOrder: 'Original order',
  firstRowExample: 'Example from the first row', all: 'All', allData: 'in all routes', allItems: 'All items',
  clearFilters: 'Clear filters', clearFilter: 'Clear filter', mobileFilters: 'Filters',
  advancedFilters: 'Advanced filters', filters: 'Filters', columnSearch: 'Search...',
  firstPage: 'First page', previousPage: 'Previous page', nextPage: 'Next page', lastPage: 'Last page',
  pagination: 'Pagination', results: 'results', page: 'Page', of: 'of',
  emptyTitle: 'No results found', emptyMessage: 'Try another search or change your filters.',
  editRow: 'Edit row', cardOptions: 'Card actions', rowOptions: 'Row actions',
  untitled: 'Untitled', selectedItems: 'selected',
  guideClose: 'Close guide', guidePrevious: 'Previous', guideSkip: 'Skip', guideNext: 'Next',
  guideFinish: 'Finish guide', guideStep: 'Step',
  guideUnavailable: 'This section is not available in the current view. You can continue to the next step.',
};

const englishOptions = {
  direction: 'ltr',
  culture: {deviceId: 1, template: 'template4', labels: englishLabels},
  presentation: {view: 'table', search: true}, // Use 'mobile' for the same mobile presentation.
  process: 'client', filter: 'row', paging: [6, 8, 12],
  selectable: 'multi', selectAll: true,
  headerMaker: () => '<h3>Flight routes</h3><p>Manage flight routes and fleet schedules</p>',
  guide: {schemaVersion: 2, id: 1, lid: 2, revision: 1, title: 'Flight routes guide'},
  columns: {
    route: {title: 'Flight route', filter: true, sort: true,
      guide: {status: 'active', id: 'route', description: 'Each row represents one flight route.'}},
    airline: {title: 'Airline', filter: true},
  },
};
```

Use `englishOptions` in the existing `component.grid.grid` command. It does not
change how BasisCore sources, callbacks, sorting or selection are registered.
For a `select` filter, translate the `value` captions in `filterData.fixValues`
without changing the IDs expected by the application. Translate trusted
`headerMaker`/`cellMaker` HTML, action names and guide descriptions yourself.
Dates and currencies belong to the application's cell renderer; the demo uses
English Gregorian dates and Latin digits without converting numeric values.

`guide.lid: 2` identifies the English tutorial record; it does not select or fetch
translations. Guide controls and the first-row example caption use the same
`culture.labels` dictionary as the grid. Omitted labels retain their existing
fallbacks. Persian defaults and the original templates are unchanged.

## Verification

`tests/template4/english.browser.cjs` mounts the actual studio through BasisCore
and checks English desktop/mobile labels, mirrored selection/action positions,
column filtering, sorting, empty states, quick filters, paging, row operations,
guide controls and custom label overrides. Mobile bounds are checked at 390 and
320 CSS pixels, and switching back to Persian must not rewrite browser storage.
External styles/fonts are mocked in this automated test. This is not a live
backend test or a claim of universal browser/device compatibility.
