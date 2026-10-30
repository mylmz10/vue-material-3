import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, writeFile, symlink, rm, realpath } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { createRequire } from 'node:module';
import { build, preview } from 'vite';
import { launchChrome } from '../tests/browser/chrome.mjs';
import semver from 'semver';

const root = process.cwd();
const temporary = await realpath(await mkdtemp(path.join(tmpdir(), 'vm3-package-')));
let browser;
let consumerServer;
try {
  // Build first. HUSKY=0 keeps npm's prepare hook away from Git configuration.
  execFileSync(process.execPath, ['node_modules/vite/bin/vite.js', 'build'], { stdio: 'inherit' });
  const output = execFileSync('npm', ['pack', '--ignore-scripts', '--json', '--pack-destination', temporary], {
    encoding: 'utf8',
    env: { ...process.env, HUSKY: '0', npm_config_ignore_scripts: 'true', npm_config_cache: path.join(temporary, 'npm-cache') },
  });
  const [{ filename, files }] = JSON.parse(output.slice(output.indexOf('[')));
  assert.ok(files.some((file) => file.path === 'dist/vue-material-3.css'));
  assert.ok(!files.some((file) => file.path.startsWith('src/') || file.path.includes('node_modules')));
  const consumer = path.join(temporary, 'consumer');
  const modules = path.join(consumer, 'node_modules');
  await mkdir(modules, { recursive: true });
  const installed = path.join(modules, 'vue-material-3');
  await mkdir(installed);
  execFileSync('tar', ['-xzf', path.join(temporary, filename), '-C', installed, '--strip-components=1']);
  for (const dependency of ['vue', 'dayjs']) await symlink(path.join(root, 'node_modules', dependency), path.join(modules, dependency), 'dir');
  const manifest = JSON.parse(await readFile(path.join(installed, 'package.json'), 'utf8'));
  assert.equal(manifest.peerDependencies.vue, '^3.5.0');
  assert.ok(semver.satisfies('3.5.0', manifest.peerDependencies.vue));
  assert.ok(!semver.satisfies('3.4.0', manifest.peerDependencies.vue));
  assert.ok(!manifest.dependencies.vue);
  const require = createRequire(path.join(consumer, 'index.cjs'));
  const exported = require('vue-material-3');
  for (const name of ['MdDialog', 'MdCarousel', 'MdBottomSheet', 'MdSideSheet', 'MdNavigationRail', 'MdTopAppBar']) assert.ok(exported[name], `Missing UMD export ${name}`);
  for (const entry of [manifest.exports['.'].import, manifest.exports['.'].require, manifest.exports['./style.css']]) assert.ok((await readFile(path.join(installed, entry))).length);
  await writeFile(path.join(consumer, 'index.html'), '<div id="app"></div><script type="module" src="/main.js"></script>');
  await writeFile(
    path.join(consumer, 'main.js'),
    "import {createApp,h} from 'vue'; import {MdFilledButton,MdCarousel} from 'vue-material-3'; import 'vue-material-3/style.css'; createApp({render:()=>h('main',[h(MdFilledButton,{label:'Packaged button'}),h(MdCarousel,{items:['First','Second']})])}).mount('#app');"
  );
  await build({ root: consumer, configFile: false, build: { outDir: path.join(temporary, 'built') }, logLevel: 'error' });
  consumerServer = await preview({ root: consumer, configFile: false, build: { outDir: path.join(temporary, 'built') }, preview: { host: '127.0.0.1', port: 0 }, logLevel: 'error' });
  browser = await launchChrome();
  await browser.command('Page.navigate', { url: consumerServer.resolvedUrls.local[0] });
  await browser.waitFor('!!document.querySelector(".md-filled-button")');
  const rendered = await browser.evaluate(
    `(() => {const button=document.querySelector('.md-filled-button'),surface=button.querySelector('.md-button__background');return {height:button.getBoundingClientRect().height,color:getComputedStyle(surface).backgroundColor,carousel:!!document.querySelector('.md-carousel')};})()`
  );
  assert.equal(rendered.height, 40);
  assert.notEqual(rendered.color, 'rgba(0, 0, 0, 0)');
  assert.equal(rendered.carousel, true);
  console.log(`PASS packed consumer: ${filename}; UMD exports, ES consumer, CSS, files, Vue peer compatibility`);
} finally {
  await browser?.close();
  if (consumerServer) await new Promise((resolve) => consumerServer.httpServer.close(resolve));
  await rm(temporary, { recursive: true, force: true });
}
