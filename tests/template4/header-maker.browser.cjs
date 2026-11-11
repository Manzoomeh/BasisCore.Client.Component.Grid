const {chromium} = require('playwright');
const assert = require('node:assert/strict');

(async()=>{
  const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL || 'chrome',headless:true});
  try {
    const page=await browser.newPage({viewport:{width:1440,height:1100},reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto((process.env.GRID_STUDIO_URL || 'http://localhost:18477/component/configuration/mobileDesign/template4.html'));
    await page.locator('[data-engine=basiscore-component] tbody tr').first().waitFor();

    // Omitted/empty/non-callable headers leave the existing layout untouched.
    assert(await page.evaluate(()=>{
      const base={culture:{deviceId:1,template:'template4',labels:{}},filter:'advanced',process:'client',paging:false,rowNumber:'',columns:{name:{title:'Name'}}};
      for(const headerMaker of [undefined,()=>'',()=>{},'not executable']) {
        const host=document.createElement('div');document.body.append(host);
        const instance=new window.grid.Grid(host,{...base,headerMaker},()=>{},()=>{});
        instance.setSource([{name:'Existing row'}]);
        if(host.querySelector('.grid-section-header')||!host.querySelector('tbody').textContent.includes('Existing row')) return false;
        host.remove();
      }
      const host=document.createElement('div');document.body.append(host);
      const instance=new window.grid.Grid(host,{...base,headerMaker:element=>{
        const title=document.createElement('h3');title.textContent='DOM header';element.append(title);
      }},()=>{},()=>{});
      instance.setSource([]);
      const valid=host.querySelector('.grid-header-content h3').textContent==='DOM header'&&host.querySelector('.grid-section-header>.button');
      host.remove();return !!valid;
    }));

    // Use the real BasisCore component lifecycle, not a dashboard-only renderer.
    await page.evaluate(async()=>{
      window.headerCalls=0;window.headerClicks=0;
      const host=document.createElement('div');host.id='header-native';document.body.append(host);
      window.headerNativeOptions={
        culture:{deviceId:1,template:'template4',labels:{}},filter:'advanced',process:'client',paging:[2],rowNumber:'',
        columns:{name:{title:'Name',sort:true,filterData:{type:'text'}}},
        presentation:{filterMode:'columns'},
        headerMaker:element=>{
          window.headerCalls++;
          element.addEventListener('click',event=>{if(event.target.closest('[data-header-action]')) window.headerClicks++;});
          return '<h3><strong>Passengers</strong></h3><p>Custom <em>HTML</em> content</p><button type="button" data-header-action>Header action</button>';
        },
      };
      host.innerHTML='<basis core="component.grid.grid" run="atclient" datamembername="header.rows" options="headerNativeOptions"></basis>';
      window.headerRuntime=window.$bc.new().addFragment(host).setOptions({repositories:{'grid.grid':'/basiscore-grid/basiscore.grid.js'},sources:{'header.rows':[{name:'Alex'},{name:'Ben'},{name:'Cara'}]}}).run();
      await window.headerRuntime.basiscore.content.initializeTask;
      await Promise.all(window.headerRuntime.GetComponentList().map(command=>command.onInitialized));
    });
    const native=page.locator('#header-native');
    await native.locator('tbody tr').first().waitFor();
    assert.equal(await native.locator('.grid-header-content strong').innerText(),'Passengers');
    assert.equal(await native.locator('.grid-header-content em').innerText(),'HTML');
    assert.equal(await native.locator('.list-filter-bar:visible').count(),0);
    await native.locator('.grid-header-content').evaluate(element=>{element.dataset.preserved='yes';});
    await native.locator('.grid-section-header>.button').click();
    await native.locator('[data-panel-filter=name]').fill('Alex');
    assert.equal(await native.locator('tbody tr').count(),1);
    await native.locator('.clear-filters').click();
    await native.getByRole('button',{name:'مرتب‌سازی Name',exact:true}).click();
    await native.locator('[data-page-action=last]').click();
    await native.locator('[data-header-action]').click();
    await page.evaluate(()=>window.headerRuntime.setSource('header.rows',[{name:'Updated row'}]));
    await native.locator('tbody').filter({hasText:'Updated row'}).waitFor();
    await native.locator('[data-header-action]').click();
    assert.equal(await page.evaluate(()=>window.headerCalls),1);
    assert.equal(await page.evaluate(()=>window.headerClicks),2);
    assert.equal(await native.locator('.grid-header-content').getAttribute('data-preserved'),'yes');
    assert.equal(await native.locator('thead [data-column-filter]').count(),0);
    await page.evaluate(async()=>{await window.headerRuntime.basiscore.content.disposeAsync();document.getElementById('header-native').remove();});

    const grid=page.locator('[data-grid-slot=material]');
    assert.equal(await page.locator('.preview-title').count(),0);
    assert.equal(await grid.locator('.grid-header-content h3').innerText(),'لیست مسیرهای پروازی');
    await page.locator('[data-filter-mode]').selectOption('advanced');
    const header=grid.locator('.grid-section-header');
    await header.locator('>.button').click();
    assert(await grid.locator('.filter-panel').isVisible());
    await header.locator('>.button').click();
    const titleBox=await header.locator('.grid-header-content').boundingBox();
    const buttonBox=await header.locator('>.button').boundingBox();
    assert(buttonBox.x+buttonBox.width<=titleBox.x);
    assert(buttonBox.y<titleBox.y+titleBox.height&&titleBox.y<buttonBox.y+buttonBox.height);
    await grid.scrollIntoViewIfNeeded();
    await grid.screenshot({path:'/tmp/header-maker-desktop.png'});

    // JSON contributes escaped text; it cannot become executable callback HTML.
    await page.locator('[data-action=workspace][data-value=config]').click();
    const editor=page.locator('textarea.json-editor');
    const dataset=JSON.parse(await editor.inputValue());
    dataset.title='<img src=x onerror="window.headerInjection=true">';
    dataset.description='<strong>Literal description</strong>';
    await editor.fill(JSON.stringify(dataset));
    await page.locator('[data-action=apply]').click();
    await page.locator('.editor-message.success').waitFor();
    assert.equal(await grid.locator('.grid-header-content img,.grid-header-content strong').count(),0);
    assert.equal(await grid.locator('.grid-header-content h3').innerText(),dataset.title);
    assert.equal(await page.evaluate(()=>window.headerInjection),undefined);
    dataset.title='لیست مسیرهای پروازی با عنوان طولانی برای بررسی نمایش در تلفن همراه';
    await editor.fill(JSON.stringify(dataset));
    await page.locator('[data-action=apply]').click();
    await page.locator('.editor-message.success').waitFor();
    await page.locator('[data-action=workspace][data-value=preview]').click();
    await page.locator('[data-action=view][data-value=mobile]').click();
    for(const width of [320,390]) {
      await page.setViewportSize({width,height:844});
      await header.locator('.grid-header-content').waitFor();
      assert(await header.evaluate(element=>element.scrollWidth<=element.clientWidth+1));
      const box=await grid.locator('.advanced-filter-button').boundingBox();
      assert(box.height>=44&&box.width>=44&&box.x>=0&&box.x+box.width<=width);
      const text=await header.locator('.grid-header-content').boundingBox();
      assert(box.y>=text.y+text.height);
      assert.equal(await header.locator('.advanced-filter-button').count(),0);
      assert(await grid.locator('.preview-toolbar>.advanced-filter-button').isVisible());
    }
    await grid.evaluate(element=>element.scrollIntoView({block:'start'}));
    await page.screenshot({path:'/tmp/header-maker-mobile.png'});
    await page.locator('[data-action=theme]').click();
    await grid.evaluate(element=>element.scrollIntoView({block:'start'}));
    await page.screenshot({path:'/tmp/header-maker-mobile-dark.png'});
    assert.deepEqual(errors,[]);
    console.log('Header maker: native HTML/DOM callbacks, optional/empty compatibility, retained listeners across filter/sort/page/source updates, advanced placement, escaped JSON, and responsive RTL headers passed.');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
