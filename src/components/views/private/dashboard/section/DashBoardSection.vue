<script setup>
import { Icon } from '@iconify/vue';
import CommonUtils from '../../../../utils/CommonUtils';
</script>

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
                            <div class="message_text"
                                style="text-align: center; background: #87cf82; color: #fff; padding: 14px; margin-bottom: 10px;">
                                Để nâng cao chất lượng dịch vụ, chúng tôi cung cấp tiện ích duyệt tiền nhanh cho quý
                                khách hàng sử dụng chuyển khoản qua Internet - Banking và không cần gửi thông tin giao
                                dịch nạp tiền. Quý khách hàng chỉ cần nhập nội dung chuyển tiền như sau : <span
                                    class="red big" style="font-size: 26px;"><strong>NAP_{{ CommonUtils.genCode()
                                        }}_CK</strong></span>
                                .
                                Trong
                                đó <span class="black">"{{ CommonUtils.genCode() }}"</span> là mã số riêng của khách
                                hàng, <span class="black">NAP_xxxxxx_CK</span> là cú pháp nạp tiền. Mọi thắc mắc vui
                                lòng liên
                                hệ
                                tư vấn
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    name: "DashBoardSection",
    setup() {

    },
    mounted() {

    },
    methods: {

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