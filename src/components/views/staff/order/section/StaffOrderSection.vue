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
    <h2 class="title">Danh sách đơn hàng</h2>
    <div class="list_status clearfix">
      <ul>
        <li>
          <a
            @click="filterByStatus(null)"
            style="cursor: pointer"
            class="black"
          >
            Tòan bộ : <span>({{ stats.toan_BO }})</span>
          </a>
        </li>
        <li>
          <a
            @click="filterByStatus(CONSTANT.ORDER_STATUS.DA_DUYET)"
            style="cursor: pointer"
            class="green"
          >
            Đã duyệt : <span>({{ stats.da_DUYET }})</span>
          </a>
        </li>
        <li>
          <a
            @click="filterByStatus(CONSTANT.ORDER_STATUS.DA_DAT_COC)"
            style="cursor: pointer"
            class="dathanhtoan"
          >
            Đã đặt cọc : <span>({{ stats.da_DAT_COC }})</span>
          </a>
        </li>
        <li>
          <a
            @click="filterByStatus(CONSTANT.ORDER_STATUS.DA_MUA_HANG)"
            style="cursor: pointer"
            class="damuahang"
          >
            Đã mua hàng : <span>({{ stats.da_MUA_HANG }})</span>
          </a>
        </li>
        <li>
          <a
            @click="filterByStatus(CONSTANT.ORDER_STATUS.HANG_DA_VE_KHO_TQ)"
            style="cursor: pointer"
            class="hangdave_tq"
          >
            Hàng đã về kho TQ : <span>({{ stats.hang_DA_VE_KHO_TQ }})</span>
          </a>
        </li>
        <li>
          <a
            @click="filterByStatus(CONSTANT.ORDER_STATUS.HANG_DA_VE_KHO_VN)"
            style="cursor: pointer"
            class="hangdave"
          >
            Hàng đã về kho VN : <span>({{ stats.hang_DA_VE_KHO_VN }})</span>
          </a>
        </li>
        <li>
          <a
            @click="filterByStatus(CONSTANT.ORDER_STATUS.SAN_SANG_GIAO_HANG)"
            style="cursor: pointer"
            class="ssgiao"
          >
            Sẵn sàng giao hàng : <span>({{ stats.san_SANG_GIAO_HANG }})</span>
          </a>
        </li>
        <li>
          <a
            @click="filterByStatus(CONSTANT.ORDER_STATUS.DA_GIAO)"
            style="cursor: pointer"
            class="orange"
          >
            Đã giao : <span>({{ stats.da_GIAO }})</span>
          </a>
        </li>
        <li>
          <a
            @click="filterByStatus(CONSTANT.ORDER_STATUS.CHO_XU_LY_KHIEU_NAI)"
            style="cursor: pointer"
            class="damuahang"
          >
            Chờ xử lý khiếu nại : <span>({{ stats.cho_XU_LY_KHIEU_NAI }})</span>
          </a>
        </li>
        <li>
          <a
            @click="filterByStatus(CONSTANT.ORDER_STATUS.DA_KET_THUC)"
            style="cursor: pointer"
            class="black"
          >
            Đã kết thúc : <span>({{ stats.da_KET_THUC }})</span>
          </a>
        </li>
        <li>
          <a
            @click="filterByStatus(CONSTANT.ORDER_STATUS.DA_HUY)"
            style="cursor: pointer"
            class="red"
          >
            Đã hủy : <span>({{ stats.da_HUY }})</span>
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

        Mã KH:
        <input
          v-model="filter.customerId"
          type="text"
          value=""
          name="filter_cid"
        />

        Username:
        <input
          v-model="filter.userName"
          type="text"
          value=""
          name="filter_username"
        />

        Họ Tên:
        <input
          v-model="filter.fullName"
          type="text"
          value=""
          name="filter_fullname"
        />

        Phone:
        <input
          v-model="filter.phone"
          type="text"
          value=""
          name="filter_phone"
        />

        Email:
        <input
          v-model="filter.email"
          type="text"
          value=""
          name="filter_email"
        />

        <!-- Trạng thái:
        <select v-model="filter.status">
          <option
            v-for="(value, key) in CONSTANT.ORDER_STATUS"
            :key="key"
            :value="value"
          >
            {{ CommonUtils.promptOrderStatusNameByValueAdmin(value) }}
          </option>
        </select> -->
        &nbsp;
        <input
          class="button"
          type="submit"
          @click="filterBy"
          value="Tìm kiếm"
        />
      </form>
    </div>
    <div class="gridtable">
      <table>
        <tbody>
        <b-modal id="naptien" hide-header-close title-html="Nạp tiền vào ví khách hàng">
          <div style="font-size: 1rem">
            <span class="green">Mã giao dịch: </span><span class="bold">{{ naptien.id }}</span>

            <span style="float: right">
                                  <span class="black">Loại giao dịch: &nbsp;</span>
                                  <select v-model="naptien.tranType" @click="validateFormNapTien">
                                    <option value="1">Nạp tiền</option>
                                    <option value="3">Tất toán</option>
                                    <option value="4">Hoàn tiền</option>
                                    <option value="6">Thanh toán vận đơn</option>
                                  </select>
                                </span>
            <div v-if="errors.tranType" class="bubble-message" style="float: right">{{ errors.tranType }}</div>
            <br/>
            <br/>
            <div>
              <span class="red">Số tiền: &nbsp;</span>
              <input v-model="naptien.amount" placeholder="0" size="20" type="number"
                     @input="formatInputNap"/>&nbsp;&nbsp;VNĐ
            </div>
            <span id="numFormatResult" class="red" style="margin-left: 4rem">{{ naptien.amountText }}</span> <b>VNĐ</b>
            <div v-if="errors.amount" class="bubble-message">{{ errors.amount }}</div>
            <br/>
            <br/>
            <div class="form-group">
              <label class="bold control-label col-sm-2" for="comment">Ghi chú: </label>
              <textarea v-model="naptien.description" class="inputAccount form-control"
                        name="payment_note" rows="5"></textarea>
            </div>
          </div>
          <template #modal-footer>
            <b-button class="button" squared
                      variant="outline-primary" @click="submitNapTien">
              Xác nhận
            </b-button>
            &nbsp;
            <b-button class="button" squared
                      variant="outline-danger" @click="hideModal(`naptien`)">
              Đóng
            </b-button>
          </template>
        </b-modal>
        <b-modal id="ruttien" hide-header-close title-html="Tạo GD rút tiền">
          <div style="font-size: 1rem">
            <span class="green">Mã giao dịch: </span><span class="bold">{{ ruttien.id }}</span>

            <span style="float: right">
                                <span class="black">Loại giao dịch: &nbsp;</span>
                                <select v-model="ruttien.tranType" @click="validateFormRutTien">
                                  <option value="0">Rút tiền</option>
                                  <option value="3">Tất toán</option>
                                  <option value="4">Hoàn tiền</option>
                                  <option value="6">Thanh toán vận đơn</option>
                                </select>
                                </span>
            <div v-if="errors.tranType" class="bubble-message" style="float: right">{{ errors.tranType }}</div>
            <br/>
            <br/>
            <div>
              <span class="red">Số tiền: &nbsp;</span>
              <input v-model="ruttien.amount" placeholder="0" size="20" type="number"
                     @input="formatInputRut"/>
            </div>
            <span id="numFormatResult" class="red" style="margin-left: 4rem">{{ ruttien.amountText }}</span> <b>VNĐ</b>
            <div v-if="errors.amount" class="bubble-message">{{ errors.amount }}</div>
            <br/>
            <br/>
            <div class="form-group">
              <label class="bold control-label col-sm-2" for="comment">Ghi chú: </label>
              <textarea v-model="naptien.description" class="inputAccount form-control"
                        name="payment_note" rows="5"></textarea>
            </div>
          </div>
          <template #modal-footer>
            <b-button class="button" squared
                      variant="outline-primary" @click="submitRutTien">
              Xác nhận
            </b-button>
            &nbsp;
            <b-button class="button" squared
                      variant="outline-danger" @click="hideModal(`ruttien`)">
              Đóng
            </b-button>
          </template>
        </b-modal>
          <tr>
            <td width="5%">STT</td>
            <td width="10%">Mã hóa đơn/Ngày mua hàng</td>
            <td width="10%">Tên khách</td>
            <td style="min-width: 150px">Thông tin liên hệ</td>
            <td width="10%">Nhận hàng tại kho</td>
            <td width="15%">Thông tin sản phẩm</td>
            <td width="10%">Đã thanh toán</td>
            <td width="10%">Trạng thái</td>
            <td style="width: 170px">Thao tác</td>
          </tr>
          <tr v-for="(order, index) in orderList">
            <td class="align-center">{{ index + 1 }}</td>
            <td>
              <span class="uppercase">
                <a
                  class="blue"
                  style="cursor: pointer; color: #0000ff"
                  @click="viewDetail(order.orderChina.id)"
                >
                  {{ order.orderChina.orderCode }}
                </a>
              </span>
              <p>
                <b>{{ CommonUtils.formatDate(order.orderChina.createDate) }}</b>
              </p>
            </td>
            <td>
              <p>{{ order.customerInfo ? order.customerInfo.username : "" }}</p>
              <p>
                <a>
                  <span class="blue">
                    {{ order.customerInfo ? order.customerInfo.fullName : "" }}
                  </span>
                </a>
              </p>
              <p>Số dư: {{ CommonUtils.formatNumber(order?.customerInfo?.customerDTO?.availableBalance) }}</p>
              <a v-if="CommonUtils.getRole() === CONSTANT.ROLE.ADMIN" class="button-link special-orange"
                 @click="openModal('naptien', order.customerInfo.id)">Nạp tiền vào ví >></a>
              &nbsp;
              <a v-if="CommonUtils.getRole() === CONSTANT.ROLE.ADMIN" class="button-link special-blue"
                 @click="openModal('ruttien', order.customerInfo.id)">Tạo GD rút tiền >></a>
              &nbsp;
            </td>
            <td>
              <span>
                <p>
                  <b>SĐT:</b>
                  {{ order.customerInfo ? order.customerInfo.phone : "" }}
                </p>
                <p>
                  <b>Địa chỉ:</b>
                  {{ order.customerInfo ? order.customerInfo.address : "" }}
                </p>
              </span>
            </td>
            <td>
              <span class="bold green">{{
                promptNameByInventoryId(
                  order.address ? order.address.inventoryId : "",
                )
              }}</span>
              <p>
                {{
                  promptLocationByInventoryId(
                    order.address ? order.address.inventoryId : "",
                  )
                }}
              </p>
            </td>
            <td>
              <div>
                Tổng số SP:
                <span class="red">{{ order.orderChina.totalProduct }}</span>
              </div>
              <div>
                Tổng tiền:
                <span class="red">
                  {{
                    CommonUtils.formatNumberFloat(
                      order.orderChina.totalItemMoneyNDT,
                    )
                  }}
                  (<span class="green">{{
                    CommonUtils.formatNumber(order.orderChina.totalItemMoney)
                  }}</span>
                  <span class="small">đ</span>)
                </span>
              </div>
            </td>
            <td>
              <span class="red" v-if="order.orderChina.status !== CONSTANT.ORDER_STATUS.DA_DUYET">{{
                CommonUtils.formatNumber(order.orderChina.paid)
              }}</span>
              <span class="red" v-else>0</span>
              VNĐ
            </td>
            <td>
              <span
                :class="promptClassByStatusValue(order.orderChina.status)"
                >{{
                  CommonUtils.promptOrderStatusNameByValueAdmin(
                    order.orderChina.status,
                  )
                }}</span
              >
            </td>
            <td>
              <span>
                <span v-if="order.orderChina.userOfPurchase != null">
                  <span class="green"
                    >MH: {{ order?.orderChina?.userOfPurchase }}</span
                  >
                  <br />
                  <span class="blue"
                    >Ngày MH:
                    {{
                      CommonUtils.formatDate(order?.orderChina?.dateOfPurchase)
                    }}</span
                  >
                  <br />
                  <span v-if="order?.orderChina?.status >= CONSTANT.ORDER_STATUS.HANG_DA_VE_KHO_VN && order?.orderChina?.status < CONSTANT.ORDER_STATUS.DA_KET_THUC" class="black"
                    >Số tiền tất toán:
                    <span class="green">{{
                      order?.orderChina?.status != 1
                      ? CommonUtils.formatNumber(
                      order.orderChina.notPaid,
                      )
                      : CommonUtils.formatNumber(
                      order.orderChina.totalAmount,
                      )
                      }}</span>
                    đ<br />
                    </span
                  >
                </span>
                <span
                  v-if="
                    order.orderChina.status >=
                      CONSTANT.ORDER_STATUS.DA_DUYET &&
                    order.orderChina.status <
                      CONSTANT.ORDER_STATUS.CHO_XU_LY_KHIEU_NAI
                  "
                >
                  <a
                    class="button-link"
                    @click="handleAction(order.orderChina)"
                    >{{
                      CommonUtils.promptOrderStatusNameByValueAdmin(
                        CommonUtils.getNextStateOfOrder(
                          order.orderChina.status,
                        ),
                      )
                    }}</a
                  >
                  <br>
                  <a
                    v-if="order.orderChina.status == CONSTANT.ORDER_STATUS.DA_DUYET || order.orderChina.status == CONSTANT.ORDER_STATUS.DA_KET_THUC"
                    class="button-link red"
                    @click="handleAction(order.orderChina, true)"
                  >
                    Đã huỷ
                  </a>
                </span>
              </span>
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
  name: "StaffOrderSection",
  data() {
    return {
      orderList: [],

      commonStore: useCommonStore(),

      filter: {
        orderCode: "",
        customerId: null,
        userName: "",
        fullName: "",
        phone: "",
        email: "",
        status: null,
        pageIndex: 1,
        pageSize: CONSTANT.DEFAULT_PAGESIZE,
      },

      totalPage: new Set(),
      totalRecord: 0,

      stats: {},
      accId: '',
      naptien: {},
      ruttien: {},
      errors: {},
    };
  },
  mounted() {
    this.getListOrders();
    this.adminCountStats();
  },
  methods: {
    resetForm() {
      this.naptien.amount = '';
      this.naptien.description = '';
      this.naptien.tranType = '';
      this.ruttien.amount = '';
      this.ruttien.description = '';
      this.ruttien.tranType = '';

    },
    formatInputRut() {

      let unformattedNumberRut = this.ruttien.amount.toString().replace(/,/g, '');

      // Format the number with commas
      this.ruttien.amountText = unformattedNumberRut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.validateFormRutTien();
    },
    formatInputNap() {
      let unformattedNumberNap = this.naptien.amount.toString().replace(/,/g, '');

      // Format the number with commas
      this.naptien.amountText = unformattedNumberNap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.validateFormNapTien();
    },
    validateFormNapTien() {
      this.errors = {};

      if (!this.naptien.amount) {
        this.errors.amount = 'Số tiền bắt buộc nhập.';
        return false;
      }
      if (!this.naptien.tranType) {
        this.errors.tranType = 'Chưa chọn Loại giao dịch.';
        return false;
      }
      return true;

    },
    async submitNapTien() {
      if (!this.validateFormNapTien()) return;
      let loader = this.$loading.show();
      const payload = {
        amount: this.naptien.amount,
        type: 1, //1: NAP TIEN - 0: RUT TIEN
        tranType: this.naptien.tranType,
        description: this.naptien.description,
        accId: this.accId, // id account khachs
      }
      let res = await ApiCaller.post(ROUTES.BankAccount.adminTopup, payload);
      loader.hide()
      if (res.status === 200) {
        this.naptien.id = res.data.id;
        this.$toast.success(`Nạp thành công ${CommonUtils.formatNumber(res.data.amount + '')} VNĐ vào tài khoản khách hàng.`, {
          title: 'Thông báo',
          position: 'top-right',
          autoHideDelay: 7000,
        })
        this.resetForm();
        const userInfo = await ApiCaller.get(ROUTES.User.infoOf(this.accId));
        this.orderList.forEach( order => {
          order.customerInfo.customerDTO.availableBalance = userInfo.data.customerDTO.availableBalance;
        })
      } else {
        this.$toast.error(`${res.data.message}`, {
          title: 'Thông báo',
          position: 'top-right',
          autoHideDelay: 7000,
        })
      }
    },
    validateFormRutTien() {
      this.errors = {};

      if (!this.ruttien.amount) {
        this.errors.amount = 'Số tiền bắt buộc nhập.';
        return false;
      }

      if (!this.ruttien.tranType) {
        this.errors.tranType = 'Chưa chọn Loại giao dịch.';
        return false;
      }
      return true;

    },
    async submitRutTien(accId) {
      if (!this.validateFormRutTien()) return;
      let loader = this.$loading.show();
      const payload = {
        amount: this.ruttien.amount,
        type: 0, //1: NAP TIEN - 0: RUT TIEN
        tranType: this.ruttien.tranType,
        description: this.ruttien.description,
        accId: this.customerInfo.id, // id account khachs
      }
      const res = await ApiCaller.post(ROUTES.BankAccount.adminTopup, payload);
      loader.hide()
      if (res.status === 200) {
        this.ruttien.id = res.data.id;
        this.$toast.success(`Rút thành công ${CommonUtils.formatNumber(res.data.amount + '')} VNĐ từ tài khoản khách hàng.`, {
          title: 'Thông báo',
          position: 'top-right',
          autoHideDelay: 7000,
        })
        this.resetForm();
        const userInfo = await ApiCaller.get(ROUTES.User.infoOf(this.accId));
        this.orderList.forEach( order => {
          order.customerInfo.customerDTO.availableBalance = userInfo.data.customerDTO.availableBalance;
        })
      } else {
        this.$toast.error(`${res.data.message}`, {
          title: 'Thông báo',
          position: 'top-right',
          autoHideDelay: 7000,
        })
      }
    },
    async getListOrders() {
      let loader = this.$loading.show();
      const res = await ApiCaller.get(
        ROUTES.Order.adminSearchOrder,
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
        customerId: null,
        userName: "",
        fullName: "",
        phone: "",
        email: "",
        status: status,
        pageIndex: 1,
        pageSize: CONSTANT.DEFAULT_PAGESIZE,
      };
      let loader = this.$loading.show();
      const res = await ApiCaller.get(
        ROUTES.Order.adminSearchOrder,
        this.filter,
      );
      await this.adminCountStats();
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
        ROUTES.Order.adminSearchOrder,
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
    async handleAction(order, isCancel = false) {
      const payload = {
        id: order.id,
        status: isCancel ? CONSTANT.ORDER_STATUS.DA_HUY : CommonUtils.getNextStateOfOrder(order.status),
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
    openModal(modal, accId) {
      this.$bvModal.show(modal);
      this.accId = accId;
      this.naptien = {};
      this.ruttien = {};
      this.errors = {};
    },
    hideModal(id) {
      this.$bvModal.hide(id);
      this.otherFeeRes = {};
      this.otherFee = {
        amount: null,
        note: "",
      };
      this.accId = '';
    },
  },
};
</script>

<!-- style custom -->
<style scoped>
.bubble-message {
  position: relative;
  color: #f44336;
  font-weight: bold;
  padding: 0.5rem 0rem;
}
</style>
