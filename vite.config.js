import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  preview: {
    port: 10000,
    host: true,
    allowedHosts: [
      'sunalgorithms-github-io.onrender.com',
      'localhost'
    ]
  }
})