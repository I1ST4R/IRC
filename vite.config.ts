import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: './src/App/build', // Vite теперь считает ЭТУ папку корнем
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
    ],
  },
  server: {
    port: 3000,
    watch: {
      ignored: [
        '**/db.json', // игнорировать изменения БД json-server, чтобы не триггерить full reload
      ],
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'), // абсолютный путь к dist
    sourcemap: true,
  },
  publicDir: resolve(__dirname, 'public'), // абсолютный путь к public
})