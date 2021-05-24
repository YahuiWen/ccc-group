
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
            path: 'word_cloud',
            component: () => import('@/views/charts/word-cloud'),
            name: 'WordCloudChart',
            meta: { title: 'Word Cloud Chart', noCache: true }
        }
    ]
}

export default adelaideRouter
