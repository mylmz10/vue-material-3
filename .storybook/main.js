module.exports = {
  stories: ['../stories/components/**/*.stories.mdx', '../stories/components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/preset-scss',
      options: {
        sassLoaderOptions: {
          implementation: require('sass'),
        },
      },
    },
  ],
  framework: '@storybook/vue3',
};
