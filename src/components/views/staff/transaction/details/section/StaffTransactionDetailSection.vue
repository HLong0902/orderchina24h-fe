<script setup>
import CONSTANT from '../../../../../../constants/constants';
import ROUTES from '../../../../../../constants/routeDefine';
import ApiCaller from '../../../../../utils/ApiCaller';
import CommonUtils from '../../../../../utils/CommonUtils';
</script>

<!-- template section -->
<template>
    <div id="content" class="clearfix fullwidth">
        <h2 class="title">Danh sách giao dịch</h2>
        <div class="list_status clearfix">
            <ul>
                <li>
                    <a @click="filterByStatus(null)" style="cursor: pointer; color: black;" class="black">
                        Tòan bộ : <span>({{ transactions.length }})</span>
                    </a>
                </li>
                <li>
                    <a @click="filterByStatus(1)" style="cursor: pointer; color: orange;" class="blue">
                        Nạp tiền : <span>({{ transactions.filter($ => $.type == 1).length }})</span>
                    </a>
                </li>
                <li>
                    <a @click="filterByStatus(0)" style="cursor: pointer; color: green;" class="green">
                        Rút tiền : <span>({{ transactions.filter($ => $.type == 0).length }})</span>
                    </a>
                </li>
                <li>
                    <a @click="filterByStatus(2)" style="cursor: pointer; color: red;" class="dathanhtoan">
                        Đặt cọc : <span>({{ transactions.filter($ => $.type == 2).length }})</span>
                    </a>
                </li>
                <li>
                    <a @click="filterByStatus(3)" style="cursor: pointer; color: black;" class="black">
                        Tất toán : <span>({{ transactions.filter($ => $.type == 3).length }})</span>
                    </a>
                </li>
                <li>
                    <a @click="filterByStatus(4)" style="cursor: pointer; color: orange;" class="blue">
                        Hoàn tiền : <span>({{ transactions.filter($ => $.type == 4).length }})</span>
                    </a>
                </li>
                <li>
                    <a @click="filterByStatus(5)" style="cursor: pointer; color: green;" class="green">
                        Thanh toán đơn hàng : <span>({{ transactions.filter($ => $.type == 5).length }})</span>
                    </a>
                </li>
                <li>
                    <a @click="filterByStatus(6)" style="cursor: pointer; color: red;" class="dathanhtoan">
                        Thanh toán vận đơn : <span>({{ transactions.filter($ => $.type == 6).length }})</span>
                    </a>
                </li>

            </ul>
        </div>
        <div class="filer_box">
            <form @submit.prevent="handleSubmit" method="GET">
                Từ ngày:<input v-model="filter.fromDate" type="date" value="" name="filter_id" />
                Đến ngày:<input v-model="filter.toDate" type="date" value="" name="filter_username" />
                <!-- Loại giao dịch: -->
                <!-- <select v-model="filter.type" name="filter_status"> -->
                <!--     <option :value="[0, 1]" selected="">Tất cả</option> -->
                <!--     <option :value="[1]">Nạp tiền</option> -->
                <!--     <option :value="[0]">Rút tiền</option> -->
                <!-- </select> -->
                <!-- Trạng thái: -->
                <!-- <select v-model="filter.status" name="filter_status"> -->
                <!--     <option :value="[0, 1, 2]" selected="">Tất cả</option> -->
                <!--     <option :value="[1]">Chưa duyệt</option> -->
                <!--     <option :value="[2]">Đã duyệt</option> -->
                <!--     <option :value="[0]">Từ chối</option> -->
                <!-- </select> -->
                &nbsp;
                <input @click="getTransactions" class="button" type="submit" value="Tìm kiếm" />
            </form>
        </div>
        <div class="gridtable">
            <table class="cu-table tbl-cart tbl-list-order">
                <tbody id="abc">
                    <tr class="header-cart-table">
                        <td width="5%">STT</td>
                        <td width="10%">Ngày giao dịch</td>
                        <td width="10%">Mã giao dịch</td>
                        <td width="10%">Loại giao dịch</td>
                        <td width="20%">Nội dung</td>
                        <td width="10%">Phát sinh($)</td>
                        <td width="10%">Trước giao dịch($)</td>
                        <td width="10%">Sau giao dịch($)</td>
                    </tr>
                    <tr v-for="(transaction, index) in filterTransaction" :key="index">
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
                                {{ transaction.transactionCode }}
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

       </div>
        <p>
            <strong>Total: <span class="green">{{ transactions.length }}</span> (Items)</strong>
        </p>
    </div>
</template>

<!-- function defined -->
<script>
export default {
    name: "StaffTransactionDetailSection",
    data() {
        return {
            rejectReason: null,
            transactions: [],
            filterTransaction: [],

            filter: {
                fromDate: "",
                toDate: "",
            },

            id: this.$route.params.id,

            showDismissibleAlert: false
        };
    },
    watch: {
        rejectReason($) {
            this.showDismissibleAlert = false;
        }
    },
    mounted() {
        this.getTransactions();
    },
    methods: {
        async getTransactions() {
            let loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.BankAccount.getUserTransaction(this.id), this.filter);
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                return;
            }
            this.transactions = res.data;
            this.filterTransaction = res.data;
        },
        async filterByStatus(status) {
            if(status == null) {
                this.filterTransaction = this.transactions;
            } else {
                this.filterTransaction = this.transactions.filter($ => $.type == status);
            }
        },
        promptNameFromValue(value) {
            switch (value) {
                case CONSTANT.TRANSACTION_STATUS.REJECT:
                    return "Từ chối";
                case CONSTANT.TRANSACTION_STATUS.PENDING:
                    return "Chờ duyệt";
                case CONSTANT.TRANSACTION_STATUS.APPROVE:
                    return "Đã duyệt";
            }
        },
        promptClassFromValue(value) {
            switch (value) {
                case CONSTANT.TRANSACTION_STATUS.REJECT:
                    return "red";
                case CONSTANT.TRANSACTION_STATUS.PENDING:
                    return "orange";
                case CONSTANT.TRANSACTION_STATUS.APPROVE:
                    return "green";
            }
        },
        hideModal(id) {
            this.showDismissibleAlert = false;
            this.$bvModal.hide(id);
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
                case 5:
                    return "Thanh toán đơn hàng";
                case 6: 
                    return "Thanh toán vận đơn";
            }
        },

    },
};
</script>

<!-- style custom -->
<style scoped></style>
