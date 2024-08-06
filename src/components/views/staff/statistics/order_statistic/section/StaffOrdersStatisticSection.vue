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
			<h2 class="float-left">Thống kê toàn bộ đơn hàng
        <span v-if="filter.fromDate">từ ngày </span><span class="red" v-if="filter.fromDate"> {{filter.fromDate}}</span>
        <span v-if="filter.toDate"> đến ngày </span><span class="red" v-if="filter.toDate"> {{filter.toDate}}</span>
      </h2>
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
						<td>Mã đơn</td>
						<td>Tổng đơn hàng</td>
						<td>Tổng tiền hàng</td>
						<td>Tổng phí mua hàng</td>
						<td>Tổng phí VC QT</td>
						<td>Tổng phí kiểm đếm</td>
						<td>Tổng phí đóng gỗ</td>
						<td>Tổng phí khác</td>
						<td>Tổng cân nặng</td>
						<td>Tổng cân nặng tính theo thể tích</td>
						<td>Tổng cân nặng thực bao hàng</td>
					</tr>
					<tr>
						<td>1</td>
						<td>Mã đơn CN</td>
						<td>
							<span class="blue">
								{{ statisCN.totalOrder ? statisCN.totalOrder : 0 }}
							</span> đơn
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisCN.totalItemMoney) }}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisCN.serviceFee) }}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisCN.internationalShippingFees)
								}}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisCN.tallFee) }}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisCN.woodworkingFee) }}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisCN.otherFees) }}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisCN.totalWeight) }}</span> kg
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisCN.totalVolume) }}</span> m3
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisCN.totalWeight) }}</span> kg
						</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Mã đơn SK</td>
						<td>
							<span class="blue">
								{{ statisSK.totalOrder ? statisSK.totalOrder : 0 }}
							</span> đơn
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisSK.totalItemMoney) }}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisSK.serviceFee) }}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisSK.internationalShippingFees)
								}}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisSK.tallFee) }}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisSK.woodworkingFee) }}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisSK.otherFees) }}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisSK.totalWeight) }}</span> kg
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisSK.totalVolume) }}</span> m3
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisSK.totalWeight) }}</span> kg
						</td>
					</tr>
					<tr>
						<td>3</td>
						<td>Mã đơn KG</td>
						<td>
							<span class="blue">
								{{ statisKG.totalOrder ? statisKG.totalOrder : 0 }}
							</span> đơn
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisKG.totalItemMoney) }}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisKG.serviceFee) }}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisKG.internationalShippingFees)
								}}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisKG.tallFee) }}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisKG.woodworkingFee) }}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisKG.otherFees) }}</span> VNĐ
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisKG.totalWeight) }}</span> kg
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisKG.totalVolume) }}</span> m3
						</td>
						<td>
							<span class="green">{{ CommonUtils.formatNumber(statisKG.totalWeight) }}</span> kg
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p>
			<strong>Total: <span class="green">3</span> (Items)</strong>
		</p>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffOrdersStatisticSection",
	data() {
		return {
			statistics: [],

			statisCN: [],
			statisSK: [],
			statisKG: [],

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
				ROUTES.Statistic.getOrders,
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
			this.statisCN = res.data.responsesCN[0];
			this.statisSK = res.data.responsesSK[0];
			this.statisKG = res.data.responsesKG[0];
		},
		viewDetail(id) {
			window.open(this.$router.resolve({ name: 'StaffOrderPage', params: { staffId: id } }).href, '_blank');
		},
	},
};
</script>

<!-- style custom -->
<style scoped></style>
