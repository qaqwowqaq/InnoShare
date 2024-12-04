import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import PaperDetail from '@/views/PaperDetail.vue';
import AchiManage from '@/views/AchiManage.vue';
import UserDashboard from "@/views/UserDashboard.vue";
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
    path: '/paper/:id',
    name: 'PaperDetail',
    component: PaperDetail,
    props: true
  },
  {
    path: '/AchiManage',
    name: 'AchiManage',
    component: AchiManage,
  },
    path: '/userDashboard/:userId',
    name: 'UserDashboard',
    component: UserDashboard
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;