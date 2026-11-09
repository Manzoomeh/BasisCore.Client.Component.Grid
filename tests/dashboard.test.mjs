import assert from "assert";
import fs from "fs";
import { createHash } from "crypto";
import { groups, examples, templates, selectedExample } from "../wwwroot/dashboard/samples.mjs";

const root = new URL("../wwwroot/", import.meta.url);
const catalog = fs.readFileSync(new URL("examples.html", root), "utf8");
const originalPaths = [...catalog.matchAll(/href="([^"]+)"/g)].map(match => match[1].replace(/^\.\//, ""));

assert.deepStrictEqual(groups[0].examples.map(([id]) => id), ["template1", "template2", "template3"]);
assert.deepStrictEqual(templates.map(([id]) => id), ["template1", "template2", "template3", "template4"]);
assert.deepStrictEqual(templates.slice(0, 3), groups[0].examples);
const manifest = JSON.parse(fs.readFileSync(new URL("template4/manifest.json", root), "utf8"));
assert.strictEqual(`/${templates[3][2]}`, manifest.entry);
assert(!templates[3][2].includes("://"));
const studio = fs.readFileSync(new URL(templates[3][2], root), "utf8");
assert(!studio.includes("localhost:18474"));
assert(studio.includes("https://basispanel.ir/asset/css/LineIcons.css"), "Missing BasisPanel icon stylesheet");
for (const asset of manifest.assets) {
  const data = fs.readFileSync(new URL(asset.path.slice(1), root));
  assert.strictEqual(createHash("sha256").update(data).digest("hex"), asset.sha256, asset.path);
  assert(studio.includes(`"${asset.path}"`), `Unreferenced studio asset: ${asset.path}`);
}
for (const resource of manifest.resources || []) {
  const data = fs.readFileSync(new URL(resource.path.slice(1), root));
  assert.strictEqual(createHash("sha256").update(data).digest("hex"), resource.sha256, resource.path);
}
const scriptPath = studio.match(/src="([^"]+\.js)"/)?.[1];
assert(scriptPath, "Missing Template 4 application script");
const stylePath = studio.match(/href="(\/assets\/[^"]+\.css)"/)?.[1];
assert(stylePath, "Missing Template 4 stylesheet");
assert(fs.readFileSync(new URL(stylePath.slice(1), root), "utf8").includes("url(/LineIcons.woff2)"), "The app should load the icon font locally");
const bundle = fs.readFileSync(new URL(scriptPath.slice(1), root), "utf8");
assert(bundle.includes("component.grid.grid"));
assert(bundle.includes("/basiscore-grid/basiscore.grid.js"));
assert(bundle.includes("studio.rows"));
assert(bundle.includes("فیلتر ستون‌ها"), "Missing mobile row-filter configuration");
assert(bundle.includes("جدول انتخاب تکی"), "Missing native single-selection example");
assert.deepStrictEqual((manifest.resources || []).map(resource => resource.path), ["/LineIcons.woff2"], "The only shared resource should be the icon font");
assert(bundle.includes("icon:plane"), "The airline sample should use one shared plane icon");
assert(!bundle.includes("/airlines/"), "The flight-route sample should not reference airline image files");
assert(!fs.existsSync(new URL("airlines/EK.png", root)), "Airline logo images should be removed");
assert(!fs.readFileSync(new URL("dashboard/icons.mjs", root), "utf8").includes("<svg"), "Dashboard icons should use the company icon font");
assert.strictEqual(new Set(examples.map(([id]) => id)).size, examples.length);
assert.deepStrictEqual(examples.map(([, , path]) => path).sort(), originalPaths.sort());
for (const example of examples) {
  const [id, , path] = example;
  assert.deepStrictEqual(selectedExample(`#${id}`), example);
  assert(fs.existsSync(new URL(path, root)), `Missing original example: ${path}`);
}
for (const hash of ["", "#template4", "#missing", "#javascript:alert(1)", "#%E0%A4%A"]) {
  assert.deepStrictEqual(selectedExample(hash), examples[0]);
}
console.log(`Dashboard checks passed: ${examples.length} original examples; three original previews; local Template 4 assets and BasisCore entry; safe hash fallback.`);
