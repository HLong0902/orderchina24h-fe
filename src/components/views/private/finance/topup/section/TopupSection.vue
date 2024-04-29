<!-- import section -->
<script setup>
import { Icon } from '@iconify/vue';
import ROUTES from '../../../../../../constants/routeDefine';
import ApiCaller from '../../../../../utils/ApiCaller';
import CommonUtils from '../../../../../utils/CommonUtils';
import CONSTANT from '../../../../../../constants/constants';
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
                                        <h3>Số dư trong ví : <span class="green">0</span> <span class="small">VNĐ</span></h3>
                                        <h3>Mã nạp tiền : <span class="green big">NAP_000001_CK</span></h3>
                                        <router-link class="custom_bt" to="/manage/member/wallet">
                                            <fa class="fa-icon" icon="file-text" aria-hidden="true"></fa> Chi tiết giao
                                            dịch
                                        </router-link>
                                        <a class="custom_bt active" href="#">
                                            <fa class="fa-icon" icon="credit-card" aria-hidden="true"></fa> Nạp tiền
                                        </a>
                                        <!--<a class="custom_bt" href="https://giaodich.hangquangchau24h.vn/member/withdrawal"><fa class="fa-icon" icon="download fa-2x" aria-hidden="true"></fa> Rút tiền</a>-->
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="form_deposit">
                                <h3>Nạp tiền vào ví điện tử</h3>
                                <div class="space10"></div>
                                <p class="note red">Nội dung chuyển khoản : <span class="green big">NAP_000001_CK</span>
                                    (Trong đó "21445" là mã số khách hàng của bạn, HQC xxx CK là cú pháp nạp tiền)</p>
                                <div class="space10"></div>
                                <form class="form-horizontal" method="POST">
                                    <div class="form_upload ajax_response alert dismissable"></div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-2">Số tiền đã chuyển khoản</label>
                                        <div class="col-sm-6">
                                            <input @input="formatInput" v-model="amount" placeholder="Chỉ nhập số"
                                                class="form-control" type="text" name="amount" value="" required=""
                                                id="amount">
                                            <span id="numFormatResult" class="red">{{ amount }}</span> <b>VNĐ</b>
                                            <div v-if="errors.amount" class="bubble-message">{{ errors.amount }}</div>
                                        </div>
                                    </div>
                                    <div class="form-group" id="bank">
                                        <label for="bank" class="control-label col-sm-2">Ngân hàng đã chuyển</label>
                                        <div class="col-sm-6">
                                            <select v-model="bankname" name="bank" class="form-control">
                                                <option v-for="bank in bankSupports" :value="bank">{{ bank }}</option>
                                                <!-- <option value="VP Bank">VP Bank</option>
                                                <option value="VietcomBank">VietcomBank</option>
                                                <option value="Techcombank">Techcombank</option>
                                                <option value="Agribank">Agribank</option>
                                                <option value="BIDV">BIDV</option>
                                                <option value="Viettinbank">Viettinbank</option>
                                                <option value="MBBank">MBBank</option>
                                                <option value="Bản Việt Bank">Bản Việt Bank</option>
                                                <option value="Shinhan Bank">Shinhan Bank</option>
                                                <option value="Eximbank">Eximbank</option>
                                                <option value="Á Châu Bank">Á Châu Bank</option>
                                                <option value="TPBank">TPBank</option> -->
                                            </select>
                                            <div v-if="errors.bankname" class="bubble-message">{{ errors.bankname }}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="comment" class="control-label col-sm-2">Ghi chú</label>
                                        <div class="col-sm-6">
                                            <textarea v-model="description" rows="5"
                                                placeholder="Gợi ý: Quý khách nên nhập nội dung chuyển khoản (khi chuyển khoản online hoặc nộp tiền tại Ngân Hàng) chính xác."
                                                name="payment_note" class="inputAccount form-control"></textarea>
                                        </div>
                                    </div>

                                    <div class="form-group text-center">
                                        <div class="col-sm-3 col-md-offset-2">
                                            <a target="_blank" class="btn btn-danger" @click="submit"
                                                title="Gửi giao dịch">Gửi giao dịch</a>
                                        </div>
                                    </div>


                                </form>
                            </div>
                            <hr>
                            <div class="tab_container">
                                <div class="tab_content">
                                    <h3>Danh sách nạp tiền chờ phê duyệt</h3>
                                    <div class="space20"></div>
                                    <p><strong>Tổng tiền đã duyệt : <span class="green">0</span><span class="small">
                                                đ</span></strong> -
                                        <strong>Tổng tiền chờ duyệt : <span class="green">0</span><span class="small">
                                                đ</span></strong>
                                    </p>
                                    <div class="space10"></div>
                                    <form @submit.prevent="handleSubmit" class="form-horizontal" method="get">
                                        Từ ngày : <input v-model="fromDate"
                                            class="pickdate_from custom_input hasDatepicker" type="date"
                                            id="datepicker_from" name="filter_startdate_create_date" value="">
                                        Đến ngày : <input v-model="toDate"
                                            class="pickdate_to custom_input hasDatepicker" type="date"
                                            id="datepicker_to" name="filter_enddate_create_date" value="">
                                        Trạng thái :
                                        <select v-model="filterStatus" name="filter_status" class="custom_input">
                                            <option value="">Tất cả</option>
                                            <option value="2">Đã duyệt</option>
                                            <option value="1">Chờ duyệt</option>
                                            <option value="0">Đã hủy</option>
                                        </select>
                                        <input class="button custom_flat_button" @click="filterPendingTopup"
                                            type="submit" value="Lọc">
                                    </form>
                                    <div class="space10"></div>
                                    <div class="cu-table-responsive">
                                        <table class="cu-table tbl-cart tbl-list-order">
                                            <tbody id="abc">
                                                <tr class="header-cart-table">
                                                    <td width="5%">STT</td>
                                                    <td width="15%">Ngày giao dịch</td>
                                                    <td width="15%">Mã hóa đơn</td>
                                                    <td width="25%">Số tiền nạp</td>
                                                    <td width="15%">Ngân hàng</td>
                                                    <td width="25%">Ghi chú</td>
                                                    <td width="15%">Trạng thái</td>
                                                </tr>
                                                <tr v-for="(item, index) in transactions" :key="index">
                                                    <td><span class="small">{{ index + 1 }}</span></td>
                                                    <td><span class="small">{{ item.createDate }}</span></td>
                                                    <td><span class="bg_green small"> {{ item.transCode }} </span></td>
                                                    <td><span class="green">{{ CommonUtils.formatNumber(item.amount + '') }}
                                                            VND</span></td>
                                                    <td><span class="small">{{ item.bankName }}</span></td>
                                                    <td><span class="small">{{ item.description }}</span></td>
                                                    <td>
                                                        <span class="bg_yellow small">{{ item.statusName }}</span>
                                                    </td>
                                                </tr>
                                            </tbody>

                                        </table>
                                        <p><strong>Total: <span class="green">{{ transactions.length }}</span> (Giao
                                                dịch)</strong></p>

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
    name: 'TopupSection',
    data() {
        return {
            amount: '',
            bankname: '',
            description: '',
            errors: {},
            isValidate: true,

            transactions: [],
            fromDate: '',
            toDate: '',
            filterStatus: '',

            bankSupports: [],
        }
    },
    watch: {
        amount($) {
            if (this.isValidate)
                this.validateForm();
        },
        bankname($) {
            if (this.isValidate)
                this.validateForm();
        }
    },
    computed: {
        hasErrors() {
            return Object.keys(this.errors).length > 0;
        }
    },
    mounted() {
        this.getBankList();
        this.isValidate = true;
        let params = {
            toDate: CommonUtils.getNextDate(),
            fromDate: CommonUtils.getDateBeforeDays(30),
            type: 1,
            pageIndex: 1,
            pageSize: 50,
        }
        this.getPendingTopup(params);
    },
    methods: {
        resetForm() {
            this.amount = '',
                this.bankname = '',
                this.description = '';
            this.isValidate = false;
        },
        formatInput() {
            // Remove commas from the input string
            let unformattedNumber = this.amount.replace(/,/g, '');

            // Format the number with commas
            this.amount = unformattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        formatNumber(amount) {
            // Remove commas from the input string
            let unformattedNumber = amount.replace(/,/g, '');

            // Format the number with commas
            return unformattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        validateForm() {
            this.isValidate = true;
            this.errors = {};

            if (!this.amount)
                this.errors.amount = 'Số tiền đã chuyển khoản bắt buộc nhập.';

            if (!this.bankname)
                this.errors.bankname = 'Ngân hàng đã chuyển bắt buộc nhập.';
        },
        removeCommas(amount) {
            // Remove commas from the formatted amount
            return amount.replace(/,/g, '');
        },
        async submit() {
            this.validateForm();
            if (!this.hasErrors) {
                let loader = this.$loading.show();
                const payload = {
                    amount: parseInt(this.removeCommas(this.amount)),
                    bankName: this.bankname,
                    type: 1, //1: NAP TIEN - 0: RUT TIEN
                    description: this.description
                }
                const res = await ApiCaller.post(ROUTES.BankAccount.topup, payload);
                loader.hide()
                if (res.status == 200) {
                    this.$toast.success(`Gửi giao dịch với số tiền ${this.formatNumber(res.data.amount + '')} từ ngân hàng ${res.data.bankName} thành công`, {
                        title: 'Thông báo',
                        position: 'top-right',
                        autoHideDelay: 7000,
                    })
                    this.resetForm();
                    this.filterPendingTopup();
                } else {
                    this.$toast.error(`${res.data.message}`, {
                        title: 'Thông báo',
                        position: 'top-right',
                        autoHideDelay: 7000,
                    })
                }
            }
        },
        async getPendingTopup(params) {
            let loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.BankAccount.filterTransaction, params);
            this.transactions = res.data.data;
            loader.hide();
        },
        async filterPendingTopup() {
            let loader = this.$loading.show();
            let params = {
                toDate: CommonUtils.getNextDateOf(this.toDate),
                fromDate: this.fromDate,
                type: 1,
                status: this.filterStatus.length > 0 ? this.filterStatus : null,
                pageIndex: 1,
                pageSize: 50,
            }
            const res = await ApiCaller.get(ROUTES.BankAccount.filterTransaction, params);
            loader.hide()
            this.transactions = res.data.data;
        },
        async getBankList() {
            const link = ROUTES.Information.getValueByCode(CONSTANT.BANK_SUPPORT);
            const res = await ApiCaller.post(link);
            this.bankSupports.push(...res.data.map($ => $.value))
        }
    }
}
</script>

<!-- style custom -->
<style scoped>
@import '../../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../../assets/styles/private-styles.css';

.fa-icon {
    font-size: 20px;
    padding: 0px 5px;
}

.customer_credit_owe {
    padding-top: 10px;
}

.custom_bt {
    background: #d75e29;
    color: #fff;
    padding: 5px 10px;
    display: inline-block;
    border-radius: 3px;
    margin: 10px 14px 0px 0px;
    font-size: 14px;
}

.custom_bt.active {
    background: #87cf82;
    color: #fff !important;
}

.alert {
    padding: 5px;
    margin: 10px 0px;
    text-align: center;
}

.ajax_response {
    font-size: 11px !important;
}

#amount {
    margin-bottom: 5px;
}

.bubble-message {
    position: relative;
    color: #f44336;
    border-radius: 5px;
    font-size: 0.8rem;
    left: 0;
    margin-top: 5px;
}

.form-group .form-control {
    padding: 5px;
    border: 1px solid #ccc;
    -webkit-border-radius: 0;
    border-radius: 0;
}
</style>