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
                                        <h3>Số dư trong ví : <span class="green">{{ CommonUtils.formatNumber(commonStore.user_balance) }}</span> <span class="small">VNĐ</span>
                                            - Mã nạp tiền : <span class="green big">NAP_000001_CK</span></h3>
                                        <!-- <div class="customer_credit_owe 000001" data-id="000001">
                                            <p class="black">Tổng tiền hàng đã về chờ tất toán : <span
                                                    class="red">0</span> đ </p>
                                            <p class="black">Tổng tiền hàng chưa về : <span class="red">0</span> đ </p>
                                            <p><a class="blue" target="_blank"
                                                    href="https://giaodich.hangquangchau24h.vn/member/reportowe">Xem chi
                                                    tiết</a></p>
                                        </div> -->
                                        <span class="custom_bt active"><fa class="fa-icon" icon="file-text"
                                                aria-hidden="true"></fa> Chi tiết giao dịch</span>
                                        <a class="custom_bt"
                                            href="https://giaodich.hangquangchau24h.vn/member/deposit"><fa
                                                class="fa-icon" icon="credit-card" aria-hidden="true"></fa> Nạp tiền</a>
                                        <!--<a class="custom_bt" href="https://giaodich.hangquangchau24h.vn/member/withdrawal"><fa class="fa-icon" icon="download fa-2x" aria-hidden="true"></fa> Rút tiền</a>-->
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="tab_container">
                                <div class="tab_content">
                                    <h3>Chi tiết giao dịch</h3>
                                    <div class="space20"></div>
                                    <form @submit.prevent="handleSubmit" class="form-horizontal" method="get">
                                        Mã đơn hàng : <input v-model="transactionCode" class="custom_input" type="text" name="filter_invoiceid"
                                            value="">
                                        Từ ngày : <input v-model="fromDate" class="pickdate_from custom_input hasDatepicker" type="date"
                                            id="datepicker_from" name="filter_startdate_create_date" value="">
                                        Đến ngày : <input v-model="toDate" class="pickdate_to custom_input hasDatepicker" type="date"
                                            id="datepicker_to" name="filter_enddate_create_date" value="">
                                        <br>
                                        <div class="space10"></div>
                                        Loại giao dịch :
                                        <select v-model="transactionType" name="filter_transaction_type" class="custom_input">
                                            <option value="">Tất cả</option>
                                            <option v-for="opts in Object.values(CONSTANT.BANK_TYPE)" :value="opts">{{ promptOptionsFromValue(opts) }}</option>
                                        </select>

                                        <input class="button custom_flat_button" @click="filterPendingTopup" type="submit" value="Lọc">
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
                                                <tr v-for="(item, index) in transactions" :key="index">
                                                    <td><span class="small">{{ index + 1 }}</span></td>
                                                    <td><span class="small">{{ item.createDate }}</span></td>
                                                    <td><span class="bg_green small"> {{ item.transCode }} </span></td>
                                                    <td><span class="green">{{ item.typeName }}</span></td>
                                                    <td><span class="small">{{ item.description }}</span></td>
                                                    <td><span class="green">{{ CommonUtils.formatNumber(item.amount) }}</span></td>
                                                    <td><span class="green">{{ CommonUtils.formatNumber(item.amountBefore) }}</span></td>
                                                    <td><span class="green">{{ CommonUtils.formatNumber(item.amountAfter) }}</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p><strong>Total: <span class="green">{{ transactions.length }}</span> (Giao dịch)</strong></p>
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

            transactionCode: '',
            fromDate: '',
            toDate: '',
            transactionType: '',
        }
    },
    mounted() {
        let params = {
            toDate: CommonUtils.getNextDate(),
            fromDate: this.fromDate,
            pageIndex: 1,
            pageSize: 9999999,
        }
        this.getTransactions(params);
    },
    methods: {
        async getTransactions(params) {
            let loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.BankAccount.filterTransaction, params);
            this.transactions = res.data.data;
            loader.hide();
        },
        promptOptionsFromValue(value) {
            switch(value) {
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
            let params = {
                toDate: CommonUtils.getNextDateOf(this.toDate),
                fromDate: this.fromDate,
                type: this.transactionType,
                transactionCode: this.transactionCode.trim(),
                pageIndex: 1,
                pageSize: 9999999,
            }
            debugger
            const res = await ApiCaller.get(ROUTES.BankAccount.filterTransaction, params);
            loader.hide()
            this.transactions = res.data.data;
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