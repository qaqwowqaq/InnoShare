import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 8000,  // 设置端口为 8000
  },
  plugins: [vue()],
  css:{
      postcss:{ 
        plugins:[
          tailwindcss,
          autoprefixer,
        ]
  }
}
})

