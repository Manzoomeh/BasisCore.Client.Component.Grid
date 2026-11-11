const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {moreIcon:moreIconDefinition} = JSON.parse(fs.readFileSync('src/asset/line-icons.json','utf8'));
const moreIcon = `<i class="lni ${moreIconDefinition.name}" style="font-size:${moreIconDefinition.size}px" aria-hidden="true"></i>`;

(async()=>{
  const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL || 'chrome',headless:true});
  const errors=[];
  try {
    const page=await browser.newPage({viewport:{width:1440,height:1100},reducedMotion:'reduce'});
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto((process.env.GRID_STUDIO_URL || 'http://localhost:18477/component/configuration/mobileDesign/template4.html'));
    await page.locator('[data-engine=basiscore-component] tbody tr').first().waitFor();
    await page.evaluate(()=>document.fonts.ready);
    assert(await page.locator('.lni').count()>0);
    assert(await page.evaluate(()=>Array.from(document.fonts).some(font=>font.family==='LineIcons'&&font.status==='loaded')),'BasisPanel LineIcons font must load');
    await page.evaluate(async moreIcon=>{
      window.rowCalls=[];window.bulkCalls=[];window.fallbackCalls=0;
      const host=document.createElement('section');host.id='mobile-card-native';host.style.cssText='width:420px;max-width:100%;margin:16px auto';document.body.append(host);
      window.mobileCardOptions={
        culture:{deviceId:1,template:'template4',labels:{searchPlaceholder:'جستجو در مسیرها…',selectedItems:'مسیر انتخاب شده'}},
        process:'client',filter:'row',paging:[2],selectable:'multi',selectAll:true,rowNumber:'',selectedSourceId:'card.selected',
        headerMaker:()=>'<h3>لیست مسیرهای پروازی</h3><p>مدیریت مسیرهای پروازی و برنامه حرکت ناوگان</p>',
        columns:{
          operation:{title:'<button type="button" data-bulk-action onclick="window.bulkCalls.push(window.mobileCardRuntime.GetComponentList()[0].manager.gridInstance.getSelectedRows().map(row=>row.id))">عملیات گروهی</button>',cellMaker:row=>row.id===3?'':`<div class="iconsOperations"><button type="button" class="icon" aria-label="عملیات ${row.id}" onclick="this.parentElement.classList.toggle('show')">${moreIcon}</button><div class="iconsDetail"><button type="button" data-row-action="${row.id}" onclick="window.rowCalls.push(${row.id})">ویرایش مسیر</button></div></div>`},
          route:{title:'مسیر پرواز'},airline:{title:'ایرلاین'},aircraft:{title:'نوع هواپیما'},code:{title:'کد مسیر'},
          duration:{title:'مدت سفر',filterData:{type:'text',inputType:'number'}},
          status:{title:'وضعیت',filterData:{type:'select'},cellMaker:(_row,value)=>`<span class="status-pill ${value==='active'?'status-success':'status-neutral'}"><span class="status-dot"></span>${value==='active'?'فعال':'غیرفعال'}</span>`},
        },
        presentation:{view:'mobile',titleKey:'route',badgeKey:'status',quickFilter:'status',search:true,rowActions:true,onRowAction:()=>window.fallbackCalls++},
      };
      host.innerHTML='<basis core="component.grid.grid" run="atclient" datamembername="card.rows" options="mobileCardOptions"></basis>';
      window.mobileCardRuntime=window.$bc.new().addFragment(host).setOptions({repositories:{'grid.grid':'/basiscore-grid/basiscore.grid.js'},sources:{'card.rows':[
        {id:1,route:'تهران ← دبی',airline:'Emirates',aircraft:'Airbus A320',code:'EK-978',duration:150,date:'2026-11-08',status:'active'},
        {id:2,route:'تهران ← استانبول',airline:'Turkish Airlines',aircraft:'Boeing 737',code:'TK-879',duration:180,date:'2026-11-09',status:'active'},
        {id:3,route:'شیراز ← دوحه',airline:'Qatar Airways',aircraft:'Airbus A350',code:'QR-477',duration:110,date:'2026-11-10',status:'inactive'},
      ]}}).run();
      await window.mobileCardRuntime.basiscore.content.initializeTask;
      await Promise.all(window.mobileCardRuntime.GetComponentList().map(command=>command.onInitialized));
    },moreIcon);
    await page.addStyleTag({content:'.iconsOperations .iconsDetail{display:none;min-width:150px;padding:10px;border:1px solid #dbe1f1;border-radius:8px}.iconsOperations.show .iconsDetail{display:block}'});
    const host=page.locator('#mobile-card-native');
    const grid=host.locator('[data-bc-grid-template=template4]');
    const rows=host.locator('.mobile-row');
    await rows.first().waitFor();
    assert.equal(await rows.first().locator('[data-mobile-primary=route]').count(),1);
    assert.equal(await rows.first().locator('[data-mobile-operation=operation]').count(),1);
    assert.equal(await rows.first().locator('.mobile-row-actions button.icon').count(),1);
    assert.deepEqual(await rows.first().locator('dt').allTextContents(),['ایرلاین','نوع هواپیما','کد مسیر','مدت سفر']);
    assert.equal(await rows.first().locator('[data-mobile-badge=status]').innerText(),'فعال');
    assert.equal(await rows.first().locator('.mobile-row-footer,time').count(),0);
    assert(!await rows.first().innerText().then(text=>text.includes('2026-11-08')));
    assert.equal(await rows.first().locator('a, .mobile-row-operations').count(),0);
    assert(!await host.getByText('مشاهده جزئیات',{exact:true}).count());
    assert(!await host.locator('[data-panel-filter=operation],.mobile-tools option[value^="operation:"]').count());
    assert.equal(await grid.locator('[data-guide-start]').count(),0);
    const search=await grid.locator('.search-field').boundingBox();
    const filter=await grid.locator('.advanced-filter-button').boundingBox();
    assert(Math.abs(search.y-filter.y)<2&&filter.x+filter.width<=search.x);
    await rows.first().locator('.mobile-row-actions .icon').click();
    await page.waitForFunction(()=>document.querySelector('#mobile-card-native .iconsDetail').matches(':popover-open'));
    await rows.first().locator('[data-row-action]').click();
    assert.deepEqual(await page.evaluate(()=>window.rowCalls),[1]);
    assert.equal(await page.evaluate(()=>window.fallbackCalls),0);
    await page.keyboard.press('Escape');
    await page.evaluate(()=>window.mobileCardRuntime.GetComponentList()[0].manager.gridInstance.materialTemplate.updatePresentation({rowActions:false}));
    assert.equal(await rows.first().locator('.mobile-row-actions button.icon').count(),1);
    await host.locator('.advanced-filter-button').click();
    await host.locator('[data-panel-filter=code]').fill('TK');
    assert.equal(await rows.count(),1);
    await host.locator('.clear-filters').click();
    await host.locator('.advanced-filter-button').click();
    await grid.evaluate(element=>element.scrollIntoView({block:'start'}));
    await grid.screenshot({path:'/tmp/mobile-card-default-preview.png'});

    await rows.first().locator('.mobile-row-select').click();
    await rows.nth(1).locator('.mobile-row-select').click();
    assert.equal(await rows.locator('.mobile-row-select input:checked').count(),2);
    assert(!await host.locator('.mobile-tools').isVisible());
    assert.match(await host.locator('.selection-count').innerText(),/۲ مسیر/);
    assert(await host.locator('[data-bulk-action]').isVisible());
    await host.locator('[data-bulk-action]').click();
    assert.deepEqual(await page.evaluate(()=>window.bulkCalls),[[1,2]]);
    await grid.screenshot({path:'/tmp/mobile-card-selected-preview.png'});
    await host.locator('.clear-selection').click();
    assert(await host.locator('.mobile-tools').isVisible());
    assert(!await host.locator('.selection-summary').isVisible());

    for(const width of [320,390,420]) {
      await page.setViewportSize({width,height:900});
      assert(await grid.evaluate(element=>element.scrollWidth<=element.clientWidth+1));
      assert(await rows.first().evaluate(element=>element.scrollWidth<=element.clientWidth+1));
      assert(await rows.first().locator('.mobile-row-fields').evaluate(element=>getComputedStyle(element).gridTemplateColumns.split(' ').length===1));
      for(const control of [grid.locator('.advanced-filter-button'),rows.first().locator('.mobile-row-select'),rows.first().locator('.mobile-row-actions .icon')]) {
        const box=await control.boundingBox();assert(box.width>=44&&box.height>=44);
      }
    }
    await page.setViewportSize({width:390,height:844});
    await grid.evaluate(element=>element.scrollIntoView({block:'start'}));
    await page.screenshot({path:'/tmp/mobile-card-phone.png'});
    await rows.first().locator('.mobile-row-select').click();
    await grid.evaluate(element=>element.scrollIntoView({block:'start'}));
    await page.screenshot({path:'/tmp/mobile-card-phone-selected.png'});
    await host.locator('.clear-selection').click();
    await host.locator('.mobile-tools select').selectOption('duration:asc');
    assert.match(await rows.first().innerText(),/QR-477/);
    assert.equal(await rows.first().locator('.mobile-row-actions button').count(),0);
    await host.locator('.mobile-tools select').selectOption('');
    await page.evaluate(()=>document.documentElement.dataset.theme='dark');
    await grid.evaluate(element=>element.scrollIntoView({block:'start'}));
    await page.screenshot({path:'/tmp/mobile-card-phone-dark.png'});
    await page.evaluate(()=>document.documentElement.dataset.theme='light');
    await page.evaluate(async()=>{await window.mobileCardRuntime.basiscore.content.disposeAsync();document.getElementById('mobile-card-native').remove();});

    // Imported JSON labels/operation values stay text, not executable application HTML.
    await page.setViewportSize({width:1440,height:1100});
    await page.locator('[data-action=workspace][data-value=config]').click();
    const editor=page.locator('textarea.json-editor');
    const dataset=JSON.parse(await editor.inputValue());
    dataset.columns.push({key:'operation',label:'<button onclick="window.injectedColumn=true">Unsafe</button>',type:'text'});
    dataset.columns.push({key:'unsafe',label:'<button onclick="window.injectedColumn=true">Unsafe</button>',type:'text'});
    dataset.rows.forEach(row=>{row.operation='<img src=x onerror="window.injectedColumn=true">';row.unsafe='<img src=x onerror="window.injectedColumn=true">';});
    await editor.fill(JSON.stringify(dataset));
    await page.locator('[data-action=apply]').click();
    await page.locator('.editor-message.success').waitFor();
    await page.locator('[data-action=workspace][data-value=preview]').click();
    await page.locator('[data-action=view][data-value=mobile]').click();
    const app=page.locator('[data-grid-slot=material]');
    await app.locator('[data-mobile-operation=operation]').first().waitFor();
    assert.equal(await app.locator('[onclick*="injectedColumn"],[onerror*="injectedColumn"],[data-mobile-operation] img[src$="/x"]').count(),0);
    assert.equal(await page.evaluate(()=>window.injectedColumn),undefined);
    await page.locator('[data-action=view][data-value=table]').click();
    assert.equal(await app.locator('thead button[onclick]').count(),0);
    assert.deepEqual(errors,[]);
    console.log('Mobile cards: native BasisCore, single-column fields, header badge/actions, no inferred date/footer/details link, real operation/bulk HTML callbacks, selection/default states, filters/sort, 320/390/420 bounds, touch targets, dark and inert imported JSON passed.');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
