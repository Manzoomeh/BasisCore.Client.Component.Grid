const {chromium} = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({channel:process.env.BROWSER_CHANNEL || 'chrome',headless:true});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1100},reducedMotion:'reduce',acceptDownloads:true});
    const errors = [];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto((process.env.GRID_STUDIO_URL || 'http://localhost:18477/component/configuration/mobileDesign/template4.html'));
    await page.locator('[data-engine=basiscore-component] tbody tr').first().waitFor();

    const result = await page.evaluate(() => {
      const check = (condition,message) => {if (!condition) throw new Error(message);};
      let checks = 0;
      const test = (condition,message) => {check(condition,message);checks++;};
      const create = (options={}) => {
        const host = document.createElement('div');
        host.style.cssText='width:700px;max-width:100%';document.body.append(host);
        const events = [];
        const grid = new window.grid.Grid(host,{
          culture:{deviceId:1,template:'template4',labels:{}},filter:'row',process:'client',paging:[2],
          direction:'rtl',rowNumber:'#',sorting:true,selectable:'multi',selectAll:true,
          columns:{name:{title:'Name',width:'200px'},status:{title:'Status',filterData:{type:'select',fixValues:[{id:'active',value:'Active'},{id:'inactive',value:'Inactive'}]}},date:{title:'Date',filterData:{type:'text',inputType:'date'}},amount:{title:'Amount',filterData:{type:'text',inputType:'number'}},other:{title:'Other',filter:false}},
          presentation:{search:false,rowActions:true},...options,
        },data=>events.push(data),()=>{});
        grid.setSource([{id:1,name:'Alpha',status:'active',date:'2026-11-08',amount:10},{id:2,name:'Beta',status:'inactive',date:'2026-11-09',amount:20},{id:3,name:'Gamma',status:'active',date:'2026-11-10',amount:30}],{from:0,total:3});
        return {host,grid,events,dispose(){grid.materialTemplate.dispose();host.remove();}};
      };
      for (const direction of ['rtl','ltr']) {
        const fixture = create({direction});
        const {host,grid,events} = fixture;
        const [titles,filters] = host.querySelectorAll('thead tr');
        test(titles.children.length===filters.children.length,'Header/filter column alignment');
        test(!titles.querySelector('.header-filter')&&titles.textContent.includes('Name'),'Column titles remain independent');
        test(getComputedStyle(titles.children[2]).height==='48px','Independent title row height');
        test(getComputedStyle(filters.children[2]).height==='48px','Independent filter row height');
        test(!filters.querySelector('[data-column-filter=other]'),'Column filter eligibility');
        test(getComputedStyle(host.querySelector('.preview-toolbar')).display==='none','No empty toolbar');
        const scroll=host.querySelector('.table-wrap');scroll.scrollLeft=direction==='rtl'?-120:120;
        const left=scroll.scrollLeft;
        let input=host.querySelector('[data-column-filter=name]');
        input.focus({preventScroll:true});input.value='Al';input.setSelectionRange(2,2);input.dispatchEvent(new Event('input'));
        input=host.querySelector('[data-column-filter=name]');
        test(host.querySelectorAll('tbody tr').length===1&&document.activeElement===input&&input.selectionStart===2,'Filtering retains focus/caret');
        test(host.querySelector('.table-wrap').scrollLeft===left,'Filtering retains horizontal scroll');
        const count=events.length;
        grid.materialTemplate.updatePresentation({showHeaderFilters:false});
        test(host.querySelector('.header-filters-row').hidden&&events.length===count,'Hiding filters does not issue a request');
        test(grid.materialTemplate.captureState().filters.name==='al','Hidden filters retain state');
        grid.materialTemplate.updatePresentation({showHeaderFilters:true});
        test(host.querySelector('[data-column-filter=name]').value==='al','Showing filters restores values');
        host.querySelector('[data-filter-column=name] .clear-header-filter').click();
        test(!grid.materialTemplate.captureState().filters.name&&host.querySelectorAll('tbody tr').length===2,'Per-column clear uses existing filtering/paging');
        test(document.activeElement.dataset.columnFilter==='name','Clear returns focus to the filter');
        test(host.querySelector('[data-column-filter=date]').type==='date'&&host.querySelector('[data-column-filter=amount]').inputMode==='decimal','Date/number filter types');
        host.querySelector('tbody input').click();
        test(host.querySelector('.selection-summary').style.display!== 'none'&&host.querySelector('.selection-count').textContent.includes('1'),'Selection summary');
        test(getComputedStyle(host.querySelector('.preview-toolbar')).display!=='none','Selection reveals toolbar');
        host.querySelector('.clear-selection').click();
        test(grid.getSelectedRows().length===0&&host.querySelector('.selection-summary').style.display==='none','Clear selection');
        fixture.dispose();
      }
      const legacy=create({presentation:{filterMode:'header'}});
      test(legacy.host.querySelectorAll('thead tr').length===1&&legacy.host.querySelector('[data-column-filter=name]').placeholder==='Name','Explicit legacy header replacement remains');
      legacy.grid.materialTemplate.updatePresentation({showHeaderFilters:true});
      test(legacy.host.querySelectorAll('thead tr').length===2,'Explicit separate-row opt-in also works with legacy control types');
      legacy.dispose();

      const popover=Object.getOwnPropertyDescriptor(HTMLElement.prototype,'showPopover');
      Object.defineProperty(HTMLElement.prototype,'showPopover',{configurable:true,value:undefined});
      try {
        const fallback=create({columns:{name:{title:'Name',cellMaker:()=>'<div class="iconsOperations"><button class="icon" type="button">Actions</button><div class="iconsDetail">Legacy menu</div></div>'}}});
        fallback.host.querySelector('.iconsOperations').classList.add('show');
        test(!fallback.host.querySelector('.iconsDetail').hasAttribute('popover'),'Browsers without Popover retain legacy menus');
        fallback.dispose();
      } finally {
        if(popover) Object.defineProperty(HTMLElement.prototype,'showPopover',popover);
        else delete HTMLElement.prototype.showPopover;
      }

      const sorted=create({defaultSort:{name:'name',sort:'desc'}});
      test(sorted.host.querySelector('tbody tr').textContent.includes('Gamma'),'Existing defaultSort option');sorted.dispose();
      for(const filter of ['simple','none','advanced']) {
        const plain=create({filter});
        test(getComputedStyle(plain.host.querySelector('thead th:nth-child(3)')).height==='50px','Headers without inline filters remain compact');
        plain.dispose();
      }
      for (const noData of [false,'Custom empty',(cell)=>{cell.innerHTML='<strong>Custom callback</strong>';}]) {
        const empty=create({noData});empty.grid.setSource([]);
        test(noData===false?!empty.host.querySelector('.empty-state'):empty.host.querySelector('.empty-state').textContent.includes(typeof noData==='string'?noData:'Custom callback'),'Existing noData option');
        empty.dispose();
      }
      for (const view of ['table','mobile']) for (const process of ['client','server','mix']) {
        const refresh=create({process,refresh:true,presentation:{view,search:false},
          ProcessActionType:{search:'server',paging:'server',sort:'server'}});
        refresh.events.length=0;
        refresh.host.querySelector('.refresh-button').click();
        test(refresh.events.length===1,`${view}/${process}: button emits one refresh callback`);
        const expected=JSON.stringify(refresh.events[0]);
        refresh.events.length=0;
        // Existing panel widgets click this span after editing/deleting a record.
        const element=refresh.host.querySelector('div[data-bc-refresh-container]');
        element.querySelector('span').click();
        test(refresh.events.length===1&&JSON.stringify(refresh.events[0])===expected,
          `${view}/${process}: legacy refresh selector preserves callback payload/encoding`);
        test(refresh.host.querySelectorAll('[data-bc-refresh-container]').length===1,
          `${view}/${process}: only one refresh control exists`);
        if(view==='mobile') {
          const button=refresh.host.querySelector('.refresh-button');
          test(getComputedStyle(element).order==='2'&&getComputedStyle(button).borderRadius==='9px'&&
            getComputedStyle(button).marginInlineStart==='0px','Mobile refresh keeps its toolbar order/style');
        }
        refresh.dispose();
        const disabled=create({refresh:false,presentation:{view,search:false}});
        test(!disabled.host.querySelector('[data-bc-refresh-container], .refresh-button'),
          `${view}/${process}: refresh:false renders no legacy or new trigger`);
        disabled.dispose();
      }
      for (const process of ['server','mix']) {
        const options={process,ProcessActionType:{search:'server',paging:'server',sort:'server'}};
        const simple=create({...options,filter:'simple',presentation:{search:true},refresh:true});
        simple.events.length=0;
        const input=simple.host.querySelector('.search-field input');input.value='Beta';input.dispatchEvent(new Event('input'));
        test(simple.events.at(-1).filter==='beta'&&simple.events.at(-1).pageNumber===1,'Server simple-search string payload');
        const snapshot=simple.grid.materialTemplate.captureState();simple.grid.materialTemplate.restoreState(snapshot);
        test(simple.events.at(-1).filter==='beta','Server search state restoration');
        simple.host.querySelector('.refresh-button').click();
        test(simple.events.at(-1).filter==='beta','Refresh uses the same native request callback');
        const payload=JSON.stringify(simple.events.at(-1)),beforeRefresh=simple.events.length;
        simple.host.querySelector('[data-bc-refresh-container]').querySelector('span').click();
        test(simple.events.length===beforeRefresh+1&&JSON.stringify(simple.events.at(-1))===payload,
          'Legacy refresh preserves active filters and native callback encoding');
        simple.dispose();
        const row=create(options);row.events.length=0;
        const filter=row.host.querySelector('[data-column-filter=name]');filter.value='Beta';filter.dispatchEvent(new Event('input'));
        test(row.events.at(-1).filter.name==='beta','Server/mixed column-filter object payload');
        const requests=row.events.length;row.grid.materialTemplate.updatePresentation({showHeaderFilters:false});
        test(row.events.length===requests,'Presentation-only changes never send requests');row.dispose();
      }
      return checks;
    });
    assert(result>=83);

    // A real BasisCore component, including form safety, old cellMaker menus and disposal.
    await page.addStyleTag({content:'.iconsOperations .iconsDetail{display:none;min-width:180px;padding:12px;border:1px solid #dbe1f1;border-radius:8px}.iconsOperations.show .iconsDetail{display:block}'});
    await page.evaluate(async()=>{
      const host=document.createElement('form');host.id='panel-native';document.body.append(host);
      window.panelSubmits=0;host.addEventListener('submit',event=>{event.preventDefault();window.panelSubmits++;});
      window.panelNativeOptions={
        culture:{deviceId:1,template:'template4',labels:{}},filter:'row',process:'client',paging:[2],rowNumber:'',refreshSourceId:'panel.refresh',selectedSourceId:'panel.selected',refresh:true,
        columns:{name:{title:'Name'},operation:{title:'Actions',filter:false,cellMaker:()=>'<div class="iconsOperations"><button class="icon" type="button" onclick="this.parentElement.classList.toggle(\'show\')">Actions</button><div class="iconsDetail"><button type="button" data-menu-action>View record</button></div></div>'}},
        presentation:{search:false},headerMaker:()=>'<h3>Native panel grid</h3><p>Reusable template</p>',
        export:[{type:'excel',tooltip:'Download',url:'/__test-grid-export.xlsx',fileName:'panel.xlsx'},{type:'excel',tooltip:'POST export',url:'/__test-grid-export-post.xlsx',method:'POST',data:'{}',fileName:'post.xlsx'},{type:'excel',tooltip:'Failed export',url:'/__test-grid-export-failed.xlsx'}],
      };
      host.innerHTML='<basis core="component.grid.grid" run="atclient" datamembername="panel.rows" resetsourceid="panel.reset" options="panelNativeOptions"></basis>';
      window.panelRuntime=window.$bc.new().addFragment(host).setOptions({repositories:{'grid.grid':'/basiscore-grid/basiscore.grid.js'},sources:{'panel.rows':[{name:'Alpha'},{name:'Beta'}]}}).run();
      await window.panelRuntime.basiscore.content.initializeTask;
      await Promise.all(window.panelRuntime.GetComponentList().map(command=>command.onInitialized));
    });
    const native=page.locator('#panel-native');
    await native.locator('tbody tr').first().waitFor();
    await native.locator('tbody .iconsOperations>.icon').first().click();
    await page.waitForFunction(()=>document.querySelector('#panel-native .iconsDetail')?.matches(':popover-open'));
    const menu=native.locator('.iconsDetail').first();
    assert(await menu.evaluate(element=>{const r=element.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight&&element.contains(document.elementFromPoint(r.left+r.width/2,r.top+r.height/2));}));
    await page.keyboard.press('Escape');
    await page.waitForFunction(()=>!document.querySelector('#panel-native .iconsOperations').classList.contains('show'));
    await native.locator('tbody .iconsOperations>.icon').first().click();
    await page.waitForFunction(()=>document.querySelector('#panel-native .iconsDetail').matches(':popover-open'));
    await menu.dispatchEvent('scroll');
    assert(await menu.evaluate(element=>element.matches(':popover-open')));
    await native.locator('.table-wrap').dispatchEvent('scroll');
    await page.waitForFunction(()=>!document.querySelector('#panel-native .iconsDetail').matches(':popover-open'));
    await native.locator('.sort-button').first().click();
    await native.locator('.refresh-button').click();
    await native.locator('.refresh-button').press('Enter');
    await native.locator('.refresh-button').press('Space');
    assert.equal(await page.evaluate(()=>window.panelSubmits),0);
    const requests=[];
    await page.route('**/__test-grid-export*.xlsx',async route=>{
      requests.push({method:route.request().method(),body:route.request().postData()});
      await route.fulfill({status:route.request().url().includes('failed')?500:200,contentType:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',body:'offline fixture'});
    });
    for (const [name,file] of [['Download','panel.xlsx'],['POST export','post.xlsx']]) {
      const download=page.waitForEvent('download');
      await native.getByRole('button',{name,exact:true}).click();
      assert.equal((await download).suggestedFilename(),file);
    }
    assert.equal(requests[0].method,'GET');
    assert.deepEqual(requests[1],{method:'POST',body:'{}'});
    await native.getByRole('button',{name:'Failed export',exact:true}).click();
    await native.locator('.export-status:visible').waitFor();
    assert(await native.getByRole('button',{name:'Failed export',exact:true}).isEnabled());
    await native.locator('tbody .iconsOperations>.icon').first().click();
    await page.waitForFunction(()=>document.querySelector('#panel-native .iconsDetail')?.matches(':popover-open'));
    await page.evaluate(()=>{
      window.oldPanelGrid=window.panelRuntime.GetComponentList().find(command=>command.manager?.gridInstance).manager.gridInstance;
      window.oldPanelMenu=document.querySelector('#panel-native .iconsDetail');
      window.panelRuntime.setSource('panel.reset',[{run:true}]);
    });
    await page.waitForFunction(()=>{
      const grid=window.panelRuntime.GetComponentList().find(command=>command.manager?.gridInstance)?.manager.gridInstance;
      return grid&&grid!==window.oldPanelGrid&&document.querySelector('#panel-native tbody tr');
    });
    assert(await page.evaluate(()=>!window.oldPanelMenu.matches(':popover-open')));
    assert.equal(await native.locator('.grid-section-header').count(),1);
    await native.locator('tbody .iconsOperations>.icon').first().click();
    await page.waitForFunction(()=>document.querySelector('#panel-native .iconsDetail')?.matches(':popover-open'));
    assert(await page.evaluate(async()=>{
      const menu=document.querySelector('#panel-native .iconsDetail');
      await window.panelRuntime.basiscore.content.disposeAsync();
      return !menu.matches(':popover-open');
    }));
    await native.evaluate(element=>element.remove());
    assert.equal(await page.locator('.bc-guide').count(),0);

    const grid=page.locator('[data-grid-slot=material] [data-bc-grid-template=template4]');
    assert.equal(await grid.evaluate(element=>getComputedStyle(element).borderRadius),'16px');
    assert.equal(await grid.evaluate(element=>getComputedStyle(element).backgroundColor),'rgb(255, 255, 255)');
    assert.equal(await grid.locator('thead tr').count(),2);
    assert(await grid.locator('.action-cell').first().evaluate(element=>getComputedStyle(element).minWidth==='48px'&&element.getBoundingClientRect().width<element.closest('table').getBoundingClientRect().width*.05));
    assert.equal(await grid.locator('.pagination').evaluate(element=>getComputedStyle(element).display),'flex');
    await grid.scrollIntoViewIfNeeded();
    await grid.screenshot({path:'/tmp/panel-transfer-desktop.png'});
    await page.locator('[data-action=theme]').click();
    await grid.screenshot({path:'/tmp/panel-transfer-dark.png'});
    await page.locator('[data-action=theme]').click();
    await page.setViewportSize({width:390,height:844});
    await page.locator('[data-action=view][data-value=mobile]').click();
    await grid.locator('.mobile-row').first().waitFor();
    assert.equal(await grid.locator('.pagination').evaluate(element=>getComputedStyle(element).display),'grid');
    await grid.evaluate(element=>element.scrollIntoView({block:'start'}));
    await page.screenshot({path:'/tmp/panel-transfer-mobile.png'});
    assert.deepEqual(errors,[]);
    console.log(`Panel transfer: ${result} compatibility checks, legacy refresh selectors/callbacks, native lifecycle, independent/legacy headers, selection, server/mixed payloads, form-safe controls, export success/failure, compact desktop and mobile styles passed.`);
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
