<script setup>
import ROUTES from '../../../../../constants/routeDefine';
import { useCommonStore } from '../../../../../store/CommonStore';
import ApiCaller from '../../../../utils/ApiCaller';
import CommonUtils from '../../../../utils/CommonUtils';
</script>

<!-- template section -->
<template>
    <div id="content" class="clearfix fullwidth">


        <h2 class="title "> Danh sách đơn ký gửi</h2>
        <div class="list_status clearfix">
            <ul>
                <li>
                    <a class="black">
                        Tòan bộ : <span>(279834)</span>
                    </a>
                </li>
                <li>
                    <a class="green">
                        Đã duyệt : <span>(279834)</span>
                    </a>
                </li>
                <li>
                    <a class="hangdave_tq">
                        Nhập kho TQ : <span>(279834)</span>
                    </a>
                </li>
                <li>
                    <a class="hangdave">
                        Nhập kho VN : <span>(279834)</span>
                    </a>
                </li>
                <li>
                    <a class="bold ssgiao">
                        Sẵn sàng giao hàng : <span>(279834)</span>
                    </a>
                </li>
                <li>
                    <a class="damuahang">
                        Đã giao : <span>(279834)</span>
                    </a>
                </li>
                <li>
                    <a class="black">
                        Đã kết thúc : <span>(279834)</span>
                    </a>
                </li>
                <li>
                    <a class="red">
                        Đã hủy : <span>(279834)</span>
                    </a>
                </li>
            </ul>
        </div>
        <form id="formData" action="ships/confirm_money" method="POST">
            <input type="hidden" name="returnURL"
                value="aHR0cHM6Ly9xbC5oYW5ncXVhbmdjaGF1MjRoLnZuL3NoaXBzL3RyYW5zcG9ydA==">
            <div class="gridtable">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                STT
                            </td>
                            <td>
                                Đơn hàng / Ngày mua hàng
                            </td>
                            <td>
                                Thông tin khách hàng
                            </td>
                            <td>
                                Kho nhận hàng
                            </td>
                            <td>
                                Mã vận đơn
                            </td>
                            <td>
                                Tổng cân nặng
                            </td>
                            <td>
                                Tổng tiền VC
                            </td>
                            <td>
                                Phí bảo hiểm
                            </td>
                            <td>
                                Giá trị hàng
                            </td>
                            <td width="150px">
                                Tình trạng
                            </td>
                        </tr>
                        <tr v-for="(order, index) in orderList" class="">
                            <td class="align-center">
                                {{ index + 1 }}
                            </td>
                            <td>
                                <div class="green">
                                    {{ order.orderChina.orderCode }} </div>
                                <div class="bold">
                                    {{ CommonUtils.formatDate(order.orderChina.dateOfPurchase) }}
                                </div>
                            </td>
                            <td>
                                <b>Username: </b><span class="red">{{ order.address.name }}</span>
                                <br>
                                <b>SĐT: </b><span class="green">{{ order.address.phoneNumber }}</span>
                                <br>
                                <b>Địa chỉ: </b><span class="blue">{{ order.address.address }}</span>
                            </td>
                            <td>
                                <div class="green">KHO HN</div>
                            </td>
                            <td>
                                <span class="bold" v-for="(pkg, idx) in order.packages">
                                    {{ pkg.shipCode }} <br>
                                    <span class="blue">({{ pkg.isVolume ? pkg.weigh ? pkg.weigh : 0 : pkg.volume ?
                                        pkg.volume : 0 }} {{ pkg.isVolume
                                            ? 'm3' : 'kg' }})</span>
                                    <br v-if="idx != order.packages.length - 1"><br>
                                </span>
                            </td>
                            <td>
                                <span class="red">
                                    {{ order.orderChina.totalWeight ? order.orderChina.totalWeight : 0 }} {{
                                        order.orderChina.isVolume
                                            ? 'm3' : 'kg' }} </span>
                            </td>
                            <td>
                                <span class="red">{{ order.orderChina.shippingPrice ? order.orderChina.shippingPrice
                                    : 0 }} VNĐ</span>
                            </td>
                            <td>
                                <span class="bold">
                                    {{ order.orderChina.premium ? order.orderChina.premium : 0 }}% </span>
                            </td>
                            <td width="150px">
                                <span class="green">{{ CommonUtils.formatNumber(order.orderChina.priceProduct) }}
                                    VNĐ</span>
                            </td>
                            <td>
                                <form
                                    style="display: flex; justify-items: center; flex-direction: column; text-align: center;"
                                    action="" class="ajaxFormPackages" method="POST"
                                    v-if="order.orderChina.status != 0">
                                    <a class="button-link special-green"
                                        v-if="!(order.orderChina.status == 8 || order.orderChina.status == 9)"
                                        @click="handleAction(order.orderChina)">
                                        {{
                                            promptStatusNameByStatus(
                                                getNextStateOfPkg(order.orderChina.status)
                                            )
                                        }}
                                    </a>
                                    <a v-if="order.orderChina.status != 9" class="button-link red"
                                        @click="handleAction(order.orderChina, true)">
                                        Đã huỷ
                                    </a>
                                    <span v-if="order.orderChina.status == 9" class="red">Đã huỷ</span>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
        <p><strong>Total: <span class="green">153</span> (Items)</strong></p>
    </div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'StaffTransportSection',
    data() {
        return {
            orderList: [],

            commonStore: useCommonStore(),
        }
    },
    mounted() {
        this.getTransportOrder();
    },
    methods: {
        async getTransportOrder() {
            const loader = this.$loading.show();
            const payload = {
                orderCode: '',
                shipCode: '',
            }
            const res = await ApiCaller.get(ROUTES.Order.getDepositOrder, payload);
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                return;
            }
            this.orderList = res.data.data;
        },
        getNextStateOfPkg(status) {
            switch (status) {
                case 1:
                case 2:
                case 3:
                    return 4;
                case 4:
                    return 5;
                case 5:
                    return 6;
                case 6:
                    return 8;
                case 7:
                    return 8;
            }
        },
        promptStatusNameByStatus(status) {
            switch (status) {
                case 4:
                    return 'Nhập kho TQ';
                case 5:
                    return 'Đã nhập kho VN';
                case 6:
                    return 'Sẵn sàng giao hàng';
                case 7:
                    return 'Đã giao';
                case 8:
                    return 'Kết thúc';
                case 9:
                    return 'Đã huỷ';
            }
        },
        async handleAction(order, isCancel = false) {
            const loader = this.$loading.show();
            const payload = {
                id: order.id,
                status: isCancel ? 9 : this.getNextStateOfPkg(order.status),
            };
            const res = await ApiCaller.post(ROUTES.Order.updateOrderStatus, payload);
            if (res.status == 200) {
                let vcl = isCancel ? 9 : this.getNextStateOfPkg(order.status);
                this.$toast.success(
                    `Chuyển trạng thái ${this.promptStatusNameByStatus(
                        vcl
                    )} cho đơn hàng ${order.orderCode} thành công`,
                    {
                        title: "Thông báo",
                        position: "top-right",
                        autoHideDelay: 7000,
                    }
                );
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            }
            loader.hide();
            this.getTransportOrder();
        },
    }
}
</script>

<!-- style custom -->
<style scoped></style>