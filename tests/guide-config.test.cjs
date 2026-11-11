const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const source = fs.readFileSync('src/component/grid/GuideConfig.ts', 'utf8');
const compiled = ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.CommonJS}});
const api = {};
vm.runInNewContext(compiled.outputText, {exports: api});
const example = JSON.parse(fs.readFileSync('docs/guides/flight-routes.json', 'utf8'));
const step = {id: 'create', target: 'page.create', title: 'Create', description: 'Outside the grid.'};
const full = {...example, steps: [step]};
for (const option of [true,false,{}, {id:1001}, {title:'Column guide'}, {steps:[]}, full]) assert(api.isGuideOptions(option));
assert(api.isGuideConfig({title:'Column guide',steps:[step]}));
assert.equal(api.isGuideMetadata({id:1001}),false,'Database metadata still requires all identity/version fields');
for (const invalid of [undefined,null,0,1,'true','false',[],{id:'1001'},{id:0},{lid:0},{revision:0},
  {schemaVersion:1},{title:''},{steps:[{...step,target:'[onclick]'}]}]) {
  assert.equal(api.isGuideOptions(invalid),false);
}
assert.equal(api.isGuideConfig(true),false);
assert.equal(api.isGuideConfig(false),false);
assert(api.isGuideMetadata(example));
assert(api.isGuideMetadata({...example, lid: 2}));
assert(api.isGuideConfig(full));
assert(api.isGuideConfig({...example, steps: [{...step, target: 'list.search'}]}));
assert(api.isColumnGuideConfig({status: 'active', id: 'route-row', description: 'A route column.'}));
assert(api.isColumnGuideConfig({status: 'inactive', id: 'route-row', description: 'A route column.', optional: true}));
const columnStep = {id:'edit-route',target:'list.row.action.edit',title:'Edit',description:'Edit this route.',priority:20};
assert(api.isColumnGuideConfig({status:'active',id:'operation',priority:10,steps:[columnStep]}));
assert(api.isColumnGuideConfig({status:'active',id:'operation',description:'Actions',steps:[columnStep]}));
assert(api.isColumnGuideConfig({status:'active',id:'route',steps:[{id:'route-detail',description:'Defaults to this column.'}]}));
assert(api.isGuideConfig({...full,steps:[{...step,priority:0}]}));
assert.equal(api.parseGuideActionTarget('list.row.action.edit').key, 'edit');
assert.equal(api.parseGuideActionTarget('list.bulk.action.delete').scope, 'bulk');
for (const target of ['list.row.actions', 'list.row.action.', 'list.row.action.a.b', 'list.row.action.[onclick]', 'page.action.edit']) {
  assert.equal(api.parseGuideActionTarget(target), null);
}
for (const invalid of [null, {}, {...example, schemaVersion: 1}, {...example, revision: 0},
  {...example, id: '1'}, {...example, id: 1.5}, {...example, lid: '1'}, {...example, lid: 0},
  {...full, steps: []}, {...full, steps: [step, step]},
  {...full, steps: [{...step, target: '[data-x]'}]},
  {...full, steps: [{...step, optional: 'true'}]},
  ...[-1,1.5,'10',null,Infinity,NaN].map(priority => ({...full,steps:[{...step,priority}]})),
  {...full, steps: [{...step, description: 'x'.repeat(2001)}]},
  {...full, steps: Array.from({length: 51}, (_, i) => ({...step, id: `s${i}`}))},
]) assert.equal(api.isGuideMetadata(invalid), false);
for (const invalid of [null, {}, {...full, steps: []},
  {status: 'pending', id: 'route', description: 'Route'},
  {status: 'active', id: 'route value', description: 'Route'},
  {status: 'active', id: 'route', description: ' '},
  {status: 'active', id: 'route', description: 'x'.repeat(2001)},
  {status: 'active', id: 'route', description: 'Route', optional: 'true'},
  {status: 'active', id: 'route', steps:[]},
  {status: 'active', id: 'route', steps:[columnStep,columnStep]},
  {status: 'active', id: 'route', steps:[{...columnStep,target:'[onclick]'}]},
  {status: 'active', id: 'route', steps:[{...columnStep,title:''}]},
  {status: 'active', id: 'route', steps:[{...columnStep,priority:-1}]},
  {status: 'active', id: 'route', priority:'10',description:'Route'},
  {status: 'active', id: 'route', steps:Array.from({length:51},(_,i)=>({...columnStep,id:`s${i}`}))},
]) assert.equal(api.isColumnGuideConfig(invalid), false);
console.log('Guide metadata, column steps, action targets and numeric priorities passed.');
