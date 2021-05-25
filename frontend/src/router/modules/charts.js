
import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Scenarios',
  meta: {
    title: 'Scenarios',
    icon: 'chart'
  },
  children: [
    {
      path: 'allpie',
      component: () => import('@/views/charts/all-pie'),
      name: 'Topic',
      meta: { title: 'Topic', noCache: true }
    },
    // {
    //   path: 'rose',
    //   component: () => import('@/views/canberra/canberraRoseChart'),
    //   name: 'RoseChart',
    //   meta: { title: 'Rose Chart', noCache: true }
    // },
    {
      path: 'bar',
      component: () => import('@/views/charts/bar'),
      name: 'Bar',
      meta: { title: 'Bar', noCache: true }
    }
  ]
}

export default chartsRouter
