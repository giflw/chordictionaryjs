import { defineConfig } from 'vite';
import * as path from 'path';

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@scripts': path.resolve(__dirname, './src/js'),
      '@partials': path.resolve(__dirname, './src/scss/partials'),
      '@styles': path.resolve(__dirname, './src/scss'),
      '@': path.resolve(__dirname, './'),
      '~': path.resolve(__dirname, './')
    }
  },
  build: {
    sourcemap: false,
  },
});