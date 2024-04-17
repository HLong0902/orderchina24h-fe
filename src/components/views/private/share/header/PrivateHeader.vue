<template>
    <header class="main-header">
        <!-- Logo -->
        <a href="https://nhaphangchina.vn" class="logo" target="_blank">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><img src="https://nhaphangchina.vn/wp-content/uploads/2019/09/logo_china.png"
                    alt=""></span>
            <!-- logo for regular state and mobile devices -->
            <!-- <span class="logo-lg"><b>Admin</b>LTE</span> -->
            <span class="logo-lg"><img src="https://nhaphangchina.vn/wp-content/uploads/2019/09/logo_china.png"></span>
        </a>
        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top">
            <!-- Sidebar toggle button-->
            <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <fa icon="list-ul"></fa>
            </a>
            <div class="pull-left text-rate text-danger">Tỷ giá: <b class="text-danger">3.580đ </b></div>
            <!-- Navbar Right Menu -->
            <div class="navbar-custom-menu notification-chipo ng-scope">
                <ul class="nav navbar-nav">
                    <li class="text-number hidden-xs"><span class="text-danger" title="Số dư ví">0đ</span></li>
                    <li class="dropdown cart-menu">
                        <a href="/cart">
                            <fa icon="shopping-cart"></fa>
                            <span class="label label-warning totalCartItem">0</span>
                        </a>
                    </li>
                    <!--System Notification-->
                    <li class="dropdown tasks-menu">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown"
                            ng-click="getNotificationSystems()">
                            <fa icon="globe-americas"/>
                            <!-- ngIf: countNotificationSystem >0 && !clickViewNoteSystem -->
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <!-- inner menu: contains the actual data -->
                                <div class="slimScrollDiv"
                                    style="position: relative; overflow: hidden; width: auto; height: 200px;">
                                    <ul class="menu list-group hidden"
                                        ng-class="{'hidden':notificationSystems == undefined || notificationSystems.length == 0}"
                                        style="margin-bottom: 0px; overflow: hidden; width: 100%; height: 200px;">
                                        <!-- ngRepeat: notifi in notificationSystems -->
                                    </ul>
                                    <div class="slimScrollBar"
                                        style="background: rgb(0, 0, 0); width: 3px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px;">
                                    </div>
                                    <div class="slimScrollRail"
                                        style="width: 3px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;">
                                    </div>
                                </div>
                                <!-- ngIf: loadNotificationSystem && (notificationSystems == undefined || notificationSystems.length == 0) -->
                            </li>
                        </ul>
                    </li>
                    <!-- Notifications: style can be found in dropdown.less -->
                    <li class="dropdown tasks-menu">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown"
                            onclick="showNotificationOverLay(this)">
                            <fa icon="bell"></fa>
                        </a>

                        <ul class="dropdown-menu" id="notificationGenernal">
                            <li>

                            </li>
                            <li class="list-group-item text-center">Không có thông báo</li>

                        </ul>
                    </li>
                    <!-- User Account: style can be found in dropdown.less -->
                    <li class="dropdown user user-menu">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="https://www.gravatar.com/avatar/0f780783d400c0776a205d3f88b9737a?s=164&amp;d=wavatar&amp;r=g"
                                data-phone="0943883280" class="user-image avatarSmall customer-avatar" alt="User Image">
                            <span class="hidden-xs">thanhdat.vnu</span>
                        </a>
                        <ul class="dropdown-menu">
                            <!-- User image -->
                            <li class="user-header">
                                <img src="https://www.gravatar.com/avatar/0f780783d400c0776a205d3f88b9737a?s=164&amp;d=wavatar&amp;r=g"
                                    class="img-circle customer-avatar" alt="User Image">
                                <p>thanhdat.vnu <small>Tham gia từ 05-04-2024</small>
                                </p>
                            </li>
                            <!-- Menu Body -->
                            <li class="user-body">
                                <ul class="list-unstyled">
                                    <li>
                                        <a href="/member/wallet" style="float:left"><fa icon="money"></fa> Số dư:
                                            <span class="text-red text-blue pull-right cashBalance"
                                                style="padding-left: 8px;">0đ</span> </a>
                                        <a href="/member/deposit" type="submit" class="btn btn-default btn-xs"
                                            style="margin-left: 20px;">Nạp tiền</a>
                                    </li>
                                    <li><a href="/member/profile"><fa icon="user"></fa> Thông tin cá nhân </a></li>
                                    <!-- <li><a href="#/tao-don-nhap-hang"><fa icon="download"></fa> Tạo đơn hàng nhập </a></li> -->
                                    <li><a href="/order/lists"><fa icon="files-o"></fa> Danh sách đơn hàng </a>
                                    </li>
                                    <li><a href="/member/wallet"><fa icon="exchange"></fa> Quản lý giao dịch </a>
                                    </li>
                                </ul>
                                <!-- /.row -->
                            </li>
                            <!-- Menu Footer-->
                            <li class="user-footer">
                                <div class="pull-right">
                                    <a href="member/loggout" class="btn btn-default btn-flat"> <fa
                                        icon="sign-out"></fa>Thoát </a>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <!-- Control Sidebar Toggle Button -->
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
    name: "PrivateHeader",
    setup() {

    },
    mounted() {

    }
}
</script>

<style scoped>
@import '../../../../../assets/styles/_all-skins.css';
@import '../../../../../assets/styles/tuorder.min.css';
@import '../../../../../assets/styles/font-awesome.min.css';

.main-header .logo img {
    width: 150px;
}

.logo-mini img {
    width: 40px !important;
}

.main-header>.logo {
    background-color: #3c555d;
    color: #333;
    border-bottom: 0 solid transparent;
    width: 15vw;
    min-width: 250px;
}

.main-header .navbar {
    background-color: #fff;
    max-height: 50px;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
}

.main-header .navbar>.sidebar-toggle {
    color: #333;
    border-right: 1px solid #eee;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}

.text-danger {
    color: #f17d59 !important;
}

.pull-left {
    float: left !important;
}

.main-header .navbar-custom-menu {
    float: right;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}

.navbar-nav {
    float: left;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
}

.navbar-custom-menu>.navbar-nav>li {
    padding: 10px;
}

.navbar-custom-menu .text-number {
    padding: 15px 10px;
}

/* .main-header .navbar .navbar-custom-menu .navbar-nav>li>a {
    border-left: 1px solid #eee;
    border-right-width: 0;
} */

/* .main-header .navbar .navbar-nav>li>a {
    border-right: 1px solid #eee;
} */
.main-header .navbar .nav>li>a {
    color: #333;
}

.tasks-menu .slimScrollDiv {
    height: auto !important;
}

.tasks-menu .slimScrollDiv ul {
    padding-left: 0;
    height: 350px !important;
}

.tasks-menu .slimScrollDiv ul > li {
    padding: 10px;
}

.main-header .navbar .navbar-custom-menu .navbar-nav>li>a::after {
    display: none;
}

.main-header .sidebar-toggle:before {
    content: "";
}

.main-header .sidebar-toggle {
    padding: 13px 13px !important;
}

img {
    display: inline-block;
    vertical-align: middle;
    border-style: none;
    max-width: 100%;
    height: auto;
    object-fit: cover;
}
</style>