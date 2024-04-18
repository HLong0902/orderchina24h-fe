<!-- template section -->
<template>
    <div id="content">
        <div class="container">
            <main class="main" role="main">
                <div class="row main-row">
                    <div class="col-sm-12">
                        <div class="cart-by-page">
                            <div class="titles">
                                <h2 class="page-title">
                                    Danh sách kiện hàng
                                </h2>
                            </div>
                            <div class="filter">
                                <form class="form-horizontal" method="get">
                                    Mã đơn hàng : <input class="custom_input" type="text" name="filter_invoiceid"
                                        value="">
                                    Mã vận đơn : <input class="custom_input" type="text" name="filter_shipid" value="">
                                    Trạng thái :
                                    <select name="filter_cur_status" class="custom_input">
                                        <option value="">Tất cả</option>
                                        <option value="nbph">NB Phát hàng</option>
                                        <option value="nktq">Nhập Kho TQ</option>
                                        <option value="dk">Đã Kiểm</option>
                                        <option value="nkvn">Nhập Kho VN</option>
                                        <option value="dg">Đã Giao</option>
                                    </select>
                                    <div class="space10"></div>
                                    Từ ngày : <input class="pickdate_from custom_input hasDatepicker" type="text"
                                        id="datepicker_from" name="filter_startdate_created_date" value="">
                                    Đến ngày : <input class="pickdate_to custom_input hasDatepicker" type="text"
                                        id="datepicker_to" name="filter_enddate_created_date" value="">
                                    Tìm ngày tháng của trạng thái
                                    <select name="date_status" class="custom_input">
                                        <option value="nbph">NB Phát hàng</option>
                                        <option value="nktq">Nhập Kho TQ</option>
                                        <option value="dk">Đã Kiểm</option>
                                        <option value="nkvn">Nhập Kho VN</option>
                                        <option value="dg">Đã Giao</option>
                                    </select>



                                    <input class="button custom_flat_button" type="submit" value="Lọc">
                                </form>
                                <div class="space10"></div>
                            </div>
                            <div class="table-responsive">
                                <table class="table tbl-cart tbl-history">
                                    <tbody>
                                        <tr class="header-cart-table">
                                            <td style="width:5%" class="text-center">#</td>
                                            <td class="text-center">Mã kiện</td>
                                            <td class="text-center">Mã đơn</td>
                                            <td class="text-center">Vận đơn TQ</td>
                                            <td class="text-center">Cân nặng / Thể tích / SL</td>
                                            <td style="width: 255px;" class="text-center">Lịch sử</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div class="pag">
                            </div>
                            <p><strong>Total: <span class="green">0</span> (Items)</strong></p>

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
    name: 'ShipSection',
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