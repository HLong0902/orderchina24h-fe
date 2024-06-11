<!-- import section -->
<script setup>
import { Icon } from '@iconify/vue';
import Contact from '../../contact/Contact.vue';
import ROUTES from '../../../../../../constants/routeDefine';
import ApiCaller from '../../../../../utils/ApiCaller';
import CONSTANT from '../../../../../../constants/constants';
import CommonUtils from '../../../../../utils/CommonUtils';
</script>

<!-- template section -->
<template>
    <main id="main" class="main-content home">
        <article id="post-379" class="single-post-article clearfix  post-379 page type-page status-publish hentry">
            <div class="content-default single-post-wapper">
                <div class="container">
                    <div class="row">
                        <div class="content-layout content-blog col-12">
                            <div class="inner-content-post">
                                <div class="inner-content-info">
                                    <div class="heading-title custom">
                                        <h1 class="title mt-0">Bảng Giá cập nhật ngày 07/12/2023</h1>
                                        <p>Bảng giá dịch vụ đặt hàng &amp; vận chuyển hàng của OrderChina24h
                                            Công khai rõ ràng, tuyệt đối không có giá ảo, chi phí phát sinh.
                                        </p>
                                    </div>
                                </div>
                                <div class="entry-content clearfix">
                                    <div class="wrap-bang-gia">
                                        <div class="mys-item-table">
                                            <h2>1. Chi phí một đơn hàng ký gửi</h2>
                                            <div class="table-info">
                                                <table class="mys-table">
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Giải thích</th>
                                                            <th style="text-align: center!important;">Bắt buộc</th>
                                                            <th style="text-align: center!important;">Tùy chọn</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><span data-href="phishiptq" class="ky-gui-anchor">1. Phí
                                                                    ship Trung Quốc</span></td>
                                                            <td>Phí chuyển hàng từ nhà cung cấp tới kho của
                                                                OrderChina24h tại Trung Quốc</td>
                                                            <td class="txt-center mys-text-success">
                                                                <Icon icon="bx:check-square" />
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td><span data-href="phivanchuyen" class="ky-gui-anchor">2.
                                                                    Phí vận chuyển</span></td>
                                                            <td>Phí vận chuyển từ kho Trung Quốc về kho của
                                                                OrderChina24h tại Việt Nam (Đơn vị Kg)</td>
                                                            <td class="txt-center mys-text-success">
                                                                <Icon icon="bx:check-square" />
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td><span data-href="phidonggo" class="ky-gui-anchor">3. Phí
                                                                    đóng gỗ</span></td>
                                                            <td>Hình thức đảm bảo an toàn, hạn chế rủi ro đối với hàng
                                                                dễ vỡ, dễ biến dạng</td>
                                                            <td></td>
                                                            <td class="txt-center mys-text-success">
                                                                <Icon icon="bx:check-square" />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="mys-alert mys-alert-dismissible"><i class="bx bxs-help-circle"></i>
                                            Lưu ý: Những phí thuộc hình thức
                                            (*) là phí bắt buộc, còn lại là tùy chọn, quý khách có thể chọn sử dụng hoặc
                                            không
                                        </div>

                                        <div class="mys-item-table">
                                            <h2 id="phivanchuyen">2. Phí vận chuyển từ Trung Quốc về Việt Nam với các
                                                hàng lẻ, hàng kuaidi</h2>
                                            <div class="table-info">
                                                <table class="mys-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Trọng lượng</th>
                                                            <th width="40%">Hà Nội</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item, idx) in DEPOSIT_SHIP_SINGLE">
                                                            <td>
                                                                {{ item.description }}
                                                            </td>
                                                            <td>
                                                                {{ CommonUtils.formatNumber(item.value) != 0 ?
                                                                    CommonUtils.formatNumber(item.value) : item.value
                                                                }} <sup
                                                                    v-if="CommonUtils.formatNumber(item.value) != 0">đ/kg</sup>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="mys-alert mys-alert-dismissible">
                                                <b>Lưu ý: </b>

                                                <div>
                                                    <div>Nhằm tối ưu chi phí cho khách hàng Orderchina24h sẽ không tính
                                                        khối hoặc cân quy đổi trừ những đơn hàng quá khổ không đóng được
                                                        vào bao hàng.
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                        <div class="mys-item-table">
                                            <h2 id="phidonggo">3. Phí vận chuyển Trung Quốc đối với hàng lô >150kg (
                                                cùng 1 mặt hàng) </h2>
                                            <div class="table-info">
                                                <table class="mys-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Trọng lượng</th>
                                                            <th width="40%">Hà Nội</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item, idx) in DEPOSIT_BATCH_GOODS">
                                                            <td>
                                                                {{ item.description }}
                                                            </td>
                                                            <td>
                                                                {{ CommonUtils.formatNumber(item.value) != 0 ?
                                                                    CommonUtils.formatNumber(item.value) : item.value
                                                                }} <sup
                                                                    v-if="CommonUtils.formatNumber(item.value) != 0">đ/kg</sup>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="mys-alert mys-alert-dismissible">
                                            <b>Lưu ý: </b>

                                            <div>
                                                <ul>
                                                    <li>Hàng lô là lô hàng chỉ có một mặt hàng được vận chuyển về kho
                                                        Trung tại một thời điểm với tổng cân đơn hàng > 150kg (Không áp
                                                        dụng đối với các mặt hàng khó đi như các mặt hàng nhạy cảm,
                                                        thuốc lá điện tử, fake)</li>
                                                    <li>Quý khách khi lên đơn hàng sẽ báo với nhân viên công ty trước
                                                        khi lên đơn để chúng tôi tách riêng hàng lô và hàng tạp nếu
                                                        không báo sẽ bị tính vào hàng lẻ, hàng kuaidi.</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="mys-item-table">
                                            <h2 id="phidonggo">4. Phí vận chuyển đối với hàng nặng- gọn </h2>
                                            <div class="table-info">
                                                <table class="mys-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Trọng lượng</th>
                                                            <th width="40%">Hà Nội</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item, idx) in DEPOSIT_HEAVY_GOODS">
                                                            <td>
                                                                {{ item.description }}
                                                            </td>
                                                            <td>
                                                                {{ CommonUtils.formatNumber(item.value) != 0 ?
                                                                    CommonUtils.formatNumber(item.value) : item.value
                                                                }} <sup
                                                                    v-if="CommonUtils.formatNumber(item.value) != 0">đ/kg</sup>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div class="mys-alert mys-alert-dismissible">
                                            <b>Lưu ý: </b>

                                            <div>
                                                <ul>
                                                    <li>Hàng nặng là các mặt hàng như ốc vít, đầu khóa, máy khoan, máy
                                                        bơm, tay nắm cửa.</li>
                                                    <li>Quý khách khi lên đơn hàng sẽ báo với nhân viên công ty trước
                                                        khi lên đơn để chúng tôi tách riêng hàng nặng đi riêng nếu không
                                                        sẽ tính vào hàng lẻ, hàng kuaidi.</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="mys-item-table">
                                            <h2 id="phidonggo">5. Phí vận chuyển đối với hàng cồng kềnh ( tính theo
                                                khối, không quy đổi cân nặng)</h2>
                                            <div class="table-info">
                                                <table class="mys-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Thể tích</th>
                                                            <th width="40%">Hà Nội</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item, idx) in DEPOSIT_BULK_GOODS">
                                                            <td>
                                                                {{ item.description }}
                                                            </td>
                                                            <td>
                                                                {{ CommonUtils.formatNumber(item.value) != 0 ?
                                                                    CommonUtils.formatNumber(item.value) : item.value
                                                                }} <sup
                                                                    v-if="CommonUtils.formatNumber(item.value) != 0">đ/m3</sup>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div class="mys-alert mys-alert-dismissible">
                                            <b>Lưu ý: </b>

                                            <div>
                                                Quy định đối với các hàng hóa cồng kềnh: Áp dụng đối với các mặt hàng có
                                                trọng lượng nhẹ, thể tích lớn
                                            </div>
                                        </div>

                                        <div class="mys-item-table">
                                            <h2 id="phidonggo">6. Phí đóng gỗ </h2>
                                            <div class="table-info">
                                                <table class="mys-table">
                                                    <thead>
                                                        <tr>
                                                            <th width="40%"></th>
                                                            <th v-for="(item, idx) in DEPOSIT_WOOD_FEE">
                                                                {{ item.description }}
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Phí đóng kiện hàng</td>
                                                            <td v-for="(item, idx) in DEPOSIT_WOOD_FEE">
                                                                {{ CommonUtils.formatNumber(item.value) != 0 ?
                                                                    CommonUtils.formatNumber(item.value) : item.value
                                                                }}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div style="margin: 0 auto;margin-top: 20px;clear: both;width: 100%;">
                                            <div
                                                style="margin: auto;border-radius: -4px;/* padding: 0 0 15px 0; *//* box-shadow: rgba(0, 8, 0, 1) 3px 2px 8px; */border: 2px solid #0096ff!important;margin-bottom: 25px;">
                                                <div style="background: #0096ff;">
                                                    <p
                                                        style="padding: 5px;color: #fff;text-align: center;font-size: 18px;font-weight: bold;text-transform: uppercase;margin-top: 0px;margin-bottom: 0;">
                                                        <span style="color: #ffffff;"><strong>Đăng Ký Tài
                                                                Khoản</strong></span>
                                                    </p>
                                                </div>
                                                <div
                                                    style="/* margin: 5px; */font-size: 15px;line-height: 22px;padding: 15px;color: #383838;">
                                                    <p style="text-align: justify;">Đăng kí tham gia OrderChina24h
                                                        ngay để được tư vẫn miễn phí về tìm nguồn hàng, nhập hàng từ
                                                        Trung Quốc về Việt Nam.</p>
                                                    <p style="text-align: center; margin-top: 20px;">
                                                        <router-link to="/register">
                                                            <Icon icon="bx:log-in" style="margin-right: 10;" />
                                                            ĐĂNG KÝ NGAY
                                                        </router-link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <Contact></Contact>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </main>
</template>

<!-- function defined -->
<script>
export default {
    name: 'DepositSection',
    data() {
        return {
            DEPOSIT_SHIP_SINGLE: null,
            DEPOSIT_BATCH_GOODS: null,
            DEPOSIT_HEAVY_GOODS: null,
            DEPOSIT_BULK_GOODS: null,
            DEPOSIT_WOOD_FEE: null,
        };
    },
    mounted() {
        this.GET_DEPOSIT_SHIP_SINGLE();
        this.GET_DEPOSIT_BATCH_GOODS();
        this.GET_DEPOSIT_HEAVY_GOODS();
        this.GET_DEPOSIT_BULK_GOODS();
        this.GET_DEPOSIT_WOOD_FEE();
    },
    methods: {
        async GET_DEPOSIT_SHIP_SINGLE() {
            const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.DEPOSIT_SHIP_SINGLE);
            const res = await ApiCaller.post(link);
            this.DEPOSIT_SHIP_SINGLE = res.data;
        },
        async GET_DEPOSIT_BATCH_GOODS() {
            const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.DEPOSIT_BATCH_GOODS);
            const res = await ApiCaller.post(link);
            this.DEPOSIT_BATCH_GOODS = res.data;
        },
        async GET_DEPOSIT_HEAVY_GOODS() {
            const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.DEPOSIT_HEAVY_GOODS);
            const res = await ApiCaller.post(link);
            this.DEPOSIT_HEAVY_GOODS = res.data;
        },
        async GET_DEPOSIT_BULK_GOODS() {
            const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.DEPOSIT_BULK_GOODS);
            const res = await ApiCaller.post(link);
            this.DEPOSIT_BULK_GOODS = res.data;
        },
        async GET_DEPOSIT_WOOD_FEE() {
            const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.DEPOSIT_WOOD_FEE);
            const res = await ApiCaller.post(link);
            this.DEPOSIT_WOOD_FEE = res.data;
        },
    },
}
</script>

<!-- style custom -->
<style scoped>
.main-content {
    padding: 0rem 0 4rem;
}

.container {
    max-width: 1200px;
}

.row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}

.inner-content-post {
    border-color: #e1e1e1;
    padding: 1.5rem 1.5rem 2rem;
    background: #fff;
    border: 1px solid #e1e1e1;
}

.inner-content-info {
    margin-bottom: 3.5rem;
}

.heading-title.custom {
    margin-bottom: 1rem;
    position: relative;
    text-align: center;
}

.heading-title.custom .title {
    font-size: 22px;
    font-weight: 600;
    justify-content: center;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.heading-title.custom .title:before {
    height: 3px;
    margin-right: 1.5rem;
    content: '';
    flex: 1;
    background: #212529;
}

.heading-title.custom .title:after {
    height: 3px;
    margin-left: 1.5rem;
    content: '';
    flex: 1;
    background: #212529;
}

.wrap-bang-gia .mys-table thead tr {
    text-align: left !important;
    background-color: #f17d59;
    /* background: none; */
    border: none;
    color: #fff;
}

.wrap-bang-gia .mys-table th:first-child {
    padding-left: .8rem;
    min-width: 80px;
}

.wrap-bang-gia .mys-table thead th {
    min-width: 80px;
}

.wrap-bang-gia .mys-table tbody tr td:first-child,
.wrap-bang-gia .mys-table tbody tr td {
    border-color: #e1e1e1;
    border-left: 1px solid #e1e1e1;
    padding-left: .4rem;
    border-right: 1px solid #e1e1e1;
}

.wrap-bang-gia .mys-table tbody tr td {
    border-color: #e1e1e1;
}

.wrap-bang-gia .mys-table tbody tr td {
    border-right: 1px solid #e1e1e1;
}

.wrap-bang-gia .mys-table tbody tr td {
    border-color: #e1e1e1;
    border-right: 1px solid #e1e1e1;
}

.wrap-bang-gia .mys-text-success {
    color: #659f13;
    font-size: 18px;
}

.txt-center {
    text-align: center;
}

.wrap-bang-gia .mys-alert-dismissible {
    color: #856404;
    background: #fff3cd;
    border: 1px solid #ffeeba;
}

.wrap-bang-gia .mys-alert {
    margin-bottom: 1.5rem;
    padding: 1rem 1rem;
}

.bxs-star {
    color: #e6bf4e;
    font-size: 18px;
}

.inner-content-post h2 {
    font-size: 16px;
}

.inner-content-post h3 {
    font-size: 14px;
}

.row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}

img {
    display: inline-block;
    vertical-align: middle;
    border-style: none;
    max-width: 100%;
    height: auto;
    object-fit: cover;
}

td,
th {
    padding: 1rem .6rem .7rem;
    text-align: inherit;
    font-size: 14px;
}

tr {
    border-bottom: 1px solid #e1e1e1;
}

article {
    display: block;
}

main {
    display: block;
}

p {
    margin-bottom: 15px;
}

.inner-content-post h2 {
    font-size: 16px;
}

h1,
h2,
h3,
h4,
h5,
h6,
h1 a,
h2 a,
h3 a,
h4 a,
h5 a,
h6 a {
    color: #111111;
    font-weight: 600;
    margin-bottom: 12px;
    line-height: 1.25;
}

table {
    border-collapse: collapse;
    margin: 0 0 2.5rem;
    width: 100%;
    background-color: transparent;
    border-spacing: 0;
}
</style>