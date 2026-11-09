const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const legacyGuide = require('../fixtures/legacy-flight-routes.json');
const url = process.env.GRID_STUDIO_URL || 'http://localhost:18477/component/configuration/mobileDesign/template4.html';
const columns = [
  ['route','مسیر پرواز'], ['airline','ایرلاین'], ['aircraft','نوع هواپیما'], ['code','کد مسیر'],
  ['duration','مدت سفر (دقیقه)'], ['createdAt','تاریخ ایجاد'], ['status','وضعیت'],
];
const settle = page => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
async function checkColumnRange(page, key, mobile = false) {
  await settle(page);
  const scope = '[data-grid-slot=material]';
  let heading = await page.locator(mobile
    ? `${scope} .mobile-row:first-child [data-guide-column="${key}"]`
    : `${scope} thead [data-guide-column-header="${key}"]`).boundingBox();
  const cell = await page.locator(mobile
    ? `${scope} .mobile-row:first-child [data-guide-column-value="${key}"]`
    : `${scope} tbody tr:first-child [data-guide-column-value="${key}"]`).boundingBox();
  if (mobile) heading = await page.locator(`${scope} .mobile-row:first-child [data-guide-column="${key}"]`).evaluate(node => {
    const rect = (node.closest('[data-mobile-field], [data-mobile-primary]') || node).getBoundingClientRect();
    return {x:rect.x,y:rect.y,width:rect.width,height:rect.height};
  });
  const ring = await page.locator('.bc-guide-ring').boundingBox();
  assert(heading && cell && ring,`${key}: heading, first cell and spotlight must exist`);
  const left = Math.min(heading.x,cell.x), top = Math.min(heading.y,cell.y);
  const right = Math.max(heading.x+heading.width,cell.x+cell.width);
  const bottom = Math.max(heading.y+heading.height,cell.y+cell.height);
  const padding = mobile ? 10 : 5;
  const viewport = page.viewportSize();
  assert(Math.abs(Math.max(5,left-padding)-ring.x)<2 && Math.abs(Math.max(5,top-padding)-ring.y)<2,`${key}: spotlight must include the entire field`);
  assert(Math.abs(Math.min(viewport.width-5,right+padding)-ring.x-ring.width)<2 && Math.abs(Math.min(viewport.height-5,bottom+padding)-ring.y-ring.height)<2,`${key}: spotlight must include the full value and safe padding`);
  if (mobile) {
    const panel = await page.locator('.bc-guide-panel').boundingBox();
    assert(ring.y+ring.height<=panel.y || panel.y+panel.height<=ring.y,`${key}: the guide must not cover the field`);
    assert.equal(await page.locator('.bc-guide-ring').evaluate(node => getComputedStyle(node).borderTopRightRadius),'12px');
  }
}

(async () => {
  const browser = await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL || 'chrome'});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1000}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url,{waitUntil:'domcontentloaded'});
    await page.locator('[data-guide-start]').waitFor();
    assert.equal(await page.locator('[data-guide-start]').getAttribute('aria-label'),'راهنما');
    assert.equal((await page.locator('[data-guide-start]').innerText()).trim(),'راهنما');
    const config = await page.evaluate(() => {
      const grid = window.$bc.all.flatMap(wrapper => wrapper.GetComponentList()).find(command => command.manager?.gridInstance?.materialTemplate).manager.gridInstance;
      return {guide:grid.options.guide,columns:Object.entries(grid.options.columns).filter(([,column]) => column.guide?.status === 'active').map(([key]) => key)};
    });
    assert.equal(config.guide.steps,undefined,'The actual default page must not use the old whole-row tour');
    assert.deepEqual(config.columns,[...columns.map(([key]) => key),'operation'],'Column guide metadata must reach the native BasisCore options');
    await page.locator('[data-guide-start]').click();
    for (const [key,label] of columns) {
      assert.equal(await page.locator('.bc-guide-title').innerText(),label);
      await checkColumnRange(page,key);
      const example = (await page.locator(`[data-grid-slot=material] tbody tr:first-child [data-guide-column-value="${key}"]`).textContent()).replace(/\s+/g,' ').trim();
      assert((await page.locator('.bc-guide-description').innerText()).includes(`نمونه از ردیف اول: ${example}`));
      if (key === 'route') await page.screenshot({path:'/tmp/column-guide-desktop.png'});
      await page.locator('.bc-guide-next').click();
    }
    assert.equal(await page.locator('.bc-guide-title').innerText(),'ویرایش مسیر');
    await page.keyboard.press('Escape');

    await page.locator('[aria-label="صفحه بعد"]').click();
    await page.locator('[data-guide-start]').click();
    await checkColumnRange(page,'route');
    await page.keyboard.press('Escape');
    await page.locator('th[data-guide-column-header="code"] .sort-button').click();
    await page.locator('[data-guide-start]').click();
    await checkColumnRange(page,'route');
    await page.locator('tbody tr:first-child [data-guide-column-value="route"]').evaluate(cell => cell.style.paddingBottom='70px');
    await checkColumnRange(page,'route');
    await page.keyboard.press('Escape');
    await page.locator('tbody tr:first-child [data-guide-column-value="route"]').evaluate(cell => cell.style.paddingBottom='');
    const routeFilter = page.locator('thead [data-column-filter="route"]');
    await routeFilter.fill('دبی');
    await page.locator('[data-guide-start]').click();
    await checkColumnRange(page,'route');
    await page.keyboard.press('Escape');
    await routeFilter.fill('no-matching-route');
    await page.locator('[data-guide-start]').click();
    assert.equal(await page.locator('tbody tr').count(),0);
    await settle(page);
    const emptyHeader = await page.locator('th[data-guide-column-header="route"]').boundingBox();
    const emptyRing = await page.locator('.bc-guide-ring').boundingBox();
    assert(Math.abs(emptyHeader.height+10-emptyRing.height)<2,'With no data, highlight only the available header');
    await page.keyboard.press('Escape');
    await routeFilter.fill('');

    for (const viewport of [{width:1440,height:1000},{width:390,height:844},{width:320,height:568}]) {
      await page.setViewportSize(viewport);
      await page.locator('button[data-action=view][data-value=mobile]').click();
      assert.equal(await page.locator('[data-guide-start]').getAttribute('aria-label'),'راهنما');
      assert.equal(await page.locator('[data-guide-start] .guide-start-copy').isVisible(),false);
      await page.locator('.mobile-row:first-child [data-guide-column-value="code"]').evaluate(node => node.innerHTML='EK-978<br>Additional flight information');
      await page.locator('[data-guide-start]').click();
      for (const [key,label] of columns) {
        assert.equal(await page.locator('.bc-guide-title').innerText(),label);
        await checkColumnRange(page,key,true);
        const panel = await page.locator('.bc-guide-panel').boundingBox();
        assert(panel.x>=0 && panel.x+panel.width<=viewport.width+1 && panel.y>=0 && panel.y+panel.height<=viewport.height+1);
        assert(await page.locator(`[data-grid-slot=material] .mobile-row:first-child [data-guide-column="${key}"]`).isVisible());
        assert.equal(await page.locator('.bc-guide-notice').isVisible(),false);
        if (key === 'createdAt') await page.screenshot({path:`/tmp/column-guide-mobile-date-${viewport.width}.png`});
        if (key === 'code') await page.screenshot({path:`/tmp/column-guide-mobile-multiline-${viewport.width}.png`});
        await page.locator('.bc-guide-next').click();
      }
      assert.equal(await page.locator('.bc-guide-title').innerText(),'ویرایش مسیر');
      await page.keyboard.press('Escape');
    }

    // Reproduce the user's already-saved default without clearing any saved rows or settings.
    await page.setViewportSize({width:1440,height:1000});
    await page.locator('button[data-action=workspace][data-value=config]').click();
    const dataset = JSON.parse(await page.locator('textarea.json-editor').inputValue());
    dataset.guide = legacyGuide;
    delete dataset.operationGuide;
    dataset.columns.forEach(column => delete column.guide);
    dataset.rows[0].route = 'مسیر ذخیره‌شدهٔ کاربر';
    dataset.filter = 'advanced';
    await page.evaluate(dataset => localStorage.setItem('material-list-studio-datasets',JSON.stringify([dataset])),dataset);
    await page.reload({waitUntil:'domcontentloaded'});
    await page.locator('[data-guide-start]').click();
    assert.equal(await page.locator('.bc-guide-title').innerText(),'مسیر پرواز');
    assert((await page.locator('.bc-guide-description').innerText()).includes(dataset.rows[0].route));
    await page.keyboard.press('Escape');
    await page.locator('button[data-action=workspace][data-value=config]').click();
    const migrated = JSON.parse(await page.locator('textarea.json-editor').inputValue());
    assert.equal(migrated.guide.steps,undefined);
    assert(migrated.columns.every(column => column.guide?.status === 'active'));
    assert.deepEqual(migrated.rows,dataset.rows);
    assert.equal(migrated.filter,'advanced');
    await page.locator('[data-action=apply]').click();
    await page.locator('.editor-message.success').waitFor();
    assert(JSON.parse(await page.locator('textarea.json-editor').inputValue()).columns.every(column => column.guide));
    assert.deepEqual(errors,[]);
    console.log('Default-page column guides: header-to-first-cell bounds, all seven columns, paging/sort/filter/resize/empty recovery, mobile, saved-sample migration and JSON roundtrip passed.');
  } finally { await browser.close(); }
})().catch(error => {console.error(error);process.exitCode=1;});
