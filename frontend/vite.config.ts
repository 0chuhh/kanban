import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy:{
      '/api':{
        target: 'http://lehfr21.pythonanywhere.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/media':{
        target: 'http://lehfr21.pythonanywhere.com/media',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/media/, ''),
      }
    }
  },
  base: "/kanban",
  build: { chunkSizeWarningLimit: 1600, },
  plugins: [react(),tsconfigPaths()],
})
