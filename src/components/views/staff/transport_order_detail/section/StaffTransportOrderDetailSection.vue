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
	<div class="order clearfix" v-if="isDataReady">
		<div class="bg_white box_info" style="display: flex; flex-direction: column;">
			<h3 class="subtitle">
				<fa icon="newspaper" aria-hidden="true"></fa> Chi tiết đơn hàng ký gửi
			</h3>
			<div style="align-self: center; text-align: center;">
				<div style="font-size: 20px;">
					<span class="bold">Mã: </span><span class="blue">{{ order.orderChina.orderCode }}</span>
				</div>
				<div>
					<span class="bold">Ngày đặt: </span><span>{{ CommonUtils.formatDate(order.orderChina.createDate)
						}}</span>
				</div>
			</div>
			<div style="align-self: center;">
				<table>
					<th v-if="CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_KHO">
						<td><strong>Đóng gỗ</strong></td>
						<td>
							<input :disabled="CommonUtils.getRole() == CONSTANT.ROLE.NHAN_VIEN_TU_VAN || order.orderChina.status >= CONSTANT.ORDER_STATUS.HANG_DA_VE_KHO_TQ"
								@click="toggleWoodWork" style="width: 20px; height: 20px" type="checkbox"
								name="is_wood_pack" v-model="woodWorkEnable" />
						</td>
					</th>
				</table>
			</div>
			<div class="col-md-12" style="display: flex">
				<div class="col-md-6" style="padding: 15px !important">
					<div class="cu-row">
						<table class="table borderless no_margin">
							<tbody>
								<tr>
									<td><strong>Tên KH</strong></td>
									<td>
										<strong>{{ order.customerInfo.username }}</strong>
									</td>
								</tr>
								<tr>
									<td><strong>Địa chỉ</strong></td>
									<td>
										<strong>{{ order.customerInfo.address }}</strong>
									</td>
								</tr>
								<tr>
									<td><strong>Số điện thoại</strong></td>
									<td>
										<strong>{{ order.customerInfo.phone }}</strong>
									</td>
								</tr>
								<tr>
									<td>
										<div>
											<strong>Phí cân nặng</strong>
											<br>
											<span>đ / KG</span>
										</div>
									</td>
									<td>
										<table>
											<table>
												<tr v-for="(val, key) in fee_per_weight">
													<td>
														<span class="bold red">{{ key }}</span>
													</td>
													<td>
														<span class="green">{{ !parseInt(val) ? val : CommonUtils.formatNumber(val)
															}}</span> {{ parseInt(val) ? "vnđ / KG" : '' }}
													</td>
												</tr>
											</table>
										</table>
									</td>
								</tr>
								<tr>
									<td><strong>Ghi chú</strong></td>
									<div v-for="(note, id) in order.orderNotes">
										<span class="bold">Ghi chú {{ id + 1 }}: </span>
											<span class="red">({{ note.createUser }} - {{ CommonUtils.formatDate(note.createDate) }}) </span>
											<span>{{ note.note }}</span>
										<br>
									</div>
									<div>
										<a class="bt_yellow" @click="() => isHideNote = !isHideNote">Thêm ghi chú</a>
										<br>
										<textarea v-if="!isHideNote" v-model="order.orderChina.orderNote"
											class="note_first" name="order_note" rows="4" cols="30"
											placeholder="Ghi chú"></textarea>
										<br>
										<a v-if="!isHideNote" class="button-link"
											@click="handleOrderNote(order.orderChina)">Lưu</a>
									</div>
								</tr>
							</tbody>
						</table>
					</div>

				</div>
				<div class="col-md-6" style="padding: 15px !important">

					<div class="cu-row" style="display: flex">
						<hr />
						<div class="col-md-6">
							<table class="table borderless no_margin">
								<tbody>
									<tr>
										<td><strong>Tình trạng đơn</strong></td>
										<td>
											<span :class="promptClassByStatusValue(order.orderChina.status)">
												{{
													promptStatusNameByStatus(
														getNextStateOfPkg(order.orderChina.status)
													)
												}}
											</span>
											&nbsp;
											<fa id="tooltip-target-1" icon="question-circle"></fa>
											<b-tooltip style="min-width: 300px" placement="top" variant="light"
												target="tooltip-target-1" triggers="hover">
												<div style="
														font-size: 14px;
														font-weight: 600;
														margin: 0;
														padding: 0;
													">
													<table>
														<tbody>
															<tr>
																<td style="
																	padding: 5px;
																	text-align: left;
																">
																	Đã gửi đơn
																</td>
																<td style="
																	padding: 5px;
																	text-align: right;
																">
																	{{ order?.orderChina?.createUser }} - {{
																		order
																			? CommonUtils.formatDate(order
																				.orderChina
																				.createDate)
																			: "-"
																	}}
																</td>
															</tr>
															<tr>
																<td style="
																	padding: 5px;
																	text-align: left;
																">
																	Đã đặt cọc
																</td>
																<td style="
																	padding: 5px;
																	text-align: right;
																">
																	{{ order?.orderChina?.depositUser }} - {{
																		order
																			? CommonUtils.formatDate(order
																				.orderChina
																				.depositDate)
																			: "-"
																	}}
																</td>
															</tr>
															<tr>
																<td style="
																	padding: 5px;
																	text-align: left;
																">
																	Đã mua hàng
																</td>
																<td style="
																	padding: 5px;
																	text-align: right;
																">
																	{{ order?.orderChina?.userOfPurchase }} - {{
																		order
																			? CommonUtils.formatDate(order
																				.orderChina
																				.dateOfPurchase)
																			: "-"
																	}}
																</td>
															</tr>
															<tr>
																<td style="
																	padding: 5px;
																	text-align: left;
																">
																	Hàng đã về
																	kho TQ
																</td>
																<td style="
																	padding: 5px;
																	text-align: right;
																">
																	{{ order?.orderChina?.userOfChinaInventory }} -
																	{{
																		order
																			? CommonUtils.formatDate(order
																				.orderChina
																				.dateOfChinaInventory)
																			: "-"
																	}}
																</td>
															</tr>
															<tr>
																<td style="
																	padding: 5px;
																	text-align: left;
																">
																	Hàng đã về
																	kho VN
																</td>
																<td style="
																	padding: 5px;
																	text-align: right;
																">
																	{{ order?.orderChina?.userOfVietNamInventory }}
																	- {{
																		order
																			? CommonUtils.formatDate(order
																				.orderChina
																				.dateOfVietNamInventory)
																			: "-"
																	}}
																</td>
															</tr>
															<tr>
																<td style="
																	padding: 5px;
																	text-align: left;
																">
																	Kết thúc
																</td>
																<td style="
																	padding: 5px;
																	text-align: right;
																">
																	{{ order?.orderChina?.userUpdateDateDone }} - {{
																		order
																			? CommonUtils.formatDate(order
																				.orderChina
																				.dateDone)
																			: "-"
																	}}
																</td>
															</tr>
															<tr>
																<td style="
																	padding: 5px;
																	text-align: left;
																">
																	Hủy
																</td>
																<td style="
																	padding: 5px;
																	text-align: right;
																">
																	{{ order?.orderChina?.userDelete }} - {{
																		order
																			? CommonUtils.formatDate(order
																				.orderChina
																				.dateDelete)
																			: "-"
																	}}
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</b-tooltip>
										</td>
									</tr>

									<tr>
										<td><strong>Kho nhận hàng</strong></td>
										<td>
											<span class="green">{{ promptNameByInventoryId(order.customerInfo.inventoryId) }} / {{
												promptLocationByInventoryId(order.customerInfo.inventoryId) }}</span>
										</td>
									</tr>
									<tr>
										<td><strong>Tổng số mã</strong></td>
										<td>
											<span class="red">{{ order.packages.length }}</span>
										</td>
									</tr>
									<tr>
										<td><strong>Tổng cân nặng</strong></td>
										<td>
											<span class="bold">
												{{ order?.orderChina?.isVolume ? order?.orderChina?.totalVolume ? order?.orderChina?.totalVolume : 0 : order?.orderChina?.totalWeight ? order?.orderChina?.totalWeight : 0 }} {{
													order?.orderChina?.isVolume ?
													"Khối" : "Kg" }}
											</span>
										</td>
									</tr>
									<tr>
										<td><strong>Tổng tiền vận chuyển</strong></td>
										<td>
											<span class="blue">{{ order.orderChina.shippingPrice ? order.orderChina.shippingPrice : 0 }}</span> đ
										</td>
									</tr>
									<tr>
										<td><strong>Phí bảo hiểm</strong></td>
										<td>
											<span class="green">
												{{ order?.orderChina?.premium ?
													CommonUtils.formatNumber(order?.orderChina?.premium *
														order?.orderChina?.priceProduct / 100) : 0 }}
											</span> đ
										</td>
									</tr>
									<tr>
										<td><strong>Phí đóng gỗ</strong></td>
										<td>
											<span class="green">
												{{ order?.orderChina?.woodworkingFee ?
													CommonUtils.formatNumber(order?.orderChina?.woodworkingFee) : 0 }}
											</span> đ
										</td>
									</tr>
									<tr>
										<td><strong>Phí khác</strong></td>
										<td>
											<span class="green">
												{{ order?.orderChina?.otherFees ?
													CommonUtils.formatNumber(order?.orderChina?.otherFees) : 0 }}
											</span> đ
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

				</div>

			</div>

			<!-- các thao tác trên đơn hàng -->
			<div class="cu-row">
				<hr />
				<div class="col-md-12">
					<div class="button_confirm clearfix" style="display: flex;">
						<a class="button-link special-green" @click="handleSettleOrder">Thanh toán đơn hàng >></a>
						&nbsp;
						<a @click="openModal('add-addons')" class="button-link special-orange">Thêm chi phí khác
							>></a>
						<b-modal hide-header-close centered title-html="Thêm chi phí khác" id="add-addons">
							<div>
								<span class="green">Mã giao dịch: </span><span class="bold">{{ otherFeeRes.id
									}}</span>
								<br />
								<br />
								<span class="red">Số tiền: </span><input v-model="otherFee.amount" placeholder="0"
									size="20" type="text" />&nbsp;&nbsp;{{ CommonUtils.formatNumber(otherFee.amount)
								}}&nbsp;&nbsp;VNĐ
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
						&nbsp;
						<a @click="openModal('add-woodwork')" class="button-link special-blue">Thêm phí đóng gỗ
							>></a>
						<b-modal hide-header-close centered title-html="Thêm phí đóng gỗ" id="add-woodwork">
							<div>
								<span class="red">Số tiền: </span><input v-model="order.orderChina.otherWoodWookFee"
									placeholder="0" size="20" type="text" />&nbsp;&nbsp;{{
										CommonUtils.formatNumber(order.orderChina.otherWoodWookFee)
									}}&nbsp;&nbsp;VNĐ
							</div>
							<template #modal-footer>
								<b-button variant="outline-primary" style="font-size: 12px" squared
									@click="handleWoodWorkFee(order.orderChina)" class="squared-button">
									Lưu
								</b-button>
								<b-button variant="outline-danger" style="font-size: 12px" squared
									class="squared-button" @click="hideModal(`add-woodwork`)">
									Đóng
								</b-button>
							</template>
						</b-modal>
					</div>
				</div>
			</div>

			<div class="cu-row">
				<hr />
				<table class="table borderless no_margin">
					<tr>
						<td width="10%">
							<span class="bold">Phí vận chuyển</span>
						</td>
						<td width="10%">
							<span class="bold">Tính phí theo</span>
						</td>
						<td width="30%">
							<span class="bold">Trạng thái</span>
						</td>
					</tr>
					<tr>
						<td>
							<span>
								<input v-model="formAdmin.internationalShippingFees" size="12"
                       @input="formatShippingPrice" value="0" type="number" />
								&nbsp;
								<a class="button-link" @click="handleShippingPrice(order.orderChina)">Lưu</a>
							</span>
						</td>
						<td>
							<span>
								<select v-model="order.orderChina.isVolume" style="width: 120px; height: 35px">
									<option :value="true">Thể tích</option>
									<option :value="false">Cân nặng</option>
								</select>
								&nbsp;
								<a class="button-link" @click="handleVolume(order.orderChina)">Lưu</a>
							</span>
						</td>
						<td>
							<span>
								<select v-model="order.orderChina.status" style="width: 120px; height: 35px">
									<option v-for="(
												value, key
											) in CONSTANT.ORDER_STATUS" :key="key" :value="value">
										{{
											CommonUtils.promptOrderStatusNameByValueAdmin(
												value
											)
										}}
									</option>
								</select>
								&nbsp;
								<a class="button-link" @click="handleStatus(order.orderChina)">Lưu</a>
							</span>
						</td>
					</tr>
				</table>
			</div>
		</div>

		<!-- tab kiện hàng -->

		<div id="package" class="bg_white box_info">
			<div class="cu-row">
				<div class="col-md-12">
					<p class="subtitle">
						<strong>
							<fa icon="archive" aria-hidden="true"></fa> Danh
							sách kiện hàng
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
									<td>
										Cân nặng
									</td>
									<td>
										Thể tích
									</td>
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
										<span class="bold">{{ pkg.weigh ? pkg.weigh : "-" }} <span v-if="pkg.weigh">kg</span></span>
									</td>
									<td>
										<span class="bold">{{ pkg.volume ? pkg.volume : "-" }} <span v-if="pkg.volume">khối</span></span>
									</td>
									<td>
										<span class="bold">{{ pkg.quantity }}</span>
									</td>
									<td>
										<span :class="CommonUtils.promptPackageStatusClassByValue(pkg.status)">
											{{
												CommonUtils.promptPackageStatusNameByValue(
													pkg.status
												)
											}}
										</span>
									</td>
									<td>
										<!-- <span class="blue"> -->
										<!-- 	Chi tiết <fa id="tooltip-history" icon="question-circle"></fa> -->
										<!-- </span> -->
										<!-- <b-tooltip  -->
										<!-- 	placement="left"  -->
										<!-- 	variant="light"  -->
										<!-- 	target="tooltip-history" -->
										<!-- 	triggers="hover"> -->
										<!-- 	<span v-for="(log, it) in pkg.packageLogs"> -->
										<!-- 		<div v-if="log != null && log.log != null"> -->
										<!-- 			{{ log.log }} -->
										<!-- 		</div> -->
										<!-- 	</span> -->
										<!-- </b-tooltip> -->
                                        <a class="custom-link hasTooltip tooltipstered">Chi tiết
                                            <fa :id="'info-' + pkg.id" icon="question-circle"></fa>
                                        </a>
                                        <b-tooltip style="min-width: 300px;" placement="left" variant="light"
                                            :target="'info-' + pkg.id" triggers="hover">
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
                                                                CommonUtils.formatDate(pkg.sendBagChinaDate) }}</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
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
                                                                CommonUtils.formatDate(pkg.vnWarehousingDate) }}</strong>
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
							<fa icon="money-bill" aria-hidden="true"></fa> Danh
							sách giao dịch
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
								<tr v-for="(
										transaction, index
									) in order.transactionHistory">
									<td>{{ index + 1 }}</td>
									<td>
										<span class="bold">
											{{
												CommonUtils.formatDate(
													transaction.createDate
												)
											}}
										</span>
									</td>
									<td>
										<span class="blue">
											{{ transaction.transactionCode }}
										</span>
									</td>
									<td>
										<span class="green">
											{{
												promptOptionsFromValue(
													transaction.type
												)
											}}
										</span>
									</td>
									<td>{{ transaction.description }}</td>
									<td v-if="transaction.byAdmin === null || transaction.byAdmin === ''">
										<span v-if="transaction.type == 4" class="green bold">+</span>
										<span v-else class="red bold">-</span>
										<span :class="{ red: transaction.type != 4, green: transaction.type == 4 }">
											{{
												CommonUtils.formatNumber(
													transaction.amount
												)
											}}
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
											{{
												CommonUtils.formatNumber(
													transaction.amountBefore
												)
											}}
										</span>
										(vnđ)
									</td>
									<td>
										<span class="red">
											{{
												CommonUtils.formatNumber(
													transaction.amountAfter
												)
											}}
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
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffTransportOrderDetailSection",
	data() {
		return {
			orderId: this.$route.params.orderId,
			order: null,
			customerInfo: {},
			info: {},

			order_shop_code: [],
			packages: [],

			isHideNote: true,

			valueShopCodeAppend: "",

			woodWorkEnable: false,
			tallyEnable: false,

			otherFee: {
				amount: null,
				note: "",
			},
			otherFeeRes: {},

			shipCode: "",

			isDataReady: false,

			commonStore: useCommonStore(),

			fee_per_weight: [],
      formAdmin : {
        purchaseFeePerSent: null,
        internationalShippingFees: null,
        exchangeRate: null,
      },
		};
	},
	mounted() {
		this.getDetail(this.orderId).then(res => {
			let feePerWeight = this.order.orderChina.isVolume ? this.commonStore.deposit_bulk_fee_by_weight : this.commonStore.deposit_fee_by_weight;
			this.fee_per_weight = feePerWeight.reduce((acc, item) => {
				acc[item.nameDescription] = item.value;
				return acc;
			}, {})
		});

	},
	methods: {
		promptLocationByInventoryId(id) {
			return this.commonStore.inventories?.filter($ => $.id == id)[0]?.location;
		},
		promptNameByInventoryId(id) {
			return this.commonStore.inventories?.filter($ => $.id == id)[0]?.name;
		},
		async getDetail(id) {
			let loader = this.$loading.show();
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
			await this.getCustomer(this.order.customerInfo.id);
			await this.getInfoOf(this.order.customerInfo.id);
			await this.getListOrderShopCode(this.order.orderChina.id);
			await this.getListPackage(this.order.orderChina.id);
      this.formatShippingPrice();
			this.woodWorkEnable = this.order.orderChina.isWoodworkingFee;
			this.tallyEnable = this.order.orderChina.isTallyFee;
			this.isDataReady = true;
      this.formAdmin.internationalShippingFees = this.order.orderChina.internationalShippingFees;
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
		},
		hideModal(id) {
			this.$bvModal.hide(id);
			this.otherFeeRes = {};
			this.otherFee = {
				amount: null,
				note: '',
			}
		},
		promptStatusByValue(status) {
			switch (status) {
				case 1:
					return "Đang chờ cọc";
				case 2:
					return "Đã đặt cọc";
				case 3:
					return "Đã mua hàng";
				case 4:
					return "Hàng đã về kho TQ";
				case 5:
					return "Hàng đã về kho VN";
				case 6:
					return "Sẵn sàng giao hàng";
				case 7:
					return "Chờ xử lý khiếu nại";
				case 8:
					return "Đã kết thúc";
				case 9:
					return "Đã huỷ";
			}
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
					return "chokhieunai";
				case 8:
					return "daketthuc";
				case 9:
					return "dahuy";
			}
		},
		promptOptionsFromValue(value) {
			switch (value) {
				case 1:
				return "Giao dịch nạp tiền";
				case 0:
				return "Giao dịch rút tiền";
				case 2:
				return "Giao dịch đặt cọc";
				case 3:
				return "Giao dịch tất toán";
				case 4:
				return "Giao dịch hoàn tiền";
			}
		},
		async toggleWoodWork(event) {
			let loader = this.$loading.show();
			const value = event.target.checked;
			const payload = {
				id: this.orderId,
				isWoodworkingFee: value,
			};
			const res = await ApiCaller.post(
				ROUTES.Order.updateOrderStatus,
				payload
			);
			loader.hide();
			if (res.status == 200) {
				this.$toast.success(`Chuyển trạng thái đóng gỗ thành công`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
				this.resetForm();
				this.filterPendingTopup();
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
			}
			this.getDetail(this.orderId);
		},
		async toggleTally(event) {
			let loader = this.$loading.show();
			const value = event.target.checked;
			const payload = {
				id: this.orderId,
				isTallyFee: value,
			};
			const res = await ApiCaller.post(
				ROUTES.Order.updateOrderStatus,
				payload
			);
			loader.hide();
			if (res.status == 200) {
				this.$toast.success(`Chuyển trạng thái kiểm đếm thành công`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
				this.resetForm();
				this.filterPendingTopup();
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
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
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
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			loader.hide();
		},
		async getListOrderShopCode(orderId) {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(
				ROUTES.OrderShopCode.findByOrderId(orderId)
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
			res.data.forEach(($) => ($.isDefault = true));
			this.order_shop_code = [
				...res.data,
				{
					shopId: "",
					domesticFees: "",
					domesticFeesReal: "",
				},
			];
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
		formatDomesticFees(index) {
			// Remove commas from the input string
			let unformattedNumber = this.order_shop_code[
				index
			].domesticFees.replace(/,/g, "");

			// Format the number with commas
			this.order_shop_code[index].domesticFees = unformattedNumber
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		formatDomesticFeesReal(index) {
			// Remove commas from the input string
			let unformattedNumber = this.order_shop_code[
				index
			].domesticFeesReal.replace(/,/g, "");

			// Format the number with commas
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
							const value = Number(
								(item[key] + "").replace(/,/g, "")
							);
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
				const res = await ApiCaller.post(
					ROUTES.Package.create,
					payload
				);
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
				const res = await ApiCaller.post(ROUTES.OtherFee.create, this.otherFee);
				this.otherFeeRes = res.data;
				if (res.status == 200) {
					this.$toast.success(`Thêm chi phí khác cho đơn hàng ${this.order.orderChina.orderCode} thành công`, {
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
				loader.hide();
			} else {
				this.$toast.error(`Số tiền bắt buộc nhập`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
			event.preventDefault();
		},
		async handleSettleOrder() {
			const loader = this.$loading.show();
			const payload = {
				id: this.order.orderChina.id,
				status: CONSTANT.ORDER_STATUS.SAN_SANG_GIAO_HANG,
        isSettle: true
			}
			const res = await ApiCaller.post(ROUTES.Order.updateOrderStatus, payload);
			if (res.status == 200) {
				this.$toast.success(`Thanh toán cho đơn hàng ${this.order.orderChina.orderCode} thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
			loader.hide();
			this.getDetail(this.orderId)
		},
		async handleServiceFee(orderChina) {
			const loader = this.$loading.show()
			const payload = {
				orderId: orderChina.id,
				serviceFee: orderChina.serviceFee,
			}
			const res = await ApiCaller.post(ROUTES.Order.updateFee, payload);
			if (res.status == 200) {
				this.$toast.success(`Cập nhật phí dịch vụ cho đơn hàng ${orderChina.orderCode} thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
			loader.hide();
			this.getDetail(this.orderId)
		},
		async handleWoodWorkFee(orderChina) {
			const loader = this.$loading.show()
			const payload = {
				orderId: orderChina.id,
				woodworkingFee: orderChina.woodworkingFee,
			}
			const res = await ApiCaller.post(ROUTES.Order.updateFee, payload);
			if (res.status == 200) {
				this.$toast.success(`Cập nhật phí đóng gỗ cho đơn hàng ${orderChina.orderCode} thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
			loader.hide();
			this.getDetail(this.orderId)
		},
		async handleShippingPrice(orderChina) {
			const loader = this.$loading.show()
			const payload = {
				orderId: orderChina.id,
				shippingPrice: parseFloat(
            CommonUtils.removeCommas(this.formAdmin.internationalShippingFees),
        ),
			}
			const res = await ApiCaller.post(ROUTES.Order.updateFee, payload);
			if (res.status == 200) {
				this.$toast.success(`Cập nhật phí vận chuyển cho đơn hàng ${orderChina.orderCode} thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
			loader.hide();
			this.getDetail(this.orderId)
		},
		async handleExchangeRate(orderChina) {
			const loader = this.$loading.show()
			const payload = {
				orderId: orderChina.id,
				exchangeRate: orderChina.exchangeRate,
			}
			const res = await ApiCaller.post(ROUTES.Order.updateFee, payload);
			if (res.status == 200) {
				this.$toast.success(`Cập nhật tỷ giá cho đơn hàng ${orderChina.orderCode} thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
			loader.hide();
			this.getDetail(this.orderId)
		},
		async handleStatus(orderChina) {
			const loader = this.$loading.show()
			const payload = {
				orderId: orderChina.id,
				status: orderChina.status,
			}
			const res = await ApiCaller.post(ROUTES.Order.updateFee, payload);
			if (res.status == 200) {
				this.$toast.success(`Cập nhật trạng thái cho đơn hàng ${orderChina.orderCode} thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
			loader.hide();
			this.getDetail(this.orderId)
		},
		async handleVolume(orderChina) {
			const loader = this.$loading.show()
			const payload = {
				orderId: orderChina.id,
				isVolume: orderChina.isVolume ? orderChina.isVolume : false,
			}
			const res = await ApiCaller.post(ROUTES.Order.updateFee, payload);
			if (res.status == 200) {
				this.$toast.success(`Cập nhật loại tính phí cho đơn hàng ${orderChina.orderCode} thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
			loader.hide();
			this.getDetail(this.orderId)
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
		async handleOrderNote(order) {
			const payload = {
				orderId: order.id,
				note: order.orderNote,
			}
			const loader = this.$loading.show();
			const res = await ApiCaller.post(ROUTES.OrderNote.create, payload);
			loader.hide();
			if (res.status == 200) {
				this.$toast.success(`Thêm ghi chú cho đơn hàng ${order.orderCode} thành công`, {
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
	},
};
</script>

<!-- style custom -->
<style scoped>
.cu-row {
	padding: 20px 0px;
}
</style>
