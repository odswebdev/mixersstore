import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: '/mixersstore/',
  root: resolve(__dirname, 'frontend'),
  server: {
    port: 5173,
    open: true,
    fs: {
      allow: ['..']
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // Убираем rewrite, оставляем /api в пути
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    outDir: 'dist',
    emptyOutDir: true
  }
}));