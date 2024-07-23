<script setup>
import { Icon } from '@iconify/vue';
import CommonUtils from '../../../../utils/CommonUtils';
import { useCommonStore } from '../../../../../store/CommonStore';
import ApiCaller from '../../../../utils/ApiCaller';
import ROUTES from '../../../../../constants/routeDefine';
import CONSTANT from '../../../../../constants/constants';
</script>

<template>
    <div id="content">
        <div class="container">
            <main class="main" role="main">
                <div class="row main-row">
                    <div class="col-sm-9">
                        <div class="cart-by-page">
                            <div class="titles">
                                <h2 class="page-title">
                                    Bảng tin chung
                                </h2>
                            </div>
                            <div class="message_text"
                                style="text-align: center; background: #87cf82; color: #fff; padding: 14px; margin-bottom: 10px;">
                                Để nâng cao chất lượng dịch vụ, chúng tôi cung cấp tiện ích duyệt tiền nhanh cho quý
                                khách hàng sử dụng chuyển khoản qua Internet - Banking và không cần gửi thông tin giao
                                dịch nạp tiền. Quý khách hàng chỉ cần nhập nội dung chuyển tiền như sau : <span
                                    class="red big" style="font-size: 26px;"><strong>NAP_{{ CommonUtils.genCode()
                                        }}_CK</strong></span>
                                .
                                Trong
                                đó <span class="black">"{{ CommonUtils.genCode() }}"</span> là mã số riêng của khách
                                hàng, <span class="black">NAP_xxxxxx_CK</span> là cú pháp nạp tiền. Mọi thắc mắc vui
                                lòng liên
                                hệ
                                tư vấn
                            </div>
                            <div class="tab_container">
                                <br>
                                <br>
                                <h2 class="page-title">
                                    Thông báo đơn hàng , giao dịch của bạn
                                </h2>
                                <div class="tab_content">
                                    <div class="space20"></div>
                                    <form class="form-horizontal" @submit.prevent="handleSubmit" method="get">
                                        Từ ngày : <input v-model="filter.fromDate" class="pickdate_from custom_input hasDatepicker" type="date"
                                            id="datepicker_from" name="filter_startdate_create_date" value="">
                                        Đến ngày : <input v-model="filter.toDate" class="pickdate_to custom_input hasDatepicker" type="date"
                                            id="datepicker_to" name="filter_enddate_create_date" value="">
                                        <br>
                                        <div class="space10"></div>
                                        Loại thông báo :
                                        <select v-model="filter.type" name="filter_notice_type" class="custom_input">
                                            <option value="1, 2, 3">Tất cả</option>
                                            <option value="3">Ví điện tử</option>
                                            <option value="1">Đơn hàng</option>
                                            <option value="2">Vận đơn</option>
                                        </select>
                                        Trạng thái :
                                        <select v-model="filter.status" name="filter_is_read" class="custom_input">
                                            <option value="0, 1">Tất cả</option>
                                            <option value="0">Chưa xem</option>
                                            <option value="1">Đã xem</option>
                                        </select>
                                        <input class="button custom_flat_button" @click="getNotification" type="submit" value="Lọc">
                                    </form>
                                    <div class="space20"></div>
                                    <div class="table-responsive">
                                        <form id="formData" method="POST" @submit.prevent="handleSubmit">
                                            <table class="table tbl-cart tbl-list-order">
                                                <tbody id="abc">
                                                    <tr class="header-cart-table">
                                                        <td width="5%">#</td>
                                                        <td width="20%">Thời gian</td>
                                                        <td width="20%">Loại thông báo</td>
                                                        <td width="55%">Nội dung</td>
                                                        <td width="15%">
                                                            <input type="checkbox" name="checkall"
                                                                :checked="notifications.every($ => $.isChecked == true)"
                                                                @click="checkAll" class="isCheckBox"
                                                                style="float: left;">
                                                            <button class="button custom_flat_button"
                                                                @click="markNotificationAsRead">Đã xem</button>
                                                        </td>
                                                    </tr>
                                                    <tr v-for="(noti, idx) in notifications">
                                                        <td>{{ idx + 1 }}</td>
                                                        <td><span class="small">{{ CommonUtils.formatDate(noti.issueDate) }}</span></td>
                                                        <td><span class="small">{{ CommonUtils.promptNotiNameByType(noti.type) }}</span></td>
                                                        <td><span class="small">{{ noti.content }}</span></td>
                                                        <td>
                                                            <input v-if="noti.status == '0'" v-model="noti.isChecked" class="isCheckBox" type="checkbox" @change="checkItem($event, noti.id)">
                                                            <span v-else class="bg_green" style="font-weight: 400;">Đã xem</span>
                                                        </td>
                                                    </tr>
                                                </tbody>

                                            </table>
                                        </form>
                                        <ul class="pagination">
                                            <li @click="handlePage(page - 1)" v-for="(page, index) in totalPage"
                                                :class="{ active: filter.pageIndex + 1 == page }">
                                                <a>{{ page }}</a>
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

<script>
export default {
    name: "DashBoardSection",
    data() {
        return {
            notifications: [],
            selectedNoti: new Set(),

            filter : {
                fromDate: null,
                toDate: null,
                type: "1, 2, 3",
                status: '0, 1',
                pageIndex: 0,
                pageSize: CONSTANT.DEFAULT_PAGESIZE,
            },
            totalPage: new Set(),
            totalRecord: 0,
        }
    },
    mounted() {
        this.getNotification();
    },
    methods: {
        async getNotification() {
            const loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.Notification.getAll, this.filter);
            loader.hide();
            this.notifications = res.data.content;
            this.totalPage = new Set();
            this.totalRecord = res.data.totalElements;
            if (this.filter.pageIndex > res.data.totalPages) {
                this.filter.pageIndex = 1;
            }
            for (let i = 1; i <= res.data.totalPages; i++) {
                this.totalPage.add(i);
            }
            debugger
        },
        checkItem(event, id) {
            const checked = event.target.checked;
            if(checked) {
                this.selectedNoti.add(id)
                this.notifications.filter($ => $.id == id).forEach($ => $.isChecked = true)
            } else {
                if(this.selectedNoti.has(id)) {
                    this.selectedNoti.delete(id)
                    this.notifications.filter($ => $.id == id).forEach($ => $.isChecked = false)
                }
            }
        },
        checkAll(event) {
            const checked = event.target.checked;
            if(checked) {
                this.notifications.forEach(el => {
                    this.selectedNoti.add(el.id)
                    this.notifications.forEach($ => $.isChecked = true)
                })
            } else {
                this.selectedNoti = new Set()
                this.notifications.forEach($ => $.isChecked = false)
            }
        },
        async markNotificationAsRead() {
            const loader = this.$loading.show();
            const res = await ApiCaller.post(ROUTES.Notification.markAsRead(Array.from(this.selectedNoti)));
            loader.hide();
            if (res.status == 200) {
				this.getNotification();
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
        },
        handlePage(page) {
            this.filter.pageIndex = page;
            this.getNotification();
        },
        handleNext() {
            debugger
            if (this.filter.pageIndex < this.totalPage.size - 1)
                this.filter.pageIndex++;
            else {
                this.filter.pageIndex = this.totalPage.size - 1
            }
            this.getNotification();
        },
        handleLast() {
            this.filter.pageIndex = this.totalPage.size - 1;
            this.getNotification();
        },
    }
}
</script>

<style scoped>
@import '../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../assets/styles/private-styles.css';

.cart-by-page {
    box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.3);
    padding: 20px;
    overflow: hidden;
    margin-bottom: 40px;
}

.cart-by-page .titles {
    margin: 0px 0px 20px 0px;
}

.table>tbody>tr>td,
.table>tfoot>tr>td {
    padding: 5px;
}

.tbl-list-order td {
    vertical-align: middle !important;
}

.tbl-list-order td {
    text-align: center;
    border-right: 1px solid #fff;
}

input.isCheckBox {
    width: 20px;
    height: 20px;
}

table {
    border-collapse: collapse;
    table-layout: fixed;
}

</style>