import { viteConfigClient } from '@packlify/config-build';
import { defineConfig } from 'vite';

export default defineConfig({
  ...viteConfigClient([{ name: 'home', path: '/src/client/entries/home/home.html' }]),
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/config/setupVitest.ts'],
  },
});
