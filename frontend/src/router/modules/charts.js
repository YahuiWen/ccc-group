
import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'Charts',
    icon: 'chart'
  },
  children: [
    //
    // {
    //   path: 'pie',
    //   component: () => import('@/views/charts/pie'),
    //   name: 'PieChart',
    //   meta: { title: 'Pie Chart', noCache: true }
    // },
    {
      path: 'allpie',
      component: () => import('@/views/charts/all-pie'),
      name: 'AllPieChart',
      meta: { title: 'All Pie Chart', noCache: true }
    },
    {
      path: 'radar',
      component: () => import('@/views/charts/radar'),
      name: 'RadarChart',
      meta: { title: 'Radar Chart', noCache: true }
    },
    {
      path: 'word_cloud',
      component: () => import('@/views/charts/word-cloud'),
      name: 'WordCloudChart',
      meta: { title: 'Word Cloud Chart', noCache: true }
    }
  ]
}

export default chartsRouter
