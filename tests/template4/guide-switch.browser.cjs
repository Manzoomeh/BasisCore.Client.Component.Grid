const assert = require('node:assert/strict');
const fs = require('node:fs');
const {chromium} = require('playwright');
const base = process.env.GRID_STUDIO_URL || 'http://localhost:18477/';
const url = new URL('/component/configuration/mobileDesign/action-guides.html',base).href;
const fixture = fs.readFileSync('wwwroot/component/configuration/mobileDesign/action-guides.html','utf8');
const search = {id:'search',target:'list.search',title:'Search',description:'Find a route.',priority:0};
const cases = [
  {name:'true',guide:true,enabled:true},
  {name:'empty object',guide:{},enabled:true},
  {name:'empty global steps with column steps',guide:{steps:[]},enabled:true},
  {name:'partial metadata',guide:{id:1001},enabled:true},
  {name:'full metadata',guide:{schemaVersion:2,id:1001,lid:1,revision:1,title:'Routes'},enabled:true},
  {name:'global steps',guide:{title:'Custom guide',steps:[search]},enabled:true,first:'Search'},
  {name:'false',guide:false,enabled:false},
  {name:'missing',enabled:false},
  {name:'null',guide:null,enabled:false},
  {name:'invalid boolean string',guide:'true',enabled:false},
  {name:'invalid object metadata',guide:{id:'1001'},enabled:false},
  {name:'invalid array',guide:[],enabled:false},
  {name:'true without steps',guide:true,noSteps:true,enabled:false},
  {name:'object without steps',guide:{},noSteps:true,enabled:false},
  {name:'empty global steps without column steps',guide:{steps:[]},noSteps:true,enabled:false},
  {name:'inactive columns',guide:true,inactive:true,enabled:false},
  {name:'global-only',guide:{steps:[search]},noSteps:true,enabled:true,first:'Search'},
];
(async () => {
  const browser = await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL || 'chrome'});
  try {
    for (const viewport of [{width:1280,height:900},{width:390,height:844}]) {
      for (const scenario of cases) {
        const page = await browser.newPage({viewport});
        const errors=[];
        page.on('pageerror',error=>errors.push(error.message));
        await page.route('https://basispanel.ir/asset/css/LineIcons.css',route=>route.fulfill({contentType:'text/css',body:''}));
        const configure = (scenario.guide===undefined ? 'delete options.guide;' : `options.guide=${JSON.stringify(scenario.guide)};`) +
          (scenario.noSteps ? 'Object.values(options.columns).forEach(column=>delete column.guide);' : '') +
          (scenario.inactive ? 'Object.values(options.columns).forEach(column=>column.guide.status="inactive");' : '');
        await page.route(url,route=>route.fulfill({contentType:'text/html',body:fixture.replace('var host=',`${configure}\nvar host=`)}));
        await page.goto(url,{waitUntil:'domcontentloaded'});
        await page.locator('#grid tbody tr').first().waitFor();
        if(viewport.width===390)await page.getByRole('button',{name:'موبایل',exact:true}).click();
        const button=page.locator('[data-guide-start]');
        assert.equal(await button.count(),scenario.enabled ? 1 : 0,`${scenario.name} at ${viewport.width}`);
        if(scenario.enabled) {
          assert(await button.isEnabled());
          await button.click();
          assert.equal(await page.locator('.bc-guide-title').innerText(),scenario.first || 'مسیر');
          if(scenario.guide===true) {
            const identity=await page.evaluate(()=>{
              const grid=window.$bc.all.flatMap(w=>w.GetComponentList()).find(c=>c.manager?.gridInstance).manager.gridInstance;
              return grid.materialTemplate.guide.config.id;
            });
            assert.equal(identity,undefined,'Boolean mode must not manufacture a database ID');
          }
          await page.keyboard.press('Escape');
          assert.equal(await page.locator('.bc-guide').count(),0);
        }
        assert.deepEqual(errors,[],scenario.name);
        await page.close();
      }
    }
    // The actual studio JSON editor must preserve booleans/partial objects through validation and reload.
    const studio=await browser.newPage({viewport:{width:1280,height:900}});
    const errors=[];
    studio.on('pageerror',error=>errors.push(error.message));
    await studio.route('https://basispanel.ir/asset/css/LineIcons.css',route=>route.fulfill({contentType:'text/css',body:''}));
    await studio.goto(new URL('/component/configuration/mobileDesign/template4.html',base).href,{waitUntil:'domcontentloaded'});
    await studio.locator('[data-guide-start]').waitFor();
    for(const guide of [true,false,{},undefined]) {
      await studio.locator('button[data-action=workspace][data-value=config]').click();
      const editor=studio.locator('textarea.json-editor');
      const dataset=JSON.parse(await editor.inputValue());
      if(guide===undefined)delete dataset.guide;
      else dataset.guide=guide;
      await editor.fill(JSON.stringify(dataset));
      await studio.locator('[data-action=apply]').click();
      await studio.locator('.editor-message.success').waitFor();
      assert.deepEqual(JSON.parse(await editor.inputValue()).guide,guide);
      const expected=guide===false || guide===undefined ? 0 : 1;
      assert.equal(await studio.locator('[data-guide-start]').count(),expected);
      if(expected) {
        await studio.locator('[data-guide-start]').click();
        assert.equal(await studio.locator('.bc-guide-title').innerText(),'مسیر پرواز');
        await studio.keyboard.press('Escape');
      }
      await studio.reload({waitUntil:'domcontentloaded'});
      await studio.locator('[data-grid-slot=material] tbody tr').first().waitFor();
      assert.equal(await studio.locator('[data-guide-start]').count(),expected,'Saved guide switch must survive reload');
    }
    assert.deepEqual(errors,[]);
    await studio.close();
    console.log(`Guide switch: ${cases.length*2} native desktop/mobile cases and studio JSON/reload passed; true/object enable configured steps, false/missing/empty tours hide the button, invalid metadata stays rejected.`);
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
