
import Layout from '@/layout'

const canberraRouter = {
    path: '/canberra',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Canberra',
    meta: {
        title: 'Canberra',
        icon: 'chart'
    },
    children: [

        {
            path: 'pie',
            component: () => import('@/views/canberra/canberraPieChart'),
            name: 'PieChart',
            meta: { title: 'Pie Chart', noCache: true }
        },
        {
            path: 'rose',
            component: () => import('@/views/canberra/canberraRoseChart'),
            name: 'RoseChart',
            meta: { title: 'Rose Chart', noCache: true }
        },
        {
            path: 'word_cloud',
            component: () => import('@/views/canberra/canberraWordCloud'),
            name: 'WordCloudChart',
            meta: { title: 'Word Cloud Chart', noCache: true }
        }

    ]
}

export default canberraRouter
