const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const ts = require('typescript');

const root = path.join(__dirname, '..');
const baseline = process.env.GRID_BASE_REF || 'ede9f9a03aaf329c5e01d25d665fd1e53c88cfb1';
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'grid-compat-'));
const changedSharedFiles = new Set([
  'src/component/BasisCoreGridComponent.ts', 'src/component/grid/Grid.ts',
  'src/component/grid/GridRow.ts', 'src/component/grid/IOptions.ts',
  'src/component/paginate/ProcessManager.ts', 'src/component/paginate/PaginateProcessManager.ts',
]);
try {
  const original = execFileSync('git', ['archive', baseline], {cwd: root, maxBuffer: 32 * 1024 * 1024});
  execFileSync('tar', ['-x', '-C', temp], {input: original});
  fs.symlinkSync(path.join(root, 'node_modules'), path.join(temp, 'node_modules'), 'dir');
  const files = execFileSync('git', ['ls-tree', '-r', '--name-only', baseline, 'src', 'wwwroot/component'], {cwd: root, encoding: 'utf8'}).trim().split('\n');
  let unchanged = 0;
  for (const file of files) {
    if (changedSharedFiles.has(file)) continue;
    assert.deepEqual(fs.readFileSync(path.join(root, file)), fs.readFileSync(path.join(temp, file)), `Legacy file changed: ${file}`);
    unchanged++;
  }
  const gridMethods = directory => {
    const source = ts.createSourceFile('Grid.ts', fs.readFileSync(path.join(directory, 'src/component/grid/Grid.ts'), 'utf8'), ts.ScriptTarget.Latest, true);
    const grid = source.statements.find(node => ts.isClassDeclaration(node) && node.name.text === 'Grid');
    return new Map(grid.members.filter(ts.isMethodDeclaration).map(method => [method.name.getText(source), method.getText(source)]));
  };
  const before = gridMethods(temp), after = gridMethods(root);
  const sharedHooks = new Set(['setSource', 'displayRows', 'showUIProgress', 'hideUIProgress', 'onSelectionChange', 'resetSelectAll']);
  let methods = 0;
  for (const [name, code] of before) {
    if (sharedHooks.has(name)) continue;
    assert.equal(after.get(name), code, `Legacy Grid method changed: ${name}`);
    methods++;
  }
  console.log(`Source parity: ${unchanged} original files and ${methods} Grid methods unchanged (including defaults, legacy renderers, filters and export).`);
  execFileSync(process.execPath, [require.resolve('webpack-cli/bin/cli.js'), '--mode=development'], {cwd: temp, stdio: 'inherit'});
  execFileSync(process.execPath, [path.join(__dirname, 'legacy-compat.browser.cjs')], {
    cwd: root, stdio: 'inherit', env: {...process.env,
      GRID_BASELINE_BUNDLE: path.join(temp, 'dist/basiscore.grid.js'),
      GRID_CURRENT_BUNDLE: path.join(root, 'dist/basiscore.grid.js'),
    },
  });
} finally {
  fs.rmSync(temp, {recursive: true, force: true});
}
