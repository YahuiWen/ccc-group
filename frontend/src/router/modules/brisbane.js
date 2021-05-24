
import Layout from '@/layout'

const brisbaneRouter = {
    path: '/brisbane',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Brisbane',
    meta: {
        title: 'Brisbane',
        icon: 'chart'
    },
    children: [

        {
            path: 'pie',
            component: () => import('@/views/brisbane/brisbanePieChart'),
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

export default brisbaneRouter
