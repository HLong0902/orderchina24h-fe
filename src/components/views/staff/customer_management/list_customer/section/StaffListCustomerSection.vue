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
				Mã hoá đơn:
				<input v-model="filter.orderCode" type="text" value="" name="filter_name" />
				&nbsp;
				Username:
				<input v-model="filter.username" type="text" value="" name="filter_name" />
				&nbsp;
				Họ tên:
				<input v-model="filter.fullName" type="text" value="" name="filter_name" />
				&nbsp;
				Phone:
				<input v-model="filter.phone" type="text" value="" name="filter_name" />
				&nbsp;
				Email:
				<input v-model="filter.email" type="text" value="" name="filter_name" />
				&nbsp;
				<select v-model="filter.staffId">
					<option :value="undefined">
						Chưa chọn nhân viên
					</option>
					<option v-for="item in commonStore.staffs" :key="item.id" :value="item.id">
						[{{ item.id }}] -
						{{ item.fullName ? item.fullName : item.username }} - CSKH
					</option>
				</select>
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
						<td>Thông tin liên hệ</td>
						<td>Tổng số</td>
						<td>Thông tin đơn hàng</td>
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
								<span class="blue">Số dư ví: </span><span class="bg_green">{{
									CommonUtils.formatNumber(
										cust.userDTO.availableBalance
									)
								}}
									vnđ</span>
							</div>
						</td>
						<td>
							<span class="bold">Địa chỉ: </span><span>{{
								cust.userDTO.address
							}}</span>
							<br />
							<span class="bold">SĐT: </span><span>{{
								cust.userDTO.phone
							}}</span>
							<br />
							<span class="bold">Tư vấn: </span><span class="blue">{{
								cust.userDTO.staffId
									? commonStore.staffs.filter(
										($) =>
											$.id == cust.userDTO.staffId
									)[0] ? commonStore.staffs.filter(
										($) =>
											$.id == cust.userDTO.staffId
									)[0].fullName : "Chưa gán nhân viên"
									: "Chưa gán nhân viên"
							}}</span>
							<br />
						</td>
						<td>
							<span>Tổng số đơn: </span><span class="big red">{{
								CommonUtils.formatNumber(cust.totalOrder)
							}}</span>
							<br />
							<span>Số tiền cần thanh toán: <br></span><span class="big red">{{
								CommonUtils.formatNumber(cust.amountMustPay)
							}} <span class="small red">đ</span></span>
							<br />
							<span>Số tiền cần nạp: <br></span><span class="big green" v-if="cust.amountMustAdmit != 0">{{
								CommonUtils.formatNumber(cust.amountMustAdmit)
							}} <span class="small red">đ</span></span>
              <span class="yellow" v-else-if="cust.amountMustPay!=0"><b>Đang dư tiền trong ví</b></span>
              <span class="big green" v-else="cust.amountMustPay!=0">{{CommonUtils.formatNumber(cust.amountMustAdmit) }} <span class="small red">đ</span></span>
							<br />
						</td>
						<td class="align-center">
							<table v-if="cust.orderHistory">
								<tr>
									<td width="5%">Mã hoá đơn</td>
									<td width="15%">Tổng tiền</td>
									<td width="15%">Đã TT</td>
									<td width="15%">Còn thiếu</td>
									<td width="15%">Thao tác</td>
								</tr>
								<tr v-for="(orderChina, idx) in cust.orderHistory">
									<td>
										<a style="cursor: pointer;" @click="viewDetail(orderChina.id)" class="green">{{
											orderChina.orderCode }}</a>
									</td>
									<td>
										<span class="blue">{{ CommonUtils.formatNumber(orderChina.totalAmount) }}</span>
										<b>vnđ</b>
									</td>
									<td>
										<span class="green">{{ CommonUtils.formatNumber(orderChina.paid) }}</span>
										<b>vnđ</b>
									</td>
									<td>
										<span class="red">{{ CommonUtils.formatNumber(orderChina.notPaid) }}</span>
										<b>vnđ</b>
									</td>
									<td>
										<a @click="changeOrderStatus(orderChina)" class="button-link special-green">Sẵn
											sàng giao hàng</a>
									</td>
								</tr>
							</table>
							<span v-else class="bold">Không có đơn hàng nào ở trạng thái <span class="red">Nhập kho
									VN</span></span>
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
	name: "StaffListCustomerSection",
	data() {
		return {
			customers: [],

			filter: {
				orderCode: '',
				username: '',
				fullName: '',
				phone: '',
				email: '',
				staffId: undefined,
				pageIndex: 1,
				pageSize: CONSTANT.DEFAULT_PAGESIZE,
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
				ROUTES.Customer.customerList,
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
		async changeOrderStatus(orderChina) {
			const loader = this.$loading.show();
			const payload = {
				id: orderChina.id,
				status: CONSTANT.ORDER_STATUS.SAN_SANG_GIAO_HANG,
			}
			const res = await ApiCaller.post(ROUTES.Order.updateOrderStatus, payload);
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
			this.getCustomerData();
		},
		viewDetail(id) {
			window.open(this.$router.resolve({ name: 'StaffOrderDetailPage', params: { orderId: id } }).href, '_blank');
		}
	},
};
</script>

<!-- style custom -->
<style scoped></style>
