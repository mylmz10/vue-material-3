import type { StorybookConfig } from '@storybook/vue3-vite';
import vue from '@vitejs/plugin-vue';
import { mergeConfig, type UserConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../stories/components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async (config: UserConfig) =>
    mergeConfig(config, {
      plugins: [vue()],
    }),
};

export default config;
