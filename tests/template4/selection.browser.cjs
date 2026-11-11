const {chromium} = require('playwright');
const assert = require('node:assert/strict');

(async()=>{
  const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL || 'chrome',headless:true});
  try {
    const page=await browser.newPage({viewport:{width:1440,height:1100},reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(process.env.GRID_STUDIO_URL || 'http://localhost:18477/component/configuration/mobileDesign/template4.html');
    const host=page.locator('[data-grid-slot=material]');
    const selected=()=>page.evaluate(()=>window.$bc.all.flatMap(runtime=>runtime.GetComponentList())
      .find(component=>component.manager?.gridInstance?.options.culture.template==='template4')
      .manager.gridInstance.getSelectedRows().map(row=>row.id));
    await host.locator('tbody input[type=checkbox]').first().check();
    await host.locator('tbody input[type=checkbox]').nth(1).check();
    assert.equal((await selected()).length,2);
    const single=page.locator('.template-card[data-index="1"]');
    assert.match(await single.innerText(),/انتخاب تکی/);
    await single.click();
    await host.locator('tbody input[type=radio]').first().waitFor();
    assert.equal(await single.getAttribute('aria-pressed'),'true');
    assert.equal(await host.locator('thead input[type=checkbox]').count(),0);
    assert.equal((await selected()).length,1,'Restoring multiple selections must keep at most one row');
    await host.locator('tbody input[type=radio]').nth(1).check();
    const previous=(await selected())[0];
    assert.equal(await host.locator('tbody input[type=radio]:checked').count(),1);
    await host.locator('[data-page-action=next]').click();
    await host.locator('tbody input[type=radio]').first().check();
    assert.equal((await selected()).length,1,'An off-page selection must not survive selecting another row');
    assert.notEqual((await selected())[0],previous);
    await host.locator('[data-page-action=previous]').click();
    assert.equal(await host.locator('tbody input[type=radio]:checked').count(),0);
    await host.locator('tbody input[type=radio]').first().check();
    await host.locator('tbody input[type=radio]').first().press('ArrowDown');
    assert.equal((await selected()).length,1,'Keyboard radio navigation must retain single selection');
    await host.scrollIntoViewIfNeeded();
    await host.screenshot({path:'/tmp/grid-single-desktop.png'});
    await page.locator('[data-action=view][data-value=mobile]').click();
    await host.locator('.mobile-row input[type=radio]').first().waitFor();
    assert(!await host.locator('.mobile-select-all').isVisible());
    await host.locator('.mobile-row input[type=radio]').nth(2).check();
    assert.equal((await selected()).length,1);
    const radio=host.locator('.mobile-row input[type=radio]').nth(2);
    assert.equal(await radio.evaluate(element=>getComputedStyle(element).borderRadius),'50%');
    await page.setViewportSize({width:390,height:844});
    await host.scrollIntoViewIfNeeded();
    await page.screenshot({path:'/tmp/grid-single-mobile.png'});
    await page.setViewportSize({width:1440,height:1100});
    await page.locator('.template-card[data-index="5"]').click();
    await host.locator('tbody input[type=checkbox]').first().waitFor();
    assert.equal(await single.getAttribute('aria-pressed'),'false');
    await host.locator('tbody input[type=checkbox]').first().check();
    await host.locator('tbody input[type=checkbox]').nth(1).check();
    assert((await selected()).length>=2,'Multi-selection must remain available');

    await page.evaluate(()=>{
      const check=(condition,message)=>{if(!condition)throw new Error(message);};
      const create=selectable=>{
        const host=document.createElement('div');document.body.append(host);
        const events=[];
        const grid=new window.grid.Grid(host,{
          culture:{deviceId:1,template:'template4',labels:{}},process:'client',filter:'none',
          paging:[1],rowNumber:'',selectable,selectAll:true,
          columns:{name:{title:'Name'}},presentation:{search:false},
        },()=>{},rows=>events.push(rows.map(row=>row.id)));
        const source=[{id:1,name:'One'},{id:2,name:'Two'},{id:3,name:'Three'}];
        grid.setSource(source);
        return {host,grid,source,events,dispose(){grid.materialTemplate.dispose();host.remove();}};
      };
      const first=create('single'),second=create('single');
      check(!first.host.querySelector('thead input'),'Single mode must ignore selectAll:true');
      first.host.querySelector('tbody input').click();
      second.host.querySelector('tbody input').click();
      check(first.grid.getSelectedRows().length===1&&second.grid.getSelectedRows().length===1,'Independent grids must not share a radio group');
      first.host.querySelector('[data-page-action=next]').click();
      first.host.querySelector('tbody input').click();
      check(JSON.stringify(first.events.at(-1))==='[2]','Selection callback must contain only the new off-page selection');
      first.grid.setSelectedRows(first.source);
      check(JSON.stringify(first.events.at(-1))==='[1]','Programmatic single selection must keep only the first row');
      first.grid.materialTemplate.updatePresentation({view:'mobile'});
      check(first.host.querySelector('input[type=radio]')&&!first.host.querySelector('.mobile-select-all').getClientRects().length,'Single mode must work without mobile select-all');
      first.grid.setSelectedRows([]);
      check(!first.grid.getSelectedRows().length,'Clearing single selection must work');
      first.dispose();second.dispose();
      for(const mode of ['none',false]) {
        const fixture=create(mode);
        check(!fixture.host.querySelector('tbody input'),'Disabled selection must not render controls');
        fixture.dispose();
      }
    });
    assert.deepEqual(errors,[]);
    console.log('Selection: native BasisCore radio preset, multi-to-single restore, cross-page/keyboard selection, callbacks, API limits, independent grids, desktop/mobile and unchanged multi/none modes passed.');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
