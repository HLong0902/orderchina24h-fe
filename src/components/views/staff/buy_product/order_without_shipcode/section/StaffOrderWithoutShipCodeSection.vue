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
										<tr v-for="(shop, index) in order_shop_codes.filter($ => $.shopId != null)">
											<td class="align-center">{{ index + 1 }}</td>
											<td class="align-center">
												<a style="cursor: pointer;"
													@click="viewDetail(shop.order.id)" class="uppercase">{{
														shop.order.orderCode }} ==&gt;
													<span class="green">{{ shop.order.account ? shop.order.account.username : '-'
														}}</span>
												</a>
                                                <br></br>
												<span class="red">({{ shop.order.system }})</span>
											</td>
											<td>{{ CommonUtils.formatDate(shop.order.dateOfPurchase) }}</td>
											<td>
												<span class="blue">KHO HN</span>
											</td>
											<td>
												<a @click="viewShopDetail(shop.order.system, shop.shopId)" target="_blank" style="cursor: pointer;"
													class="green">
													<span v-if="shop.shopId != null">
														{{ shop.shopId }}
														<br>
													</span>
												</a>
											</td>
											<td>
												<form method="POST">
													<div>
														<input type="text" name="shipid" v-model="shop.shipCodeInp"
															@change="validateShipCode" placeholder="Nhập mã vận đơn" />
														&nbsp;
														<a class="button-link" @click="createPackage(shop.order, shop.shipCodeInp, shop?.shopId)">Thêm</a>
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
			order_shop_codes: [],

			shopCodeInp: '',
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
			this.order_shop_codes = res.data.flatMap($ => $.orderShopCodes)
			this.order_shop_codes.forEach($ => $.order = res.data.filter(el => el.id == $.orderId)[0])
			this.orders = res.data;
			this.orders.forEach(order => order.shipCode = '')
		},
		viewDetail(id) {
			window.open(this.$router.resolve({ name: 'StaffOrderDetailPage', params: { orderId: id } }).href, '_blank');
		},
		async createPackage(order, shipCodeInp, shopId) {
			try {
				let loader = this.$loading.show();
				const payload = {
					shipCode: shipCodeInp,
					orderCode: order.orderCode,
          shopId: shopId
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
        viewShopDetail(system, shopId) {
            switch (system.toLowerCase()) {
                case 'taobao':
                    console.log("taobao")
                    window.open(`https://market.m.taobao.com/app/dinamic/pc-trade-logistics/home.html?orderId=${shopId}`, '_blank');
                    break;
                case '1688':
                    console.log("1688")
                    window.open(`https://trade.1688.com/order/new_step_order_detail.htm?orderId=${shopId}`, '_blank');
                    break;
                default:
                    break;
            }
        }
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
