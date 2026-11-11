const assert = require('node:assert/strict');
const {chromium} = require('playwright');

(async () => {
  const browser = await chromium.launch({channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true});
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.GRID_STUDIO_URL || 'http://localhost:18477/component/configuration/mobileDesign/template4.html');
    await page.locator('[data-engine=basiscore-component] tbody tr').first().waitFor();
    await page.evaluate(async () => {
      const host = document.createElement('div');
      host.id = 'native-switch'; document.body.append(host);
      window.switchOptions = {
        culture: {deviceId: 1, template: 'template4', labels: {}}, process: 'client', filter: 'simple',
        paging: [2], rowNumber: '', selectable: 'multi', selectAll: true,
        selectedSourceId: 'switch.selected',
        columns: {name: {title: 'Name', position: '#4'}},
        rowMaker: (row, element) => element.setAttribute('data-switch-row', row.name),
      };
      host.innerHTML = '<basis core="component.grid.grid" run="atclient" datamembername="switch.rows" resetsourceid="switch.reset" options="switchOptions"></basis>';
      window.switchRuntime = window.$bc.new().addFragment(host).setOptions({
        repositories: {'grid.grid': '/basiscore-grid/basiscore.grid.js'}, sources: {'switch.rows': [{name: 'One'}, {name: 'Two'}]},
      }).run();
      await window.switchRuntime.basiscore.content.initializeTask;
      await Promise.all(window.switchRuntime.GetComponentList().map(command => command.onInitialized));
      window.switchGrid = () => window.switchRuntime.GetComponentList().find(command => command.manager?.gridInstance).manager.gridInstance;
    });
    const host = page.locator('#native-switch');
    for (const template of ['template1', 'template2', 'template3']) for (const deviceId of [1, 2]) {
      assert.equal(await host.locator('[data-switch-row]').count(),2);
      await page.evaluate(({template, deviceId}) => {
        window.switchPrevious = window.switchGrid();
        window.switchOptions.culture = {template, deviceId, labels: {}};
        window.switchRuntime.setSource('switch.reset', [{run: true}]);
      }, {template, deviceId});
      await page.waitForFunction(() => window.switchGrid() !== window.switchPrevious);
      assert.equal(await host.locator('[data-bc-grid-template], .preview-content').count(), 0);
      assert.equal(await host.locator(`[data-bc-grid=d${deviceId}]`).count(), 1);
      assert.equal(await host.locator('[data-switch-row]').count(), 2);
      assert.equal(await page.locator('.bc-guide').count(), 0);
      assert(await page.evaluate(() => !window.switchGrid().materialTemplate));
      await page.evaluate(() => {
        window.switchPrevious = window.switchGrid();
        window.switchOptions.culture = {template: 'template4', deviceId: 1, labels: {}};
        window.switchRuntime.setSource('switch.reset', [{run: true}]);
      });
      await page.waitForFunction(() => window.switchGrid() !== window.switchPrevious && window.switchGrid().materialTemplate);
    }
    await page.evaluate(() => window.switchRuntime.basiscore.content.disposeAsync());
    assert.deepEqual(errors, []);
    console.log('Native lifecycle: Template 4 -> templates 1/2/3 on desktop/mobile -> Template 4, source/rowMaker preservation and no leaked template markers passed.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
