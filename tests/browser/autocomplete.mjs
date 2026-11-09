import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { launchChrome } from './chrome.mjs';

const server = await createServer({
  server: { host: '127.0.0.1', port: 0, hmr: false, watch: null },
  logLevel: 'error',
  css: { preprocessorOptions: { scss: { silenceDeprecations: ['if-function', 'global-builtin', 'color-functions', 'import'] } } },
});
let browser;
try {
  await server.listen();
  browser = await launchChrome();
  const { command, evaluate: ev, waitFor, click, key } = browser;
  await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await command('Page.navigate', { url: `${server.resolvedUrls.local[0]}tests/browser/index.html` });
  await waitFor('!!window.fixture && !!document.querySelector("#autocomplete-options input")');
  await click('#autocomplete-options input');
  await key('ArrowDown');
  await key('Enter');
  await waitFor('window.fixture.state.autocompleteId === 1');
  assert.equal(await ev('document.querySelector("#autocomplete-options input").value'), 'Alex');
  console.log('PASS duplicate labels commit the correct numeric ID');

  await ev(`Object.assign(document.querySelector('#autocomplete-options').style, { position: 'fixed', bottom: '4px', left: '12px', width: '220px', zIndex: '1000' })`);
  await click('#autocomplete-options input');
  await waitFor(`(() => {
    const field = document.querySelector('#autocomplete-options input');
    const popup = document.querySelector('#autocomplete-options .md-autocomplete-popup:popover-open');
    if (!popup) return false;
    const rect = popup.getBoundingClientRect();
    return rect.bottom < field.getBoundingClientRect().top && rect.top >= 8 && Math.abs(rect.width - 220) < 1 && popup.scrollWidth === popup.clientWidth;
  })()`);
  await ev(`(() => {
    const input = document.querySelector('#autocomplete-options input');
    input.value = 'ban';
    input.dispatchEvent(new Event('input', { bubbles: true }));
  })()`);
  assert.equal(await ev('document.querySelectorAll("#autocomplete-options [role=option]").length'), 1);
  await key('Tab');
  assert.equal(await ev('window.fixture.state.autocompleteId'), 1);
  assert.equal(await ev('document.querySelector("#autocomplete-options input").value'), 'Alex');
  await ev('document.querySelector("#autocomplete-options").removeAttribute("style")');
  console.log('PASS focused click reopens, narrow popup flips above, filtering is immediate and Tab preserves the selection');

  await click('#autocomplete-options input');
  await ev('document.querySelector("#autocomplete-options input").value = "zz"; document.querySelector("#autocomplete-options input").dispatchEvent(new Event("input", { bubbles: true }))');
  await waitFor('document.querySelector("#autocomplete-options [role=listbox]").textContent.includes("No people found")');
  assert.equal(await ev('document.querySelectorAll("#autocomplete-options [role=option]").length'), 0);
  await key('Escape');
  assert.equal(await ev('document.querySelector("#autocomplete-options input").value'), 'Alex');
  await click('#autocomplete-options button[aria-label="Clear selection"]');
  await waitFor('window.fixture.state.autocompleteId === null');
  console.log('PASS debounce, custom empty state, cancellation and clear');

  await click('#autocomplete-modal input');
  await waitFor('!!document.querySelector("dialog[open] .md-autocomplete__dialog, dialog.md-autocomplete__dialog[open]")');
  await waitFor('document.activeElement.matches("dialog.md-autocomplete__dialog input")');
  assert.equal(await ev('document.querySelectorAll("dialog[open]").length'), 1);
  assert.equal(await ev('document.activeElement.value'), '');
  assert.ok(await ev('document.querySelector("dialog[open] [role=option][aria-selected=true]").textContent.includes("Alex")'));
  assert.ok(await ev('(() => {const d=document.querySelector("dialog[open] .md-modal__container"), r=d.getBoundingClientRect();return r.left >= 0 && r.right <= innerWidth + 1;})()'));
  await key('ArrowDown');
  await key('ArrowDown');
  await key('ArrowDown');
  assert.equal(await ev('document.getElementById(document.activeElement.getAttribute("aria-activedescendant")).textContent.trim()'), 'Banana');
  await key('Enter');
  await waitFor('window.fixture.state.modalAutocompleteId === 2 && !document.querySelector("dialog[open]")');
  await waitFor('document.activeElement === document.querySelector("#autocomplete-modal input")');
  console.log('PASS mobile modal fits viewport, skips disabled, selects and restores focus');

  await key('ArrowDown');
  await waitFor('document.activeElement.matches("dialog.md-autocomplete__dialog input")');
  await key('Tab');
  assert.equal(await ev('!!document.activeElement.closest("dialog[open]")'), true);
  await key('Tab');
  assert.equal(await ev('!!document.activeElement.closest("dialog[open]")'), true);
  await key('Tab');
  assert.equal(await ev('document.activeElement.matches("dialog.md-autocomplete__dialog input")'), true);
  await key('Escape');
  await waitFor('!document.querySelector("dialog[open]") && document.activeElement === document.querySelector("#autocomplete-modal input")');
  console.log('PASS modal Tab trap and Escape without reopening');

  await ev('window.fixture.state.auditShort = true');
  await waitFor('!!document.querySelector("#nested-autocomplete input") && !!document.querySelector("dialog[open]")');
  await click('#nested-autocomplete input');
  await waitFor('document.querySelectorAll("dialog[open]").length === 2');
  await waitFor('document.activeElement.matches("dialog.md-autocomplete__dialog input")');
  await key('Escape');
  await waitFor('document.querySelectorAll("dialog[open]").length === 1');
  await waitFor('document.activeElement === document.querySelector("#nested-autocomplete input")');
  await key('Escape');
  await waitFor('!document.querySelector("dialog[open]")');
  console.log('PASS nested modal Escape closes only the autocomplete and restores focus');
} finally {
  await browser?.close();
  server.httpServer?.closeAllConnections();
  await server.close();
}
