<script setup>
import CONSTANT from "../../../../../../constants/constants";
import ROUTES from "../../../../../../constants/routeDefine";
import { useCommonStore } from "../../../../../../store/CommonStore";
import ApiCaller from "../../../../../utils/ApiCaller";
import CommonUtils from "../../../../../utils/CommonUtils";
</script>

<!-- template section -->
<template>
  <div id="content" class="clearfix fullwidth">
    <h2 class="title">Danh sách đơn hàng cần thanh toán</h2>
    <br />
    <div class="gridtable">
      <table>
        <tbody>
          <tr>
            <td width="5%">STT</td>
            <td width="10%">Mã hóa đơn/Ngày mua hàng</td>
            <td width="15%">Thông tin sản phẩm</td>
            <td width="10%">Mã shop</td>
            <td width="10%">Tổng tiền</td>
            <td width="10%">Phí nội địa</td>
            <td width="10%">Phí ship thực</td>
            <td width="10%">Thực thanh toán</td>
            <td style="width: 170px">Thao tác</td>
          </tr>
          <tr v-for="(order, index) in orderList">
            <td class="align-center">{{ index + 1 }}</td>
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
              <p>
                <b>{{ CommonUtils.formatDate(order.createDate) }}</b>
              </p>
            </td>
            <td>
              <div>
                Tổng số SP:
                <span class="red">{{ order.totalProduct }}</span>
              </div>
              <div>
                Tổng tiền:
                <span class="red">
                  {{
                    CommonUtils.formatNumberFloat(
                      order.totalItemMoneyNDT,
                    )
                  }}
                  (<span class="green">{{
                    CommonUtils.formatNumber(order.totalItemMoney)
                  }}</span>
                  <span class="small">đ</span>)
                </span>
              </div>
            </td>
            <td>
              <span v-for="(code, idx) in order.orderShopCodes">
                <a style="cursor: pointer; color: #000;" @click="viewShopDetail(order.system, code.shopId)" class="bold">{{ code.shopId }}</a>
                <br>
              </span>
            </td>
            <td>
              <span class="red">{{
                CommonUtils.formatNumberFloat(order.totalMoneyNDT)
              }}</span>
            </td>
            <td style="text-align: center;">
              <span class="red">
                {{ CommonUtils.formatNumberFloat(order?.domesticFeesChinaNDT) }}
              </span>
            </td>
            <td style="text-align: center;">
              <span class="red">
                {{ CommonUtils.formatNumberFloat(order?.domesticFeesChinaNDT) }}
              </span>
            </td>
            <td style="text-align: center;">
              <span class="red">
                {{ CommonUtils.formatNumberFloat(order?.paymentCompany) }}
              </span>
            </td>
            <td>
              <span>
                <span class="red">{{
                  order?.paymentCompanyDescriptionStaff?.split(" ")[0]
                }}</span
                >&nbsp;
                <span>{{
                  order?.paymentCompanyDescriptionStaff
                    ?.split(" ")
                    .slice(1)
                    .join(" ")
                }}</span
                >&nbsp;
              </span>
              <br />
              <a class="button-link" @click="addCompanyPayment(order)"
                >Đã thanh toán</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ul class="pagination">
      <li
        @click="handlePage(page)"
        v-for="(page, index) in totalPage"
        :class="{ active: filter.pageIndex == page }"
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
</template>

<!-- function defined -->
<script>
export default {
  name: "StaffOrderNeedPurchaseSection",
  data() {
    return {
      orderList: [],

      commonStore: useCommonStore(),

      filter: {
        pageIndex: 1,
        pageSize: CONSTANT.DEFAULT_PAGESIZE,
      },

      totalPage: new Set(),
      totalRecord: 0,

      stats: {},
    };
  },
  mounted() {
    this.getListOrders();
    this.adminCountStats();
  },
  methods: {
    async getListOrders() {
      let loader = this.$loading.show();
      const res = await ApiCaller.get(
        ROUTES.Order.findOrderNeedPurchase,
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
    async addCompanyPayment(order) {
      const payload = {
        id: order.id,
        paymentCompany: order.paymentCompany,
      };
      const loader = this.$loading.show();
      const res = await ApiCaller.post(ROUTES.Order.updateOrderStatus, payload);
      loader.hide();
      if (res.status == 200) {
        this.$toast.success(
          `Chuyển trạng thái đã thanh toán cho đơn hàng ${order?.orderCode} thành công`,
          {
            title: "Thông báo",
            position: "top-right",
            autoHideDelay: 7000,
          },
        );
        this.paymentCompany = 0;
        this.getListOrders();
      } else {
        this.$toast.error(`${res.data.message}`, {
          title: "Thông báo",
          position: "top-right",
          autoHideDelay: 7000,
        });
      }
    },
    async filterByStatus(status) {
      this.filter = {
        pageIndex: 1,
        pageSize: CONSTANT.DEFAULT_PAGESIZE,
      };
      let loader = this.$loading.show();
      const res = await ApiCaller.get(
        ROUTES.Order.findOrderNeedPurchase,
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
      this.getListOrders();
    },
    handleNext() {
      if (this.filter.pageIndex < this.totalPage.size) this.filter.pageIndex++;
      else {
        this.filter.pageIndex = this.totalPage.size;
      }
      this.getListOrders();
    },
    handleLast() {
      this.filter.pageIndex = this.totalPage.size;
      this.getListOrders();
    },
    viewDetail(id) {
      window.open(
        this.$router.resolve({
          name: "StaffOrderDetailPage",
          params: { orderId: id },
        }).href,
        "_blank",
      );
    },
    promptLocationByInventoryId(id) {
      return (
        this.commonStore.inventories?.filter(($) => $.id == id)[0]?.name +
        " - " +
        this.commonStore.inventories?.filter(($) => $.id == id)[0]?.location
      );
    },
    promptNameByInventoryId(id) {
      return this.commonStore.inventories?.filter(($) => $.id == id)[0]?.name;
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
    async filterBy() {
      const loader = this.$loading.show();
      const res = await ApiCaller.get(
        ROUTES.Order.findOrderNeedPurchase,
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
      this.filter.pageIndex = 1;
      for (let i = 1; i <= res.data.totalPage; i++) {
        this.totalPage.add(i);
      }
    },
    async adminCountStats() {
      const loader = this.$loading.show();
      const res = await ApiCaller.get(ROUTES.Order.adminCountStats);
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
    async handleAction(order) {
      const payload = {
        id: order.id,
        status: CommonUtils.getNextStateOfOrder(order.status),
      };
      const loader = this.$loading.show();
      const res = await ApiCaller.post(ROUTES.Order.updateOrderStatus, payload);
      loader.hide();
      if (res.status == 200) {
        this.$toast.success(
          `Chuyển trạng thái ${CommonUtils.promptOrderStatusNameByValueAdmin(
            CommonUtils.getNextStateOfOrder(order.status),
          )} cho đơn hàng ${order.orderCode} thành công`,
          {
            title: "Thông báo",
            position: "top-right",
            autoHideDelay: 7000,
          },
        );
        this.getListOrders();
      } else {
        this.$toast.error(`${res.data.message}`, {
          title: "Thông báo",
          position: "top-right",
          autoHideDelay: 7000,
        });
      }
    },
    viewShopDetail(system, shopId) {
        switch (system.toLowerCase()) {
            case 'taobao':
                console.log("taobao")
                window.open(`https://market.m.taobao.com/app/dinamic/pc-trade-logistics/home.html?orderId=${shopId}`, '_blank');
                break;
            case '1688':
                console.log("1688")
                window.open(`https://trade.1688.com/order/new_step_order_detail.htm?orderId=${shopId}`, '_blank');
                break;
            default:
                break;
        }
    }
  },
};
</script>

<!-- style custom -->
<style scoped></style>
