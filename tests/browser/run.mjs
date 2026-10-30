import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { launchChrome } from './chrome.mjs';

const visual = process.argv.includes('--visual');
const update = process.argv.includes('--update');
const output = path.resolve('test-results/browser');
await mkdir(output, { recursive: true });
const server = await createServer({
  server: { host: '127.0.0.1', port: 0, hmr: false, watch: null },
  optimizeDeps: {
    noDiscovery: true,
    include: ['vue', 'dayjs', 'dayjs/plugin/customParseFormat', 'dayjs/plugin/isToday', 'dayjs/plugin/localeData', 'dayjs/plugin/weekday', 'dayjs/locale/en', 'dayjs/locale/tr'],
  },
  logLevel: 'error',
  css: { preprocessorOptions: { scss: { silenceDeprecations: ['if-function', 'global-builtin', 'color-functions', 'import'] } } },
});
await server.listen();
let browser;
try {
  browser = await launchChrome();
  const { command, evaluate: ev, waitFor, click, key } = browser;
  console.log(`Browser: ${browser.version.product}`);
  await command('Emulation.setDeviceMetricsOverride', { width: 1000, height: 900, deviceScaleFactor: 1, mobile: false });
  await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  console.log(server.resolvedUrls.local[0]);
  await command('Page.navigate', { url: `${server.resolvedUrls.local[0]}tests/browser/index.html` });
  console.log('Fixture navigation requested');
  await waitFor('!!window.fixture && !!document.querySelector("#select [role=combobox]")');
  const focus = (selector) => ev(`document.querySelector(${JSON.stringify(selector)}).focus()`);
  const active = () => ev('document.activeElement.id');
  const check = async (name, test) => {
    await test();
    console.log(`PASS ${name}`);
  };
  if (!visual) {
    await check('new sheets: native modality, bounded scrolling, RTL and focus restoration', async () => {
      for (const kind of ['bottom', 'side']) {
        await click(`#open-${kind}`);
        await waitFor('!!document.querySelector(".md-sheet[open]")');
        await waitFor('document.querySelector(".md-sheet[open] .md-sheet__panel").getAnimations().every(a => a.playState === "finished")');
        assert.equal(await ev('document.querySelector(".md-sheet[open]").matches(":modal")'), true);
        assert.ok(await ev('(() => {const r=document.querySelector(".md-sheet[open] .md-sheet__panel").getBoundingClientRect();return r.width<=innerWidth && r.height<=innerHeight})()'));
        assert.equal(await ev('document.querySelector(".md-sheet[open] .md-sheet__content").scrollHeight > document.querySelector(".md-sheet[open] .md-sheet__content").clientHeight'), true);
        if (kind === 'bottom') {
          assert.ok(await ev('document.querySelector(".md-sheet[open] .md-sheet__panel").getBoundingClientRect().height <= innerHeight / 2'));
          await click('.md-sheet[open] .md-sheet__handle-target');
          await waitFor('document.querySelector(".md-sheet[open] .md-sheet__handle-target").getAttribute("aria-expanded") === "true"');
          await waitFor('document.querySelector(".md-sheet[open] .md-sheet__panel").getBoundingClientRect().height > innerHeight / 2');
        }
        await key('Escape');
        await waitFor('!document.querySelector("dialog[open]")');
        assert.equal(await active(), `open-${kind}`);
      }
      await command('Emulation.setDeviceMetricsOverride', { width: 360, height: 640, deviceScaleFactor: 1, mobile: false });
      await ev('document.documentElement.dir="rtl"');
      await click('#open-side');
      await waitFor('!!document.querySelector(".md-sheet[open]")');
      assert.ok(await ev('document.querySelector(".md-sheet[open] .md-sheet__panel").getBoundingClientRect().left < 2'));
      await key('Escape');
      await ev('document.documentElement.dir="ltr"');
      await command('Emulation.setDeviceMetricsOverride', { width: 1000, height: 900, deviceScaleFactor: 1, mobile: false });
    });
    await check('centered app bar keeps two actions clear of a long title at 360px', async () => {
      await command('Emulation.setDeviceMetricsOverride', { width: 360, height: 640, deviceScaleFactor: 1, mobile: false });
      await ev('window.fixture.state.appbarVariant = "center-aligned"');
      await waitFor('!!document.querySelector(".md-top-app-bar--center-aligned")');
      assert.ok(
        await ev(
          '(() => {const title=document.querySelector(".md-top-app-bar__title").getBoundingClientRect();const action=document.querySelector(".md-top-app-bar__actions button").getBoundingClientRect();return title.right <= action.left;})()'
        )
      );
      await ev('window.fixture.state.appbarVariant = "large"');
      await command('Emulation.setDeviceMetricsOverride', { width: 1000, height: 900, deviceScaleFactor: 1, mobile: false });
    });
    await check('rail, carousel and segmented control keyboard updates', async () => {
      await focus('.md-navigation-rail button');
      await key('ArrowDown');
      await key('Enter');
      await waitFor('window.fixture.state.rail === 1');
      assert.match(await ev('getComputedStyle(document.querySelector(".md-navigation-rail__destination--selected .md-icon")).fontVariationSettings'), /FILL.*1/);
      await focus('.md-carousel__viewport');
      await key('End');
      await waitFor('window.fixture.state.carousel === 2');
      await waitFor(
        '(() => {const v=document.querySelector(".md-carousel__viewport"),s=v.querySelector(".md-carousel__item:last-child");return Math.abs(s.getBoundingClientRect().left-v.getBoundingClientRect().left-4)<1;})()'
      );
      assert.equal(await ev('window.fixture.state.carousel'), 2);
      await key('Home');
      await waitFor('window.fixture.state.carousel === 0');
      await click('.md-carousel__show-all');
      assert.equal(await ev('document.querySelector(".md-carousel__show-all").getAttribute("aria-expanded")'), 'true');
      assert.equal(await ev('getComputedStyle(document.querySelector(".md-carousel__viewport")).display'), 'grid');
      await click('.md-carousel__show-all');
      await focus('.md-segmented-button');
      await key('Tab');
      await key(' ');
      await waitFor('window.fixture.state.segment === 1');
    });
    await check('carousel moves through intermediate frames without model bounce and respects reduced motion', async () => {
      await ev('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
      await focus('.md-carousel__viewport');
      await key('End');
      await waitFor('(() => {const v=document.querySelector(".md-carousel__viewport");return v.scrollLeft>1 && v.scrollLeft<v.scrollWidth-v.clientWidth-1;})()');
      assert.equal(await ev('window.fixture.state.carousel'), 2);
      assert.notEqual(await ev('getComputedStyle(document.querySelector(".md-carousel__image")).transform'), 'none');
      await waitFor('(() => {const v=document.querySelector(".md-carousel__viewport");return Math.abs(v.scrollLeft-(v.scrollWidth-v.clientWidth))<1;})()');
      await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
      await key('Home');
      await waitFor('document.querySelector(".md-carousel__viewport").scrollLeft === 0');
      assert.equal(await ev('window.fixture.state.carousel'), 0);
      assert.equal(await ev('getComputedStyle(document.querySelector(".md-carousel__image")).transform'), 'none');
      await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
    });
    await check('native modal, hidden targets, nested Escape and focus restoration', async () => {
      await click('#open-dialog');
      await waitFor('document.querySelector("dialog[open]")?.matches(":modal")');
      assert.equal(await active(), 'nested-open');
      await key('Tab', 'Tab', 1);
      assert.equal(await active(), 'outer-last');
      await key('Tab');
      assert.equal(await active(), 'nested-open');
      await click('#nested-open');
      await waitFor('document.querySelectorAll("dialog[open]").length === 2');
      assert.equal(await active(), 'inner-close');
      await key('Escape');
      await waitFor('document.querySelectorAll("dialog[open]").length === 1');
      assert.equal(await active(), 'nested-open');
      await key('Escape');
      await waitFor('!document.querySelector("dialog[open]")');
      assert.equal(await active(), 'open-dialog');
      assert.notEqual(await ev('document.body.style.overflow'), 'hidden');
    });
    await check('drawer uses native modality and restores opener', async () => {
      await click('#open-drawer');
      await waitFor('!!document.querySelector(".md-navigation-drawer[open]")');
      await key('Escape');
      await waitFor('!document.querySelector("dialog[open]")');
      assert.equal(await active(), 'open-drawer');
    });
    await check('autocomplete keeps input focus and resolves active descendant', async () => {
      await click('#autocomplete input');
      await command('Input.insertText', { text: 'Bo' });
      await key('ArrowDown');
      await waitFor('document.querySelector("#autocomplete input").hasAttribute("aria-activedescendant")');
      assert.equal(await ev('document.activeElement === document.querySelector("#autocomplete input")'), true);
      assert.equal(await ev('!!document.getElementById(document.activeElement.getAttribute("aria-activedescendant"))'), true);
      await key('Enter');
      await waitFor('window.fixture.state.text === "Boston"');
    });
    await check('select Home/End boundaries override selected middle option', async () => {
      await click('#select [role=combobox]');
      await waitFor('document.activeElement.getAttribute("role") === "option"');
      await key('End');
      assert.equal(await ev('document.activeElement.textContent.trim()'), 'Gamma');
      await key('Home');
      assert.equal(await ev('document.activeElement.textContent.trim()'), 'Alpha');
      assert.equal(await ev('!!document.getElementById(document.querySelector("#select [role=combobox]").getAttribute("aria-activedescendant"))'), true);
      await key('Escape');
    });
    await check('menu and submenu native keyboard flow', async () => {
      await click('#menu-open');
      await waitFor('document.activeElement.getAttribute("role") === "menuitem"');
      await key('ArrowDown');
      await key('ArrowRight');
      await waitFor('document.activeElement.textContent.includes("Nested action")');
      await key('ArrowLeft');
      await key('Escape');
    });
    await check('tabs and controlled slider return parent updates', async () => {
      await focus('[role=tab]');
      await key('ArrowRight');
      await waitFor('window.fixture.state.tab === 1');
      await focus('#slider input[type=range]');
      await key('ArrowRight');
      await waitFor('window.fixture.state.slider > 20');
      await ev('window.fixture.state.slider = 70');
      await waitFor('document.querySelector("#slider input[type=range]").value === "70"');
    });
    await check('uncontrolled native radio group visuals stay synchronized', async () => {
      await click('#radios .md-radio:nth-child(2) input');
      await waitFor('!document.querySelector("#radios .md-radio").classList.contains("md-radio--checked")');
      assert.equal(await ev('document.querySelectorAll("#radios .md-radio--checked").length'), 1);
    });
    await check('ripple releases outside its host', async () => {
      await ev('document.querySelector("#fixtures .md-icon-button").scrollIntoView({block:"center"})');
      const p = await ev('(() => {const r=document.querySelector("#fixtures .md-icon-button").getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()');
      await command('Input.dispatchMouseEvent', { type: 'mousePressed', ...p, button: 'left', clickCount: 1 });
      await waitFor('!!document.querySelector("#fixtures .md-icon-button .md-ripple-surface--pressed")');
      await command('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 990, y: 10, button: 'left', buttons: 1 });
      await command('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 990, y: 10, button: 'left', clickCount: 1 });
      await waitFor('!document.querySelector("#fixtures .md-icon-button .md-ripple-surface--pressed")');
    });
    await check('readonly and disabled fields block native edits', async () => {
      await ev('window.fixture.state.readonly = true');
      await click('#field input');
      await command('Input.insertText', { text: 'bad' });
      assert.equal(await ev('window.fixture.state.text'), 'Boston');
      await ev('window.fixture.state.disabled = true');
      await waitFor('document.querySelector("#field input").disabled');
      assert.equal(await ev('document.querySelector("#autocomplete input").disabled'), true);
      await ev('window.fixture.state.disabled = false; window.fixture.state.readonly = false; window.fixture.state.loading = false');
    });
    await check('picker pointer drag and cancellation clean up', async () => {
      await ev('document.querySelector(".md-time-picker-dial").scrollIntoView({block:"center"})');
      const p = await ev('(() => { const r=document.querySelector(".md-time-picker-dial").getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+20};})()');
      await command('Input.dispatchMouseEvent', { type: 'mousePressed', ...p, button: 'left', clickCount: 1 });
      await command('Input.dispatchMouseEvent', { type: 'mouseMoved', x: p.x + 80, y: p.y + 80, button: 'left', buttons: 1 });
      await command('Input.dispatchMouseEvent', { type: 'mouseReleased', x: p.x + 80, y: p.y + 80, button: 'left', clickCount: 1 });
      assert.ok(await ev('document.querySelector(".md-time-picker-dial").getBoundingClientRect().width > 200'));
      assert.notEqual(await ev('window.fixture.state.dialHour'), 10);
      await command('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: p.x, y: p.y, id: 1 }] });
      await command('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] });
      const value = await ev('window.fixture.state.dialHour');
      await command('Input.dispatchMouseEvent', { type: 'mouseMoved', x: p.x - 80, y: p.y + 80 });
      assert.equal(await ev('window.fixture.state.dialHour'), value);
    });
    await check('chip removal and fixture unmount', async () => {
      const remove = '.md-chip__remove';
      await click(remove);
      await waitFor('window.fixture.state.chips.length === 1');
      await ev('window.fixture.mounted.value = false');
      await waitFor('!document.querySelector("#fixtures")');
      assert.notEqual(await ev('document.body.style.overflow'), 'hidden');
    });
  } else {
    const samples = {};
    for (const [name, width, dark, rtl, reduced, scale] of [
      ['light', 1000, false, false, false, 1],
      ['dark', 1000, true, false, false, 1],
      ['narrow-rtl', 360, false, true, true, 1],
      ['text-scale', 720, false, false, true, 2],
    ]) {
      await command('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: false });
      await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }] });
      await ev(
        `document.querySelector('#text-enlargement')?.remove();if(${scale}===2){const style=document.createElement('style');style.id='text-enlargement';style.textContent='#fixtures input, #fixtures button, #fixtures .md-chip__text {font-size:32px !important;line-height:1.5 !important}';document.head.append(style)}document.documentElement.classList.toggle('dark',${dark});document.documentElement.dir=${JSON.stringify(
          rtl ? 'rtl' : 'ltr'
        )};document.documentElement.style.fontSize='${scale * 16}px';window.fixture.state.error=true`
      );
      await focus('#field input');
      await ev(
        'new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => {document.getAnimations().forEach(a => {if(a.effect?.getComputedTiming().iterations !== Infinity) a.finish()});resolve()})))'
      );
      samples[name] = await ev(`(() => {
        const result = {};
        for (const selector of ['#fixtures .md-icon-button','#field input','.md-circular-progress-indicator','.md-linear-progress-indicator','.md-chip','.md-chip__remove','.md-time-picker-dial__label']) {
          const el=document.querySelector(selector),r=el.getBoundingClientRect(),s=getComputedStyle(el);
          result[selector]={width:Math.round(r.width),height:Math.round(r.height),color:s.color,background:s.backgroundColor,direction:s.direction,disabled:!!el.disabled,fontSize:s.fontSize,outline:s.outlineStyle,borderRadius:s.borderRadius};
        }
        const luminance = color => color.match(/[0-9.]+/g).slice(0,3).map(Number).map(v=>v/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[0.2126,0.7152,0.0722][i],0);
        const body=getComputedStyle(document.body),a=luminance(body.color),b=luminance(body.backgroundColor);
        result.textContrast=Math.round(((Math.max(a,b)+0.05)/(Math.min(a,b)+0.05))*100)/100;
        result.focus = document.activeElement === document.querySelector('#field input');
        result.reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
        return result;
      })()`);
      if (scale === 2) assert.equal(samples[name]['#field input'].fontSize, '32px');
      assert.ok(samples[name]['#fixtures .md-icon-button'].height >= 40);
      assert.ok(samples[name]['.md-chip'].height >= 48);
      assert.ok(samples[name]['.md-chip__remove'].height >= 48);
      assert.ok(samples[name]['.md-time-picker-dial__label'].height >= 48);
      assert.ok(samples[name].textContrast >= 4.5);
      await ev('window.scrollTo(0,0)');
      const shot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
      await writeFile(path.join(output, `${name}.png`), Buffer.from(shot.data, 'base64'));
      await ev('window.fixture.state.disabled = true; window.fixture.state.readonly = true; window.fixture.state.loading = true');
      await waitFor('document.querySelector("#field input").disabled');
      assert.equal(await ev('document.querySelector("#fixtures .md-icon-button").disabled'), true);
      if (reduced) assert.equal(await ev('getComputedStyle(document.querySelector(".md-circular-progress-indicator")).animationName'), 'none');
      const states = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
      await writeFile(path.join(output, `${name}-disabled.png`), Buffer.from(states.data, 'base64'));
      await ev('window.fixture.state.disabled = false; window.fixture.state.readonly = false; window.fixture.state.loading = false');
    }
    const baseline = new URL('./visual-baseline.json', import.meta.url);
    if (update) await writeFile(baseline, JSON.stringify(samples, null, 2) + '\n');
    else assert.deepEqual(samples, JSON.parse(await readFile(baseline, 'utf8')));
    console.log('PASS visual geometry/style baselines, theme, RTL, reduced motion and state screenshots');
  }
} finally {
  await browser?.close();
  server.httpServer?.closeAllConnections();
  await server.close();
}
