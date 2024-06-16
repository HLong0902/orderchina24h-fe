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
                                        <fa class="fa-icon" icon="money-bill" style="color:#87cf82;font-size: 120px;"
                                            aria-hidden="true"></fa>
                                    </div>
                                    <div class="col-md-10">
                                        <h3>Số dư trong ví : <span class="green">{{
                                            CommonUtils.formatNumber(commonStore.user_balance) }}</span> <span
                                                class="small">VNĐ</span>
                                            - Mã nạp tiền : <span class="green big">NAP_{{ CommonUtils.genCode()
                                                }}_CK</span></h3>
                                        <div>
                                            <span class="bold small">Tổng tiền hàng đã về chờ tất toán:</span>
                                        </div>
                                        <div>
                                            <span class="bold small">Tổng tiền hàng chưa về:</span>
                                        </div>
                                        <router-link class="custom_bt" @click="collapse" to="/manage/member/deposit">
                                            <fa class="fa-icon" icon="credit-card" aria-hidden="true"></fa> Nạp tiền
                                        </router-link>
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
                                        <select v-model="filter.transactionType" name="filter_transaction_type"
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
                                                    <td width="25%">Ngày giao dịch</td>
                                                    <td width="25%">Mã giao dịch</td>
                                                    <td width="20%">Loại giao dịch</td>
                                                    <td width="25%">Nội dung</td>
                                                    <td width="20%">Phát sinh($)</td>
                                                    <td width="25%">Trước giao dịch($)</td>
                                                    <td width="25%">Sau giao dịch($)</td>
                                                </tr>
                                                <tr v-for="(transaction, index) in transactions" :key="index">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>
                                                        <span class="bold">
                                                            {{
                                                                CommonUtils.formatDate(
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
                                                            {{
                                                                promptOptionsFromValue(
                                                                    transaction.type
                                                                )
                                                            }}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            {{ transaction.description }}
                                                        </span>
                                                    </td>
                                                    <td>
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
                type: this.transactionType,
                transactionCode: this.transactionCode ? this.transactionCode.trim() : '',
                pageIndex: 1,
                pageSize: CONSTANT.DEFAULT_PAGESIZE,
            },
            totalPage: new Set(),
            totalRecord: 0,
        }
    },
    mounted() {
        this.getTransactions(this.filter);
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
                    return "Đặt cọc";
                case 3:
                    return "Tất toán";
                case 4:
                    return "Hoàn tiền";
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
    }
}
</script>

<!-- style custom -->
<style scoped>
@import '../../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../../assets/styles/private-styles.css';
</style>