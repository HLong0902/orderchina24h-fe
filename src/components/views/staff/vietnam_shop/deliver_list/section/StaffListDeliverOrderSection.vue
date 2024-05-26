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
			<h2 class="float-left">Danh sách phiếu giao hàng</h2>
		</div>
		<div class="filer_box">
			<form @submit.prevent="handleSubmit" method="GET">
				Mã phiếu:<input v-model="filter.code" type="text" value="" name="filter_name" />
				SĐT người nhận:<input v-model="filter.phone" type="text" value="" name="filter_shipid" />
				Trạng thái:
				<select v-model="filter.status" name="filter_status">
					<option :value="''" selected>Tất cả</option>
					<option :value="1">Chưa giao</option>
					<option :value="2">Đã giao</option>
				</select>
				Ngày nhập:<input class="pickdate_from hasDatepicker" type="date" v-model="filter.fromDate" value=""
					name="filter_startdate_is_check_update_date" />
				-
				<input class="pickdate_to hasDatepicker" type="date" v-model="filter.toDate" value=""
					name="filter_enddate_is_check_update_date" />
				&nbsp;
				<input class="button" @click="query" type="submit" value="Tìm kiếm" />
			</form>
		</div>
		<div class="gridtable">
			<table>
				<tbody>
					<tr>
						<td width="5%">STT</td>
						<td width="20%">Thông tin phiếu</td>
						<td width="75%">Thông tin nhận hàng</td>
					</tr>
					<tr v-for="(deliverOrder, index) in deliverOrderLst">
						<td>{{ index + 1 }}</td>
						<td>
							<span class="bold">Mã phiếu: <span class="blue">
									<a href="#" @click="viewDetail(deliverOrder.code)">{{ deliverOrder.code }}</a>
								</span></span>
							<br>
							<span>Trạng thái: <span
									:class="CommonUtils.promptDeliverOrderStatusClassByValue(deliverOrder.status)">{{
										CommonUtils.promptDeliverOrderStatusNameByValue(deliverOrder.status)
									}}</span></span>
							<br>
							<span>{{ CommonUtils.formatDate(deliverOrder.createDate) }}</span>
							<br>
							<span>Gồm <span class="red">{{ deliverOrder.packages.length }}</span> kiện hàng</span>
							<br>
							<span>Tổng trọng lương <span class="green">{{ deliverOrder.packages.reduce((sum, item) =>
								sum += parseInt(item.weigh ? item.weigh : 0), 0) }}</span> kg</span>
						</td>
						<td>
							<div class="col-md-12" style="display: flex; flex-direction: row;">
								<div class="col-md-3" style="padding-left: 20px;">
									<span>
										<fa icon="user"></fa>&nbsp;{{ deliverOrder.address.name }}
									</span>
									<br>
									<span>
										<fa icon="phone"></fa>&nbsp;{{ deliverOrder.address.phoneNumber }}
									</span>
									<br>
									<span>
										<fa icon="map-marker-alt"></fa>&nbsp;{{ deliverOrder.address.address }}
									</span>
									<br>
									<span>
										<fa icon="map-marker-alt"></fa>&nbsp;Ghi chú: <span class="orange">Chưa có ghi
											chú</span>
									</span>
								</div>
								<!--  -->
								<div class="col-md-9" style="padding-left: 20px;">
									<table>
										<tr>
											<td width="5%">STT</td>
											<td width="15%">Mã kiện hàng</td>
											<td width="25%">Mã đơn</td>
											<td width="15%">Cân nặng</td>
										</tr>
										<tr v-for="(pkg, idx) in deliverOrder.packages">
											<td>1</td>
											<td>
												<span class="green">{{ pkg.shipCode }}</span>
											</td>
											<td>
												<span class="blue">{{ pkg.orderCode }}</span>
											</td>
											<td>
												<span class="bold">{{ pkg.isVolume ? (pkg.volume ? pkg.volume : 0) :
													(pkg.weigh ? pkg.weigh : 0) }}</span> {{ pkg.isVolume ? "m3" : 'kg'
												}}
											</td>
										</tr>
									</table>
								</div>
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
					href="/storevn/lists_ship?page=10"
					data-ci-pagination-page="2"
					>2</a
				>
			</li>
			<li>
				<a
					href="/storevn/lists_ship?page=20"
					data-ci-pagination-page="3"
					>3</a
				>
			</li>
			<li>
				<a
					href="/storevn/lists_ship?page=10"
					data-ci-pagination-page="2"
					rel="next"
					>Trang sau »</a
				>
			</li>
			<li>
				<a
					href="/storevn/lists_ship?page=260660"
					data-ci-pagination-page="26067"
				>
					»</a
				>
			</li>
		</ul> -->
		<p>
			<strong>Total: <span class="green">{{ deliverOrderLst.length }}</span> (Items)</strong>
		</p>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffListDeliverOrderSection",
	data() {
		return {
			filter: {
				fromDate: "",
				toDate: "",
				code: "",
				phone: "",
				status: '',
				pageIndex: 1,
				pageSize: 999999,
			},

			deliverOrderLst: [],
		};
	},
	mounted() {
		this.query();
	},
	methods: {
		async query() {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(
				ROUTES.DeliverOrder.findByOption,
				this.filter
			);
			if (res.status == 200) {
				this.deliverOrderLst = res.data.data;
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
			}
			loader.hide();
		},
		viewDetail(id) {
			window.open(this.$router.resolve({ name: 'StaffDeliverDetailPage', params: { deliverId: id } }).href, '_blank');
		},
	},
};
</script>

<!-- style custom -->
<style scoped></style>
