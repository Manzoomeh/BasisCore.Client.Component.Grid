/* Run with Node 18+: GRID_BASELINE_BUNDLE=/path/to/upstream/basiscore.grid.js node tests/legacy-compat.browser.cjs */
const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');

async function main() {
  assert(process.env.GRID_BASELINE_BUNDLE, 'Set GRID_BASELINE_BUNDLE to an upstream standalone Loader bundle.');
  const bundles = [process.env.GRID_BASELINE_BUNDLE,
    process.env.GRID_CURRENT_BUNDLE || path.resolve(__dirname, '../dist/basiscore.grid.js')]
    .map(file => fs.readFileSync(path.resolve(file), 'utf8'));
  const { chromium } = require('playwright');
  const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'chrome' });
  try {
    const pages = [];
    for (const bundle of bundles) {
      const context = await browser.newContext({ serviceWorkers: 'block' });
      const page = await context.newPage();
      page.setDefaultTimeout(10000);
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      page.on('requestfailed', request => errors.push(`${request.url()}: ${request.failure()?.errorText}`));
      await page.route('**/*', route => {
        const url = new URL(route.request().url());
        if (url.origin === 'http://grid.test' && url.pathname === '/') {
          return route.fulfill({ contentType: 'text/html', body: '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><script src="/grid.js"></script></head><body><div id="legacy"></div><div id="adjacent"></div></body></html>' });
        }
        if (url.origin === 'http://grid.test' && url.pathname === '/grid.js') {
          return route.fulfill({ contentType: 'application/javascript', body: bundle });
        }
        errors.push(`Unexpected request: ${url}`);
        return route.abort();
      });
      await page.addInitScript(() => {
        // Loader needs only this BasisCore HTML utility, not the component runtime.
        window.$bc = { util: { toHTMLElement(html) {
          const template = document.createElement('template');
          template.innerHTML = html.trim();
          return template.content.firstElementChild;
        } } };
      });
      pages.push({ page, errors });
    }

    let cases = 0;
    for (const template of ['template1', 'template2', 'template3']) {
      for (const deviceId of [1, 2]) {
        for (const direction of ['ltr', 'rtl']) {
          for (const process of ['client', 'server', 'mix-client', 'mix-server']) {
            for (const selection of process === 'client' ? ['none', 'single', 'multi'] : ['none']) {
              for (const filter of ['none', 'simple', 'row']) {
                const config = { template, deviceId, direction, process, selection, filter };
                const label = Object.values(config).join('/');
                const [baseline, current] = await Promise.all([
                  exercise(pages[0], config, false, `baseline ${label}`),
                  exercise(pages[1], config, true, `current ${label}`),
                ]);
                assert.deepStrictEqual(current.map(x => x[0]), baseline.map(x => x[0]), `${label}: action coverage`);
                for (let i = 0; i < baseline.length; i++) {
                  assert.deepStrictEqual(current[i][1], baseline[i][1], `${label}: ${baseline[i][0]}`);
                }
                cases++;
              }
            }
          }
          console.log(`PASS ${template}/d${deviceId}/${direction}`);
        }
      }
    }
    console.log(`Legacy parity passed: ${cases} scenarios; current template4 mounted alongside every legacy grid.`);
  } finally {
    await browser.close();
  }
}

async function exercise({ page, errors }, config, current, label) {
  errors.length = 0;
  const snapshots = [];
  let action = 'mount';
  try {
    await page.setViewportSize(config.deviceId === 1 ? { width: 1280, height: 900 } : { width: 390, height: 844 });
    await page.goto('http://grid.test/');
    assert(await page.evaluate(() => typeof window.grid?.Grid === 'function'), `${label}: expected window.grid.Grid`);
    await page.evaluate(config => {
      const rows = [
        { id: 6, name: 'Foxtrot', amount: 60 }, { id: 2, name: 'Bravo', amount: 20 },
        { id: 5, name: 'Echo', amount: 50 }, { id: 1, name: 'Alpha', amount: 10 },
        { id: 4, name: 'Delta', amount: 40 }, { id: 3, name: 'Bravo', amount: 30 },
      ];
      const copy = value => JSON.parse(JSON.stringify(value));
      const initialRows = config.process === 'server' || config.process === 'mix-server' ? rows.slice(0, 2) : rows;
      window.fixture = { config, rows, initialRows, copy, instances: {} };
      window.fixture.mount = (id, template, source, noData) => {
        const host = document.getElementById(id);
        host.replaceChildren();
        host.style.width = config.deviceId === 1 ? '960px' : '360px';
        const log = { refresh: [], selection: [], paging: [], rowMaker: [], cellMaker: [], noData: [] };
        const options = {
          columns: {
            name: { title: 'Name', position: '#4', filter: true, cssClass: ['legacy-name', 'legacy-cell'],
              cellMaker(row, value, element) {
                log.cellMaker.push([row.id, value, element.tagName]);
                return `<strong data-made-cell="${row.id}">${value}</strong>`;
              } },
            id: { title: 'ID', position: '#5', filter: false, headerCssClass: 'legacy-id' },
            amount: { title: 'Amount', position: '#7', filter: false, source: row => row.amount * 2 },
          },
          direction: config.direction, filter: config.filter,
          process: config.process.startsWith('mix') ? 'mix' : config.process,
          ProcessActionType: { search: 'server', sort: 'server', paging: config.process === 'mix-server' ? 'server' : 'client' },
          // "none" is truthy in upstream; the supported boolean disables selection.
          selectable: config.selection === 'none' ? false : config.selection,
          selectAll: config.selection === 'multi', rowNumber: false,
          paging: [2, 4], pageCount: 3, refresh: true, loader: true,
          noData: noData === undefined ? (config.selection === 'single' ? 'Nothing here' :
            config.selection === 'multi' ? element => {
              log.noData.push(element.tagName);
              element.innerHTML = '<strong data-made-empty="">Nothing here</strong>';
            } : true) : noData,
          culture: { deviceId: config.deviceId, template, labels: { noData: 'No rows' } },
          rowMaker(row, element) {
            log.rowMaker.push([row.id, element.tagName]);
            element.setAttribute('data-row-key', row.id);
          },
          pagingAction(element, number) { log.paging.push([element.getAttribute('data-bc-page'), number]); },
        };
        const grid = new window.grid.Grid(host, options,
          payload => log.refresh.push(copy(payload)), rows => log.selection.push(copy(rows)));
        window.fixture.instances[id] = { grid, log };
        grid.setSource(copy(source), { from: 0, total: options.process === 'client' || !source.length ? source.length : 14 });
      };
      window.fixture.mount('legacy', config.template, initialRows);
    }, config);

    async function capture() {
      await page.mouse.move(0, 0);
      await page.waitForFunction(() => !document.getElementById('legacy').getAnimations({ subtree: true })
        .some(animation => animation.playState === 'running' && animation.effect.getTiming().iterations !== Infinity));
      assert.deepStrictEqual(errors, [], `${label}/${action}: browser errors`);
      return page.evaluate(() => {
        const { grid, log } = window.fixture.instances.legacy;
        const root = document.getElementById('legacy');
        const manager = grid.processManager;
        const selectors = ['', '[data-bc-grid-header-container]', '[data-bc-table-container]', '[data-bc-table]',
          '[data-bc-table-body]', '[data-row-key]', '[data-bc-data]', '[data-position]', '[data-sys-th]',
          '[data-sys-th-sort-icon]', '[pop-up-search-form]', 'input', 'select', '[data-bc-page]',
          '[data-bc-no-data]', '[data-bc-information-container]'];
        const properties = ['display', 'position', 'direction', 'box-sizing', 'color', 'background-color',
          'font-family', 'font-size', 'font-weight', 'line-height', 'text-align', 'vertical-align',
          'width', 'height', 'min-width', 'max-width', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
          'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'border-top-width', 'border-top-style',
          'border-top-color', 'border-radius', 'gap', 'flex-direction', 'overflow', 'opacity'];
        const styles = selectors.map(selector => {
          const element = selector ? root.querySelector(selector) : root;
          return [selector, element ? ['', '::before', '::after'].map(pseudo => {
            const style = getComputedStyle(element, pseudo || null);
            return properties.map(property => style.getPropertyValue(property));
          }) : null];
        });
        return window.fixture.copy({
          dom: root.outerHTML.split(grid.id).join('__GRID_ID__'), styles,
          controls: [...root.querySelectorAll('input,select')].map(element => ({
            tag: element.tagName, type: element.type, value: element.value, checked: element.checked,
            indeterminate: element.indeterminate, selectedIndex: element.selectedIndex, disabled: element.disabled,
          })),
          state: { pageNumber: manager.pageNumber, pageSize: manager.pageSize, filter: manager.filter,
            sort: manager.sortInfo && [manager.sortInfo.column.name, manager.sortInfo.sort],
            rows: grid._rows.map(row => [row.data, row.order, row.selected]), source: grid.source },
          log,
        });
      });
    }
    async function record(name) {
      action = name;
      const snapshot = await capture();
      snapshots.push([name, snapshot]);
      return snapshot;
    }
    const initial = await record('initial');
    assert(initial.log.rowMaker.length > 0 && initial.log.cellMaker.length > 0, `${label}: makers must run`);
    if (current) {
      action = 'legacy setter rejection';
      await assert.rejects(page.evaluate(() => window.fixture.instances.legacy.grid.setSelectedRows(
        window.fixture.rows.slice(0, 1))), /setSelectedRows is supported only by template4/);
      assert.deepStrictEqual(await capture(), initial, `${label}: rejected setter changed legacy state`);
      action = 'template4 isolation';
      await page.evaluate(() => window.fixture.mount('adjacent', 'template4', window.fixture.initialRows));
      assert(await page.locator('#adjacent [data-row-key]').count() > 0, `${label}: template4 must render`);
      assert.deepStrictEqual(await capture(), initial, `${label}: template4 changed adjacent legacy grid`);
    }

    const root = page.locator('#legacy');
    action = 'selection';
    const selectable = config.selection !== 'none' && (config.deviceId === 1 || config.template === 'template3');
    const choices = root.locator('[data-row-key] input[type=checkbox], [data-row-key] input[type=radio]');
    // Upstream mobile templates1/2 have no selection or sorting UI; assert that contract explicitly.
    assert.equal(await choices.count() > 0, selectable, `${label}: native selection controls`);
    if (selectable) {
      await choices.nth(0).check();
      await record('select first');
      await choices.nth(1).check();
      const selected = await record('select second');
      assert.equal(selected.log.selection.at(-1).length, config.selection === 'single' ? 1 : 2);
      if (config.selection === 'multi') {
        await choices.nth(0).uncheck();
        await record('unselect first');
        if (config.deviceId === 1) {
          await root.locator('[data-bc-select-all] input').check();
          await record('select all');
          await root.locator('[data-bc-select-all] input').uncheck();
          await record('clear selection');
        }
      }
    } else {
      assert.equal(initial.log.selection.length, 0);
    }

    action = 'paging';
    await root.locator('[data-bc-page="1"]').click();
    const paged = await record('page two');
    assert.equal(paged.state.pageNumber, 1);
    assert.deepStrictEqual(paged.log.paging.at(-1), ['1', 2]);
    await root.locator('[data-bc-start]').click();
    await record('first page');
    await root.locator('[data-bc-pagesize-container] select').selectOption('4');
    assert.equal((await record('page size four')).state.pageSize, 4);

    action = 'sorting';
    const sortIcons = root.locator('[data-sys-th-sort-icon]');
    assert.equal(await sortIcons.count(), config.deviceId === 1 ? 3 : 0, `${label}: native sort controls`);
    if (config.deviceId === 1) {
      // Switching columns after both directions also observes upstream's in-place stable sorting.
      for (const [index, column, direction] of [[0, 'name', 'asc'], [0, 'name', 'desc'], [1, 'id', 'asc'], [0, 'name', 'asc']]) {
        await sortIcons.nth(index).click();
        assert.deepStrictEqual((await record(`sort ${column} ${direction}`)).state.sort, [column, direction]);
      }
    }

    if (config.filter !== 'none') {
      action = 'filter';
      if (config.filter === 'row') {
        await root.locator(config.deviceId === 1 ? '[open-pop-up-search-form]' : '[data-bc-filter-btn]').click();
        await record('open row filter');
      }
      const input = root.locator(config.filter === 'simple' ? '[data-bc-filter-container] input' : 'input[placeholder="Name"]');
      for (const value of ['bravo', '']) {
        await input.fill(value);
        await input.press('Enter');
        await page.waitForFunction(({ filter, value }) => {
          const actual = window.fixture.instances.legacy.grid.processManager.filter;
          return filter === 'simple' ? actual === value : value ? actual.name === value : !actual.name;
        }, { filter: config.filter, value });
        await record(value ? 'filter bravo' : 'clear filter');
      }
    } else {
      assert.equal(await root.locator('[data-bc-filter-container], [open-pop-up-search-form], [data-bc-filter-btn]').count(), 0);
    }

    action = 'refresh';
    await root.locator('[data-bc-refresh-container] span').click();
    const refreshed = await record('refresh payload');
    assert(refreshed.log.refresh.length > 0, `${label}: refresh callback must run`);
    for (const { urlencoded, ...payload } of refreshed.log.refresh) {
      assert.deepStrictEqual(JSON.parse(decodeURIComponent(urlencoded)), payload, `${label}: encoded refresh payload`);
    }
    if (config.process === 'server' || config.process === 'mix-server') {
      assert.equal(paged.log.refresh.at(-1).pageNumber, 2, `${label}: server paging payload`);
    } else {
      assert.equal(paged.log.refresh.length, 0, `${label}: client paging must not request data`);
    }
    if (config.process !== 'client') {
      assert(refreshed.log.refresh.some(payload => payload.pageSize === 4), `${label}: remote page size payload`);
      if (config.filter !== 'none') {
        assert(refreshed.log.refresh.some(payload => config.filter === 'simple' ? payload.filter === 'bravo' : payload.filter?.name === 'bravo'));
      }
      if (config.deviceId === 1) assert(refreshed.log.refresh.some(payload => payload.sortInfo.type === 'desc'));
    }

    action = 'replace source';
    await page.evaluate(() => window.fixture.instances.legacy.grid.setSource(
      [{ id: 9, name: 'Replacement', amount: 90 }], { from: 0, total: 1 }));
    await record('replace source');
    await page.evaluate(() => window.fixture.instances.legacy.grid.setSource([], { from: 0, total: 0 }));
    await record('replace with empty source');
    // A fresh empty mount exercises noData even when upstream retains its previous source on replacement.
    await page.evaluate(() => window.fixture.mount('legacy', window.fixture.config.template, []));
    await record('initial empty source');
    assert.equal(await root.locator('[data-bc-no-data]').count(), 1, `${label}: noData must render`);
    await page.evaluate(() => window.fixture.mount('legacy', window.fixture.config.template, [], false));
    await record('noData disabled');
    assert.equal(await root.locator('[data-bc-no-data]').count(), 0, `${label}: noData false`);
    assert.deepStrictEqual(errors, [], `${label}: browser errors`);
    return snapshots;
  } catch (error) {
    throw new Error(`${label} / ${action}: ${error.message}`, { cause: error });
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
