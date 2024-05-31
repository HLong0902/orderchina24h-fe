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
					<span class="bold">Ngày đặt: </span><span>{{ CommonUtils.formatDate(order.orderChina.dateOfPurchase)
						}}</span>
				</div>
			</div>
			<div class="col-md-12" style="display: flex">
				<div class="col-md-6" style="padding: 15px !important">
					<div class="cu-row">
						<table class="table borderless no_margin">
							<tbody>
								<tr>
									<td><strong>Tên KH</strong></td>
									<td>
										<strong>{{ order.address.name }}</strong>
									</td>
								</tr>
								<tr>
									<td><strong>Địa chỉ</strong></td>
									<td>
										<strong>{{ order.address.address }}</strong>
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
											<span>đ / KG</span>
										</div>
									</td>
									<td>
										<table>
											<tr v-for="(val, key) in fee_per_weight">
												<td>
													<span class="red">{{ key }}</span>
												</td>
												<td>
													<span class="green">{{ val
														}}</span> vnđ
													/ KG
												</td>
												<br>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td><strong>Ghi chú</strong></td>
									<td>
										<input type="text" size="35">
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
														getNextStateOfPkg(order.orderChina.status)
													)
												}}
											</a>
										</td>
									</tr>

									<tr>
										<td><strong>Kho nhận hàng</strong></td>
										<td>
											{{ promptLocationByInventoryId(order.customerInfo.inventoryId) }} - {{
												promptNameByInventoryId(order.customerInfo.inventoryId) }}
										</td>
									</tr>
									<tr>
										<td><strong>Tổng số mã</strong></td>
										<td>
											{{ order.packages.length }}
										</td>
									</tr>
									<tr>
										<td><strong>Tổng cân nặng</strong></td>
										<td>
											{{ order.packages.reduce((SubmitEvent, item) => sum + item.weigh ?
												item.weigh : 0, 0) }}
										</td>
									</tr>
									<tr>
										<td><strong>Tổng tiền vận chuyển</strong></td>
										<td>
											{{ order.orderChina.shippingPrice ? order.orderChina.shippingPrice : 0 }}
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
								<span class="bold">Ghi chú: </span><input v-model="otherFee.note" size="50"
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
								<input v-model="order.orderChina.shippingPrice" size="12" value="0" type="text" />
								&nbsp;
								<a class="button-link" @click="handleShippingPrice(order.orderChina)">Lưu</a>
							</span>
						</td>
						<td>
							<span>
								<select v-model="order.orderChina.isVolume" style="width: 120px; height: 35px">
									<option :value="true">Thể tích</option>
									<option :value="false || null">Cân nặng</option>
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
											CommonUtils.promptOrderStatusNameByValue(
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
					<div class="gridtable">
						<table>
							<tbody>
								<tr class="header-cart-table">
									<td style="width: 5%">STT</td>
									<td>Mã vận đơn</td>
									<td>Tên người nhận</td>
									<td>Mô tả về mặt hàng</td>
									<td>Phí VCQT</td>
									<td>Phí khác</td>
									<td>Phí đóng gỗ</td>
									<td width="25%">Lịch sử</td>
								</tr>
								<tr v-for="(pkg, index) in packages">
									<td>{{ index + 1 }}</td>
									<td>{{ pkg.shipCode }}</td>
									<td class="center">
										{{ order.address.name }}
									</td>
									<td class="center">
										{{ pkg.note }}
									</td>
									<td class="center">{{ pkg.domesticFees }}</td>
									<td class="center" v-if="index == 0" :rowspan="packages.length">
										<span class="green">
											{{
												CommonUtils.formatNumber(order.otherFees.reduce((sum, fee) => sum +
													fee.amount ?
													fee.amount
													: 0, 0))
											}}
										</span> VND
									</td>
									<td class="center" v-if="index == 0" :rowspan="packages.length">
										<span class="green">{{ order.orderChina.woodworkingFee ?
											order.orderChina.woodworkingFee
											: 0
											}}</span> VND
									</td>
									<td class="center" v-if="index == 0" :rowspan="packages.length">
										<p v-for="(log, id) in order.orderLogs">{{ log.log }}</p>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

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
			let feePerWeight = this.commonStore.lst_fee_by_weight;
			this.fee_per_weight = feePerWeight.reduce((acc, item) => {
				acc[item.name] = item.value;
				return acc;
			}, {})
		});

	},
	methods: {
		promptLocationByInventoryId(id) {
			return this.commonStore.inventories[id]
				? this.commonStore.inventories[id].location
				: "";
		},
		promptNameByInventoryId(id) {
			return this.commonStore.inventories[id]
				? this.commonStore.inventories[id].name
				: "";
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
					this.$toast.success(`Thêm chi phí khác cho đơn hàng ${this.order.orderChina.orderCode}`, {
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
.cu-row {
	padding: 20px 0px;
}
</style>
