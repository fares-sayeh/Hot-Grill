import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    // Default Vite dev server binds to 127.0.0.1 only, which a forwarded
    // Codespaces port (or any second device) cannot reach. Binding to
    // 0.0.0.0 makes the dev server reachable from the forwarded port.
    host: true,
    port: 5173,
    strictPort: false
  },
  preview: {
    host: true,
    port: 4173
  },
  build: {
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  }
});
