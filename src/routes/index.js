import { createMemoryHistory, createRouter } from 'vue-router'
import MainPage from '../components/home/MainPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainPage
  },
]

const router = createRouter({
  history: createMemoryHistory,
  routes
})

export default router
