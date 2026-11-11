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
        columns:[{key:'route',label:'Route',type:'text',filterable:true,guide:{description:'saved column'}}],
        rows:[{id:7,route:'Saved route'}],guide:{id:1001},operationGuide:{id:'saved-operations'}}];
      if(!localStorage.getItem('material-list-studio-datasets'))localStorage.setItem('material-list-studio-datasets',JSON.stringify(previous));
    });
    await page.goto(url,{waitUntil:'domcontentloaded'});
    await page.locator('[data-engine=basiscore-component] tbody tr').first().waitFor();
    const before=await page.evaluate(()=>localStorage.getItem('material-list-studio-datasets'));
    assert.equal(await page.locator('html').getAttribute('data-grid-edition'),'template4-core');
    assert.equal(await page.locator('html').getAttribute('data-grid-version'),version);
    assert.equal(await page.locator('.release-version').innerText(),`Template 4 · ${version}`);
    assert.match(await page.locator('[data-grid-slot=material]').innerText(),/Saved route/);
    for(const view of ['table','mobile']) {
      await page.locator(`[data-action=view][data-value=${view}]`).click();
      await page.locator(`[data-view=${view}]`).waitFor();
      assert.equal(await page.locator('[data-guide-start],.bc-guide,[data-guide-column]').count(),0);
      assert(await page.evaluate(()=>window.$bc.all.flatMap(wrapper=>wrapper.GetComponentList())
        .filter(component=>component.manager?.gridInstance).every(component=>{
          const grid=component.manager.gridInstance;
          return !('guide' in grid.materialTemplate) && !('guide' in grid.options) &&
            Object.values(grid.options.columns).every(column=>!('guide' in column));
        })));
    }
    await page.locator('[data-action=workspace][data-value=config]').click();
    const editor=page.locator('textarea.json-editor');
    const dataset=JSON.parse(await editor.inputValue());
    assert(!('guide' in dataset)&&!('operationGuide' in dataset));
    dataset.title='Saved core version';
    await editor.fill(JSON.stringify(dataset));
    await page.locator('[data-action=apply]').click();
    await page.locator('.editor-message.success').waitFor();
    assert.equal(await page.evaluate(()=>localStorage.getItem('material-list-studio-datasets')),before);
    assert(await page.evaluate(()=>localStorage.getItem('basiscore-grid-template4-core-datasets-v1').includes('Saved core version')));
    await page.reload();
    await page.locator('[data-engine=basiscore-component]').waitFor();
    assert.match(await page.locator('[data-grid-slot=material]').innerText(),/Saved core version/);
    assert.equal(await page.evaluate(()=>localStorage.getItem('material-list-studio-datasets')),before);
    assert.deepEqual(errors,[]);
    console.log('Core edition: native mount, version identity, no guide runtime/UI/config, read-only full-version import and separate persistent storage passed.');
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
