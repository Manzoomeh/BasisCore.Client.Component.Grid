import assert from 'node:assert/strict';
import {build} from 'esbuild';

const result = await build({entryPoints:['src/datasets.ts'],bundle:true,write:false,platform:'node',format:'esm'});
const {datasetSchema,originalDatasets} = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
for (const dataset of originalDatasets) {
  assert(datasetSchema.safeParse(dataset).success);
  assert(!JSON.stringify(dataset).includes('guide'));
}
const full = {...structuredClone(originalDatasets[0]),guide:{id:1001},operationGuide:{description:'saved tutorial'}};
full.columns[0].guide={description:'saved column tutorial'};
const snapshot=JSON.stringify(full);
const core=datasetSchema.parse(full);
assert(!('guide' in core));
assert(!('operationGuide' in core));
assert(!('guide' in core.columns[0]));
assert.deepEqual(core.rows,full.rows);
assert.equal(JSON.stringify(full),snapshot,'Parsing the core edition must not mutate full-edition data');
assert(datasetSchema.safeParse({...full,rows:[]}).success);
assert(!datasetSchema.safeParse({...full,columns:[]}).success);
console.log('Core studio datasets: FA/EN samples, validation and non-mutating full-version import passed.');
