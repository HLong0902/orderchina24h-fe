<script setup>
import { Icon } from '@iconify/vue';
import CONSTANT from '../../constants/constants';
import ApiCaller from '../utils/ApiCaller';
import ROUTES from '../../constants/routeDefine';
import { useCommonStore } from "../../store/CommonStore"
</script>

<script>
export default {
    name: 'Header',
    data() {
        return {
            commonStore: useCommonStore(),
        };
    },
    /**
     * constructor
     */
    mounted() {
        this.getExchangeRate();
    },
    /**
     * defined methods
     */
    methods: {
        async getExchangeRate() {
            const link = ROUTES.Information.getValueByCode(CONSTANT.EXCHANGE_RATE);
            const res = await ApiCaller.post(link);
            const exchangeRate = parseInt(res.data[0].value);
            this.commonStore.setExchangeRate(exchangeRate);
        },
    }
};
</script>

<template>
    <header class="header-nav">
        <div class="header-top header-top-wrapper">
            <div class="container">
                <div class="row">
                    <div class="header-top-left col-12 col-md-6">
                        <div class="exchange-rate">
                            <Icon icon="bx:bxs-dollar-circle" style="margin-right: 10;" />
                            <p>Tỷ giá: <span>{{ (commonStore.exchange_rate / 1000).toFixed(3).replace('.', ',') }}</span></p>
                        </div>
                        <div class="hotline">
                            <Icon icon="bx:support" style="margin-right: 10;" />
                            <p>Hotline: <span>0384.550.304</span></p>
                        </div>
                    </div>
                    <div class="header-top-right col-12 col-md-6">
                        <div class="my-account">
                            <div class="login">
                                <router-link
                                    to="/login">
                                    <Icon icon="bx:log-in" style="margin-right: 10;" />
                                    Đăng nhập
                                </router-link>
                            </div>
                            <div class="dash">|</div>
                            <div class="resgister">
                                <router-link
                                    to="/register">
                                    <Icon icon="bx:log-in" style="margin-right: 10;" />
                                    Đăng ký
                                </router-link>
                            </div>
                        </div>
                        <div class="cart">
                            <router-link rel="nofollow" to="/manage/cart">
                                <Icon icon="bxs:cart" style="margin-right: 10;" />
                                Giỏ Hàng
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-header-wrapper">
            <div class="container">
                <div class="row">
                    <div class="header-left col-8 col-md-3">
                        <div class="logo">
                            <router-link to="/" title="Trang chủ">
                                <img src="../../assets/icons/logo.png"
                                    alt="Vận chuyển hàng Trung Quốc"
                                    style="height: 90px;">
                            </router-link>
                        </div>
                    </div>
                    <div class="header-right col-4 col-md-9">
                        <b-navbar class="header-menu">
                            <b-navbar-nav id="main-menu" class="main-menu">
                                <b-nav-item aria-current="page" text="Trang chủ"
                                    class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-93">
                                    <router-link to="/">Trang Chủ</router-link>
                                </b-nav-item>
                                <b-nav-item
                                    class="menu-item menu-item-type-custom menu-item-object-custom menu-item-554">
                                    <router-link to="/gioi-thieu-ve-nhap-hang-china">Giới thiệu</router-link>
                                </b-nav-item>
                                <b-nav-item-dropdown
                                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-382"
                                    text="Bảng Giá">
                                    <b-dropdown-item
                                        title="Bảng giá hàng order, mua hộ Trung Quốc" class="active">
                                        <router-link to="/bang-gia-van-chuyen/">Bảng giá hàng order, mua hộ Trung Quốc</router-link>
                                    </b-dropdown-item>

                                    <b-dropdown-item 
                                        title="Bảng giá kí gửi hàng Trung Quốc">
                                        <router-link to="/bang-gia-ky-gui/">Bảng giá kí gửi hàng Trung Quốc</router-link>
                                    </b-dropdown-item>

                                    <b-dropdown-item
                                        title="Bảng giá vận chuyển chính ngạch Trung Quốc">
                                        <router-link to="/bang-gia-van-chuyen-chinh-ngach/">Bảng giá vận chuyển chính ngạch Trung Quốc</router-link>
                                    </b-dropdown-item>

                                </b-nav-item-dropdown>

                                <b-nav-item-dropdown
                                    class="menu-item menu-item-type-custom menu-item-object-custom menu-item-99"
                                    text="Hướng Dẫn">
                                    <b-dropdown-item
                                        title="Hướng dẫn tải app" class="active">
                                        <router-link to="/huong-dan-tai-va-dang-ky-tai-khoan-tai-app-mua-hang-trung-quoc-nhchina-nhap-hang-china/">Hướng dẫn tải APP Android</router-link>
                                    </b-dropdown-item>

                                    <b-dropdown-item
                                        title="Hướng dẫn tải app Ios" class="active">
                                        <router-link to="/huong-dan-tai-va-dang-ky-app-mua-hang-trung-quoc-nhap-hang-china-tren-ios/">Hướng dẫn tải APP IOS</router-link>
                                    </b-dropdown-item>

                                </b-nav-item-dropdown>
                                <b-nav-item class="menu-item menu-item-type-custom menu-item-object-custom menu-item-98">
                                    <router-link to="/danh-muc-chinh-sach">Chính sách</router-link>
                                </b-nav-item>
                            </b-navbar-nav>
                        </b-navbar>
                        <div class="br-icon-menu">
                            <i class="bx bx-menu"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
.container {
    max-width: 1200px;
}

.header-nav {
    background-color: #3c555d;
}

.header-top {
    background: #364c54;
}

.container {
    max-width: 1200px;
}

.row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}

.header-top-left {
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.header-top-left .exchange-rate {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.header-top-left .hotline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.header-top-left>div {
    min-height: 2rem;
    padding-right: .7rem;
    padding-left: .7rem;
    border-left: 1px solid rgba(255, 255, 255, .1);
}

.header-top-left p {
    margin-bottom: 0;
}

.header-top-left>div span {
    color: #f17d59;
}

.header-top-left>div:last-child {
    border-right: 1px solid rgba(255, 255, 255, .1);
}

.header-top-right {
    justify-content: flex-end;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.header-top-right .my-account {
    height: 100%;
    padding: 0 1rem;
    background: rgba(255, 255, 255, .1);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.header-top-right .my-account>div a {
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.header-top-right .my-account .dash {
    padding: 0 1rem;
    color: #fff;
}

.header-top-right .my-account>div a {
    color: #fff;
}

.header-top-right .cart {
    margin-left: 1.5rem;
}

.header-top-right .cart a {
    color: #fff;
}

.main-header-wrapper {
    padding: .9rem 0 .5rem;
}

img {
    display: inline-block;
    vertical-align: middle;
    border-style: none;
    max-width: 100%;
    height: auto;
    object-fit: cover;
}

.main-header-wrapper .header-menu {
    justify-content: flex-end;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

:deep(.dropdown .dropdown-menu) {
    background-color: #ec663d;
    opacity: 0.8;
    border-radius: 5px;
}

:deep(.dropdown-item:hover) {
    background-color: #ff3c00;
    border-radius: 5px;
}

.main-menu {
    padding: 0;
    margin: 0;
}

.main-menu>li:not(:last-child) {
    margin-right: 1.2rem;
}

:deep(.nav-link) {
    color: #fff !important;
}

.main-menu>li {
    display: inline-block;
    position: relative;
    text-transform: uppercase;
    font-weight: 500;
    text-transform: uppercase;
}

a {
    cursor: pointer;
    color: #fff;
}

header {
    display: block;
}
</style>
