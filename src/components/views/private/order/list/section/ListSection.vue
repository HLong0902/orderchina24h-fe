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
                <h2 class="page-title">Danh sách đơn hàng</h2>
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
                  Từ ngày :
                  <input
                    v-model="filter.fromDate"
                    class="pickdate_from custom_input hasDatepicker"
                    type="date"
                    id="datepicker_from"
                    name="filter_startdate_create_date"
                    value=""
                  />
                  Đến ngày :
                  <input
                    v-model="filter.toDate"
                    class="pickdate_to custom_input hasDatepicker"
                    type="date"
                    id="datepicker_to"
                    name="filter_enddate_create_date"
                    value=""
                  />
                  <br />
                  <div class="space10"></div>
                  Kho nhận hàng :
                  <select
                    v-model="filter.inventoryId"
                    name="filter_store"
                    class="custom_input"
                  >
                    <option value="">Chọn kho</option>
                    <option
                      v-for="(item, index) in listInventories"
                      :key="index"
                      :value="item.name"
                    >
                      {{ item.name }} - {{ item.location }}
                    </option>
                  </select>
                  Trạng thái đơn hàng :
                  <select
                    v-model="filter.orderStatus"
                    name="filter_status"
                    class="custom_input"
                  >
                    <option value="">Tất cả</option>
                    <option
                      v-for="status in Object.values(CONSTANT.ORDER_STATUS)"
                      :value="status"
                    >
                      {{ promptStatusByValue(status) }}
                    </option>
                  </select>

                  <input
                    @click="filterByParams"
                    class="button custom_flat_button"
                    type="submit"
                    value="Lọc"
                  />
                </form>
                <div class="space10"></div>
              </div>
              <div>
                <div class="cu-table-responsive size_medium">
                  <div class="order_row row_header">
                    <div class="col-md-4">
                      <p>Thông tin đơn hàng</p>
                    </div>
                    <div class="col-md-4">
                      <p>Chi tiết</p>
                    </div>
                    <div class="col-md-4">
                      <p>Thanh toán</p>
                    </div>
                  </div>
                  <div
                    v-for="(order, index) in orderList"
                    class="order_row"
                    :class="index % 2 == 0 ? 'even' : 'odd'"
                  >
                    <div class="col-md-4">
                      <div>
                        <img
                          class="preview_image pull-left"
                          :src="order.orderChina.imageUrl"
                        />
                        <a
                          target="_blank"
                          :href="order.orderChina.itemLink"
                          class="blue"
                          ><strong
                            ><a
                              style="cursor: pointer"
                              @click="viewDetail(order.orderChina.id)"
                              class="big blue"
                              >{{ order.orderChina.orderCode }}</a
                            ></strong
                          ></a
                        >
                        <p
                          class="label_order_status hasTooltip tooltipstered"
                          tooltip-content="#tipOrderStatusHistory276779"
                        >
                          <strong
                            ><span
                              ><span
                                :class="
                                  promptClassByStatusValue(
                                    order.orderChina.status,
                                  )
                                "
                                >{{
                                  promptStatusByValue(order.orderChina.status)
                                }}</span
                              >
                              &nbsp;<fa
                                :id="'info-' + order.orderChina.id"
                                icon="question-circle"
                              ></fa> </span
                          ></strong>
                        </p>
                        <b-tooltip
                          style="min-width: 300px"
                          custom-class="custom-tooltip"
                          placement="top"
                          variant="secondary"
                          :target="'info-' + order.orderChina.id"
                          triggers="hover"
                        >
                          <div
                            style="
                              font-size: 14px;
                              font-weight: 400;
                              margin: 0;
                              padding: 0;
                            "
                          >
                            <table>
                              <tbody>
                                <tr>
                                  <td style="padding: 5px; text-align: left">
                                    Đã gửi đơn
                                  </td>
                                  <td style="padding: 5px; text-align: right">
                                    {{ order?.orderChina?.depositUser }} -
                                    {{
                                      order
                                        ? CommonUtils.formatDate(
                                            order.orderChina.createDate,
                                          )
                                        : "-"
                                    }}
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 5px; text-align: left">
                                    Đã đặt cọc
                                  </td>
                                  <td style="padding: 5px; text-align: right">
                                    {{ order?.orderChina?.depositUser }} -
                                    {{
                                      order
                                        ? CommonUtils.formatDate(
                                            order.orderChina.depositDate,
                                          )
                                        : "-"
                                    }}
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 5px; text-align: left">
                                    Đã mua hàng
                                  </td>
                                  <td style="padding: 5px; text-align: right">
                                    {{ order?.orderChina?.userOfPurchase }} -
                                    {{
                                      order
                                        ? CommonUtils.formatDate(
                                            order.orderChina.dateOfPurchase,
                                          )
                                        : "-"
                                    }}
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 5px; text-align: left">
                                    Hàng đã về kho TQ
                                  </td>
                                  <td style="padding: 5px; text-align: right">
                                    {{
                                      order?.orderChina?.userOfChinaInventory
                                    }}
                                    -
                                    {{
                                      order
                                        ? CommonUtils.formatDate(
                                            order.orderChina
                                              .dateOfChinaInventory,
                                          )
                                        : "-"
                                    }}
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 5px; text-align: left">
                                    Hàng đã về kho VN
                                  </td>
                                  <td style="padding: 5px; text-align: right">
                                    {{
                                      order?.orderChina?.userOfVietNamInventory
                                    }}
                                    -
                                    {{
                                      order
                                        ? CommonUtils.formatDate(
                                            order.orderChina
                                              .dateOfVietNamInventory,
                                          )
                                        : "-"
                                    }}
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 5px; text-align: left">
                                    Kết thúc
                                  </td>
                                  <td style="padding: 5px; text-align: right">
                                    {{
                                      order?.orderChina?.userUpdateDateDone
                                    }}
                                    -
                                    {{
                                      order
                                        ? CommonUtils.formatDate(
                                            order.orderChina.dateDone,
                                          )
                                        : "-"
                                    }}
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 5px; text-align: left">
                                    Hủy
                                  </td>
                                  <td style="padding: 5px; text-align: right">
                                    {{ order?.orderChina?.userDelete }} -
                                    {{
                                      order
                                        ? CommonUtils.formatDate(
                                            order.orderChina.dateDelete,
                                          )
                                        : "-"
                                    }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </b-tooltip>
                      </div>
                      <table class="cu-table borderless no_margin">
                        <tbody>
                          <tr>
                            <td>Kho hàng</td>
                            <td>
                              <span class="bold green">{{
                                promptLocationByInventoryId(
                                  order.address.inventoryId,
                                )
                              }}</span>
                              <i
                                class="textTooltip fa fa-question-circle tooltipstered"
                              ></i>
                            </td>
                          </tr>

                          <tr>
                            <td>Giá vốn</td>
                            <td>
                              <strong
                                >{{
                                  CommonUtils.formatNumber(
                                    order.orderChina.totalItemMoney,
                                  )
                                }}
                                đ
                                <i
                                  tooltip-content="#tipOrderPriceContent276779"
                                  class="hasTooltip fa fa-question-circle tooltipstered"
                                ></i
                              ></strong>
                              <div
                                id="tipOrderPriceContent276779"
                                class="tipContent hidden"
                              >
                                <div style="width: 300px">
                                  <table class="cu-table borderless">
                                    <tbody>
                                      <tr>
                                        <td>Tiền hàng</td>
                                        <td class="right">
                                          <strong
                                            ><span class="sl_buy_fee">{{
                                              CommonUtils.formatNumber(
                                                order.orderChina.totalAmount,
                                              )
                                            }}</span></strong
                                          >
                                          đ
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>VC Nội địa TQ</td>
                                        <td class="right">
                                          <strong
                                            ><span class="sl_buy_fee">{{
                                              CommonUtils.formatNumber(
                                                order.orderChina
                                                  .domesticFeesChina,
                                              )
                                            }}</span></strong
                                          >
                                          đ
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Phí mua hàng</td>
                            <td>
                              <strong
                                >{{
                                  CommonUtils.formatNumber(
                                    order?.orderChina?.purchaseFee,
                                  )
                                }}
                                đ</strong
                              >
                            </td>
                          </tr>
                          <tr>
                            <td>Phí VC nội địa TQ</td>
                            <td>
                              <strong
                                >{{ CommonUtils.formatNumber(order?.orderChina?.domesticFeesChina) }} đ</strong
                              >
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="col-md-4">
                      <table class="cu-table borderless no_margin">
                        <tbody>
                          <tr>
                            <td>
                              {{
                                order?.orderChina?.isVolume
                                  ? "Khối lượng"
                                  : "Cân nặng"
                              }}
                            </td>
                            <td>
                              <strong>
                                {{ order?.orderChina?.totalWeight }}</strong
                              >
                            </td>
                          </tr>

                          <tr>
                            <td>Phí VC QT</td>
                            <td>
                              <strong
                                >{{
                                  order?.orderChina?.internationalShippingFees
                                    ? CommonUtils.formatNumber(
                                        order?.orderChina
                                          ?.internationalShippingFees,
                                      ) 
                                    : "Chưa xác định"
                                }}
                                <i
                                  class="textTooltip fa fa-question-circle tooltipstered"
                                ></i
                              ></strong>
                            </td>
                          </tr>
                          <tr>
                            <td>Phí khác</td>
                            <td>
                              <strong
                                >{{
                                  CommonUtils.formatNumber(
                                    order?.orderChina?.otherFees,
                                  )
                                }}
                                đ
                                <i
                                  class="textTooltip fa fa-question-circle tooltipstered"
                                ></i
                              ></strong>
                            </td>
                          </tr>
                          <tr>
                            <td>Đóng thùng gỗ</td>
                            <td>
                              <strong>{{
                                order.orderChina.woodWorkingFees == null
                                  ? "-"
                                  : CommonUtils.formatNumber(
                                      order.orderChina.woodWorkingFees,
                                    )
                              }}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td>Phí kiểm đếm</td>
                            <td>
                              <strong>{{
                                order.orderChina.tallyFee == null
                                  ? "-"
                                  : CommonUtils.formatNumber(
                                      order.orderChina.tallyFee,
                                    )
                              }}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td>SL Đặt / Mua / Kiểm</td>
                            <td>
                              <strong
                                >{{
                                  order.orderChina.totalProduct
                                    ? order.orderChina.totalProduct
                                    : "-"
                                }}/{{
                                  order.orderChina.totalProduct
                                    ? order.orderChina.totalProduct
                                    : "-"
                                }}/{{
                                  order?.orderChina?.totalCheck
                                    ? order?.orderChina?.totalCheck
                                    : 0
                                }}
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="col-md-4">
                      <table class="cu-table borderless no_margin">
                        <tbody>
                          <tr>
                            <td>Tổng tiền</td>
                            <td>
                              <strong
                                ><span class="red">{{
                                  CommonUtils.formatNumber(
                                    order.orderChina.totalAmount,
                                  )
                                }}</span>
                                đ</strong
                              >
                            </td>
                          </tr>
                          <tr>
                            <td>Đã thanh toán</td>
                            <td>
                              <strong
                                ><span class="green">{{
                                  CommonUtils.formatNumber(
                                    order.orderChina.paid,
                                  )
                                }}</span>
                                đ</strong
                              >
                            </td>
                          </tr>
                          <tr>
                            <td>Cần thanh toán</td>
                            <td>
                              <strong
                                ><span class="blue big">{{
                                  CommonUtils.formatNumber(
                                    order.orderChina.notPaid,
                                  )
                                }}</span>
                                đ</strong
                              >
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2">
                              <a
                                class="btn"
                                @click="viewDetail(order.orderChina.id)"
                                >Xem chi tiết</a
                              >
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

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
  name: "ListSection",
  data() {
    return {
      listInventories: [],
      orderList: [],

      filter: {
        orderCode: "",
        fromDate: "",
        toDate: "",
        inventoryId: "",
        orderStatus: "",
        pageIndex: 1,
        pageSize: CONSTANT.DEFAULT_PAGESIZE,
      },
      totalPage: new Set(),
      totalRecord: 0,

      commonStore: useCommonStore(),
    };
  },
  mounted() {
    this.getListInventories();
    this.getList();
  },
  methods: {
    async getListInventories() {
      let loader = this.$loading.show();
      const res = await ApiCaller.get(ROUTES.Inventory.findAll);
      loader.hide();
      if (res.status != 200) {
        this.$toast.error(`${res.data.message}`, {
          title: "Thông báo",
          position: "top-right",
          autoHideDelay: 7000,
        });
        return;
      }
      this.listInventories = res.data;
    },
    getLocation() {
      return new Set(
        this.listInventories.map((warehouse) => warehouse.location),
      );
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
          return "Đã giao";
        case 8:
          return "Chờ xử lý khiếu nại";
        case 9:
          return "Đã kết thúc";
        case 0:
          return "Đã huỷ";
      }
    },
    promptClassByStatusValue(status) {
      switch (status) {
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
    async getList() {
      let loader = this.$loading.show();
      const res = await ApiCaller.get(ROUTES.Order.searchOrder, this.filter);
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
      this.orderList.forEach((order) => {
        order.orderChina.isCheck = false;
      });
      this.totalPage = new Set();
      this.totalRecord = res.data.totalRecord;
      if (this.filter.pageIndex > res.data.totalPage) {
        this.filter.pageIndex = 1;
      }
      for (let i = 1; i <= res.data.totalPage; i++) {
        this.totalPage.add(i);
      }
    },
    async filterByParams() {
      let loader = this.$loading.show();
      const res = await ApiCaller.get(ROUTES.Order.searchOrder, this.filter);
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
      this.orderList.forEach((order) => {
        order.orderChina.isCheck = false;
      });
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
      this.filterByParams();
    },
    handleNext() {
      if (this.filter.pageIndex < this.totalPage.size) this.filter.pageIndex++;
      else {
        this.filter.pageIndex = this.totalPage.size;
      }
      this.filterByParams();
    },
    handleLast() {
      this.filter.pageIndex = this.totalPage.size;
      this.filterByParams();
    },
    viewDetail(id) {
      window.open(
        this.$router.resolve({
          name: "OrderDetailPage",
          params: { orderId: id },
        }).href,
        "_blank",
      );
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

<style>
.custom-tooltip > .tooltip-inner {
  /* Removes the default max-width */
  min-width: 300px !important;
}
</style>
