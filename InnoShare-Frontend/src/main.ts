import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
const app = createApp(App);
const pinia = createPinia()
app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.mount('#app')