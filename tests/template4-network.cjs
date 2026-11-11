const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('playwright');
const root = path.join(__dirname, '..');
const origin = new URL(process.env.GRID_STUDIO_URL || 'http://localhost:18477/').origin;
const css = fs.readFileSync(path.join(__dirname, 'fixtures/LineIcons.css'));
const font = fs.readFileSync(path.join(root, 'src/asset/LineIcons.woff2'));
const bundle = fs.readFileSync(path.join(root, 'wwwroot/basiscore-grid/basiscore.grid.js'));
const launch = chromium.launch.bind(chromium);

// Test the shipped component with cached icon CSS/font, never a live backend or CDN.
chromium.launch = async (...args) => {
  const browser = await launch(...args);
  const create = browser.newContext.bind(browser);
  browser.newContext = async (...options) => {
    const context = await create(...options);
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin === origin) return url.pathname === '/basiscore-grid/basiscore.grid.js'
        ? route.fulfill({contentType:'application/javascript',body:bundle}) : route.continue();
      if (url.href === 'https://basispanel.ir/asset/css/LineIcons.css') return route.fulfill({contentType:'text/css',body:css});
      if (url.hostname === 'cdn.basiscore.net' && url.pathname.startsWith('/_fonts/LineIcons.')) return route.fulfill({contentType:'font/woff2',body:font});
      if (['fonts.googleapis.com','fonts.gstatic.com'].includes(url.hostname)) return route.fulfill({contentType:'text/css',body:''});
      throw new Error(`Unexpected external test request: ${url}`);
    });
    return context;
  };
  browser.newPage = async options => (await browser.newContext(options)).newPage();
  return browser;
};
