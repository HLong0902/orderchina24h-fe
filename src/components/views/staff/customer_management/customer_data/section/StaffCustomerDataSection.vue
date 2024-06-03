<script setup>
import ROUTES from "../../../../../../constants/routeDefine";
import ApiCaller from "../../../../../utils/ApiCaller";
import CommonUtils from "../../../../../utils/CommonUtils";
import { useCommonStore } from "../../../../../../store/CommonStore";
import CONSTANT from "../../../../../../constants/constants";
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
						<td width="15%">Thông tin KH</td>
						<td>Lịch sử đặt hàng lần đầu/cuối</td>
						<td>Kho nhận hàng</td>
						<td>Ghi chú</td>

						<td>Ví điện tử</td>
						<td>NV tư vấn</td>
						<td>Thao tác</td>
						<td v-if="CommonUtils.getRole() == CONSTANT.ROLE.ADMIN">Chỉ định nhân viên</td>
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
							<span class="blue">KHO HN</span>
						</td>
						<td class="align-center">
							<span class="bold green">
								<form>
									<textarea v-model="cust.userDTO.note" rows="5" maxlength="200"></textarea>
									<br>
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
						<td v-if="CommonUtils.getRole() == CONSTANT.ROLE.ADMIN">
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
	name: "StaffCustomerDataSection",
	data() {
		return {
			customers: [],

			filter: {
				fromDate: "",
				toDate: "",
				status: "",
				pageSize: CONSTANT.DEFAULT_PAGESIZE,
				pageIndex: 0,
				transactionCode: "",
				type: "",
			},

			totalPage: new Set(),
			totalRecord: 0,

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
			this.getCustomerData();
		},
		handleNext() {
			if (this.filter.pageIndex < this.totalPage.size)
				this.filter.pageIndex++;
			else {
				this.filter.pageIndex = this.totalPage.size
			}
			this.getCustomerData();
		},
		handleLast() {
			this.filter.pageIndex = this.totalPage.size;
			this.getCustomerData();
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
			const payload = {
				id: userDTO.id,
				staffId: userDTO.staffId,
			};
			const loader = this.$loading.show();
			const res = await ApiCaller.post(
				ROUTES.Customer.updateCustomerData,
				payload
			);
			loader.hide();
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
