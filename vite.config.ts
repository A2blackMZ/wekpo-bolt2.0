import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [react(), createHtmlPlugin()],
  server: {
    port: 3000, // autrefois 4173
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});
