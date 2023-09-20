import { viteSsrConfig } from '@packlify/config-build';
import { defineConfig } from 'vite';

export default defineConfig({
  ...viteSsrConfig([
    {
      name: 'home',
      path: '/src/server/entries/home.tsx',
    },
  ]),
  optimizeDeps: {
    exclude: ['fsevents'],
  },
});
