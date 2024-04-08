import {createRouter, createWebHistory} from 'vue-router'
import MainPage from '../components/views/public/mainpage/MainPage.vue'
import AboutPage from '../components/views/public/about/About.vue'
import PolicyPage from '../components/views/public/policy/PolicyPage.vue'
import AndroidPage from '../components/views/public/download/android/AndroidPage.vue'
import IOSPage from '../components/views/public/download/ios/IOSPage.vue';
import AuthoBuyPage from '../components/views/public/price/authobuy/AuthoBuyPage.vue'
import DepositPage from '../components/views/public/price/deposit/DepositPage.vue'
import TransportPage from '../components/views/public/price/transport/TransportPage.vue'
import RegisterPage from '../components/views/public/register/RegisterPage.vue'
import LoginPage from '../components/views/public/login/LoginPage.vue'

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
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
    meta: {
      breadcrumb: 'Trang chủ > Đăng ký', // Custom breadcrumb label
    }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
      breadcrumb: 'Trang chủ > Đăng nhập', // Custom breadcrumb label
    }
  },
    {
        path: '/cart/addtocart',
        name: 'AddToCart',
        component: () => import('./AddToCart.vue'),
        props: (route) => ({
            // Truy cập các tham số query từ URL
            type: route.query.type,
            item_id: route.query.item_id,
            item_title: route.query.item_title,
            item_image: route.query.item_image,
            item_link: route.query.item_link,
            item_price: route.query.item_price,
            price_table: route.query.price_table,
            color_size_name: route.query.color_size_name,
            skus: route.query.skus,
            seller_id: route.query.seller_id,
            item_quantity: route.query.item_quantity,
            version: route.query.version
        })
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
