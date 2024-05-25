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
			<h2 class="float-left">Danh sách vận đơn đã nhập kho việt nam</h2>
		</div>
		<div class="filer_box">
			<form @submit.prevent="handleSubmit" method="GET">
				Bao hàng:<input v-model="filter.bagCode" type="text" value="" name="filter_name" /> Mã
				vận đơn:<input v-model="filter.shipCode" type="text" value="" name="filter_shipid" /> Ngày
				nhập:<input class="pickdate_from hasDatepicker" type="date" v-model="filter.fromDate" value=""
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
						<td>STT</td>
						<td>Mã vận đơn</td>
						<td>Nhập kho TQ</td>
						<td>Nhập kho VN</td>
						<td>Cân nặng / SL</td>
						<td>Bao đã đóng</td>
					</tr>
					<tr v-for="(pkg, index) in packages">
						<td>{{ index + 1 }}</td>
						<td>
							<span class="green"> {{ pkg.shipCode }} </span>
						</td>
						<td>
							<div class="black">TIEN KHO SG</div>
							<div class="blue">11-05-2024 16:23:18</div>
						</td>
						<td>
							<div class="black">TIEN KHO SG</div>
							<div class="blue">11-05-2024 16:23:16</div>
						</td>
						<td class="align-center">
							<div class="green big">
								{{ pkg.weigh ? pkg.weigh : 0 }}<span class="red">(kg)</span> /
							</div>
						</td>

						<td>
							<div class="black">{{ pkg.bagOrder ? pkg.bagOrder.bagCode : '-' }}</div>
							<div class="green">
								<span class="bold black">Kho SG</span>
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
			<strong>Total: <span class="green">{{ packages.length }}</span> (Items)</strong>
		</p>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffListShipVNSection",
	data() {
		return {
			filter: {
				fromDate: "",
				toDate: "",
				bagCode: "",
				shipCode: "",
				pageIndex: 1,
				pageSize: 999999,
			},

			packages: [],
		};
	},
	mounted() {
		this.query();
	},
	methods: {
		async query() {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(
				ROUTES.Package.findByOption,
				this.filter
			);

			if (res.status == 200) {
				this.packages = res.data.data;
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
