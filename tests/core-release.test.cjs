const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const pkg = JSON.parse(read('package.json'));
const lock = JSON.parse(read('package-lock.json'));
const manifest = JSON.parse(read('wwwroot/template4/manifest.json'));

assert.equal(pkg.version, '1.5.0-rc.1');
assert.equal(lock.version, pkg.version);
assert.equal(lock.packages[''].version, pkg.version);
assert.equal(manifest.version, pkg.version);
assert.equal(manifest.edition, 'template4-core');
assert.equal(manifest.shellSource, 'demo/template4/src');
assert(read('wwwroot/index.html').includes(`Grid ${pkg.version}`));
for (const file of ['src/component/grid/GridGuide.ts','src/component/grid/GuideConfig.ts','src/asset/guide.css']) {
  assert(!fs.existsSync(path.join(root,file)), `Unexpected Guide source: ${file}`);
}
const forbidden = /\bbc-guide\b|\bGridGuide\b|\bGuideConfig\b|\bguideTargets\b|data-guide-|guide-start-button/;
for (const file of ['dist/basiscore.grid.js','dist/basiscore.grid.min.js','dist/basiscore.grid.component.js',
  'dist/basiscore.grid.component.min.js','wwwroot/basiscore-grid/basiscore.grid.js']) {
  const bundle=read(file);
  assert(bundle.includes(pkg.version),`Missing version in ${file}`);
  assert(!forbidden.test(bundle),`Guide code/style leaked into ${file}`);
}
assert(fs.existsSync(path.join(root,pkg.types)),'Missing public declaration entry');
for (const file of ['dist/types/component/grid/IOptions.d.ts','dist/types/component/grid/MaterialTemplate.d.ts']) {
  assert(!/\bguide\b|Guide/.test(read(file)),`Guide API leaked into ${file}`);
}
assert(!fs.existsSync(path.join(root,'dist/types/component/grid/GridGuide.d.ts')));
console.log(`Core release ${pkg.version}: synchronized versions, production bundles/types without Guide and reproducible studio metadata passed.`);
