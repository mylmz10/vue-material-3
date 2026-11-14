import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import ColorPalette from './ColorPalette.vue';
import * as VueMaterial3 from '../../../src/main.js';
import '../../../src/styles/typography/md-typescale-styles.scss';
import './styles.css';
import './palette.scss';

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, { 'nav-bar-content-after': () => h(ColorPalette) }),
  enhanceApp({ app }) {
    Object.entries(VueMaterial3).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
};
