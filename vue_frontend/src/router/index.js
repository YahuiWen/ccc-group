import Vue from 'vue'
import VueRouter from 'vue-router'
import subjectPage from '../views/subjectPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/subjectPage',
    component: subjectPage
  }
]

const router = new VueRouter({
  routes
})

export default router
