import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect:'home'

  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
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
    component: () => import('../views/AboutView.vue'),

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
