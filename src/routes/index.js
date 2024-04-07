import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/views/public/mainpage/MainPage.vue'
import AboutPage from '../components/views/public/about/About.vue'
import PolicyPage from '../components/views/public/policy/PolicyPage.vue'
import AndroidPage from '../components/views/public/download/android/AndroidPage.vue'
import IOSPage from '../components/views/public/download/ios/IOSPage.vue';
import AuthoBuyPage from '../components/views/public/price/authobuy/AuthoBuyPage.vue'
import DepositPage from '../components/views/public/price/deposit/DepositPage.vue'
import TransportPage from '../components/views/public/price/transport/TransportPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainPage,
    meta: {
      breadcrumb: 'Trang chủ', // Custom breadcrumb label
    }
  },
  {
    path: '/gioi-thieu-ve-nhap-hang-china',
    name: 'About',
    component: AboutPage,
    meta: {
      breadcrumb: 'Trang chủ > Giới thiệu', // Custom breadcrumb label
    }
  },
  {
    path: '/danh-muc-chinh-sach',
    name: 'Policy',
    component: PolicyPage,
    meta: {
      breadcrumb: 'Trang chủ > Chính sách', // Custom breadcrumb label
    }
  },
  {
    path: '/huong-dan-tai-va-dang-ky-tai-khoan-tai-app-mua-hang-trung-quoc-nhchina-nhap-hang-china',
    name: 'Android',
    component: AndroidPage,
    meta: {
      breadcrumb: 'Trang chủ > Hướng dẫn > HƯỚNG DẪN TẢI VÀ ĐĂNG KÝ APP MUA HÀNG TRUNG QUỐC - Nhập hàng China trên thiết bị Android', // Custom breadcrumb label
    }
  },
  {
    path: '/huong-dan-tai-va-dang-ky-app-mua-hang-trung-quoc-nhap-hang-china-tren-ios',
    name: 'IOS',
    component: IOSPage,
    meta: {
      breadcrumb: 'Hướng dẫn tải và đăng ký app mua hàng Trung Quốc - Nhập hàng China trên IOS', // Custom breadcrumb label
    }
  },
  {
    path: '/bang-gia-van-chuyen',
    name: 'AuthoBuy',
    component: AuthoBuyPage,
    meta: {
      breadcrumb: 'Trang chủ > Bảng giá vận chuyển', // Custom breadcrumb label
    }
  },
  {
    path: '/bang-gia-ky-gui',
    name: 'DepositPage',
    component: DepositPage,
    meta: {
      breadcrumb: 'Trang chủ > Bảng giá ký gửi', // Custom breadcrumb label
    }
  },
  {
    path: '/bang-gia-van-chuyen-chinh-ngach',
    name: 'TransportPage',
    component: TransportPage,
    meta: {
      breadcrumb: 'Trang chủ > Bảng giá vận chuyển chính ngạch', // Custom breadcrumb label
    }
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
