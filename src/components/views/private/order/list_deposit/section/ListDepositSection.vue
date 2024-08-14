<script setup>
import ROUTES from "../../../../../../constants/routeDefine";
import ApiCaller from "../../../../../utils/ApiCaller";
import CONSTANT from "../../../../../../constants/constants";
import CommonUtils from "../../../../../utils/CommonUtils";
import { useCommonStore } from "../../../../../../store/CommonStore";
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
                <h2 class="page-title">Danh sách đơn ký gửi</h2>
              </div>

              <div class="list_status clearfix">
                <ul>
                  <li>
                    <a
                      @click="filterByStatus(null)"
                      style="cursor: pointer"
                      class="black"
                    >
                      Toàn bộ : <span>({{ stats.toan_BO }})</span>
                    </a>
                  </li>
                  <li>
                    <a
                      @click="filterByStatus(CONSTANT.ORDER_STATUS.DA_DUYET)"
                      style="cursor: pointer"
                      class="green"
                    >
                      Đã duyệt :
                      <span>({{ stats.da_DUYET }})</span>
                    </a>
                  </li>
                  <li>
                    <a
                      @click="
                        filterByStatus(CONSTANT.ORDER_STATUS.HANG_DA_VE_KHO_TQ)
                      "
                      style="cursor: pointer"
                      class="hangdave_tq"
                    >
                      Nhập kho TQ :
                      <span
                        >({{ stats.hang_DA_VE_KHO_TQ }})</span
                      >
                    </a>
                  </li>
                  <li>
                    <a
                      @click="
                        filterByStatus(CONSTANT.ORDER_STATUS.HANG_DA_VE_KHO_VN)
                      "
                      style="cursor: pointer"
                      class="hangdave"
                    >
                      Nhập kho VN :
                      <span
                        >({{ stats.hang_DA_VE_KHO_VN }})</span
                      >
                    </a>
                  </li>
                  <li>
                    <a
                      @click="
                        filterByStatus(CONSTANT.ORDER_STATUS.SAN_SANG_GIAO_HANG)
                      "
                      style="cursor: pointer"
                      class="bold ssgiao"
                    >
                      Sẵn sàng giao hàng :
                      <span
                        >({{ stats.san_SANG_GIAO_HANG }})</span
                      >
                    </a>
                  </li>
                  <li>
                    <a
                      @click="filterByStatus(CONSTANT.ORDER_STATUS.DA_GIAO)"
                      style="cursor: pointer"
                      class="damuahang"
                    >
                      Đã giao :
                      <span
                        >({{ stats.da_GIAO }})</span
                      >
                    </a>
                  </li>
                  <li>
                    <a
                      @click="filterByStatus(CONSTANT.ORDER_STATUS.DA_KET_THUC)"
                      style="cursor: pointer"
                      class="black"
                    >
                      Đã kết thúc :
                      <span
                        >({{ stats.da_KET_THUC }})</span
                      >
                    </a>
                  </li>
                  <li>
                    <a
                      @click="filterByStatus(CONSTANT.ORDER_STATUS.DA_HUY)"
                      style="cursor: pointer"
                      class="red"
                    >
                      Đã hủy :
                      <span
                        >({{ stats.da_HUY }})</span
                      >
                    </a>
                  </li>
                </ul>
              </div>

              <div class="filter">
                <form
                  @submit.prevent="handleSubmit"
                  class="form-horizontal"
                  method="get"
                >
                  Mã đơn hàng :
                  <input
                    v-model="filter.orderCode"
                    class="custom_input"
                    type="text"
                    name="filter_id"
                    value=""
                  />
                  &nbsp; Mã vận đơn :
                  <input
                    v-model="filter.shipCode"
                    class="custom_input"
                    type="text"
                    name="filter_id"
                    value=""
                  />

                  <input
                    @click="getList"
                    class="button custom_flat_button"
                    type="submit"
                    value="Lọc"
                  />
                </form>
                <div class="space10"></div>
              </div>
              <div>
                <table class="cu-table-responsive size_medium">
                  <tr class="order_row row_header">
                    <td width="3%">
                      <p>STT</p>
                    </td>
                    <td width="7%">
                      <p>Đơn hàng / Ngày mua hàng</p>
                    </td>
                    <td width="15%">
                      <p>Thông tin khách hàng</p>
                    </td>
                    <td width="6%">
                      <p>Kho nhận hàng</p>
                    </td>
                    <td width="10%">
                      <p>Mã vận đơn</p>
                    </td>
                    <td width="10%">
                      <p>Tổng cân nặng</p>
                    </td>
                    <!-- <td width="5%">
                      <p>Tổng tiền VC</p>
                    </td> -->
                    <td width="5%">
                      <p>Phí bảo hiểm</p>
                    </td>
                    <td width="7%">
                      <p>Giá trị hàng</p>
                    </td>
                    <td width="7%">
                      <p>Tổng tiền cần TT</p>
                    </td>
                    <td width="7%">
                      <p>Tình trạng</p>
                    </td>
                  </tr>
                  <tr
                    v-for="(order, index) in orderList"
                    class="order_row"
                    :class="index % 2 == 0 ? 'even' : 'odd'"
                  >
                    <td style="text-align: center;">
                      <p>{{ index + 1 }}</p>
                    </td>
                    <td>
                      <a
                        style="cursor: pointer"
                        @click="viewDetail(order.orderChina.id)"
                        class="blue"
                        >{{ order.orderChina.orderCode }}</a
                      >
                      <br />
                      <span class="bold">{{
                        CommonUtils.formatDate(order.orderChina.createDate)
                      }}</span>
                    </td>
                    <td>
                      <span class="bold"
                        >User:
                        <span class="red">{{
                          order.customerInfo.username
                        }}</span></span
                      >
                      <br />
                      <span class="bold"
                        >SĐT:
                        <span class="blue">{{
                          order.customerInfo.phone
                        }}</span></span
                      >
                      <br />
                      <span class="bold"
                        >Địa chỉ:
                        <span>{{
                          order.customerInfo.address
                        }}</span></span
                      >
                    </td>
                    <td style="text-align: center;">
                      <span class="bold">{{
                        promptInventoryNameById(order.customerInfo.inventoryId)
                      }}</span>
                    </td>
                    <td>
                      <span v-for="(pkg, idx) in order.packages"
                        ><span class="bold">{{ pkg.shipCode }}</span>
                        -
                        (<span class="bold" v-if="order.orderChina.isVolume">{{pkg.volume ? pkg.volume : 0 }} khối</span>
                        <span class="bold" v-else>{{pkg.weigh ? pkg.weigh : 0 }} kg</span>)
                        <br v-if="idx != order.packages.length - 1" />
                      </span>
                    </td>
                    <!-- <td>
                      <span class="green">
                        {{
                          order.orderChina.totalWeight
                            ? order.orderChina.totalWeight
                            : 0
                        }}
                        kg
                      </span>
                    </td> -->
                    <td style="text-align: center;">
                      <span class="blue">
                        {{
                          order.orderChina.shippingPrice
                            ? CommonUtils.formatNumber(order.orderChina.shippingPrice)
                            : 0
                        }}
                        đ
                      </span>
                    </td>
                    <td>
                      <span class="red bold">
                        {{ order.orderChina.premium }}%
                      </span>
                    </td>
                    <td>
                      <span class="bold">
                        {{
                          CommonUtils.formatNumber(
                            order.orderChina.priceProduct,
                          )
                        }}
                        đ
                      </span>
                    </td>
                    <td>
                      <span class="bold green">
                        {{
                          CommonUtils.formatNumber(order.orderChina.totalAmount)
                        }}
                        đ
                      </span>
                    </td>
                    <td
                      :class="
                        promptClassByStatusValue(order?.orderChina.status)
                      "
                    >
                      <span>
                        {{
                          CommonUtils.promptOrderStatusNameByValueAdmin(
                            order.orderChina.status,
                          )
                        }}
                      </span>
                      <br>
                      <span style="font-weight: 500;" class="black">
                        Đóng gỗ: <input v-model="order.orderChina.isWoodworkingFee" @input="toggleWoodWork($event, order?.orderChina?.id)" type="checkbox" />
                      </span>
                    </td>
                  </tr>
                </table>

                <div class="pag"></div>
                <ul class="pagination">
                  <li
                    @click="handlePage(page)"
                    v-for="(page, index) in totalPage"
                    :class="{ active: filter.pageIndex == page }"
                  >
                    <a>{{ page }}</a>
                  </li>
                  <li>
                    <a
                      @click="handleNext"
                      data-ci-pagination-page="2"
                      rel="next"
                      >Trang sau »</a
                    >
                  </li>
                  <li>
                    <a @click="handleLast" data-ci-pagination-page="97">»</a>
                  </li>
                </ul>
                <p>
                  <strong
                    >Total:
                    <span class="green">{{ totalRecord }}</span> (Items)</strong
                  >
                </p>
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
  name: "ListDepositSection",
  data() {
    return {
      listInventories: [],
      orderList: [],

      filter: {
        orderCode: "",
        shipCode: "",
        pageIndex: 1,
        pageSize: CONSTANT.DEFAULT_PAGESIZE,
      },
      totalPage: new Set(),
      totalRecord: 0,
      stats: {},
      commonStore: useCommonStore(),
    };
  },
  mounted() {
    this.getList();
    this.countSendStats();
  },
  methods: {
    async getList() {
      let loader = this.$loading.show();
      const res = await ApiCaller.get(
        ROUTES.Order.getDepositOrder,
        this.filter,
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
      if (this.filter.pageIndex > res.data.totalPage) {
        this.filter.pageIndex = 1;
      }
      for (let i = 1; i <= res.data.totalPage; i++) {
        this.totalPage.add(i);
      }
    },
    async filterByStatus(status) {
      this.filter = {
        orderCode: "",
        shipCode: "",
        status: status,
        pageIndex: 1,
        pageSize: CONSTANT.DEFAULT_PAGESIZE,
      };
      let loader = this.$loading.show();
      const res = await ApiCaller.get(
        ROUTES.Order.getDepositOrder,
        this.filter,
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
      if (this.filter.pageIndex > res.data.totalPage) {
        this.filter.pageIndex = 1;
      }
      for (let i = 1; i <= res.data.totalPage; i++) {
        this.totalPage.add(i);
      }
    },
    handlePage(page) {
      this.filter.pageIndex = page;
      this.getList();
    },
    handleNext() {
      if (this.filter.pageIndex < this.totalPage.size) this.filter.pageIndex++;
      else {
        this.filter.pageIndex = this.totalPage.size;
      }
      this.getList();
    },
    handleLast() {
      this.filter.pageIndex = this.totalPage.size;
      this.getList();
    },
    promptInventoryNameById(id) {
      const inventory = this.commonStore?.inventories?.filter(
        ($) => $.id == id,
      )[0];
      if (inventory) return inventory?.name;
      else return "";
    },
    viewDetail(id) {
      window.open(
        this.$router.resolve({
          name: "TransportDetailPage",
          params: { orderId: id },
        }).href,
        "_blank",
      );
    },
    promptClassByStatusValue(status) {
      switch (status) {
        case 0:
          return "bold";
        case 1:
          return "daduyet";
        case 2:
          return "dathanhtoan";
        case 3:
          return "damuahang";
        case 4:
          return "hangdave";
        case 5:
          return "hangdave";
        case 6:
          return "hangdave";
        case 7:
          return "chokhieunai";
        case 8:
          return "daketthuc";
        case 9:
          return "dahuy";
      }
    },
    async toggleWoodWork(event, id) {
      let loader = this.$loading.show();
      const value = event.target.checked;
      const payload = {
          id: id,
          isWoodworkingFee: value,
      }
      const res = await ApiCaller.post(ROUTES.Order.updateOrderStatus, payload);
      loader.hide();
      if (res.status == 200) {
          this.$toast.success(`Chuyển trạng thái đóng gỗ thành công`, {
              title: 'Thông báo',
              position: 'top-right',
              autoHideDelay: 7000,
          })
          this.getList();
      } else {
          this.$toast.error(`${res.data.message}`, {
              title: 'Thông báo',
              position: 'top-right',
              autoHideDelay: 7000,
          })
      }
  },
    async countSendStats() {
      const loader = this.$loading.show();
      const res = await ApiCaller.get(ROUTES.Order.userCountSendStats);
      loader.hide();
      if (res.status != 200) {
        this.$toast.error(`${res.data.message}`, {
          title: "Thông báo",
          position: "top-right",
          autoHideDelay: 7000,
        });
        return;
      }
      this.stats = res.data;
    },
  },
};
</script>

<!-- style custom -->
<style scoped>
@import "../../../../../../assets/styles/bootstrap.min.css";
@import "../../../../../../assets/styles/w2-ui.min.css";
@import "../../../../../../assets/styles/private-styles.css";
</style>
