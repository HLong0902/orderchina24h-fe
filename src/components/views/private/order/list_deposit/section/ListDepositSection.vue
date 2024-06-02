<script setup>
import ROUTES from "../../../../../../constants/routeDefine";
import ApiCaller from "../../../../../utils/ApiCaller";
import CONSTANT from "../../../../../../constants/constants";
import CommonUtils from "../../../../../utils/CommonUtils";
import { useCommonStore } from "../../../../../../store/CommonStore";
</script>

<!-- template section -->
<template>
	<div id="content">
		<div class="container">
			<main class="main" role="main">
				<div class="row main-row">
					<div class="col-sm-9">
						<div class="cart-by-page">
							<div class="titles">
								<h2 class="page-title">Danh sách đơn ký gửi</h2>
							</div>

							<div class="filter">
								<form @submit.prevent="handleSubmit" class="form-horizontal" method="get">
									Mã đơn hàng :
									<input v-model="filter.orderCode" class="custom_input" type="text" name="filter_id"
										value="" />
									&nbsp; Mã vận đơn :
									<input v-model="filter.shipCode" class="custom_input" type="text" name="filter_id"
										value="" />

									<input @click="getList" class="button custom_flat_button" type="submit"
										value="Lọc" />
								</form>
								<div class="space10"></div>
							</div>
							<div>
								<div class="cu-table-responsive size_medium">
									<div class="order_row row_header">
										<div class="col-md-1">
											<p>STT</p>
										</div>
										<div class="col-md-1">
											<p>Đơn hàng / Ngày mua hàng</p>
										</div>
										<div class="col-md-2">
											<p>Thông tin khách hàng</p>
										</div>
										<div class="col-md-1">
											<p>Kho nhận hàng</p>
										</div>
										<div class="col-md-2">
											<p>Mã vận đơn</p>
										</div>
										<div class="col-md-1">
											<p>Tổng cân nặng</p>
										</div>
										<div class="col-md-1">
											<p>Tổng tiền VC</p>
										</div>
										<div class="col-md-1">
											<p>Phí bảo hiểm</p>
										</div>
										<div class="col-md-1">
											<p>Giá trị hàng</p>
										</div>
										<div class="col-md-1">
											<p>Tình trạng</p>
										</div>
									</div>
									<div v-for="(order, index) in orderList" class="order_row"
										:class="index % 2 == 0 ? 'even' : 'odd'">
										<div class="col-md-1">
											<p>{{ index + 1 }}</p>
										</div>
										<div class="col-md-1">
											<span class="blue">{{
												order.orderChina.orderCode
											}}</span>
											<br />
											<span class="bold">{{
												CommonUtils.formatDate(
													order.orderChina
														.dateOfPurchase
												)
											}}</span>
										</div>
										<div class="col-md-2">
											<span class="bold">User:
												<span class="red">{{
													order.customerInfo.username
												}}</span></span>
											<br />
											<span class="bold">SĐT:
												<span class="blue">{{
													order.customerInfo.phone
												}}</span></span>
											<br />
											<span class="bold">Địa chỉ:
												<span class="green">{{
													order.customerInfo.address
												}}</span></span>
										</div>
										<div class="col-md-1">
											<span class="bold">{{
												promptInventoryNameById(
													order.customerInfo
														.inventoryId
												)
											}}</span>
										</div>
										<div class="col-md-2">
											<span v-for="(
													pkg, idx
												) in order.packages"><span class="blue">{{
													pkg.shipCode
												}}</span>
												-
												<span class="green">{{
													(
														pkg.isVolume
															? pkg.volume
															: pkg.weight
													)
														? pkg.isVolume
															? pkg.volume
															: pkg.weight
														: 0
												}} kg</span>
												<hr v-if="idx != order.packages.length - 1" />
											</span>
										</div>
										<div class="col-md-1">
											<span class="green">
												{{
													order.orderChina.totalWeight
														? order.orderChina
															.totalWeight
														: 0
												}} kg
											</span>
										</div>
										<div class="col-md-1">
											<span class="blue">
												{{
													order.orderChina
														.shippingPrice
														? order.orderChina
															.shippingPrice
														: 0
												}} vnđ
											</span>
										</div>
										<div class="col-md-1">
											<span class="red bold">
												{{ order.orderChina.premium }}%
											</span>
										</div>
										<div class="col-md-1">
											<span class="bold green">
												{{
													CommonUtils.formatNumber(
														order.orderChina
															.priceProduct
													)
												}}
												vnđ
											</span>
										</div>
										<div class="col-md-1">
											<p>
												{{
													CommonUtils.promptOrderStatusNameByValueAdmin(
														order.orderChina.status
													)
												}}
											</p>
										</div>
									</div>
								</div>

								<div class="pag"></div>
								<ul class="pagination">
									<li @click="handlePage(page)" v-for="(page, index) in totalPage"
										:class="{ active: filter.pageIndex == page }">
										<a>{{ page
											}}</a>
									</li>
									<li>
										<a @click="handleNext" data-ci-pagination-page="2" rel="next">Trang sau »</a>
									</li>
									<li>
										<a @click="handleLast" data-ci-pagination-page="97">»</a>
									</li>
								</ul>
								<p>
									<strong>Total: <span class="green">{{ totalRecord }}</span> (Items)</strong>
								</p>
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
	name: "ListDepositSection",
	data() {
		return {
			listInventories: [],
			orderList: [],

			filter: {
				orderCode: "",
				shipCode: "",
				pageIndex: 1,
				pageSize: CONSTANT.DEFAULT_PAGESIZE,
			},
			totalPage: new Set(),
			totalRecord: 0,

			commonStore: useCommonStore(),
		};
	},
	mounted() {
		this.getList();
	},
	methods: {
		async getList() {
			let loader = this.$loading.show();
			const res = await ApiCaller.get(
				ROUTES.Order.getDepositOrder,
				this.filter
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
			this.orderList = res.data.data;
			this.totalPage = new Set();
			this.totalRecord = res.data.totalRecord;
			if (this.filter.pageIndex > res.data.totalPage) {
				this.filter.pageIndex = 1;
			}
			for (let i = 1; i <= res.data.totalPage; i++) {
				this.totalPage.add(i);
			}
		},
		handlePage(page) {
			this.filter.pageIndex = page;
			this.getList();
		},
		handleNext() {
			if (this.filter.pageIndex < this.totalPage.size)
				this.filter.pageIndex++;
			else {
				this.filter.pageIndex = this.totalPage.size
			}
			this.getList();
		},
		handleLast() {
			this.filter.pageIndex = this.totalPage.size;
			this.getList();
		},
		promptInventoryNameById(id) {
			const inventory = this.commonStore.inventories.filter(
				($) => $.id == id
			)[0];
			return inventory.name;
		},
	},
};
</script>

<!-- style custom -->
<style scoped>
@import "../../../../../../assets/styles/bootstrap.min.css";
@import "../../../../../../assets/styles/w2-ui.min.css";
@import "../../../../../../assets/styles/private-styles.css";
</style>
