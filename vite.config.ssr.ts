import { viteSsrConfig } from '@packlify/config-build';
import { defineConfig } from 'vite';

export default defineConfig({
  ...viteSsrConfig([
    {
      name: 'home',
      path: '/src/server/entries/home.tsx',
    },
    {
      name: 'account',
      path: '/src/server/entries/account.tsx',
    },

    {
      name: 'backoffice',
      path: '/src/server/entries/backoffice.tsx',
    },
  ]),
});
