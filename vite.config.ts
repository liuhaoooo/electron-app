import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import electronRender from 'vite-plugin-electron-renderer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      // 入口文件
      entry: [
        // 主进程
        'electron/index.ts',
        // 预加载
        'electron/preload.ts'
      ]
    }),
    electronRender(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/style.scss";'
      }
    }
  },
  server: {
    open: false, 
    proxy: {
      '/cgi-bin': {
        target: 'http://192.168.0.1',
        changeOrigin: true,
        rewrite: (path) => path.replace('^/cgi-bin/http.cgi', '/cgi-bin/http.cgi')
      }
    }
  }
})
