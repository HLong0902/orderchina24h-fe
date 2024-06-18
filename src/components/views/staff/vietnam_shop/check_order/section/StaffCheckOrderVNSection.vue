<script setup>
import CONSTANT from "../../../../../../constants/constants";
import ROUTES from "../../../../../../constants/routeDefine";
import { useCommonStore } from "../../../../../../store/CommonStore";
import ApiCaller from "../../../../../utils/ApiCaller";
import CommonUtils from "../../../../../utils/CommonUtils";
</script>

<!-- template section -->
<template>
	<div id="content" class="fullwidth clearfix">
		<div class="lists_ship clearfix">
			<h2 class="align-center">Kiểm hàng &amp; Nhập kho VN</h2>
		</div>
		<br />
		<center>
			<p class="red big">
				Chú ý : Chỉ kiểm đểm số lượng khi phí dịch vụ &lt;= 2%
			</p>
		</center>
		<div class="formSearchVandon">
			<form @submit.prevent="handleSubmit" action="" method="post" id="ajaxFormSearch">
				<span>Tìm theo mã shop : </span><input v-model="isSearchShopCode" type="checkbox" name="findType"
					style="width: 20px; height: 20px" />
				<br />
				Mã vận đơn:
				<input v-model="query" type="text" name="keyword" value="" />
				&nbsp;
				<input @click="searchOrder" type="submit" name="" value="Tìm kiếm" /><br />
				<!-- <input type="checkbox" name="sweep" value="1"> Quét nhập kho -->
				<input type="checkbox" name="addShipUndefine" v-model="isSaveShipCode" /> Tự
				động lưu mã không xác định nếu không tìm thấy mẫ VĐ
			</form>
		</div>

		<div v-if="orders.length > 0" id="response_ajax_search" class="alert-success">
			<div v-for="(order, index) in orders" class="wrapper_check_shop" style="margin-bottom: 30px">
				<div class="filter_shopid align-center uppercase">
					<h1>
						<a style="cursor: pointer; color: #0000ff;" target="_blank"
							@click="viewDetail(order.orderChina.id, order.orderChina.type)">{{
								order.orderChina.orderCode }}
						</a>
						- {{ order.customerInfo.username }}
					</h1>
				</div>
				<div class="info_check clearfix">
					<div style="float: left;">
						<div class="count_item">
							Tổng số SP:
							<span class="red">{{
								order.orderDetails.reduce(
									(sum, item) => (sum += item.totalCheck ? parseInt(item.totalCheck) : 0),
									0
								)
							}}</span>
							Số Shop:
							<span class="green">{{ orders.length }}</span>
						</div>
						<div class="info_others clearfix">
							<div class="float-left">
								<div>
									Kho nhận hàng:
									<span class="bold black">{{
										promptInventoryNameById(
											order.address.inventoryId
										)
									}}</span>
								</div>
							</div>
						</div>
					</div>
					<a style="float: right;" @click="updateOrder(order)" class="button-link">Lưu thông tin</a>
				</div>

				<div class="gridtable clearfix">
					<table>
						<tbody>
							<tr>
								<td width="30%">Sản phẩm</td>
								<td width="15%" class="align-center">
									Giá(NDT)
								</td>
								<td width="10%" class="align-center">
									Số lượng
								</td>
								<td width="20%"></td>
							</tr>
							<tr>
								<td colspan="8">
									<div class="float-left">
										Người bán :
										<span class="blue">
											{{
												order.orderDetails[0]?.sellerId
											}}</span>
										( Số lượng YC/Đặt/Kiểm:
										<span class="green">{{
											order.orderDetails.reduce(
												(sum, item) =>
													(sum += item.numberItem),
												0
											) +
											"/" +
											order.orderDetails.reduce(
												(sum, item) =>
													(sum += item.numberItem),
												0
											) +
											"/" +
											order.orderDetails.reduce(
												(sum, item) =>
													(sum += item.totalCheck ? parseInt(item.totalCheck) : 0),
												0
											)
										}}</span>
										)
									</div>
								</td>
							</tr>
							<tr v-for="(detail, idx) in order.orderDetails" class="">
								<td>
									<div class="image">
										<a :href="detail.itemLink" target="_blank"><img :src="detail.itemImage"
												width="100px" height="100px" /></a>
									</div>
									<div class="info">
										<div class="price">
											<a :href="detail.itemLink" target="_blank">
												<span style="
														font-size: 15px;
														font-weight: 600;
													"><i class="fa fa-jpy" aria-hidden="true"></i>
													{{ detail.totalPriceNDT }}
												</span>
												{{ detail.itemTitle }}</a>
										</div>
										<div class="title">
											{{ detail.color }};
											{{ detail.size }};
											{{ detail.totalPriceNDT }}
										</div>
									</div>
								</td>
								<td class="align-center">{{ detail.itemPrice }}</td>
								<td class="align-center" style="position: relative">
									<input type="checkbox" value="" style="
											width: 40px;
											height: 40px;
											position: absolute;
											top: 0;
											right: 0;
										" />
									<p class="big">{{ detail.numberItem }} / {{ detail.numberItem }} / {{
										detail.totalCheck ? detail.totalCheck : '0' }}</p>
									<!--- Kiểm hàng --->
									<form action="" class="ajaxFormItem ajaxAuto" method="POST">
										<b>Số lượng kiểm :</b>
										<input type="text" value="0" size="6" v-model="detail.totalCheck"
											name="item_check_quantity" />
										<!-- <a :class="{ buttonLink: detail.totalCheck > 0 }" v-if="detail.totalCheck > 0"
											@click="handleTally(order, detail)">Lưu</a> -->
										<div class="ajax_response alert dismissable"></div>
									</form>
								</td>

								<td v-if="idx == 0" rowspan="4" class="specials">
									<div class="green">
										<b>Mã shop: </b> {{ order.orderDetails[0]?.sellerId }}
									</div>
									<p class="bold">
										Phí nội địa:
										<span class="note small">{{ order.orderChina.domesticFeesChina ?
											CommonUtils.formatNumber(order.orderChina.domesticFeesChina) : 0 }}</span>
									</p>
									<hr />

									<div class="vandon_form">
										<h4 class="pull-left">Kiểm đếm</h4>
										<input style="
												width: 30px;
												height: 30px;
												margin-left: 10px;
											" type="checkbox" :disabled="true" :checked="order.orderChina.isTallyFee" />
									</div>
									<form action="" class="ajaxForm_Ships ajaxAuto" method="POST">
										<div class="vandon_form">
											<h4 class="pull-left">
												Đóng thùng gỗ
											</h4>
											<input style=" width: 30px; height: 30px; margin-left: 10px; "
												type="checkbox" :disabled="true"
												:checked="order.orderChina.isWoodworkingFee" />
										</div>
									</form>
									<form action="" class="ajaxForm_Ships ajaxAuto" method="POST">
										<div class="vandon_form">
											<h4 class="pull-left">
												Tính theo khối
											</h4>
											<input :checked="order.orderChina.isVolume" style="
													width: 30px;
													height: 30px;
													margin-left: 10px;
												" type="checkbox" name="weight_type" v-model="order.orderChina.isVolume" />
										</div>
										<div class="ajax_response alert dismissable"></div>
									</form>
									<hr />
									<h3>Danh sách mã vận đơn</h3>
									<p v-for="(pkg, id) in order.packages">
										<b>{{ pkg.packageCode }}</b>
										<!-- <span v-if="(pkg.isVolume ? pkg.volume : pkg.weigh) > 0">{{ (pkg.isVolume ?
											pkg.volume : pkg.weigh) ? `(` + (pkg.isVolume ? pkg.volume : pkg.weigh) +
										`)` : null }} {{ !order.orderChina.isVolume ? 'kg' : 'm3' }}</span> -->
										<span>
											&nbsp;
											<input v-model="pkg.weigh" v-if="!order.orderChina.isVolume" size="9"
												:placeholder="'Cân nặng'" type="text">
											<input v-model="pkg.volume" v-else size="9" :placeholder="'Khối lượng'"
												type="text">
											&nbsp;
											<span>{{ !order.orderChina.isVolume ? 'kg' : 'm3' }}</span>
										</span>
										&nbsp;
										<input size="4" v-model="pkg.quantity" :placeholder="'Số lượng'" type="text"> Số
										lượng
										&nbsp;
									</p>
									<hr />

									<div class="sellers_note">
										<div v-for="(note, id) in order.orderNotes">
											<span class="bold">Ghi chú {{ id + 1 }}: </span>
												<span class="red">({{ note.createUser }} - {{ CommonUtils.formatDate(note.createDate) }}) </span>
												<span>{{ note.note }}</span>
											<br>
										</div>
									</div>
									<br>
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
								</td>
							</tr>
							<tr v-if="order.orderDetails.length == 0" class="">
								<td>
								</td>
								<td class="align-center"></td>
								<td class="align-center" style="position: relative">
								</td>

								<td rowspan="4" class="specials">
									<div class="green">
										<b>Mã shop: </b> {{ order.orderDetails[0]?.sellerId }}
									</div>
									<p class="bold">
										Phí nội địa:
										<span class="note small">{{ order.orderChina.domesticFeesChina ?
											CommonUtils.formatNumber(order.orderChina.domesticFeesChina) : 0 }}</span>
									</p>
									<hr />

									<div class="vandon_form">
										<h4 class="pull-left">Kiểm đếm</h4>
										<input style="
												width: 30px;
												height: 30px;
												margin-left: 10px;
											" type="checkbox" :disabled="true" :value="order.orderChina.isTallyFee" />
									</div>
									<form action="" class="ajaxForm_Ships ajaxAuto" method="POST">
										<div class="vandon_form">
											<h4 class="pull-left">
												Đóng thùng gỗ
											</h4>
											<input style=" width: 30px; height: 30px; margin-left: 10px; "
												type="checkbox" :disabled="true"
												:value="order.orderChina.isWoodworkingFee" />
										</div>
									</form>
									<form action="" class="ajaxForm_Ships ajaxAuto" method="POST">
										<div class="vandon_form">
											<h4 class="pull-left">
												Tính theo khối
											</h4>
											<input :checked="order.orderChina.isVolume" style="
													width: 30px;
													height: 30px;
													margin-left: 10px;
												" type="checkbox" name="weight_type" v-model="order.orderChina.isVolume" />
										</div>
										<div class="ajax_response alert dismissable"></div>
									</form>
									<hr />
									<h3>Danh sách mã vận đơn</h3>
									<p v-for="(pkg, id) in order.packages">
										<b>{{ pkg.packageCode }}</b>
										<!-- <span v-if="(pkg.isVolume ? pkg.volume : pkg.weigh) > 0">{{ (pkg.isVolume ?
											pkg.volume : pkg.weigh) ? `(` + (pkg.isVolume ? pkg.volume : pkg.weigh) +
										`)` : null }} {{ !order.orderChina.isVolume ? 'kg' : 'm3' }}</span> -->
										<span>
											&nbsp;
											<input v-model="pkg.weigh" v-if="!order.orderChina.isVolume" size="9"
												:placeholder="'Cân nặng'" type="text">
											<input v-model="pkg.volume" v-else size="9" :placeholder="'Khối lượng'"
												type="text">
											&nbsp;
											<span>{{ !order.orderChina.isVolume ? 'kg' : 'm3' }}</span>
										</span>
										&nbsp;
										<input size="4" v-model="pkg.quantity" :placeholder="'Số lượng'" type="text"> Số
										lượng
										&nbsp;
									</p>
									<hr />

									<div class="sellers_note">
										<div v-for="(note, id) in order.orderNotes">
											<span class="bold">Ghi chú {{ id + 1 }}: </span>
												<span class="red">({{ note.createUser }} - {{ CommonUtils.formatDate(note.createDate) }}) </span>
												<span>{{ note.note }}</span>
											<br>
										</div>
									</div>
									<br>
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
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="all_ajax_tables">
			<div id="item_2" class="clearfix">
				<div id="response_ajax_listShip"></div>
				<div id="response_ajax_listStoreShip"></div>
			</div>

			<div id="response_ajax_listOrder"></div>

			<div id="item_3" class="clearfix">
				<div id="response_ajax_listOrderIsCheck"></div>
				<div id="response_ajax_listShipUndefined"></div>
			</div>

			<div id="item_4" class="clearfix">
				<div id="response_ajax_listShipDelay"></div>
			</div>
		</div>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffCheckOrderVNSection",
	data() {
		return {
			orders: [],

			isHideNote: true,

			query: "",
			isSearchShopCode: false,
			isSaveShipCode: false,
			commonStore: useCommonStore(),

			isSelectComplain: false,
		};
	},
	mounted() { },
	methods: {
		async searchOrder() {
			const loader = this.$loading.show();
			const payload = {
				shipCode: this.isSearchShopCode ? null : this.query,
				shopCode: this.isSearchShopCode ? this.query : null,
				isSearchShopCode: this.isSearchShopCode,
				isSaveShipCode: this.isSaveShipCode,
				orderStatus: CONSTANT.PACKAGE_STATUS.NHAP_KHO_VN,  // 6
			};
			const res = await ApiCaller.get(
				// ROUTES.Order.adminSearchOrderInfo,
				ROUTES.Package.checkProduct,
				payload
			);
			loader.hide();
			if (res.status == 200) {
				this.orders = res.data;
				this.orders.forEach(async $ => {
					$.packages = await this.getListPackage($.orderChina.id);
				})
				if (this.orders.length == 0 && this.isSaveShipCode) {
					this.$toast.success(`Đã thêm mã VĐ ${this.query} vào danh sách mã vận đơn không xác định`, {
						title: 'Thông báo',
						position: 'top-right',
						autoHideDelay: 7000,
					})
					this.query = '';
				}
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
		},
		async updateOrder(order) {
			const orderChinaDTO = {
				id: order.orderChina.id,
				isVolume: order.orderChina.isVolume,
			}
			const packages = order.packages.map($ => {
				return {
					shipCode: $.shipCode,
					quantity: parseInt($.quantity),
					weigh: order.orderChina.isVolume ? null : parseInt($.weigh),
					volume: !order.orderChina.isVolume ? null : parseInt($.volume),
				}
			})
			const itemDTOS = order.orderDetails.map($ => {
				return {
					id: $.id,
					totalCheck: $.totalCheck
				}
			})
			const payload = {
				orderChinaDTO: orderChinaDTO,
				packages: packages,
				itemDTOS: itemDTOS,
			}
			const loader = this.$loading.show();
			const res = await ApiCaller.post(ROUTES.Package.updateListPackage, payload);
			loader.hide();
			if (res.status == 200) {
				this.$toast.success(
					`Cập nhật thông tin kiện hàng thành công`,
					{
						title: "Thông báo",
						position: "top-right",
						autoHideDelay: 7000,
					}
				);
				this.searchOrder();
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
			}
		},
		promptInventoryNameById(id) {
			const inventory = this.commonStore?.inventories?.filter(
				($) => $.id == id
			)[0];
			if (inventory)
				return inventory?.name;
			else return '';
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
			return res.data;
		},
		viewDetail(id, type) {
			if (type != 2) {
				window.open(this.$router.resolve({ name: 'StaffOrderDetailPage', params: { orderId: id } }).href, '_blank');
			} else {
				window.open(this.$router.resolve({ name: 'StaffTransportOrderDetailPage', params: { orderId: id } }).href, '_blank');
			}
		},
		// async handleVolume(event, order) {
		// 	const value = event.target.checked;
		// 	const loader = this.$loading.show();
		// 	const payload = {
		// 		id: order.orderChina.id,
		// 		isVolume: value,
		// 	}
		// 	const res = await ApiCaller.post(ROUTES.Order.updateOrderIsVolume, payload);
		// 	if (res.status == 200) {
		// 		this.$toast.success(`Cập nhật đơn hàng thành công`, {
		// 			title: 'Thông báo',
		// 			position: 'top-right',
		// 			autoHideDelay: 7000,
		// 		})
		// 		this.searchOrder();
		// 	} else {
		// 		this.$toast.error(`${res.data.message}`, {
		// 			title: 'Thông báo',
		// 			position: 'top-right',
		// 			autoHideDelay: 7000,
		// 		})
		// 	}
		// 	loader.hide();
		// },
		// async handleWeightOrVolume(pkg, event) {
		// 	const value = event.target.value;
		// 	const loader = this.$loading.show();
		// 	const payload = {
		// 		shipCode: pkg.shipCode,
		// 		weigh: pkg.isVolume ? null : value,
		// 		volume: pkg.isVolume ? value : null,
		// 		status: CONSTANT.PACKAGE_STATUS.DA_KIEM,
		// 	}
		// 	const res = await ApiCaller.post(ROUTES.Package.update, payload);

		// 	if (res.status == 200) {
		// 		this.$toast.success`Cập nhật thành công`, {
		// 			title: 'Thông báo',
		// 			position: 'top-right',
		// 			autoHideDelay: 7000,
		// 		}
		// 		this.searchOrder();
		// 	} else {
		// 		this.$toast.error(`${res.data.message}`, {
		// 			title: 'Thông báo',
		// 			position: 'top-right',
		// 			autoHideDelay: 7000,
		// 		})
		// 	}
		// 	loader.hide();

		// },
		// async handleTally(order, detail) {
		// 	const loader = this.$loading.show();
		// 	const payload = [{
		// 		id: detail.id,
		// 		totalCheck: parseInt(detail.totalCheck),
		// 	}]
		// 	const res = await ApiCaller.post(ROUTES.Order.updateItemCheck, payload);
		// 	if (res.status == 200) {
		// 		this.$toast.success`Cập nhật số lượng kiểm đếm thành công`, {
		// 			title: 'Thông báo',
		// 			position: 'top-right',
		// 			autoHideDelay: 7000,
		// 		}
		// 		this.searchOrder();
		// 	} else {
		// 		this.$toast.error(`${res.data.message}`, {
		// 			title: 'Thông báo',
		// 			position: 'top-right',
		// 			autoHideDelay: 7000,
		// 		})
		// 	}
		// 	loader.hide();

		// },
		// async handleTotal(pkg, event) {
		// 	const loader = this.$loading.show();
		// 	const payload = {
		// 		shipCode: pkg.shipCode,
		// 		quantity: pkg.quantity,
		// 	}
		// 	const res = await ApiCaller.post(ROUTES.Package.update, payload);

		// 	if (res.status == 200) {
		// 		this.$toast.success`Cập nhật thành công`, {
		// 			title: 'Thông báo',
		// 			position: 'top-right',
		// 			autoHideDelay: 7000,
		// 		}
		// 		this.searchOrder();
		// 	} else {
		// 		this.$toast.error(`${res.data.message}`, {
		// 			title: 'Thông báo',
		// 			position: 'top-right',
		// 			autoHideDelay: 7000,
		// 		})
		// 	}
		// 	loader.hide();
		// },
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
				this.searchOrder();
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
		},
	},
};
</script>

<!-- style custom -->
<style scoped></style>
