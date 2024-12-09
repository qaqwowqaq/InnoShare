import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './assets/index.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './styles/index.css';
import 'element-plus'
import { mainStore } from './store/modules/pageStyleStore.ts'; // 引入 mainStore

const app = createApp(App);
const pinia = createPinia()
app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.mount('#app')

// 添加全局路由守卫
router.beforeEach((to, from, next) => {
    const store = mainStore();
    if (to.path === '/') {
      store.changeStyle(0); // Home 界面
    } else {
      store.changeStyle(1); // 其它界面
    }
    next();
  });