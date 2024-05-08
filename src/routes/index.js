import { createRouter, createWebHistory } from "vue-router";

import RouteGuard from "../components/utils/RouteGuard";
import MainPage from "../components/views/public/mainpage/MainPage.vue";
import AboutPage from "../components/views/public/about/About.vue";
import PolicyPage from "../components/views/public/policy/PolicyPage.vue";
import AndroidPage from "../components/views/public/download/android/AndroidPage.vue";
import IOSPage from "../components/views/public/download/ios/IOSPage.vue";
import AuthoBuyPage from "../components/views/public/price/authobuy/AuthoBuyPage.vue";
import DepositPage from "../components/views/public/price/deposit/DepositPage.vue";
import TransportPage from "../components/views/public/price/transport/TransportPage.vue";
import RegisterPage from "../components/views/public/register/RegisterPage.vue";
import LoginPage from "../components/views/public/login/LoginPage.vue";
import ForgotPassPage from "../components/views/public/forgotpass/ForgotPassPage.vue";
import PageNotFound from "../components/views/public/404/PageNotFound.vue";

import DashBoardPage from "../components/views/private/dashboard/DashBoardPage.vue";
import TopupPage from "../components/views/private/finance/topup/TopupPage.vue";
import TransactionPage from "../components/views/private/finance/transaction/TransactionPage.vue";
import ProfilePage from "../components/views/private/account/profile/ProfilePage.vue";
import VipPage from "../components/views/private/account/vip/VipPage.vue";
import ChangePassPage from "../components/views/private/account/changepass/ChangePassPage.vue";
import TrustedShopPage from "../components/views/private/trusted_shop/TrustedShopPage.vue";
import PendingPage from "../components/views/private/order/pending/PendingPage.vue";
import ListPage from "../components/views/private/order/list/ListPage.vue";
import ComplaintPage from "../components/views/private/order/complaint/ComplaintPage.vue";
import CartPage from "../components/views/private/order/cart/CartPage.vue";
import ReducePage from "../components/views/private/order/reduce/ReducePage.vue";
import ShipPage from "../components/views/private/transport/ship/ShipPage.vue";
import FinShipPage from "../components/views/private/transport/finship/FinShipPage.vue";
import ShipNDPage from "../components/views/private/transport/shipnd/ShipNDPage.vue";
import OrderDetailPage from "../components/views/private/order/detail/OrderDetailPage.vue"

import StaffLoginPage from "../components/views/staff/login/StaffLoginPage.vue";
import StaffDashboardPage from "../components/views/staff/dashboard/StaffDashboardPage.vue";
import StaffPackagePage from "../components/views/staff/package/StaffPackagePage.vue";
import StaffOrderPage from "../components/views/staff/order/StaffOrderPage.vue";
import StaffTransportPage from "../components/views/staff/transport/StaffTransportPage.vue";
import StaffShipOrderPage from "../components/views/staff/ship_order/StaffShipOrderPage.vue";
import StaffCheckOrderPage from "../components/views/staff/china_shop/check_order/StaffCheckOrderPage.vue";
import StaffListShipPage from "../components/views/staff/china_shop/list_ship/StaffListShipPage.vue";
import StaffListPackagePage from "../components/views/staff/china_shop/list_package/StaffListPackagePage.vue";
import StaffAddPackagePage from "../components/views/staff/china_shop/add_package/StaffAddPackagePage.vue";
import StaffOrderDetailPage from "../components/views/staff/order_detail/StaffOrderDetailPage.vue";
import StaffTransactionListPage from "../components/views/staff/transaction/list/StaffTransactionListPage.vue";
import WithDrawPage from "../components/views/private/finance/withdraw/WithDrawPage.vue";

const public_routes = [
	{
		path: "/",
		component: () => import("../layouts/PublicLayout.vue"),
		children: [
			{
				path: "",
				name: "Home",
				component: MainPage,
				meta: {
					breadcrumb: "Trang chủ", // Custom breadcrumb label
				},
			},
			{
				path: "gioi-thieu-ve-nhap-hang-china",
				name: "About",
				component: AboutPage,
				meta: {
					breadcrumb: "Trang chủ > Giới thiệu", // Custom breadcrumb label
				},
			},
			{
				path: "danh-muc-chinh-sach",
				name: "Policy",
				component: PolicyPage,
				meta: {
					breadcrumb: "Trang chủ > Chính sách", // Custom breadcrumb label
				},
			},
			{
				path: "huong-dan-tai-va-dang-ky-tai-khoan-tai-app-mua-hang-trung-quoc-nhchina-nhap-hang-china",
				name: "Android",
				component: AndroidPage,
				meta: {
					breadcrumb:
						"Trang chủ > Hướng dẫn > HƯỚNG DẪN TẢI VÀ ĐĂNG KÝ APP MUA HÀNG TRUNG QUỐC - Nhập hàng China trên thiết bị Android", // Custom breadcrumb label
				},
			},
			{
				path: "huong-dan-tai-va-dang-ky-app-mua-hang-trung-quoc-nhap-hang-china-tren-ios",
				name: "IOS",
				component: IOSPage,
				meta: {
					breadcrumb:
						"Hướng dẫn tải và đăng ký app mua hàng Trung Quốc - Nhập hàng China trên IOS", // Custom breadcrumb label
				},
			},
			{
				path: "bang-gia-van-chuyen",
				name: "AuthoBuy",
				component: AuthoBuyPage,
				meta: {
					breadcrumb: "Trang chủ > Bảng giá vận chuyển", // Custom breadcrumb label
				},
			},
			{
				path: "bang-gia-ky-gui",
				name: "DepositPage",
				component: DepositPage,
				meta: {
					breadcrumb: "Trang chủ > Bảng giá ký gửi", // Custom breadcrumb label
				},
			},
			{
				path: "bang-gia-van-chuyen-chinh-ngach",
				name: "TransportPage",
				component: TransportPage,
				meta: {
					breadcrumb: "Trang chủ > Bảng giá vận chuyển chính ngạch", // Custom breadcrumb label
				},
			},
			{
				path: "register",
				name: "RegisterPage",
				component: RegisterPage,
				meta: {
					breadcrumb: "Trang chủ > Đăng ký", // Custom breadcrumb label
				},
			},
			{
				path: "login",
				name: "LoginPage",
				component: LoginPage,
				meta: {
					breadcrumb: "Trang chủ > Đăng nhập", // Custom breadcrumb label
				},
			},
			{
				path: "forgot-pass",
				name: "ForgotPassPage",
				component: ForgotPassPage,
				meta: {
					breadcrumb: "Trang chủ > Quên mật khẩu", // Custom breadcrumb label
				},
			},
			{
				path: "*",
				name: "PageNotFound",
				component: PageNotFound,
			},
		],
	},
];

const private_routes = {
	path: "/manage/",
	component: () => import("../layouts/PrivateLayout.vue"),
	children: [
		{
			path: "dashboard",
			name: "DashBoardPage",
			component: DashBoardPage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "member/deposit",
			name: "TopupPage",
			component: TopupPage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "member/withdraw",
			name: "WithdrawPage",
			component: WithDrawPage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "member/wallet",
			name: "TransactionPage",
			component: TransactionPage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "member/profile",
			name: "ProfilePage",
			component: ProfilePage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "member/vip",
			name: "VipPage",
			component: VipPage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "member/changepass",
			name: "ChangePassPage",
			component: ChangePassPage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "shop",
			name: "TrustedShopPage",
			component: TrustedShopPage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "order/pending",
			name: "PendingPage",
			component: PendingPage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "order/lists",
			name: "ListPage",
			component: ListPage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "complain/lists",
			name: "ComplaintPage",
			component: ComplaintPage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "cart",
			name: "CartPage",
			component: CartPage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "cart/step2",
			name: "CartPage_Step2",
			component: CartPage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "cart/step3",
			name: "CartPage_Step3",
			component: CartPage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "member/reduces",
			name: "ReducePage",
			component: ReducePage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "cart/detail/:orderId",
			name: "OrderDetailPage",
			component: OrderDetailPage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "ship/transport",
			name: "ShipPage",
			component: ShipPage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "ship/finship",
			name: "FinShipPage",
			component: FinShipPage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
		{
			path: "member/shipndvn",
			name: "ShipNDPage",
			component: ShipNDPage,
			beforeEnter: (to, from, next) => RouteGuard.guard(to, from, next),
		},
	],
};

const staff_routes = {
	path: "/staff/",
	component: () => import("../layouts/StaffLayout.vue"),
	children: [
		{
			path: "login",
			name: "StaffLoginPage",
			component: StaffLoginPage,
		},
		{
			path: "dashboard",
			name: "StaffDashboardPage",
			component: StaffDashboardPage,
			beforeEnter: (to, from, next) =>
				RouteGuard.staffGuard(to, from, next),
		},
		{
			path: "ships/listpackage",
			name: "StaffPackagePage",
			component: StaffPackagePage,
			beforeEnter: (to, from, next) =>
				RouteGuard.staffGuard(to, from, next),
		},
		{
			path: "order/list",
			name: "StaffOrderPage",
			component: StaffOrderPage,
			beforeEnter: (to, from, next) =>
				RouteGuard.staffGuard(to, from, next),
		},
		{
			path: "ships/transport",
			name: "StaffTransportPage",
			component: StaffTransportPage,
			beforeEnter: (to, from, next) =>
				RouteGuard.staffGuard(to, from, next),
		},
		{
			path: "shipOrder/list",
			name: "StaffShipOrderPage",
			component: StaffShipOrderPage,
			beforeEnter: (to, from, next) =>
				RouteGuard.staffGuard(to, from, next),
		},
		{
			path: "storecn/checkOrder",
			name: "StaffCheckOrderPage",
			component: StaffCheckOrderPage,
			beforeEnter: (to, from, next) =>
				RouteGuard.staffGuard(to, from, next),
		},
		{
			path: "storecn/listShip",
			name: "StaffListShipPage",
			component: StaffListShipPage,
			beforeEnter: (to, from, next) =>
				RouteGuard.staffGuard(to, from, next),
		},
		{
			path: "storecn/listPackage",
			name: "StaffListPackagePage",
			component: StaffListPackagePage,
			beforeEnter: (to, from, next) =>
				RouteGuard.staffGuard(to, from, next),
		},
		{
			path: "storecn/addPackage",
			name: "StaffAddPackagePage",
			component: StaffAddPackagePage,
			beforeEnter: (to, from, next) =>
				RouteGuard.staffGuard(to, from, next),
		},
		{
			path: "order/detail/:orderId",
			name: "StaffOrderDetailPage",
			component: StaffOrderDetailPage,
			beforeEnter: (to, from, next) => RouteGuard.staffGuard(to, from, next),
		},
		{
			path: "transaction/list",
			name: "StaffTransactionListPage",
			component: StaffTransactionListPage,
			beforeEnter: (to, from, next) =>
				RouteGuard.staffGuard(to, from, next),
		},
	],
};

const router = createRouter({
	history: createWebHistory(),
	routes: public_routes.concat(private_routes).concat(staff_routes),
});

export default router;
