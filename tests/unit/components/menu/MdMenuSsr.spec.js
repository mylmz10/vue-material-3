// @vitest-environment node
import { expect, it } from 'vitest';
import { h } from 'vue';
import { renderToString } from '@vue/server-renderer';
import Dialog from '@/components/dialog/MdDialog.vue';
import Menu from '@/components/menu/MdMenu.vue';

it('renders a retained closed dialog without browser globals when a child menu starts open', async () => {
  const html = await renderToString(h(Dialog, { keepMounted: true, modelValue: false }, () => h(Menu, { modelValue: true })));
  expect(html).toContain('md-menu');
  expect(html).not.toContain('md-menu--open');
});
