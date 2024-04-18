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
                                            - Mã nạp tiền : <span class="green big">HQC21445CK</span></h3>
                                        <div class="customer_credit_owe owe_21445" data-id="21445">
                                            <p class="black">Tổng tiền hàng đã về chờ tất toán : <span
                                                    class="red">0</span> đ </p>
                                            <p class="black">Tổng tiền hàng chưa về : <span class="red">0</span> đ </p>
                                            <p><a class="blue" target="_blank"
                                                    href="https://giaodich.hangquangchau24h.vn/member/reportowe">Xem chi
                                                    tiết</a></p>
                                        </div>
                                        <a class="custom_bt"
                                            href="https://giaodich.hangquangchau24h.vn/member/wallet"><fa class="fa-icon"
                                                icon="file-text" aria-hidden="true"></fa> Chi tiết giao
                                            dịch</a>
                                        <a class="custom_bt active" href="#"><fa class="fa-icon" icon="credit-card"
                                                aria-hidden="true"></fa> Nạp tiền</a>
                                        <!--<a class="custom_bt" href="https://giaodich.hangquangchau24h.vn/member/withdrawal"><fa class="fa-icon" icon="download fa-2x" aria-hidden="true"></fa> Rút tiền</a>-->
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="form_deposit">
                                <h3>Nạp tiền vào ví điện tử</h3>
                                <div class="space10"></div>
                                <p class="note red">Nội dung chuyển khoản : <span class="green big">HQC21445CK</span>
                                    (Trong đó "21445" là mã số khách hàng của bạn, HQC xxx CK là cú pháp nạp tiền)</p>
                                <div class="space10"></div>
                                <form class="form-horizontal" method="POST">
                                    <div class="form_upload ajax_response alert dismissable"></div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-2">Số tiền đã chuyển khoản</label>
                                        <div class="col-sm-6">
                                            <input placeholder="Chỉ nhập số" class="form-control"
                                                onkeyup="javascript:document.getElementById('numFormatResult').innerHTML = format_curency( this.value);"
                                                type="text" name="amount" value="" required="" id="amount">
                                            <span id="numFormatResult" class="red"></span> <b>VNĐ</b>
                                        </div>
                                    </div>
                                    <div class="form-group" id="bank">
                                        <label for="bank" class="control-label col-sm-2">Ngân hàng đã chuyển</label>
                                        <div class="col-sm-6">
                                            <select name="bank" class="form-control">
                                                <option value="VP Bank">VP Bank</option>
                                                <option value="VietcomBank">VietcomBank</option>
                                                <option value="Techcombank">Techcombank</option>
                                                <option value="Agribank">Agribank</option>
                                                <option value="BIDV">BIDV</option>
                                                <option value="Viettinbank">Viettinbank</option>
                                            </select>
                                        </div>
                                    </div>

                                    <!-- <div class="form-group" id="billpayment">
					<label for="billpayment" class="control-label col-sm-2">Mã phiếu thu</label>
						
					<div class="col-sm-6">
						<input placeholder="Số bút toán sau khi bạn chuyển khoản" class="inputAccount form-control" value="" type="text" name="billpayment">
					</div>
				</div> -->
                                    <div class="form-group">
                                        <label for="comment" class="control-label col-sm-2">Ghi chú</label>
                                        <div class="col-sm-6">
                                            <textarea rows="5"
                                                placeholder="Gợi ý: Quý khách nên nhập nội dung chuyển khoản (khi chuyển khoản online hoặc nộp tiền tại Ngân Hàng) chính xác."
                                                name="payment_note" class="inputAccount form-control"></textarea>
                                        </div>
                                    </div>


                                    <input type="hidden" name="controller" value="member">
                                    <input type="hidden" name="task" value="sendDeposit">
                                    <input type="hidden" name="is_reload" value="1">
                                    <div class="form-group text-center">
                                        <div class="col-sm-3 col-md-offset-2">
                                            <a target="_blank" class="btn btn-danger" onclick="submitAjax1(this)"
                                                title="Gửi giao dịch">Gửi giao dịch</a>
                                        </div>
                                    </div>


                                </form>
                            </div>
                            <hr>
                            <div class="tab_container">
                                <div class="tab_content">
                                    <h3>Danh sách nạp tiền chờ phê duyệt</h3>
                                    <div class="space20"></div>
                                    <p><strong>Tổng tiền đã duyệt : <span class="green">0</span><span class="small">
                                                đ</span></strong> -
                                        <strong>Tổng tiền chờ duyệt : <span class="green">0</span><span class="small">
                                                đ</span></strong>
                                    </p>
                                    <div class="space10"></div>
                                    <form class="form-horizontal" method="get">
                                        Từ ngày : <input class="pickdate_from custom_input hasDatepicker" type="text"
                                            id="datepicker_from" name="filter_startdate_create_date" value="">
                                        Đến ngày : <input class="pickdate_to custom_input hasDatepicker" type="text"
                                            id="datepicker_to" name="filter_enddate_create_date" value="">
                                        Trạng thái :
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
                                                    <td width="25%">Ngày giao dịch</td>
                                                    <td width="25%">Mã hóa đơn</td>
                                                    <td width="25%">Số tiền nạp</td>
                                                    <td width="25%">Ngân hàng</td>
                                                    <td width="25%">Ghi chú</td>
                                                    <td width="25%">Trạng thái</td>
                                                </tr>
                                            </tbody>

                                        </table>
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
    name: 'TopupSection',
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

.fa-icon {
    font-size: 20px;
    padding: 0px 5px;
}

.customer_credit_owe {
    padding-top: 10px;
}

.custom_bt {
    background: #d75e29;
    color: #fff;
    padding: 5px 10px;
    display: inline-block;
    border-radius: 3px;
    margin: 10px 14px 0px 0px;
    font-size: 14px;
}

.custom_bt.active {
    background: #87cf82;
    color: #fff !important;
}

.alert {
    padding: 5px;
    margin: 10px 0px;
    text-align: center;
}
.ajax_response {
    font-size: 11px !important;
}

#amount {
    margin-bottom: 5px;
}
.form-group .form-control {
    padding: 5px;
    border: 1px solid #ccc;
    -webkit-border-radius: 0;
    border-radius: 0;
}

</style>