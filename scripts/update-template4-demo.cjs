const fs = require('node:fs');
const path = require('node:path');
const {createHash} = require('node:crypto');

const root = path.join(__dirname, '..');
const {version} = require('../package.json');
const manifestPath = path.join(root, 'wwwroot/template4/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const demo = path.join(root, 'demo/template4/dist');
const html = fs.readFileSync(path.join(demo, 'index.html'), 'utf8');
const paths = [...fs.readdirSync(path.join(demo, 'assets')).map(name => `/assets/${name}`),
  '/basiscore/basiscore.js', '/basiscore-grid/basiscore.grid.js', '/basisicon.ico'];
const files = paths.map(asset => {
  const source = asset.startsWith('/assets/') ? path.join(demo, asset)
    : asset === '/basiscore-grid/basiscore.grid.js' ? path.join(root, 'dist', asset)
    : path.join(root, 'wwwroot', asset);
  return {asset, content:fs.readFileSync(source)};
});
for (const {asset, content} of files) fs.writeFileSync(path.join(root, 'wwwroot', asset), content);
// Remove only assets owned by the previous manifest, never unrelated local snapshots.
for (const old of manifest.assets) if (old.path.startsWith('/assets/') && !paths.includes(old.path)) {
  fs.rmSync(path.join(root, 'wwwroot', old.path), {force:true});
}
fs.writeFileSync(path.join(root, 'wwwroot', manifest.entry), html);
manifest.version = version;
manifest.edition = 'template4-core';
manifest.source = 'demo/template4';
manifest.assets = files.map(({asset,content}) => ({path:asset,sha256:createHash('sha256').update(content).digest('hex')}));
manifest.componentSource = 'src/StudioLoader.ts';
manifest.componentBuild = 'npm run build';
manifest.shellSource = 'demo/template4/src';
manifest.shellBuild = 'npm --prefix demo/template4 run build';
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Template 4 core ${version}: component, editable studio and manifest rebuilt.`);
