<script setup>
import CONSTANT from "../../../../../../constants/constants";
import ROUTES from "../../../../../../constants/routeDefine";
import { useCommonStore } from "../../../../../../store/CommonStore";
import ApiCaller from "../../../../../utils/ApiCaller";
import CommonUtils from "../../../../../utils/CommonUtils";
</script>

<!-- template section -->
<template>
	<div id="content" class="clearfix content-center fullwidth">

		<div id="item_3" class="clearfix">
			<div id="response_ajax_listOrderShopNull">
				<!-- Danh sách đơn chưa đáp mã shop -->
				<div class="box_order_pending clearfix">
					<div class="checkshop clearfix">
						<h2 class="title">* Danh sách đơn chưa có mã vận đơn</h2>
						<div>
							<div class="gridtable">
								<table style="min-width: 1000px;">
									<tbody>
										<tr>
											<td>STT</td>
											<td>Đơn hàng</td>
											<td>Ngày mua hàng</td>
											<td>Kho hàng</td>
											<td>Mã shop</td>
											<td>Mã vận đơn</td>
										</tr>
										<tr v-for="(order, index) in orders">
											<td class="align-center">{{ index + 1 }}</td>
											<td class="align-center">
												<a style="cursor: pointer;" target="_blank"
													@click="viewDetail(order.id)" class="uppercase">{{
														order.orderCode }} ==&gt;
													<span class="green">{{ order.account ? order.account.username : '-'
														}}</span></a>
											</td>
											<td>{{ CommonUtils.formatDate(order.dateOfPurchase) }}</td>
											<td>
												<span class="blue">KHO HN</span>
											</td>
											<td>
												<a :href="item.itemLink" target="_blank" style="cursor: pointer;"
													class="green" v-for="(item, idx) in order.orderItems">{{
														item.sellerId }}</a>
											</td>
											<td>
												<form method="POST">
													<div>
														<input type="text" name="shipid" v-model="order.shipCode"
															@change="validateShipCode" placeholder="Nhập mã vận đơn" />
														&nbsp;
														<a class="button-link" @click="createPackage(order)">Thêm</a>
													</div>
												</form>
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
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffOrderWithoutShipCodeSection",
	data() {
		return {
			orders: [],
		};
	},
	mounted() {
		this.query();
	},
	methods: {
		async query() {
			const loader = this.$loading.show();
			let params = {
				criteria: CONSTANT.ORDER_QUERY_CRITERIA.WITHOUT_SHIP_CODE,
			};
			const res = await ApiCaller.get(
				ROUTES.Order.orderWithoutCriteria,
				params
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
			this.orders = res.data;
			this.orders.forEach(order => order.shipCode = '')
		},
		viewDetail(id) {
			window.open(this.$router.resolve({ name: 'StaffOrderDetailPage', params: { orderId: id } }).href, '_blank');
		},
		async createPackage(order) {
			try {
				let loader = this.$loading.show();
				const payload = {
					shipCode: order.shipCode,
					orderCode: order.orderCode,
				};
				const res = await ApiCaller.post(
					ROUTES.Package.create,
					payload
				);
				loader.hide();
				if (res.status == 200) {
					this.$toast.success(`Thêm mã vận đơn cho đơn hàng ${order.orderCode} thành công`, {
						title: 'Thông báo',
						position: 'top-right',
						autoHideDelay: 7000,
					})
					this.query();
				} else {
					this.$toast.error(`${res.data.message}`, {
						title: 'Thông báo',
						position: 'top-right',
						autoHideDelay: 7000,
					})
				}
			} finally {
				this.shipCode = "";
			}
		},
	},
};
</script>

<!-- style custom -->
<style scoped>
.content-center {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
