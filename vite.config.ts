import { viteConfigClient } from '@packlify/core/config';
import { defineConfig } from 'vite';

export default defineConfig({
  ...viteConfigClient([{ name: 'home', path: '/src/client/entries/home/home.html' }]),
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/config/setupVitest.ts'],
  },
});
