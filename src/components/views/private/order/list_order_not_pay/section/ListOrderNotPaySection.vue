<script setup>
import {useCartStore} from '../../../../../../store/CartStore';
import CONSTANT from '../../../../../../constants/constants';
import ApiCaller from '../../../../../utils/ApiCaller';
import ROUTES from '../../../../../../constants/routeDefine';
import CommonUtils from '../../../../../utils/CommonUtils';
import {useCommonStore} from '../../../../../../store/CommonStore';
import StorageManager from '../../../../../utils/StorageManager';
</script>
<template>
  <div id="content">
    <div class="container">
      <main class="main" role="main">
        <div class="row main-row">
          <div class="shoping_cart">
            <div class="col-md-12">
              <h2 class="page-title" v-if="status == 'total_amount_wait_paid' ">Đơn hàng đã về chưa thanh toán</h2>
              <h2 class="page-title" v-if="status == 'total_amount_product_not_arrived' ">Đơn hàng đã mua chưa về</h2>
              <div id="BookOrderAlert" class="alert-success custom_alert "></div>
              <div id="checkout_step3" class="customer_shop" style="margin-top:30px; ">
                <div class="container">
                  <div class="row">
                    <h4 v-if="status == 'total_amount_wait_paid'"><i class="fa fa-shopping-cart"></i> Danh sách đơn hàng đã về chưa thanh toán </h4>
                    <h4 v-if="status == 'total_amount_product_not_arrived' "><i class="fa fa-shopping-cart"></i> Danh sách đơn hàng đã mua chưa về</h4>
                    <div class="gridtable">
                      <table>
                        <tbody>
                        <tr>
                          <td width="5%">STT</td>
                          <td width="10%">Sản phẩm</td>
                          <td width="13%">Mã đơn</td>
                          <td style="min-width: 150px">Trạng thái</td>
                          <td width="13%">Tổng tiền</td>
                          <td width="13%">Đã thanh toán</td>
                          <td width="13%">Còn thiếu</td>
                        </tr>
                        <tr v-for="(order, index) in orderList">
                          <td class="align-center">{{ index + 1 }}</td>
                          <td>
                            <img style="width:30px;" :src="order.imageUrl">
                          </td>
                          <td>
                            <span class="uppercase">
                              <a
                                  class="blue"
                                  style="cursor: pointer; color: #0000ff"
                                  @click="viewDetail(order.id)"
                              >
                                {{ order.orderCode }}
                              </a>
                            </span>
                          </td>
                          <td>
                            {{promptStatusByValue(order.status)}}
                            <p v-if="status == 'total_amount_wait_paid'">
                              <b>{{ CommonUtils.formatDate(order.dateOfVietNamInventory) }}</b>
                            </p>
                          </td>
                          <td>
                            {{CommonUtils.formatNumber(order.totalAmount)}}
                          </td>
                          <td>
                            {{CommonUtils.formatNumber(order.paid)}}
                          </td>
                          <td>
                            {{CommonUtils.formatNumber(order.notPaid)}}
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <ul class="pagination">
                      <li
                          @click="handlePage(page)"
                          v-for="(page, index) in totalPage"
                          :class="{ active: pageIndex == page }"
                      >
                        <a>{{ page }}</a>
                      </li>
                      <li>
                        <a @click="handleNext" data-ci-pagination-page="2" rel="next"
                        >Trang sau »</a
                        >
                      </li>
                      <li>
                        <a @click="handleLast" data-ci-pagination-page="97">»</a>
                      </li>
                    </ul>
                    <p>
                      <strong
                      >Total: <span class="green">{{ totalRecord }}</span> (Items)</strong
                      >
                    </p>
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

<script>
export default {
  name: "ListOrderNotPaySection",
  data() {
    return {
      status: this.$route.params.status,
      commonStore: useCommonStore(),
      orderList: [],
      totalPage: new Set(),
      totalRecord: 0,
      pageIndex: 1,
      pageSize: 10,
    }
  },
  mounted() {
    this.getListOrders();
  },
  created() {

  },
  methods: {
    viewDetail(id) {
      window.open(this.$router.resolve({name: 'OrderDetailPage', params: {orderId: id}}).href, '_blank');
    },
    async getListOrders() {
      let orderStatus = [5];
      if(this.status == 'total_amount_product_not_arrived'){
        orderStatus = [3,4,5,6]
      }

      let loader = this.$loading.show();
      let body = {
        orderStatus:orderStatus,
        pageIndex:this.pageIndex - 1,
        pageSize:this.pageSize
      }
      const res = await ApiCaller.post(
          ROUTES.Order.getOrderList,
          body,
      );
      loader.hide();
      if (res.status != 200) {
        this.$toast.error(`${res.data.message}`, {
          title: "Thông báo",
          position: "top-right",
          autoHideDelay: 7000,
        });
        return;
      }
      this.orderList = res.data.data;
      this.totalPage = new Set();
      this.totalRecord = res.data.totalRecord;
      if (this.pageIndex > res.data.totalPage) {
        this.pageIndex = 1;
      }
      for (let i = 1; i <= res.data.totalPage; i++) {
        this.totalPage.add(i);
      }
    },
    promptStatusByValue(status) {
      switch (status) {
        case 1:
          return "Đang chờ cọc";
        case 2:
          return "Đã đặt cọc";
        case 3:
          return "Đã mua hàng";
        case 4:
          return "Hàng đã về kho TQ";
        case 5:
          return "Hàng đã về kho VN";
        case 6:
          return "Sẵn sàng giao hàng";
        case 7:
          return "Chờ xử lý khiếu nại";
        case 8:
          return "Đã kết thúc";
        case 9:
          return "Đã huỷ";
      }
    },
    handlePage(page) {
      this.pageIndex = page;
      this.getListOrders();
    },
    handleNext() {
      if (this.pageIndex < this.totalPage.size) this.pageIndex++;
      else {
        this.pageIndex = this.totalPage.size;
      }
      this.getListOrders();
    },
    handleLast() {
      this.pageIndex = this.totalPage.size;
      this.getListOrders();
    },
  }
}
</script>

<!-- style custom -->
<style scoped>
@import '../../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../../assets/styles/private-styles.css';

.success-deposit {
  background: green;
  border-radius: 4%;
  color: white;
  padding: 7px;
  font-weight: 100;
}
</style>