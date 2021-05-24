
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
            path: 'word_cloud',
            component: () => import('@/views/charts/word-cloud'),
            name: 'WordCloudChart',
            meta: { title: 'Word Cloud Chart', noCache: true }
        }
    ]
}

export default sydneyRouter
