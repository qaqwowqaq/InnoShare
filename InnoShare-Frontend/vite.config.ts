import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.ts', '.js', '.jsx', '.tsx', '.json']
  },
  server: {
    port: 8000,  // 设置端口
    open: true,  // 自动打开浏览器
    proxy: {
      '/academic': {
        target: 'http://113.44.223.168:8888',  // 后端 API 地址
        changeOrigin: true,  // 修改请求头中的 Origin，解决跨域问题
        rewrite: (path) => path.replace(/^\/api/, ''),  // 去掉 /api 前缀
      },

      '/admin': {
        target: 'http://113.44.223.168:8888',  // 后端 API 地址
        changeOrigin: true,  // 修改请求头中的 Origin，解决跨域问题
      },

      '/users': {
        target: 'http://113.44.223.168:8888',  // 后端 API 地址
        changeOrigin: true,  // 修改请求头中的 Origin，解决跨域问题
      },
      
      '/search': {
        target: 'http://113.44.223.168:8888',  // 后端 API 地址
        changeOrigin: true,  // 修改请求头中的 Origin，解决跨域问题
      },
    },
  },
  plugins: [vue()],
});