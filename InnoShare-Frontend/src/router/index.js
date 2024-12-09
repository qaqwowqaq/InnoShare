
import Vue from 'vue'
import Router from 'vue-router'
import AdminPanel from '@/views/AdminPanel.vue'
import DataStatistics from '@/views/DataStatistics.vue'
import UserReview from '@/views/UserReview.vue'
import UserManagement from '@/views/UserManagement.vue'

Vue.use(Router)

const routes = [
  {
    path: '/admin',
    component: AdminPanel,
    redirect: '/admin/data-statistics', // 添加这一行进行重定向
    children: [
      {
        path: 'data-statistics',
        component: DataStatistics
      },
      {
        path: 'user-review',
        component: UserReview
      },
      {
        path: 'user-management',
        component: UserManagement
      }
    ]
  },
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})