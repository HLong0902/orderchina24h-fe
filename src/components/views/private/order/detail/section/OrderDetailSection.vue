<script setup>
import ApiCaller from '../../../../../utils/ApiCaller';
import ROUTES from '../../../../../../constants/routeDefine';
import CommonUtils from '../../../../../utils/CommonUtils';
import CONSTANT from '../../../../../../constants/constants';
import { useCommonStore } from '../../../../../../store/CommonStore';
</script>

<!-- template section -->
<template>
    <div v-if="isDataReady" class="container">
        <main class="main" role="main">
            <div class="row main-row">
                <div class="col-sm-12">
                    <div class="information clearfix">
                        <div class="titles">
                            <h2 class="page-title">Chi tiết đơn hàng</h2>
                        </div>
                        <div class="view_order_info">
                            <a href="#/order/lists">
                                <fa class="angle-left" aria-hidden="true"></fa> Danh sách đơn hàng
                            </a>
                            <div class="invoiceid uppercase">
                                <img class="preview_image"
                                    src="https://cbu01.alicdn.com/img/ibank/O1CN01RcxVqK1CsnBNB8kqo_!!3018240137-0-cib.400x400.jpg">
                                <strong><span>Đơn {{ order ? order.orderChina.orderCode : '1' }}</span></strong>
                                <p class="label_order_status hasTooltip tooltipstered"
                                    tooltip-content="#tipOrderStatusHistory276779"><span
                                        :class="promptClassByStatusValue(order ? order.orderChina.status : 1)">{{
                                            promptStatusByValue(order ? order.orderChina.status : 1) }}&nbsp;&nbsp;</span>
                                    <fa id="tooltip-target-1" icon="question-circle"></fa>
                                </p>
                                <b-tooltip style="min-width: 300px;" placement="top" variant="secondary"
                                    target="tooltip-target-1" triggers="hover">
                                    <div style="font-size: 14px; font-weight: 400; margin: 0; padding: 0;">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td style="padding: 5px; text-align: left;">Đã gửi đơn</td>
                                                    <td style="padding: 5px; text-align: right;">{{
                                                        order ? order.orderChina.depositDate : '-' }}</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 5px; text-align: left;">Đã đặt cọc</td>
                                                    <td style="padding: 5px; text-align: right;">{{
                                                        order ? order.orderChina.depositDate : '-' }}</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 5px; text-align: left;">Đã mua hàng</td>
                                                    <td style="padding: 5px; text-align: right;">{{
                                                        order ? order.orderChina.dateOfPurchase : '-' }}</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 5px; text-align: left;">Hàng đã về kho TQ</td>
                                                    <td style="padding: 5px; text-align: right;">{{
                                                        order ? order.orderChina.dateOfChinaInventory : '-' }}</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 5px; text-align: left;">Hàng đã về kho VN</td>
                                                    <td style="padding: 5px; text-align: right;">{{
                                                        order ? order.orderChina.dateOfVietNamInventory : '-' }}</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 5px; text-align: left;">Kết thúc</td>
                                                    <td style="padding: 5px; text-align: right;">{{
                                                        order ? order.orderChina.dateDone : '-' }}</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 5px; text-align: left;">Hủy</td>
                                                    <td style="padding: 5px; text-align: right;">{{
                                                        order ? order.orderChina.dateDelete : '-' }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </b-tooltip>
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
                                                    <input type="checkbox" v-model="woodWorkEnable"
                                                        @input="toggleWoodWork" style="width:20px;height:20px;">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><strong>Kiểm hàng</strong></td>
                                                <td style="padding-left: 15px;">
                                                    <input type="checkbox" name="is_order_checked" v-model="tallyEnable"
                                                        @input="toggleTally" style="width:20px;height:20px;">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-md-6">
                                    <p class="subtitle"><strong><i class="fa fa-user" aria-hidden="true"></i> Thông tin
                                            khách hàng</strong></p>
                                    <p><strong>{{ order ? order.customerInfo.username :
                                        CommonUtils.getUserDTO().username }}</strong> / {{ order ?
                                                order.customerInfo.phone == null ? CommonUtils.getUserDTO().phone :
                                                    order.customerInfo.phone : CommonUtils.getUserDTO().phone }} / {{ order ?
                                            order.customerInfo.email : CommonUtils.getUserDTO().email }}</p>
                                    <p></p>
                                    <p class="subtitle"><strong><i class="fa fa-map-marker" aria-hidden="true"></i> Kho
                                            nhận hàng</strong></p>
                                    <p><strong><span class="bold green">Kho {{ promptLocationByInventoryId(order ?
                                        order.address.inventoryId : 2) }}</span></strong>
                                        ({{ promptNameByInventoryId(order ? order.address.inventoryId : 2) }} - {{
                                            promptLocationByInventoryId(order ? order.address.inventoryId : 2) }})</p>
                                </div>
                            </div>

                            <div class="row">
                                <hr>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <p class="subtitle"><strong><i class="fa fa-newspaper-o" aria-hidden="true"></i>
                                            Thông tin đơn hàng</strong></p>
                                    <p>Giá phí mua hàng : <strong>{{ order ? order.orderChina.purchaseFeePerSent : 0 }}
                                            %</strong> </p>
                                    <p>Tỷ giá : <strong>1¥ = {{ CommonUtils.formatNumber(commonStore.exchange_rate) }}
                                            đ</strong></p>
                                    <p v-if="order.orderChina.type != 2">Tỷ lệ đặt cọc : <strong>{{
                                        order?.orderChina?.paidPerSent }} %</strong></p>
                                </div>
                                <div class="col-md-6">
                                    <p></p>
                                    <p>Tổng cân nặng : <strong>Chưa xác định</strong></p>
                                    <p>Giá cân nặng : <strong>{{ CommonUtils.formatNumber(commonStore.fee_by_weight) }}/
                                            KG</strong></p>
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
                                                <tr v-for="(detail, index) in order ? order.orderDetails : []" class="">
                                                    <td class="align-center big">1</td>
                                                    <td>
                                                        <div class="image">
                                                            <a :href="detail.itemLink" target="_blank"><img
                                                                    :src="detail.itemImage" width="100px"
                                                                    height="100px"></a>
                                                        </div>
                                                        <div class="info">
                                                            <div class="price">
                                                                <a :href="detail.itemLink" target="_blank">
                                                                    <span style="font-size:15px;font-weight:600;"><i
                                                                            class="fa fa-jpy" aria-hidden="true"></i>
                                                                    </span>
                                                                    {{ decodeURIComponent(detail.itemTitle) }} </a>
                                                            </div>
                                                            <div class="attributes">
                                                                {{ detail.color }}; {{ detail.size }} </div>
                                                            <div class="item_note" v-if="order.orderChina.status < 3">
                                                                <form action="" class="" method="POST"
                                                                    enctype="multipart/form-data">
                                                                    <textarea v-model="detail.description"
                                                                        class="item_note" name="item_note" rows="4"
                                                                        cols="40"></textarea>
                                                                    <a @click="updateDescription(detail)"
                                                                        style="border-radius: 5px; width: 35px;"
                                                                        class="button-link special-blue">Lưu</a>
                                                                </form>
                                                            </div>
                                                            <div class="item_note"
                                                                v-if="order.orderChina.status >= 7 && detail.complains == null">
                                                                <form action="" class="" method="POST"
                                                                    enctype="multipart/form-data">
                                                                    <input id="fileInput" type="file"
                                                                        @change="handleFileChange($event, detail)" />
                                                                    <textarea v-model="detail.complainIssue"
                                                                        class="item_note" name="item_note" rows="4"
                                                                        cols="40"></textarea>
                                                                    <a @click="handleComplain(detail)"
                                                                        style="border-radius: 5px; width: 70px;"
                                                                        class="button-link special-blue">Khiếu nại</a>
                                                                </form>
                                                            </div>
                                                            <div class="item_note" v-else>
                                                                <div v-for="(item, idx) in detail.complains">
                                                                    <img style="width: 50px; height: 50px;"
                                                                        :src="genImageSrc(item.complainImagePath)">
                                                                    &nbsp;
                                                                    <span>{{ item.complainDescription }}</span>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <td class="align-center big">
                                                        <p><span>{{ CommonUtils.formatNumber(detail.itemPrice *
                                                            commonStore.exchange_rate) }} đ</span></p>
                                                        <p><span>¥{{ detail.itemPrice }}</span></p>

                                                    </td>
                                                    <td class="align-center big">
                                                        <form name="item_note" action="" class="" method="POST"
                                                            enctype="multipart/form-data">
                                                            <input type="number" class="num-product" name="qty"
                                                                :oid="detail.id" @change="handleChangeQuantity"
                                                                :value="detail.numberItem">
                                                            <!-- <div
                                                                class="form_upload ajax_response alert dismissable alert-success">
                                                                Đã thay đổi thành công</div> -->
                                                        </form>
                                                        <span class="textTooltip tooltipstered">{{ detail.numberItem
                                                            }}/{{ detail.numberItem }}/0</span>
                                                    </td>
                                                    <td class="align-center ">
                                                        <p class="big"><span>{{
                                                            CommonUtils.formatNumber(detail.totalPrice) }} đ</span>
                                                        </p>
                                                        <p><span>{{ detail.numberItem }} x {{
                                                            CommonUtils.formatNumber(detail.itemPrice *
                                                                commonStore.exchange_rate) }}</span></p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                </tr>
                                                <tr class="seller" style="background:#fcebf2 !important;">
                                                    <td colspan="3" class="text-right"><span class="big">Tổng số lượng /
                                                            Tổng tiền hàng</span></td>
                                                    <td class="align-center"><span class="big">{{ order ?
                                                        order.orderDetails.reduce((sum, item) => sum +
                                                            item.numberItem, 0) : 0 }}/{{ order ?
                                                                order.orderDetails.reduce((sum, item) => sum +
                                                                    item.numberItem, 0) : 0 }}/0</span></td>
                                                    <td class="align-center"><span class="big">{{ order ?
                                                        CommonUtils.formatNumber(order.orderDetails.reduce((sum,
                                                            item) => sum + item.totalPrice, 0)) : 0 }}đ (¥{{ order ?
                                                                CommonUtils.formatNumberFloat(order.orderDetails.reduce((sum,
                                                                    item) => sum + item.totalPriceNDT, 0)) : 0 }})</span>
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
                                                <tr v-for="(pkg, idx) in packages">
                                                    <td>{{ idx + 1 }}</td>
                                                    <td>{{ pkg.packageCode }}</td>
                                                    <td>{{ pkg.shipCode }}</td>
                                                    <td>{{ pkg.weigh ? pkg.weigh : 0 }}</td>
                                                    <td>{{ pkg.volume ? pkg.volume : 0 }}</td>
                                                    <td>{{
                                                        CommonUtils.promptPackageStatusNameByValue(
                                                            pkg.status
                                                        )
                                                    }}</td>
                                                    <td>{{ pkg.history }}</td>
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
                                                    <td width="3%">STT</td>
                                                    <td width="10%">Ngày giao dịch</td>
                                                    <td width="10%">Mã giao dịch</td>
                                                    <td width="10%">Loại giao dịch</td>
                                                    <td width="15%">Nội dung</td>
                                                    <td width="10%">Phát sinh($)</td>
                                                    <td width="10%">Trước giao dịch($)</td>
                                                    <td width="10%">Sau giao dịch($)</td>
                                                </tr>
                                                <tr v-for="(
										transaction, index
									) in order.transactionHistory">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>
                                                        {{
                                                            CommonUtils.formatDate(
                                                                transaction.createDate
                                                            )
                                                        }}
                                                    </td>
                                                    <td>{{ transaction.transactionCode }}</td>
                                                    <td>
                                                        {{
                                                            promptOptionsFromValue(
                                                                transaction.type
                                                            )
                                                        }}
                                                    </td>
                                                    <td>{{ transaction.description }}</td>
                                                    <td>
                                                        {{
                                                            CommonUtils.formatNumber(
                                                                transaction.amount
                                                            )
                                                        }}
                                                        (vnđ)
                                                    </td>
                                                    <td>
                                                        {{
                                                            CommonUtils.formatNumber(
                                                                transaction.amountBefore
                                                            )
                                                        }}
                                                        (vnđ)
                                                    </td>
                                                    <td>
                                                        {{
                                                            CommonUtils.formatNumber(
                                                                transaction.amountAfter
                                                            )
                                                        }}
                                                        (vnđ)
                                                    </td>
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
                                                    <td style="width: 5%">STT</td>
                                                    <td style="width: 15%">Mã hóa đơn</td>
                                                    <td style="width: 15%">Số tiền</td>
                                                    <td class="center" style="width: 65%">
                                                        Người thêm
                                                    </td>
                                                </tr>
                                                <tr v-for="(fee, it) in order.otherFees">
                                                    <td>{{ it + 1 }}</td>
                                                    <td>{{ }}</td>
                                                    <td><span class="green">
                                                            {{ CommonUtils.formatNumber(fee.amount) }}
                                                        </span> VND</td>
                                                    <td class="center">
                                                        <span class="red">
                                                            {{ fee.createUser }}
                                                        </span>
                                                    </td>
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
                            <div class="cu-row">
                                <div class="col-md-8 bg_gray">
                                    <div class="col-md-6">
                                        <div class="detail_finance">
                                            <p>Tiền hàng : <strong>{{ order ?
                                                CommonUtils.formatNumber(order.orderChina.totalAmount) : 0
                                                    }}</strong>đ&nbsp;(¥{{ order ?
                                                        CommonUtils.formatNumberFloat(order.orderChina.totalAmount /
                                                            commonStore.exchange_rate) : 0 }})</p>
                                            <p>Phí mua hàng : <strong>{{ order ?
                                                CommonUtils.formatNumber(order.orderChina.purchaseFee) : 0
                                                    }}</strong>đ</p>
                                            <p>VC nội địa TQ : <strong>{{ order ?
                                                CommonUtils.formatNumber(order.orderChina.domesticFees) : 0
                                                    }}</strong>đ (¥{{ order ?
                                                        CommonUtils.formatNumber(order.orderChina.domesticFees /
                                                            commonStore.exchange_rate) : 0 }})</p>
                                            <p>SL Đặt / Mua / Kiểm : <strong>{{ order ? order.orderDetails.reduce((sum,
                                                item) => sum + item.numberItem, 0) : 0 }}/{{ order ?
                                                        order.orderDetails.reduce((sum, item) => sum + item.numberItem, 0) :
                                                        0 }}/0</strong></p><strong>

                                            </strong>
                                        </div><strong>
                                        </strong>
                                    </div><strong>
                                        <div class="col-md-6">
                                            <div class="detail_finance">
                                                <p>VC Quốc Tế : <strong>{{ order ?
                                                    CommonUtils.formatNumber(order.orderChina.internationalShippingFees)
                                                    : 0 }}</strong>đ</p>
                                                <p>Phí khác : <strong>0</strong>đ</p>
                                                <p>Phí kiểm đếm : <strong>{{ order ?
                                                    CommonUtils.formatNumber(order.orderChina.tallyFee) : 0
                                                        }}</strong>đ</p>
                                                <p>Đóng thùng gỗ : <strong>{{ order ?
                                                    CommonUtils.formatNumber(order.orderChina.woodworkingFee) : 0
                                                        }}</strong>đ</p>
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
                                                        <td class="right"><strong><span class="sl_total_price big">{{
                                                            order ?
                                                                CommonUtils.formatNumber(order.orderDetails.reduce((sum,
                                                                    item) => sum + item.totalPrice, 0)) : 0
                                                                    }}</span></strong>đ
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>VC Nội địa TQ <i
                                                                class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                        </td>
                                                        <td class="right"><strong><span class="sl_total_price big">{{
                                                            order ?
                                                                CommonUtils.formatNumber(order.orderChina.domesticFees)
                                                                    : 0 }}</span></strong>đ</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Phí dịch vụ <i
                                                                class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                        </td>
                                                        <td class="right"><strong><span class="sl_total_price big">{{
                                                            order ?
                                                                CommonUtils.formatNumber(order.orderChina.purchaseFee)
                                                                    : 0 }}</span></strong> đ
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Phí VC QT <i
                                                                class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                        </td>
                                                        <td class="right"><strong><span class="sl_total_price big">{{
                                                            order ?
                                                                CommonUtils.formatNumber(order.orderChina.internationalShippingFees)
                                                                    : 0 }}</span></strong> đ</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Phí kiểm đếm <i
                                                                class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                        </td>
                                                        <td class="right"><strong><span class="sl_total_price big">{{
                                                            order ?
                                                                CommonUtils.formatNumber(order.orderChina.tallyFee)
                                                                    : 0 }}</span></strong> đ</td>
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
                                                        <td class="right"><strong><span class="sl_total_price big red">

                                                                </span>{{ order ?
                                                                    CommonUtils.formatNumber(order.orderChina.totalAmount) :
                                                                    0 }}</strong>
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
                                                                    class="sl_total_price big green">{{ order ?
                                                                        CommonUtils.formatNumber(order.orderChina.paid) : 0
                                                                    }}</span></strong> đ
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Cần thanh toán <i
                                                                class="textTooltip fa fa-question-circle tooltipstered"></i>
                                                        </td>
                                                        <td class="right"><strong><span
                                                                    class="sl_total_price big lightblue">{{ order ?
                                                                        CommonUtils.formatNumber(order.orderChina.notPaid) :
                                                                        0 }}</span></strong>
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
                                                    <tr v-for="(itm, id) in order.complains">
                                                        <td>{{ id + 1 }}</td>
                                                        <td>{{ order.orderDetails.filter($ => $.id ==
                                                            itm.productComplain)[0].itemTitle }}</td>
                                                        <td>{{ itm.price }}</td>
                                                        <td>{{ itm.total }}</td>
                                                        <td>{{ CommonUtils.promptComplainStatusNameByValue(itm.status)
                                                            }}</td>
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

            packages: [],

            isDataReady: false,

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
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                return;
            }
            this.listInventories = res.data;
            loader.hide();
        },
        promptLocationByInventoryId(id) {
            return this.listInventories[id] ? this.listInventories[id].location : '';
        },
        promptNameByInventoryId(id) {
            return this.listInventories[id] ? this.listInventories[id].name : '';
        },
        async getListPackage(orderId) {
            const loader = this.$loading.show();
            const res = await ApiCaller.get(
                ROUTES.Package.findByOrderId(orderId)
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
            this.packages = res.data;
        },
        async getDetail(id) {
            let loader = this.$loading.show()
            const res = await ApiCaller.get(ROUTES.Order.getDetail(id));
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                return;
            }
            this.order = res.data;
            await this.getListPackage(this.order.orderChina.id);
            this.order.orderChina.depositDate = this.formatDate(this.order.orderChina.depositDate)
            this.order.orderChina.depositDate = this.formatDate(this.order.orderChina.depositDate)
            this.order.orderChina.dateOfPurchase = this.formatDate(this.order.orderChina.dateOfPurchase)
            this.order.orderChina.dateOfChinaInventory = this.formatDate(this.order.orderChina.dateOfChinaInventory)
            this.order.orderChina.dateOfVietNamInventory = this.formatDate(this.order.orderChina.dateOfVietNamInventory)
            this.order.orderChina.dateDone = this.formatDate(this.order.orderChina.dateDone)
            this.order.orderChina.dateDelete = this.formatDate(this.order.orderChina.dateDelete)
            let complainProductId = [];
            if (this.order.complains.length > 0) {
                complainProductId = this.order.complains.map($ => $.productComplain)
            }
            this.order.orderDetails.forEach($ => {
                if (complainProductId.includes($.id)) {
                    $.complains = this.order.complains.filter(el => el.productComplain == $.id)
                }
            })
            this.woodWorkEnable = this.order.orderChina.isWoodworkingFee;
            this.tallyEnable = this.order.orderChina.isTallyFee;
            this.isDataReady = true;
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
        formatDate(timestamp) {
            if (timestamp === null) return '';
            const date = new Date(timestamp);

            // Extract date components
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');

            // Construct the formatted date string
            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            return formattedDate;
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
                    return 'daduyet';
                case 2:
                    return 'dathanhtoan';
                case 3:
                    return 'damuahang';
                case 4:
                    return 'hangdave';
                case 5:
                    return 'hangdave';
                case 6:
                    return 'hangdave';
                case 7:
                    return 'chokhieunai';
                case 8:
                    return 'daketthuc';
                case 9:
                    return 'dahuy';
            }
        },
        moveToDiv(selector) {
            document.querySelector(selector).scrollIntoView()
        },
        async toggleWoodWork(event) {
            let loader = this.$loading.show();
            const value = event.target.checked;
            const payload = {
                id: this.orderId,
                isWoodworkingFee: value,
            }
            const res = await ApiCaller.post(ROUTES.Order.updateOrderStatus, payload);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(`Chuyển trạng thái đóng gỗ thành công`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                this.getDetail(this.orderId)
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
        },
        async toggleTally(event) {
            let loader = this.$loading.show();
            const value = event.target.checked;
            const payload = {
                id: this.orderId,
                isTallyFee: value,
            }
            const res = await ApiCaller.post(ROUTES.Order.updateOrderStatus, payload);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(`Chuyển trạng thái kiểm đếm thành công`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                this.getDetail(this.orderId)
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
        },
        async handleChangeQuantity(event) {
            let loader = this.$loading.show();
            const value = parseInt(event.target.value);
            const oid = parseInt(event.target.attributes.oid.value);
            this.order.orderDetails.filter($ => $.id === oid)
                .forEach(detail => detail.numberItem = value);
            const payload = {
                id: oid,
                numberItem: value,
            };
            const res = await ApiCaller.post(ROUTES.Order.updateOrderItem, payload);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(`Thay đổi số lượng sản phẩm thành công`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                this.getDetail(this.orderId)
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
        },
        async updateDescription(detail) {
            const loader = this.$loading.show();
            const payload = {
                id: detail.id,
                description: detail.description,
            }
            const res = await ApiCaller.post(ROUTES.Order.updateOrderItem, payload);
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            } else {
                this.$toast.success(`Cập nhật mô tả cho sản phẩm ${detail.itemTitle} thành công`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
        },
        async handleFileChange(e, detail) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0]
                const fileSize = Math.round((file.size / 1024 / 1024) * 100) / 100; // Size in MB
                const fileExtension = file.name.split(".").pop().toLowerCase(); // Get file extension
                const isImage = ["jpg", "jpeg", "png"].includes(fileExtension); // Check if file is an image

                // Optional: Validate file size (e.g., less than 5MB)
                if (fileSize <= 2) {
                    if (isImage) {
                        const loader = this.$loading.show();
                        const data = new FormData();
                        data.append("file", file);
                        const res = await ApiCaller.postFormData(ROUTES.Complain.uploadFile, data);
                        loader.hide();
                        detail.imagePath = res.data.url;
                    } else {
                        this.$toast.error(`Chỉ hỗ trợ định dạng ảnh jpg, jpeg, png`, {
                            title: 'Thông báo',
                            position: 'top-right',
                            autoHideDelay: 7000,
                        })
                    }
                } else {
                    this.$toast.error(`Dung lượng file vượt quá 2MB`, {
                        title: 'Thông báo',
                        position: 'top-right',
                        autoHideDelay: 7000,
                    })
                }
            }
        },
        async handleComplain(detail) {
            if (detail.complainIssue == null || detail.complainIssue.length == 0) {
                this.$toast.error(`Nội dung khiếu nại bắt buộc nhập`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                return;
            }
            const payload = {
                orderId: this.orderId,
                productComplain: detail.id,
                complainDescription: detail.complainIssue,
                complainImagePath: detail.imagePath,
                price: detail.itemPrice,
                total: detail.numberItem,
            }
            const loader = this.$loading.show();
            const res = await ApiCaller.post(ROUTES.Complain.create, payload);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(`Tạo khiếu nại cho sản phẩm thành công`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                this.getDetail(this.orderId)
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
        },
        genImageSrc(path) {
            return process.env.BASE_URL + ROUTES.Complain.getFile + '?fileName=' + path;
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