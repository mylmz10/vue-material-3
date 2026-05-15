import DefaultTheme from 'vitepress/theme';
import * as VueMaterial3 from '../../../src/main.js';
import '../../../src/styles/typography/md-typescale-styles.scss';
import './styles.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    Object.entries(VueMaterial3).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
};
