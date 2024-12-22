import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';  // 确保使用正确的导入路径
import { createPinia } from 'pinia';
import './assets/index.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './styles/index.css';
import { mainStore } from './store/modules/pageStyleStore.ts'; // 引入 mainStore


const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(ElementPlus);
app.use(router);

app.mount('#app');

// 添加全局路由守卫
router.beforeEach((to, from, next) => {
  const store = mainStore(pinia); // 显式传入 Pinia 实例
  if (to.path === '/'||to.path === '/login') {
    store.changeStyle(0); // Home 界面等导航栏需要为透明背景
  } else {
    store.changeStyle(1); // 其它界面
  }

  next();
});
