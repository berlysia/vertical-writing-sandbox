import { defineConfig } from 'vite'
import honox from 'honox/vite'
import ssg from '@hono/vite-ssg'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    plugins: [
      honox(),
      ...(isProduction
        ? [
            ssg({
              entry: './app/server.ts',
            }),
          ]
        : []),
    ],
    base: isProduction ? '/vertical-writing-sandbox/' : '/',
    server: {
      port: 3000,
    },
    build: {
      emptyOutDir: true,
    },
  }
})