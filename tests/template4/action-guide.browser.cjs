const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const base = new URL(process.env.GRID_STUDIO_URL || 'http://localhost:18477/');
const url = new URL('/component/configuration/mobileDesign/action-guides.html',base).href;
const settle = page => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
(async () => {
  const browser = await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL || 'chrome'});
  try {
    const page = await browser.newPage({viewport:{width:1280,height:900}});
    const errors=[];
    page.on('pageerror',error=>{errors.push(error.message); console.error(error.message);});
    await page.goto(url);
    await page.locator('[data-guide-start]').waitFor();
    await page.evaluate(() => {
      window.calls=[];
      window.sampleAction=key=>window.calls.push(key);
      window.gridInstance=()=>window.$bc.all.flatMap(w=>w.GetComponentList()).find(c=>c.manager?.gridInstance).manager.gridInstance;
    });
    for (const viewport of [{width:1280,height:900},{width:390,height:844},{width:320,height:568}]) {
      await page.setViewportSize(viewport);
      await page.getByRole('button',{name:viewport.width===1280?'جدول':'موبایل',exact:true}).click();
      if (viewport.width!==1280) await page.locator('.mobile-row input').first().check();
      const before=await page.evaluate(()=>window.gridInstance().materialTemplate.captureState());
      await page.locator('[data-guide-start]').click();
      assert.equal(await page.locator('.bc-guide-title').innerText(),'مسیر');
      await page.locator('.bc-guide-next').click();
      for (const title of ['ویرایش مسیر','حذف مسیر','حذف گروهی']) {
        await settle(page);
        assert.equal(await page.locator('.bc-guide-title').innerText(),title);
        const preview=page.locator('.bc-guide-action-preview');
        assert(await preview.isVisible());
        assert.equal(await preview.locator('[onclick], [id], [href], script').count(),0);
        assert(await preview.evaluate(node=>node.hasAttribute('inert')));
        assert.equal(await page.locator('#grid .iconsOperations.show').count(),0);
        const ring=await page.locator('.bc-guide-ring').boundingBox();
        const panel=await page.locator('.bc-guide-panel').boundingBox();
        assert(ring.width>0 && ring.height>0);
        assert(panel.x>=0 && panel.y>=0 && panel.x+panel.width<=viewport.width+1 && panel.y+panel.height<=viewport.height+1);
        await preview.locator('[data-grid-action]').first().dispatchEvent('click');
        assert.deepEqual(await page.evaluate(()=>window.calls),[]);
        for(let i=0;i<4;i++) {
          await page.keyboard.press('Tab');
          assert(await page.evaluate(()=>!!document.activeElement.closest('.bc-guide-panel')));
        }
        if(title==='ویرایش مسیر') await page.screenshot({path:`/tmp/action-guide-${viewport.width}.png`});
        await page.locator('.bc-guide-next').click();
      }
      assert.equal(await page.locator('.bc-guide-action-preview').count(),0);
      assert.deepEqual(await page.evaluate(()=>window.gridInstance().materialTemplate.captureState()),before);
      await page.locator('[data-guide-start]').click();
      await page.locator('.bc-guide-next').click();
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.bc-guide-action-preview').count(),0);
    }
    // No permission on the first row: do not silently teach an action from another row.
    await page.locator('.mobile-row:first-child [data-grid-action="edit"]').evaluate(node=>node.hidden=true);
    await page.locator('[data-guide-start]').click();
    await page.locator('.bc-guide-next').click();
    assert.equal(await page.locator('.bc-guide-title').innerText(),'حذف مسیر');
    assert.equal(await page.locator('.bc-guide-action-preview [data-grid-action="edit"]').isVisible(),false);
    await page.keyboard.press('Escape');
    await page.evaluate(()=>{
      window.gridInstance().options.guide.steps=[{id:'required-missing',target:'list.row.action.unavailable',title:'Missing',description:'Unavailable action',priority:15}];
    });
    await page.locator('[data-guide-start]').click();
    await page.locator('.bc-guide-next').click();
    assert.equal(await page.locator('.bc-guide-title').innerText(),'Missing');
    await settle(page);
    assert(await page.locator('.bc-guide-notice').isVisible());
    assert.equal(await page.locator('.bc-guide-action-preview').count(),0);
    await page.keyboard.press('Escape');
    await page.evaluate(()=>{
      window.gridInstance().options.guide.steps=[{id:'delete',target:'list.row.action.delete',title:'Delete',description:'Delete',optional:true}];
    });
    // Ordinary application handlers still work outside the guide.
    await page.locator('.mobile-row:first-child [data-grid-action-trigger]').click();
    await page.locator('.mobile-row:first-child [data-grid-action="delete"]').click();
    assert.deepEqual(await page.evaluate(()=>window.calls),['delete']);
    // Native light-dismiss/scroll may close an open popover; the original HTML and handlers survive.
    await page.locator('[data-guide-start]').click();
    await page.locator('.bc-guide-next').click();
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.mobile-row:first-child [data-grid-action="delete"]').getAttribute('onclick'),"sampleAction('delete')");
    await page.locator('[data-guide-start]').click();
    await page.locator('.bc-guide-next').click();
    await page.evaluate(()=>window.gridInstance().materialTemplate.dispose());
    assert.equal(await page.locator('.bc-guide-action-preview').count(),0);
    assert.deepEqual(errors,[]);
    console.log('Action guides: combined column/action ordering, row/bulk HTML, desktop/mobile bounds, read-only preview, unchanged state/handlers, permission skip, Escape and disposal passed.');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
