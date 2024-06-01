<!-- template section -->
<template>
    <div id="content" class="fullwidth clearfix">

        <h2 class="title ">Các chức năng chính</h2>
        <div class="dashboard">
            <div class="item_1 clearfix">
                <div class="item">
                    <h3>Đơn hàng</h3>
                    <ul>
                        <li><router-link to="/staff/order/list">Danh sách đơn hàng</router-link></li>
                        <li><router-link to="/staff/ships/listpackage">Kiện hàng</router-link></li>
                        <li><router-link to="/staff/storecn/listPackage">Danh sách bao hàng</router-link></li>
                    </ul>
                </div>



                <div class="item">
                    <h3>Công cụ</h3>
                    <ul>
                        <li><router-link to="/staff/storevn/importship">Nhập kho VN</router-link></li>
                        <li><router-link to="/staff/storevn/check_order">Kiểm hàng và nhập kho</router-link></li>
                        <li><router-link to="/staff/storevn/delivery_order">Giao hàng</router-link></li>
                        <li><router-link to="/staff/statistic/orders">Thống kê toàn bộ đơn hàng</router-link></li>
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