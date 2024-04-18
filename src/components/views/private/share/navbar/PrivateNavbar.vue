<!-- import section -->
<script setup>
import { Icon } from '@iconify/vue';
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
                            <router-link to="/manage/dashboard">Bảng tin</router-link>
                        </li>
                        <li class="dropdown">
                            <fa class="fa-icon" icon="file-text"></fa>
                            <a href="#" @click="toggleOption">Đơn hàng</a>
                            <span class="caret"></span>
                            <ul class="dropdown-menu">
                                <li><a href="https://giaodich.hangquangchau24h.vn/order/pending">Đang chờ cọc</a></li>
                                <li><a href="https://giaodich.hangquangchau24h.vn/order/lists">Toàn bộ đơn hàng</a></li>
                                <li><a href="https://giaodich.hangquangchau24h.vn/order/lists">Đơn hàng ký gửi</a></li>
                                <li><a href="https://giaodich.hangquangchau24h.vn/complain/lists">Khiếu nại</a></li>
                                <li><a href="https://giaodich.hangquangchau24h.vn/member/reduces">Giảm trừ đơn hàng</a>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <fa class="fa-icon" icon="archive" aria-hidden="true"></fa>
                            <a href="#" @click="toggleOption">Kiện hàng</a>
                            <span class="caret"></span>
                            <ul class="dropdown-menu">
                                <li><a href="https://giaodich.hangquangchau24h.vn/ship/transport">Danh sách kiện</a>
                                </li>
                                <li><a href="https://giaodich.hangquangchau24h.vn/ship/finship">Tra cứu kiện hàng</a>
                                </li>
                                <li><a href="https://giaodich.hangquangchau24h.vn/member/shipndvn">Phí VC nội địa</a>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <fa class="fa-icon" icon="money" aria-hidden="true"></fa>
                            <a href="#" @click="toggleOption">Tài chính</a>
                            <span class="caret"></span>
                            <ul class="dropdown-menu">
                                <li><a href="https://giaodich.hangquangchau24h.vn/member/wallet">Xem giao dịch</a></li>
                                <li><a href="https://giaodich.hangquangchau24h.vn/member/deposit">Nạp tiền</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <fa class="fa-icon" icon="user" aria-hidden="true"></fa>
                            <a href="#" @click="toggleOption">Tài khoản</a>
                            <span class="caret"></span>
                            <ul class="dropdown-menu">
                                <li><a href="https://giaodich.hangquangchau24h.vn/member/profile">Thông tin cá nhân</a>
                                </li>

                                <li><a href="https://giaodich.hangquangchau24h.vn/member/vip">Cấp độ VIP</a></li>

                                <li><a href="https://giaodich.hangquangchau24h.vn/member/changepass">Đổi mật khẩu</a>
                                </li>
                                <li><a href="https://giaodich.hangquangchau24h.vn/member/loggout">Đăng xuất</a></li>
                            </ul>
                        </li>

                        <li class="dropdown">
                            <fa class="fa-icon" icon="hospital"></fa>
                            <a target="_blank" href="https://hangquangchau24h.vn/bang-gia-nhap-hang/">Bảng giá</a>
                        </li>
                        <li class="dropdown">
                            <fa class="fa-icon" icon="star"></fa>
                            <a href="https://giaodich.hangquangchau24h.vn/shop">Shop uy tín</a>
                        </li>


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
    methods: {
        toggleOption(e) {
            e.preventDefault()
            e.target.nextElementSibling.nextElementSibling.classList.toggle('open')
        },
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
    width: 1170px;
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

.dropdown-menu.open > li {
    padding: 0px 20px !important;
    font-size: 16px;
}

li {
    list-style: none;
    margin: 0px;
    padding: 0px;
}

</style>