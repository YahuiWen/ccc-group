
import Layout from '@/layout'

const adelaideRouter = {
    path: '/adelaide',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Adelaide',
    meta: {
        title: 'Adelaide',
        icon: 'chart'
    },
    children: [
        {
            path: 'pie',
            component: () => import('@/views/adelaide/adelaidePieChart'),
            name: 'PieChart',
            meta: { title: 'Pie Chart', noCache: true }
        },
        {
            path: 'rose',
            component: () => import('@/views/adelaide/adelaideRoseChart'),
            name: 'RoseChart',
            meta: { title: 'Rose Chart', noCache: true }
        },
        {
            path: 'word_cloud',
            component: () => import('@/views/adelaide/adelaideWordCloud'),
            name: 'WordCloudChart',
            meta: { title: 'Word Cloud Chart', noCache: true }
        }
    ]
}

export default adelaideRouter
