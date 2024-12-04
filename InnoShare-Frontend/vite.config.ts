import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.ts','.js',  '.jsx', '.tsx', '.json']
  },
  server: {
    port: 8000,  // 设置端口为 8000
  },
  plugins: [vue()],

})

