const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const {version} = require('../../package.json');
const url=process.env.GRID_STUDIO_URL || 'http://localhost:18477/component/configuration/mobileDesign/template4.html';

(async()=>{
  const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL || 'chrome'});
  try {
    const page=await browser.newPage({viewport:{width:1440,height:1100}});
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.addInitScript(()=>{
      const previous=[{id:'flight-routes',title:'Saved routes',direction:'rtl',filter:'row',
        columns:[{key:'route',label:'Route',type:'text',filterable:true,guide:{status:'active',id:'saved-column',description:'Saved column tutorial'}}],
        rows:[{id:7,route:'Saved route'}],guide:{id:1001}}];
      localStorage.setItem('basiscore-grid-template4-core-datasets-v1',JSON.stringify([{id:'core-only',rows:[{id:99}]}]));
      if(!localStorage.getItem('material-list-studio-datasets'))localStorage.setItem('material-list-studio-datasets',JSON.stringify(previous));
    });
    await page.goto(url,{waitUntil:'domcontentloaded'});
    await page.locator('[data-engine=basiscore-component] tbody tr').first().waitFor();
    const before=await page.evaluate(()=>localStorage.getItem('material-list-studio-datasets'));
    const coreBefore=await page.evaluate(()=>localStorage.getItem('basiscore-grid-template4-core-datasets-v1'));
    assert.equal(await page.locator('html').getAttribute('data-grid-edition'),'template4-guide');
    assert.equal(await page.locator('html').getAttribute('data-grid-version'),version);
    assert.equal(await page.locator('.release-version').innerText(),`Template 4 · ${version}`);
    assert.match(await page.locator('[data-grid-slot=material]').innerText(),/Saved route/);
    for(const view of ['table','mobile']) {
      await page.locator(`[data-action=view][data-value=${view}]`).click();
      await page.locator(`[data-view=${view}]`).waitFor();
      assert.equal(await page.locator('[data-guide-start]').count(),1);
      await page.locator('[data-guide-start]').click();
      assert.match(await page.locator('.bc-guide-description').innerText(),/Saved column tutorial/);
      await page.keyboard.press('Escape');
    }
    await page.locator('[data-action=workspace][data-value=config]').click();
    const editor=page.locator('textarea.json-editor');
    const dataset=JSON.parse(await editor.inputValue());
    assert.equal(dataset.guide.id,1001);
    assert.equal(dataset.columns[0].guide.id,'saved-column');
    dataset.title='Saved guide version';
    dataset.guide=false;
    await editor.fill(JSON.stringify(dataset));
    await page.locator('[data-action=apply]').click();
    await page.locator('.editor-message.success').waitFor();
    assert.equal(await page.evaluate(()=>localStorage.getItem('material-list-studio-datasets')),before);
    assert.equal(await page.evaluate(()=>localStorage.getItem('basiscore-grid-template4-core-datasets-v1')),coreBefore);
    assert(await page.evaluate(()=>localStorage.getItem('basiscore-grid-template4-guide-datasets-v1').includes('Saved guide version')));
    assert.equal(await page.locator('[data-guide-start],.bc-guide').count(),0);
    await page.reload();
    await page.locator('[data-engine=basiscore-component]').waitFor();
    assert.match(await page.locator('[data-grid-slot=material]').innerText(),/Saved guide version/);
    assert.equal(await page.locator('[data-guide-start],.bc-guide').count(),0);
    assert(await page.evaluate(()=>window.$bc.all.flatMap(wrapper=>wrapper.GetComponentList())
      .filter(component=>component.manager?.gridInstance).every(component=>!component.manager.gridInstance.materialTemplate.guide)));
    assert.equal(await page.evaluate(()=>localStorage.getItem('material-list-studio-datasets')),before);
    assert.deepEqual(errors,[]);
    assert.equal(await page.evaluate(()=>localStorage.getItem('basiscore-grid-template4-core-datasets-v1')),coreBefore);
    console.log('Guide edition: native mount, version identity, saved tutorials, opt-out without guide initialization, isolated persistent storage and unchanged Core/archive data passed.');
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
