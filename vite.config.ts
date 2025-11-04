import { defineConfig } from 'vite'
import honox from 'honox/vite'
import client from 'honox/vite/client'
import ssg from '@hono/vite-ssg'

const entry = './app/server.ts'

export default defineConfig(({ mode }) => {
  // GitHub Pagesのベースパス。ローカル開発では/を使用
  const base = mode === 'production' ? '/vertical-writing-sandbox/' : '/'

  // Client mode: build islands and client-side JavaScript
  // クライアントビルドを先に実行してマニフェストを生成
  if (mode === 'client') {
    return {
      plugins: [client()],
      base,
      build: {
        outDir: './dist',
        emptyOutDir: true, // 最初にdistをクリーン
        rollupOptions: {
          input: ['/app/client.ts'],
          output: {
            entryFileNames: 'static/client.js',
            chunkFileNames: 'static/[name]-[hash].js',
            assetFileNames: 'static/[name].[ext]',
          },
        },
      },
    }
  }

  // Server mode: SSG and development
  // マニフェストを参照してHTMLを生成
  return {
    plugins: [honox(), ssg({ entry })],
    base,
    server: {
      port: 3000,
    },
    build: {
      outDir: './dist',
      emptyOutDir: false, // クライアントビルドの結果を保持
    },
  }
})