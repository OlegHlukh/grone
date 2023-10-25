import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      api: '/src/api',
      assets: '/src/assets',
      services: '/src/services',
      store: '/src/store',
      types: '/src/types',
      components: '/src/components',
      hooks: '/src/hooks',
      styles: '/src/styles',
    },
  },
});
