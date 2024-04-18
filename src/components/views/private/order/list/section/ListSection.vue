<!-- template section -->
<template>
    <div id="content">
        <div class="container">
            <main class="main" role="main">
                <div class="row main-row">

                    <div class="col-sm-9">
                        <div class="cart-by-page">
                            <div class="titles">
                                <h2 class="page-title">
                                    Danh sách đơn hàng
                                </h2>
                            </div>

                            <div class="filter">
                                <form class="form-horizontal" method="get">
                                    Mã đơn hàng : <input class="custom_input" type="text" name="filter_id" value="">
                                    Từ ngày : <input class="pickdate_from custom_input hasDatepicker" type="text"
                                        id="datepicker_from" name="filter_startdate_create_date" value="">
                                    Đến ngày : <input class="pickdate_to custom_input hasDatepicker" type="text"
                                        id="datepicker_to" name="filter_enddate_create_date" value="">
                                    <br>
                                    <div class="space10"></div>
                                    Kho nhận hàng :
                                    <select name="filter_store" class="custom_input">
                                        <option value="">Chọn kho</option>
                                        <option value="0">Hà Nội</option>
                                        <option value="1">Sài gòn</option>

                                    </select>
                                    Trạng thái đơn hàng :
                                    <select name="filter_status" class="custom_input">
                                        <option value="">Tất cả</option>
                                        <option value="1">Chờ đặt cọc</option>
                                        <option value="2">Đã đặt cọc</option>
                                        <option value="3">Đã mua hàng</option>
                                        <option value="3.1">Hàng đã về kho TQ</option>
                                        <option value="4">Sẵn sàng giao</option>
                                        <option value="5">Đã kết thúc</option>
                                        <option value="-1">Đã hủy</option>
                                    </select>

                                    <input class="button custom_flat_button" type="submit" value="Lọc">
                                </form>
                                <div class="space10"></div>
                            </div>
                            <div>
                                <div class="table-responsive size_medium">
                                    <div class="order_row row_header">
                                        <div class="col-md-4">
                                            <p>Thông tin đơn hàng</p>
                                        </div>
                                        <div class="col-md-4">
                                            <p>Chi tiết</p>
                                        </div>
                                        <div class="col-md-4">
                                            <p>Thanh toán</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="pag">
                                </div>
                                <p><strong>Total: <span class="green">0</span> (Đơn hàng)</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'ListSection',
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
@import '../../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../../assets/styles/private-styles.css';
</style>