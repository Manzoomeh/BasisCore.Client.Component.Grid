const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const base = process.env.GRID_STUDIO_URL || 'http://localhost:18477/';
const settle = page => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));

(async () => {
  const browser = await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL || 'chrome'});
  try {
    const page = await browser.newPage({viewport:{width:1280,height:900}});
    const errors=[];
    page.on('pageerror',error => errors.push(error.message));
    await page.route('https://basispanel.ir/asset/css/LineIcons.css',route => route.fulfill({contentType:'text/css',body:''}));
    await page.goto(new URL('/component/configuration/mobileDesign/action-guides.html',base).href);
    await page.locator('[data-guide-start]').waitFor();
    await page.evaluate(() => {
      window.calls=[];
      window.sampleAction=key => window.calls.push(key);
      window.gridInstance=() => window.$bc.all.flatMap(w => w.GetComponentList()).find(c => c.manager?.gridInstance).manager.gridInstance;
      const options=window.gridInstance().options;
      options.guide.steps=[
        {id:'search',target:'list.search',title:'Search',description:'Global steps also coexist with columns.',priority:0},
        {id:'pagination',target:'list.pagination',title:'Paging',description:'Global priority between column steps.',priority:25}
      ];
      // Inherit 20 for delete/bulk, but deliberately move edit after global paging.
      options.columns.operation.guide.steps[0].priority=40;
    });
    for (const viewport of [{width:1280,height:900},{width:390,height:844},{width:320,height:568}]) {
      await page.setViewportSize(viewport);
      await page.getByRole('button',{name:viewport.width===1280?'جدول':'موبایل',exact:true}).click();
      if(viewport.width!==1280) await page.locator('.mobile-row input').first().check();
      const before=await page.evaluate(() => window.gridInstance().materialTemplate.captureState());
      await page.locator('[data-guide-start]').click();
      for(const title of ['Search','مسیر','حذف مسیر','حذف گروهی','Paging','ویرایش مسیر']) {
        assert.equal(await page.locator('.bc-guide-title').innerText(),title);
        await settle(page);
        if(['حذف مسیر','حذف گروهی','ویرایش مسیر'].includes(title)) {
          const preview=page.locator('.bc-guide-action-preview');
          assert(await preview.isVisible());
          assert.equal(await preview.locator('[onclick],[href],[id],script').count(),0);
          await preview.locator('[data-grid-action]').first().dispatchEvent('click');
          if(title==='ویرایش مسیر') await page.screenshot({path:`/tmp/column-steps-${viewport.width}.png`});
        }
        const panel=await page.locator('.bc-guide-panel').boundingBox();
        assert(panel.x>=0 && panel.y>=0 && panel.x+panel.width<=viewport.width+1 && panel.y+panel.height<=viewport.height+1);
        await page.locator('.bc-guide-next').click();
      }
      assert.equal(await page.locator('.bc-guide').count(),0);
      assert.deepEqual(await page.evaluate(() => window.calls),[]);
      assert.deepEqual(await page.evaluate(() => window.gridInstance().materialTemplate.captureState()),before);
    }
    await page.evaluate(() => {
      const guide=window.gridInstance().options.columns.route.guide;
      delete guide.description;
      guide.steps=[{id:'route-first',description:'First explanation.'},{id:'route-second',description:'Second explanation.'}];
    });
    await page.locator('[data-guide-start]').click();
    await page.locator('.bc-guide-next').click();
    for(const description of ['First explanation.','Second explanation.']) {
      assert.equal(await page.locator('.bc-guide-title').innerText(),'مسیر');
      assert((await page.locator('.bc-guide-description').innerText()).startsWith(description));
      await settle(page);
      assert(await page.locator('.bc-guide-ring').isVisible());
      await page.locator('.bc-guide-next').click();
    }
    await page.keyboard.press('Escape');
    await page.evaluate(() => {
      window.gridInstance().options.columns.operation.guide.steps[0].id='route-first';
    });
    await page.locator('[data-guide-start]').click();
    assert.equal(await page.locator('.bc-guide').count(),0,'Duplicate IDs across columns must reject the combined tour');
    assert.deepEqual(errors,[]);
    console.log('Column steps: inherited/overridden global priorities, stable ties, implicit targets/titles, duplicate rejection, desktop/mobile and inert action previews passed.');
  } finally { await browser.close(); }
})().catch(error => {console.error(error);process.exitCode=1;});
