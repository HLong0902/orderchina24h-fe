<script setup>
import { useCartStore } from '../../../../../../store/CartStore';
import { useCommonStore } from '../../../../../../store/CommonStore';
import CONSTANT from '../../../../../../constants/constants';
import CommonUtils from '../../../../../utils/CommonUtils';
import ApiCaller from '../../../../../utils/ApiCaller';
import ROUTES from '../../../../../../constants/routeDefine';
</script>
<!-- template section -->
<template>
    <div id="content">
        <div class="container">
            <main class="main" role="main">
                <div class="row main-row">
                    <div v-if="cartItems == null">
                        <span></span>
                    </div>
                    <div v-else class="shoping_cart">
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

                            <div class="cu-table-responsive">
                                <div v-for="(cart, idx) in cartItems" :key="idx" class="cart-by-page"
                                    :class="shopById(idx)">
                                    <div class="seller_info alibaba" style="overflow:hidden;">
                                        <input type="checkbox" :seller_id="idx" class="checkAllItem" name="checkAll"
                                            :checked="cart.every($ => $.isChecked == true)"
                                            style="width:26px;height:26px; float:left;" @input="handleCheckAll"
                                            @change="handleCheckAll">
                                        <p style="float:left;font-size: 23px;margin-left: 15px;">
                                            {{ cart[0].system }} : <strong></strong>
                                        </p>
                                        <p style="float:right; font-size:20px;margin-right: 15px; line-height: 29px;">
                                            <span style="float:left;     padding-right: 10px;">Đóng thùng gỗ :</span>
                                            <input style="width:26px;height:26px;" type="checkbox"
                                                class="sellerCheckWoodPack" @input="handleWoodWorkFee"
                                                @change="handleWoodWorkFee" :seller_id="idx" name="is_wood_pack[]">

                                        </p>
                                        <p style="float:right; font-size:20px;margin-right: 15px; line-height: 29px;">
                                            <span style="float:left;     padding-right: 10px;">Kiểm đếm :</span>
                                            <input style="width:26px;height:26px;" type="checkbox"
                                                class="sellerOrderChecked" @input="handleTallyFee"
                                                @change="handleTallyFee" :seller_id="idx" name="is_order_checked[]">
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
                                                                :item_id="item.itemId" :item_color="item.color"
                                                                :item_size="item.size"
                                                                outer_id="7765678544000.5kg(totalweightoftwopeople)issuitableforhandbindingFreesize"
                                                                name="checkbox[]" v-model="item.isChecked"
                                                                @change="handleCheckItem">
                                                            <span class="stt">{{ idx + 1 }}</span>
                                                        </td>

                                                        <td class="item_info">
                                                            <a target="_blank" style="cursor: pointer; color: #0000ff;">
                                                                <img class="item_image" :src="item.itemImage"
                                                                    :style="{ width: 50 + 'px' }">
                                                            </a>
                                                            <a target="_blank" :href="item.itemLink">
                                                                <p>
                                                                    {{ decodeURIComponent(item.itemTitle) }} </p>
                                                            </a>
                                                            <div style="padding:8px 0px;">
                                                                <p>Size: {{ item.size }}</p>
                                                                <p>Color: {{ item.color }}</p>
                                                            </div>
                                                            <div class="note form-group">
                                                                <input :seller_id="item.sellerId" :item_id="item.itemId"
                                                                    :item_color="item.color" :item_size="item.size"
                                                                    class="cart_item_note form-control" name="item_note"
                                                                    placeholder="Chú thích sản phẩm"
                                                                    @keyup.enter.prevent="handleChangeItemDescription"
                                                                    :value="item.description">
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
                                                            <input :seller_id="item.sellerId" :item_id="item.itemId"
                                                                :item_color="item.color" :item_size="item.size"
                                                                outer_id="7765678544000.5kg(totalweightoftwopeople)issuitableforhandbindingFreesize"
                                                                type="number" class="num-product cart_item_quantity"
                                                                name="qty" :value="item.numberItem"
                                                                @keyup.enter.prevent="handleChangeQuantityItem" </td>
                                                        <td class="left">
                                                            <p>{{ (commonStore.exchange_rate * item.itemPrice /
                                                                1000).toFixed(3).replace('.', ',') }} đ</p>
                                                            <p>¥{{ item.itemPrice }}</p>
                                                        </td>

                                                        <td class="left">
                                                            <p><strong><span class="item_total_price_vnd">{{
                                                                CommonUtils.formatNumber((commonStore.exchange_rate
                                                                    * item.itemPrice *
                                                                    item.numberItem)) }}</span>
                                                                    đ</strong></p>
                                                            <p><strong>¥<span class="item_total_price">{{
                                                                CommonUtils.formatNumberFloat((item.itemPrice
                                                                    * item.numberItem)) }}</span></strong></p>
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
                                                                @click="removeShop(idx)"><i class="fa fa-trash-o"
                                                                    aria-hidden="true"></i> Xóa
                                                                shop</a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="seller_order_total">
                                                <table class="cu-table borderless">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                Tiền hàng <fa id="tooltip-order" icon="question-circle">
                                                                </fa>
                                                                <b-tooltip placement="top" variant="secondary"
                                                                    target="tooltip-order" triggers="hover">
                                                                    <p>
                                                                        Tỷ giá 1NDT = {{
                                                                            CommonUtils.formatNumber(commonStore.exchange_rate)
                                                                        }} VNĐ
                                                                    </p>
                                                                </b-tooltip>
                                                            </td>
                                                            <td class="right"><strong><span class="sl_total_price">{{
                                                                CommonUtils.formatNumber(calcCheckedOrderFee(idx))
                                                                        }}</span></strong> đ
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phí tạm tính <i
                                                                    tooltip-content="#tipContent2217631252090"
                                                                    class="hasTooltip fa fa-question-circle tooltipstered"></i>
                                                            </td>
                                                            <td class="right"><strong><span class="sl_total_fee">{{
                                                                CommonUtils.formatNumber(calcAdditionFee(idx))
                                                                        }}</span></strong> đ</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Đặt cọc <i
                                                                    class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                            </td>
                                                            <td class="right"><strong><span
                                                                        class="sl_percent_deposit">{{
                                                                            CommonUtils.formatNumber(calcCheckedOrderFee(idx)
                                                                                * 0.7)
                                                                        }}</span></strong> đ
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <hr>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Tổng <fa id="tooltip-order-total"
                                                                    icon="question-circle"> </fa>
                                                                <b-tooltip placement="top" variant="secondary"
                                                                    target="tooltip-order-total" triggers="hover">
                                                                    <p>
                                                                        Tổng tiền bao gồm tiếng hàng và tiền phí tạm
                                                                        tính
                                                                    </p>
                                                                </b-tooltip>
                                                            </td>
                                                            <td class="right"><strong class="red big"><span
                                                                        class="sl_total_order">{{
                                                                            CommonUtils.formatNumber(calcAdditionFee(idx) +
                                                                                calcCheckedOrderFee(idx)) }}</span></strong> đ
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <p><strong>Chú thích cho Orderchina24h</strong> <i
                                                                        class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                                </p>
                                                                <textarea :seller_id="idx" rows="2"
                                                                    class="form-control shop_order_note"
                                                                    placeholder="Chú thích cho Orderchina24h về đơn hàng"
                                                                    name="shop_order_note"></textarea>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <div id="tipContent2217631252090" class="tipContent hidden">
                                                    <div style="width:300px">
                                                        <table class="cu-table borderless">
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
                                    <div class="container" style="display: flex; flex-direction: row">
                                        <div class="col-md-4">
                                            <input class="pull-left" type="checkbox" name="checkAllSeller"
                                                id="checkBuyAllSeller" :checked="allItemsChecked(cartItems)"
                                                @input="handleCheckAllShop" @change="handleCheckAllShop">
                                            <p class="big pull-left">Chọn mua toàn bộ các shop</p>
                                        </div>
                                        <div class="col-md-8">
                                            <a style="cursor: pointer; color: #0000ff;" @click="bookAllSellerStore"
                                                class="btn bg_green bt_dathang pull-right">Đặt hàng <span
                                                    id="total_all_qty">{{
                                                        getSelectedShop() }}</span> shop đã chọn</a>
                                            <p style="font-size: 18px;" class="big">Tổng tiền hàng:&nbsp;<span
                                                    id="total_price_allseller" class="red">{{
                                                        CommonUtils.formatNumber(
                                                            Array.from(
                                                                Object.keys(this.cartItems)
                                                            ).reduce((sum, item) => sum += this.calcCheckedOrderFee(item) ? this.calcCheckedOrderFee(item) : 0, 0)
                                                        )
                                                    }}</span> đ</p>
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
    name: 'CartSection_Step1',
    data() {
        return {
            cartItems: null,

            selectedItems: new Map(),

            cartStore: useCartStore(),
            commonStore: useCommonStore(),
        }
    },
    mounted() {
        this.cartItems = this.cartStore.cart;
        for (const sellerId in this.cartItems) {
            this.cartItems[sellerId].forEach(item => {
                item.isChecked = false; // Assuming you want to set it to false initially
                item.tallyFee = false; // Assuming you want to set it to false initially
                item.woodWorkFee = false; // Assuming you want to set it to false initially
            });
            this.selectedItems.set(sellerId, 0);
        }
    },
    methods: {
        shopById(id) {
            return `shop_cart_${id}`;
        },
        allItemsChecked(cart) {
            for (const seller_id in cart) {
                if (cart.hasOwnProperty(seller_id)) {
                    const items = cart[seller_id];
                    for (const item of items) {
                        if (!item.hasOwnProperty('isChecked') || !item.isChecked) {
                            return false; // Found an item that is not checked
                        }
                    }
                }
            }
            return true; // All items are checked
        },
        handleChangeQuantityItem(event) {
            const seller_id = event.target.attributes.seller_id.value;
            const item_id = event.target.attributes.item_id.value;
            const item_color = event.target.attributes.item_color.value;
            const item_size = event.target.attributes.item_size.value;
            const item = this.cartItems[seller_id]
                .filter($ => $.itemId === item_id)
                .filter($ => $.color === item_color)
                .filter($ => $.size === item_size);

            item.forEach(el => {
                el.numberItem = parseInt(event.target.value);
            })

            this.calcFeeByItem(seller_id);
            this.cartStore.setCart(this.cartItems);
            // TODO: call api to sync status
            item.forEach(async ($) => {
                const loader = this.$loading.show();
                await ApiCaller.post(ROUTES.Cart.updateOrderItem, $);
                loader.hide();
            })
        },
        handleChangeItemDescription(event) {
            const seller_id = event.target.attributes.seller_id.value;
            const item_id = event.target.attributes.item_id.value;
            const item_color = event.target.attributes.item_color.value;
            const item_size = event.target.attributes.item_size.value;
            const item = this.cartItems[seller_id]
                .filter($ => $.itemId === item_id)
                .filter($ => $.color === item_color)
                .filter($ => $.size === item_size);

            item.forEach(el => {
                el.description = event.target.value;
            })

            // TODO: call api to sync status
            item.forEach(async ($) => {
                const loader = this.$loading.show();
                await ApiCaller.post(ROUTES.Cart.updateOrderItem, $);
                loader.hide();
            })
        },

        handleCheckItem(event) {
            const seller_id = event.target.attributes.seller_id.value;
            const item_id = event.target.attributes.item_id.value;
            const item_color = event.target.attributes.item_color.value;
            const item_size = event.target.attributes.item_size.value;
            debugger
            const item = this.cartItems[seller_id]
                .filter($ => $.itemId === item_id)
                .filter($ => $.color === item_color)
                .filter($ => $.size === item_size);

            item.forEach(el => el.isChecked = event.target.checked);
            debugger
            this.calcFeeByItem(seller_id);
            this.cartStore.setCart(this.cartItems);

        },
        calcFeeByItem(seller_id) {
            debugger
            let value = this.cartItems[seller_id]
                .filter($ => $.isChecked == true)
                .reduce((sum, item) => sum + item.numberItem * item.itemPrice * this.commonStore.exchange_rate, 0);
            debugger
            this.selectedItems.set(seller_id, value);
            debugger
        },
        handleCheckAll(event) {
            const seller_id = event.target.attributes.seller_id.value;
            const value = event.target.checked;
            this.cartItems[seller_id]
                .forEach(el => {
                    el.isChecked = value;
                })
            this.calcFeeByItem(seller_id);
            this.cartStore.setCart(this.cartItems);
        },
        handleCheckAllShop(event) {
            for (const sellerId in this.cartItems) {
                this.cartItems[sellerId].forEach(item => {
                    item.isChecked = event.target.checked; // Assuming you want to set it to false initially
                });
                this.calcFeeByItem(sellerId)
            }
            this.cartStore.setCart(this.cartItems);
        },
        calcCheckedOrderFee(seller_id) {
            return this.selectedItems.get(seller_id);
        },
        calcAdditionFee(seller_id) {
            const fee = this.calcCheckedOrderFee(seller_id)
            if (fee == 0) return 0;
            if (fee < 3_000_000) {
                return Math.max(fee * 0.03, 5000);
            } else if (fee >= 3_000_000 && fee < 30_000_000) {
                debugger
                return Math.max(fee * 0.025, 5000);
            } else if (fee >= 30_000_000 && fee < 100_000_000) {
                return Math.max(fee * 0.02, 5000);
            } else {
                return Math.max(fee * 0.01, 5000);
            }
        },
        calcAllFee() {
            let total = 0;
            debugger
            for (let seller_id in this.cartItems) {
                // total += this.calcAdditionFee(seller_id) + this.calcCheckedOrderFee(seller_id);
                total += this.calcCheckedOrderFee(seller_id);
            }
            return total;
        },
        getSelectedShop() {
            let selected = 0;
            Array.from(this.selectedItems.values())
                .forEach(el => {
                    selected += el > 0 ? 1 : 0;
                })
            return selected;
        },
        bookAllSellerStore() {
            if (this.getSelectedShop() > 0) {
                let selectedCart = {};
                Object.keys(this.cartItems).forEach(seller_id => {
                    const shop = this.cartItems[seller_id].filter(item => item.isChecked == true);
                    if (shop.length > 0) {
                        selectedCart[seller_id] = shop;
                    }
                });
                this.cartStore.setSelectedCart(selectedCart);
                this.$router.push({ path: "/manage/cart/step2" })
            }
        },
        removeShop(seller_id) {
            // Check if the seller_id exists in the items object
            if (this.cartItems.hasOwnProperty(seller_id)) {
                // Remove the item
                delete this.cartItems[seller_id];
                this.selectedItems.delete(seller_id);
                this.cartStore.setCart(this.cartItems);
            }
        },
        handleTallyFee(event) {
            const seller_id = event.target.attributes.seller_id.value;
            const value = event.target.checked;
            this.cartItems[seller_id]
                .forEach(el => {
                    el.tallyFee = value;
                })
            this.cartStore.setCart(this.cartItems);

        },
        handleWoodWorkFee(event) {
            const seller_id = event.target.attributes.seller_id.value;
            const value = event.target.checked;
            this.cartItems[seller_id]
                .forEach(el => {
                    el.woodWorkFee = value;
                })
            this.cartStore.setCart(this.cartItems);
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
