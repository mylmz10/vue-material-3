import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'VueMaterial3',
      formats: ['es', 'umd'],
      fileName: (format) => `vue-material-3.${format}.js`,
      cssFileName: 'vue-material-3',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
