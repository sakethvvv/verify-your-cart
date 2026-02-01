import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  // Fix for "ReferenceError: process is not defined"
  define: {
    'process.env': {},
  },
});