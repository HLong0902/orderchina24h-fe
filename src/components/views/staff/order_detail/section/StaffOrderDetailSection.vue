<script setup>
import CONSTANT from "../../../../../constants/constants";
import ROUTES from "../../../../../constants/routeDefine";
import { useCommonStore } from "../../../../../store/CommonStore";
import ApiCaller from "../../../../utils/ApiCaller";
import CommonUtils from "../../../../utils/CommonUtils";
</script>

<!-- template section -->
<template>
    <!-- <center>
		<p class="red big">
			Chú ý : Chỉ kiểm đểm số lượng khi phí dịch vụ &lt;= 2%
		</p>
	</center> -->
    <div :key="renderKey" class="order clearfix" v-if="isDataReady">
        <div class="bg_white box_info" style="display: flex">
            <div class="col-md-6" style="padding: 15px !important">
                <h3 class="subtitle">
                    <fa icon="newspaper" aria-hidden="true"></fa> Thông tin đơn hàng
                </h3>
                <div class="cu-row">
                    <div class="col-md-12">
                        <table class="table borderless no_margin">
                            <tbody>
                                <tr>
                                    <td><strong>Đơn hàng</strong></td>
                                    <td>
                                        <h3 class="blue">
                                            {{ order.orderChina.orderCode }}
                                        </h3>
                                    </td>
                                </tr>
                                <tr class="">
                                    <td>
                                        <strong>Tư vấn viên / Khách hàng</strong>
                                    </td>
                                    <td>
                                        <span class="red big">{{
                                            getStaffById(order.orderChina.staffId)
                                        }}</span>
                                        /
                                        <span class="blue big">{{ customerInfo.username }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <hr />
                                    </td>
                                </tr>

                                <tr v-if="CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_KHO">
                                    <td><strong>Đóng gỗ</strong></td>
                                    <td>
                                        <input :disabled="CommonUtils.getRole() == CONSTANT.ROLE.NHAN_VIEN_TU_VAN
                                            " @click="toggleWoodWork" style="width: 20px; height: 20px" type="checkbox"
                                            name="is_wood_pack" v-model="woodWorkEnable" />
                                    </td>
                                </tr>
                                <tr v-if="CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_KHO">
                                    <td><strong>Kiểm đếm</strong></td>
                                    <td>
                                        <input :disabled="CommonUtils.getRole() == CONSTANT.ROLE.NHAN_VIEN_TU_VAN
                                            " @click="toggleTally" style="width: 20px; height: 20px" type="checkbox"
                                            name="is_order_checked" v-model="tallyEnable" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="cu-row" style="display: flex">
                    <hr />
                    <div class="col-md-6">
                        <table class="table borderless no_margin">
                            <tbody>
                                <tr>
                                    <td><strong>Ngày gửi đơn</strong></td>
                                    <td>
                                        <span class="bold">{{ order.orderChina.createDate }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Trạng thái</strong></td>
                                    <td>
                                        <strong class="big"><span :class="promptClassByStatusValue(order.orderChina.status)
                                            ">{{
                                                CommonUtils.promptOrderStatusNameByValueAdmin(
                                                    order.orderChina.status,
                                                )
                                            }}</span>&nbsp;
                                            <fa id="tooltip-target-1" icon="question-circle"></fa>
                                            <b-tooltip style="min-width: 300px;" placement="left" variant="new-variant"
                                                target="tooltip-target-1" triggers="hover">
                                                <div style="
                                                        font-size: 14px;
                                                        font-weight: 400;
                                                        margin: 0;
                                                        padding: 0;
                                                    ">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td style="padding: 5px; text-align: left">
                                                                    Đã gửi đơn
                                                                </td>
                                                                <td style="padding: 5px; text-align: right">
                                                                    {{ order?.orderChina?.createUser }} -
                                                                    {{
                                                                        order ? order.orderChina.createDate : "-"
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px; text-align: left">
                                                                    Đã đặt cọc
                                                                </td>
                                                                <td style="padding: 5px; text-align: right">
                                                                    {{ order?.orderChina?.depositUser }} -
                                                                    {{
                                                                        order ? order.orderChina.depositDate : "-"
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px; text-align: left">
                                                                    Đã mua hàng
                                                                </td>
                                                                <td style="padding: 5px; text-align: right">
                                                                    {{ order?.orderChina?.userOfPurchase }} -
                                                                    {{
                                                                        order
                                                                            ? order.orderChina.dateOfPurchase
                                                                            : "-"
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px; text-align: left">
                                                                    Hàng đã về kho TQ
                                                                </td>
                                                                <td style="padding: 5px; text-align: right">
                                                                    {{ order?.orderChina?.userOfChinaInventory }}
                                                                    -
                                                                    {{ order.orderChina?.dateOfChinaInventory }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px; text-align: left">
                                                                    Đang vận chuyển TQ - VN
                                                                </td>
                                                                <td style="padding: 5px; text-align: right">
                                                                    {{ order?.orderChina?.userOfChinaInventory }}
                                                                    -
                                                                    {{
                                                                        order
                                                                            ? order.orderChina.dateOfChinaInventory
                                                                            : "-"
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px; text-align: left">
                                                                    Hàng đã về kho VN
                                                                </td>
                                                                <td style="padding: 5px; text-align: right">
                                                                    {{
                                                                        order?.orderChina?.userOfVietNamInventory
                                                                    }}
                                                                    -
                                                                    {{
                                                                        order
                                                                            ? order.orderChina.dateOfVietNamInventory
                                                                            : "-"
                                                                    }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px; text-align: left">
                                                                    Đã giao
                                                                </td>
                                                                <td style="padding: 5px; text-align: right">
                                                                    {{ order?.orderChina?.userDelivery }} -
                                                                    {{ order ? order.orderChina.delivery : "-" }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px; text-align: left">
                                                                    Kết thúc
                                                                </td>
                                                                <td style="padding: 5px; text-align: right">
                                                                    {{ order?.orderChina?.userUpdateDateDone }} -
                                                                    {{ order ? order.orderChina.dateDone : "-" }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px; text-align: left">
                                                                    Hủy
                                                                </td>
                                                                <td style="padding: 5px; text-align: right">
                                                                    {{ order?.orderChina?.userDelete }} -
                                                                    {{
                                                                        order ? order.orderChina.dateDelete : "-"
                                                                    }}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </b-tooltip>
                                        </strong>
                                        <div id="tipOrderStatusHistory278574" class="tipContent hidden">
                                            <div style="width: 400px">
                                                <table class="table borderless">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <strong>Đã gửi đơn</strong>
                                                            </td>
                                                            <td class="right">
                                                                <strong>2024-05-07 14:57:14</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Đã đặt cọc</strong>
                                                            </td>
                                                            <td class="right">
                                                                <strong> - </strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Đã mua hàng</strong>
                                                            </td>
                                                            <td class="right">
                                                                <strong> - </strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Hàng đã về kho TQ</strong>
                                                            </td>
                                                            <td class="right">
                                                                <strong> - </strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Hàng đã về kho VN</strong>
                                                            </td>
                                                            <td class="right">
                                                                <strong> - </strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Sẵn sàng giao hàng</strong>
                                                            </td>
                                                            <td class="right">
                                                                <strong> - </strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Kết thúc</strong>
                                                            </td>
                                                            <td class="right">
                                                                <strong> - </strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Hủy</strong>
                                                            </td>
                                                            <td class="right">
                                                                <strong> - </strong>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Kho nhận hàng</strong></td>
                                    <td>
                                        <strong class="big"><span class="bold green">{{
                                            promptNameByInventoryId(order.address.inventoryId)
                                                }}</span>
                                        </strong>
                                        /
                                        <span class="blue">{{
                                            promptLocationByInventoryId(order.address.inventoryId)
                                        }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-6">
                        <table class="table borderless no_margin">
                            <tbody>
                                <tr>
                                    <td><strong>Tỷ giá</strong></td>
                                    <td>
                                        <strong class="big">1¥ =
                                            {{ order?.orderChina?.exchangeRate }}
                                        </strong>
                                        đ
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Biểu phí dịch vụ </strong></td>
                                    <td>
                                        <strong class="big">{{ order.orderChina.purchaseFeePerSent }}
                                        </strong>
                                        %&nbsp;<fa id="tooltip-target-2" icon="question-circle"></fa>
                                        <b-tooltip ref="tooltipPDV" style="min-width: 300px;" placement="top"
                                            variant="new-variant" target="tooltip-target-2" triggers="hover">
                                            <div v-if="
                                                !order?.orderLogsUpdateInformation?.some(
                                                    (el) =>
                                                        el.code == CONSTANT.ORDER_LOGS_CODE.PHI_DICH_VU,
                                                )
                                            " style="
                                                font-size: 14px;
                                                font-weight: 400;
                                                margin: 0;
                                                padding: 0;
                                                text-align: left !important;
                                            ">
                                                <div>
                                                    <span class="bold">Phí dịch vụ sẽ tính theo tổng tiền hàng</span>
                                                </div>
                                                <div>
                                                    <span v-for="(item, idx) in commonStore.service_fee">
                                                        <span>{{ item.nameDescription }}</span>
                                                        ===>
                                                        <span>{{ item.value }}%</span>
                                                        <br v-if="idx != commonStore.service_fee.length - 1" />
                                                    </span>
                                                </div>
                                            </div>
                                            <div v-else>
                                                <span v-if="order.orderChina.purchaseFeePerSent <= 0.00001">Sử dụng phí
                                                    riêng được thiết lập cho khách hàng</span>
                                                <span v-else v-for="(log, idx) in order.orderLogsUpdateInformation">
                                                    <span v-if="
                                                        log.code == CONSTANT.ORDER_LOGS_CODE.PHI_DICH_VU
                                                    ">
                                                        {{ log.log }}
                                                    </span>
                                                </span>
                                            </div>
                                        </b-tooltip>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Giá vận chuyển /
                                            <span>{{ order?.orderChina?.isVolume ? "Khối" : "KG" }}</span></strong>
                                    </td>
                                    <td>
                                        <strong class="big">
                                            <span class="red">{{
                                                CommonUtils.formatNumber(order?.orderChina?.internationalShippingFees)
                                            }}
                                                / <span>{{ order?.orderChina?.isVolume ? "Khối" : "KG" }}</span>
                                            </span>
                                        </strong>
                                        &nbsp;<fa id="tooltip-target-3" icon="question-circle"></fa>
                                        <b-tooltip style="min-width: 300px" placement="top" variant="new-variant"
                                            target="tooltip-target-3" triggers="hover">
                                            <div style="
                                                font-size: 14px;
                                                font-weight: 400;
                                                margin: 0;
                                                padding: 0;
                                                ">

                                                <div>
                                                    <span v-if="!order?.orderLogsUpdateInformation?.some(
                                                        (el) =>
                                                            el.code == CONSTANT.ORDER_LOGS_CODE.GIA_VAN_CHUYEN,
                                                    )" class="bold"> Biểu phí vận chuyển theo {{
                                                        order?.orderChina?.isVolume == true ? "khối " : "cân nặng"
                                                        }} </span>
                                                </div>

                                                <table>
                                                    <tbody>
                                                        <span v-if="
                                                            !order?.orderLogsUpdateInformation?.some(
                                                                (el) =>
                                                                    el.code == CONSTANT.ORDER_LOGS_CODE.GIA_VAN_CHUYEN,
                                                            )">
                                                            <tr v-if="!order?.orderChina?.isVolume" v-for="(
                                                                item, idx
                                                            ) in commonStore.lst_fee_by_weight">
                                                                <td>
                                                                    <span style="float: left">
                                                                        {{ item.description }} ===>  {{ !parseInt(item.value) ? item.value :
                                                                            CommonUtils.formatNumber(item.value) +  ' đ'}}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            <tr v-else v-for="(
                                                                item, idx
                                                            ) in commonStore.batch_goods_volume">
                                                                <td>
                                                                    <span style="float: left">
                                                                        {{ item.description }}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span style="float: left">
                                                                        {{ !parseInt(item.value) ? item.value :
                                                                            CommonUtils.formatNumber(item.value) }} đ
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        </span>
                                                        <span v-else>
                                                            <tr
                                                                v-for="(
                                                                log, idx
                                                            ) in order.orderLogsUpdateInformation.filter($ => $.code == CONSTANT.ORDER_LOGS_CODE.GIA_VAN_CHUYEN)">
                                                                <span>
                                                                    {{ log.log }}
                                                                </span>
                                                            </tr>
                                                        </span>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </b-tooltip>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="cu-row" style="display: flex">
                    <hr />
                    <div class="col-md-6">
                        <table class="table borderless no_margin">
                            <tbody>
                                <tr>
                                    <td><strong>Tiền hàng</strong></td>
                                    <td>
                                        <span class="big">{{
                                            CommonUtils.formatNumber(order.orderChina.totalItemMoney)
                                        }}</span>
                                        đ (<span class="red big">{{
                                            CommonUtils.formatNumberFloat(
                                                order.orderChina.totalItemMoneyNDT,
                                            )
                                        }}</span>
                                        NDT) /
                                        <span class="red big">{{ order.orderChina.totalProduct }} SP</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td><strong>Phí mua hàng</strong></td>
                                    <td>
                                        <span class="big">{{
                                            CommonUtils.formatNumber(
                                                parseFloat(
                                                    CommonUtils.removeCommas(
                                                        order.orderChina.purchaseFee,
                                                    ),
                                                ),
                                            )
                                        }}</span>
                                        đ
                                        <span></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Phí ngoại tệ</strong></td>
                                    <td>
                                        <span class="big">
                                            (<span class="red big">{{
                                                CommonUtils.formatNumberFloat(order?.orderChina?.foreignCurrencyFees)
                                            }}</span> NDT)
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN">
                                    <td><strong>Phí nội địa</strong></td>
                                    <td>
                                        <span class="big">{{
                                            CommonUtils.formatNumber(
                                                order.orderChina.domesticFeesChina,
                                            )
                                        }}</span>
                                        đ (<span class="red big">{{
                                            CommonUtils.formatNumberFloat(
                                                order?.orderChina?.domesticFeesChinaNDT
                                            )
                                        }}</span>
                                        NDT)
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Phí VC QT</strong></td>
                                    <td>
                                        <span class="big">{{
                                            order?.orderChina?.shippingPrice
                                        }}</span>
                                        đ (<span class="red big">{{ order?.orderChina?.isVolume ?
                                            order?.orderChina?.totalVolume ?? 0 : order?.orderChina?.totalWeight ?? 0
                                            }}</span>
                                        <span>{{
                                            order?.orderChina?.isVolume ? "Khối" : "Kg" }}</span>
                                        )
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Đóng gỗ</strong></td>
                                    <td>
                                        {{
                                            CommonUtils.formatNumber(order.orderChina.woodworkingFee)
                                        }} đ
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Phí kiểm đếm</strong></td>
                                    <td>
                                        <span class="big">{{
                                            CommonUtils.formatNumber(order.orderChina.tallyFee)
                                        }}</span>
                                        đ
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Phí khác</strong></td>
                                    <td>
                                        <span class="big">{{
                                            CommonUtils.formatNumber(order.orderChina.otherFees)
                                        }}</span>
                                        đ
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-6">
                        <table class="table borderless no_margin">
                            <tbody>
                                <tr>
                                    <td><strong>Tổng tiền</strong></td>
                                    <td>
                                        <span class="green big">{{
                                            CommonUtils.formatNumber(order.orderChina.totalAmount)
                                        }}</span>
                                        <span class="small">đ</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Đã thanh toán</strong></td>
                                    <td>
                                        <span class="big green">{{
                                            order?.orderChina?.status != 1
                                                ? CommonUtils.formatNumber(
                                                    order?.orderChina?.paid,
                                                )
                                                : 0
                                        }}</span>
                                        đ
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Còn thiếu</strong></td>
                                    <td>
                                        <span class="big blue">{{
                                            order?.orderChina?.status != 1
                                                ? CommonUtils.formatNumber(
                                                    order.orderChina.notPaid,
                                                )
                                                : CommonUtils.formatNumber(
                                                    order.orderChina.totalAmount,
                                                )
                                        }}</span>
                                        đ
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="cu-row" v-if="CommonUtils.getRole() == CONSTANT.ROLE.ADMIN">
                    <hr />
                    <table class="table borderless no_margin">
                        <tr>
                            <td width="5%">
                                <span class="bold">Phí dịch vụ (%)</span>
                            </td>
                            <td width="5%">
                                <span class="bold">Giá vận chuyển / {{ order?.orderChina?.isVolume == true ? "Khối" :
                                    "KG" }}</span>
                            </td>
                            <td width="5%">
                                <span class="bold">Tỷ giá</span>
                            </td>
                            <td width="5%">
                                <span class="bold">Trạng thái</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span style="display: flow-root">
                                    <input style="width: 80%;" v-model="formAdmin.purchaseFeePerSent" size="6" value="0"
                                        type="number" />
                                    &nbsp;
                                    <a class="button-link" @click="handlepurchaseFee(order.orderChina)">Lưu</a>
                                </span>
                            </td>
                            <td>
                                <span style="display: block">
                                    <input style="width: 80%;" v-model="formAdmin.internationalShippingFees"
                                        @input="formatShippingPrice" size="12" value="0" type="number" />
                                    &nbsp;
                                    <a class="button-link" @click="handleShippingPrice(order.orderChina)">Lưu</a>
                                </span>
                            </td>
                            <td>
                                <span style="display: block">
                                    <input style="width: 80%;" v-model="formAdmin.exchangeRate"
                                        @input="formatExchangeRage" size="6" value="0" type="text" />
                                    &nbsp;
                                    <a class="button-link" @click="handleExchangeRate(order.orderChina)">Lưu</a>
                                </span>
                            </td>
                            <td>
                                <span style="display: table-caption">
                                    <select v-model="order.orderChina.status" style="width: 120px; height: 35px">
                                        <option v-for="(value, key) in CONSTANT.ORDER_STATUS" :key="key" :value="value">
                                            {{ CommonUtils.promptOrderStatusNameByValueAdmin(value) }}
                                        </option>
                                    </select>
                                    <a class="button-link" @click="handleStatus(order.orderChina)">Lưu</a>
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="col-md-6" style="padding: 15px !important">
                <div class="cu-row">
                    <h3 class="subtitle">
                        <fa icon="user" aria-hidden="true"></fa> THÔNG TIN KHÁCH HÀNG
                    </h3>
                    <table class="table borderless no_margin">
                        <tbody>
                            <tr>
                                <td><strong>Tài khoản</strong></td>
                                <td>
                                    <strong>{{ customerInfo.username }}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Tên khách hàng</strong></td>
                                <td>
                                    <strong>{{ customerInfo.fullName }}</strong>
                                </td>
                            </tr>
                            <tr v-if="CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_MUA_HANG">
                                <td><strong>Địa chỉ</strong></td>
                                <td>
                                    <strong>{{ customerInfo.address }}</strong>
                                </td>
                            </tr>
                            <tr v-if="CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_MUA_HANG">
                                <td><strong>Số ĐT</strong></td>
                                <td>
                                    <strong>{{ customerInfo.phone }}</strong>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Tư vấn</strong></td>
                                <td>
                                    <span class="red">
                                        {{ getStaffById(order.orderChina.staffId) }}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <h4>
                                        Số dư hiện tại :
                                        <span class="bg_green">{{
                                            CommonUtils.formatNumber(
                                                info.customerDTO.availableBalance,
                                            )
                                        }}</span>
                                        vnđ
                                    </h4>
                                    <a v-if="CommonUtils.getRole() !== CONSTANT.ROLE.NHAN_VIEN_MUA_HANG && CommonUtils.getRole() !== CONSTANT.ROLE.NHAN_VIEN_KHO"
                                        target="_blank" style="cursor: pointer;"
                                        @click="viewTransDetail(order.customerInfo.id)" class="green">Xem lịch sử giao
                                        dịch &gt;&gt;</a>
                                    <!-- <div class="customer_credit_owe owe_10860" data-id="10860"></div> -->
                                    <!-- <a target="_blank" -->
                                    <!-- 	href="https://ql.hangquangchau24h.vn/transaction/reportowe?filter_username=nhungchia" -->
                                    <!-- 	class="green">Xem chi tiết &gt;&gt;</a>  -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- các thao tác trên đơn hàng -->
                <div class="cu-row"
                    v-if="CommonUtils.getRole() == CONSTANT.ROLE.ADMIN || CommonUtils.getRole() == CONSTANT.ROLE.NHAN_VIEN_KHO">
                    <hr />
                    <div class="col-md-12">
                        <div class="button_confirm clearfix">
                            <div>
                                <a v-if="CommonUtils.getRole() === CONSTANT.ROLE.ADMIN" @click="openModal('naptien')"
                                    class="button-link special-orange">Nạp tiền vào ví >></a>
                                &nbsp;
                                <a v-if="CommonUtils.getRole() === CONSTANT.ROLE.ADMIN" @click="openModal('ruttien')"
                                    class="button-link special-blue">Tạo GD rút tiền >></a>
                                &nbsp;
                                <a v-if="CommonUtils.getRole() === CONSTANT.ROLE.ADMIN"
                                    class="button-link special-green" @click="handleSettleOrder">Tất toán đơn hàng
                                    >></a>
                                &nbsp;
                                <a @click="openModal('add-addons')" class="button-link special-orange">Thêm chi phí khác
                                    >></a>
                            </div>
                            <b-modal hide-header-close centered title-html="Thêm chi phí khác" id="add-addons">
                                <div>
                                    <span class="green">Mã giao dịch: </span><span class="bold">{{ otherFeeRes.id
                                        }}</span>
                                    <br />
                                    <br />
                                    <span class="red">Số tiền: </span><input @input="formatOtherFee"
                                        v-model="otherFee.amount" placeholder="0" size="20"
                                        type="text" />&nbsp;&nbsp;VNĐ
                                    <br />
                                    <br />
                                    <span class="bold">Ghi chú: </span><input v-model="otherFee.description" size="50"
                                        maxlength="200" type="text" />
                                </div>
                                <template #modal-footer>
                                    <b-button variant="outline-primary" style="font-size: 12px" squared
                                        @click="createOtherFee" class="squared-button">
                                        Lưu
                                    </b-button>
                                    <b-button variant="outline-danger" style="font-size: 12px" squared
                                        class="squared-button" @click="hideModal(`add-addons`)">
                                        Đóng
                                    </b-button>
                                </template>
                            </b-modal>
                            <b-modal hide-header-close title-html="Nạp tiền vào ví khách hàng" id="naptien">
                                <div style="font-size: 1rem">
                                    <span class="green">Mã giao dịch: </span><span class="bold">{{ naptien.id }}</span>

                                    <span style="float: right">
                                        <span class="black">Loại giao dịch: &nbsp;</span>
                                        <select @click="validateFormNapTien" v-model="naptien.tranType">
                                            <option value="1">Nạp tiền</option>
                                            <option value="3">Tất toán</option>
                                            <option value="4">Hoàn tiền</option>
                                            <option value="6">Thanh toán vận đơn</option>
                                        </select>
                                    </span>
                                    <div style="float: right" v-if="errors.tranType" class="bubble-message">{{
                                        errors.tranType }}</div>
                                    <br />
                                    <br />
                                    <div>
                                        <span class="red">Số tiền: &nbsp;</span>
                                        <input @input="formatInputNap" v-model="naptien.amount" placeholder="0"
                                            size="20" type="number" />&nbsp;&nbsp;VNĐ
                                    </div>
                                    <span style="margin-left: 4rem" id="numFormatResult" class="red">{{
                                        naptien.amountText }}</span> <b>VNĐ</b>
                                    <div v-if="errors.amount" class="bubble-message">{{ errors.amount }}</div>
                                    <br />
                                    <br />
                                    <div class="form-group">
                                        <label for="comment" class="bold control-label col-sm-2">Ghi chú: </label>
                                        <textarea v-model="naptien.description" rows="5" name="payment_note"
                                            class="inputAccount form-control"></textarea>
                                    </div>
                                </div>
                                <template #modal-footer>
                                    <b-button variant="outline-primary" squared @click="submitNapTien" class="button">
                                        Xác nhận
                                    </b-button>
                                    &nbsp;
                                    <b-button variant="outline-danger" squared class="button"
                                        @click="hideModal(`naptien`)">
                                        Đóng
                                    </b-button>
                                </template>
                            </b-modal>
                            <b-modal hide-header-close title-html="Tạo GD rút tiền" id="ruttien">
                                <div style="font-size: 1rem">
                                    <span class="green">Mã giao dịch: </span><span class="bold">{{ ruttien.id }}</span>

                                    <span style="float: right">
                                        <span class="black">Loại giao dịch: &nbsp;</span>
                                        <select @click="validateFormRutTien" v-model="ruttien.tranType">
                                            <option value="0">Rút tiền</option>
                                            <option value="3">Tất toán</option>
                                            <option value="4">Hoàn tiền</option>
                                            <option value="6">Thanh toán vận đơn</option>
                                        </select>
                                    </span>
                                    <div style="float: right" v-if="errors.tranType" class="bubble-message">{{
                                        errors.tranType }}</div>
                                    <br />
                                    <br />
                                    <div>
                                        <span class="red">Số tiền: &nbsp;</span>
                                        <input @input="formatInputRut" v-model="ruttien.amount" placeholder="0"
                                            size="20" type="number" />
                                    </div>
                                    <span style="margin-left: 4rem" id="numFormatResult" class="red">{{
                                        ruttien.amountText }}</span> <b>VNĐ</b>
                                    <div v-if="errors.amount" class="bubble-message">{{ errors.amount }}</div>
                                    <br />
                                    <br />
                                    <div class="form-group">
                                        <label for="comment" class="bold control-label col-sm-2">Ghi chú: </label>
                                        <textarea v-model="naptien.description" rows="5" name="payment_note"
                                            class="inputAccount form-control"></textarea>
                                    </div>
                                </div>
                                <template #modal-footer>
                                    <b-button variant="outline-primary" squared @click="submitRutTien" class="button">
                                        Xác nhận
                                    </b-button>
                                    &nbsp;
                                    <b-button variant="outline-danger" squared class="button"
                                        @click="hideModal(`ruttien`)">
                                        Đóng
                                    </b-button>
                                </template>
                            </b-modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sản phẩm -->
        <div class="bg_white box_info" id="products">
            <h3 class="subtitle">
                <fa icon="shopping-cart" aria-hidden="true"></fa> DANH SÁCH SẢN PHẨM
            </h3>
            <div>
                <a class="bt_yellow"> Ghi chú toàn đơn:</a>&nbsp;
                <span>{{ order?.orderChina?.description }}</span>
            </div>
            <div class="cu-row col-md-12" style="display: flex">
                <div class="col-md-6">
                    <form v-if="
                        order.orderChina.status < 7 &&
                        order.orderChina.status != 0 &&
                        CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN
                    " action="" class="ajaxFormOrderStatusDelete" method="POST">
                        <a class="button-link black" @click="cancelOrder"> Hủy đơn </a>
                        <div class="ajax_response alert dismissable"></div>
                    </form>
                    <a v-else @click.prevent="(event) => event.preventDefault()" class="button-link special-gray">
                        Huỷ đơn </a>&nbsp;
                    <form v-if="
                        order.orderChina.status < 3 &&
                        order.orderChina.status != 0 &&
                        CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN
                    " action="" class="ajaxFormOrderStatusDelete" method="POST">
                        <a class="button-link special-green" @click="buyOrder">
                            Đã mua hàng
                        </a>
                        <div class="ajax_response alert dismissable"></div>
                    </form>
                    <a v-else @click.prevent="(event) => event.preventDefault()" class="button-link special-gray">
                        Đã mua hàng
                    </a>
                </div>
            </div>
            <div class="gridtable clearfix">
                <table style="word-break: break-all;">
                    <tbody>
                        <tr>
                            <td width="3%">STT</td>
                            <td width="44%">Sản phẩm</td>
                            <td width="10%">Giá(NDT)</td>
                            <td width="15%">Số lượng</td>
                            <td width="7%">Tổng tiền (NDT)</td>

                            <td width="20%"></td>
                        </tr>

                        <tr>
                            <td colspan="8">
                                Người bán :
                                <span class="blue">
                                    {{
                                        order.orderDetails.length > 0
                                            ? order.orderDetails[0].sellerId
                                            : "-"
                                    }}</span>
                            </td>
                        </tr>

                        <tr v-for="(detail, index) in order.orderDetails" class=""
                            :class="{ outofproduct: detail.status == 0 }">
                            <td>{{ index + 1 }}</td>
                            <td>
                                <div class="image">
                                    <a :href="detail.itemLink" target="_blank"><img :src="detail.itemImage"
                                            width="100px" height="100px" /></a>
                                </div>
                                <div class="info">
                                    <div class="price">
                                        <a :href="detail.itemLink" target="_blank">
                                            <span style="font-size: 15px;">
                                                <fa icon="jpy" aria-hidden="true"></fa>
                                                {{ detail.itemPrice }}
                                            </span>
                                            -
                                            <span v-if="order.orderChina.type != 3">
                                                {{ decodeURIComponent(detail.itemTitle) }}
                                            </span>
                                            <span v-else>
                                                <span v-if="!readMore">
                                                    {{ decodeURIComponent(detail.itemLink).slice(0, 100) }}
                                                </span>
                                                <span v-if="readMore">
                                                    {{ decodeURIComponent(detail.itemLink) }}
                                                </span>
                                                <br>
                                            </span>
                                        </a>
                                        <p @click="activateReadMore" class="text-success" style="cursor: pointer">
                                            {{ readMore ? "Thu gọn" : "Xem thêm ..." }}
                                        </p>
                                    </div>
                                    <div class="attributes">
                                        {{ order.orderChina.type == 3 ? detail.itemTitle + " / " : '' }} {{ detail.color
                                        }}; {{
                                        detail.size }}
                                    </div>
                                    <div>
                                        <span>
                                            <span class="bold">Ghi chú: </span>{{ detail.description }}
                                        </span>
                                    </div>
                                    <div>
                                        <span class="bold">Khiếu nại SP:</span>
                                        <div v-for="(item, idx) in detail.complains">
                                            <img style="width: 50px; height: 50px"
                                                :src="genImageSrc(item.complainImagePath)" />
                                            &nbsp;
                                            <span>{{ item.complainDescription }}</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span><strong>Giá ban đầu : </strong></span>
                                <span class="bold">{{ CommonUtils.formatNumberFloat(parseFloat(detail?.itemPriceFix))
                                    }}</span>
                                <input v-if="
                                    (CommonUtils.getRole() == CONSTANT.ROLE.ADMIN ||
                                        CommonUtils.getRole() == CONSTANT.ROLE.NHAN_VIEN_MUA_HANG) && order.orderChina.status != 0
                                " type="number" style="width: 150px" class="num-product" name="qty" :oid="detail.id"
                                    @change="handleChangeItemPrice"
                                    :value="detail.status != 0 ? detail.itemPrice : 0" />
                                <div :class="order.orderChina.status != 9 ? 'bubble-message' : 'bubble-message-remove'"
                                    v-if="
                                        (response.originPrice != null ||
                                            response.originPrice != undefined) &&
                                        response.originPrice.id === detail.id
                                    ">
                                    {{ response?.originPrice?.message }}
                                </div>
                                <div class="red">
                                    <span v-if="detail.status != 0">
                                        {{ CommonUtils.formatNumberFloat6(detail.remunerationItem) }}
                                    </span>
                                    <span v-else>
                                        0
                                    </span>
                                    <span class="green"> (tiền công)</span>
                                </div>
                            </td>
                            <td>
                                <p>
                                    <strong>SL Yêu cầu: {{ detail.numberItemFix }}</strong>
                                </p>
                                <div v-if="
                                    (CommonUtils.getRole() == CONSTANT.ROLE.ADMIN ||
                                        CommonUtils.getRole() == CONSTANT.ROLE.NHAN_VIEN_MUA_HANG) && order.orderChina.status != 0
                                ">
                                    <input type="number" style="width: 50px" class="num-product" name="qty"
                                        :oid="detail.id" @change="handleChangeQuantity" :value="detail.numberItem" />
                                    <div :class="order.orderChina.status != 9 ? 'bubble-message' : 'bubble-message-remove'"
                                        v-if="
                                            (response.originQuantity != null ||
                                                response.originQuantity != undefined) &&
                                            response.originQuantity.id === detail.id
                                        ">
                                        {{ response?.originQuantity?.message }}
                                    </div>
                                </div>
                                <span v-else>
                                    {{ detail.numberItem }}
                                </span>
                                <p>
                                    <a class="button-link special-orange" v-if="detail.status != 0"
                                        @click="handleOutOfProduct(detail)">Hết
                                        hàng</a>
                                    <a class="button-link button_special" v-if="detail.status == 0">Sản phẩm đã hết
                                        hàng</a>
                                </p>
                            </td>
                            <td>
                                <div v-if="detail.status != 0" class="red">
                                    {{ CommonUtils.formatNumberFloat(detail.itemMoney) }}
                                </div>
                                <div v-else class="red">
                                    0
                                </div>
                            </td>

                            <td v-if="index == 0" rowspan="4" class="specials">
                                <!-- UPDATE SHOP ID -->
                                <div>
                                    <div class="parent-div ghost">
                                        <a class="prefix-text" target="_blank">Mã shop: <span class="bold"></span></a>
                                        <input class="style-input label_edit"
                                            v-if="order.orderChina.status != 0 && order_shop_code.filter($ => $ != null).length < 1"
                                            type="text" value="" v-model="shopId" @keyup.enter.prevent="addShopIdSingle"
                                            :readonly="CommonUtils.getRole() == CONSTANT.ROLE.NHAN_VIEN_KHO" />
                                        <input v-else class="style-input label_edit" v-model="shopId" type="text"
                                            @keyup.enter.prevent="updateShopId(shopId, idOfShopOrigin)"
                                            @keypress="preventEnter">
                                    </div>

                                    <div class="ghost"
                                        v-if="(CommonUtils.getRole() === CONSTANT.ROLE.NHAN_VIEN_TU_VAN || CommonUtils.getRole() === CONSTANT.ROLE.ADMIN || CommonUtils.getRole() === CONSTANT.ROLE.NHAN_VIEN_MUA_HANG || CommonUtils.getRole() == CONSTANT.ROLE.NHAN_VIEN_KHO)">
                                        <a target="_blank">Phí nội địa: </a>
                                        <input v-if="order.orderChina.status != 0" type="number" value=""
                                            v-model="domesticFees" class="label_edit"
                                            style="width: 31%; background: #FAFACE; color: green;"
                                            @keyup.enter.prevent="addDomesticFees" />
                                        <span v-else>{{ domesticFees }}</span>
                                    </div>
                                    <div class="ghost"
                                        v-if="(CommonUtils.getRole() === CONSTANT.ROLE.ADMIN || CommonUtils.getRole() === CONSTANT.ROLE.NHAN_VIEN_MUA_HANG)">
                                        <a target="_blank">Phí ship thực: </a>
                                        <input v-if="order.orderChina.status != 0" type="number" value=""
                                            v-model="domesticFeesReal" class="label_edit"
                                            style="width: 25%; background: #FAFACE; color: green;"
                                            @keyup.enter.prevent="addDomesticFeesReal" />
                                        <!--                                        <span v-else>{{ domesticFeesReal }}</span>-->
                                    </div>
                                </div>

                                <div v-if="CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN && CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_KHO"
                                    class="ghost">
                                    <a target="_blank">Thực thanh toán: </a>
                                    <input v-if="order.orderChina.status != 0" type="number"
                                        :value="order.orderChina.paymentCompany"
                                        style="width: 30%; background: #FAFACE; color: green;"
                                        @change="(e) => (paymentCompany = e.target.value)"
                                        :readonly="CommonUtils.getRole() == CONSTANT.ROLE.NHAN_VIEN_KHO"
                                        @keyup.enter.prevent="saveCompanyPayment" class="label_edit" />
                                    <!--                                    <span v-else>{{ order.orderChina.paymentCompany }}</span>-->
                                </div>
                                <div>
                                    <span class="black" v-if="
                                        order.orderChina.paymentCompanyDescriptionStaff != null
                                    ">
                                        {{ order.orderChina.paymentCompanyDescriptionStaff }}
                                    </span>
                                    <br />
                                    <span class="black" style="font-size: 14px"
                                        v-if="order.orderChina.paymentCompanyDescription != null">
                                        {{ order.orderChina.paymentCompanyDescription }}
                                    </span>
                                </div>
                                <div
                                    v-if="(CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN) && order.orderChina.status != 0 && order.orderChina.paymentCompanyDescriptionStaff == null">
                                    <a class="button-link"
                                        v-if="order.orderChina.paymentCompany != null && order?.orderChina?.paymentCompany != 0 && order.orderChina.paymentCompanyDescriptionStaff == null"
                                        @click="addCompanyPayment">Yêu
                                        cầu
                                        thanh toán</a>
                                </div>

                                <hr v-if="CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN" />
                                <div v-if="order.orderChina.status != 0">
                                    <div class="parent-div ghost">
                                        <a class="prefix-text" target="_blank">Thêm mã shop: <span
                                                class="bold"></span></a>
                                        <input type="text" value="" v-model="newShopId" class="style-input label_edit"
                                            @keyup.enter.prevent="addShopId" size="15"
                                            :readonly="CommonUtils.getRole() == CONSTANT.ROLE.NHAN_VIEN_KHO" />
                                    </div>
                                    <div v-for="(item, idx) in order_shop_code_complement">
                                        <div class="parent-div-short ghost" v-if="item">
                                            <a class="prefix-text">
                                                Mã shop:
                                            </a>
                                            <input class="style-input label_edit" :value="item" type="text"
                                                @keyup.enter.prevent="updateShopId($event.target.textContent, idx)"
                                                @keypress="preventEnter">
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <h3 class="uppercase align-center">Danh sách vận đơn</h3>
                                <form v-if="CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN"
                                    @submit.prevent="handleSubmit" action="" class="ajaxFormShip" method="POST">
                                    <div class="vandon_form">
                                        <span style="align-self: center;"></span><input type="text" name="shipid"
                                            v-model="shipCode" @change="validateShipCode"
                                            @keyup.enter.prevent="createPackage" placeholder="Nhập mã vận đơn" />
                                        &nbsp;
                                        <a class="button-link" @click="createPackage">Thêm</a>
                                    </div>
                                </form>
                                <br />
                                <div style="width: 80%; margin-left: 10%" v-if="packages.length > 0">
                                    <span v-for="(pkg, it) in packages">
                                        <span class="blue">
                                            <span :class="promptStyleByPackageStatus(pkg.status)">{{ pkg.shipCode }}
                                                <span v-if="pkg?.weigh > 0 || pkg?.volume > 0">
                                                    ({{ order?.orderChina?.isVolume ? pkg?.volume : pkg?.weigh }} {{
                                                        order?.orderChina?.isVolume ? "Khối" : "Kg" }})
                                                </span>
                                                <br v-if="pkg?.weigh > 0 || pkg?.volume > 0">
                                                <span v-if="pkg?.status >= 6">
                                                    <span>
                                                        <span v-for="(lg, id) in pkg.packageLogs">
                                                            {{ lg.log }}
                                                            <br v-if="id != pkg.packageLogs.length - 1">
                                                        </span>
                                                    </span>
                                                </span>
                                            </span>
                                        </span>
                                        <span style="text-align: center;">
                                            <input v-if="pkg.status == 1" @click="deletePackageById(pkg.id)"
                                                style="background-color: red" type="button" value="Xoá mã" />
                                        </span>
                                        <br>
                                    </span>
                                </div>
                                <br v-if="packages.filter($ => $.status == 1).length > 0" />
                                <!-- <div style="background-color: #d0ffff;">
									<span v-for="(log, it) in order.orderLogsUpdateInformation">
										<div v-if="log != null && log.log != null">
											<span class="red">{{ log.log.split(' ')[0] }}</span>&nbsp;
											<span>{{ log.log.split(' ').slice(1).join(' ') }}</span>&nbsp;
											<span>({{ CommonUtils.formatDate(log.createDate) }})</span>
										</div>
									</span>
								</div> -->

                                <div class="big">
                                    <span>Kiểm : </span> {{ order?.packages.length }}/0
                                    -
                                    <span>Giao : </span> {{ order?.packages.filter($ => $.status ==
                                        CONSTANT.PACKAGE_STATUS.DA_GIAO).length }}/{{ order?.packages.filter($ => $.status ==
                                            CONSTANT.PACKAGE_STATUS.DA_GIAO).length }}
                                    -
                                    <span>CN : </span> {{ order?.orderChina?.isVolume ? order?.orderChina?.totalVolume :
                                        order?.orderChina?.totalWeight }} {{
                                        order?.orderChina?.isVolume ?
                                            "Khối" : "Kg" }}
                                </div>
                                <hr />

                                <div class="sellers_note"
                                    v-if="CommonUtils.getRole() != CONSTANT.ROLE_STAFF.NHAN_VIEN_TU_VAN">
                                    <div v-for="(note, id) in order.orderNotes">
                                        <span class="bold">Ghi chú {{ id + 1 }}: </span>
                                        <span class="red">({{ note.createUser }} -
                                            {{ CommonUtils.formatDate(note.createDate) }})
                                        </span>
                                        <span>{{ note.note }}</span>
                                        <br />
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <a class="bt_yellow" @click="() => (isHideNote = !isHideNote)">Thêm ghi chú</a>
                                    <br />
                                    <textarea v-if="!isHideNote" v-model="order.orderChina.orderNote" class="note_first"
                                        name="order_note" rows="4" cols="30" placeholder="Ghi chú"></textarea>
                                    <br />
                                    <a v-if="!isHideNote" class="button-link"
                                        @click="handleOrderNote(order.orderChina)">Lưu</a>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="5" class="total">
                                <div>
                                    <div class="right">
                                        Sản phẩm :
                                        <span class="green">{{
                                            order.orderChina.totalProduct
                                        }}</span>
                                        | Tổng tiền :
                                        <span class="red">{{
                                            CommonUtils.formatNumberFloat(
                                                parseFloat(
                                                    CommonUtils.removeCommas(
                                                        order.orderChina.totalMoneyNDT,
                                                    ),
                                                ),
                                            )
                                        }}</span>
                                        ( Thực mua :
                                        <span class="green">{{
                                            CommonUtils.formatNumberFloat(
                                                order.orderChina.totalItemMoneyNDT,
                                            )
                                        }}</span>
                                        )
                                        ( Tiền Công :<span class="green">{{
                                            CommonUtils.formatNumberFloat(order?.orderChina?.foreignCurrencyFees)
                                        }}</span>)
                                        <span v-if="
                                            CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN
                                        ">Phí nội địa : </span>
                                        <span v-if="
                                            CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN
                                        " class="green">{{
                                            CommonUtils.formatNumberFloat(
                                                order?.orderChina?.domesticFeesChinaNDT
                                            )
                                        }}</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- tab kiện hàng -->

        <div id="package" class="bg_white box_info">
            <div class="cu-row">
                <div class="col-md-12">
                    <p class="subtitle">
                        <strong>
                            <fa icon="archive" aria-hidden="true"></fa> Danh sách kiện hàng
                        </strong>
                    </p>
                </div>
                <div class="col-md-12">
                    <div class="gridtable class-center">
                        <table>
                            <tbody>
                                <tr class="header-cart-table">
                                    <td style="width: 5%">STT</td>
                                    <td style="width: 20%">Mã kiện</td>
                                    <td style="width: 20%">Mã vận đơn</td>
                                    <td>Cân nặng</td>
                                    <td>Thể tích</td>
                                    <td>Số lượng</td>
                                    <td>Trạng thái</td>
                                    <td>Lịch sử</td>
                                </tr>
                                <tr v-for="(pkg, index) in packages">
                                    <td>{{ index + 1 }}</td>
                                    <td>
                                        <span class="blue">
                                            {{ pkg.packageCode }}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="green">
                                            {{ pkg.shipCode }}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="bold">{{ pkg.weigh && pkg.weigh > 0 ? pkg.weigh : "-" }} {{
                                            pkg.weigh &&
                                                pkg.weigh > 0 ? "kg" : ""
                                        }}</span>
                                    </td>
                                    <td>
                                        <span class="bold">{{
                                            pkg.volume && pkg.volume > 0 ? pkg.volume : "-"
                                        }} {{ pkg.volume ? "khối" : "" }}</span>
                                    </td>
                                    <td>
                                        <span class="bold">{{ pkg.quantity && pkg.quantity > 0 ? pkg.quantity : '-'
                                            }}</span>
                                    </td>
                                    <td>
                                        <span :class="CommonUtils.promptPackageStatusClassByValue(pkg.status)
                                            ">
                                            {{
                                                CommonUtils.promptPackageStatusNameByValue(pkg.status)
                                            }}
                                        </span>
                                    </td>
                                    <td>
                                        <!-- <span class="blue"> -->
                                        <!--     Chi tiết -->
                                        <!--     <fa id="tooltip-history" icon="question-circle"></fa> -->
                                        <!-- </span> -->
                                        <!-- <b-tooltip placement="left" variant="new-variant" target="tooltip-history" -->
                                        <!--     triggers="hover"> -->
                                        <!--     <span v-for="(log, it) in pkg.packageLogs"> -->
                                        <!--         <div v-if="log != null && log.log != null"> -->
                                        <!--             {{ log.log }} -->
                                        <!--         </div> -->
                                        <!--     </span> -->
                                        <!-- </b-tooltip> -->
                                        <a class="custom-link hasTooltip tooltipstered">Chi tiết
                                            <fa :id="'info-' + pkg.id" icon="question-circle"></fa>
                                        </a>
                                        <b-tooltip style="min-width: 300px;" placement="left" variant="new-variant"
                                            :target="'info-' + pkg.id" triggers="hover">
                                            <table>
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
                                                                CommonUtils.formatDate(pkg.sendBagChinaDate) }}</strong>
                                                        </td>
                                                    </tr> -->
                                                    <!-- <tr>
                                                        <td>Nhận bao tại VN</td>
                                                        <td class="right">
                                                            <strong>{{ pkg?.userGetBagVietNamDate }} - {{
                                                                CommonUtils.formatDate(pkg.getBagVietNamDate) }}</strong>
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
                                                                CommonUtils.formatDate(pkg.checkedDate) }}</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Giao hàng</td>
                                                        <td class="right">
                                                            <strong>{{ pkg?.userSendPackageDate }} - {{
                                                                CommonUtils.formatDate(pkg.sendPackageDate) }}</strong>
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
        <!-- kiện hàng -->

        <!-- Tab phí khác -->
        <div id="extrafees" class="box_info bg_white">
            <div class="cu-row">
                <div class="col-md-12">
                    <p class="subtitle">
                        <strong>
                            <fa icon="external-link-square" aria-hidden="true"></fa>
                            Danh sách các phí khác nếu có
                            <fa class="question-circle"></fa>
                        </strong>
                    </p>
                </div>
                <div class="col-md-12">
                    <div class="gridtable class-center">
                        <table>
                            <tbody>
                                <tr class="header-cart-table">
                                    <td style="width: 5%">STT</td>
                                    <td style="width: 15%">Mã hóa đơn</td>
                                    <td style="width: 15%">Số tiền</td>
                                    <td style="width: 30%">Ghi chú</td>
                                    <td class="center" style="width: 20%">Người thêm</td>
                                </tr>
                                <tr v-for="(fee, it) in order.otherFees">
                                    <td>{{ it + 1 }}</td>
                                    <td>
                                        <span class="blue">
                                            {{ fee?.code }}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="green">
                                            {{ CommonUtils.formatNumber(fee.amount) }}
                                        </span>
                                        VND
                                    </td>
                                    <td>
                                        {{ fee.description }}
                                    </td>
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

        <!-- Tab giao dịch -->
        <div id="payment" class="box_info bg_white">
            <div class="cu-row">
                <div class="col-md-12">
                    <p class="subtitle">
                        <strong>
                            <fa icon="money-bill" aria-hidden="true"></fa> Danh sách giao dịch
                        </strong>
                    </p>
                </div>
                <div class="col-md-12">
                    <div class="gridtable class-center">
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
                                <tr v-for="(transaction, index) in order.transactionHistory">
                                    <td>{{ index + 1 }}</td>
                                    <td>
                                        <span class="bold">
                                            {{ CommonUtils.formatDate(transaction.createDate) }}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="blue">
                                            {{ transaction.transactionCode }}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="green">
                                            {{ transaction.typeName }}
                                        </span>
                                        <br>
                                        <span class="red" v-if="transaction.typeName">
                                            {{ order.orderChina.orderCode }}
                                        </span>
                                    </td>
                                    <td>{{ transaction.description }}</td>
                                    <td v-if="transaction.byAdmin === null || transaction.byAdmin === ''">
                                        <span v-if="transaction.type == 4" class="green bold">+</span>
                                        <span v-else class="red bold">-</span>
                                        <span :class="{
                                            red: transaction.type != 4,
                                            green: transaction.type == 4,
                                        }">
                                            {{ CommonUtils.formatNumber(transaction.amount) }}
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
                                            {{ CommonUtils.formatNumber(transaction.amountBefore) }}
                                        </span>
                                        (vnđ)
                                    </td>
                                    <td>
                                        <span class="red">
                                            {{ CommonUtils.formatNumber(transaction.amountAfter) }}
                                        </span>
                                        (vnđ)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- end giaodich -->

        <!-- Đơn hàng ship only -->
        <!-- Tab Khiếu nại -->
        <div id="payment" class="box_info bg_white">
            <div class="cu-row">
                <div class="col-md-12">
                    <p class="subtitle">
                        <strong>
                            <fa icon="money-bill" aria-hidden="true"></fa> Danh sách khiếu nại
                        </strong>
                    </p>
                </div>
                <div class="col-md-12">
                    <div class="gridtable class-center">
                        <table style="word-break: break-all;">
                            <tbody>
                                <tr class="header-cart-table">
                                    <td style="width: 5%">STT</td>
                                    <td style="width: 40%">Sản phẩm</td>
                                    <td style="width: 10%">Giá bán</td>
                                    <td class="center" style="width: 5%">
                                        Số lượng
                                        <i class="textTooltip fa fa-question-circle tooltipstered"></i>
                                    </td>
                                    <td class="center" style="width: 10%">Trạng thái</td>
                                    <td class="center" style="width: 15%">Ngày khiếu nại</td>
                                    <td class="center" style="width: 18%">Thay đổi trạng thái</td>
                                </tr>
                                <tr v-for="(itm, id) in order.complains">
                                    <td>{{ id + 1 }}</td>
                                    <td>
                                        <div class="image">
                                            <a :href="itm.orderItemComplain.itemLink" target="_blank"><img
                                                    :src="itm.orderItemComplain.itemImage" width="100px"
                                                    height="100px" /></a>
                                        </div>
                                        <div class="info">
                                            <div class="price">
                                                <a :href="itm.orderItemComplain.itemLink" target="_blank">
                                                    <span style="font-size: 15px;">
                                                        <fa icon="jpy" aria-hidden="true"></fa>
                                                        {{ itm.orderItemComplain.itemPrice }}
                                                    </span>
                                                    -
                                                    <span v-if="order.orderChina.type != 3">
                                                        {{ decodeURIComponent(itm.orderItemComplain.itemTitle) }}
                                                    </span>
                                                    <span v-else>
                                                        <span v-if="!readMore">
                                                            {{ decodeURIComponent(itm.orderItemComplain.itemLink).slice(0, 100) }}
                                                        </span>
                                                        <span v-if="readMore">
                                                            {{ decodeURIComponent(itm.orderItemComplain.itemLink) }}
                                                        </span>
                                                        <br>
                                                    </span>
                                                </a>
                                                <p @click="activateReadMore" class="text-success"
                                                    style="cursor: pointer">
                                                    {{ readMore ? "Thu gọn" : "Xem thêm ..." }}
                                                </p>
                                            </div>
                                            <div class="attributes">
                                                {{ itm.orderItemComplain.color }} <b>-/-</b>
                                                {{ itm.orderItemComplain.size }}
                                            </div>
                                            <div>
                                                <span>
                                                    <span class="bold">Khiếu nại: </span>{{ itm.complainDescription }}
                                                </span>
                                            </div>
                                        </div>

                                    </td>
                                    <td>
                                        <span class="green">
                                            {{ itm.price }}
                                        </span> NDT
                                    </td>
                                    <td>
                                        <span class="blue">
                                            {{ itm.total }}
                                        </span>
                                    </td>
                                    <td>
                                        <span :class="CommonUtils.promptComplainStatusNameByValue(itm.status).class">
                                            <b>{{ CommonUtils.promptComplainStatusNameByValue(itm.status).value }}</b>
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            {{
                                                CommonUtils.formatDate(itm.createDate)
                                            }}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="form-group">
                                            <label class="control-label float-left" for="statusComplain">Trạng
                                                thái:</label>
                                            <br>
                                            <div>
                                                <select v-model="itm.status" name="statusComplain" class="form-control"
                                                    @change="updateComplainStatus(itm)">
                                                    <option :value="null">Chọn trạng thái</option>
                                                    <option v-for="item in CONSTANT.COMPLAIN_STATUS" :key="item.status"
                                                        :value="item.status" :class="item.class">
                                                        {{ item.value }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- function defined -->
<script>
export default {
    name: "StaffOrderDetailSection",
    data() {
        return {
            orderId: this.$route.params.orderId,
            order: null,
            customerInfo: {},
            info: {},

            paymentCompany: 0,

            order_shop_code: [],
            order_shop_code_complement: [],
            packages: [],

            isHideNote: true,

            valueShopCodeAppend: "",

            formAdmin: {
                purchaseFeePerSent: null,
                internationalShippingFees: null,
                exchangeRate: null,
            },

            woodWorkEnable: false,
            tallyEnable: false,

            otherFee: {
                amount: null,
                description: "",
            },
            otherFeeRes: {},

            response: {},

            shipCode: "",

            isDataReady: false,
            shopId: '',
            idOfShopOrigin: null,
            newShopId: '',
            domesticFees: '',
            domesticFeesReal: '',

            commonStore: useCommonStore(),
            renderKey: 0,
            naptien: {},
            ruttien: {},
            errors: {},
            readMore: false,
        };
    },
    mounted() {
        this.getDetail(this.orderId);
    },
    methods: {
        resetForm() {
            this.naptien.amount = '';
            this.naptien.description = '';
            this.naptien.tranType = '';
            this.ruttien.amount = '';
            this.ruttien.description = '';
            this.ruttien.tranType = '';

        },
        formatInputRut() {

            let unformattedNumberRut = this.ruttien.amount.toString().replace(/,/g, '');

            // Format the number with commas
            this.ruttien.amountText = unformattedNumberRut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        formatInputNap() {
            console.log("-------")
            let unformattedNumberNap = this.naptien.amount.toString().replace(/,/g, '');

            // Format the number with commas
            this.naptien.amountText = unformattedNumberNap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        formatNumber(amount) {
            // Remove commas from the input string
            let unformattedNumber = amount.replace(/,/g, '');

            // Format the number with commas
            return unformattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        validateFormNapTien() {
            this.errors = {};

            if (!this.naptien.amount) {
                this.errors.amount = 'Số tiền bắt buộc nhập.';
                return false;
            }
            if (!this.naptien.tranType) {
                this.errors.tranType = 'Chưa chọn Loại giao dịch.';
                return false;
            }
            return true;

        },
        async submitNapTien() {
            if (!this.validateFormNapTien()) return;
            let loader = this.$loading.show();
            const payload = {
                amount: this.naptien.amount,
                type: 1, //1: NAP TIEN - 0: RUT TIEN
                tranType: this.naptien.tranType,
                description: this.naptien.description,
                accId: this.customerInfo.id, // id account khachs
            }
            const res = await ApiCaller.post(ROUTES.BankAccount.adminTopup, payload);
            loader.hide()
            if (res.status === 200) {
                this.naptien.id = res.data.id;
                this.$toast.success(`Nạp thành công ${this.formatNumber(res.data.amount + '')} VNĐ vào tài khoản khách hàng.`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                this.resetForm();
                await this.getInfoOf(this.order.customerInfo.id);
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
        },
        validateFormRutTien() {
            this.errors = {};

            if (!this.ruttien.amount) {
                this.errors.amount = 'Số tiền bắt buộc nhập.';
                return false;
            }

            if (!this.ruttien.tranType) {
                this.errors.tranType = 'Chưa chọn Loại giao dịch.';
                return false;
            }
            return true;

        },
        async submitRutTien() {
            if (!this.validateFormRutTien()) return;
            let loader = this.$loading.show();
            const payload = {
                amount: this.ruttien.amount,
                type: 0, //1: NAP TIEN - 0: RUT TIEN
                tranType: this.ruttien.tranType,
                description: this.ruttien.description,
                accId: this.customerInfo.id, // id account khachs
            }
            const res = await ApiCaller.post(ROUTES.BankAccount.adminTopup, payload);
            loader.hide()
            if (res.status === 200) {
                this.ruttien.id = res.data.id;
                this.$toast.success(`Rút thành công ${this.formatNumber(res.data.amount + '')} VNĐ từ tài khoản khách hàng.`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                this.resetForm();
                await this.getInfoOf(this.order.customerInfo.id);
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
        },
        reRender() {
            this.renderKey++;
        },
        async addShopId() {
            let loader = this.$loading.show();
            const res = await ApiCaller.post(
                ROUTES.OrderShopCode.createShopId(this.newShopId, this.orderId),
            );
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
                return;
            }
            this.order_shop_code[res.data.id] = this.newShopId;
            this.$toast.info(`Thêm mã shop thành công.`, {
                title: "Thông báo",
                position: "top-right",
                autoHideDelay: 7000,
            });
            await this.getDetail(this.orderId);
            this.newShopId = ''
        },
        async addShopIdSingle() {
            let loader = this.$loading.show();
            const res = await ApiCaller.post(
                ROUTES.OrderShopCode.createShopId(this.shopId, this.orderId),
            );
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
                return;
            }
            this.order_shop_code[res.data.id] = this.newShopId;
            this.$toast.info(`Thêm mã shop thành công.`, {
                title: "Thông báo",
                position: "top-right",
                autoHideDelay: 7000,
            });
            await this.getDetail(this.orderId);
            debugger
        },
        async updateShopId(item, idx) {
            let loader = this.$loading.show();
            const res = await ApiCaller.post(
                ROUTES.OrderShopCode.updateShopId(item, idx, this.orderId),
            );
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
                return;
            }
            this.$toast.info(`Cập nhật mã shop thành công.`, {
                title: "Thông báo",
                position: "top-right",
                autoHideDelay: 7000,
            });
            await this.getDetail(this.orderId)
        },
        async addDomesticFees() {
            if (this.domesticFees < 0) {
                this.$toast.error(`Phí nội địa mới không hợp lệ!`,
                    {
                        title: "Thông báo",
                        position: "top-right",
                        autoHideDelay: 7000,
                    }
                );
                return;
            }
            let loader = this.$loading.show();
            const res = await ApiCaller.post(
                ROUTES.OrderShopCode.createDomesticFees(this.domesticFees, this.orderId),
            );
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
                return;
            }
            this.$toast.info(`Thêm phí nội địa thành công.`, {
                title: "Thông báo",
                position: "top-right",
                autoHideDelay: 7000,
            });
            this.getDetail(this.orderId)
        },
        async addDomesticFeesReal() {
            if (this.domesticFeesReal < 0) {
                this.$toast.error(`Phí ship thực mới không hợp lệ!`,
                    {
                        title: "Thông báo",
                        position: "top-right",
                        autoHideDelay: 7000,
                    }
                );
                return;
            }
            let loader = this.$loading.show();
            const res = await ApiCaller.post(
                ROUTES.OrderShopCode.updateDomesticFeesReal(this.domesticFeesReal, this.orderId),
            );
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
                return;
            }
            this.$toast.info(`Thêm phí ship thực thành công.`, {
                title: "Thông báo",
                position: "top-right",
                autoHideDelay: 7000,
            });
        },
        promptLocationByInventoryId(id) {
            return this.commonStore.inventories?.filter(($) => $.id == id)[0]
                ?.location;
        },
        promptNameByInventoryId(id) {
            return this.commonStore.inventories?.filter(($) => $.id == id)[0]?.name;
        },
        async getDetail(id) {
            let loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.Order.getDetail(id));
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
                return;
            }
            this.order = res.data;
            await this.getCustomer(this.order.customerInfo.id);
            await this.getInfoOf(this.order.customerInfo.id);
            await this.getListOrderShopCode(this.order.orderChina.id);
            await this.getListPackage(this.order.orderChina.id);
            this.order.orderChina.createDate = CommonUtils.formatDate(
                this.order.orderChina.createDate,
            );
            this.order.orderChina.depositDate = CommonUtils.formatDate(
                this.order.orderChina.depositDate,
            );
            this.order.orderChina.dateOfPurchase = CommonUtils.formatDate(
                this.order.orderChina.dateOfPurchase,
            );
            this.order.orderChina.dateOfChinaInventory = CommonUtils.formatDate(
                this.order.orderChina.dateOfChinaInventory,
            );
            this.order.orderChina.dateOfVietNamInventory = CommonUtils.formatDate(
                this.order.orderChina.dateOfVietNamInventory,
            );
            this.order.orderChina.dateDone = CommonUtils.formatDate(
                this.order.orderChina.dateDone,
            );
            this.order.orderChina.dateDelete = CommonUtils.formatDate(
                this.order.orderChina.dateDelete,
            );
            let complainProductId = [];
            if (this.order.complains.length > 0) {
                complainProductId = this.order.complains.map(($) => $.productComplain);
            }
            this.order.orderDetails.forEach(($) => {
                if (complainProductId.includes($.id)) {
                    $.complains = this.order.complains.filter(
                        (el) => el.productComplain == $.id,
                    );
                }
            });
            this.woodWorkEnable = this.order.orderChina.isWoodworkingFee;
            this.tallyEnable = this.order.orderChina.isTallyFee;
            this.isDataReady = true;
            this.formatShippingPrice();
            this.formatExchangeRage();
            this.formatpurchaseFee();
            this.shopId = this.order_shop_code.filter($ => $ != null)[0];
            for (let i = 0; i < this.order_shop_code.length; i++) {
                if (this.order_shop_code[i] == this.shopId) {
                    this.order_shop_code_complement[i] = null;
                    this.idOfShopOrigin = i;
                } else {
                    this.order_shop_code_complement[i] = this.order_shop_code[i]
                }
            }
            this.formAdmin.purchaseFeePerSent = this.order.orderChina.purchaseFeePerSent;
            this.formAdmin.internationalShippingFees = this.order.orderChina.internationalShippingFees;
            this.formAdmin.exchangeRate = this.order.orderChina.exchangeRate;
        },
        genImageSrc(path) {
            return (
                process.env.BASE_URL + ROUTES.Complain.getFile + "?fileName=" + path
            );
        },
        formatDate(timestamp) {
            if (timestamp === null) return "";
            const date = new Date(timestamp);

            // Extract date components
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
            const day = date.getDate().toString().padStart(2, "0");
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            const seconds = date.getSeconds().toString().padStart(2, "0");
            // Construct the formatted date string
            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            return formattedDate;
        },
        openModal(modal) {
            this.$bvModal.show(modal);
            this.naptien = {};
            this.ruttien = {};
            this.errors = {};
        },
        hideModal(id) {
            this.$bvModal.hide(id);
            this.otherFeeRes = {};
            this.otherFee = {
                amount: null,
                note: "",
            };
        },
        promptClassByStatusValue(status) {
            switch (status) {
                case 1:
                    return "daduyet";
                case 2:
                    return "dathanhtoan";
                case 3:
                    return "damuahang";
                case 4:
                    return "hangdave";
                case 5:
                    return "hangdave";
                case 6:
                    return "hangdave";
                case 7:
                    return "daduyet";
                case 8:
                    return "chokhieunai";
                case 9:
                    return "daketthuc";
                case 0:
                    return "dahuy";
            }
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
        async toggleWoodWork(event) {
            let loader = this.$loading.show();
            const value = event.target.checked;
            const payload = {
                id: this.orderId,
                isWoodworkingFee: value,
            };
            const res = await ApiCaller.post(ROUTES.Order.updateOrderStatus, payload);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(`Chuyển trạng thái đóng gỗ thành công`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
                this.getDetail(this.orderId);
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            }
        },
        async cancelOrder() {
            let loader = this.$loading.show();
            const payload = {
                id: this.orderId,
                status: CONSTANT.ORDER_STATUS.DA_HUY,
            };
            const res = await ApiCaller.post(ROUTES.Order.updateOrderStatus, payload);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(
                    `Huỷ đơn hàng ${this.order.orderChina.orderCode} thành công`,
                    {
                        title: "Thông báo",
                        position: "top-right",
                        autoHideDelay: 7000,
                    },
                );
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            }
            this.getDetail(this.orderId);
        },
        async buyOrder() {
            let loader = this.$loading.show();
            const payload = {
                id: this.orderId,
                status: CONSTANT.ORDER_STATUS.DA_MUA_HANG,
            };
            const res = await ApiCaller.post(ROUTES.Order.updateOrderStatus, payload);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(
                    `Chuyển trạng thái đã mua hàng cho đơn hàng ${this.order.orderChina.orderCode} thành công`,
                    {
                        title: "Thông báo",
                        position: "top-right",
                        autoHideDelay: 7000,
                    },
                );
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            }
            this.getDetail(this.orderId);
        },
        preventEnter(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        },
        async toggleTally(event) {
            let loader = this.$loading.show();
            const value = event.target.checked;
            const payload = {
                id: this.orderId,
                isTallyFee: value,
            };
            const res = await ApiCaller.post(ROUTES.Order.updateOrderStatus, payload);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(`Chuyển trạng thái kiểm đếm thành công`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
                this.getDetail(this.orderId);
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            }
            this.getDetail(this.orderId);
        },
        async getCustomer(id) {
            let loader = this.$loading.show();
            const link = ROUTES.User.customerInfo(id);
            const res = await ApiCaller.get(link);
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
                return;
            }
            this.customerInfo = res.data;
        },
        async getInfoOf(id) {
            const loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.User.infoOf(id));
            this.info = res.data;
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
                return;
            }
            loader.hide();
        },
        async getListOrderShopCode(orderId) {
            const loader = this.$loading.show();
            const res = await ApiCaller.get(
                ROUTES.OrderShopCode.findByOrderIdCustom(orderId),
            );
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
                return;
            }
            res.data.shopId.forEach(($) => (this.order_shop_code[$.id] = $.shopId));
            if (res.data.domesticFees != null) {
                this.domesticFees = res.data.domesticFees;
                this.cloneDomesticFees = this.domesticFees;
            }
            if (res.data.domesticFeesReal != null) {
                this.domesticFeesReal = res.data.domesticFeesReal;
                this.cloneDomesticFeesReal = this.domesticFeesReal;
            }
        },
        async getListPackage(orderId) {
            const loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.Package.findByOrderId(orderId));
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
                return;
            }
            this.packages = res.data;
        },
        formatDomesticFees(index) {
            let unformattedNumber = this.order_shop_code[index].domesticFees.replace(
                /,/g,
                "",
            );
            this.order_shop_code[index].domesticFees = unformattedNumber
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        formatDomesticFeesReal(index) {
            let unformattedNumber = this.order_shop_code[
                index
            ].domesticFeesReal.replace(/,/g, "");
            this.order_shop_code[index].domesticFeesReal = unformattedNumber
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        appendOrderShopCode() {
            this.order_shop_code = [
                ...this.order_shop_code,
                {
                    orderId: this.orderId,
                    shopId: this.valueShopCodeAppend,
                    domesticFees: "",
                    domesticFeesReal: "",
                },
            ];
            this.valueShopCodeAppend = "";
        },
        async handleSaveOrderShopCode() {
            let payload = this.order_shop_code.map((item) => {
                const formattedItem = {};
                for (const key in item) {
                    if (item.hasOwnProperty(key)) {
                        if (key !== "shopId" || key !== "isDefault") {
                            const value = Number((item[key] + "").replace(/,/g, ""));
                            formattedItem[key] = value;
                        } else {
                            formattedItem[key] = item[key];
                        }
                    }
                }
                formattedItem["isDefault"] = item["isDefault"];
                return formattedItem;
            });
            payload = payload.filter((el) => !el.isDefault);
            let loader = this.$loading.show();
            let promises = [];
            payload.forEach(async (el) => {
                el.shopId += "";
                el.orderId = this.orderId;
                promises.push(ApiCaller.post(ROUTES.OrderShopCode.create, el));
            });
            Promise.all(promises).then((res) => {
                this.getListOrderShopCode(this.order.orderChina.id);
                loader.hide();
            });
        },
        async createPackage() {
            try {
                let loader = this.$loading.show();
                const payload = {
                    shipCode: this.shipCode,
                    orderCode: this.order.orderChina.orderCode,
                };
                const res = await ApiCaller.post(ROUTES.Package.create, payload);
                loader.hide();
                this.getListPackage(this.orderId);
            } finally {
                this.shipCode = "";
            }
        },
        async createOtherFee(event) {
            if (this.otherFee.amount != null || this.otherFee.amount == 0) {
                const loader = this.$loading.show();
                this.otherFee.orderId = this.order.orderChina.id;
                this.otherFee.amount = parseFloat(
                    CommonUtils.removeCommas(this.otherFee.amount),
                );
                const res = await ApiCaller.post(ROUTES.OtherFee.create, this.otherFee);
                this.otherFeeRes = res.data;
                if (res.status == 200) {
                    this.$toast.success(
                        `Thêm chi phí khác cho đơn hàng ${this.order.orderChina.orderCode}`,
                        {
                            title: "Thông báo",
                            position: "top-right",
                            autoHideDelay: 7000,
                        },
                    );
                    this.getDetail(this.orderId);
                    this.formatOtherFee();
                    this.hideModal(`add-addons`);
                } else {
                    this.$toast.error(`${res.data.message}`, {
                        title: "Thông báo",
                        position: "top-right",
                        autoHideDelay: 7000,
                    });
                }
                loader.hide();
            } else {
                this.$toast.error(`Số tiền bắt buộc nhập`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            }
            event.preventDefault();
        },
        async handleSettleOrder() {
            let a = this.order?.orderChina?.status != 1 ? CommonUtils.formatNumber(this.order?.orderChina?.notPaid,) : CommonUtils.formatNumber(this.order.orderChina?.totalAmount,);
            if (a === 0) return;
            const loader = this.$loading.show();
            const payload = {
                id: this.order.orderChina.id,
                status: CONSTANT.ORDER_STATUS.SAN_SANG_GIAO_HANG,
                isSettle: true,
            };
            const res = await ApiCaller.post(ROUTES.Order.updateOrderStatus, payload);
            if (res.status == 200) {
                this.$toast.success(
                    `Tất toán cho đơn hàng ${this.order.orderChina.orderCode} thành công`,
                    {
                        title: "Thông báo",
                        position: "top-right",
                        autoHideDelay: 7000,
                    },
                );
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            }
            loader.hide();
            this.getDetail(this.orderId);
        },
        async handlepurchaseFee(orderChina) {
            const loader = this.$loading.show();
            const payload = {
                orderId: orderChina.id,
                serviceFee: this.formAdmin.purchaseFeePerSent,
            };
            const res = await ApiCaller.post(ROUTES.Order.updateFee, payload);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(
                    `Cập nhật phí dịch vụ cho đơn hàng ${orderChina.orderCode} thành công`,
                    {
                        title: "Thông báo",
                        position: "top-right",
                        autoHideDelay: 7000,
                    },
                );
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            }
            await this.getDetail(this.orderId);
            this.reRender();
        },
        async handleShippingPrice(orderChina) {
            const loader = this.$loading.show();
            const payload = {
                orderId: orderChina.id,
                shippingPrice: parseFloat(
                    CommonUtils.removeCommas(this.formAdmin.internationalShippingFees),
                ),
            };
            const res = await ApiCaller.post(ROUTES.Order.updateFee, payload);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(
                    `Cập nhật giá vận chuyển cho đơn hàng ${orderChina.orderCode} thành công`,
                    {
                        title: "Thông báo",
                        position: "top-right",
                        autoHideDelay: 7000,
                    },
                );
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            }
            await this.getDetail(this.orderId);
            this.reRender();
        },
        async handleExchangeRate(orderChina) {
            const loader = this.$loading.show();
            const payload = {
                orderId: orderChina.id,
                exchangeRate: parseFloat(
                    CommonUtils.removeCommas(this.formAdmin.exchangeRate),
                ),
            };
            const res = await ApiCaller.post(ROUTES.Order.updateFee, payload);
            if (res.status == 200) {
                this.$toast.success(
                    `Cập nhật tỷ giá cho đơn hàng ${orderChina.orderCode} thành công`,
                    {
                        title: "Thông báo",
                        position: "top-right",
                        autoHideDelay: 7000,
                    },
                );
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            }
            loader.hide();
            this.getDetail(this.orderId);
            this.reRender();
        },
        async handleStatus(orderChina) {
            const loader = this.$loading.show();
            const payload = {
                orderId: orderChina.id,
                status: orderChina.status,
            };
            const res = await ApiCaller.post(ROUTES.Order.updateFee, payload);
            if (res.status == 200) {
                this.$toast.success(
                    `Cập nhật trạng thái cho đơn hàng ${orderChina.orderCode} thành công`,
                    {
                        title: "Thông báo",
                        position: "top-right",
                        autoHideDelay: 7000,
                    },
                );
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            }
            loader.hide();
            this.getDetail(this.orderId);
        },
        formatShippingPrice() {
            if (this.order.orderChina.shippingPrice) {
                let unformattedNumber = (
                    this.order.orderChina.shippingPrice + ""
                ).replace(/,/g, "");
                this.order.orderChina.shippingPrice = unformattedNumber
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },
        formatpurchaseFee() {
            if (this.order.orderChina.purchaseFee) {
                // let unformattedNumber = (this.order.orderChina.purchaseFee + '').replace(/,/g, '');
                // this.order.orderChina.purchaseFee = unformattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
        },
        formatExchangeRage() {
            if (this.order.orderChina.exchangeRate) {
                let unformattedNumber = (
                    this.order.orderChina.exchangeRate + ""
                ).replace(/,/g, "");
                this.order.orderChina.exchangeRate = unformattedNumber
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },
        formatOtherFee() {
            if (this.otherFee.amount) {
                let unformattedNumber = (this.otherFee.amount + "").replace(/,/g, "");
                this.otherFee.amount = unformattedNumber
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },
        async updateDescription(detail) {
            const loader = this.$loading.show();
            const payload = {
                id: detail.id,
                description: detail.description,
            };
            const res = await ApiCaller.post(ROUTES.Order.updateOrderItem, payload);
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            } else {
                this.$toast.success(
                    `Cập nhật mô tả cho sản phẩm ${detail.itemTitle} thành công`,
                    {
                        title: "Thông báo",
                        position: "top-right",
                        autoHideDelay: 7000,
                    },
                );
            }
        },
        async handleOutOfProduct(detail) {
            const loader = this.$loading.show();
            const payload = {
                id: detail.id,
            };
            const res = await ApiCaller.post(ROUTES.Order.outOfProduct, payload);
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            } else {
                this.$toast.success(
                    `Đánh dấu sản phẩm ${detail.itemTitle} hết hàng thành công`,
                    {
                        title: "Thông báo",
                        position: "top-right",
                        autoHideDelay: 7000,
                    },
                );
                this.getDetail(this.orderId);
            }
        },
        getStaffById(staffId) {
            if (staffId == null || staffId == undefined)
                return "Chưa có nhân viên hỗ trợ";
            else
                return this.commonStore.staffs?.filter(($) => $.id == staffId)[0]
                    ?.fullName;
        },
        async saveCompanyPayment() {
            const payload = {
                id: this.order.orderChina.id,
                paymentCompany: this.paymentCompany,
            };
            const loader = this.$loading.show();
            const res = await ApiCaller.post(ROUTES.Order.saveCompanyPayment, payload);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(`Lưu thông tin phí thực thanh toán thành công`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
                this.paymentCompany = 0;
                this.getDetail(this.orderId);
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            }

        },
        async addCompanyPayment() {
            const payload = {
                id: this.order.orderChina.id,
                paymentCompany: this.paymentCompany,
            };
            const loader = this.$loading.show();
            const res = await ApiCaller.post(ROUTES.Order.updateOrderStatus, payload);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(`Tạo yêu cầu thanh toán thành công`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
                this.paymentCompany = 0;
                this.getDetail(this.orderId);
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            }
        },
        async handleOrderNote(order) {
            const payload = {
                orderId: order.id,
                note: order.orderNote,
            };
            const loader = this.$loading.show();
            const res = await ApiCaller.post(ROUTES.OrderNote.create, payload);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(
                    `Thêm ghi chú cho đơn hàng ${order.orderCode} thành công`,
                    {
                        title: "Thông báo",
                        position: "top-right",
                        autoHideDelay: 7000,
                    },
                );
                this.getDetail(this.orderId);
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            }
        },
        async handleChangeQuantity(event) {
            let loader = this.$loading.show();
            const value = parseInt(event.target.value);
            const oid = parseInt(event.target.attributes.oid.value);
            this.order.orderDetails
                .filter(($) => $.id === oid)
                .forEach((detail) => (detail.numberItem = value));
            const payload = {
                id: oid,
                numberItem: value,
            };
            const res = await ApiCaller.post(ROUTES.Order.updateOrderItem, payload);
            loader.hide();
            if (res.status == 200) {
                this.response.originQuantity = {
                    message: res.data.message ? res.data.message : "Đã cập nhật thành công",
                    id: oid,
                };
                this.getDetail(this.orderId);
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            }
        },
        async handleChangeItemPrice(event) {
            let loader = this.$loading.show();
            const value = parseFloat(event.target.value);
            const oid = parseInt(event.target.attributes.oid.value);
            this.order.orderDetails
                .filter(($) => $.id === oid)
                .forEach((detail) => (detail.numberItem = value));
            const payload = {
                id: oid,
                itemPrice: value,
            };
            const res = await ApiCaller.post(ROUTES.Order.updateOrderItem, payload);
            loader.hide();
            if (res.status == 200) {
                //});
                this.response.originPrice = {
                    message: res.data.message ? res.data.message : "Đã cập nhật thành công",
                    id: oid,
                };
                this.getDetail(this.orderId);
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            }
        },
        async deletePackageById(id) {
            const loader = this.$loading.show();
            const res = await ApiCaller.postParams(ROUTES.Package.deletePackageById(id));
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(`Xoá mã kiện ra khỏi đơn hàng thành công`, {
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
        viewTransDetail(id) {
            window.open(this.$router.resolve({ name: 'StaffTransactionDetailPage', params: { id: id } }).href, '_blank');
        },
        promptStyleByPackageStatus(status) {
            switch (status) {
                case 6:
                    return "nhap_kho_vn"
                case 7:
                    return "da_giao";
                default:
                    break;
            }
        },
        async updateComplainStatus(complain) {
            const loader = this.$loading.show();
            const res = await ApiCaller.post(ROUTES.Complain.update, complain);
            if (res.status == 200) {
                this.$toast.success(
                    `Cập nhật trạng thái khiếu nại cho đơn hàng thành công`,
                    {
                        title: "Thông báo",
                        position: "top-right",
                        autoHideDelay: 7000,
                    },
                );
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: "Thông báo",
                    position: "top-right",
                    autoHideDelay: 7000,
                });
            }
            loader.hide();
            // this.getDetail(this.orderId);
        },
        activateReadMore() {
            this.readMore = !this.readMore;
        },
    },
};
</script>

<!-- style custom -->
<style scoped>
.cu-row {
    padding: 20px 0px;
}

.gridtable.class-center td {
    text-align: center;
}

tr {
    border-bottom: none;
}

.bubble-message {
    position: relative;
    color: #f44336;
    font-weight: bold;
    padding: 0.5rem 0rem;
}

.bubble-message-remove {
    position: relative;
    color: green;
    font-weight: bold;
    padding: 0.5rem 0rem;
    background: #00800026;
    border-radius: 8%;
    margin-top: 9px;
}

.nhap_kho_vn {
    background-color: green;
    padding: 2px;
    font-weight: normal;
    color: white;
}

.da_giao {
    background-color: cyan;
    padding: 2px;
    font-weight: normal;
    color: black;
}

.outofproduct {
    background-color: #2f2f2f !important;
}

.parent-div {
    display: flex;
    align-items: center;
    width: 100%;
}

.parent-div-short {
    display: flex;
    align-items: center;
    width: 80%;
}

.prefix-text {
    margin-right: 8px;
    white-space: nowrap;
    color: #000;
    cursor: auto;
}

.style-input {
    background: #FAFACE;
    color: green;
    flex: 1;
    width: 100%;
}
</style>