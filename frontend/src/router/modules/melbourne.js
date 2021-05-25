
import Layout from '@/layout'

const melbourneRouter = {
    path: '/melbourne',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Melbourne',
    meta: {
        title: 'Melbourne',
        icon: 'chart'
    },
    children: [

        {
            path: 'pie',
            component: () => import('@/views/melbourne/melbournePieChart'),
            name: 'PieChart',
            meta: { title: 'Pie Chart', noCache: true }
        },
        {
            path: 'rose',
            component: () => import('@/views/melbourne/melbourneRoseChart'),
            name: 'RoseChart',
            meta: { title: 'Rose Chart', noCache: true }
        },
        {
            path: 'word_cloud',
            component: () => import('@/views/melbourne/melbourneWordCloud'),
            name: 'WordCloudChart',
            meta: { title: 'Word Cloud Chart', noCache: true }
        }
    ]
}

export default melbourneRouter
