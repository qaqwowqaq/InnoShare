import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';  // 确保使用正确的导入路径
import { createPinia } from 'pinia';
import './assets/index.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.mount('#app');
