
import Layout from '@/layout'

const sydneyRouter = {
    path: '/sydney',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Sydney',
    meta: {
        title: 'Sydney',
        icon: 'chart'
    },
    children: [

        {
            path: 'pie',
            component: () => import('@/views/sydney/sydneyPieChart'),
            name: 'PieChart',
            meta: { title: 'Pie Chart', noCache: true }
        },
        {
            path: 'rose',
            component: () => import('@/views/sydney/sydneyRoseChart'),
            name: 'RoseChart',
            meta: { title: 'Rose Chart', noCache: true }
        },
        {
            path: 'word_cloud',
            component: () => import('@/views/sydney/sydneyWordCloud'),
            name: 'WordCloudChart',
            meta: { title: 'Word Cloud Chart', noCache: true }
        }
    ]
}

export default sydneyRouter
