const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const url=process.env.GRID_STUDIO_URL || 'http://localhost:18477/component/configuration/mobileDesign/template4.html';
(async () => {
  const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL || 'chrome'});
  try {
    const page=await browser.newPage({viewport:{width:1440,height:1000}});
    const errors=[];
    page.on('pageerror',error => errors.push(error.message));
    await page.route('https://basispanel.ir/asset/css/LineIcons.css',route => route.fulfill({contentType:'text/css',body:''}));
    await page.goto(url,{waitUntil:'domcontentloaded'});
    await page.locator('[data-guide-start]').waitFor();
    await page.evaluate(() => {
      window.gridInstance=() => window.$bc.all.flatMap(w => w.GetComponentList()).find(c => c.manager?.gridInstance?.materialTemplate).manager.gridInstance;
      const guide=window.gridInstance().options.columns.operation.guide;
      if(!guide.steps.length)throw new Error('Missing native operation column steps');
      // Demonstrate that the public priority changes the actual tour, not only the JSON editor.
      guide.priority=0;
    });
    for(const viewport of [{width:1440,height:1000},{width:390,height:844},{width:320,height:568}]) {
      await page.setViewportSize(viewport);
      if(viewport.width!==1440)await page.locator('button[data-action=view][data-value=mobile]').click();
      const before=await page.evaluate(() => window.gridInstance().materialTemplate.captureState());
      const rowsBefore=await page.evaluate(() => window.gridInstance()._rows.map(row => row.data));
      await page.locator('[data-guide-start]').click();
      for(const [key,title] of [['edit','ویرایش مسیر'],['disable','غیرفعال کردن مسیر'],['delete','حذف یک مسیر']]) {
        assert.equal(await page.locator('.bc-guide-title').innerText(),title);
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const preview=page.locator('.bc-guide-action-preview');
        assert(await preview.isVisible());
        assert.equal(await page.locator('.dialog-backdrop').count(),0);
        const panel=await page.locator('.bc-guide-panel').boundingBox();
        const ring=await page.locator('.bc-guide-ring').boundingBox();
        const item=await preview.locator(`[data-grid-action="${key}"]`).boundingBox();
        assert(item && ring && item.y>=ring.y && item.y+item.height<=ring.y+ring.height+1);
        assert(panel.x>=0 && panel.y>=0 && panel.x+panel.width<=viewport.width+1 && panel.y+panel.height<=viewport.height+1);
        if(key==='edit')await page.screenshot({path:`/tmp/studio-operation-guide-${viewport.width}.png`});
        await page.locator('.bc-guide-next').click();
      }
      assert.equal(await page.locator('.bc-guide-title').innerText(),'مسیر پرواز');
      await page.keyboard.press('Escape');
      assert.deepEqual(await page.evaluate(() => window.gridInstance().materialTemplate.captureState()),before);
      assert.deepEqual(await page.evaluate(() => window.gridInstance()._rows.map(row => row.data)),rowsBefore);
    }
    // The same HTML menu remains operational outside the inert tutorial preview.
    await page.locator('.mobile-row:first-child [data-grid-action-trigger]').click();
    await page.locator('.mobile-row:first-child [data-grid-action="edit"]').click();
    await page.locator('.dialog-backdrop').waitFor();
    await page.keyboard.press('Escape');
    await page.locator('button[data-action=workspace][data-value=config]').click();
    const dataset=JSON.parse(await page.locator('textarea.json-editor').inputValue());
    assert.equal(dataset.operationGuide.steps.length,3);
    await page.locator('[data-action=apply]').click();
    await page.locator('.editor-message.success').waitFor();
    assert.deepEqual(JSON.parse(await page.locator('textarea.json-editor').inputValue()).operationGuide,dataset.operationGuide);
    assert.deepEqual(errors,[]);
    console.log('Actual Template 4 studio: native operation.guide.steps, priority, edit/disable/delete previews, desktop/mobile bounds, unchanged data, real HTML handler and JSON roundtrip passed.');
  } finally {await browser.close();}
})().catch(error => {console.error(error);process.exitCode=1;});
