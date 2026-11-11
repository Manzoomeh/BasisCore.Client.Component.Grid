import assert from 'node:assert/strict';
import {build} from 'esbuild';

const result = await build({entryPoints:['src/datasets.ts'],bundle:true,write:false,platform:'node',format:'esm'});
const {datasetSchema,originalDatasets,migrateSampleGuide} = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
for (const dataset of originalDatasets) {
  assert(datasetSchema.safeParse(dataset).success);
}
assert.equal(originalDatasets[0].guide.lid,1);
assert.equal(originalDatasets[3].guide.lid,2);
for(const dataset of [originalDatasets[0],originalDatasets[3]]) {
  assert(dataset.columns.every(column=>column.guide.status==='active'));
  assert.equal(dataset.operationGuide.steps.length,3);
}
const full = {...structuredClone(originalDatasets[0]),guide:{id:1001}};
const snapshot=JSON.stringify(full);
assert.deepEqual(datasetSchema.parse(full),full);
assert.equal(JSON.stringify(full),snapshot,'Parsing must not mutate archived tutorial data');
assert.equal(migrateSampleGuide(full),full,'User-authored guides must not be replaced');
for(const guide of [true,false,{},undefined])assert(datasetSchema.safeParse({...full,guide}).success);
for(const guide of [{id:'1001'},{lid:0},{revision:0},{steps:[{id:'bad'}]}])assert(!datasetSchema.safeParse({...full,guide}).success);
assert(!datasetSchema.safeParse({...full,operationGuide:{status:'active',id:'invalid',steps:[]}}).success);
assert(datasetSchema.safeParse({...full,rows:[]}).success);
assert(!datasetSchema.safeParse({...full,columns:[]}).success);
console.log('Guide studio datasets: FA/EN samples, column/action metadata, opt-in switches, invalid metadata rejection and non-mutating imports passed.');
