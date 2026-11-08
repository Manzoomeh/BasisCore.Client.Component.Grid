const {chromium} = require('playwright');
const assert = require('node:assert/strict');

(async()=>{
  const browser = await chromium.launch({channel:process.env.BROWSER_CHANNEL || 'chrome',headless:true});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1100},reducedMotion:'reduce'});
    const errors = [];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto((process.env.GRID_STUDIO_URL || 'http://localhost:18477/component/configuration/mobileDesign/template4.html'));
    await page.locator('[data-guide-start]').waitFor();

    // Native options, not dashboard mapping: filter wins over every presentation style.
    const cases = await page.evaluate(()=>{
      const check = (condition,message)=>{if(!condition) throw new Error(message);};
      let cases=0;
      for(const filter of ['simple','row','none','advanced']) {
        for(const filterMode of [undefined,'panel','header','columns']) {
          for(const view of ['table','mobile']) {
            const host=document.createElement('div');document.body.append(host);
            const instance=new window.grid.Grid(host,{
              culture:{deviceId:1,template:'template4',labels:{advancedFilters:'Advanced filters',filters:'Column filters'}},
              filter,process:'client',paging:false,rowNumber:'',direction:'ltr',
              columns:{name:{title:'Name',filterData:{type:'text'}},status:{title:'Status',filterData:{type:'select'}},count:{title:'Count',filter:false}},
              presentation:{view,filterMode,quickFilter:'status'},
            },()=>{},()=>{});
            instance.setSource([{id:1,name:'TK one',status:'active',count:1},{id:2,name:'TK two',status:'inactive',count:2},{id:3,name:'Other',status:'active',count:3}]);
            const headerCount=host.querySelectorAll('thead [data-column-filter]').length;
            const toggle=host.querySelector('button.button');
            const visible=element=>!!element.getClientRects().length;
            check(headerCount===(filter==='row'&&view==='table'?2:0),`${filter}/${filterMode}/${view}: header eligibility`);
            if(filter==='advanced'||(filter==='row'&&view!=='table')) {
              check(visible(toggle),`${filter}/${view}: missing filter toggle`);
              check(toggle.textContent.includes(view==='mobile'?'فیلتر':filter==='advanced'?'Advanced filters':'Column filters'),'Wrong filter mode label');
              toggle.click();
              check(visible(host.querySelector('.filter-panel')),'Panel did not open');
              check(!host.querySelector('thead [data-column-filter]'),'Panel overlaps header filters');
              if(filter==='advanced'||view==='mobile') {
                const name=host.querySelector('[data-panel-filter=name]');
                check(name instanceof HTMLInputElement,'Mobile row filters must use typed inputs, including legacy header mode');
                name.value='TK';name.dispatchEvent(new Event('input'));
                check(instance.materialTemplate.captureState().filters.name==='tk','Typed text filter');
                const status=host.querySelector('[data-panel-filter=status]');
                status.value='active';status.dispatchEvent(new Event('change'));
                check(host.querySelectorAll('tbody tr,.mobile-row').length===1,'Text and exact status filters must combine');
                check(!host.querySelector('.active-filters,.filter-chip'),'Filtering must not render summary chips');
                host.querySelector('.clear-filters').click();
                check(host.querySelectorAll('tbody tr,.mobile-row').length===3,'Clear column filters');
              }
              if(view==='mobile') {
                check(host.dataset.bcFilterMode==='columns','Mobile must not expose an advanced or legacy header interface');
                instance.materialTemplate.updatePresentation({view:'table'});
                check(instance.options.filter===filter&&instance.options.presentation.filterMode===filterMode,'Switching views mutated the desktop filter configuration');
                check(host.querySelectorAll('thead [data-column-filter]').length===(filter==='row'?2:0),'Desktop filters were not restored');
                instance.materialTemplate.updatePresentation({view:'mobile'});
              }
            } else {
              check(!visible(toggle)&&!visible(host.querySelector('.filter-panel')),`${filter}: column panel must be hidden`);
            }
            if(filter==='simple'||filter==='none') check(host.querySelectorAll('[data-quick-filter]').length===0,'Disabled column filtering still has quick filters');
            const search=host.querySelector('.search-field input');
            search.value='Other';search.dispatchEvent(new Event('input'));
            check(host.querySelectorAll('tbody tr,.mobile-row').length===1,'Independent global search regressed');
            host.remove();cases++;
          }
        }
      }
      return cases;
    });
    assert.equal(cases,32);

    // Studio chooses the native flag, persists it and never enables both interfaces.
    const grid=page.locator('[data-grid-slot=material]');
    const mode=page.locator('[data-filter-mode]');
    await mode.selectOption('advanced');
    await grid.getByRole('button',{name:/فیلتر پیشرفته/}).click();
    assert.equal(await grid.locator('thead .header-filter').count(),0);
    await grid.locator('[data-panel-filter=code]').fill('TK');
    assert.equal(await grid.locator('tbody tr').count(),2);
    await grid.locator('[data-panel-filter=status]').selectOption('active');
    assert.equal(await grid.locator('tbody tr').count(),1);
    await grid.locator('.clear-filters').click();
    await grid.scrollIntoViewIfNeeded();
    await grid.screenshot({path:'/tmp/filter-modes-advanced-desktop.png'});
    await page.reload();
    await grid.getByRole('button',{name:/فیلتر پیشرفته/}).waitFor();
    assert.equal(await mode.inputValue(),'advanced');
    assert.equal(await grid.locator('thead .header-filter').count(),0);
    await page.locator('[data-action=workspace][data-value=config]').click();
    const editor=page.locator('textarea.json-editor');
    const dataset=JSON.parse(await editor.inputValue());
    assert.equal(dataset.filter,'advanced');
    dataset.filter='invalid';
    await editor.fill(JSON.stringify(dataset));
    await page.locator('[data-action=apply]').click();
    await page.locator('.editor-message.error').waitFor();
    await page.locator('[data-action=workspace][data-value=preview]').click();
    await mode.selectOption('columns');
    await grid.locator('thead [data-column-filter=route]').waitFor();
    assert(!await grid.locator('.filter-panel').isVisible());
    assert.equal(await grid.getByRole('button',{name:/فیلتر پیشرفته/}).count(),0);
    await grid.scrollIntoViewIfNeeded();
    await grid.screenshot({path:'/tmp/filter-modes-row-desktop.png'});
    for(const value of ['simple','none']) {
      await mode.selectOption(value);
      await page.waitForFunction(()=>!document.querySelector('thead .header-filter'));
      assert(!await grid.locator('.filter-panel').isVisible());
      assert.equal(await grid.locator('.advanced-filter-button:visible').count(),0);
    }
    await mode.selectOption('advanced');
    const stored=await page.evaluate(()=>localStorage.getItem('material-list-studio-datasets'));
    await page.setViewportSize({width:390,height:844});
    await page.locator('[data-action=view][data-value=mobile]').click();
    await grid.locator('.mobile-row').first().waitFor();
    assert.deepEqual(await mode.locator('option').evaluateAll(options=>options.map(option=>option.value)),['simple','row','none']);
    assert.equal(await mode.inputValue(),'row');
    assert.equal(await page.evaluate(()=>localStorage.getItem('material-list-studio-datasets')),stored);
    assert.equal(await grid.getByRole('button',{name:/فیلتر پیشرفته/}).count(),0);
    await grid.locator('.advanced-filter-button').click();
    assert.equal(await grid.locator('[data-column-filter]').count(),0);
    await grid.locator('[data-panel-filter=createdAt]').fill('2025-06-18');
    assert.equal(await grid.locator('.mobile-row').count(),1);
    await page.setViewportSize({width:1440,height:1100});
    await page.locator('[data-action=view][data-value=table]').click();
    await grid.locator('tbody tr').first().waitFor();
    assert.equal(await mode.inputValue(),'advanced');
    assert.equal(await grid.locator('tbody tr').count(),1);
    await grid.locator('.clear-filters').click();
    await mode.selectOption('header');
    await grid.locator('thead [data-column-filter=code]').waitFor();
    await page.locator('[data-action=view][data-value=mobile]').click();
    await grid.locator('.mobile-row').first().waitFor();
    assert.equal(await mode.inputValue(),'row');
    await grid.locator('[data-panel-filter=code]').fill('TK');
    await grid.locator('[data-panel-filter=status]').selectOption('active');
    assert.equal(await grid.locator('.mobile-row').count(),1);
    await mode.selectOption('row');
    await grid.locator('.mobile-row').first().waitFor();
    assert.equal(await grid.locator('.mobile-row').count(),1);
    const datasetAfter=await page.evaluate(()=>JSON.parse(localStorage.getItem('material-list-studio-datasets')).find(dataset=>dataset.id==='flight-routes'));
    assert.equal(datasetAfter.filter,'row');
    assert.equal(datasetAfter.features.filterMode,'header');
    await grid.locator('.clear-filters').click();
    await page.locator('[data-action=view][data-value=table]').click();
    await grid.locator('thead [data-column-filter=code]').waitFor();
    assert.equal(await mode.inputValue(),'header');
    await page.setViewportSize({width:390,height:844});
    await page.locator('[data-action=view][data-value=mobile]').click();
    await grid.locator('.mobile-row').first().waitFor();
    for(const value of ['simple','none']) {
      await mode.selectOption(value);
      await page.waitForFunction(()=>document.querySelector('[data-grid-slot=material] .advanced-filter-button').style.display==='none');
      assert(!await grid.locator('.filter-panel').isVisible());
    }
    await mode.selectOption('row');
    const mobileToggle=grid.locator('.advanced-filter-button');
    await mobileToggle.waitFor({state:'visible'});
    if(await mobileToggle.getAttribute('aria-expanded')!=='true') await mobileToggle.click();
    assert(await grid.locator('.filter-panel').isVisible());
    assert.equal(await grid.locator('[data-panel-filter=createdAt]').getAttribute('type'),'date');
    assert.equal(await grid.locator('.filter-panel').evaluate(element=>getComputedStyle(element).gridTemplateColumns.split(' ').length),2);
    await grid.evaluate(element=>element.scrollIntoView({block:'start'}));
    await page.screenshot({path:'/tmp/filter-modes-row-mobile.png'});
    await page.goto(new URL('/basiscore-grid/check.html', process.env.GRID_STUDIO_URL || 'http://localhost:18477/').href);
    await page.waitForFunction(()=>/native BasisCore.*checks passed|FAILED/.test(document.getElementById('result').textContent));
    assert.match(await page.locator('#result').innerText(),/^All \d+ checks passed; 4 native BasisCore/);
    assert.deepEqual(errors,[]);
    console.log('Filter modes: 32 native combinations, mobile row-only typed panel, exact selects, view/config preservation, desktop advanced, JSON persistence, global search and native/Classic checks passed.');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
