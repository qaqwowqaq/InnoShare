import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import AdminPanel from '@/views/AdminPanel.vue'
import UserReview from '@/views/UserReview.vue'
import UserManagement from '@/views/UserManagement.vue'
import DataStatistics from '@/views/DataStatistics.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/admin',
    component: AdminPanel,
    redirect: '/admin/data-statistics', // 添加重定向到数据统计页面
    children: [
        { path: 'user-review', component: UserReview },
        { path: 'user-management', component: UserManagement },
        { path: 'data-statistics', component: DataStatistics },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
