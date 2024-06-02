<script setup>
import CONSTANT from "../../../../../constants/constants";
import ROUTES from "../../../../../constants/routeDefine";
import ApiCaller from "../../../../utils/ApiCaller";
import CommonUtils from "../../../../utils/CommonUtils";
</script>

<!-- template section -->
<template>
	<div id="content" class="clearfix fullwidth">
		<h2 class="title"> </h2>
		<div class="filer_box">
			<form @submit.prevent="handleSubmit">
				Mã vận đơn:
				<input v-on:keyup.enter="filterBy" v-model="filter.shipCode" type="text" value=""
					name="filter_shipid" />

				Mã đơn:
				<input v-on:keyup.enter="filterBy" v-model="filter.orderCode" type="text" value=""
					name="filter_invoiceid" />

				Bao:
				<input v-on:keyup.enter="filterBy" v-model="filter.baoHang" type="text" value="" name="filter_name" />

				<!--Mã đơn:<input type="text" value="" name="filter_invoiceid">-->
				Username:
				<input v-on:keyup.enter="filterBy" v-model="filter.userName" type="text" value=""
					name="filter_username" />

				Trạng thái:
				<select v-on:keyup.enter="filterBy" v-model="filter.status" name="cur_status">
					<option value="">Tất cả</option>
					<option v-for="(value, key) in CONSTANT.PACKAGE_STATUS" :key="key" :value="value">
						{{ CommonUtils.promptPackageStatusNameByValue(value) }}
					</option>
				</select>

				<br />
				Ngày:<input class="pickdate_from hasDatepicker" type="date" v-on:keyup.enter="filterBy"
					id="datepicker_from" v-model="filter.fromDate" name="filter_startdate_created_date" />
				-
				<input class="pickdate_to hasDatepicker" type="date" v-on:keyup.enter="filterBy" id="datepicker_to"
					v-model="filter.toDate" name="filter_enddate_created_date" />

				<input @click="filterBy" class="button" type="submit" value="Tìm kiếm" />
			</form>
		</div>
		<form id="formData" action="ships/confirm_money" method="POST">
			<div class="gridtable">
				<table class="table tbl-cart tbl-history">
					<tbody>
						<tr class="header-cart-table">
							<td style="width: 5%" class="text-center">#</td>
							<td class="text-center">Mã kiện</td>
							<td class="text-center">Khách hàng</td>
							<td class="text-center">Mã đơn</td>
							<td class="text-center">Bao hàng</td>
							<td class="text-center">Vận đơn TQ</td>
							<td class="text-center">Cân nặng</td>
							<td class="text-center">Thể tích</td>
							<td class="text-center">Số Lượng</td>
							<td class="text-center">Trạng thái</td>
							<td style="width: 255px" class="text-center">
								Lịch sử
							</td>
						</tr>
						<tr v-for="(pkg, index) in packages">
							<td class="align-center">{{ index + 1 }}</td>

							<td class="align-center">
								<p class="black">
									<a target="_blank" style="color: #0000ff" @click="viewDetail(pkg.orderId)">{{
										pkg.packageCode
									}}</a>
								</p>
							</td>
							<td class="text-center">
								<a @click="filterByName" href="#">{{ pkg.account ? pkg.account.username : '' }}</a>
							</td>
							<td>
								<a class="blue" @click="viewDetail(pkg.orderId)" href="#">{{ pkg.orderCode }}</a>
							</td>
							<td class="align-center big">{{ pkg.bagOrderId ? pkg.bagOrderId : '--' }}</td>
							<td>
								<a target="_blank" href="/ship/finship?shipid=773284031498508">{{ pkg.shipCode }}</a>
							</td>

							<td class="align-center big">{{ pkg.weigh ? pkg.weigh : '-' }}</td>
							<td class="align-center big">{{ pkg.volume ? pkg.volume : '-' }}</td>
							<td class="align-center big">{{ pkg.quantity ? pkg.quantity : '-' }}</td>
							<td class="align-center big">
								<span :class="CommonUtils.promptPackageStatusClassByValue(pkg.status)">{{
									CommonUtils.promptPackageStatusNameByValue(pkg.status) }}</span>
							</td>
							<td class="text-center">
								<a class="custom-link hasTooltip tooltipstered">Chi tiết
									<fa :id="'info-' + pkg.id" icon="question-circle"></fa>
								</a>
								<b-tooltip style="min-width: 300px;" placement="left" variant="secondary"
									:target="'info-' + pkg.id" triggers="hover">
									<table>
										<tbody>
											<tr>
												<td>NB phát hàng</td>
												<td class="right">
													<strong>{{ CommonUtils.formatDate(pkg.createDate) }}</strong>
												</td>
											</tr>
											<tr>
												<td>Nhập kho TQ</td>
												<td class="right">
													<strong>{{ CommonUtils.formatDate(pkg.chinaWarehousingDate)
														}}</strong>
												</td>
											</tr>
											<tr>
												<td>Gửi bao từ TQ</td>
												<td class="right">
													<strong>{{ CommonUtils.formatDate(pkg.sendBagChinaDate) }}</strong>
												</td>
											</tr>
											<tr>
												<td>Nhận bao tại VN</td>
												<td class="right">
													<strong>{{ CommonUtils.formatDate(pkg.getBagVietNamDate) }}</strong>
												</td>
											</tr>
											<tr>
												<td>Kiểm hàng</td>
												<td class="right">
													<strong>{{ CommonUtils.formatDate(pkg.checkedDate) }}</strong>
												</td>
											</tr>
											<tr>
												<td>Nhập kho VN</td>
												<td class="right">
													<strong>{{ CommonUtils.formatDate(pkg.vnWarehousingDate) }}</strong>
												</td>
											</tr>
											<tr>
												<td>Giao hàng</td>
												<td class="right">
													<strong>{{ CommonUtils.formatDate(pkg.sendPackageDate) }}</strong>
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
		</form>
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
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffPackageSection",
	data() {
		return {
			packages: [],

			filter: {
				fromDate: "",
				toDate: "",
				shipCode: "",
				orderCode: "",
				baoHang: "",
				userName: "",
				status: "",
				tuVan: "",
				pageIndex: 1,
				pageSize: CONSTANT.DEFAULT_PAGESIZE,
			},

			totalPage: new Set(),
			totalRecord: 0,
		};
	},
	mounted() {
		this.getListPackage();
	},
	methods: {
		async getListPackage() {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(
				ROUTES.Package.findByOption,
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
			this.packages = res.data.data;
			this.totalPage = new Set();
			this.totalRecord = res.data.totalRecord;
			if (this.filter.pageIndex > res.data.totalPage) {
				this.filter.pageIndex = 1;
			}
			for (let i = 1; i <= res.data.totalPage; i++) {
				this.totalPage.add(i);
			}
		},
		viewDetail(id) {
			window.open(this.$router.resolve({ name: 'StaffOrderDetailPage', params: { orderId: id } }).href, '_blank');
		},
		async filterBy() {
			const loader = this.$loading.show();
			if (this.toDate != '')
				this.filter.toDate = CommonUtils.getNextDate(this.filter.toDate);
			const res = await ApiCaller.get(ROUTES.Package.findByOption, this.filter);
			loader.hide();
			if (res.status != 200) {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			this.packages = res.data.data;
			this.totalPage = new Set();
			this.totalRecord = res.data.totalRecord;
			if (this.filter.pageIndex > res.data.totalPage) {
				this.filter.pageIndex = 1;
			}
			for (let i = 1; i <= res.data.totalPage; i++) {
				this.totalPage.add(i);
			}
		},
		async filterByName(event) {
			const name = event.target.innerHTML;
			this.filter.userName = name;
			const loader = this.$loading.show();
			if (this.toDate != '')
				this.filter.toDate = CommonUtils.getNextDate(this.filter.toDate);
			const res = await ApiCaller.get(ROUTES.Package.findByOption, this.filter);
			loader.hide();
			if (res.status != 200) {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			this.packages = res.data.data;
		},
		handlePage(page) {
			this.filter.pageIndex = page;
			this.getListPackage();
		},
		handleNext() {
			if (this.filter.pageIndex < this.totalPage.size)
				this.filter.pageIndex++;
			else {
				this.filter.pageIndex = this.totalPage.size
			}
			this.getListPackage();
		},
		handleLast() {
			this.filter.pageIndex = this.totalPage.size;
			this.getListPackage();
		},
	},
};
</script>

<!-- style custom -->
<style scoped>
@import "../../../../../assets/styles/staff-styles.css";
@import "../../../../../assets/styles/staff-menu-styles.css";
</style>
