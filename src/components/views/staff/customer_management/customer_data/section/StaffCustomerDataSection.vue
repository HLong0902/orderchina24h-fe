<script setup>
import ROUTES from "../../../../../../constants/routeDefine";
import ApiCaller from "../../../../../utils/ApiCaller";
import CommonUtils from "../../../../../utils/CommonUtils";
import { useCommonStore } from "../../../../../../store/CommonStore";
</script>

<!-- template section -->
<template>
	<div id="content" class="clearfix fullwidth">
		<div class="lists_ship clearfix">
			<h2 class="float-left">Dữ liệu khách hàng</h2>
		</div>
		<div class="filer_box">
			<form method="GET" @submit.prevent="handleSubmit">
				Tên KH:
				<input v-model="filter.customerName" type="text" value="" name="filter_name" />
				&nbsp;
				<input class="button" type="submit" value="Tìm kiếm" @click="getCustomerData" />
			</form>
		</div>
		<div class="gridtable">
			<table>
				<tbody>
					<tr>
						<td>STT</td>
						<td>Thông tin KH</td>
						<td>Lịch sử đặt hàng lần đầu/cuối</td>
						<td>Kho nhận hàng</td>
						<td>Ghi chú</td>

						<td>Ví điện tử</td>
						<td>NV tư vấn</td>
						<td>Thao tác</td>
						<td v-if="CommonUtils.getRole() == 1">Chỉ định nhân viên</td>
					</tr>
					<tr v-for="(cust, index) in customers">
						<td>{{ index + 1 }}</td>
						<td>
							<div>
								<span class="bold">Username: </span><span class="red">{{
									cust.userDTO.username
								}}</span>
								<br />
								<span class="bold">Họ tên: </span><span class="blue">{{
									cust.userDTO.fullName
								}}</span>
								<br />
								<span class="bold">Email: </span><span class="green">{{
									cust.userDTO.email
								}}</span>
								<br />
								<span class="bold">Phone: </span><span class="green">{{
									cust.userDTO.phone
								}}</span>
								<br />
								<span class="bold">Địa chỉ: </span><span class="green">{{
									cust.userDTO.address
								}}</span>
								<br />
								<span class="bold">Skype: </span><span class="green">{{
									cust.userDTO.skype
								}}</span>
								<br />
								<span class="bold">Nhu cầu nhập hàng: </span>
								<br />
								<form>
									<textarea v-model="cust.userDTO.customerNeeds" maxlength="200"></textarea>
									<input @click="handleNeed(cust.userDTO)" size="3" type="button" value="Lưu" />
								</form>
							</div>
						</td>
						<td>
							<div>
								<div v-for="(history, idx) in cust.orderHistory ? cust.orderHistory : []
									.slice()
									.reverse()">
									<span :class="{
										blue: idx % 2 == 0,
										green: idx % 2 == 1,
									}">Đặt hàng lần
										{{ idx % 2 == 0 ? "đầu" : "cuối" }}:
									</span>
									<br />
									<div style="padding-left: 20px">
										<span class="bold">Thời gian đặt:
										</span>
										{{
											CommonUtils.formatDate(
												history.dateOfPurchase
											)
										}}
										<br />
										<span class="bold">Tiền đơn hàng:
										</span>
										<span class="red">{{
											CommonUtils.formatNumber(
												history.totalAmount
											)
										}}</span>
										<b>vnđ</b>
									</div>
								</div>
								<br />
							</div>
						</td>
						<td>
							<div>KHO HN</div>
						</td>
						<td class="align-center">
							<span class="bold green">
								<form>
									<textarea v-model="cust.userDTO.note" rows="5" maxlength="200"></textarea>
									<input @click="handleNote(cust.userDTO)" size="3" type="button" value="Lưu" />
								</form>
							</span>
						</td>

						<td class="align-center">
							<div>
								<span class="green">Mã nạp tiền: </span><span class="bold">NAP_{{
									CommonUtils.normalizeNumber(
										cust.userDTO.id
									)
								}}</span>
								<br />
								<span class="blue">Số dư ví: </span><span class="red">{{
									CommonUtils.formatNumber(
										cust.userDTO.availableBalance
									)
								}}
									vnđ</span>
							</div>
						</td>

						<td>
							<span class="red">
								{{
									cust.userDTO.staffId
										? commonStore.staffs.filter(
											($) =>
												$.id == cust.userDTO.staffId
										)[0] ? commonStore.staffs.filter(
											($) =>
												$.id == cust.userDTO.staffId
										)[0].fullName : ''
										: "Chưa gán nhân viên"
								}}
							</span>
							- <b>CSKH</b>
						</td>
						<td>
							<form v-if="cust.userDTO.staffId == null" action="" class="ajaxFormPackages" method="POST">
								<a class="button-link special-green" @click="takeCustomer(cust.userDTO)">
									Đánh dấu KH từ data
								</a>
							</form>
						</td>
						<td v-if="CommonUtils.getRole() == 1">
							<div>
								<form>
									<select v-model="cust.userDTO.staffId">
										<option :value="undefined">
											Chưa chọn nhân viên
										</option>
										<option v-for="item in commonStore.staffs" :key="item.id" :value="item.id">
											[{{ item.id }}] -
											{{ item.fullName }} - CSKH
										</option>
									</select>
									<input @click="grantStaff(cust.userDTO)" type="button" size="6" value="Lưu" />
								</form>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- <ul class="pagination">
			<li class="active"><a>1</a></li>
			<li>
				<a
					href="/storecn/lists_package?page=10"
					data-ci-pagination-page="2"
					>2</a
				>
			</li>
			<li>
				<a
					href="/storecn/lists_package?page=20"
					data-ci-pagination-page="3"
					>3</a
				>
			</li>
			<li>
				<a
					href="/storecn/lists_package?page=10"
					data-ci-pagination-page="2"
					rel="next"
					>Trang sau »</a
				>
			</li>
			<li>
				<a
					href="/storecn/lists_package?page=15500"
					data-ci-pagination-page="1551"
				>
					»</a
				>
			</li>
		</ul> -->
		<p>
			<strong>Total:
				<span class="green">{{ customers.length }}</span>
				(Items)</strong>
		</p>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffCustomerDataSection",
	data() {
		return {
			customers: [],

			filter: {
				fromDate: "",
				toDate: "",
				status: "",
				pageSize: "",
				pageIndex: "",
				transactionCode: "",
				type: "",
			},

			commonStore: useCommonStore(),
		};
	},
	mounted() {
		this.getCustomerData();
	},
	methods: {
		async getCustomerData() {
			const loader = this.$loading.show();
			const res = await ApiCaller.post(
				ROUTES.Customer.filterCustomerData,
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
			this.customers = res.data.data;
		},
		async handleNote(userDTO) {
			const loader = this.$loading.show();
			const payload = {
				id: userDTO.id,
				note: userDTO.note,
			};
			const res = await ApiCaller.post(
				ROUTES.Customer.updateCustomerData,
				payload
			);
			if (res.status == 200) {
				this.$toast.success(
					`Cập nhật ghi chú cho KH ${userDTO.username} thành công`,
					{
						title: "Thông báo",
						position: "top-right",
						autoHideDelay: 7000,
					}
				);
				this.getCustomerData();
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
			}
			loader.hide();
		},
		async handleNeed(userDTO) {
			const loader = this.$loading.show();
			const payload = {
				id: userDTO.id,
				customerNeeds: userDTO.customerNeeds,
			};
			const res = await ApiCaller.post(
				ROUTES.Customer.updateCustomerData,
				payload
			);
			if (res.status == 200) {
				this.$toast.success(
					`Cập nhật nhu cầu nhập hàng cho KH ${userDTO.username} thành công`,
					{
						title: "Thông báo",
						position: "top-right",
						autoHideDelay: 7000,
					}
				);
				this.getCustomerData();
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
			}
			loader.hide();
		},
		async grantStaff(userDTO) {
			const loader = this.$loading.show();
			const payload = {
				id: userDTO.id,
				staffId: userDTO.staffId,
			};
			const res = await ApiCaller.post(
				ROUTES.Customer.updateCustomerData,
				payload
			);
			if (res.status == 200) {
				this.$toast.success(
					`Gán KH ${userDTO.username} cho nhân viên ${this.commonStore.staffs.filter(
						($) => $.id == userDTO.staffId
					)[0].fullName
					} thành công`,
					{
						title: "Thông báo",
						position: "top-right",
						autoHideDelay: 7000,
					}
				);
				this.getCustomerData();
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
			}
			loader.hide();
		},
		async takeCustomer(userDTO) {
			const loader = this.$loading.show();
			const payload = {
				id: userDTO.id,
				staffId: CommonUtils.getStaffInfo().id,
			};
			const res = await ApiCaller.post(
				ROUTES.Customer.updateCustomerData,
				payload
			);
			if (res.status == 200) {
				this.$toast.success(
					`Đánh dấu KH ${userDTO.username} từ data thành công`,
					{
						title: "Thông báo",
						position: "top-right",
						autoHideDelay: 7000,
					}
				);
				this.getCustomerData();
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
			}
			loader.hide();
		},
	},
};
</script>

<!-- style custom -->
<style scoped></style>
