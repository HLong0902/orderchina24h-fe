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
						<h2 class="title">* Danh sách đơn chưa có phí nội địa</h2>
						<div>
							<div class="gridtable">
								<table>
									<tbody>
										<tr>
											<td>STT</td>
											<td>Mã đơn</td>
										</tr>
										<tr v-for="(order, index) in orders">
											<td class="align-center">{{ index + 1 }}</td>
											<td class="align-center">
												<a href="#" target="_blank" @click="viewDetail(order.id)"
													class="uppercase">{{ order.orderCode }} ==&gt;
													<span class="green">{{ order.account ? order.account.username : '-'
														}}</span></a>
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
	name: "StaffOrderWithoutDomFeeSection",
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
				criteria: CONSTANT.ORDER_QUERY_CRITERIA.WITHOUT_DOMESTIC_FEE,
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
		},
		viewDetail(id) {
			window.open(this.$router.resolve({ name: 'StaffOrderDetailPage', params: { orderId: id } }).href, '_blank');
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
