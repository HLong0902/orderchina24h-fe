<!-- import section -->
<script setup>
import { Icon } from '@iconify/vue';
import CommonUtils from '../../../../../utils/CommonUtils';
import ApiCaller from '../../../../../utils/ApiCaller';
import ROUTES from '../../../../../../constants/routeDefine';
import CONSTANT from '../../../../../../constants/constants';
import { useCommonStore } from '../../../../../../store/CommonStore';
</script>

<!-- template section -->
<template>
    <div id="content">
        <div class="container">
            <main class="main" role="main">
                <div class="row main-row">
                    <div class="col-sm-9">
                        <div class="content-page">
                            <div class="titles">
                                <h2 class="page-title">
                                    Quản lý ví điện tử
                                </h2>
                            </div>

                            <div class="wallet_info">
                                <div class="row">
                                    <div class="col-md-2">
                                        <fa class="fa-icon" icon="money-bill" style="color:#e39f5d;font-size: 120px;"
                                            aria-hidden="true"></fa>
                                    </div>
                                    <div class="custom-table col-md-10">
                                        <!-- <h3>Số dư trong ví : <span class="green">{{
                                            CommonUtils.formatNumber(commonStore.user_balance) }}</span> <span
                                                class="small">VNĐ</span>
                                        </h3> -->
                                        <div class="col-md-5">
                                            <h3>
                                                Mã nạp tiền : <span class="green big">NAP_{{ CommonUtils.genCode() }}_CK</span>
                                            </h3>
                                            <div>
                                                <span @click="viewListOrder('total_amount_wait_paid')" class="bold small hover">Tổng tiền hàng đã về chờ tất toán:</span>&nbsp;
                                                <span class="green">{{ CommonUtils.formatNumber(totalAmountOrder.totalAmountOrderInVietNam) }}</span> <span
                                                    class="small">VNĐ</span>
                                            </div>
                                            <div>
                                                <span  @click="viewListOrder('total_amount_product_not_arrived')" class="bold small hover">Tổng tiền hàng chưa về:</span>&nbsp;
                                                <span class="green">{{ CommonUtils.formatNumber(totalAmountOrder.totalAmountOrderNotInVietNam) }}</span> <span
                                                    class="small">VNĐ</span>
                                            </div>
                                            <router-link class="custom_bt" @click="collapse" to="/manage/member/deposit">
                                                <fa class="fa-icon" icon="credit-card" aria-hidden="true"></fa> Nạp tiền
                                            </router-link>
                                        </div>
                                        <div class="col-md-5">
                                            <table style="width: 25rem; margin: 0;">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <span class="bold">Số dư trong ví:</span>
                                                        </td>
                                                        <td>
                                                            <span class="bold">Số dư đóng băng:</span>
                                                        </td>
                                                        <td>
                                                            <span class="bold">Số dư khả dụng:</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span class="green">
                                                                {{ CommonUtils.formatNumber(commonStore.user_balance) }} vnđ
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span class="green">
                                                                0 vnđ
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span class="green">
                                                                {{CommonUtils.formatNumber(commonStore.user_balance)}} vnđ
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <!--<a class="custom_bt" href="#/member/withdrawal"><fa class="fa-icon" icon="download fa-2x" aria-hidden="true"></fa> Rút tiền</a>-->
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="tab_container">
                                <div class="tab_content">
                                    <h3>Chi tiết giao dịch</h3>
                                    <div class="space20"></div>
                                    <form @submit.prevent="handleSubmit" class="form-horizontal" method="get">
                                        Mã giao dịch : <input v-model="filter.transactionCode" class="custom_input"
                                            type="text" name="filter_invoiceid" value="">
                                        Từ ngày : <input v-model="filter.fromDate"
                                            class="pickdate_from custom_input hasDatepicker" type="date"
                                            id="datepicker_from" name="filter_startdate_create_date" value="">
                                        Đến ngày : <input v-model="filter.toDate"
                                            class="pickdate_to custom_input hasDatepicker" type="date"
                                            id="datepicker_to" name="filter_enddate_create_date" value="">
                                        <br>
                                        <div class="space10"></div>
                                        Loại giao dịch :
                                        <select v-model="filter.type" name="filter_transaction_type"
                                            class="custom_input">
                                            <option value="">Tất cả</option>
                                            <option v-for="opts in Object.values(CONSTANT.BANK_TYPE)" :value="opts">{{
                                                promptOptionsFromValue(opts) }}</option>
                                        </select>

                                        <input class="button custom_flat_button" @click="filterPendingTopup"
                                            type="submit" value="Lọc">
                                    </form>
                                    <div class="space10"></div>
                                    <div class="space10"></div>
                                    <div class="cu-table-responsive">
                                        <table class="cu-table tbl-cart tbl-list-order">
                                            <tbody id="abc">
                                                <tr class="header-cart-table">
                                                    <td width="7%">STT</td>
                                                    <td width="10%">Ngày giao dịch</td>
                                                    <td width="10%">Mã giao dịch</td>
                                                    <td width="10%">Loại giao dịch</td>
                                                    <td width="25%">Nội dung</td>
                                                    <td width="10%">Phát sinh($)</td>
                                                    <td width="10%">Trước giao dịch($)</td>
                                                    <td width="10%">Sau giao dịch($)</td>
                                                </tr>
                                                <tr v-for="(transaction, index) in transactions" :key="index">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>
                                                        <span class="bold">
                                                            {{
                                                                CommonUtils.formatDateWithDay(
                                                                    transaction.createDate
                                                                )
                                                            }}
                                                            <br>
                                                            {{
                                                                CommonUtils.formatDateWithHour(
                                                                    transaction.createDate
                                                                )
                                                            }}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span class="blue">
                                                            {{ transaction.transCode }}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span class="green">
                                                          {{ transaction.typeName }}
                                                        </span>
                                                        <br>
                                                        <span class="red" v-if="transaction.typeName">
                                                          {{ transaction.orderCode }}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            {{ transaction.description }}
                                                        </span>
                                                    </td>
                                                    <td v-if="transaction.byAdmin === null || transaction.byAdmin === ''">
                                                        <span v-if="transaction.type == 4" class="green bold">+</span>
                                                        <span v-else class="red bold">-</span>
                                                        <span
                                                            :class="{ red: transaction.type != 4, green: transaction.type == 4, bold: true }">
                                                            {{
                                                                CommonUtils.formatNumber(
                                                                    transaction.amount
                                                                )
                                                            }}
                                                        </span>
                                                        (vnđ)
                                                    </td>
                                                    <td v-if="transaction.byAdmin !== null && transaction.byAdmin !== ''">
                                                      <span v-if="transaction.byAdmin == 1" class="green bold">+</span>
                                                      <span v-else class="red bold">-</span>
                                                      <span
                                                          :class="{ red: transaction.byAdmin != 1, green: transaction.byAdmin == 1, bold: true }">
                                                              {{
                                                          CommonUtils.formatNumber(
                                                              transaction.amount
                                                          )
                                                        }}
                                                          </span>
                                                      (vnđ)
                                                    </td>
                                                    <td>
                                                        <span class="green">
                                                            {{
                                                                CommonUtils.formatNumber(
                                                                    transaction.amountBefore
                                                                )
                                                            }}
                                                        </span>
                                                        (vnđ)
                                                    </td>
                                                    <td>
                                                        <span class="red bold">
                                                            {{
                                                                CommonUtils.formatNumber(
                                                                    transaction.amountAfter
                                                                )
                                                            }}
                                                        </span>
                                                        (vnđ)
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
    name: 'TransactionSection',
    data() {
        return {
            transactions: [],

            commonStore: useCommonStore(),

            filter: {
                toDate: CommonUtils.getNextDateOf(this.toDate ? this.toDate : new Date()),
                fromDate: this.fromDate,
                status: 2,
                type: null,
                transactionCode: this.transactionCode ? this.transactionCode.trim() : '',
                pageIndex: 1,
                pageSize: CONSTANT.DEFAULT_PAGESIZE,
            },
            totalPage: new Set(),
            totalRecord: 0,

            totalAmountOrder: {},
        }
    },
    mounted() {
        this.getTransactions(this.filter);
        this.getTotalAmountOrder();
    },
    methods: {
        async getTransactions(params) {
            let loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.BankAccount.filterTransaction, params);
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                return;
            }
            this.transactions = res.data.data;
            this.totalPage = new Set();
            this.totalRecord = res.data.totalRecord;
            if (this.filter.pageIndex > res.data.totalPage) {
                this.filter.pageIndex = 1;
            }
            for (let i = 1; i <= res.data.totalPage; i++) {
                this.totalPage.add(i);
            }
        },
        promptOptionsFromValue(value) {
            switch (value) {
                case 1:
                    return "Nạp tiền";
                case 0:
                    return "Rút tiền";
                case 2:
                    return "Đơn hàng đặt cọc";
                case 3:
                    return "Đơn hàng tất toán";
                case 4:
                    return "Đơn hàng hoàn tiền";
                case 5:
                    return "Thanh toán đơn hàng";
                case 6:
                    return "Thanh toán vận đơn";
            }
        },
        async filterPendingTopup() {
            let loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.BankAccount.filterTransaction, this.filter);
            loader.hide()
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                return;
            }
            this.transactions = res.data.data;
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
            this.filterPendingTopup()
        },
        handleNext() {
            if (this.filter.pageIndex < this.totalPage.size)
                this.filter.pageIndex++;
            else {
                this.filter.pageIndex = this.totalPage.size
            }
            this.filterPendingTopup();
        },
        handleLast() {
            this.filter.pageIndex = this.totalPage.size;
            this.filterPendingTopup();
        },
        async getTotalAmountOrder() {
            const loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.Order.getTotalAmountOrder);
            loader.hide();
            this.totalAmountOrder = res.data;
        },

        viewListOrder(status){
          window.open(this.$router.resolve({ name: 'ListOrderNotPayPage', params: { status: status } }).href, '_blank');
        }
    }
}
</script>

<!-- style custom -->
<style scoped>
@import '../../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../../assets/styles/private-styles.css';

.custom-table {
    margin: 0px;
    padding: 0px;

    -moz-border-radius-bottomleft: 0px;
    -webkit-border-bottom-left-radius: 0px;
    border-bottom-left-radius: 0px;

    -moz-border-radius-bottomright: 0px;
    -webkit-border-bottom-right-radius: 0px;
    border-bottom-right-radius: 0px;

    -moz-border-radius-topright: 0px;
    -webkit-border-top-right-radius: 0px;
    border-top-right-radius: 0px;

    -moz-border-radius-topleft: 0px;
    -webkit-border-top-left-radius: 0px;
    border-top-left-radius: 0px;
}
.custom-table table {
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid black;
  font-size: 100%;
  margin: 0px 0px 10px 0px;
  padding: 0px;
}
.custom-table tr:last-child td:last-child {
  -moz-border-radius-bottomright: 0px;
  -webkit-border-bottom-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.custom-table table tr:first-child td:first-child {
  -moz-border-radius-topleft: 0px;
  -webkit-border-top-left-radius: 0px;
  border-top-left-radius: 0px;
}
.custom-table table tr:first-child td:last-child {
  -moz-border-radius-topright: 0px;
  -webkit-border-top-right-radius: 0px;
  border-top-right-radius: 0px;
}
.custom-table tr:last-child td:first-child {
  -moz-border-radius-bottomleft: 0px;
  -webkit-border-bottom-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.custom-table tr:hover td {
}
.custom-table td.specials {
  vertical-align: initial;
  padding: 0px 5px;
  background: #ffffff !important;
}
.custom-table td.specials .green {
  font-size: 16.5px;
}
.custom-table tr:nth-child(odd) {
  background-color: #e6f7f7;
}
.custom-table tr:nth-child(even) {
  background-color: #ffffff;
}
.custom-table td {
  vertical-align: middle;

  border: 1px solid #000000;
  border-width: 0px 1px 1px 0px;

  padding: 7px;

  font-weight: normal;
  color: #000000;
}
.custom-table tr:last-child td {
  border-width: 0px 1px 0px 0px;
}
.custom-table tr td:last-child {
  border-width: 0px 0px 1px 0px;
}
.custom-table tr:last-child td:last-child {
  border-width: 0px 0px 0px 0px;
}
.custom-table tr:first-child td {
  background: -o-linear-gradient(bottom, #d75e29 5%, #d75e29 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0.05, #d75e29),
    color-stop(1, #d75e29)
  );
  background: -moz-linear-gradient(center top, #d75e29 5%, #d75e29 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#d75e29", endColorstr="#d75e29");
  background: -o-linear-gradient(top, #d75e29,#d75e29);

  background-color: #d75e29;
  border: 0px solid #000000;
  text-align: center;
  border-width: 0px 0px 1px 1px;
  font-family: Arial;
  font-weight: bold;
  color: #ffffff;
}
.custom-table tr:first-child:hover td {
  background: -o-linear-gradient(bottom, #d75e29 5%, #d75e29 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0.05, #d75e29),
    color-stop(1, #d75e29)
  );
  background: -moz-linear-gradient(center top, #d75e29 5%, #d75e29 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#d75e29", endColorstr="#d75e29");
  background: -o-linear-gradient(top, #d75e29,#d75e29);

  background-color: #d75e29;
}
.custom-table tr:first-child td:first-child {
  border-width: 0px 0px 1px 0px;
}
.custom-table tr:first-child td:last-child {
  border-width: 0px 0px 1px 1px;
}
.hover:hover{
    color: #d75e29 !important;
    cursor: context-menu;
}
</style>
