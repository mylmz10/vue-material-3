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
    await check('long dialogs scroll while rich tooltip actions stay in the modal top layer', async () => {
      await click('#open-audit-dialog');
      await waitFor('!!document.querySelector("dialog[open] #audit-tooltip-trigger")');
      await click('#audit-tooltip-trigger');
      await waitFor('!!document.querySelector("dialog[open] .md-tooltip__action")');
      assert.equal(
        await ev('(() => {const a=document.querySelector(".md-tooltip__action"),r=a.getBoundingClientRect();return a.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));})()'),
        true
      );
      await focus('.md-tooltip__action');
      assert.equal(await ev('document.activeElement.matches(".md-tooltip__action")'), true);
      await key('Escape');
      await waitFor('!document.querySelector(".md-tooltip__action")');
      assert.equal(await ev('!!document.querySelector("dialog[open]")'), true);
      assert.equal(await active(), 'audit-tooltip-trigger');
      await click('#audit-tooltip-trigger');
      await focus('.md-tooltip__action');
      await key('Enter');
      await waitFor('window.fixture.state.auditActions === 1');
      assert.equal(await ev('(() => {const c=document.querySelector("dialog[open] .md-modal__content");return c.scrollHeight > c.clientHeight && getComputedStyle(c).overflowY === "auto";})()'), true);
      await click('#audit-content-last');
      assert.equal(
        await ev('(() => {const a=document.querySelector("#audit-content-last"),r=a.getBoundingClientRect();return a === document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);})()'),
        true
      );
      assert.ok(await ev('document.querySelector("#audit-dialog-close").getBoundingClientRect().bottom <= innerHeight'));
      await click('#audit-dialog-close');
      await waitFor('!document.querySelector("dialog[open]")');
    });
    await check('a select remains pointer-accessible in a short scrollable dialog', async () => {
      await click('#open-audit-short');
      await waitFor('!!document.querySelector("dialog[open] [role=combobox]")');
      await click('dialog[open] [role=combobox]');
      await waitFor('document.activeElement.getAttribute("role") === "option"');
      assert.equal(
        await ev('(() => {const a=document.querySelector("dialog[open] [role=option]"),r=a.getBoundingClientRect();return a.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));})()'),
        true
      );
      assert.equal(
        await ev(
          'Array.from(document.querySelectorAll("dialog[open] [role=option]")).every(a => {const r=a.getBoundingClientRect();return a.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));})'
        ),
        true
      );
      assert.ok(
        await ev(
          'Math.abs(document.querySelector("dialog[open] [role=listbox]").getBoundingClientRect().width - document.querySelector("dialog[open] .md-menu__activator").getBoundingClientRect().width) < 2'
        )
      );
      await ev('window.fixture.state.auditShort = false');
      await waitFor('!document.querySelector("dialog[open]")');
      assert.equal(await ev('document.querySelectorAll(":popover-open").length'), 0);
      await click('#open-audit-short');
      await waitFor('!!document.querySelector("dialog[open] [role=combobox]")');
      assert.equal(await ev('document.querySelector("dialog[open] [role=combobox]").getAttribute("aria-expanded")'), 'false');
      await click('dialog[open] [role=combobox]');
      await waitFor('document.activeElement.getAttribute("role") === "option"');
      assert.equal(
        await ev(
          'Array.from(document.querySelectorAll("dialog[open] [role=option]")).every(a => {const r=a.getBoundingClientRect();return a.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));})'
        ),
        true
      );
      await click('dialog[open] [role=option]');
      assert.equal(await ev('document.querySelector("dialog[open] [role=combobox]").getAttribute("aria-expanded")'), 'false');
      await key('Escape');
      await waitFor('!document.querySelector("dialog[open]")');
    });
    await check('DatePicker header keys and constrained Home preserve native behavior', async () => {
      await focus('#date [aria-label="Next month"]');
      await key('Enter');
      await waitFor(`!!document.querySelector('#date [data-iso="2026-11-15"]')`);
      await focus('#date [aria-label="Previous month"]');
      await key('Enter');
      await waitFor(`!!document.querySelector('#date [data-iso="2026-10-15"]')`);
      await ev('window.fixture.state.dateMin = "2026-10-15"');
      await focus('#date [data-iso="2026-10-15"]');
      await key('Home');
      await key('Enter');
      assert.equal(await ev('window.fixture.state.date'), '2026-10-15');
      await ev('window.fixture.state.dateMin = undefined');
    });

    await check('new sheets: native modality, bounded scrolling, RTL and focus restoration', async () => {
      for (const kind of ['bottom', 'side']) {
        await click(`#open-${kind}`);
        await waitFor('!!document.querySelector(".md-sheet[open]")');
        await waitFor('document.querySelector(".md-sheet[open] .md-sheet__panel").getAnimations().every(a => a.playState === "finished")');
        assert.equal(await ev('document.querySelector(".md-sheet[open]").matches(":modal")'), true);
        assert.ok(await ev('(() => {const r=document.querySelector(".md-sheet[open] .md-sheet__panel").getBoundingClientRect();return r.width<=innerWidth && r.height<=innerHeight})()'));
        assert.equal(await ev('document.querySelector(".md-sheet[open] .md-sheet__content").scrollHeight > document.querySelector(".md-sheet[open] .md-sheet__content").clientHeight'), true);
        if (kind === 'bottom') {
          await click('#sheet-tooltip-trigger');
          await waitFor('!!document.querySelector(".md-sheet[open] > .md-tooltip__surface")');
          assert.equal(
            await ev(
              '(() => {const a=document.querySelector(".md-sheet[open] .md-tooltip__action"),r=a.getBoundingClientRect();return a.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));})()'
            ),
            true
          );
          await click('.md-sheet[open] .md-tooltip__action');
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
    await check('multi-browse packs responsive masks and preserves media geometry in RTL', async () => {
      const snapshot = () =>
        ev(`(() => {
        const v = document.querySelector('.md-carousel__viewport'), bounds = v.getBoundingClientRect();
        return { left: bounds.left, right: bounds.right,
          masks: Array.from(v.querySelectorAll('.md-carousel__mask')).map(el => { const r=el.getBoundingClientRect(); return {left:r.left,right:r.right,width:r.width,opacity:Number(getComputedStyle(el).getPropertyValue('--md-carousel-label-opacity'))}; }).filter(r=>r.width>1),
          image: v.querySelector('img').getBoundingClientRect().width,
          content: v.querySelector('.md-carousel__content').getBoundingClientRect().width };
      })()`);
      // Leave room for classic scrollbars in the multi-browse case; test the narrow fallback separately.
      for (const width of [1000, 390, 345]) {
        await command('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
        await waitFor(`(() => {
          const v=document.querySelector('.md-carousel__viewport'),b=v.getBoundingClientRect();
          const masks=Array.from(v.querySelectorAll('.md-carousel__mask')).map(el=>el.getBoundingClientRect()).filter(r=>r.width>1);
          return ${width === 345 ? 'masks.length === 1' : 'masks.length >= 3'} && Math.abs(masks[0].left-b.left-16)<1 && Math.abs(masks.at(-1).right-b.right+16)<1;
        })()`);
        const start = await snapshot();
        assert.ok(
          await ev(
            '(() => {const c=document.querySelector(".md-carousel"),p=c.parentElement,v=c.querySelector(".md-carousel__viewport");return c.getBoundingClientRect().width<=p.getBoundingClientRect().width+1 && v.scrollWidth>v.clientWidth;})()'
          )
        );

        if (width === 345) {
          assert.equal(start.masks.length, 1);
          assert.ok(Math.abs(start.masks[0].width - (start.right - start.left - 32)) < 1);
          continue;
        }
        assert.ok(start.masks.length >= 3, JSON.stringify({ width, ...start }));
        assert.ok(start.masks[0].width > start.masks.at(-2).width);
        assert.ok(start.masks.at(-2).width > start.masks.at(-1).width);
        assert.ok(start.masks.at(-1).width >= 40 && start.masks.at(-1).width <= 56);
        assert.ok(start.masks.at(-1).opacity < 0.01);
        assert.ok(Math.abs(start.masks[0].left - start.left - 16) < 1);
        assert.ok(Math.abs(start.masks.at(-1).right - start.right + 16) < 1);
        for (let i = 1; i < start.masks.length; i++) assert.ok(Math.abs(start.masks[i].left - start.masks[i - 1].right - 8) < 1);
        await ev(
          `(() => {const v=document.querySelector('.md-carousel__viewport');v.style.scrollSnapType='none';v.scrollTo({left:(parseFloat(getComputedStyle(v).getPropertyValue('--md-carousel-large-width'))+8)/2,behavior:'instant'});})()`
        );
        await ev('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
        const middle = await snapshot();
        assert.ok(Math.abs(middle.image - start.image) < 1);
        assert.ok(Math.abs(middle.content - start.content) < 1);
        assert.ok(middle.masks.some((r) => r.width > start.masks.at(-2).width + 1 && r.width < start.masks[0].width - 1));
        await ev('document.querySelector(".md-carousel__viewport").style.scrollSnapType=""');
        await focus('.md-carousel__viewport');
        await key('Home');
        await waitFor('document.querySelector(".md-carousel__viewport").scrollLeft === 0');
      }
      await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 900, deviceScaleFactor: 1, mobile: false });
      await waitFor('Array.from(document.querySelectorAll(".md-carousel__mask")).filter(el=>el.getBoundingClientRect().width>1).length>=3');
      await ev('document.querySelector(".md-carousel").style.setProperty("--md-carousel-gap", "16px")');
      await waitFor(
        '(() => {const m=Array.from(document.querySelectorAll(".md-carousel__mask")).filter(e=>e.getBoundingClientRect().width>1);return Math.abs(m[1].getBoundingClientRect().left-m[0].getBoundingClientRect().right-16)<1;})()'
      );
      await ev('document.querySelector(".md-carousel").style.removeProperty("--md-carousel-gap")');
      await waitFor(
        '(() => {const m=Array.from(document.querySelectorAll(".md-carousel__mask")).filter(e=>e.getBoundingClientRect().width>1);return Math.abs(m[1].getBoundingClientRect().left-m[0].getBoundingClientRect().right-8)<1;})()'
      );
      await ev('document.documentElement.dir="rtl"');
      await focus('.md-carousel__viewport');
      await key('End');
      await waitFor('window.fixture.state.carousel === document.querySelectorAll(".md-carousel__item").length-1');
      await waitFor(
        '(() => {const v=document.querySelector(".md-carousel__viewport"),m=v.querySelector(".md-carousel__item:last-child .md-carousel__mask");return Math.abs(m.getBoundingClientRect().left-v.getBoundingClientRect().left-16)<1;})()'
      );
      await key('Home');
      await waitFor('document.querySelector(".md-carousel__viewport").scrollLeft === 0');
      await ev('document.documentElement.dir="ltr"');
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
      await waitFor('window.fixture.state.carousel === document.querySelectorAll(".md-carousel__item").length - 1');
      await waitFor(
        '(() => {const v=document.querySelector(".md-carousel__viewport"),s=v.querySelector(".md-carousel__item:last-child .md-carousel__mask");return Math.abs(s.getBoundingClientRect().right-v.getBoundingClientRect().right+16)<1;})()'
      );
      assert.equal(await ev('window.fixture.state.carousel'), await ev('document.querySelectorAll(".md-carousel__item").length - 1'));
      await click('.md-carousel__show-all');
      assert.equal(await ev('document.querySelector(".md-carousel__show-all").getAttribute("aria-expanded")'), 'true');
      assert.equal(await ev('getComputedStyle(document.querySelector(".md-carousel__viewport")).display'), 'grid');
      assert.equal(await ev('Array.from(document.querySelectorAll(".md-carousel__mask")).every(m=>!m.inert && !m.hasAttribute("style"))'), true);
      assert.equal(await ev('window.fixture.state.carousel'), await ev('document.querySelectorAll(".md-carousel__item").length - 1'));
      await click('.md-carousel__show-all');
      await waitFor(
        '(() => {const v=document.querySelector(".md-carousel__viewport"),m=v.querySelector(".md-carousel__item:last-child .md-carousel__mask");return Math.abs(m.getBoundingClientRect().right-v.getBoundingClientRect().right+16)<1;})()'
      );
      await focus('.md-carousel__viewport');
      await key('Home');
      await waitFor('window.fixture.state.carousel === 0');
      await waitFor('document.querySelector(".md-carousel__viewport").scrollLeft === 0');
      await focus('.md-segmented-button');
      await key('Tab');
      await key(' ');
      await waitFor('window.fixture.state.segment === 1');
    });
    await check('mouse drag follows reversals and settles before committing selection', async () => {
      const point = await ev(`(() => {
        const viewport = document.querySelector('.md-carousel__viewport');
        viewport.scrollIntoView({ block: 'center' });
        const rect = viewport.getBoundingClientRect();
        return { x: rect.left + rect.width * 0.7, y: rect.top + 40 };
      })()`);
      await command('Input.dispatchMouseEvent', { type: 'mousePressed', ...point, button: 'left', buttons: 1, clickCount: 1 });
      const move = (distance) => command('Input.dispatchMouseEvent', { type: 'mouseMoved', x: point.x - distance, y: point.y, buttons: 1 });
      const offset = 'document.querySelector(".md-carousel__viewport").scrollLeft';
      await move(250);
      await waitFor(offset + ' > 200');
      await move(45);
      await waitFor(offset + ' < 50');
      assert.equal(await ev('window.fixture.state.carousel'), 0);
      await new Promise((resolve) => setTimeout(resolve, 100));
      await command('Input.dispatchMouseEvent', { type: 'mouseReleased', x: point.x - 45, y: point.y, button: 'left', buttons: 0, clickCount: 1 });
      await waitFor('!document.querySelector(".md-carousel__viewport").style.scrollSnapType');
      assert.ok((await ev(offset)) < 2);
      assert.equal(await ev('window.fixture.state.carousel'), 0);
    });
    await check('carousel moves through intermediate frames without model bounce and respects reduced motion', async () => {
      await ev('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
      await focus('.md-carousel__viewport');
      await ev(`(() => {
        const viewport = document.querySelector('.md-carousel__viewport');
        window.fixture.carouselMotionObserved = false;
        const observe = () => {
          if (viewport.scrollLeft > 1 && viewport.scrollLeft < viewport.scrollWidth - viewport.clientWidth - 1) {
            window.fixture.carouselMotionObserved = true;
            viewport.removeEventListener('scroll', observe);
          }
        };
        viewport.addEventListener('scroll', observe, { passive: true });
      })()`);
      await key('End');
      await waitFor('window.fixture.carouselMotionObserved === true');
      assert.equal(await ev('window.fixture.state.carousel'), await ev('document.querySelectorAll(".md-carousel__item").length - 1'));
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
      await ev('Object.assign(window.fixture.state, { sliderMax: 10, sliderStep: 6, slider: 10 })');
      await waitFor('document.querySelector("#slider input[type=range]").value === "6"');
      assert.equal(await ev('document.querySelector("#slider .md-slider__label--end span").textContent.trim()'), '6');
      await focus('#slider input[type=range]');
      await key('ArrowLeft');
      await waitFor('window.fixture.state.slider === 0');
      await ev('Object.assign(window.fixture.state, { sliderMax: 100, sliderStep: 1, slider: 70 })');
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
