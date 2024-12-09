import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import PaperDetail from '@/views/PaperDetail.vue';
import AchiManage from '@/views/AchiManage.vue';
import UserDashboard from "@/views/UserDashboard.vue";
import SearchResults from '@/views/SearchResults.vue';
const routes: Array<RouteRecordRaw> = [

  {
    path: '/',
    redirect:'home'

  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '', // 默认子路由
        name:'default',
        redirect:"/home/recommend",
      },
      {
        path: '/home/recommend',
        component: () => import("../components/modules/homeComponent/recommendList.vue")
      },
      {
        path: '/home/hot',
        component: () => import("../components/modules/homeComponent/hotList.vue")
      },
      {
        path: '/home/new',
        component: () => import("../components/modules/homeComponent/newList.vue")
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults,
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
    path: '/userDashboard/:userId',
    name: 'UserDashboard',
    component: UserDashboard
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
    {path: '/userDashboard/:userId',
    name: 'UserDashboard',
    component: UserDashboard
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
