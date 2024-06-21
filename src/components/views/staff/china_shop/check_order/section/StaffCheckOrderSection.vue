<script setup>
import ROUTES from "../../../../../../constants/routeDefine";
import { useCommonStore } from "../../../../../../store/CommonStore";
import ApiCaller from "../../../../../utils/ApiCaller";
import CommonUtils from "../../../../../utils/CommonUtils";
</script>

<!-- template section -->
<template>
	<div id="content" class="fullwidth clearfix">
		<div class="lists_ship clearfix">
			<h2 class="align-center">Kiểm hàng &amp; Nhập kho TQ</h2>
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
				<input v-model="query" type="text" name="keyword" value="" autofocus v-focus/>
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
							@click="viewDetail(order.orderChina.id)">{{
								order.orderChina.orderCode }}
						</a>
						- <span class="green">{{ order.customerInfo.username }}</span>
					</h1>
				</div>
				<div class="info_check clearfix">
					<div class="count_item">
						Tổng số SP:
						<span class="red">{{
							order.orderDetails.reduce(
								(sum, item) => (sum += item.totalCheck),
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
												order.orderDetails[0].sellerId
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
													(sum += item.totalCheck),
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
										<input type="text" value="0" size="6" name="item_check_quantity"
											:disabled="true" />
										<a class="button-link" onclick="submitAjax(this)">Lưu</a>
										<div class="ajax_response alert dismissable"></div>
									</form>
								</td>

								<td v-if="idx == 0" rowspan="4" class="specials">
									<div class="green">
										<b>Mã shop: </b> {{ order.orderDetails[0].sellerId }}
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
											" type="checkbox" :value="order.orderChina.isTallyFee" :disabled="true" />
									</div>
									<form action="" class="ajaxForm_Ships ajaxAuto" method="POST">
										<div class="vandon_form">
											<h4 class="pull-left">
												Đóng thùng gỗ
											</h4>
											<input onchange="submitAjax(this)" style="
													width: 30px;
													height: 30px;
													margin-left: 10px;
												" type="checkbox" :value="order.orderChina.isWoodworkingFee" :disabled="true" />
										</div>
										<div class="ajax_response alert dismissable"></div>
									</form>
									<form action="" class="ajaxForm_Ships ajaxAuto" method="POST">
										<div class="vandon_form">
											<h4 class="pull-left">
												Tính theo khối
											</h4>
											<input onchange="submitAjax(this)" style="
													width: 30px;
													height: 30px;
													margin-left: 10px;
												" type="checkbox" :disabled="true" name="weight_type" />
										</div>
										<div class="ajax_response alert dismissable"></div>
									</form>
									<hr />
									<h3>Danh sách mã vận đơn</h3>
									<p v-for="(pkg, id) in order.packages">
										<b>{{ pkg.packageCode }}</b>
										{{ pkg.weigh ? `(` + pkg.weigh + `)` : null }}
									</p>

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
	name: "StaffCheckOrderSection",
	data() {
		return {
			orders: [],

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
			};
			const res = await ApiCaller.get(
				// ROUTES.Order.adminSearchOrderInfo,
				ROUTES.Package.checkProduct,
				payload
			);
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
			loader.hide();
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
		viewDetail(id) {
			window.open(this.$router.resolve({ name: 'StaffOrderDetailPage', params: { orderId: id } }).href, '_blank');
		},
	},
};
</script>

<!-- style custom -->
<style scoped></style>
