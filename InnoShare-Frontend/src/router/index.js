import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue';
import SearchResults from '../views/SearchResults.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserDashboard from '../views/UserDashboard.vue'

const routes = [
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
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
