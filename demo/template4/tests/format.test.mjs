import assert from 'node:assert/strict';
import {build} from 'esbuild';

const result = await build({entryPoints:['src/format.ts'],bundle:true,write:false,platform:'node',format:'esm'});
const {formatValue} = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
const text = {key:'airline',label:'Airline',type:'text',valueIcons:{Airline:'icon:plane',Logo:'/logos/airline.png',Unsafe:'javascript:alert(1)',Remote:'//untrusted.test/a.png'}};
assert.match(formatValue('Airline',text,{}), /class="lni lni-plane"/);
assert.match(formatValue('Logo',text,{}), /src="\/logos\/airline\.png"/);
assert.equal(formatValue('Unsafe',text,{}),'Unsafe');
assert.equal(formatValue('Remote',text,{}),'Remote');
assert.equal(formatValue('<img>',text,{}),'&lt;img&gt;');
const date = {key:'date',label:'Date',type:'date'};
assert.match(formatValue('2025-06-18',date,{}), /۲۸ خرداد ۱۴۰۴/);
assert.equal(formatValue('invalid',date,{}),'—');
assert.match(formatValue('2025-06-18',date,{direction:'ltr'}), /Jun 18, 2025/);
assert.match(formatValue(1500,{type:'number'},{direction:'ltr'}), /1,500/);
assert.match(formatValue(1500,{type:'number'},{}), /۱٬۵۰۰/);
console.log('Format: shared icon glyph, safe image URL handling, escaped text and Persian date order passed.');
