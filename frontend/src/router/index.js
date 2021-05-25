
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import chartsRouter from './modules/charts'
import melbourneRouter from '@/router/modules/melbourne'
import sydneyRouter from '@/router/modules/sydney'
import adelaideRouter from '@/router/modules/adelaide'
import brisbaneRouter from '@/router/modules/brisbane'
import canberraRouter from '@/router/modules/canbe'
import darwinRouter from '@/router/modules/darwin'
import holbartRouter from '@/router/modules/holbart'
Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  chartsRouter,
  adelaideRouter,
  brisbaneRouter,
  canberraRouter,
  darwinRouter,
  holbartRouter,
  sydneyRouter,
  melbourneRouter,

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
