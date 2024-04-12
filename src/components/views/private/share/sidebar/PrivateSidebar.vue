<template>
    <aside class="main-sidebar" style="padding-top: 50px; width: 20vw">
        <!-- sidebar: style can be found in sidebar.less -->

        <section class="sidebar" style="height: auto; overflow: hidden; width: auto;">
            <!-- Sidebar user panel -->
            <div class="user-panel">
                <div class="pull-left image">
                    <img src="https://www.gravatar.com/avatar/0f780783d400c0776a205d3f88b9737a?s=164&amp;d=wavatar&amp;r=g"
                        class="img-circle customer-avatar" alt="AVATAR">
                </div>
                <div class="pull-left info">
                    <p>thanhdat.vnu</p>
                    <span class="label label-success" title="Cấp độ khách hàng"><fa icon="trophy"></fa> VIP
                        0</span>
                </div>
            </div>
            <form action="javascript:" method="get" class="sidebar-form ng-pristine ng-valid"
                style="padding-bottom: 4px; border: none; margin: 0px 10px; --darkreader-inline-border-top: none; --darkreader-inline-border-right: none; --darkreader-inline-border-bottom: none; --darkreader-inline-border-left: none;"
                data-darkreader-inline-border-top="" data-darkreader-inline-border-right=""
                data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left="">
                <div class="input-group" style="float: left; font-size:13px">
                    <span style="color: white; --darkreader-inline-color: #e8e6e3;" data-darkreader-inline-color=""><fa
                            icon="home"></fa> </span>
                    <span class="label label-success" title="Kho nhận hàng">
                        [2] Yên Hòa - Cầu Giấy - Hà Nội </span>
                </div>
            </form>
            <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul class="sidebar-menu">
                <li class="header">Tác vụ quản lý</li>
                <li class="treeview">
                    <a href="/dashboard"><fa icon="dashboard"></fa> <span>Thống kê chung</span></a>
                </li>
                <li class="treeview-search"><a href="/order/searchproduct"><fa icon="search"></fa> <span>Tìm kiếm sản
                        phẩm</span> </a></li>
                <li class="treeview">
                    <a href="javascript:;">
                        <fa icon="pie-chart"></fa>
                        <span>Quản lý nhập hàng</span>
                        <span class="pull-right-container">
                            <Icon icon="la:angle-left" />
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li><a href="/order/lists"><fa icon="files-o"></fa> Danh sách đơn hàng </a></li>
                        <!-- <li><a class="hidden-xs" href="" target="_blank"><fa icon="chrome"></fa> Công cụ đặt hàng </a></li> -->
                        <li><a href="/ship/transport"><fa icon="cube"></fa> Danh sách kiện hàng </a></li>
                        <li><a href="/complain/lists"><fa icon="frown-o"></fa> Danh sách khiếu nại </a></li>
                    </ul>
                </li>
                <li class="treeview menu-delivery-manager">
                    <a href="javascript:;">
                        <fa icon="truck"></fa>
                        <span>Quản lý giao hàng</span>
                        <span class="pull-right-container">
                            <Icon icon="la:angle-left" />
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li class="delivery-request"><a href="/storevn/delivery_order?store=6"><fa
                                    icon="rocket"></fa> Yêu cầu giao hàng </a></li>
                        <li class="delivery-notes"><a href="/storevn/delivery_note"><fa icon="navicon"></fa> Danh
                                sách phiếu giao </a></li>
                    </ul>
                </li>
                <!-- <li class="treeview menu-delivery-manager">
                       <a href="javascript:;">
                       <fa icon="truck"></fa>
                       <span>Quản lý giao hàng</span>
                       <span class="pull-right-container">
                       <Icon icon="la:angle-left" />
                       </span>
                       </a>
                       <ul class="treeview-menu">
                          <li class="delivery-request"><a href="/storevn/delivery_order"><fa icon="rocket"></fa> Yêu cầu giao hàng </a></li>
                          <li class="delivery-notes"><a href="/storevn/delivery_notes"><fa icon="navicon"></fa> Danh sách phiếu giao </a></li>
                       </ul>
                    </li> -->
                <li class="treeview">
                    <a href="javascript:;">
                        <fa icon="usd"></fa> <span>Quản lý ví tiền</span>
                        <span class="pull-right-container">
                            <Icon icon="la:angle-left" />
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li><a href="/member/deposit"><fa icon="sign-in"></fa> Nạp tiền </a></li>
                        <li><a href="/member/wallet"><fa icon="exchange"></fa> Giao dịch </a></li>
                        <li><a href="/member/bank"><fa icon="credit-card"></fa> Tài khoản ngân hàng </a></li>
                        <li><a href="/member/money"><fa icon="sign-out"></fa> Rút tiền </a></li>
                    </ul>
                </li>
                <li class="treeview">
                    <a href="javascript:;">
                        <fa icon="user"></fa> <span>Cá nhân</span>
                        <span class="pull-right-container">
                            <Icon icon="la:angle-left" />
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li><a href="/member/profile"> <fa icon="user"></fa> <span>Thông tin cá nhân</span></a>
                        </li>
                        <li><a href="/member/changepass"> <fa icon="lock"></fa> <span>Đổi mật khẩu</span></a></li>
                        <li><a href="/cart/favorite"><fa icon="heart"></fa> Sản phẩm đã lưu </a></li>
                        <li><a href="/member/levelvip"> <fa icon="star"></fa> <span>Cấp độ Vip</span></a></li>
                        <!--<li><a href="#/cau-hinh-thong-bao"><fa icon="cog"></fa> Cấu hình thông báo </a></li>-->
                    </ul>
                </li>
                <li class="treeview">
                    <a href="javascript:;">
                        <fa icon="info-circle"></fa>
                        <span>Góc thông tin</span>
                        <span class="pull-right-container">
                            <Icon icon="la:angle-left" />
                        </span>
                    </a>
                    <ul class="treeview-menu" style="display: none;">
                        <li><a href="https://nhaphangchina.vn/bang-gia-van-chuyen/" target="_blank"><fa
                                    icon="angle-right"></fa> Biểu phí </a></li>
                        <li><a href="https://nhaphangchina.vn/chinh-sach-van-chuyen/" target="_blank"><fa
                                    icon="angle-right"></fa> Quy định và chính sách </a></li>
                        <li><a href="https://nhaphangchina.vn/huong-dan-dat-hang-tren-website-nhap-hang-china/"
                                target="_blank"><fa icon="angle-right"></fa> Hướng dẫn nhập hàng </a></li>
                    </ul>
                </li>
                <li class="treeview">
                    <a href="tel:0384.550.304"> <fa icon="life-ring"></fa><span> Hotline 1:
                            <strong>0384.550.304</strong> </span></a>
                    <ul class="treeview-menu" style="display: none;"></ul>
                </li>
                <li class="treeview">
                    <a href="tel://0865632296"> <fa icon="phone"></fa><span> Kho Hoàng Mai:
                            <strong>0865632296</strong> </span></a>
                    <ul class="treeview-menu" style="display: none;"></ul>
                </li>
                <li class="treeview ">
                    <a href="tel://076.348.5555"> <fa icon="phone"></fa><span> Kho Hà Đông:
                            <strong>076.348.5555</strong> </span></a>
                    <ul class="treeview-menu"></ul>
                </li>
                <li class="treeview ">
                    <a href="tel://0973566791"> <fa icon="phone"></fa><span> Kho Cầu Giấy:
                            <strong>0973.566.791</strong> </span></a>
                    <ul class="treeview-menu"></ul>
                </li>
                <li class="treeview ">
                    <a href="tel://076.329.1688"> <fa icon="phone"></fa><span> Kho Tân Bình:
                            <strong>076.329.1688</strong> </span></a>
                    <ul class="treeview-menu"></ul>
                </li>
                <li class="treeview ">
                    <a href="tel://0981361688"> <fa icon="phone"></fa><span> Kho Quận 3:
                            <strong>098.136.1688</strong> </span></a>
                    <ul class="treeview-menu"></ul>
                </li>
                <li class="treeview">
                    <a href="tel://033.497.1688"> <fa icon="phone"></fa><span> Kho Quận 10:
                            <strong>033.497.1688</strong> </span></a>
                    <ul class="treeview-menu" style="display: none;"></ul>
                </li>
                <li class="treeview ">
                    <a href="tel://0373.781.473"> <fa icon="phone"></fa><span> Kho Đà Nẵng:
                            <strong>0373.781.473</strong> </span></a>
                    <ul class="treeview-menu"></ul>
                </li>
            </ul>
        </section>



        <!-- /.sidebar -->
    </aside>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
    name: "PrivateSidebar",
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
@import '../../../../../assets/styles/bootstrap.min.css';

.main-sidebar {
    background-color: #222d32;
}

.user-panel>.info {
    color: #fff;
}

.sidebar-menu>li.header {
    color: #688c9b;
    background: #1a2226;
    font-size: 13px;
    width: 20vw;
}

.navbar-nav>li>a {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
}


.sidebar-menu>li.active>a {
    color: #fff;
}

.sidebar a {
    color: #b8c7ce;
    font-size: 14px;
}

.sidebar a > span {
    padding-left: 10px;
}

body {
    color: white;
}
</style>