const fs = require('node:fs');
const path = require('node:path');
const {createHash} = require('node:crypto');

const root = path.join(__dirname, '..');
// shortcut: the studio shell is a compiled snapshot; import its source before changing the dashboard build here.
const asset = '/basiscore-grid/basiscore.grid.js';
const bundle = fs.readFileSync(path.join(root, 'dist', asset));
const manifestPath = path.join(root, 'wwwroot/template4/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const record = manifest.assets.find(item => item.path === asset);
if (!record) throw new Error('Template 4 component is missing from the manifest');
fs.copyFileSync(path.join(root, 'dist', asset), path.join(root, 'wwwroot', asset));
record.sha256 = createHash('sha256').update(bundle).digest('hex');
manifest.componentSource = 'src/StudioLoader.ts';
manifest.componentBuild = 'webpack --mode=production';
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log('Template 4 demo component rebuilt from this repository; manifest updated.');
