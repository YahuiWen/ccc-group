
import Layout from '@/layout'

const perthRouter = {
    path: '/perth',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Perth',
    meta: {
        title: 'Perth',
        icon: 'chart'
    },
    children: [

        {
            path: 'pie',
            component: () => import('@/views/perth/perthPieChart'),
            name: 'PieChart',
            meta: { title: 'Pie Chart', noCache: true }
        },
        {
            path: 'rose',
            component: () => import('@/views/perth/perthRoseChart'),
            name: 'RoseChart',
            meta: { title: 'Rose Chart', noCache: true }
        },
        {
            path: 'word_cloud',
            component: () => import('@/views/perth/perthWordCloud'),
            name: 'WordCloudChart',
            meta: { title: 'Word Cloud Chart', noCache: true }
        }
    ]
}

export default perthRouter
