import { createRouter, createWebHistory } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string,
  }
}
const routes = [
  {
    path: '/',
    component: () => import('../layouts/layout-dashboard.vue'),
    children: [
      {
        path: '/',
        name: 'dashboard',
        meta: { title: 'Talksiekopedia' },
        component: () => import('../views/dashboard/index-page.vue'),
      },
      {
        path: 'change-log',
        name: 'changeLog',
        meta: { title: 'Talksiekopedia' },
        component: () => import('../views/change-log-page.vue')
      },
      // {
      //   path: '/:pathMatch(.*)*',
      //   component: () => import('@/views/errors/NotFound.vue'),
      // },
    ],
  },
  {
    path: '/',
    component: () => import('../layouts/layout-auth.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        meta: { title: 'Talksiekopedia' },
        component: () => import('../views/auth/index-page.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name == 'search'){
    document.title = 'Search result for ' + to.params.search
  }else if (to.meta.title != from.meta.title) {
    document.title = to.meta.title + ' - Chat anonymously and have fun'
  }
  next()
})

export default router
