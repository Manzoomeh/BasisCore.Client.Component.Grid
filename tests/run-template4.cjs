const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');

for (const name of fs.readdirSync(path.join(__dirname, 'template4')).filter(name => name.endsWith('.browser.cjs')).sort()) {
  execFileSync(process.execPath, ['--require', path.join(__dirname, 'template4-network.cjs'),
    path.join(__dirname, 'template4', name)], {stdio: 'inherit'});
}
