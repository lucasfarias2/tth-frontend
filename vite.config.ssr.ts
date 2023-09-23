import { viteConfigSsr } from '@packlify/core/config';
import { defineConfig } from 'vite';

export default defineConfig({
  ...viteConfigSsr([
    {
      name: 'home',
      path: '/src/server/entries/home.tsx',
    },
  ]),
});
