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
                                                    <td><a @click="viewDetail(order?.orderChina?.id)" style="cursor: pointer;"  target="_blank">{{
                                                        order.orderChina.orderCode }}</a></td>
                                                    <td>
                                                        <img style="width:30px;" :src="order.orderDetails[0].itemImage">
                                                    </td>
                                                    <td class="align-center">{{ order.orderChina.totalProduct }}</td>
                                                    <td><span class="bold blue"></span> {{
                                                        CommonUtils.formatNumber(order.orderChina.totalItemMoney) }}đ
                                                    </td>
                                                    <td>
                                                        <span class="bold green">{{
                                                            CommonUtils.formatNumber(order.orderChina.totalItemMoney *
                                                                order.orderChina.paidPerSent / 100) }}</span> đ /
                                                        ({{ order.orderChina.paidPerSent ? order.orderChina.paidPerSent
                                                            : 70 }}%)

                                                    </td>
                                                    <td class="lable_order276722">
                                                        <p v-if="order.orderChina.deposit" class="success-deposit">
                                                          {{order.orderChina.deposit}}
                                                        </p>
                                                        <input v-else type="checkbox" @input="handleCheckItem"
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
                                                    CommonUtils.formatNumber(this.info?.customerDTO? this.info?.customerDTO.availableBalance: commonStore.user_balance) }}</span> đ</p>
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
            info: '',
            orderData:[]
        }
    },
    mounted() {
      // this.orderedCart = this.cartStore.orderedCart;
      this.orderedCart = StorageManager.retrieve('orderedCart');
      this.orderedCart = Object.values(this.orderedCart).filter((i) => i.orderChina.deposit == null || i.orderChina.deposit == undefined);
      let orderCodes = this.orderedCart.map(item => item.orderChina.orderCode);
      this.getOrderCodes(orderCodes);
      this.getInfo();
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
                if (v?.orderChina?.isCheck) {
                    fee += v?.orderChina?.totalItemMoney * v?.orderChina?.paidPerSent / 100;
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
                });
                Array.from(this.selectedOrder.keys()).forEach(id => {
                    for (let key in this.orderedCart) {
                        if (this.orderedCart[key].orderChina && this.orderedCart[key].orderChina.id === id) {
                          this.orderedCart[key].orderChina.deposit = "Đặt cọc thành công";
                        }
                    }
                });
              this.selectedOrder = new Map();
              StorageManager.store('orderedCart', this.orderedCart);
              this.getInfo();
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
                });
                Array.from(this.selectedOrder.keys()).forEach(id => {
                    for (let key in this.orderedCart) {
                      if (this.orderedCart[key].orderChina && this.orderedCart[key].orderChina.id === id) {
                        this.orderedCart[key].orderChina.deposit = "Đặt cọc thành công";
                      }
                    }
                });
              this.selectedOrder = new Map();
              StorageManager.store('orderedCart', this.orderedCart);
              this.getInfo();
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
        },
        async getInfo() {
          const loader = this.$loading.show();
          const res = await ApiCaller.get(ROUTES.User.info);
          if (res.status != 200) {
            this.$toast.error(`${res.data.message}`, {
              title: 'Thông báo',
              position: 'top-right',
              autoHideDelay: 7000,
            })
            return;
          }
          this.info = res.data;
          this.commonStore.setUserBalance(res?.data?.customerDTO?.availableBalance);
          loader.hide();
        },
        async getOrderCodes(orderCodes) {
          const loader = this.$loading.show();
          const res = await ApiCaller.post(ROUTES.Order.getOrderChinaWithCode,orderCodes);
          if (res.status != 200) {
            this.$toast.error(`${res.data.message}`, {
              title: 'Thông báo',
              position: 'top-right',
              autoHideDelay: 7000,
            })
            return;
          }
          this.orderData = res.data;
          const result = new Map();
          this.orderData.forEach(item => {
            result.set(item.id, item);
          });
          Object.values(this.orderedCart).forEach(order => {
            let orderUpdate = result.get(order.orderChina.id);
            order.orderChina.totalProduct = orderUpdate ? orderUpdate.totalProduct : order.orderChina.totalProduct;
            order.orderChina.totalItemMoney = orderUpdate ? orderUpdate.totalItemMoney : order.orderChina.totalItemMoney;
            order.orderChina.paid = orderUpdate ? orderUpdate.paid : order.orderChina.paid;
            order.orderChina.isCheck = false;
            order.orderChina.deposit = null;
          });
          loader.hide();
        },
        viewDetail(id) {
			window.open(this.$router.resolve({ name: 'OrderDetailPage', params: { orderId: id } }).href, '_blank');
		}
    }
}
</script>

<!-- style custom -->
<style scoped>
@import '../../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../../assets/styles/private-styles.css';
.success-deposit{
  background: green;
  border-radius: 4%;
  color: white;
  padding: 7px;
  font-weight: 100;
}
</style>