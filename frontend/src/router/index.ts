import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/pages/Home.vue')
    },
    {
      path: '/shows',
      name: 'Shows',
      component: () => import('@/components/pages/Shows.vue')
    },
    {
      path: '/contribute',
      name: 'Contribute',
      component: () => import('@/components/pages/Contribute.vue')
    },
    {
      path: '/members',
      name: 'Members',
      component: () => import('@/components/pages/Members.vue')
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: () => import('@/components/pages/Gallery.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/components/pages/About.vue')
    },
    {
      path: '/tickets',
      name: 'Tickets',
      component: () => import('@/components/pages/Tickets.vue')
    }
  ]
})

export default router 
