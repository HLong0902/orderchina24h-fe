<script setup>
import CONSTANT from "../../../../../constants/constants";
import ROUTES from "../../../../../constants/routeDefine";
import { useCommonStore } from "../../../../../store/CommonStore";
import ApiCaller from "../../../../utils/ApiCaller";
import CommonUtils from "../../../../utils/CommonUtils";
</script>

<!-- template section -->
<template>
  <div id="content" class="clearfix fullwidth">
    <h2 class="title">Danh sách đơn ký gửi</h2>
    <div class="list_status clearfix">
      <ul>
        <li>
          <a
            @click="getListByStatus(null)"
            style="cursor: pointer"
            class="black"
          >
            Tòan bộ : <span>({{ stats.toan_BO }})</span>
          </a>
        </li>
        <li>
          <a
            @click="getListByStatus(CONSTANT.ORDER_STATUS.DA_DUYET)"
            style="cursor: pointer"
            class="green"
          >
            Đã duyệt :
            <span
              >({{
                stats.da_DUYET
              }})</span
            >
          </a>
        </li>
        <li>
          <a
            @click="getListByStatus(CONSTANT.ORDER_STATUS.HANG_DA_VE_KHO_TQ)"
            style="cursor: pointer"
            class="hangdave_tq"
          >
            Nhập kho TQ :
            <span
              >({{
                stats.hang_DA_VE_KHO_TQ
              }})</span
            >
          </a>
        </li>
        <li>
          <a
            @click="getListByStatus(CONSTANT.ORDER_STATUS.HANG_DA_VE_KHO_VN)"
            style="cursor: pointer"
            class="hangdave"
          >
            Nhập kho VN :
            <span
              >({{
                stats.hang_DA_VE_KHO_VN
              }})</span
            >
          </a>
        </li>
        <li>
          <a
            @click="getListByStatus(CONSTANT.ORDER_STATUS.SAN_SANG_GIAO_HANG)"
            style="cursor: pointer"
            class="bold ssgiao"
          >
            Sẵn sàng giao hàng :
            <span
              >({{
                stats.san_SANG_GIAO_HANG
              }})</span
            >
          </a>
        </li>
        <li>
          <a
            @click="getListByStatus(CONSTANT.ORDER_STATUS.DA_GIAO)"
            style="cursor: pointer"
            class="damuahang"
          >
            Đã giao :
            <span
              >({{
                stats.da_GIAO
              }})</span
            >
          </a>
        </li>
        <li>
          <a
            @click="getListByStatus(CONSTANT.ORDER_STATUS.DA_KET_THUC)"
            style="cursor: pointer"
            class="black"
          >
            Đã kết thúc :
            <span
              >({{
                stats.da_KET_THUC
              }})</span
            >
          </a>
        </li>
        <li>
          <a
            @click="getListByStatus(CONSTANT.ORDER_STATUS.DA_HUY)"
            style="cursor: pointer"
            class="red"
          >
            Đã hủy :
            <span
              >({{
                stats.da_HUY
              }})</span
            >
          </a>
        </li>
      </ul>
    </div>

    <div class="filer_box">
      <form action="/orders/lists" @submit.prevent="handleSubmit" method="GET">
        Mã đơn hàng:
        <input
          v-model="filter.orderCode"
          type="text"
          value=""
          name="filter_id"
        />

        Mã vận đơn:
        <input
          v-model="filter.shipCode"
          type="text"
          value=""
          name="filter_username"
        />

        Trạng thái:
        <select :value="null" v-model="filter.status">
          <option :value="null">Tất cả</option>
          <option
            v-for="(value, key) in CONSTANT.DEPOSIT_ORDER_STATUS"
            :key="key"
            :value="value"
          >
            {{ CommonUtils.promptOrderStatusNameByValueAdmin(value) }}
          </option>
        </select>
        &nbsp;
        <input
          class="button"
          type="submit"
          @click="getTransportOrder"
          value="Tìm kiếm"
        />
      </form>
    </div>

    <div class="gridtable">
      <table>
        <tbody>
          <tr>
            <td>STT</td>
            <td>Đơn hàng / Ngày mua hàng</td>
            <td>Thông tin khách hàng</td>
            <td>Kho nhận hàng</td>
            <td>Mã vận đơn</td>
            <td>Tổng cân nặng</td>
            <td>Phí bảo hiểm</td>
            <td>Giá trị hàng</td>
            <td>Tổng tiền cần thanh toán</td>
            <td
              v-if="
                CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN &&
                CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_MUA_HANG
              "
              width="150px"
            >
              Thao tác
            </td>
          </tr>
          <tr
            v-for="(order, index) in orderList.filter(
              (el) =>
                filterStatus == null || el.orderChina.status == filterStatus,
            )"
            class=""
          >
            <td class="align-center">
              {{ index + 1 }}
            </td>
            <td>
              <a
                style="cursor: pointer"
                @click="viewDetail(order.orderChina.id)"
                class="green"
              >
                {{ order.orderChina.orderCode }}
              </a>
              <div class="bold">
                {{ CommonUtils.formatDate(order.orderChina.createDate) }}
              </div>
            </td>
            <td>
              <b>Username: </b><span class="red">{{ order.customerInfo.username }}</span>
              <br />
              <b>SĐT: </b
              ><span class="green">{{ order.customerInfo.phone }}</span>
              <br />
              <b>Địa chỉ: </b
              ><span class="blue">{{ order.customerInfo.address }}</span>
              <br>
              <b>Số dư:
                <span v-if="order?.customerInfo?.availableBalance >= 0" class="bg_green">{{ CommonUtils.formatNumber(order?.customerInfo?.availableBalance) }}</span>
                <span v-if="order?.customerInfo?.availableBalance < 0" class="bg_red">{{ CommonUtils.formatNumber(order?.customerInfo?.availableBalance) }}</span>
              </b>
            </td>
            <td>
              <div class="green">KHO HN</div>
            </td>
            <td>
              <span class="bold" v-for="(pkg, idx) in order.packages">
                {{ pkg.shipCode }} <br />
                <span class="blue" v-if="order.orderChina.isVolume">({{
                     pkg.volume ? pkg.volume : 0
                  }}
                </span>
                <span class="blue" v-else>
                  ({{
                    pkg.weigh ? pkg.weigh : 0
                  }}
                </span>
                <span class="blue">
                    {{ order.orderChina.isVolume ? " khối" : "kg" }})
                </span>
                <br v-if="idx != order.packages.length - 1" /><br />
              </span>
            </td>
            <td>
              <span class="red" v-if="order.orderChina.isVolume">
                {{order.orderChina.totalVolume ? order.orderChina.totalVolume : 0 }}
                {{ order.orderChina.isVolume ? " khối" : " kg" }}
              </span>
              <span class="red" v-else>
                {{order.orderChina.totalWeight ? order.orderChina.totalWeight : 0 }}
                {{ order.orderChina.isVolume ? " khối" : " kg" }}
              </span>
            </td>
            <td>
              <span class="bold">
                {{ order.orderChina.premium ? order.orderChina.premium : 0 }}%
              </span>
            </td>
            <td width="150px">
              <span class="green"
                >{{
                  CommonUtils.formatNumber(order.orderChina.priceProduct)
                }}
                VNĐ</span
              >
            </td>
            <td width="150px">
              <span class="green"
                >{{
                  CommonUtils.formatNumber(order?.orderChina?.totalAmount)
                }}
                VNĐ</span
              >
            </td>
            <td
              v-if="
                CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN &&
                CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_MUA_HANG
              "
            >
              <form
                style="
                  display: flex;
                  justify-items: center;
                  flex-direction: column;
                  text-align: center;
                "
                action=""
                class="ajaxFormPackages"
                method="POST"
              >
                <a
                  class="button-link special-green"
                  v-if="
                    !(
                      order.orderChina.status == 0 ||
                      order.orderChina.status == 9
                    )
                  "
                  @click="handleAction(order.orderChina)"
                >
                  {{
                    promptStatusNameByStatus(
                      getNextStateOfPkg(order.orderChina.status),
                    )
                  }}
                </a>
                <span
                  class="bold"
                  v-if="
                    order.orderChina.status >= 5 && order.orderChina.status < 9
                  "
                >
                  Số tiền tất toán: <br /><span class="green"
                    >{{
                      CommonUtils.formatNumber(order?.orderChina?.notPaid)
                    }}
                    đ</span
                  >
                </span>
                <span class="bold" v-else-if="order.orderChina.status == 9">
                  Kết thúc đơn: <br /><span class="blue">{{
                    CommonUtils.formatDate(order?.orderChina?.dateDone)
                  }}</span>
                </span>
                <a
                  v-if="order.orderChina.status != 0"
                  class="button-link red"
                  @click="handleAction(order.orderChina, true)"
                >
                  Đã huỷ
                </a>
                <span v-if="order.orderChina.status == 0" class="bold">
                  <span class="red">{{ order?.orderChina?.userDelete }}</span>
                  đã huỷ lúc
                  <span class="blue">{{
                    CommonUtils.formatDate(order?.orderChina?.dateDelete)
                  }}</span>
                </span>
              </form>
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
  name: "StaffTransportSection",
  data() {
    return {
      orderList: [],

      filter: {
        orderCode: "",
        shipCode: "",
        status: null,
        pageIndex: 1,
        pageSize: CONSTANT.DEFAULT_PAGESIZE,
      },

      filterStatus: null,

      totalPage: new Set(),
      totalRecord: 0,

      commonStore: useCommonStore(),
      stats: {},
    };
  },
  mounted() {
    this.getTransportOrder();
    this.adminCountSendStats()
  },
  methods: {
    async getTransportOrder() {
      this.filterStatus = this.filter.status;
      const loader = this.$loading.show();
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
      await this.adminCountSendStats();
    },
    async getListByStatus(status) {
      this.filterStatus = status;
      this.filter.status = status;
      const loader = this.$loading.show();
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
      await this.adminCountSendStats();
    },
    handlePage(page) {
      this.filter.pageIndex = page;
      this.getTransportOrder();
    },
    handleNext() {
      if (this.filter.pageIndex < this.totalPage.size) this.filter.pageIndex++;
      else {
        this.filter.pageIndex = this.totalPage.size;
      }
      this.getTransportOrder();
    },
    handleLast() {
      this.filter.pageIndex = this.totalPage.size;
      this.getTransportOrder();
    },
    getNextStateOfPkg(status) {
      switch (status) {
        case 1:
        case 2:
        case 3:
          return 4;
        case 4:
          return 5;
        case 5:
          return 6;
        case 6:
          return 7;
        case 8:
          return 9;
        case 7:
          return 9;
      }
    },
    promptStatusNameByStatus(status) {
      switch (status) {
        case 4:
          return "Nhập kho TQ";
        case 5:
          return "Hàng đã về kho VN";
        case 6:
          return "Sẵn sàng giao hàng";
        case 7:
          return "Đã giao";
        case 8:
          return "Kết thúc";
        case 9:
          return "Đã kết thúc";
        case 0:
          return "Đã huỷ";
      }
    },
    async handleAction(order, isCancel = false) {
      const loader = this.$loading.show();
      const payload = {
        id: order.id,
        status: isCancel ? 0 : this.getNextStateOfPkg(order.status),
      };
      const res = await ApiCaller.post(ROUTES.Order.updateOrderStatus, payload);
      if (res.status == 200) {
        let vcl = isCancel ? 0 : this.getNextStateOfPkg(order.status);
        this.$toast.success(
          `Chuyển trạng thái ${this.promptStatusNameByStatus(
            vcl,
          )} cho đơn hàng ${order.orderCode} thành công`,
          {
            title: "Thông báo",
            position: "top-right",
            autoHideDelay: 7000,
          },
        );
      } else {
        this.$toast.error(`${res.data.message}`, {
          title: "Thông báo",
          position: "top-right",
          autoHideDelay: 7000,
        });
      }
      loader.hide();
      this.getTransportOrder();
    },
    async adminCountSendStats() {
      const loader = this.$loading.show();
      const res = await ApiCaller.get(ROUTES.Order.adminCountSendStats);
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
    viewDetail(id) {
      window.open(
        this.$router.resolve({
          name: "StaffTransportOrderDetailPage",
          params: { orderId: id },
        }).href,
        "_blank",
      );
    },
  },
};
</script>

<!-- style custom -->
<style scoped></style>
