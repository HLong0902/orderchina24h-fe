<template>
    <div id="content">
        <div class="container">
            <main class="main" role="main">
                <div class="row main-row">
                    <div class="col-sm-9">
                        <div class="cart-by-page">
                            <div class="titles">
                                <h2 class="page-title">
                                    Bảng tin chung
                                </h2>
                            </div>
                            <div class="message_text" style="text-align: center; background: #87cf82; color: #fff; padding: 14px; margin-bottom: 10px;">
                                Để nâng cao chất lượng dịch vụ, chúng tôi cung cấp tiện ích duyệt tiền nhanh cho quý
                                khách hàng sử dụng chuyển khoản qua Internet - Banking và không cần gửi thông tin giao
                                dịch nạp tiền. Quý khách hàng chỉ cần nhập nội dung chuyển tiền như sau : <span
                                    class="red big" style="font-size: 26px;"><strong>NAP_000001_CK</strong></span> . Trong
                                đó <span class="black">"000001"</span> là mã số riêng của khách hàng, <span
                                    class="black">NAP_xxxxxx_CK</span> là cú pháp nạp tiền. Mọi thắc mắc vui lòng liên hệ
                                tư vấn
                            </div>

                            <!-- <div class="tab_container">
                                <br>
                                <br>
                                <h2 class="page-title">
                                    Thông báo đơn hàng , giao dịch của bạn
                                </h2>
                                <div class="tab_content">

                                    <div class="space20"></div>
                                    <form class="form-horizontal" method="get">
                                        Từ ngày : <input class="pickdate_from custom_input hasDatepicker" type="text"
                                            id="datepicker_from" name="filter_startdate_create_date" value="">
                                        Đến ngày : <input class="pickdate_to custom_input hasDatepicker" type="text"
                                            id="datepicker_to" name="filter_enddate_create_date" value="">
                                        <br>
                                        <div class="space10"></div>
                                        Loại thông báo :
                                        <select name="filter_notice_type" class="custom_input">
                                            <option value="">Tất cả</option>
                                            <option value="1">Ví điện tử</option>
                                            <option value="2">Đơn hàng</option>
                                            <option value="3">Khiếu nại</option>
                                            <option value="4">Vận đơn</option>
                                        </select>
                                        Trạng thái :
                                        <select name="filter_is_read" class="custom_input">
                                            <option value="">Tất cả</option>
                                            <option value="0">Chưa xem</option>
                                            <option value="1">Đã xem</option>
                                        </select>
                                        <input class="button custom_flat_button" type="submit" value="Lọc">
                                    </form>
                                    <div class="space20"></div>
                                    <div class="cu-table-responsive">
                                        <form id="formData" action="member/updateread" method="POST">
                                            <table class="cu-table tbl-cart tbl-list-order">
                                                <tbody id="abc">
                                                    <tr class="header-cart-table">
                                                        <td width="5%">#</td>
                                                        <td width="20%">Thời gian</td>
                                                        <td width="20%">Loại thông báo</td>
                                                        <td width="55%">Nội dung</td>
                                                        <td width="15%">
                                                            <input type="checkbox" name="checkall"
                                                                onclick="checkAll(this)" class="isCheckBox"
                                                                style="float: left;">
                                                            <button class="button custom_flat_button"
                                                                onclick="submitForm('#formData')">Đã xem</button>
                                                        </td>
                                                    </tr>
                                                </tbody>

                                            </table>
                                        </form>
                                        <p><strong>Total: <span class="green">0</span> (Thông báo)</strong></p>

                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
    name: "DashBoardSection",
    setup() {

    },
    mounted() {

    }
}
</script>

<style scoped>
@import '../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../assets/styles/private-styles.css';

.cart-by-page {
    box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.3);
    padding: 20px;
    overflow: hidden;
    margin-bottom: 40px;
}

.cart-by-page .titles {
    margin: 0px 0px 20px 0px;
}

.table>tbody>tr>td,
.table>tfoot>tr>td {
    padding: 5px;
}

.tbl-list-order td {
    vertical-align: middle !important;
}

.tbl-list-order td {
    text-align: center;
    border-right: 1px solid #fff;
}

input.isCheckBox {
    width: 20px;
    height: 20px;
}

table {
    border-collapse: collapse;
    table-layout: fixed;
}

</style>