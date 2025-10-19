import { defineConfig } from 'vite'
import devServer from '@hono/vite-dev-server'

export default defineConfig({
  plugins: [
    devServer({
      entry: 'app/server.ts',
    }),
  ],
  base: '/vertical-writing-sandbox/',
  server: {
    port: 3000,
  },
})