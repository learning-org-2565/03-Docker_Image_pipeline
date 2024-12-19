import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  preview: {
    port: 5173,
    host: true
  },
  build: {
    target: 'esnext', // Use latest ECMAScript version
    commonjsOptions: {
      transformMixedEsModules: true // Ensure compatibility with older CJS modules
    }
  }
})
