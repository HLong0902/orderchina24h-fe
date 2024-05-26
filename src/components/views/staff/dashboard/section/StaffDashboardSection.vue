<!-- template section -->
<template>
    <div id="content" class="fullwidth clearfix">

        <h2 class="title ">Các chức năng chính</h2>
        <div class="dashboard">
            <div class="item_1 clearfix">
                <div class="item">
                    <h3>Đơn hàng</h3>
                    <ul>
                        <li><a href="/orders">Danh sách</a></li>
                        <li><a href="/ships/transport">Vận đơn Quảng Châu - Việt Nam</a>
                        </li>
                        <li><a href="/complain/lists">Khiếu nại Shop</a></li>
                    </ul>
                </div>



                <div class="item">
                    <h3>Công cụ</h3>
                    <ul>
                        <li><a href="/storevn/ships">Nhập kho Việt Nam</a></li>
                        <li><a href="/tools/check_order">Kiểm hàng</a></li>
                        <li><a href="/delivery/delivery_order">Giao hàng</a></li>
                        <li><a href="/tools/package">Thống kê cân nặng</a></li>
                    </ul>
                </div>


            </div>
            <div class="item_2 clearfix">

            </div>
        </div>

    </div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'StaffDashboardSection',
    data() {
        return {

        }
    },
    created() {

    },
    methods: {

    }
}
</script>

<!-- style custom -->
<style scoped>
@import '../../../../../assets/styles/staff-styles.css';
@import '../../../../../assets/styles/staff-menu-styles.css';
</style>