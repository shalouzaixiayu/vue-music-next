import {
  createApp
} from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import lazyPlugin from 'vue3-lazy'


import './assets/scss/index.scss'
import loadingImg from './assets/images/default.png'

// 导入懒加载插件
const app = createApp(App).use(router).use(store).use(lazyPlugin, {
  loading: loadingImg
})



app.mount('#app')