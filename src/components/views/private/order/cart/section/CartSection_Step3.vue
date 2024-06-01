<script setup>
import { useCartStore } from '../../../../../../store/CartStore';
import CONSTANT from '../../../../../../constants/constants';
import ApiCaller from '../../../../../utils/ApiCaller';
import ROUTES from '../../../../../../constants/routeDefine';
import CommonUtils from '../../../../../utils/CommonUtils';
import { useCommonStore } from '../../../../../../store/CommonStore';
import StorageManager from '../../../../../utils/StorageManager';
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
                                                        <input type="checkbox" @input="handleCheckAllItem"
                                                            class="checkAllOrder">
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="order in orderedCart">
                                                    <td class="align-center">1</td>
                                                    <td><a href="#/order/view/276722" target="_blank">{{
                                                        order.orderChina.id }}</a></td>
                                                    <td>
                                                        <img style="width:30px;" :src="order.orderDetails[0].itemImage">
                                                    </td>
                                                    <td class="align-center">{{ order.orderDetails.reduce((sum, item) =>
                                                        sum + item.numberItem, 0) }}</td>
                                                    <td><span class="bold blue"></span> {{
                                                        CommonUtils.formatNumber(order.orderDetails.reduce((sum,
                                                            item) => sum + item.totalPrice, 0)) }}đ </td>
                                                    <td>
                                                        <span class="bold green">{{
                                                            CommonUtils.formatNumber(order.orderDetails.reduce((sum,
                                                                item) => sum + item.totalPrice, 0) * 0.7) }}</span> đ /
                                                        ({{ order.orderChina.paidPerSent ? order.orderChina.paidPerSent
                                                            : 70 }}%)

                                                    </td>
                                                    <td class="lable_order276722">
                                                        <!--<p class="label label-success">Đặt cọc thành công</p>-->
                                                        <input type="checkbox" @input="handleCheckItem"
                                                            v-model="order.orderChina.isCheck" class="orderCheck"
                                                            :oid="order.orderChina.id" name="checkbox[]">
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
                                                cần cọc:&nbsp;<span id="total_deposit_price" class="red">{{
                                                    CommonUtils.formatNumber(callFeeToPay()) }}</span> đ</p>
                                            <p style="font-size: 22px;padding: 10px; float:left;" class="big">Số dư khả
                                                dụng:&nbsp;<span id="total_customer_credit" class="green">{{
                                                    CommonUtils.formatNumber(commonStore.user_balance) }}</span> đ</p>
                                            <button @click="bookOrderDeposit" :disabled="!doesUserCanOrder()"
                                                class="btn bg_green bt_dathang">Đặt cọc <span class="total_order">{{
                                                    selectedOrder.size }}</span> đơn đã chọn</button>
                                            <button @click="cancelOrder" class="btn bg_black bt_huydon">Huỷ đơn
                                                (<span class="total_order">{{
                                                    selectedOrder.size }}</span>)</button>
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
            commonStore: useCommonStore(),

            orderedCart: {},
            selectedOrder: new Map(),
        }
    },
    mounted() {
        // this.orderedCart = this.cartStore.orderedCart;
        this.orderedCart = StorageManager.retrieve('orderedCart')
        Object.values(this.orderedCart).forEach(order => {
            order.orderChina.isCheck = false;
        });

    },
    methods: {
        handleCheckItem(event) {
            const order_id = parseInt(event.target.attributes.oid.value);
            const eVal = event.target.checked;
            const item = Object.values(this.orderedCart)
                .find(order => order.orderChina.id == order_id);
            item.orderChina.isCheck = eVal;
            if (eVal) {
                this.selectedOrder.set(order_id, item);
            } else {
                this.selectedOrder.delete(order_id);
            }
        },
        handleCheckAllItem(event) {
            const eVal = event.target.checked;
            let items = Object.values(this.orderedCart);
            if (eVal) {
                items.forEach(item => {
                    item.orderChina.isCheck = eVal;
                    this.selectedOrder.set(item.orderChina.id, item);
                })
            }
            else {
                items.forEach(item => {
                    item.orderChina.isCheck = eVal;
                    this.selectedOrder.delete(item.orderChina.id);
                })
            }
        },
        callFeeToPay() {
            let fee = 0;
            this.selectedOrder.forEach((v, k) => {
                if (v.orderChina.isCheck) {
                    fee += v.orderDetails.reduce((sum, item) => sum + item.totalPrice, 0) * 0.7;
                }
            })
            return fee;
        },
        doesUserCanOrder() {
            if (this.selectedOrder.size == 0)
                return false;
            else
                return this.callFeeToPay() < this.commonStore.user_balance;
        },
        async bookOrderDeposit() {
            let payload = [];
            let loader = this.$loading.show();
            Array.from(this.selectedOrder.values())
                .map($ => $.orderChina.id)
                .forEach($ => {
                    payload.push({ id: $, status: CONSTANT.ORDER_STATUS.DA_DAT_COC })
                })

            const res = await ApiCaller.post(ROUTES.Order.updateOrderList, payload);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(`Đặt cọc đơn hàng thành công`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                Array.from(this.selectedOrder.keys()).forEach(id => {
                    for (let key in this.orderedCart) {
                        if (this.orderedCart[key].orderChina && this.orderedCart[key].orderChina.id === id) {
                            delete this.orderedCart[key];
                        }
                    }
                })
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
        },
        async cancelOrder() {
            let payload = [];
            let loader = this.$loading.show();
            Array.from(this.selectedOrder.values())
                .map($ => $.orderChina.id)
                .forEach($ => {
                    payload.push({ id: $, status: CONSTANT.ORDER_STATUS.DA_HUY })
                })

            const res = await ApiCaller.post(ROUTES.Order.updateOrderList, payload);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(`Huỷ đơn hàng thành công`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                Array.from(this.selectedOrder.keys()).forEach(id => {
                    for (let key in this.orderedCart) {
                        if (this.orderedCart[key].orderChina && this.orderedCart[key].orderChina.id === id) {
                            delete this.orderedCart[key];
                        }
                    }
                })
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
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