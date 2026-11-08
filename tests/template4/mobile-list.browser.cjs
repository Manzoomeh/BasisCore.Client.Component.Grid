const {chromium} = require('playwright');
const assert = require('node:assert/strict');

(async()=>{
  const browser = await chromium.launch({channel:process.env.BROWSER_CHANNEL || 'chrome',headless:true});
  const errors = [];
  const openMobile = async page => {
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto((process.env.GRID_STUDIO_URL || 'http://localhost:18477/component/configuration/mobileDesign/template4.html'),{waitUntil:'domcontentloaded'});
    await page.locator('[data-guide-start]').waitFor();
    await page.locator('[data-filter-mode]').selectOption('columns');
    await page.locator('.template-card[data-index="2"]').click();
    await page.locator('[data-view=mobile] .mobile-row').first().waitFor();
    return page.locator('[data-grid-slot=material]');
  };
  const checkBounds = async grid => {
    assert(await grid.locator('[data-view=mobile]').count() || await grid.locator('.mobile-row').count());
    assert(await grid.locator('.mobile-row-fields').first().evaluate(element=>{
      const fields=Array.from(element.children);
      return getComputedStyle(element).gridTemplateColumns.split(' ').length===1 && fields.every((field,index)=>!index||field.getBoundingClientRect().top>=fields[index-1].getBoundingClientRect().bottom);
    }));
    assert(await grid.locator('.mobile-rows').evaluate(element=>element.scrollWidth<=element.clientWidth+1));
    const footer = await grid.locator('.pagination').boundingBox();
    for (const button of await grid.locator('.pagination button:visible').all()) {
      const box = await button.boundingBox();
      assert(box.width>=44 && box.height>=44);
      assert(box.x>=footer.x && box.x+box.width<=footer.x+footer.width+1);
    }
    for (const button of await grid.locator('.preview-toolbar button:visible,.grid-section-header button:visible').all()) {
      const box = await button.boundingBox();
      assert(box.width>=44 && box.height>=44);
    }
  };
  try {
    // Presentation scenario: the narrow desktop preview must behave like a phone.
    const desktop = await browser.newPage({viewport:{width:1440,height:1100},reducedMotion:'reduce'});
    const preview = await openMobile(desktop);
    await checkBounds(preview);
    assert.equal(await preview.locator('.list-filter-bar .button').count(),0);
    assert((await preview.locator('.list-filter-bar').boundingBox()).height<90);
    await preview.scrollIntoViewIfNeeded();
    await preview.screenshot({path:'/tmp/mobile-list-preview.png'});
    await desktop.close();

    const context = await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
    const phone = await context.newPage();
    const grid = await openMobile(phone);
    const rows = grid.locator('.mobile-row');
    const quick = value => grid.locator(`[data-quick-filter="${value}"]`);
    const filter = name => grid.locator(`[data-panel-filter="${name}"]`);
    const advanced = grid.locator('.advanced-filter-button');

    // Read a row: every table field remains visible, in its original order.
    assert.deepEqual(await rows.first().locator('dt').allTextContents(),['ایرلاین','نوع هواپیما','کد مسیر','مدت سفر (دقیقه)','تاریخ ایجاد']);
    assert.equal(await rows.first().locator('.mobile-row-fields dd').count(),5);
    assert.equal(await rows.first().locator('[data-mobile-badge=status]').count(),1);
    assert.equal(await rows.first().locator('.mobile-row-fields time').count(),1);
    assert.equal(await rows.first().locator('.mobile-row-footer').count(),0);
    assert.equal(await rows.first().locator('details').count(),0);
    const selectTarget = await rows.first().locator('.mobile-row-select').boundingBox();
    assert(selectTarget.width>=44 && selectTarget.height>=44);
    await grid.evaluate(element=>element.scrollIntoView({block:'start'}));
    await phone.screenshot({path:'/tmp/mobile-list-390.png'});

    // Find a route: quick status + typed code, then an exact ISO date.
    await quick('active').tap();
    await advanced.tap();
    assert.equal(await advanced.getAttribute('aria-expanded'),'true');
    assert.equal(await filter('createdAt').getAttribute('type'),'date');
    assert.equal(await filter('status').evaluate(element=>element.tagName),'SELECT');
    await filter('code').fill('TK');
    assert.equal(await rows.count(),1);
    assert.match(await rows.innerText(),/TK-879/);
    await grid.evaluate(element=>element.scrollIntoView({block:'start'}));
    await phone.screenshot({path:'/tmp/mobile-list-filters.png'});
    await grid.locator('.clear-filters').tap();
    await filter('createdAt').fill('2025-06-18');
    assert.equal(await rows.count(),1);
    assert.match(await rows.innerText(),/EK-978/);
    await grid.locator('.clear-filters').tap();
    await advanced.tap();
    assert.equal(await advanced.getAttribute('aria-expanded'),'false');

    // Select, clear, sort and inspect without changing the source data.
    await grid.locator('.mobile-select-all input').check();
    assert.equal(await rows.locator('input:checked').count(),8);
    await rows.first().locator('.mobile-row-select').tap();
    assert.equal(await rows.locator('input:checked').count(),7);
    await grid.locator('.clear-selection').tap();
    assert.equal(await rows.locator('input:checked').count(),0);
    await grid.locator('.mobile-tools select').selectOption('duration:desc');
    assert.match(await rows.first().innerText(),/AF-739/);
    await grid.locator('.mobile-tools select').selectOption('');
    await rows.first().locator('.mobile-row-actions button').tap();
    await phone.locator('.dialog').waitFor();
    assert(await phone.locator('.dialog-fields input').first().evaluate(element=>element.readOnly));
    await phone.locator('.dialog [data-close-dialog]').first().tap();

    // Empty/recovery, page navigation and page size keep native BasisCore behavior.
    const search = grid.locator('.search-field input');
    await search.fill('not-a-route');
    assert.equal(await rows.count(),0);
    assert(await grid.locator('.mobile-select-all input').isDisabled());
    await search.fill('');
    await grid.locator('[data-page-action=last]').tap();
    assert.equal(await rows.count(),4);
    await grid.locator('[data-page-action=first]').tap();
    await grid.locator('.page-size select').selectOption('6');
    assert.equal(await rows.count(),6);
    await grid.locator('.page-size select').selectOption('8');
    await checkBounds(grid);

    await phone.locator('[data-action=theme]').tap();
    await grid.evaluate(element=>element.scrollIntoView({block:'start'}));
    await phone.screenshot({path:'/tmp/mobile-list-dark.png'});
    await phone.locator('[data-action=theme]').tap();
    await phone.setViewportSize({width:320,height:568});
    await checkBounds(grid);
    await grid.locator('.pagination').screenshot({path:'/tmp/mobile-list-footer-320.png'});

    // Many pages and unbroken content must not make controls or rows overflow.
    await phone.evaluate(()=>{
      const command=window.$bc.all.flatMap(wrapper=>wrapper.GetComponentList()).find(component=>component.manager?.gridInstance?.options.culture.template==='template4');
      const source=command.tryToGetSource('studio.rows').rows;
      const many=Array.from({length:96},(_,index)=>({...source[index%source.length],id:`stress-${index}`}));
      many[0]={...many[0],route:'مسیرطولانی'.repeat(20),airline:'VeryLongAirlineNameWithoutSpaces'.repeat(4)};
      command.manager.gridInstance.setSource(many);
    });
    await checkBounds(grid);
    assert(await rows.first().evaluate(element=>element.scrollWidth<=element.clientWidth+1));
    await grid.locator('[data-page-action=last]').tap();
    await grid.locator('[data-page-action=previous]').tap();
    await checkBounds(grid);
    await phone.setViewportSize({width:844,height:390});
    await checkBounds(grid);
    await context.close();
    assert.deepEqual(errors,[]);
    console.log('Mobile list scenario: phone preview, all fields, typed/status/date filters, touch selection, sorting, row details, empty/recovery, pagination, 320px/many-page bounds, dark and landscape passed.');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
