
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
            path: 'rose',
            component: () => import('@/views/brisbane/brisbaneRoseChart'),
            name: 'RoseChart',
            meta: { title: 'Rose Chart', noCache: true }
        },
        {
            path: 'word_cloud',
            component: () => import('@/views/brisbane/brisbaneWordCloud'),
            name: 'WordCloudChart',
            meta: { title: 'Word Cloud Chart', noCache: true }
        }
    ]
}

export default brisbaneRouter
