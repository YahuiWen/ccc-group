
import Layout from '@/layout'

const darwinRouter = {
    path: '/darwin',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Darwin',
    meta: {
        title: 'Darwin',
        icon: 'chart'
    },
    children: [

        {
            path: 'pie',
            component: () => import('@/views/darwin/darwinPieChart'),
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

export default darwinRouter
