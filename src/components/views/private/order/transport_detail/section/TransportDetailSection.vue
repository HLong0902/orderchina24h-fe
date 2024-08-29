<script setup>
import CONSTANT from "../../../../../../constants/constants";
import ROUTES from "../../../../../../constants/routeDefine";
import { useCommonStore } from "../../../../../../store/CommonStore";
import ApiCaller from "../../../../../utils/ApiCaller";
import CommonUtils from "../../../../../utils/CommonUtils";
</script>

<!-- template section -->
<template>
	<div id="content">
		<div class="container">
			<main class="main" role="main">
				<div class="row main-row" v-if="isDataReady">
					<div class="col-sm-9">
						<div class="cart-by-page">
							<div class="bg_white box_info" style="display: flex; flex-direction: column;">
								<div style="align-self: center; text-align: center;">
									<div style="font-size: 20px;">
										<span class="bold">Mã: </span><span class="blue">{{ order.orderChina.orderCode
											}}</span>
									</div>
									<div>
										<span class="bold">Ngày đặt: </span><span>{{
											CommonUtils.formatDate(order.orderChina.createDate)
										}}</span>
									</div>
								</div>
								<div class="col-md-12" style="display: flex">
									<div class="col-md-6" style="padding: 15px !important">
										<div class="cu-row">
											<table class="table borderless no_margin">
												<tbody>
													<tr>
														<td width="30%"><strong>Tên KH</strong></td>
														<td>
															<strong>{{ CommonUtils.getUserDTO().username }}</strong>
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
															<strong>{{ order.address.phoneNumber }}</strong>
														</td>
													</tr>
													<tr>
														<td>
															<div>
																<strong>Phí cân nặng</strong>
																<br>
																<span v-if="order.orderChina.isVolume">đ / Khối</span>
																<span v-else>đ / KG</span>
															</div>
														</td>
														<td>
															<table>
																<tr v-for="(val, key) in fee_per_weight">
																	<td>
																		<span class="bold red">{{ key }}</span>
																	</td>
																	<td>
																		<span class="green">{{ !parseInt(val) ? val :
																			CommonUtils.formatNumber(val)
																			}}</span>
																		<span
																			v-if="order.orderChina.isVolume && parseInt(val)">
																			đ / Khối</span>
																		<span
																			v-else-if="!order.orderChina.isVolume && parseInt(val)">
																			đ / KG</span>
																		<span v-else></span>
																	</td>
																</tr>
															</table>
														</td>
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
																<a class="special-green">
																	{{
																		promptStatusNameByStatus(
																			order.orderChina.status
																		)
																	}}
																</a>
															</td>
														</tr>

														<tr>
															<td><strong>Kho nhận hàng</strong></td>
															<td>
																{{
																	promptNameByInventoryId(order.customerInfo.inventoryId)
																}} / {{
																	promptLocationByInventoryId(order.customerInfo.inventoryId)
																}}
															</td>
														</tr>
														<tr>
															<td><strong>Tổng số mã</strong></td>
															<td>
																{{ order.packages.length }}
															</td>
														</tr>
														<tr v-if="order.orderChina.isVolume">
															<td><strong>Tổng khối</strong></td>
															<td>
																<span class="bold">
																	{{ order?.orderChina?.isVolume ?
																		order?.orderChina?.totalVolume ?
																			order?.orderChina?.totalVolume : 0 :
																		order?.orderChina?.totalWeight ?
																	order?.orderChina?.totalWeight : 0 }} {{
																		order?.orderChina?.isVolume ?
																			"Khối" : "Kg" }}
																</span>
															</td>
														</tr>
														<tr v-else>
															<td><strong>Tổng cân nặng</strong></td>
															<td>
																<span class="bold">
																	{{ order.orderChina.totalWeight ?
																		order.orderChina.totalWeight : 0}}
																</span>
																<span>{{ order.orderChina.isVolume ? " Khối" : "Kg"}}</span>
															</td>
														</tr>
														<tr>
															<td><strong>Tổng tiền vận chuyển</strong></td>
															<td>
																{{ order.orderChina.shippingPrice ?
																	CommonUtils.formatNumber(order.orderChina.shippingPrice)
																: 0 }} đ
															</td>
														</tr>
														<tr>
															<td><strong>Phí bảo hiểm</strong></td>
															<td>
																<span class="green">
																	{{ order?.orderChina?.premium ?
																		CommonUtils.formatNumber(order?.orderChina?.premium
																			*
																			order?.orderChina?.priceProduct / 100) : 0 }}
																</span> đ
															</td>
														</tr>
														<tr>
															<td><strong>Phí đóng gỗ</strong></td>
															<td>
																<span class="green">
																	{{ order?.orderChina?.woodworkingFee ?
																		CommonUtils.formatNumber(order?.orderChina?.woodworkingFee)
																		: 0 }}
																</span> đ
															</td>
														</tr>
														<tr>
															<td><strong>Phí khác</strong></td>
															<td>
																<span class="green">
																	{{ order?.orderChina?.otherFees ?
																		CommonUtils.formatNumber(order?.orderChina?.otherFees)
																		: 0 }}
																</span> đ
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>

									</div>

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
											<table style="word-break: break-all;">
												<tbody>
													<tr class="header-cart-table">
														<td style="width: 4%">STT</td>
														<td style="width: 10%">Mã kiện</td>
														<td style="width: 10%">Tên người nhận</td>
														<td style="width: 15%">Mã vận đơn</td>
														<td style="width: 15%">Mô tả mặt hàng</td>
														<td>Cân nặng</td>
														<td>Thể tích</td>
														<td>Số lượng</td>
														<td>Trạng thái</td>
														<!--														<td>Lịch sử</td>-->
													</tr>
													<tr v-for="(pkg, index) in packages">
														<td>{{ index + 1 }}</td>
														<td>
															<span class="blue">
																{{ pkg.packageCode }}
															</span>
														</td>
														<td>
															<span>
																{{ pkg.receiver }}
															</span>
														</td>
														<td>
															<span class="green">
																{{ pkg.shipCode }}
															</span>
														</td>
														<td>
															<span>
																{{ pkg.note }}
															</span>
														</td>
														<td>
															<span class="bold">{{ pkg.weigh ? pkg.weigh + " kg" : "-"
																}}</span>
														</td>
														<td>
															<span class="bold">{{ pkg.volume ? pkg.volume + " khối" :
																"-" }} </span>
														</td>
														<td>
															<span class="bold">{{ pkg.quantity }}</span>
														</td>
														<td>
															<span
																:class="CommonUtils.promptPackageStatusClassByValue(pkg.status)">
																{{
																	CommonUtils.promptPackageStatusNameByValue(
																		pkg.status
																	)
																}}
															</span>
														</td>
														<!--														<td>-->
														<!--															<span class="blue">-->
														<!--																Chi tiết <fa id="tooltip-target-1"-->
														<!--																	icon="question-circle"></fa>-->
														<!--															</span>-->
														<!--															<b-tooltip style="min-width: 300px" placement="left"-->
														<!--																variant="new-variant" target="tooltip-target-1"-->
														<!--																triggers="hover">-->
														<!--																<div style="-->
														<!--                      font-size: 14px;-->
														<!--                      font-weight: 400;-->
														<!--                      margin: 0;-->
														<!--                      padding: 0;-->
														<!--					  font-weight: 600;-->
														<!--                    ">-->
														<!--																	<table>-->
														<!--																		<tbody>-->
														<!--																			<tr>-->
														<!--																				<td-->
														<!--																					style="padding: 5px; text-align: left">-->
														<!--																					Đã gửi đơn-->
														<!--																				</td>-->
														<!--																				<td-->
														<!--																					style="padding: 5px; text-align: right">-->
														<!--																					{{ order?.orderChina?.depositUser }}-->
														<!--																					- -->
														<!--																					{{-->
														<!--																						order?.orderChina?.createDate-->
														<!--																							? CommonUtils.formatDate(-->
														<!--																								order?.orderChina?.createDate,-->
														<!--																							)-->
														<!--																							: "-"-->
														<!--																					}}-->
														<!--																				</td>-->
														<!--																			</tr>-->
														<!--																			<tr>-->
														<!--																				<td-->
														<!--																					style="padding: 5px; text-align: left">-->
														<!--																					Đã đặt cọc-->
														<!--																				</td>-->
														<!--																				<td-->
														<!--																					style="padding: 5px; text-align: right">-->
														<!--																					{{ order?.orderChina?.depositUser }}-->
														<!--																					- -->
														<!--																					{{-->
														<!--																						order?.orderChina?.depositDate-->
														<!--																							? CommonUtils.formatDate(-->
														<!--																								order?.orderChina?.depositDate,-->
														<!--																							)-->
														<!--																							: "-"-->
														<!--																					}}-->
														<!--																				</td>-->
														<!--																			</tr>-->
														<!--																			<tr>-->
														<!--																				<td-->
														<!--																					style="padding: 5px; text-align: left">-->
														<!--																					Đã mua hàng-->
														<!--																				</td>-->
														<!--																				<td-->
														<!--																					style="padding: 5px; text-align: right">-->
														<!--																					{{ order?.orderChina?.userOfPurchase-->
														<!--																					}} - -->
														<!--																					{{-->
														<!--																						order?.orderChina?.dateOfPurchase-->
														<!--																							? CommonUtils.formatDate(-->
														<!--																								order?.orderChina?.dateOfPurchase,-->
														<!--																							)-->
														<!--																							: "-"-->
														<!--																					}}-->
														<!--																				</td>-->
														<!--																			</tr>-->
														<!--																			<tr>-->
														<!--																				<td-->
														<!--																					style="padding: 5px; text-align: left">-->
														<!--																					Hàng đã về kho TQ-->
														<!--																				</td>-->
														<!--																				<td-->
														<!--																					style="padding: 5px; text-align: right">-->
														<!--																					{{-->
														<!--																						order?.orderChina?.userOfChinaInventory-->
														<!--																					}} - -->
														<!--																					{{-->
														<!--																						order?.orderChina?.dateOfChinaInventory-->
														<!--																							? CommonUtils.formatDate(-->
														<!--																								order?.orderChina?.dateOfChinaInventory,-->
														<!--																							)-->
														<!--																							: "-"-->
														<!--																					}}-->
														<!--																				</td>-->
														<!--																			</tr>-->
														<!--																			<tr>-->
														<!--																				<td-->
														<!--																					style="padding: 5px; text-align: left">-->
														<!--																					Hàng đã về kho VN-->
														<!--																				</td>-->
														<!--																				<td-->
														<!--																					style="padding: 5px; text-align: right">-->
														<!--																					{{-->
														<!--																						order?.orderChina?.userOfVietNamInventory-->
														<!--																					}} - -->
														<!--																					{{-->
														<!--																						order?.orderChina?.dateOfVietNamInventory-->
														<!--																							? CommonUtils.formatDate(-->
														<!--																								order?.orderChina?.dateOfVietNamInventory,-->
														<!--																							)-->
														<!--																							: "-"-->
														<!--																					}}-->
														<!--																				</td>-->
														<!--																			</tr>-->
														<!--																			<tr>-->
														<!--																				<td-->
														<!--																					style="padding: 5px; text-align: left">-->
														<!--																					Kết thúc-->
														<!--																				</td>-->
														<!--																				<td-->
														<!--																					style="padding: 5px; text-align: right">-->
														<!--																					{{-->
														<!--																						order?.orderChina?.userUpdateDateDone-->
														<!--																					}} - -->
														<!--																					{{-->
														<!--																						order?.orderChina?.dateDone-->
														<!--																							? CommonUtils.formatDate(-->
														<!--																								order?.orderChina?.dateDone,-->
														<!--																							)-->
														<!--																							: "-"-->
														<!--																					}}-->
														<!--																				</td>-->
														<!--																			</tr>-->
														<!--																			<tr>-->
														<!--																				<td-->
														<!--																					style="padding: 5px; text-align: left">-->
														<!--																					Hủy</td>-->
														<!--																				<td-->
														<!--																					style="padding: 5px; text-align: right">-->
														<!--																					{{ order?.orderChina?.userDelete }}-->
														<!--																					- -->
														<!--																					{{-->
														<!--																						order?.orderChina?.dateDelete-->
														<!--																							? CommonUtils.formatDate(-->
														<!--																								order?.orderChina?.dateDelete,-->
														<!--																							)-->
														<!--																							: "-"-->
														<!--																					}}-->
														<!--																				</td>-->
														<!--																			</tr>-->
														<!--																		</tbody>-->
														<!--																	</table>-->
														<!--																</div>-->
														<!--															</b-tooltip>-->
														<!--														</td>-->
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<!-- kiện hàng -->
							<br><br>
							<br><br>

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
														<td class="center" style="width: 35%">
															Người thêm
														</td>
													</tr>
													<tr v-for="(fee, it) in order.otherFees">
														<td>{{ it + 1 }}</td>
														<td>{{ }}</td>
														<td><span class="green">
																{{ CommonUtils.formatNumber(fee.amount) }}
															</span> VND</td>
														<td>{{ fee.description }}</td>
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
							<br><br><br>
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
																{{ transaction.typeName }}
															</span>
															<br>
															<span class="red" v-if="transaction.typeName">
																{{ order?.orderChina?.orderCode }}
															</span>
														</td>
														<td>{{ transaction.description }}</td>
														<td>
															<span v-if="transaction.type == 4"
																class="green bold">+</span>
															<span v-else class="red bold">-</span>
															<span
																:class="{ red: transaction.type != 4, green: transaction.type == 4 }">
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
	name: "TransportDetailSection",
	data() {
		return {
			orderId: this.$route.params.orderId,
			order: null,
			customerInfo: {},
			info: {},

			order_shop_code: [],
			packages: [],

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
		};
	},
	mounted() {
		this.getDetail(this.orderId).then(res => {
			let feePerWeight = this.order.orderChina.isVolume ? this.commonStore.deposit_bulk_fee_by_weight : this.commonStore.deposit_fee_by_weight;
			this.fee_per_weight = feePerWeight.reduce((acc, item) => {
				acc[item.name] = item.value;
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
			this.order.orderChina.depositDate = this.formatDate(
				this.order.orderChina.depositDate
			);
			this.order.orderChina.depositDate = this.formatDate(
				this.order.orderChina.depositDate
			);
			this.order.orderChina.dateOfPurchase = this.formatDate(
				this.order.orderChina.dateOfPurchase
			);
			this.order.orderChina.dateOfChinaInventory = this.formatDate(
				this.order.orderChina.dateOfChinaInventory
			);
			this.order.orderChina.dateOfVietNamInventory = this.formatDate(
				this.order.orderChina.dateOfVietNamInventory
			);
			this.order.orderChina.dateDone = this.formatDate(
				this.order.orderChina.dateDone
			);
			this.order.orderChina.dateDelete = this.formatDate(
				this.order.orderChina.dateDelete
			);
			this.woodWorkEnable = this.order.orderChina.isWoodworkingFee;
			this.tallyEnable = this.order.orderChina.isTallyFee;
			this.isDataReady = true;
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
					return "Nạp tiền";
				case 0:
					return "Rút tiền";
				case 2:
					return "Đặt cọc";
				case 3:
					return "Tất toán";
				case 4:
					return "Hoàn tiền";
				case 5:
					return "Thanh toán đơn hàng";
				case 6:
					return "Thanh toán vận đơn";
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
				shippingPrice: orderChina.shippingPrice,
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
				isVolume: orderChina.isVolume,
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
				case 1:
					return "Đã duyệt";
				case 2:
					return "Đã đặt cọc";
				case 3:
					return "Đã mua hàng";
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
	},
};
</script>

<!-- style custom -->
<style scoped>
@import '../../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../../assets/styles/private-styles.css';

.gridtable.class-center td {
	text-align: center;
}
</style>
