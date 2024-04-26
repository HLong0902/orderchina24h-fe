<script setup>
import { useCartStore } from '../../../../../../store/CartStore';
import CONSTANT from '../../../../../../constants/constants';
</script>

<!-- template section -->
<template>
    <div id="content">
        <div class="container">
            <main class="main" role="main">
                <div class="row main-row">
                    <div class="shoping_cart">
                        <div class="col-md-12">
                            <h2 class="page-title">Địa chỉ nhận hàng</h2>
                            <div class="container">
                                <ul class="progressbar">
                                    <li class="active">Chọn shop</li>
                                    <li class="active">Chọn địa chỉ nhận hàng</li>
                                    <li>Lên đơn</li>
                                </ul>
                            </div>



                            <div id="BookOrderAlert" class="alert-success custom_alert "></div>

                            <div id="checkout_step3" class="customer_shop" style="margin-top:30px; display:none;">
                                <div class="container">
                                    <div class="row">
                                        <h4><i class="fa fa-shopping-cart"></i> Danh sách đơn hàng đã cọc thành công
                                        </h4>
                                        <table class=" table table_cart" id="checkout_step3_table">
                                            <thead>
                                                <tr class="header-border">
                                                    <td style="width: 5%;">#</td>
                                                    <td style="width: 20%;">Mã đơn</td>
                                                    <td style="width: 30%;">Shop</td>
                                                    <td class="center" style="width:20%;">Số lượng</td>
                                                    <td class="left" style="width: 25%;">Tiền hàng</td>
                                                    <td class="left" style="width: 25%;">Tiền đã cọc</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div id="checkout_step2" style="margin-top: 30px;">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="customer_address row gray_box padding20">
                                                <h4><i class="fa fa-map-marker"></i> Địa chỉ nhận hàng</h4>
                                                <div id="list_address">
                                                    <div class="box_address box_active ">
                                                        <input type="hidden" id="default_address" value="9878">
                                                        <div class="tool_box tool_box_active">
                                                            <a><i class="fa fa-map-marker fa-2x"></i></a>
                                                        </div>
                                                        <p class="address_name">
                                                            <b>Thành Đạt / 0989661145</b>
                                                        </p>
                                                        <p>Địa chỉ : fghbjnkml </p>
                                                        <p>Kho hàng : <span class="bold green">Kho HN</span> / Hoàng Mai
                                                            - Hà Nội</p>
                                                    </div>
                                                </div>
                                                <div class="">
                                                    <a onclick="openPopup('https://giaodich.hangquangchau24h.vn/member/addAddress',{},600,500)"
                                                        class="btn bg_yellow popup_link">Thêm mới địa chỉ</a>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="col-md-6">
                                            <div class="customer_shop">
                                                <h4><i class="fa fa-shopping-cart"></i> Danh sách shop kết đơn </h4>
                                                <table class=" table table_cart" id="cartTable">
                                                    <thead>
                                                        <tr class="header-border">
                                                            <td style="width: 5%;"><input type="checkbox" checked="true"
                                                                    readonly="true" disabled="disabled"></td>
                                                            <td style="width: 50%;">Shop</td>
                                                            <td class="center" style="width:20%;">Số lượng</td>
                                                            <td class="left" style="width: 25%;">Tiền hàng</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><input type="checkbox" checked="true" readonly=""
                                                                    disabled="disabled"></td>
                                                            <td>
                                                                <img style="width:30px;"
                                                                    src="https://cbu01.alicdn.com/img/ibank/O1CN01iLYcUh1RJGiVCqXgV_!!2217631252090-0-cib.jpg">
                                                                2217631252090
                                                            </td>
                                                            <td class="align-center">4/2</td>
                                                            <td><span class="bold green">54,720</span> đ</td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" checked="true" readonly=""
                                                                    disabled="disabled"></td>
                                                            <td>
                                                                <img style="width:30px;"
                                                                    src="https://cbu01.alicdn.com/img/ibank/O1CN01RcxVqK1CsnBNB8kqo_!!3018240137-0-cib.400x400.jpg">
                                                                3018240137
                                                            </td>
                                                            <td class="align-center">6/1</td>
                                                            <td><span class="bold green">324,000</span> đ</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="shop_book_total">
                                                <p>Tổng tiền hàng : <span class="bold red">378,720</span> đ</p>
                                                <p>Đặt cọc(70%) : <span class="bold blue">265,104</span> đ</p>
                                                <p>Số dư hiện tại : <span class="bold green">0</span> đ</p>
                                                <button onclick="bookAllSellerOrder3()"
                                                    class="btn bg_green bt_dathang">Gửi đơn</button>
                                            </div>
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
    name: 'CartSection_Step2',
    data() {
        return {

        }
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