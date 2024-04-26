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
                            <h2 class="page-title">Giỏ hàng</h2>
                            <div class="container">
                                <ul class="progressbar">
                                    <li class="active">Chọn shop</li>
                                    <li>Chọn địa chỉ nhận hàng</li>
                                    <li>Lên đơn</li>
                                </ul>
                            </div>
                            <br>


                            <div id="BookOrderAlert" class="alert-success custom_alert "></div>

                            <div class="table-responsive">
                                <div v-for="(cart, idx) in cartItems" :key="idx" class="cart-by-page"
                                    :class="shopById(idx)">
                                    <div class="seller_info alibaba" style="overflow:hidden;">
                                        <input type="checkbox" :seller_id="idx" class="checkAllItem" name="checkAll"
                                            style="width:26px;height:26px; float:left;">
                                        <p style="float:left;font-size: 23px;margin-left: 15px;">
                                            {{ cart[0].system }} : <strong></strong>
                                        </p>
                                        <p style="float:right; font-size:20px;margin-right: 15px; line-height: 29px;">
                                            <span style="float:left;     padding-right: 10px;">Đóng thùng gỗ :</span>
                                            <input style="width:26px;height:26px;" type="checkbox"
                                                class="sellerCheckWoodPack" :seller_id="idx" name="is_wood_pack[]">

                                        </p>
                                        <p style="float:right; font-size:20px;margin-right: 15px; line-height: 29px;">
                                            <span style="float:left;     padding-right: 10px;">Kiểm đếm :</span>
                                            <input style="width:26px;height:26px;" type="checkbox"
                                                class="sellerOrderChecked" :seller_id="idx" name="is_order_checked[]">
                                        </p>
                                    </div>

                                    <div class="seller_order_container">
                                        <div class="col-md-9">
                                            <table class=" table table_cart" id="cartTable">
                                                <thead>
                                                    <tr class="header-border">
                                                        <td style="width: 5%;">
                                                            <!--<input type="checkbox" :seller_id="item.sellerId"  class="checkAllItem" name="checkAll" style="width:20px;height:20px;">-->
                                                        </td>
                                                        <td style="width: 50%;">Sản phẩm</td>
                                                        <td class="center" style="width:16%;">Số lượng</td>
                                                        <td class="left" style="width: 16%;">Đơn giá</td>
                                                        <td class="left" style="width:18%;">Tổng tiền</td>
                                                        <td class="center" style="width:5%;"></td>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    <tr v-for="(item, idx) in cart" :key="idx"
                                                        class=" row_item_7765678544000.5kg(totalweightoftwopeople)issuitableforhandbindingFreesize">
                                                        <td>
                                                            <input style="width:20px;height:20px;" type="checkbox"
                                                                class="itemCheck" :seller_id="item.sellerId"
                                                                outer_id="7765678544000.5kg(totalweightoftwopeople)issuitableforhandbindingFreesize"
                                                                name="checkbox[]">
                                                            <span class="stt">{{ idx + 1 }}</span>
                                                        </td>

                                                        <td class="item_info">
                                                            <a target="_blank" href="#">
                                                                <img class="item_image" :src="item.itemImage"
                                                                    :style="{ width: 50 + 'px' }">
                                                            </a>
                                                            <a target="_blank" :href="item.itemLink">
                                                                <p>
                                                                    {{ decodeURIComponent(item.itemTitle) }} </p>
                                                            </a>
                                                            <p style="padding:8px 0px;">0.5kg (total weight of two
                                                                people) is suitable for hand binding , Free size</p>
                                                            <div class="note form-group">
                                                                <input :seller_id="item.sellerId"
                                                                    outer_id="7765678544000.5kg(totalweightoftwopeople)issuitableforhandbindingFreesize"
                                                                    class="cart_item_note form-control" name="item_note"
                                                                    placeholder="Chú thích sản phẩm" value="">
                                                            </div>
                                                            <div class="note form-group hidden">
                                                                <input :seller_id="item.sellerId"
                                                                    outer_id="7765678544000.5kg(totalweightoftwopeople)issuitableforhandbindingFreesize"
                                                                    class="cart_item_kh_note form-control"
                                                                    name="item_kh_note"
                                                                    placeholder="Ghi chú riêng. VD: hóa đơn, tên khách đặt sản phẩm"
                                                                    value="">
                                                            </div>
                                                        </td>
                                                        <td class="center">
                                                            <input :seller_id="item.sellerId"
                                                                    :item_id="item.itemId"
                                                                outer_id="7765678544000.5kg(totalweightoftwopeople)issuitableforhandbindingFreesize"
                                                                type="number" class="num-product cart_item_quantity"
                                                                name="qty" :value="item.numberItem" @input="handleChangeItem" @change="handleChangeItem">
                                                        </td>
                                                        <td class="left">
                                                            <p>{{ (CONSTANT.EXCHANGE_RATE * item.itemPrice /
                                    1000).toFixed(3).replace('.', ',') }} đ</p>
                                                            <p>¥{{ item.itemPrice }}</p>
                                                        </td>

                                                        <td class="left">
                                                            <p><strong><span class="item_total_price_vnd">{{
                                    (CONSTANT.EXCHANGE_RATE * item.itemPrice *
                                                                        item.numberItem / 1000).toFixed(3).replace('.',
                                                                        ',') }}</span>
                                                                    đ</strong></p>
                                                            <p><strong>¥<span class="item_total_price">{{
                                                                        (item.itemPrice * item.numberItem).toFixed(2)
                                                                        }}</span></strong></p>
                                                        </td>
                                                        <td class="center">
                                                            <a class="custom-link textTooltip tooltipstered"
                                                                onclick="addFavorite('2217631252090','7765678544000.5kg(totalweightoftwopeople)issuitableforhandbindingFreesize')"><i
                                                                    class="fa fa-heart-o fa-2x"
                                                                    aria-hidden="true"></i></a>
                                                            <a class="custom-link textTooltip tooltipstered"
                                                                onclick="removeItem('2217631252090','7765678544000.5kg(totalweightoftwopeople)issuitableforhandbindingFreesize')"><i
                                                                    class="fa fa-trash-o fa-2x red"
                                                                    aria-hidden="true"></i></a>
                                                        </td>
                                                    </tr>


                                                    <tr class="seller_summary">

                                                        <td colspan="7" class="center">
                                                            <a class="custom-link textTooltip tooltipstered"
                                                                onclick="removeShop('2217631252090')"><i
                                                                    class="fa fa-trash-o" aria-hidden="true"></i> Xóa
                                                                shop</a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="seller_order_total">
                                                <table class="table borderless">
                                                    <tbody>
                                                        <tr>
                                                            <td>Tiền hàng <i
                                                                    class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                            </td>
                                                            <td class="right"><strong><span
                                                                        class="sl_total_price">0</span></strong> đ</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phí tạm tính <i
                                                                    tooltip-content="#tipContent2217631252090"
                                                                    class="hasTooltip fa fa-question-circle tooltipstered"></i>
                                                            </td>
                                                            <td class="right"><strong><span
                                                                        class="sl_total_fee">0</span></strong> đ</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Đặt cọc <i
                                                                    class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                            </td>
                                                            <td class="right"><strong><span
                                                                        class="sl_percent_deposit">0</span></strong> đ
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <hr>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Tổng <i
                                                                    class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                            </td>
                                                            <td class="right"><strong class="red big"><span
                                                                        class="sl_total_order">0</span></strong> đ</td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <p><strong>Chú thích cho HQC</strong> <i
                                                                        class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                                </p>
                                                                <textarea :seller_id="idx" rows="2"
                                                                    class="form-control shop_order_note"
                                                                    placeholder="Chú thích cho HQC về đơn hàng"
                                                                    name="shop_order_note"></textarea>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <div id="tipContent2217631252090" class="tipContent hidden">
                                                    <div style="width:300px">
                                                        <table class="table borderless">
                                                            <tbody>
                                                                <tr>
                                                                    <td>Mua hàng</td>
                                                                    <td class="right"><strong><span
                                                                                class="sl_buy_fee">0</span></strong> đ
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>VC Nội địa TQ</td>
                                                                    <td class="right">Chưa xác định</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>VC Quốc Tế (TQ-&gt;VN)</td>
                                                                    <td class="right">Chưa xác định</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Phí cố định</td>
                                                                    <td class="right"><strong><span
                                                                                class="sl_fixed_fee"></span></strong> đ
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div> <!-- cart page -->

                                <div class="bookAllSeller">
                                    <div class="container">
                                        <div class="col-md-4">
                                            <input class="pull-left" type="checkbox" name="checkAllSeller"
                                                id="checkBuyAllSeller">
                                            <p class="big pull-left">Chọn mua toàn bộ các shop</p>
                                        </div>
                                        <div class="col-md-8">
                                            <button onclick="bookAllSellerOrderNextStep()"
                                                class="btn bg_green bt_dathang pull-right">Đặt hàng <span
                                                    id="total_all_qty">0</span> shop đã chọn</button>
                                            <p style="font-size: 18px;" class="big">Tổng tiền hàng : <span
                                                    id="total_price_allseller" class="red">0</span> đ</p>
                                            <div class="box_coupon">
                                                <div class="input_coupon">
                                                    <input type="text" name="coupon_value" id="coupon_value"
                                                        placeholder="Mã giảm giá">
                                                </div>
                                                <div class="value_coupon">
                                                    <input type="button" class="btn bg_green" id="coupon_apply"
                                                        value="Áp dụng">
                                                </div>
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
    name: 'CartSection',
    data() {
        return {
            cartItems: {},

            cartStore: useCartStore(),
        }
    },
    mounted() {
        this.cartItems = this.cartStore.cart;
    },
    methods: {
        shopById(id) {
            return `shop_cart_${id}`;
        },
        handleChangeItem(event) {
            let seller_id = event.target.attributes.seller_id.value
            let item_id = event.target.attributes.item_id.value
            debugger
        }
    }
}
</script>

<!-- style custom -->
<style scoped>
@import '../../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../../assets/styles/private-styles.css';
</style>