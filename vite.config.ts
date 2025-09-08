import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/index/index.html'),
        about: resolve(__dirname, 'src/pages/about/index.html'),
      }
    }
  },
  base: '/vertical-writing-sandbox/',
  server: {
    port: 3000,
    open: true
  }
})