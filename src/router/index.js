import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/admin/:userName',
      name: 'Admin',
      component: () => import('../views/ViewAdmin.vue'),
    },
    {
      path: '/customer/:userName',
      name: 'Customer',
      component: () => import('../views/ViewCustomer.vue'),
    }
  ]
})

export default router
