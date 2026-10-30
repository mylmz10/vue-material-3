/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier', 'plugin:storybook/recommended'],
  env: {
    'vue/setup-compiler-macros': true,
  },
  globals: {
    defineOptions: 'readonly',
  },
  overrides: [
    {
      files: ['scripts/**/*.{cjs,mjs}', 'tests/browser/*.mjs'],
      parserOptions: { ecmaVersion: 2022 },
      env: {
        node: true,
      },
    },
  ],
};
