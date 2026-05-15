import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Vue Material 3',
  description: 'Material Design 3 styled components for Vue 3',
  base: '/vue-material-3/',
  cleanUrls: true,
  ignoreDeadLinks: [/^\/storybook\//],
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/installation' },
      { text: 'Components', link: '/components/' },
      { text: 'API', link: '/api/' },
      { text: 'Migration', link: '/migration/' },
      { text: 'Storybook', link: '/storybook/', target: '_blank' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Quick Start', link: '/guide/quick-start' },
          { text: 'Theming', link: '/guide/theming' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'Components', link: '/components/' },
          { text: 'API Reference', link: '/api/' },
          { text: 'Migration Notes', link: '/migration/' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/mylmz10/vue-material-3' }],
    search: {
      provider: 'local',
    },
  },
});
