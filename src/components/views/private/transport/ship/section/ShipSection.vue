<script setup>
import CONSTANT from '../../../../../../constants/constants';
import ROUTES from '../../../../../../constants/routeDefine';
import ApiCaller from '../../../../../utils/ApiCaller';
import CommonUtils from '../../../../../utils/CommonUtils';


</script>

<!-- template section -->
<template>
    <div id="content">
        <div class="container">
            <main class="main" role="main">
                <div class="row main-row">
                    <div class="col-sm-12">
                        <div class="cart-by-page">
                            <div class="titles">
                                <h2 class="page-title">
                                    Danh sách kiện hàng
                                </h2>
                            </div>
                            <div class="filter">
                                <form @submit.prevent="handleSubmit" class="form-horizontal" method="get">
                                    Mã đơn hàng : <input v-on:keyup.enter="filterBy" v-model="filter.orderCode"
                                        class="custom_input" type="text" name="filter_invoiceid" value="">
                                    Mã vận đơn : <input v-on:keyup.enter="filterBy" v-model="filter.shipCode"
                                        class="custom_input" type="text" name="filter_shipid" value="">
                                    Trạng thái:
                                    <select name="filter_cur_status" class="custom_input" v-on:keyup.enter="filterBy"
                                        v-model="filter.status">
                                        <option value="">Tất cả</option>
                                        <option v-for="(value, key) in CONSTANT.PACKAGE_STATUS" :key="key"
                                            :value="value">
                                            {{ CommonUtils.promptPackageStatusNameByValue(value) }}
                                        </option>
                                    </select>
                                    <div class="space10"></div>
                                    Từ ngày : <input class="pickdate_from custom_input hasDatepicker" type="date"
                                        v-on:keyup.enter="filterBy" id="datepicker_from" v-model="filter.fromDate"
                                        name="filter_startdate_created_date" value="">
                                    Đến ngày : <input class="pickdate_to custom_input hasDatepicker" type="date"
                                        v-on:keyup.enter="filterBy" id="datepicker_to" v-model="filter.toDate"
                                        name="filter_enddate_created_date" value="">

                                    <input class="button custom_flat_button" @click="filterBy" type="submit"
                                        value="Lọc">
                                </form>
                                <div class="space10"></div>
                            </div>
                            <div class="cu-table-responsive">
                                <table class="cu-table tbl-cart tbl-history">
                                    <tbody>
                                        <tr class="header-cart-table">
                                            <td style="width: 4%" class="text-center">#</td>
                                            <td class="text-center" width="10%">Mã kiện</td>
                                            <td width="15%" class="text-center">Khách hàng</td>
                                            <td width="7%" class="text-center">Mã đơn</td>
                                            <td class="text-center">Vận đơn TQ</td>
                                            <td width="7%" class="text-center">Cân nặng</td>
                                            <td width="7%" class="text-center">Thể tích</td>
                                            <td width="7%" class="text-center">Số Lượng</td>
                                            <td class="text-center">Trạng thái</td>
                                            <td style="width: 100px" class="text-center">
                                                Lịch sử
                                            </td>
                                        </tr>
                                        <tr v-for="(pkg, index) in packages">
                                            <td class="align-center">{{ index + 1 }}</td>

                                            <td class="align-center">
                                                <p class="black">
                                                    <a target="_blank" style="color: #0000ff"
                                                        @click="viewDetail(pkg.orderId)">{{
                                                            pkg.packageCode
                                                        }}</a>
                                                </p>
                                            </td>
                                            <td class="text-center">
                                                <a @click="filterByName" style="cursor: pointer; color: red;">{{
                                                    pkg.account ? pkg.account.username
                                                        : '' }}</a>
                                            </td>
                                            <td>
                                                <a class="blue" @click="viewDetail(pkg.orderId)"
                                                    style="cursor: pointer; color: #0000ff;">{{
                                                        pkg.orderCode }}</a>
                                            </td>
                                            <td>
                                                <a style="cursor: pointer; color: green;">{{
                                                    pkg.shipCode }}</a>
                                            </td>

                                            <td class="align-center big">{{ pkg.weigh ? pkg.weigh + " kg" : '-' }}</td>
                                            <td class="align-center big">{{ pkg.volume ? pkg.volume + " khối" : '-' }}</td>
                                            <td class="align-center big">{{ pkg.quantity ? pkg.quantity : '-' }}</td>
                                            <td class="align-center big">
                                                <span
                                                    :class="CommonUtils.promptPackageStatusClassByValue(pkg.status)">{{
                                                        CommonUtils.promptPackageStatusNameByValue(pkg.status) }}</span>
                                            </td>
                                            <td class="text-center">
                                                <a class="custom-link hasTooltip tooltipstered">Chi tiết
                                                    <fa :id="'info-' + pkg.id" icon="question-circle"></fa>
                                                </a>
                                                <b-tooltip style="min-width: 300px;" placement="left"
                                                    variant="light" :target="'info-' + pkg.id" triggers="hover">
                                                    <table style="font-weight: 600;">
                                                        <tbody>
                                                            <tr>
                                                                <td>NB phát hàng</td>
                                                                <td class="right">
                                                                    <strong>{{
                                                                        CommonUtils.formatDate(pkg.createDate)
                                                                        }}</strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Nhập kho TQ</td>
                                                                <td class="right">
                                                                    <strong>{{ pkg?.userChinaWarehousingDate }} - {{
                                                                        CommonUtils.formatDate(pkg.chinaWarehousingDate)
                                                                        }}</strong>
                                                                </td>
                                                            </tr>
                                                            <!-- <tr>
                                                                <td>Gửi bao từ TQ</td>
                                                                <td class="right">
                                                                    <strong>{{ pkg?.userSendBagChinaDate }} - {{
                                                                        CommonUtils.formatDate(pkg.sendBagChinaDate)
                                                                        }}</strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Nhận bao tại VN</td>
                                                                <td class="right">
                                                                    <strong>{{ pkg?.userGetBagVietNamDate }} - {{
                                                                        CommonUtils.formatDate(pkg.getBagVietNamDate)
                                                                        }}</strong>
                                                                </td>
                                                            </tr> -->
                                                            <tr>
                                                                <td>Nhập kho VN</td>
                                                                <td class="right">
                                                                    <strong>{{ pkg?.userVnWarehousingDate }} - {{
                                                                        CommonUtils.formatDate(pkg.vnWarehousingDate)
                                                                        }}</strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Đã kiểm</td>
                                                                <td class="right">
                                                                    <strong>{{ pkg?.userChecked }} - {{
                                                                        CommonUtils.formatDate(pkg.checkedDate)
                                                                        }}</strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Giao hàng</td>
                                                                <td class="right">
                                                                    <strong>{{ pkg?.userSendPackageDate }} - {{
                                                                        CommonUtils.formatDate(pkg.sendPackageDate)
                                                                        }}</strong>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </b-tooltip>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="pag">
                            </div>
                            <ul class="pagination">
                                <li @click="handlePage(page)" v-for="(page, index) in totalPage"
                                    :class="{ active: filter.pageIndex == page }">
                                    <a>{{ page
                                        }}</a>
                                </li>
                                <li>
                                    <a @click="handleNext" data-ci-pagination-page="2" rel="next">Trang sau »</a>
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
            </main>
        </div>
    </div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'ShipSection',
    data() {
        return {
            packages: [],

            filter: {
                fromDate: "",
                toDate: "",
                shipCode: "",
                orderCode: "",
                baoHang: "",
                userName: "",
                status: "",
                tuVan: "",
                pageIndex: 1,
                pageSize: CONSTANT.DEFAULT_PAGESIZE,
            },

            totalPage: new Set(),
            totalRecord: 0,
        };
    },
    mounted() {
        this.getListPackage();
    },
    methods: {
        async getListPackage() {
            const loader = this.$loading.show();
            const res = await ApiCaller.get(
                ROUTES.Package.findByOption,
                this.filter
            );
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                return;
            }
            this.packages = res.data.data;
            this.totalPage = new Set();
            this.totalRecord = res.data.totalRecord;
            if (this.filter.pageIndex > res.data.totalPage) {
                this.filter.pageIndex = 1;
            }
            for (let i = 1; i <= res.data.totalPage; i++) {
                this.totalPage.add(i);
            }
        },
        viewDetail(id) {
            window.open(this.$router.resolve({ name: 'OrderDetailPage', params: { orderId: id } }).href, '_blank');
        },
        async filterBy() {
            const loader = this.$loading.show();
            if (this.toDate != '')
                this.filter.toDate = CommonUtils.getNextDate(this.filter.toDate);
            const res = await ApiCaller.get(ROUTES.Package.findByOption, this.filter);
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                return;
            }
            this.packages = res.data.data;
            this.totalPage = new Set();
            this.totalRecord = res.data.totalRecord;
            if (this.filter.pageIndex > res.data.totalPage) {
                this.filter.pageIndex = 1;
            }
            for (let i = 1; i <= res.data.totalPage; i++) {
                this.totalPage.add(i);
            }
        },
        async filterByName(event) {
            const name = event.target.innerHTML;
            this.filter.userName = name;
            const loader = this.$loading.show();
            if (this.toDate != '')
                this.filter.toDate = CommonUtils.getNextDate(this.filter.toDate);
            const res = await ApiCaller.get(ROUTES.Package.findByOption, this.filter);
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                return;
            }
            this.packages = res.data.data;
        },
        handlePage(page) {
            this.filter.pageIndex = page;
            this.getListPackage();
        },
        handleNext() {
            if (this.filter.pageIndex < this.totalPage.size)
                this.filter.pageIndex++;
            else {
                this.filter.pageIndex = this.totalPage.size
            }
            this.getListPackage();
        },
        handleLast() {
            this.filter.pageIndex = this.totalPage.size;
            this.getListPackage();
        },
    }
}
</script>

<!-- style custom -->
<style scoped>
@import '../../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../../assets/styles/private-styles.css';

.is_export {
    background: #847a73;
    font-size: 13px;
    padding: 7px;
    color: #fff;
}

.is_check {
    background: #f07f24;
    font-size: 13px;
    padding: 7px;
    color: #fff;
}

.is_import_vn {
    background: #008000;
    font-size: 13px;
    padding: 7px;
    color: #fff;
}

.is_import_cn {
    background: #800000;
    font-size: 13px;
    padding: 7px;
    color: #fff;
}

.is_delivered {
    background: #07ddff;
    font-size: 13px;
    padding: 7px;
    color: #fff;
}

.ssgiao {
    color: #ff7800;
}

.tr_ssgiao {
    background: #9dff9d !important;
}

.tr_chott {
    background: yellow !important;
}

.bg_gray {
    background: #ececec !important;
}

.checkshop {
    margin-bottom: 20px;
}
</style>