<template>
    <div id="main_menu">
        <div id="cssmenu">
            <div id="menu-line" style="width: 87px; left: 420.969px;"></div>
            <ul>
                <li class="active has-sub"><span class="submenu-button"></span><a
                        href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=1">Đơn hàng</a>
                    <ul>
                        <li><a href="https://ql.hangquangchau24h.vn/ships/listpackage">Kiện hàng</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/ships/transport">Phí khác</a></li>
                    </ul>
                </li>
                <li class="active "><a href="https://ql.hangquangchau24h.vn/shipOrders/lists">Ship hộ</a></li>
                <li class="active has-sub"><span class="submenu-button"></span><a
                        href="https://ql.hangquangchau24h.vn/storecn/lists_package">Kho TQ</a>
                    <ul>
                        <li><a href="https://ql.hangquangchau24h.vn/storecn/check_order">Kiểm hàng &amp; nhập kho</a>
                        </li>
                        <li><a href="https://ql.hangquangchau24h.vn/storecn/lists_ship">Vận đơn nhập kho TQ</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/storecn/lists_package">Danh sách bao hàng</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/storecn/addPackage">Tạo bao hàng</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/storecn/shipundefine">Vận đơn chưa xác định</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/storecn/upload_packages">Upload bao hàng</a></li>
                    </ul>
                </li>
                <li class="active has-sub"><span class="submenu-button"></span><a
                        href="https://ql.hangquangchau24h.vn/storevn/lists_package">Kho VN</a>
                    <ul>
                        <li><a href="https://ql.hangquangchau24h.vn/storevn/importship">Nhập kho VN</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/storevn/lists_ship">Vận đơn nhập kho</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/storevn/shipundefine">Vận đơn chưa xác định</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/storevn/delivery_order">Giao hàng</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/storevn/shiplost">Danh sách vận đơn thất lạc</a>
                        </li>
                        <li><a href="https://ql.hangquangchau24h.vn/storevn/check_order">Kiểm hàng và nhập kho</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/storevn/delivery_notes">Danh sách phiếu giao</a>
                        </li>
                    </ul>
                </li>
                <li class="active has-sub"><span class="submenu-button"></span><a
                        href="https://ql.hangquangchau24h.vn/checkshop/lists">Mua hàng</a>
                    <ul>
                        <li><a href="https://ql.hangquangchau24h.vn/tools/check_order">Kiểm hàng</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/delivery/delivery_order">Giao hàng</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/tools/find_order">Tra cứu đơn hàng</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/tools/late_orders">Đơn hàng khách báo về muộn</a>
                        </li>
                        <li><a href="https://ql.hangquangchau24h.vn/tools/findOrder">Tìm đơn thất lạc</a></li>
                    </ul>
                </li>
                <li class="active has-sub"><span class="submenu-button"></span><a
                        href="https://ql.hangquangchau24h.vn/tools">Công cụ</a>
                    <ul>
                        <li><a href="https://ql.hangquangchau24h.vn/tools/check_order">Kiểm hàng</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/delivery/delivery_order">Giao hàng</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/tools/find_order">Tra cứu đơn hàng</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/tools/late_orders">Đơn hàng khách báo về muộn</a>
                        </li>
                        <li><a href="https://ql.hangquangchau24h.vn/tools/findOrder">Tìm đơn thất lạc</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "StaffNavbar",
    setup() {

    },
    mounted() {

    },
    methods: {
    }
}
</script>

<style scoped>
@import '../../../../assets/styles/staff-menu-styles.css';
@import '../../../../assets/styles/staff-styles.css';

/* #cssmenu > ul {
    display: flex;
    flex-direction: row;
}

.active.has-sub > ul {
    display: none !important;
} */
</style>