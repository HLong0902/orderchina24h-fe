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
                            <center v-if="!dataReady">
                                <p class="big">Bạn chưa lên đơn nào. Vui lòng truy cập giỏ hàng và tiến hành lên đơn.
                                </p>
                            </center>

                            <div v-else id="checkout_step3" class="customer_shop">
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
                                                    <td><a style="cursor: pointer; color: #0000ff;" @click="viewDetail(order.orderChina.id)">{{
                                                        order.orderChina.orderCode }}</a></td>
                                                    <td>
                                                        <img style="width:30px;" :src="order.orderChina.imageUrl">
                                                    </td>
                                                    <td class="align-center">{{ order.orderChina.totalProduct }}</td>
                                                    <td><span class="bold blue">{{
                                                        CommonUtils.formatNumber(order.orderChina.totalItemMoney)
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
                                        <ul class="pagination">
                                            <li @click="handlePage(page)" v-for="(page, index) in totalPage"
                                                :class="{ active: filter.pageIndex == page }">
                                                <a>{{ page
                                                    }}</a>
                                            </li>
                                            <li>
                                                <a @click="handleNext" data-ci-pagination-page="2" rel="next">Trang sau
                                                    »</a>
                                            </li>
                                            <li>
                                                <a @click="handleLast" data-ci-pagination-page="97">»</a>
                                            </li>
                                        </ul>
                                        <p>
                                            <strong>Total: <span class="green">{{ totalRecord }}</span> (Items)</strong>
                                        </p>
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
                                                class="btn bg_black bt_huydon">Huỷ đơn (<span class="total_order">{{
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
            dataReady: false,
            orderList: [],
            selectedOrder: new Map(),

            filter: {
                orderStatus: 1,
                pageIndex: 1,
                pageSize: CONSTANT.DEFAULT_PAGESIZE,
            },
            totalPage: new Set(),
            totalRecord: 0,

            commonStore: useCommonStore(),
        }
    },
    mounted() {
        this.getListNotPaid();
    },
    methods: {
        async getListNotPaid() {
            this.selectedOrder = new Map();
            let loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.Order.searchOrder, this.filter)
            loader.hide();
            this.dataReady = true;
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
            this.totalPage = new Set();
            this.totalRecord = res.data.totalRecord;
            if (this.filter.pageIndex > res.data.totalPage) {
                this.filter.pageIndex = 1;
            }
            for (let i = 1; i <= res.data.totalPage; i++) {
                this.totalPage.add(i);
            }
        },
        handlePage(page) {
            this.filter.pageIndex = page;
            this.getListNotPaid();
        },
        handleNext() {
            if (this.filter.pageIndex < this.totalPage.size)
                this.filter.pageIndex++;
            else {
                this.filter.pageIndex = this.totalPage.size
            }
            this.getListNotPaid();
        },
        handleLast() {
            this.filter.pageIndex = this.totalPage.size;
            this.getListNotPaid();
        },
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