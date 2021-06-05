import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 别名操作
  resolve: {
    alias:{
      "@": "./src"
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/variable.scss";
                         @import "@/assets/scss/mixins.scss";`
      }
    }
  },
})