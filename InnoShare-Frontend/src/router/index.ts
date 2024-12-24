import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import UploadPaper from '@/views/uploadPaper.vue';
import UploadPatent from '@/views/uploadPatent.vue';
import UpdatePaper from '@/views/updatePaper.vue';
import UpdatePatent from '@/views/updatePatent.vue';
import AchiManage from '@/views/AchiManage.vue';
import UserDashboard from "@/views/UserDashboard.vue";
import SearchResults from '@/views/SearchResults.vue';
import Verify from '@/views/Verify.vue';
import AdminPanel from '@/views/AdminPanel.vue'
import UserReview from '@/views/UserReview.vue'
import UserManagement from '@/views/UserManagement.vue'
import DataStatistics from '@/views/DataStatistics.vue'
import AuthorDetail from '@/views/AuthorDetail.vue';
import PaperDetail from '@/views/PaperDetail.vue';
import PatentDetail from '@/views/PatentDetail.vue';
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
    path: '/UploadPaper/:id',
    name: 'UploadPaper',
    component: UploadPaper,
    props: true
  },
  {
    path: '/UploadPatent/:id',
    name: 'UploadPatent',
    component: UploadPatent,
    props: true
  },
  {
    path: '/UpdatePaper/:id/:userId',
    name: 'UpdatePaper',
    component: UpdatePaper,
    props: true
  },
  {
    path: '/UpdatePatent/:id/:userId',
    name: 'UpdatePatent',
    component: UpdatePatent,
    props: true
  },
  {
    path: '/verify',
    name: 'Verify',
    component: Verify
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
    path: '/patent/:id',
    name: 'PatentDetail',
    component: PatentDetail,
    props: true
  },
  {
    path: '/AchiManage/:userId',
    name: 'AchiManage',
    component: AchiManage,
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults
  },
  {
    path: '/author/:name',
    name: 'AuthorDetail',
    component: AuthorDetail,
  },
  {
    path: '/admin',
    component: AdminPanel,
    redirect: '/admin/data-statistics',
    children: [
      {
        path: 'data-statistics',
        name: 'DataStatistics',
        component: DataStatistics
      },
      {
        path: 'user-review',
        name: 'UserReview',
        component: UserReview
      },
      {
        path: 'user-management',
        name: 'UserManagement',
        component: UserManagement
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export { router };  // 保持命名导出
