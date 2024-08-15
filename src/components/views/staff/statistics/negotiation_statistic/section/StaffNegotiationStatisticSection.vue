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
      <h2 class="float-left">Thống kê tiền chênh lệch thương lượng
        <span v-if="filter.fromDate">từ ngày </span><span class="red" v-if="filter.fromDate"> {{filter.fromDate}}</span>
        <span v-if="filter.toDate"> đến ngày </span><span class="red" v-if="filter.toDate"> {{filter.toDate}}</span>
      </h2>
		</div>
		<div class="filer_box">
			<form method="GET" @submit.prevent="handleSubmit">
				Mua hàng:<input v-model="filter.staffId" type="text" value="" name="filter_name" autofocus v-focus/>
				Ngày thanh toán:<input class="pickdate_from hasDatepicker" type="date" v-model="filter.fromDate"
					value="" name="filter_startdate_create_date" />
				-
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
						<td>Nhân viên</td>
						<td>Tổng số đơn</td>
						<td>Tổng số tiền cty thanh toán</td>
						<td>Tổng số tiền KH thanh toán</td>

						<td>Tổng số tiền chênh lệch</td>
					</tr>
					<tr v-for="(statis, index) in statistics">
						<td>{{ index + 1 }}</td>
						<td>
							<div class="blue align-center">
								({{ statis.staffId }}) - {{ statis.staffUserName }}
							</div>
						</td>
						<td class="align-center">
							<span class="blue">{{ statis.totalOrder }}</span> /
							<span>
								<a style="cursor: pointer;" @click="viewDetail(statis.staffId)">Xem chi tiết</a>
							</span>
						</td>
						<td class="align-center">
							<span class="green">{{ CommonUtils.formatNumberFloat(statis.totalCompayPay) }}</span>
							&nbsp;
							<span class="bold">(NĐ: {{ CommonUtils.formatNumberFloat(statis.domesticFeeChinaNDT) }})</span>
						</td>
						<td class="align-center">
							<span class="green">{{ CommonUtils.formatNumberFloat(statis.totalCustomerPay) }}</span>
							&nbsp;
							<span class="bold">(NĐ: {{ CommonUtils.formatNumberFloat(statis.totalDomesticFeeNDT) }})</span>
						</td>

						<td class="align-center">
							<span class="green">{{ CommonUtils.formatNumberFloat(statis.totalUneven) }}</span>
							&nbsp;
							<span class="bold">(NĐ: {{ CommonUtils.formatNumberFloat(statis.totalUnevenNDT) }})</span>
						</td>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td class="align-center">
							<span class="bold">Số đơn: {{ statistics.reduce((sum, item) => sum += item.totalOrder, 0)
								}}</span>
						</td>
						<td class="total">
							<span class="bold">Công ty: </span>
							<span class="green">{{ CommonUtils.formatNumberFloat(statistics.reduce((sum, item) => sum +=
								item.totalCompayPay, 0)) }}</span>
							&nbsp;
							<span class="bold">(NĐ: {{ CommonUtils.formatNumberFloat(statistics.reduce((sum, item) => sum +=
								item.domesticFeeChinaNDT, 0)) }})</span>
						</td>
						<td>
							<span class="bold">Khách hàng: </span>
							<span class="green">{{ CommonUtils.formatNumberFloat(statistics.reduce((sum, item) => sum +=
								item.totalCustomerPay, 0)) }}</span>
							&nbsp;
							<span class="bold">(NĐ: {{ CommonUtils.formatNumberFloat(statistics.reduce((sum, item) => sum +=
								item.totalDomesticFeeNDT, 0)) }})</span>
						</td>

						<td>
							<span class="bold">Chênh lệch: </span>
							<span class="green">{{ CommonUtils.formatNumberFloat(statistics.reduce((sum, item) => sum +=
								item.totalUneven, 0)) }}</span>
							&nbsp;
							<span class="bold">(NĐ: {{ CommonUtils.formatNumberFloat(statistics.reduce((sum, item) => sum +=
								item.totalUnevenNDT, 0)) }})</span>
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
	name: "StaffNegotiationStatisticSection",
	data() {
		return {
			statistics: [],

			filter: {
				staffId: "",
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
				ROUTES.Statistic.getNegotiation,
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
