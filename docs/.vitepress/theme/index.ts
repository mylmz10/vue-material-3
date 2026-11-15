import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import ColorPalette from './ColorPalette.vue';
import * as VueMaterial3 from '../../../src/main.js';
import '../../../src/styles/typography/md-typescale-styles.scss';
import './styles.css';
import './palette.scss';

const navigationLogo = () =>
  h('svg', { class: 'docs-nav-logo', viewBox: '0 0 64 64', 'aria-hidden': 'true' }, [
    h('rect', { width: 64, height: 64, rx: 16 }),
    h('path', { d: 'M15 18h8l9 16 9-16h8L32 48 15 18z' }),
    h('path', { d: 'M24 18h5l3 6 3-6h5l-8 14-8-14z' }),
  ]);

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'nav-bar-title-before': navigationLogo,
      'nav-bar-content-after': () => h(ColorPalette),
    }),
  enhanceApp({ app }) {
    Object.entries(VueMaterial3).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
};
