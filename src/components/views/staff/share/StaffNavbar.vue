<template>
    <div id="main_menu">
        <div id="cssmenu">
            <div id="menu-line" style="width: 87px; left: 420.969px;"></div>
            <ul>
                <li class="active has-sub"><span class="submenu-button"></span><a href="#">Đơn hàng</a>
                    <ul>
                        <li><router-link to="/staff/order/list">Danh sách đơn hàng</router-link></li>
                        <li><router-link to="/staff/ships/listpackage">Kiện hàng</router-link></li>
                        <li><router-link to="/staff/ships/transport">Đơn ký gửi</router-link></li>
                    </ul>
                </li>
                <!-- <li class="active "><router-link to="/staff/shipOrder/list">Ship hộ</router-link></li> -->
                <li class="active has-sub"><span class="submenu-button"></span><router-link
                        to="/staff/storecn/listPackage">Kho TQ</router-link>
                    <ul>
                        <li><router-link to="/staff/storecn/checkOrder">Kiểm hàng &amp; nhập kho</router-link></li>
                        <li><router-link to="/staff/storecn/listShip">Vận đơn nhập kho TQ</router-link></li>
                        <li><router-link to="/staff/storecn/listPackage">Danh sách bao hàng</router-link></li>
                        <li><router-link to="/staff/storecn/addPackage">Tạo bao hàng</router-link></li>
                    </ul>
                </li>
                <li class="active has-sub"><span class="submenu-button"></span><a
                        href="#">Kho VN</a>
                    <ul>
                        <li><router-link to="/staff/storevn/importship">Nhập kho VN</router-link></li>
                        <li><router-link to="/staff/storevn/check_order">Kiểm hàng và nhập kho</router-link></li>
                        <li><router-link to="/staff/storevn/lists_ship">Vận đơn nhập kho</router-link></li>
                        <li><router-link to="/staff/storevn/shipundefine">Vận đơn chưa xác định</router-link></li>
                        <li><router-link to="/staff/storevn/delivery_order">Giao hàng</router-link></li>
                        <li><router-link to="/staff/storevn/delivery_list">Danh sách phiếu giao hàng</router-link></li>
                    </ul>
                </li>
                <li class="active has-sub"><span class="submenu-button"></span><a
                        href="#">Mua hàng</a>
                    <ul>
                        <li><router-link to="/staff/tools/find_order">Tra cứu đơn hàng</router-link></li>
                        <li><router-link to="/staff/tools/check_order">Đơn hàng chưa có mã Shop</router-link></li>
                        <li><router-link to="/staff/tools/domfee_order">Đơn hàng chưa có PNĐ</router-link></li>
                        <li><router-link to="/staff/tools/late_orders">Đơn hàng chưa có MVĐ</router-link>
                        </li>
                    </ul>
                </li>
                <li class="active has-sub"><span class="submenu-button"></span><a
                        href="#">Thống kê</a>
                    <ul>
                        <li><a href="https://ql.hangquangchau24h.vn/tools/find_order">Thống kê tiền chênh lệch thương lượng</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/tools/check_order">Thống kê doanh số</a></li>
                        <li><a href="https://ql.hangquangchau24h.vn/delivery/delivery_order">Thống kê toàn bộ đơn hàng</a></li>
                    </ul>
                </li>
                <li class="active has-sub"><span class="submenu-button"></span><a
                        href="#">Khách hàng</a>
                    <ul>
                        <li><router-link to="/staff/customer/data">Data khách hàng</router-link></li>
                        <li><a href="/staff/customer/list">Danh sách khách hàng</a></li>
                    </ul>
                </li>
                <li class="active has-sub"><span class="submenu-button"></span><a
                        href="#">Giao dịch</a>
                    <ul>
                        <li><router-link to="/staff/transaction/list">Danh sách giao dịch</router-link></li>
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