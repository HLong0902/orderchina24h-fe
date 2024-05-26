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
			<h2 class="float-left">Thống kê doanh số</h2>
		</div>
		<div class="filer_box">
			<form method="GET" @submit.prevent="handleSubmit">
				Từ ngày:<input class="pickdate_from hasDatepicker" type="date" v-model="filter.fromDate" value=""
					name="filter_startdate_create_date" />
				- Đến ngày
				<input class="pickdate_to hasDatepicker" type="date" v-model="filter.toDate" value=""
					name="filter_enddate_create_date" />
				&nbsp;
				<input class="button" type="submit" value="Tìm kiếm" @click="search" />
			</form>
		</div>
		<div class="gridtable">
			<table>
				<tbody>
					<tr>
						<td>STT</td>
						<td>Tên tư vấn</td>
						<td>Thống kê đơn hàng</td>
						<td>Tổng tiền hoa hồng</td>
					</tr>
					<tr v-for="(statis, index) in statistics">
						<td>{{ index + 1 }}</td>
						<td>
							<div class="blue align-center">
								({{ statis.staffId }}) - {{ statis.staffName }}
							</div>
						</td>
						<td>
							<div>
								<span class="bold">Tổng đơn hàng: </span>
								<span class="blue">{{ statis.totalOrder }}</span>
								<span> (Tổng số tiền đơn hàng mới và cũ: <span class="green">{{
									CommonUtils.formatNumber(statis.totalOrderMoney) }}</span> VNĐ)</span>
							</div>
							<div>
								<span class="bold">Đơn hàng mới: </span>
								<span class="blue">{{ statis.totalOrderNew }}</span>
								<span> (Tổng số tiền đơn hàng mới và cũ: <span class="green">{{
									CommonUtils.formatNumber(statis.totalOrderNewMoney) }}</span> VNĐ)</span>
							</div>
						</td>
						<td class="align-center">
							<span class="red">{{ CommonUtils.formatNumber(statis.commissions) }}</span>
							&nbsp;
							VNĐ
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p>
			<strong>Total: <span class="green">{{ statistics.length }}</span> (Items)</strong>
		</p>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffSalesStatisticSection",
	data() {
		return {
			statistics: [],

			filter: {
				fromDate: "",
				toDate: "",
			},

			commonStore: useCommonStore(),
		};
	},
	mounted() {
		this.search();
	},
	methods: {
		async search() {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(
				ROUTES.Statistic.getSales,
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
			this.statistics = res.data;
		},
		viewDetail(id) {
			window.open(this.$router.resolve({ name: 'StaffOrderPage', params: { staffId: id } }).href, '_blank');
		},
	},
};
</script>

<!-- style custom -->
<style scoped></style>
