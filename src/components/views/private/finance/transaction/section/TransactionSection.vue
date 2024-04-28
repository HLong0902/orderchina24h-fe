<!-- import section -->
<script setup>
import { Icon } from '@iconify/vue';
</script>

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
                                    Quản lý ví điện tử
                                </h2>
                            </div>

                            <div class="wallet_info">
                                <div class="row">
                                    <div class="col-md-2">
                                        <fa class="fa-icon" icon="money-bill" style="color:#87cf82;font-size: 120px;"
                                            aria-hidden="true"></fa>
                                    </div>
                                    <div class="col-md-10">
                                        <h3>Số dư trong ví : <span class="green">0</span> <span class="small">VNĐ</span>
                                            - Mã nạp tiền : <span class="green big">NAP_000001_CK</span></h3>
                                        <div class="customer_credit_owe owe_21445" data-id="21445">
                                            <p class="black">Tổng tiền hàng đã về chờ tất toán : <span
                                                    class="red">0</span> đ </p>
                                            <p class="black">Tổng tiền hàng chưa về : <span class="red">0</span> đ </p>
                                            <p><a class="blue" target="_blank"
                                                    href="https://giaodich.hangquangchau24h.vn/member/reportowe">Xem chi
                                                    tiết</a></p>
                                        </div>
                                        <span class="custom_bt active"><fa class="fa-icon" icon="file-text"
                                                aria-hidden="true"></fa> Chi tiết giao dịch</span>
                                        <a class="custom_bt"
                                            href="https://giaodich.hangquangchau24h.vn/member/deposit"><fa
                                                class="fa-icon" icon="credit-card" aria-hidden="true"></fa> Nạp tiền</a>
                                        <!--<a class="custom_bt" href="https://giaodich.hangquangchau24h.vn/member/withdrawal"><fa class="fa-icon" icon="download fa-2x" aria-hidden="true"></fa> Rút tiền</a>-->
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="tab_container">
                                <div class="tab_content">
                                    <h3>Chi tiết giao dịch</h3>
                                    <div class="space20"></div>
                                    <form class="form-horizontal" method="get">
                                        Mã đơn hàng : <input class="custom_input" type="text" name="filter_invoiceid"
                                            value="">
                                        Từ ngày : <input class="pickdate_from custom_input hasDatepicker" type="text"
                                            id="datepicker_from" name="filter_startdate_create_date" value="">
                                        Đến ngày : <input class="pickdate_to custom_input hasDatepicker" type="text"
                                            id="datepicker_to" name="filter_enddate_create_date" value="">
                                        <br>
                                        <div class="space10"></div>
                                        Loại giao dịch :
                                        <select name="filter_transaction_type" class="custom_input">
                                            <option value="">Tất cả</option>
                                            <option value="1">Nạp tiền</option>
                                            <option value="2">Rút tiền</option>
                                            <option value="3">Đặt cọc đơn hàng</option>
                                            <option value="4">Tất toán đơn hàng</option>
                                            <option value="5">Hoàn tiền đơn hàng</option>
                                            <option value="6">Thanh toán vận đơn</option>
                                        </select>

                                        <input class="button custom_flat_button" type="submit" value="Lọc">
                                    </form>
                                    <div class="space10"></div>
                                    <p class="note small">Bạn có thể nhấn vào mã đơn hàng để xem lịch sử giao dịch tài
                                        chính của đơn hàng</p>
                                    <div class="space10"></div>
                                    <div class="table-responsive">
                                        <table class="table tbl-cart tbl-list-order">
                                            <tbody id="abc">
                                                <tr class="header-cart-table">
                                                    <td width="25%">Ngày giao dịch</td>
                                                    <td width="25%">Mã giao dịch</td>
                                                    <td width="25%">Loại giao dịch</td>
                                                    <td width="25%">Nội dung</td>
                                                    <td width="25%">Phát sinh($)</td>
                                                    <td width="25%">Trước giao dịch($)</td>
                                                    <td width="25%">Sau giao dịch($)</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p class="note small">Bạn có thể nhấn vào mã đơn hàng để xem lịch sử giao dịch
                                            tài chính của đơn hàng</p>
                                        <p><strong>Total: <span class="green">0</span> (Giao dịch)</strong></p>
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
    name: 'TransactionSection',
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