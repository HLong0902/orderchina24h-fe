<!-- import section -->
<script setup>
import { Icon } from '@iconify/vue';
import VueCookie from "vue-cookie";
</script>

<!-- template section -->
<template>
    <div class="main_menu">
        <nav class="navbar navbar-static-top">
            <div class="container">
                <div id="navbar" class="navbar-collapse collapse" aria-expanded="false">
                    <ul class="nav navbar-nav">

                        <li class="dropdown">
                            <fa class="fa-icon" icon="tachometer" aria-hidden="true"></fa>
                            <router-link @click="collapse" to="/manage/dashboard">Bảng tin</router-link>
                        </li>
                        <li class="dropdown">
                            <fa class="fa-icon" icon="file-text"></fa>
                            <a href="#" @click="toggleOption">Đơn hàng</a>
                            <span class="caret"></span>
                            <ul class="dropdown-menu">
                                <li><router-link @click="collapse" to="/manage/order/pending">Đang chờ cọc</router-link>
                                </li>
                                <li><router-link @click="collapse" to="/manage/order/lists">Toàn bộ đơn
                                        hàng</router-link></li>
                                <li><router-link @click="collapse" to="/manage/order/deposit">Đơn hàng ký
                                        gửi</router-link></li>
                                <li><router-link @click="collapse" to="/manage/order/list_deposit">Danh sách đơn ký
                                        gửi</router-link></li>
                                <!-- <li><router-link @click="collapse" to="/manage/complain/lists">Khiếu nại</router-link>
                                </li>
                                <li><router-link @click="collapse" to="/manage/member/reduces">Giảm trừ đơn
                                        hàng</router-link>
                                </li> -->
                                <li><router-link @click="collapse" to="/manage/order/other_ecommerce">Tạo đơn trên sàn
                                        khác</router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <fa class="fa-icon" icon="archive" aria-hidden="true"></fa>
                            <a href="#" @click="toggleOption">Kiện hàng</a>
                            <span class="caret"></span>
                            <ul class="dropdown-menu">
                                <li><router-link @click="collapse" to="/manage/ship/transport">Danh sách
                                        kiện</router-link>
                                </li>
                                <li><router-link @click="collapse" to="/manage/ship/finship">Tra cứu kiện
                                        hàng</router-link>
                                </li>
                                <li><router-link @click="collapse" to="/manage/member/shipndvn">Phí VC nội
                                        địa</router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <fa class="fa-icon" icon="money-bill-1" aria-hidden="true"></fa>
                            <a href="#" @click="toggleOption">Tài chính</a>
                            <span class="caret"></span>
                            <ul class="dropdown-menu">
                                <li><router-link @click="collapse" to="/manage/member/wallet">Xem giao
                                        dịch</router-link></li>
                                <li><router-link @click="collapse" to="/manage/member/deposit">Nạp tiền</router-link>
                                </li>
                                <li><router-link @click="collapse" to="/manage/member/withdraw">Rút tiền</router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <fa class="fa-icon" icon="user" aria-hidden="true"></fa>
                            <a href="#" @click="toggleOption">Tài khoản</a>
                            <span class="caret"></span>
                            <ul class="dropdown-menu">
                                <li><router-link @click="collapse" to="/manage/member/profile">Thông tin cá
                                        nhân</router-link>
                                </li>

                                <li><router-link @click="collapse" to="/manage/member/changepass">Đổi mật
                                        khẩu</router-link>
                                </li>
                                <li><a href="#" @click="handleLogout">Đăng xuất</a></li>
                            </ul>
                        </li>

                        <li class="dropdown">
                            <fa class="fa-icon" icon="hospital"></fa>
                            <a @click="navigatePricePage" href="#">Bảng giá</a>
                        </li>
                        <!-- <li class="dropdown">
                            <fa class="fa-icon" icon="star"></fa>
                            <router-link @click="collapse" to="/manage/shop">Shop uy tín</router-link>
                        </li> -->


                    </ul>
                </div>
                <!--/.nav-collapse -->
            </div>
        </nav>
    </div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'PrivateNavbar',
    data() {
        return {

        }
    },
    created() {

    },
    watch: {
        $route(to, from) {
            document.querySelectorAll(".open")
                .forEach(el => el.classList.toggle('open'))
        }
    },
    methods: {
        toggleOption(e) {
            e.preventDefault()
            e.target.nextElementSibling.nextElementSibling.classList.toggle('open')
        },
        handleLogout() {
            localStorage.removeItem('userDto');
            localStorage.removeItem('jwtToken');
            VueCookie.delete("x-order-china24h");
            this.$router.push({ path: "/login" })
        },
        navigatePricePage() {
            window.open("/bang-gia-van-chuyen")
        },
        collapse() {
            document.querySelectorAll('.open').forEach($ => $.classList.toggle('open'))
        }
    }
}
</script>

<!-- style custom -->
<style scoped>
@import '../../../../../assets/styles/bootstrap.min.css';

.main_menu {
    background: #00a79c;
    font-size: 13px;
}

.navbar {
    border-width: 0px !important;
    min-height: auto !important;
}

.container {
    width: 100%;
}

button.navbar-toggle {
    background: #fff !important;
}

button.navbar-toggle span {
    background: #000 !important;
}

.navbar-toggle .icon-bar {
    display: block;
    width: 22px;
    height: 2px;
    border-radius: 1px;
}

.main_menu a {
    color: #fff;
    font-weight: 600;
    text-transform: uppercase;
    background: none !important;
    display: inline-block !important;
    padding: 12px 5px 12px 1px !important;
    font-size: 16px;
}

.main_menu li {
    padding: 0px 10px !important;
}

.nav.navbar-nav {
    display: flex;
    flex-direction: row;
}

.main_menu .caret {
    color: #fdf6d1 !important;
    font-size: 20px;
}

.caret {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px solid;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
}

.fa-icon {
    color: #fdf6d1;
    font-size: 20px;
    padding: 0px 5px;
}

.dropdown-menu.open {
    display: flex !important;
    flex-direction: column !important;
}

.dropdown-menu.open>li {
    padding: 0px 20px !important;
    font-size: 16px;
}

li {
    list-style: none;
    margin: 0px;
    padding: 0px;
}
</style>