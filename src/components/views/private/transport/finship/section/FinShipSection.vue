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
                    <div class="col-sm-9">
                        <div class="cart-by-page">
                            <div class="titles">
                                <h2 class="page-title">
                                    Tra cứu mã vận đơn
                                </h2>
                            </div>
                            <div rel="body" class="contentPopup" style="padding:20px;">
                                <form @submit.prevent="handleSubmit" name="findShip" action="" method="get"
                                    class="form-horizontal" enctype="multipart/form-data">
                                    <div class="input col-sm-6">
                                        <input v-on:keyup.enter="filterBy" v-model="filter.shipCode" type="text"
                                            class="form-control " value="" name="shipid"
                                            placeholder="Nhập mã vận đơn cần tra cứu" autofocus v-focus>
                                    </div>
                                    <div class="button">
                                        <input type="submit" @click="getListPackage" value="Tra cứu"
                                            class="btn bg_yellow">
                                    </div>
                                </form>
                                <div class="clearfix"></div>
                                <p class="note">Nhập mã vận đơn và nhấn tra cứu để biết tình trạng vận chuyển của gói
                                    hàng.</p>
                            </div>

                            <div v-if="packages.length != 0" class="cu-table-responsive">
                                <table class="cu-table tbl-cart tbl-history">
                                    <tbody>
                                        <tr class="header-cart-table">
                                            <td style="width: 4%" class="text-center">#</td>
                                            <td class="text-center" width="10%">Mã kiện</td>
                                            <td width="15%" class="text-center">Khách hàng</td>
                                            <td width="7%" class="text-center">Mã đơn</td>
                                            <td width="5%" class="text-center">Bao hàng</td>
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
                                            <td class="align-center big">{{ pkg.bagOrderId ? pkg.bagOrderId : '--' }}
                                            </td>
                                            <td>
                                                <a target="_blank" href="/ship/finship?shipid=773284031498508">{{
                                                    pkg.shipCode }}</a>
                                            </td>

                                            <td class="align-center big">{{ pkg.weigh ? pkg.weigh : '-' }}</td>
                                            <td class="align-center big">{{ pkg.volume ? pkg.volume : '-' }}</td>
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
                                                                    <strong>{{ CommonUtils.formatDate(pkg.createDate)
                                                                        }}</strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Nhập kho TQ</td>
                                                                <td class="right">
                                                                    <strong>{{
                                                                        CommonUtils.formatDate(pkg.chinaWarehousingDate)
                                                                    }}</strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Gửi bao từ TQ</td>
                                                                <td class="right">
                                                                    <strong>{{
                                                                        CommonUtils.formatDate(pkg.sendBagChinaDate)
                                                                    }}</strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Nhận bao tại VN</td>
                                                                <td class="right">
                                                                    <strong>{{
                                                                        CommonUtils.formatDate(pkg.getBagVietNamDate)
                                                                    }}</strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Kiểm hàng</td>
                                                                <td class="right">
                                                                    <strong>{{ CommonUtils.formatDate(pkg.checkedDate)
                                                                        }}</strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Nhập kho VN</td>
                                                                <td class="right">
                                                                    <strong>{{
                                                                        CommonUtils.formatDate(pkg.vnWarehousingDate)
                                                                    }}</strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Giao hàng</td>
                                                                <td class="right">
                                                                    <strong>{{
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
    name: 'FinShipSection',
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
    created() {

    },
    methods: {
        async getListPackage() {
            if (this.filter.shipCode == null || this.filter.shipCode == undefined || this.filter.shipCode.length == 0) {
                this.$toast.error(`Mã vận đơn bắt buộc nhập`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                return;
            }
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
    }
}
</script>

<!-- style custom -->
<style scoped>
@import '../../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../../assets/styles/private-styles.css';
</style>