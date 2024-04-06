import { createMemoryHistory, createRouter } from 'vue-router'
import MainPage from '../components/views/mainpage/MainPage.vue'
// import AboutPage from '../components/views/about/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainPage,
    // meta: {
    //   breadcrumb: 'Trang chủ', // Custom breadcrumb label
    // }
  },
  // {
  //   path: '/gioi-thieu-ve-nhap-hang-china/',
  //   name: 'About',
  //   component: AboutPage,
  //   meta: {
  //     breadcrumb: 'Trang chủ > Giới thiệu', // Custom breadcrumb label
  //   }
  // },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
