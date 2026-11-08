const {chromium} = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL || 'chrome'});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1000}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto((process.env.GRID_STUDIO_URL || 'http://localhost:18477/component/configuration/mobileDesign/template4.html'),{waitUntil:'domcontentloaded'});
    await page.locator('[data-guide-start]').waitFor();
    const state = () => page.evaluate(() => {
      const command = window.$bc.all.flatMap(w=>w.GetComponentList()).find(c=>c.manager?.gridInstance?.options.culture.template==='template4');
      return command.manager.gridInstance.materialTemplate.captureState();
    });
    const before = await state();
    await page.locator('[data-guide-start]').click();
    await page.locator('.bc-guide-ring').waitFor();
    assert.match(await page.locator('.bc-guide-counter').innerText(), /۷/);
    await page.locator('.bc-guide-next').click();
    assert.equal(await page.locator('.bc-guide-title').innerText(),'هر ردیف، یک مسیر پروازی');
    const routeRow = await page.locator('[data-grid-slot=material] tbody tr').first().boundingBox();
    const ring = await page.locator('.bc-guide-ring').boundingBox();
    assert(Math.abs(routeRow.x - ring.x - 5) < 2);
    await page.screenshot({path:'/tmp/guide-desktop.png'});
    await page.locator('.bc-guide-button').filter({hasText:'قبلی'}).click();
    assert.match(await page.locator('.bc-guide-counter').innerText(),/۱/);
    for (let i=0;i<12;i++) {
      await page.keyboard.press('Tab');
      assert(await page.evaluate(()=>!!document.activeElement.closest('dialog.bc-guide')));
    }
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.bc-guide').count(),0);
    assert(await page.locator('[data-guide-start]').evaluate(e=>e===document.activeElement));
    assert.deepEqual(await state(),before);
    await page.locator('[data-guide-start]').click();
    await page.locator('.bc-guide-skip').click();
    assert.equal(await page.locator('.bc-guide').count(),0);
    assert.deepEqual(await state(),before);
    await page.locator('[data-guide-start]').click();
    while(await page.locator('.bc-guide').count()) await page.locator('.bc-guide-next').click();
    assert.deepEqual(await state(),before);

    // Optional targets are omitted with disabled features; required ones stay readable.
    await page.locator('button[data-action=feature][data-value=selection]').click();
    await page.locator('[data-guide-start]').waitFor();
    await page.locator('[data-guide-start]').click();
    assert.match(await page.locator('.bc-guide-counter').innerText(),/۶/);
    await page.keyboard.press('Escape');
    await page.locator('button[data-action=feature][data-value=search]').click();
    await page.locator('[data-guide-start]').click();
    await page.locator('.bc-guide-next').click();
    await page.locator('.bc-guide-next').click();
    await page.locator('.bc-guide-next').click();
    await page.locator('.bc-guide-notice').waitFor({state:'visible'});
    await page.keyboard.press('Escape');
    await page.locator('button[data-action=feature][data-value=search]').click();
    await page.locator('button[data-action=feature][data-value=selection]').click();

    // The phone preview must use its own horizontal bounds on a desktop screen.
    await page.locator('button[data-action=view][data-value=mobile]').click();
    const mobileBefore = await state();
    await page.locator('[data-guide-start]').click();
    await page.locator('.bc-guide-next').click();
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    const preview = await page.locator('[data-grid-slot=material]').boundingBox();
    const previewPanel = await page.locator('.bc-guide-panel').boundingBox();
    const previewRing = await page.locator('.bc-guide-ring').boundingBox();
    assert(previewPanel.x >= preview.x && previewPanel.x + previewPanel.width <= preview.x + preview.width);
    assert(previewRing.y + previewRing.height < previewPanel.y);
    await page.locator('.bc-guide-arrow').waitFor({state:'visible'});
    await page.screenshot({path:'/tmp/guide-mobile-preview.png'});
    await page.keyboard.press('Escape');
    assert.deepEqual(await state(),mobileBefore);

    for (const {width,height} of [{width:390,height:844},{width:320,height:844},{width:320,height:568},{width:844,height:390}]) {
      await page.setViewportSize({width,height});
      await page.locator('button[data-action=view][data-value=mobile]').click();
      await page.locator('[data-guide-start]').click();
      await page.locator('.bc-guide-mobile').waitFor();
      for (let index=0;index<7;index++) {
        await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
        const panel = await page.locator('.bc-guide-panel').boundingBox();
        assert(panel.x>=0 && panel.y>=0 && panel.x+panel.width<=width+1 && panel.y+panel.height<=height+1);
        for (const button of await page.locator('.bc-guide-panel button').all()) {
          const box = await button.boundingBox();
          assert(box.width>=44 && box.height>=44);
          assert(box.y>=panel.y && box.y+box.height<=panel.y+panel.height+1);
        }
        if (index===3) await page.locator('.bc-guide-arrow').waitFor({state:'visible'});
        if (index===1 && width===390) {
          const focus = await page.locator('.bc-guide-ring').boundingBox();
          assert(focus.y+focus.height < panel.y);
          await page.screenshot({path:'/tmp/guide-mobile.png'});
        }
        if (index===3 && width===390) await page.screenshot({path:'/tmp/guide-mobile-search.png'});
        if (index===1 && height===568) await page.screenshot({path:'/tmp/guide-mobile-short.png'});
        await page.locator('.bc-guide-next').click();
      }
      assert.equal(await page.locator('.bc-guide').count(),0);
    }

    // Component disposal/reset must close an active guide and release its observers.
    await page.locator('[data-guide-start]').click();
    await page.evaluate(async()=>{const component=window.$bc.all.flatMap(w=>w.GetComponentList()).find(c=>c.manager?.gridInstance);await component.manager.disposeAsync();});
    assert.equal(await page.locator('.bc-guide').count(),0);

    // Per-dataset JSON roundtrip, validation, literal text and unknown target safety.
    await page.setViewportSize({width:1440,height:1000});
    await page.locator('button[data-action=workspace][data-value=config]').click();
    const editor = page.locator('textarea.json-editor');
    const dataset = JSON.parse(await editor.inputValue());
    const literal = '<img src=x onerror=alert(1)>';
    dataset.guide = {schemaVersion:2,id:3,lid:1,revision:2,title:'Custom guide',steps:[
      {id:'unsafe-target',target:'__proto__',title:literal,description:'Literal text, missing target.'},
      {id:'create',target:'page.create',title:'External page target',description:'Create a dataset.'},
      {id:'search',target:'list.search',title:'Search the current grid',description:'Scoped to this grid.'},
    ]};
    await editor.fill(JSON.stringify(dataset));
    await page.locator('[data-action=apply]').click();
    await page.locator('.editor-message.success').waitFor();
    assert.equal(JSON.parse(await editor.inputValue()).guide.revision,2);
    assert.equal(JSON.parse(await editor.inputValue()).guide.id,3);
    assert.equal(JSON.parse(await editor.inputValue()).guide.lid,1);
    await page.locator('[data-guide-start]').click();
    assert.equal(await page.locator('.bc-guide-title').innerText(),literal);
    assert.equal(await page.locator('.bc-guide img').count(),0);
    await page.locator('.bc-guide-notice').waitFor({state:'visible'});
    await page.locator('.bc-guide-next').click();
    assert.equal(await page.locator('.bc-guide-title').innerText(),'External page target');
    await page.locator('.bc-guide-ring').waitFor({state:'visible'});
    const external = await page.locator('.dataset-actions [data-action=new]').boundingBox();
    const externalRing = await page.locator('.bc-guide-ring').boundingBox();
    assert(Math.abs(external.x-externalRing.x-5)<2);
    await page.keyboard.press('Escape');
    dataset.guide.revision=0;
    await editor.fill(JSON.stringify(dataset));
    await page.locator('[data-action=apply]').click();
    await page.locator('.editor-message.error').waitFor();
    await page.locator('[data-guide-start]').click();
    assert.equal(await page.locator('.bc-guide-title').innerText(),literal);
    await page.keyboard.press('Escape');

    await page.evaluate(async()=>{
      const existing=window.$bc.all.flatMap(w=>w.GetComponentList()).find(c=>c.manager?.gridInstance);
      const host=document.createElement('div');host.id='second-guide-grid';document.body.append(host);
      window.secondGuideOptions={...existing.manager.gridInstance.options,guideTargets:{},guide:{schemaVersion:2,id:2,lid:1,revision:1,title:'Second',steps:[{id:'search',target:'list.search',title:'Second search',description:'Second grid only.'}]}};
      host.innerHTML='<basis core="component.grid.grid" run="atclient" datamembername="second.rows" options="secondGuideOptions"></basis>';
      window.secondGuideWrapper=window.$bc.new().addFragment(host).setOptions({repositories:{'grid.grid':'/basiscore-grid/basiscore.grid.js'},sources:{'second.rows':[{id:'second',route:'Second route'}]}}).run();
      await window.secondGuideWrapper.basiscore.content.initializeTask;
      await Promise.all(window.secondGuideWrapper.GetComponentList().map(c=>c.onInitialized));
    });
    await page.locator('#second-guide-grid [data-guide-start]').waitFor();
    // Use the public component API to start a second guide while the first is modal.
    await page.locator('[data-grid-slot=material] [data-guide-start]').click();
    await page.evaluate(()=>window.secondGuideWrapper.GetComponentList().find(c=>c.manager?.gridInstance).manager.gridInstance.materialTemplate.guide.start());
    assert.equal(await page.locator('.bc-guide').count(),1);
    assert.equal(await page.locator('.bc-guide-title').innerText(),'Second search');
    const secondSearch=await page.locator('#second-guide-grid .search-field input').boundingBox();
    const secondRing=await page.locator('.bc-guide-ring').boundingBox();
    assert(Math.abs(secondSearch.x-secondRing.x-5)<2);
    await page.evaluate(()=>window.secondGuideWrapper.basiscore.content.disposeAsync());
    assert.equal(await page.locator('.bc-guide').count(),0);

    const touchContext = await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
    try {
      const phone = await touchContext.newPage();
      phone.on('pageerror', error=>errors.push(error.message));
      await phone.goto((process.env.GRID_STUDIO_URL || 'http://localhost:18477/component/configuration/mobileDesign/template4.html'),{waitUntil:'domcontentloaded'});
      await phone.locator('[data-guide-start]').waitFor();
      await phone.locator('button[data-action=view][data-value=mobile]').tap();
      await phone.locator('[data-action=theme]').tap();
      await phone.locator('[data-guide-start]').waitFor();
      const help = await phone.locator('[data-guide-start]').boundingBox();
      assert(help.width>=44 && help.height>=44);
      await phone.locator('[data-guide-start]').tap();
      await phone.locator('.bc-guide-next').tap();
      await phone.locator('.bc-guide-panel').waitFor({state:'visible'});
      await phone.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
      const touchPanel = await phone.locator('.bc-guide-panel').boundingBox();
      const touchRing = await phone.locator('.bc-guide-ring').boundingBox();
      assert(touchRing.y+touchRing.height < touchPanel.y || touchPanel.y+touchPanel.height < touchRing.y);
      await phone.screenshot({path:'/tmp/guide-mobile-dark.png'});
      await phone.setViewportSize({width:844,height:390});
      await phone.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
      const rotated = await phone.locator('.bc-guide-panel').boundingBox();
      assert(rotated.x>=0 && rotated.y>=0 && rotated.x+rotated.width<=845 && rotated.y+rotated.height<=391);
      await phone.locator('.bc-guide-skip').tap();
      assert.equal(await phone.locator('.bc-guide').count(),0);
    } finally { await touchContext.close(); }
    assert.deepEqual(errors,[]);
    console.log('Guide browser: native BasisCore, external targets, focus/Escape, skip/finish, missing targets, phone preview, mobile/landscape bounds and touch controls, state preservation, JSON validation, safe text, multi-grid isolation and disposal passed.');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exit(1);});
