const path = require("path");

module.exports = {
  stories: [
    "../stories/components/**/*.stories.mdx",
    "../stories/components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "storybook-addon-sass-postcss",
      options: {
        sassLoaderOptions: {
          implementation: require("sass"),
        },
      },
    },
  ],
  framework: "@storybook/vue3",
};
