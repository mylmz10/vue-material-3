import type { Preview } from '@storybook/vue3-vite';

const preview: Preview = {
  parameters: {
    options: {
      storySort: (a, b) => {
        const titleCompare = a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
        if (titleCompare !== 0) {
          return titleCompare;
        }

        return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
