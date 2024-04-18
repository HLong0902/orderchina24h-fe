<!-- template section -->
<template>
    <div id="content">
        <div class="container">
            <main class="main" role="main">
                <div class="row main-row">
                    <div class="col-sm-9">
                        <div class="content-page">
                            <div class="titles">
                                <h2 class="page-title">
                                    Danh sách tiền ship nội địa việt nam
                                </h2>
                            </div>
                            <div class="tab_container">
                                <div class="tab_content">
                                    <div class="space10"></div>
                                    <form class="form-horizontal" method="get">
                                        Từ ngày : <input class="pickdate_from custom_input hasDatepicker" type="text"
                                            id="datepicker_from" name="filter_startdate_create_date" value="">
                                        Đến ngày : <input class="pickdate_to custom_input hasDatepicker" type="text"
                                            id="datepicker_to" name="filter_enddate_create_date" value="">
                                        Trạng thái
                                        <select name="filter_status" class="custom_input">
                                            <option value="">Tất cả</option>
                                            <option value="1">Đã duyệt</option>
                                            <option value="0">Chờ duyệt</option>
                                            <option value="-1">Đã hủy</option>
                                        </select>
                                        <input class="button custom_flat_button" type="submit" value="Lọc">
                                    </form>
                                    <div class="space10"></div>
                                    <div class="table-responsive">
                                        <table class="table tbl-cart tbl-list-order">
                                            <tbody id="abc">
                                                <tr class="header-cart-table">
                                                    <td width="25%">Ngày tạo</td>
                                                    <td width="25%">Mã hóa đơn</td>
                                                    <td width="25%">Số tiền</td>
                                                    <td width="45%">Ghi chú</td>
                                                    <td width="25%">Trạng thái</td>
                                                </tr>
                                            </tbody>

                                        </table>
                                        <p><strong>Total: <span class="green">0</span> (Yêu cầu)</strong></p>

                                    </div>
                                </div>
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