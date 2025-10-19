import { defineConfig } from 'vite'
import honox from 'honox/vite'

export default defineConfig(({ mode }) => ({
  plugins: [honox()],
  base: mode === 'production' ? '/vertical-writing-sandbox/' : '/',
  server: {
    port: 3000,
  },
}))