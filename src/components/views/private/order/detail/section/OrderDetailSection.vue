<script setup>
import ApiCaller from '../../../../../utils/ApiCaller';
import ROUTES from '../../../../../../constants/routeDefine';
import CommonUtils from '../../../../../utils/CommonUtils';
import CONSTANT from '../../../../../../constants/constants';
import { useCommonStore } from '../../../../../../store/CommonStore';
</script>

<!-- template section -->
<template>
    <div class="container">
        <main class="main" role="main">
            <div class="row main-row">
                <div class="col-sm-12">
                    <div class="information clearfix">
                        <div class="titles">
                            <h2 class="page-title">Chi tiết đơn hàng</h2>
                        </div>
                        <div class="view_order_info">
                            <a href="https://giaodich.hangquangchau24h.vn/order/lists"><i class="fa fa-angle-left"
                                    aria-hidden="true"></i> Danh sách đơn hàng</a>
                            <div class="invoiceid uppercase">
                                <img class="preview_image"
                                    src="https://cbu01.alicdn.com/img/ibank/O1CN01RcxVqK1CsnBNB8kqo_!!3018240137-0-cib.400x400.jpg">
                                <strong><span>Đơn {{ order ? order.orderChina.id : '1' }}</span></strong>
                                <p class="label_order_status hasTooltip tooltipstered"
                                    tooltip-content="#tipOrderStatusHistory276779"><span :class="promptClassByStatusValue(order ? order.orderChina.status : 1)">{{ promptStatusByValue(order ? order.orderChina.status : 1) }}</span> <i class="fa fa-question-circle"></i></p>
                                <div id="tipOrderStatusHistory276779" class="tipContent hidden">
                                    <div style="width:300px">
                                        <table class="cu-table borderless">
                                            <tbody>
                                                <tr>
                                                    <td><strong>Đã gửi đơn</strong></td>
                                                    <td class="right"><strong>2024-04-28 20:12:14</strong></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Đã đặt cọc</strong></td>
                                                    <td class="right"><strong></strong></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Đã mua hàng</strong></td>
                                                    <td class="right"><strong></strong></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Hàng đã về kho TQ</strong></td>
                                                    <td class="right"><strong></strong></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Hàng đã về kho VN</strong></td>
                                                    <td class="right"><strong></strong></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Kết thúc</strong></td>
                                                    <td class="right"><strong></strong></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Hủy</strong></td>
                                                    <td class="right"><strong></strong></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="view_order_menu">
                                <ul>
                                    <li><a class="custom-link" @click="moveToDiv('#info')">Thông tin</a></li>
                                    <li><a class="custom-link" @click="moveToDiv('#products')">Sản phẩm</a></li>
                                    <li><a class="custom-link" @click="moveToDiv('#packages')">Kiện hàng</a></li>
                                    <li><a class="custom-link" @click="moveToDiv('#payment')">Giao dịch</a></li>
                                    <li><a class="custom-link" @click="moveToDiv('#extrafees')">Phí khác</a></li>
                                    <li><a class="custom-link" @click="moveToDiv('#finance')">Tài chính</a></li>
                                    <li><a class="custom-link" @click="moveToDiv('#complaint')">Khiếu nại</a></li>
                                </ul>
                            </div>
                        </div>

                        <!-- Tab Thông tin -->
                        <div id="info" class="customer-info box_info  box_shadow">
                            <div class="row">
                                <div class="col-md-6">
                                    <p class="subtitle"><strong><i class="fa fa-newspaper-o" aria-hidden="true"></i>
                                            Dịch vụ đơn hàng</strong></p>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td><strong>Đóng gỗ </strong></td>
                                                <td style="padding-left: 15px;">
                                                    <input type="checkbox"
                                                        v-model="woodWorkEnable"
                                                        style="width:20px;height:20px;">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><strong>Kiểm hàng</strong></td>
                                                <td style="padding-left: 15px;">
                                                    <input type="checkbox" name="is_order_checked"
                                                        v-model="tallyEnable"
                                                        style="width:20px;height:20px;">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-md-6">
                                    <p class="subtitle"><strong><i class="fa fa-user" aria-hidden="true"></i> Thông tin
                                            khách hàng</strong></p>
                                    <p><strong>{{ order ? order.customerInfo.username : '' }}</strong> / {{ order ? order.customerInfo.phone : '' }} / {{ order ? order.customerInfo.email : '' }}</p>
                                    <p></p>
                                    <p class="subtitle"><strong><i class="fa fa-map-marker" aria-hidden="true"></i> Kho
                                            nhận hàng</strong></p>
                                    <p><strong><span class="bold green">Kho {{ promptLocationByInventoryId(order ? order.address.inventoryId : 1) }}</span></strong> ({{promptNameByInventoryId(order ? order.address.inventoryId : 1)}} - {{ promptLocationByInventoryId(order ? order.address.inventoryId : 1) }})</p>
                                </div>
                            </div>

                            <div class="row">
                                <hr>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <p class="subtitle"><strong><i class="fa fa-newspaper-o" aria-hidden="true"></i>
                                            Thông đơn hàng</strong></p>
                                    <p>Giá phí mua hàng : <strong>3 %</strong> </p>
                                    <p>Tỷ giá : <strong>1¥ = {{ CommonUtils.formatNumber(commonStore.exchange_rate) }} đ</strong></p>
                                    <p>Tỷ lệ đặt cọc : <strong>70 %</strong></p>
                                </div>
                                <div class="col-md-6">
                                    <p></p>
                                    <p>Tổng cân nặng : <strong>Chưa xác định</strong></p>
                                    <p>Giá cân nặng : <strong>{{ CommonUtils.formatNumber(commonStore.fee_by_weight) }}/ KG</strong></p>
                                </div>
                            </div>
                        </div>
                        <!-- END  Tab Thông tin -->

                        <!-- Tab Sản phẩm -->
                        <div id="products" class="box_info  box_shadow">
                            <div class="row">
                                <div class="col-md-12">
                                    <p class="subtitle"><strong><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                            Danh sách sản phẩm</strong></p>
                                </div>
                                <div class="col-md-12">
                                    <div class="gridtable">
                                        <table>

                                            <tbody>
                                                <tr class="header-cart-table">
                                                    <td style="width: 5%;">STT</td>
                                                    <td style="width: 50%;">Sản phẩm</td>
                                                    <td class="left" style="width: 16%;">Giá bán</td>
                                                    <td class="center" style="width:16%;">Số lượng <i
                                                            class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                    </td>
                                                    <td class="center" style="width:18%;">Tổng tiền</td>
                                                </tr>


                                                <tr class="seller">
                                                    <td colspan="5">Người bán : </td>
                                                </tr>
                                                <tr  v-for="(detail, index) in order ? order.orderDetails : []" class="">
                                                    <td class="align-center big">1</td>
                                                    <td>
                                                        <div class="image">
                                                            <a :href="detail.itemLink"
                                                                target="_blank"><img
                                                                    :src="detail.itemImage"
                                                                    width="100px" height="100px"></a>
                                                        </div>
                                                        <div class="info">
                                                            <div class="price">
                                                                <a :href="detail.itemLink"
                                                                    target="_blank">
                                                                    <span style="font-size:15px;font-weight:600;"><i
                                                                            class="fa fa-jpy" aria-hidden="true"></i>
                                                                    </span>
                                                                    {{ decodeURIComponent(detail.itemTitle) }} </a>
                                                            </div>
                                                            <div class="attributes">
                                                                {{ detail.color }}; {{ detail.size }} </div>
                                                            <div class="item_note">
                                                                <form name="item_note" action="" class="" method="POST"
                                                                    enctype="multipart/form-data">
                                                                    <textarea class="item_note" name="item_note"
                                                                        rows="4" cols="40"></textarea>
                                                                    <input type="hidden" name="item_id" value="761143">
                                                                    <input type="hidden" name="controller"
                                                                        value="order">
                                                                    <input type="hidden" name="task"
                                                                        value="updateItemNote">
                                                                    <div
                                                                        class="form_upload ajax_response alert dismissable">
                                                                    </div>
                                                                </form>
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <td class="align-center big">
                                                        <p><span>{{ CommonUtils.formatNumber(detail.itemPrice * commonStore.exchange_rate) }} đ</span></p>
                                                        <p><span>¥{{ detail.itemPrice }}</span></p>

                                                    </td>
                                                    <td class="align-center big">
                                                        <form name="item_note" action="" class="" method="POST"
                                                            enctype="multipart/form-data">
                                                            <input type="number" class="num-product" name="qty"
                                                                :value="detail.numberItem">
                                                            <!-- <div
                                                                class="form_upload ajax_response alert dismissable alert-success">
                                                                Đã thay đổi thành công</div> -->
                                                        </form>
                                                        <span class="textTooltip tooltipstered">{{ detail.numberItem }}/{{ detail.numberItem }}/0</span>
                                                    </td>
                                                    <td class="align-center ">
                                                        <p class="big"><span>{{ CommonUtils.formatNumber(detail.totalPrice) }} đ</span></p>
                                                        <p><span>{{ detail.numberItem }} x {{ CommonUtils.formatNumber(detail.itemPrice * commonStore.exchange_rate) }}</span></p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                </tr>
                                                <tr class="seller" style="background:#fcebf2 !important;">
                                                    <td colspan="3" class="text-right"><span class="big">Tổng số lượng /
                                                            Tổng tiền hàng</span></td>
                                                    <td class="align-center"><span class="big">{{ order ? order.orderDetails.reduce((sum, item) => sum + item.numberItem, 0) : 0 }}/{{ order ? order.orderDetails.reduce((sum, item) => sum + item.numberItem, 0) : 0 }}/0</span></td>
                                                    <td class="align-center"><span class="big">{{ order ? CommonUtils.formatNumber(order.orderDetails.reduce((sum, item) => sum + item.totalPrice, 0)) : 0 }}đ (¥{{ order ? CommonUtils.formatNumberFloat(order.orderDetails.reduce((sum, item) => sum + item.totalPriceNDT, 0)) : 0 }})</span>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tab  Sản phẩm -->

                        <!-- Tab kiện hàng -->
                        <div id="packages" class="box_info box_shadow">
                            <div class="row">
                                <div class="col-md-12">
                                    <p class="subtitle"><strong><i class="fa fa-archive" aria-hidden="true"></i> Danh
                                            sách kiện hàng</strong></p>
                                </div>
                                <div class="col-md-12">
                                    <div class="gridtable">
                                        <table>
                                            <tbody>
                                                <tr class="header-cart-table">
                                                    <td style="width: 5%;">STT</td>
                                                    <td style="width: 30%;">Mã kiện</td>
                                                    <td style="width: 30%;">Mã vận đơn</td>
                                                    <td class="left" style="width: 16%;">Cân nặng <i
                                                            class="fa fa-question-circle textTooltip tooltipstered"></i>
                                                    </td>
                                                    <td class="center" style="width:16%;">Thể tích <i
                                                            class="fa fa-question-circle textTooltip tooltipstered"></i>
                                                    </td>
                                                    <td class="center" style="width:18%;">Trạng thái</td>
                                                    <td class="center" style="width:18%;">Lịch sử</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end kiện hàng -->

                        <!-- Tab giao dịch -->
                        <div id="payment" class="box_info box_shadow">
                            <div class="row">
                                <div class="col-md-12">
                                    <p class="subtitle"><strong><i class="fa fa-money" aria-hidden="true"></i> Danh sách
                                            giao dịch</strong></p>
                                </div>
                                <div class="col-md-12">
                                    <div class="gridtable">
                                        <table>
                                            <tbody>
                                                <tr class="header-cart-table">
                                                    <td width="25%">Ngày giao dịch</td>
                                                    <td width="25%">Mã giao dịch</td>
                                                    <td width="25%">Loại giao dịch</td>
                                                    <td width="25%">Nội dung</td>
                                                    <td width="25%">Phát sinh($)</td>
                                                    <td width="25%">Trước giao dịch($)</td>
                                                    <td width="25%">Sau giao dịch($)</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <!-- Tab phí khác -->
                        <div id="extrafees" class="box_info box_shadow">
                            <div class="row">
                                <div class="col-md-12">
                                    <p class="subtitle"><strong><i class="fa fa-external-link-square"
                                                aria-hidden="true"></i> Danh sách các phí khác nếu có <i
                                                class="fa fa-question-circle textTooltip tooltipstered"></i></strong>
                                    </p>
                                </div>
                                <div class="col-md-12">
                                    <div class="gridtable">
                                        <table>
                                            <tbody>
                                                <tr class="header-cart-table">
                                                    <td style="width: 5%;">STT</td>
                                                    <td style="width: 15%;">Mã hóa đơn</td>
                                                    <td style="width: 15%;">Số tiền</td>
                                                    <td class="left" style="width: 65%;">Nội dung</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end phí khác -->


                        <!-- Tab Tài chính -->
                        <div id="finance" class="box_shadow">
                            <div class="row">
                                <div class="col-md-8 bg_gray">
                                    <div class="col-md-6">
                                        <div class="detail_finance">
                                            <p>Tiền hàng : <strong>{{ order ? CommonUtils.formatNumber(order.orderDetails.reduce((sum, item) => sum + item.totalPrice, 0)) : 0 }}</strong>đ&nbsp;(¥{{ order ? CommonUtils.formatNumberFloat(order.orderDetails.reduce((sum, item) => sum + item.totalPriceNDT, 0)) : 0 }})</p>
                                            <p>Phí mua hàng : <strong>{{ CommonUtils.formatNumber(commonStore.charging_fee) }}</strong>đ</p>
                                            <p>Phí cố định : <strong>0</strong>đ</p>
                                            <p>VC nội địa TQ : <strong>{{ order ? CommonUtils.formatNumber(order.orderChina.domesticFees) : 0 }}</strong>đ (¥{{ order ? CommonUtils.formatNumber(order.orderChina.domesticFees / commonStore.exchange_rate) : 0 }})</p>
                                            <p>SL Đặt / Mua / Kiểm : <strong>{{ order ? order.orderDetails.reduce((sum, item) => sum + item.numberItem, 0) : 0 }}/{{ order ? order.orderDetails.reduce((sum, item) => sum + item.numberItem, 0) : 0 }}/0</strong></p><strong>

                                            </strong>
                                        </div><strong>
                                        </strong>
                                    </div><strong>
                                        <div class="col-md-6">
                                            <div class="detail_finance">
                                                <p>VC Quốc Tế : <strong>0</strong>đ</p>
                                                <p>Phí khác : <strong>0</strong>đ</p>
                                                <p>Phí kiểm đếm : <strong>{{ order ? CommonUtils.formatNumber(order.orderChina.tallyFee) : 0 }}</strong>đ</p>
                                                <p>Đóng thùng gỗ : <strong>{{ order ? CommonUtils.formatNumber(order.orderChina.woodworkingFee) : 0 }}</strong>đ</p>
                                            </div>
                                        </div>

                                    </strong>
                                </div><strong>
                                    <div class="col-md-4 bg_orange ">
                                        <div class="total_finance">
                                            <table class="cu-table borderless">
                                                <tbody>
                                                    <tr>
                                                        <td>Tiền hàng <i
                                                                class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                        </td>
                                                        <td class="right"><strong><span
                                                                    class="sl_total_price big">{{ order ? CommonUtils.formatNumber(order.orderDetails.reduce((sum, item) => sum + item.totalPrice, 0)) : 0 }}</span></strong>đ
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>VC Nội địa TQ <i
                                                                class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                        </td>
                                                        <td class="right"><strong><span
                                                                    class="sl_total_price big">{{ order ? CommonUtils.formatNumber(order.orderChina.domesticFees) : 0 }}</span></strong>đ</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Phí dịch vụ <i
                                                                class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                        </td>
                                                        <td class="right"><strong><span
                                                                    class="sl_total_price big">{{ CommonUtils.formatNumber(commonStore.charging_fee) }}</span></strong> đ
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Phí VC QT <i
                                                                class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                        </td>
                                                        <td class="right"><strong><span
                                                                    class="sl_total_price big">0</span></strong> đ</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Phí kiểm đếm <i
                                                                class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                        </td>
                                                        <td class="right"><strong><span
                                                                    class="sl_total_price big">{{ order ? CommonUtils.formatNumber(order.orderChina.tallyFee) : 0 }}</span></strong> đ</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Phí Khác <i
                                                                class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                        </td>
                                                        <td class="right"><strong><span
                                                                    class="sl_total_price big">0</span></strong> đ</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tổng chi phí</td>
                                                        <td class="right"><strong><span
                                                                    class="sl_total_price big red">
                                                                
                                                                </span>{{ order ? CommonUtils.formatNumber(order.orderChina.totalAmount) : 0 }}</strong>
                                                            đ</td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2">
                                                            <hr>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Đã thanh toán <i
                                                                class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                        </td>
                                                        <td class="right"><strong><span
                                                                    class="sl_total_price big green">{{ order ? CommonUtils.formatNumber(order.orderChina.paid) : 0 }}</span></strong> đ
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Đã giảm trừ <i
                                                                class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                        </td>
                                                        <td class="right"><strong><span
                                                                    class="sl_total_price big">0</span></strong> đ</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Cần thanh toán <i
                                                                class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                        </td>
                                                        <td class="right"><strong><span
                                                                    class="sl_total_price big lightblue">{{ order ? CommonUtils.formatNumber(order.orderChina.notPaid) : 0 }}</span></strong>
                                                            đ</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </strong>
                            </div><strong>
                            </strong>
                        </div><strong>

                            <!-- end tab tai chinh -->

                            <!-- Tab khieu nai -->
                            <div id="complaint" class="box_info box_shadow">
                                <div class="row">
                                    <div class="col-md-12">
                                        <p class="subtitle"><strong><i class="fa fa-flag-checkered"
                                                    aria-hidden="true"></i> Khiếu nại <i
                                                    class="fa fa-question-circle textTooltip tooltipstered"></i></strong>
                                        </p>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="gridtable">
                                            <table>
                                                <tbody>
                                                    <tr class="header-cart-table">
                                                        <td style="width: 5%;">STT</td>
                                                        <td style="width: 50%;">Sản phẩm</td>
                                                        <td class="left" style="width: 16%;">Giá bán</td>
                                                        <td class="center" style="width:16%;">Số lượng <i
                                                                class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                        </td>
                                                        <td class="center" style="width:18%;">Trạng thái</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- end tab khieu nai -->


                        </strong>
                    </div><strong>
                    </strong>
                </div><strong>

                </strong>
            </div><strong>
            </strong>
        </main><strong>
        </strong>
    </div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'OrderDetailSection',
    data() {
        return {
            orderId: this.$route.params.orderId,
            order: null,
            listInventories: [],

            woodWorkEnable: false,
            tallyEnable: false,

            commonStore: useCommonStore(),
        }
    },
    computed: {
        orderId() {
            return this.$route.params.orderId;
        }
    },
    mounted() {
        this.getListInventories();
        this.getDetail(this.orderId);
    },
    methods: {
        async getListInventories() {
			let loader = this.$loading.show();
			const res = await ApiCaller.get(ROUTES.Inventory.findAll);
			this.listInventories = res.data;
			loader.hide();
		},
        promptLocationByInventoryId(id) {
			return this.listInventories[id] ? this.listInventories[id].location : '';
		},
        promptNameByInventoryId(id) {
			return this.listInventories[id] ? this.listInventories[id].name : '';
		},
        async getDetail(id) {
            let loader = this.$loading.show()
            const res = await ApiCaller.get(ROUTES.Order.getDetail(id));
            loader.hide();
            this.order = res.data;
            // debugger
            this.woodWorkEnable = this.order.orderChina.isWoodworkingFee;
            this.tallyEnable = this.order.orderChina.isTallyFee;
        },
        promptStatusByValue(status) {
			switch (status) {
				case 1:
					return 'Đang chờ cọc';
				case 2:
					return 'Đã đặt cọc';
				case 3:
					return 'Đã mua hàng';
				case 4:
					return 'Hàng đã về kho TQ';
				case 5:
					return 'Hàng đã về kho VN';
				case 6:
					return 'Sẵn sàng giao hàng';
				case 7:
					return 'Chờ xử lý khiếu nại';
				case 8:
					return 'Đã kết thúc';
				case 9:
					return 'Đã huỷ';
			}
		},
		promptClassByStatusValue(status) {
			switch (status) {
				case 1:
					return '.daduyet';
				case 2:
					return '.dathanhtoan';
				case 3:
					return '.damuahang';
				case 4:
					return '.hangdave';
				case 5:
					return '.hangdave';
				case 6:
					return '.hangdave';
				case 7:
					return '.chokhieunai';
				case 8:
					return '.daketthuc';
				case 9:
					return '.dahuy';
			}
		},
        moveToDiv(selector) {
            document.querySelector(selector).scrollIntoView()
        }
    }
}
</script>

<!-- style custom -->
<style scoped>
@import '../../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../../assets/styles/private-styles.css';
</style>