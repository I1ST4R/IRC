import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: './src/App/build', 
  plugins: [react()],
  resolve: {
    alias: {
      '@': '../../', // Путь к корню проекта из папки build
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: '../../../dist', 
    sourcemap: true,
  },
  publicDir: '../../../public', 
})
