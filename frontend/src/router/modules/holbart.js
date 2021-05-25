
import Layout from '@/layout'

const holbartRouter = {
    path: '/holbart',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Holbart',
    meta: {
        title: 'Holbart',
        icon: 'chart'
    },
    children: [
        {
            path: 'pie',
            component: () => import('@/views/holbart/holbartPieChart'),
            name: 'PieChart',
            meta: { title: 'Pie Chart', noCache: true }
        },
        {
            path: 'rose',
            component: () => import('@/views/holbart/holbartRoseChart'),
            name: 'RoseChart',
            meta: { title: 'Rose Chart', noCache: true }
        },
        {
            path: 'word_cloud',
            component: () => import('@/views/holbart/holbartWordCloud'),
            name: 'WordCloudChart',
            meta: { title: 'Word Cloud Chart', noCache: true }
        }
    ]
}

export default holbartRouter
