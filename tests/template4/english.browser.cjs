const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('playwright');
const url = process.env.GRID_STUDIO_URL || 'http://localhost:18477/component/configuration/mobileDesign/template4.html';
const bundle = fs.readFileSync(path.join(__dirname,'../../wwwroot/basiscore-grid/basiscore.grid.js'));
const localOnly = route => {
  const target=new URL(route.request().url());
  if(target.origin!==new URL(url).origin)return route.fulfill({contentType:'text/css',body:''});
  // Verify the shipped demo bundle, not only webpack's in-memory development output.
  return target.pathname==='/basiscore-grid/basiscore.grid.js'
    ? route.fulfill({contentType:'application/javascript',body:bundle}) : route.continue();
};

(async () => {
  const browser = await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL || 'chrome'});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1100},reducedMotion:'reduce'});
    const errors = [];
    page.on('pageerror',error => errors.push(error.message));
    // Exercise local component/data only; external font/icon CSS is not a test dependency.
    await page.route('**/*',localOnly);
    await page.goto(url,{waitUntil:'domcontentloaded'});
    const host = page.locator('[data-grid-slot=material][data-engine=basiscore-component]');
    const grid = host.locator('[data-bc-grid-template=template4]');
    await grid.waitFor();
    assert.equal(await grid.getAttribute('data-bc-grid-direction'),'rtl');
    const original = await page.evaluate(() => JSON.parse(localStorage.getItem('material-list-studio-datasets') || 'null'));
    await page.locator('[data-action=sample-language][data-value=en]').click();
    await grid.locator('.grid-header-content h3').filter({hasText:'Flight routes'}).waitFor();
    assert.equal(await host.getAttribute('dir'),'ltr');
    assert.equal(await host.getAttribute('lang'),'en');
    assert.equal(await grid.getAttribute('data-bc-grid-direction'),'ltr');
    assert(!/[\u0600-\u06ff]/.test(await grid.innerText()),'Visible English grid must not contain Persian copy/digits');
    assert.equal(await grid.locator('.pagination .page-size option:checked').innerText(),'8');
    assert.equal(await grid.locator('.page-navigation > span').innerText(),'Page 1 of 2');
    const check = await grid.locator('tbody tr:first-child input[type=checkbox]').boundingBox();
    const operation = await grid.locator('tbody tr:first-child [data-grid-action-trigger]').boundingBox();
    assert(check.x < operation.x,'LTR places selection at the left and actions at the right');
    assert.equal(await grid.locator('tbody tr:first-child td[data-bc-data]').first().evaluate(node => getComputedStyle(node).textAlign),'start');
    await grid.locator('[data-column-filter=route]').fill('Istanbul');
    assert.equal(await grid.locator('tbody tr').count(),2);
    await grid.locator('[data-filter-column=route] .clear-header-filter').click();
    const codes = () => grid.locator('tbody tr td:nth-child(5)').allTextContents();
    await grid.getByRole('button',{name:'Sort Route code',exact:true}).click();
    assert.deepEqual(await codes(),['AF-739','EK-978','EK-979','FZ-123','IA-442','IA-611','IR-214','LH-601']);
    await grid.getByRole('button',{name:'Sort Route code',exact:true}).click();
    assert.equal((await codes())[0],'TK-884');
    await grid.getByRole('button',{name:'Sort Route code',exact:true}).click();
    await grid.locator('.search-field input').fill('not-a-route');
    assert.match(await grid.locator('.empty-state').innerText(),/No results found/);
    await grid.locator('.search-field input').fill('');
    await grid.locator('[data-page-action=next]').click();
    assert.equal(await grid.locator('.page-navigation > span').innerText(),'Page 2 of 2');
    assert.equal(await grid.locator('tbody tr').count(),4);
    await grid.locator('.page-size select').selectOption('6');
    assert.equal(await grid.locator('tbody tr').count(),6);
    await grid.locator('tbody tr:first-child input[type=checkbox]').check();
    assert.equal(await grid.locator('.selection-count').innerText(),'1 selected');
    await grid.getByRole('button',{name:'Clear selection',exact:true}).click();
    await grid.locator('tbody tr:first-child [data-grid-action-trigger]').click();
    await grid.locator('tbody tr:first-child [data-grid-action=edit]').click();
    await page.getByRole('dialog',{name:'Route details'}).waitFor();
    assert.equal(await page.getByRole('dialog',{name:'Route details'}).getAttribute('dir'),'ltr');
    await page.keyboard.press('Escape');
    await grid.locator('.quick-filter').filter({hasText:'Inactive'}).click();
    assert.equal(await grid.locator('tbody tr').count(),3);
    await grid.locator('.quick-filter').first().click();
    await grid.screenshot({path:'/tmp/template4-english-desktop.png'});

    assert.equal(await page.locator('[data-guide-start],.bc-guide').count(),0);
    await page.locator('[data-action=view][data-value=mobile]').click();
    await grid.locator('.mobile-row').first().waitFor();
    for (const width of [390,320]) {
      await page.setViewportSize({width,height:844});
      assert.equal(await grid.getAttribute('data-view'),'mobile');
      assert(!/[\u0600-\u06ff]/.test(await grid.innerText()),'Mobile must use English labels and numbers too');
      assert(await grid.evaluate(node => node.scrollWidth<=node.clientWidth+1),'No horizontal overflow in English mobile grid');
      assert(await grid.locator('.quick-filter .status-pill').filter({hasText:'Inactive'}).evaluate(node =>
        node.getBoundingClientRect().height <= parseFloat(getComputedStyle(node).lineHeight)+1),'Do not split Inactive across lines on narrow screens');
      const checkbox=await grid.locator('.mobile-row:first-child input[type=checkbox]').boundingBox();
      const action=await grid.locator('.mobile-row:first-child [data-grid-action-trigger]').boundingBox();
      assert(checkbox.x<action.x,'Mobile mirrors selection/actions for LTR');
      await grid.locator('.advanced-filter-button').click();
      await grid.locator('.filter-panel [data-panel-filter=route]').fill('Dubai');
      assert.equal(await grid.locator('.mobile-row').count(),3);
      await grid.getByRole('button',{name:'Clear filters',exact:true}).click();
      await grid.locator('.advanced-filter-button').click();
      await grid.locator('.mobile-row:first-child input[type=checkbox]').check();
      assert.equal(await grid.locator('.selection-count').innerText(),'1 selected');
      await grid.getByRole('button',{name:'Clear selection',exact:true}).click();
      await grid.screenshot({path:`/tmp/template4-english-mobile-${width}.png`});
    }
    await page.locator('[data-action=sample-language][data-value=fa]').click();
    await grid.locator('.grid-header-content h3').filter({hasText:'لیست مسیرهای پروازی'}).waitFor();
    assert.equal(await grid.getAttribute('data-bc-grid-direction'),'rtl');
    assert.equal(await grid.getAttribute('data-view'),'mobile','Switching language keeps the chosen presentation');
    assert.equal(await host.getAttribute('lang'),'fa');
    assert.match(await grid.locator('.page-size option:checked').innerText(),/۶/);
    assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('material-list-studio-datasets') || 'null')),original,
      'Preview language switches must not rewrite saved datasets');
    const touch = await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
    await touch.route('**/*',localOnly);
    const phone=await touch.newPage();
    phone.on('pageerror',error => errors.push(error.message));
    await phone.goto(url,{waitUntil:'domcontentloaded'});
    await phone.locator('[data-engine=basiscore-component]').waitFor();
    await phone.locator('[data-action=sample-language][data-value=en]').tap();
    await phone.locator('[data-action=view][data-value=mobile]').tap();
    const phoneGrid=phone.locator('[data-grid-slot=material] [data-bc-grid-template=template4]');
    await phoneGrid.locator('.mobile-row').first().waitFor();
    for(const width of [390,320]) {
      await phone.setViewportSize({width,height:844});
      assert(await phoneGrid.evaluate(node=>node.scrollWidth<=node.clientWidth+1));
      for(const button of await phoneGrid.locator('.grid-section-header button:visible,.advanced-filter-button:visible,.mobile-row:first-child .icon-button').all()) {
        const box=await button.boundingBox();
        assert(box.width>=44&&box.height>=44,'English mobile controls keep touch targets');
      }
    }
    await phoneGrid.locator('.mobile-row:first-child input[type=checkbox]').tap();
    assert.equal(await phoneGrid.locator('.selection-count').innerText(),'1 selected');
    await phoneGrid.getByRole('button',{name:'Clear selection',exact:true}).tap();
    await touch.close();
    assert.deepEqual(errors,[]);
    console.log('Template 4 English: real BasisCore mount, LTR desktop/mobile, labels/digits/dates, filtering, paging, selection, HTML actions, 390/320px bounds and unchanged saved Persian data passed.');
  } finally { await browser.close(); }
})().catch(error => {console.error(error);process.exitCode=1;});
