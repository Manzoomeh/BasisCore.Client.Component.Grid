# English Template 4 Core

Open `/component/configuration/mobileDesign/template4.html`, then select
**English** above the preview. Table and mobile use the same native component.
The dashboard shell stays Persian; grid data, controls and HTML actions become
English/LTR. The dataset menu also offers the separate **Flight routes** sample.

Changing language preserves presentation, density, page size and feature
switches, but starts fresh filters/sort/selection for the new sample. It does not
overwrite the Persian data. Core and full-version browser storage are separate.

## Existing Configuration

Use `direction: 'ltr'` and `culture.labels`, as in the original English examples.
Direction changes layout/number formatting, not the language of user data or
application HTML. Set `lang="en" dir="ltr"` on the component's containing element
for assistive technology. Dates/currencies belong to the host cell renderer.

```js
const englishLabels = {
  pageSize: 'Rows per page', search: 'Search', searchPlaceholder: 'Search routes...',
  chooseItem: 'All items', goto: 'Page', information: 'Showing ${from} to ${to} of ${total}',
  noData: 'No results found', refresh: 'Refresh', quickFilters: 'Quick filters',
  clearSelection: 'Clear selection', actions: 'Actions', tableSettings: 'Table settings',
  exportFailed: 'The download failed. Please try again.', selectAll: 'Select all', select: 'Select',
  sort: 'Sort', sourceOrder: 'Original order', all: 'All', allData: 'in all routes', allItems: 'All items',
  clearFilters: 'Clear filters', clearFilter: 'Clear filter', mobileFilters: 'Filters',
  advancedFilters: 'Advanced filters', filters: 'Filters', columnSearch: 'Search...',
  firstPage: 'First page', previousPage: 'Previous page', nextPage: 'Next page', lastPage: 'Last page',
  pagination: 'Pagination', results: 'results', page: 'Page', of: 'of',
  emptyTitle: 'No results found', emptyMessage: 'Try another search or change your filters.',
  editRow: 'Edit row', cardOptions: 'Card actions', rowOptions: 'Row actions',
  untitled: 'Untitled', selectedItems: 'selected',
};
const options = {
  direction: 'ltr', culture: {deviceId: 1, template: 'template4', labels: englishLabels},
  presentation: {view: 'table', search: true}, // 'mobile' for vertical cards.
  process: 'client', filter: 'row', paging: [6, 8, 12],
  selectable: 'multi', selectAll: true,
  headerMaker: () => '<h3>Flight routes</h3><p>Manage flight routes and fleet schedules</p>',
  columns: {route: {title: 'Flight route', filter: true, sort: true}, airline: {title: 'Airline', filter: true}},
};
```

Keep the existing `component.grid.grid` command, data sources and callbacks.
Translate column titles, `headerMaker`/`cellMaker` HTML and select captions
(`fixValues.value`), without changing the IDs your application expects.
Omitted labels retain their existing fallbacks; Persian defaults are unchanged.

The core edition has no tutorial UI or `guide` configuration. The full snapshot
and future release plan are documented in [releases](releases.md).

The English browser suite verifies real BasisCore mounting, LTR ordering,
localized dates/digits, filters, sort, selection, actions, empty state, pagination,
320/390px bounds and touch controls. It does not exercise a live backend.
