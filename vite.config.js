import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: '/', // ИЗМЕНЕНО: для Vercel нужен корневой путь
  root: resolve(__dirname), // ИЗМЕНЕНО: убираем 'frontend' (текущая папка и так frontend)
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
        secure: false
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false // Добавлено для продакшена
  }
}));