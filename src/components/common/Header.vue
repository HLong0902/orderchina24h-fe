<script setup>
import { Icon } from '@iconify/vue';
</script>

<script>
export default {
    name: 'Header',
    data() {
        return {

        };
    },
    /**
     * constructor
     */
    created() {

    },
    /**
     * defined methods
     */
    methods: {
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
                            <p>Tỷ giá: <span>3.580</span></p>
                        </div>
                        <div class="hotline">
                            <Icon icon="bx:support" style="margin-right: 10;" />
                            <p>Hotline: <span>0384.550.304</span></p>
                        </div>
                    </div>
                    <div class="header-top-right col-12 col-md-6">
                        <div class="my-account">
                            <div class="login">
                                <a href="https://muahang.nhaphangchina.vn/login" rel="nofollow">
                                    <Icon icon="bxs:user-detail" style="margin-right: 10;" />
                                    Đăng Nhập
                                </a>
                            </div>
                            <div class="dash">|</div>
                            <div class="resgister">
                                <a rel="nofollow"
                                    href="https://muahang.nhaphangchina.vn/register?utm_source=direct&amp;utm_medium=trang-chu&amp;utm_campaign=trang-chu&amp;utm_term=trang-chu&amp;utm_content=trang-chu">
                                    <Icon icon="bx:log-in" style="margin-right: 10;" />
                                    Đăng ký
                                </a>
                            </div>
                        </div>
                        <div class="cart">
                            <a rel="nofollow" href="https://muahang.nhaphangchina.vn/cart">
                                <Icon icon="bxs:cart" style="margin-right: 10;" />
                                Giỏ Hàng
                            </a>
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
                            <a href="/" title="Trang chủ">
                                <img src="https://nhaphangchina.vn/images/logo_china.png"
                                    alt="Vận chuyển hàng Trung Quốc">
                            </a>
                        </div>
                    </div>
                    <div class="header-right col-4 col-md-9">
                        <b-navbar class="header-menu">
                            <b-navbar-nav id="main-menu" class="main-menu">
                                <b-nav-item href="/" aria-current="page" text="Trang chủ"
                                    class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-93">
                                    Trang Chủ
                                </b-nav-item>
                                <b-nav-item
                                    class="menu-item menu-item-type-custom menu-item-object-custom menu-item-554"
                                    href="/gioi-thieu-ve-nhap-hang-china/">
                                    Giới thiệu
                                </b-nav-item>
                                <b-nav-item-dropdown
                                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-382"
                                    href="/bang-gia-van-chuyen/" text="Bảng Giá">
                                    <b-dropdown-item href="/bang-gia-van-chuyen/"
                                        title="Bảng giá hàng order, mua hộ Trung Quốc" class="active">Bảng
                                        giá hàng order, mua hộ Trung Quốc</b-dropdown-item>

                                    <b-dropdown-item href="/bang-gia-ky-gui/"
                                        title="Bảng giá kí gửi hàng Trung Quốc">Bảng giá kí gửi hàng Trung
                                        Quốc</b-dropdown-item>

                                    <b-dropdown-item href="/bang-gia-van-chuyen-chinh-ngach/"
                                        title="Bảng giá vận chuyển chính ngạch Trung Quốc">Bảng giá vận chuyển chính
                                        ngạch Trung
                                        Quốc</b-dropdown-item>

                                </b-nav-item-dropdown>
                                <b-nav-item-dropdown
                                    class="menu-item menu-item-type-custom menu-item-object-custom menu-item-99"
                                    href="/huong-dan-dat-hang-tren-website-nhap-hang-china/" text="Hướng Dẫn">
                                    <b-dropdown-item
                                        href="/huong-dan-tai-va-dang-ky-tai-khoan-tai-app-mua-hang-trung-quoc-nhchina-nhap-hang-china/"
                                        title="Hướng dẫn tải app" class="active">Hướng dẫn tải APP
                                        Android</b-dropdown-item>

                                    <b-dropdown-item
                                        href="/huong-dan-tai-va-dang-ky-app-mua-hang-trung-quoc-nhap-hang-china-tren-ios/"
                                        title="Hướng dẫn tải app Ios" class="active">Hướng dẫn tải APP
                                        IOS</b-dropdown-item>

                                </b-nav-item-dropdown>
                                <b-nav-item class="menu-item menu-item-type-custom menu-item-object-custom menu-item-98"
                                    href="/danh-muc-chinh-sach">
                                    Chính sách
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

.main-menu {
    padding: 0;
    margin: 0;
}

.main-menu>li:not(:last-child) {
    margin-right: 1.2rem;
}

::v-deep .nav-link {
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
}

header {
    display: block;
}
</style>
