import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  logLevel: 'silent',
  build: {
    outDir: './dist/react/ssr',
    emptyOutDir: true,
    ssr: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        home: resolve(__dirname, '/src/server/entries/home.tsx'),
        account: resolve(__dirname, '/src/server/entries/account.tsx'),
        backoffice: resolve(__dirname, '/src/server/entries/backoffice.tsx'),
      },
    },
  },
});
