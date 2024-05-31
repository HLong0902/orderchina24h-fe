<script setup>
import CommonUtils from '../../../../../utils/CommonUtils';
import { useCommonStore } from '../../../../../../store/CommonStore';
import ApiCaller from '../../../../../utils/ApiCaller';
import ROUTES from '../../../../../../constants/routeDefine';
import CONSTANT from '../../../../../../constants/constants';
</script>

<!-- template section -->
<template>
    <div id="content">
        <div class="container">
            <main class="main" role="main">
                <div class="row main-row">
                    <div class="col-sm-9">
                        <div class="cart-by-page">
                            <div class="titles">
                                <h2 class="page-title">
                                    Danh sách đơn hàng chờ đặt cọc
                                </h2>
                            </div>

                            <br>
                            <center v-if="this.orderList.length == 0">
                                <p class="big">Bạn chưa lên đơn nào. Vui lòng truy cập giỏ hàng và tiến hành lên đơn.
                                </p>
                            </center>

                            <div v-if="this.orderList.length > 0" id="checkout_step3" class="customer_shop">
                                <div class="container">
                                    <div class="row">
                                        <table class="cu-table cu-table_cart form_order_pending"
                                            id="checkout_step3_table">
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
                                                <tr v-for="(order, index) in orderList" :key="index">
                                                    <td class="align-center">{{ index + 1 }}</td>
                                                    <td><a href="#" @click="viewDetail(order.orderChina.id)">{{
                                                        order.orderChina.orderCode }}</a></td>
                                                    <td>
                                                        <img style="width:30px;"
                                                            src="https://cbu01.alicdn.com/img/ibank/O1CN01RcxVqK1CsnBNB8kqo_!!3018240137-0-cib.400x400.jpg">
                                                    </td>
                                                    <td class="align-center">{{ order.orderChina.totalProduct }}</td>
                                                    <td><span class="bold blue">{{
                                                        CommonUtils.formatNumber(order.orderChina.totalAmount)
                                                            }}</span> đ </td>
                                                    <td>
                                                        <span class="bold green">{{
                                                            CommonUtils.formatNumber(order.orderChina.paid) }}</span> đ
                                                        / ({{ order.orderChina.paidPerSent ?
                                                            order.orderChina.paidPerSent : 70 }}%)

                                                    </td>
                                                    <td class="lable_order276779">
                                                        <!--<p class="label label-success">Đặt cọc thành công</p>-->
                                                        <input type="checkbox" class="orderCheck"
                                                            :oid="order.orderChina.id"
                                                            v-model="order.orderChina.isCheck" @input="handleCheckItem"
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
                                                cần cọc : <span id="total_deposit_price" class="red">{{
                                                    CommonUtils.formatNumber(getPrepaidFee()) }}</span> đ</p>
                                            <p style="font-size: 22px;padding: 10px; float:left;" class="big">Số dư khả
                                                dụng : <span id="total_customer_credit" class="green">{{
                                                    CommonUtils.formatNumber(commonStore.user_balance) }}</span> đ</p>
                                            <button @click="bookOrderDeposit" :disabled="!doesUserCanOrder()"
                                                class="btn bg_green bt_dathang">Đặt cọc (<span class="total_order">{{
                                                    selectedOrder.size }}</span>)</button>
                                            <button @click="cancelOrder" :disabled="selectedOrder.size == 0"
                                                class="btn bg_black bt_huydon">Hủy đơn (<span class="total_order">{{
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
    name: 'PendingSection',
    data() {
        return {
            orderList: [],
            selectedOrder: new Map(),

            commonStore: useCommonStore(),
        }
    },
    mounted() {
        setTimeout(() => this.getListNotPaid(), 500)
    },
    methods: {
        viewDetail(id) {
            window.open(this.$router.resolve({ name: 'OrderDetailPage', params: { orderId: id } }).href, '_blank');
        },
        handleCheckItem(event) {
            const order_id = parseInt(event.target.attributes.oid.value);
            const eVal = event.target.checked;
            const item = this.orderList
                .find($ => $.orderChina.id == order_id)
            if (eVal) {
                this.selectedOrder.set(order_id, item);
            } else {
                this.selectedOrder.delete(order_id);
            }
        },
        handleCheckAllItem(event) {
            const eVal = event.target.checked;
            if (eVal) {
                this.orderList.forEach(item => {
                    item.orderChina.isCheck = eVal;
                    this.selectedOrder.set(item.orderChina.id, item);
                })
            }
            else {
                this.orderList.forEach(item => {
                    item.orderChina.isCheck = eVal;
                    this.selectedOrder.delete(item.orderChina.id);
                })
            }
        },
        getPrepaidFee() {
            return Array.from(this.selectedOrder.values())
                .reduce((sum, item) => sum + item.orderChina.paid, 0)
        },
        doesUserCanOrder() {
            if (this.selectedOrder.size == 0)
                return false;
            else
                return this.getPrepaidFee() < this.commonStore.user_balance;
        },
        async getListNotPaid() {
            this.selectedOrder = new Map();
            let loader = this.$loading.show();
            const params = {
                orderStatus: 1,
                pageIndex: 1,
                pageSize: 999999999,
            }
            const res = await ApiCaller.get(ROUTES.Order.searchOrder, params)
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                return;
            }
            this.orderList = res.data.data;
            this.orderList.forEach(order => {
                order.orderChina.isCheck = false;
            })
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
                this.getListNotPaid();
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
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
                this.getListNotPaid();
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