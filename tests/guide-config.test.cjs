const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const source = fs.readFileSync('src/component/grid/GuideConfig.ts', 'utf8');
const compiled = ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.CommonJS}});
const api = {};
vm.runInNewContext(compiled.outputText, {exports: api});
const example = JSON.parse(fs.readFileSync('docs/guides/flight-routes.json', 'utf8'));
assert(api.isGuideConfig(example));
assert(api.isGuideConfig({...example, lid: 2}));
assert(api.isGuideConfig({...example, steps: [{id: 'create', target: 'page.create', title: 'Create', description: 'Outside the grid.'}]}));
for (const invalid of [null, {}, {...example, schemaVersion: 1}, {...example, revision: 0},
  {...example, id: '1'}, {...example, id: 1.5}, {...example, lid: '1'}, {...example, lid: 0},
  {...example, steps: []}, {...example, steps: [example.steps[0], example.steps[0]]},
  {...example, steps: [{...example.steps[0], target: '[data-x]'}]},
  {...example, steps: [{...example.steps[0], optional: 'true'}]},
  {...example, steps: [{...example.steps[0], description: 'x'.repeat(2001)}]},
  {...example, steps: Array.from({length: 51}, (_, i) => ({...example.steps[0], id: `s${i}`}))},
]) assert.equal(api.isGuideConfig(invalid), false);
console.log('Guide schema: integer id/lid, external targets, duplicate IDs, limits and invalid types passed.');
