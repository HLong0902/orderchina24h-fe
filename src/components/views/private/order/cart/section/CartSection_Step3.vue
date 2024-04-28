<script setup>
import { useCartStore } from '../../../../../../store/CartStore';
import CONSTANT from '../../../../../../constants/constants';
import ApiCaller from '../../../../../utils/ApiCaller';
import ROUTES from '../../../../../../constants/routeDefine';
</script>

<!-- template section -->
<template>
    <div id="content">
        <div class="container">
            <main class="main" role="main">
                <div class="row main-row">
                    <div class="shoping_cart">
                        <div class="col-md-12">
                            <h2 class="page-title">Lên đơn &amp; Đặt cọc</h2>
                            <div class="container">
                                <ul class="progressbar">
                                    <li class="active">Chọn shop</li>
                                    <li class="active">Chọn địa chỉ nhận hàng</li>
                                    <li class="active">Lên đơn &amp; Đặt cọc</li>
                                </ul>
                            </div>


                            <br>
                            <div id="BookOrderAlert" class="alert-success custom_alert "></div>
                            <div id="checkout_step3" class="customer_shop" style="margin-top:30px; ">
                                <div class="container">
                                    <div class="row">
                                        <h4><i class="fa fa-shopping-cart"></i> Danh sách đơn hàng chờ cọc </h4>
                                        <table class=" table table_cart form_order_pending" id="checkout_step3_table">
                                            <thead>
                                                <tr class="header-border">
                                                    <td style="width: 5%;">#</td>
                                                    <td style="width: 15%;">Mã đơn</td>
                                                    <td style="width: 20%;">Shop</td>
                                                    <td class="center" style="width:10%;">Số lượng</td>
                                                    <td class="left" style="width: 25%;">Tiền hàng</td>
                                                    <td class="left" style="width: 25%;">Tiền cần cọc</td>
                                                    <td style="width: 15%;">
                                                        <input type="checkbox" class="checkAllOrder">
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="align-center">1</td>
                                                    <td><a href="https://giaodich.hangquangchau24h.vn/order/view/276722"
                                                            target="_blank">HQC_276722</a></td>
                                                    <td>
                                                        <img style="width:30px;"
                                                            src="https://cbu01.alicdn.com/img/ibank/O1CN01iLYcUh1RJGiVCqXgV_!!2217631252090-0-cib.jpg">
                                                    </td>
                                                    <td class="align-center">3</td>
                                                    <td><span class="bold blue">41,040</span> đ </td>
                                                    <td>
                                                        <span class="bold green">28,728</span> đ / (70%)

                                                    </td>
                                                    <td class="lable_order276722">
                                                        <!--<p class="label label-success">Đặt cọc thành công</p>-->
                                                        <input type="checkbox" class="orderCheck" oid="276722"
                                                            name="checkbox[]">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="align-center">2</td>
                                                    <td><a href="https://giaodich.hangquangchau24h.vn/order/view/276157"
                                                            target="_blank">HQC_276157</a></td>
                                                    <td>
                                                        <img style="width:30px;"
                                                            src="https://cbu01.alicdn.com/img/ibank/O1CN01Ctmixb1RJGiu098yS_!!2217631252090-0-cib.jpg">
                                                    </td>
                                                    <td class="align-center">3</td>
                                                    <td><span class="bold blue">41,040</span> đ </td>
                                                    <td>
                                                        <span class="bold green">28,728</span> đ / (70%)

                                                    </td>
                                                    <td class="lable_order276157">
                                                        <!--<p class="label label-success">Đặt cọc thành công</p>-->
                                                        <input type="checkbox" class="orderCheck" oid="276157"
                                                            name="checkbox[]">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="align-center">3</td>
                                                    <td><a href="https://giaodich.hangquangchau24h.vn/order/view/276156"
                                                            target="_blank">HQC_276156</a></td>
                                                    <td>
                                                        <img style="width:30px;"
                                                            src="https://cbu01.alicdn.com/img/ibank/O1CN01RcxVqK1CsnBNB8kqo_!!3018240137-0-cib.400x400.jpg">
                                                    </td>
                                                    <td class="align-center">2</td>
                                                    <td><span class="bold blue">108,000</span> đ </td>
                                                    <td>
                                                        <span class="bold green">75,600</span> đ / (70%)

                                                    </td>
                                                    <td class="lable_order276156">
                                                        <!--<p class="label label-success">Đặt cọc thành công</p>-->
                                                        <input type="checkbox" class="orderCheck" oid="276156"
                                                            name="checkbox[]">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="bookAllSeller" style="overflow:hidden;">
                                    <div class="container">
                                        <div class="col-md-12" style="text-align:right;">
                                            <p style="font-size: 22px;padding: 10px; float:left;" class="big">Tổng tiền
                                                cần cọc : <span id="total_deposit_price" class="red">0</span> đ</p>
                                            <p style="font-size: 22px;padding: 10px; float:left;" class="big">Số dư khả
                                                dụng : <span id="total_customer_credit" class="green">0</span> đ</p>
                                            <button onclick="bookOrderDeposit()" disabled="true"
                                                class="btn bg_green bt_dathang">Đặt cọc <span
                                                    class="total_order">0</span> đơn đã chọn</button>
                                        </div>
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
    name: 'CartSection_Step3',
    data() {
        return {
            cartStore: useCartStore(),
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<!-- style custom -->
<style scoped></style>