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
			<h2 class="float-left">Danh sách vận đơn đã nhập kho Trung Quốc</h2>
		</div>
		<div class="filer_box">
			<form @submit.prevent="handleSubmit" method="GET">
				Bao hàng:<input v-model="filter.bagCode" type="text" value="" name="filter_name" /> Mã
				vận đơn:<input v-model="filter.shipCode" type="text" value="" name="filter_shipid" />
				Ngày:<input class="pickdate_from hasDatepicker" type="date" v-model="filter.fromDate" value=""
					name="filter_startdate_is_check_update_date" />
				-
				<input class="pickdate_to hasDatepicker" type="text" v-model="filter.toDate" value=""
					name="filter_enddate_is_check_update_date" />

				Chưa đóng bao :
				<input :value="!filter.isInBag" @input="filter.isInBag = JSON.parse($event.target.value)"
					type="checkbox" name="filter_is_package" />
				<input class="button" type="submit" @click="query" value="Tìm kiếm" />
			</form>
		</div>
		<div class="gridtable">
			<table>
				<tbody>
					<tr>
						<td>STT</td>
						<td>Mã vận đơn</td>
						<td>NV Nhập / Ngày nhập</td>
						<td>Cân nặng / SL</td>
						<td>Bao đã đóng</td>
					</tr>
					<tr v-for="(pkg, index) in packages">
						<td>{{ index + 1 }}</td>
						<td>
							<span class="green"> {{ pkg.shipCode }} </span>
						</td>
						<td>
							<div class="blue"><span class="black">{{ pkg.createUser }}</span> / {{
								CommonUtils.formatDate(pkg.createDate) }}</div>
						</td>
						<td class="align-center">
							<div class="green big">
								{{ pkg.weigh ? pkg.weigh : 0 }}<span class="red"> (kg)</span> /
							</div>
						</td>

						<td>
							<div class="black">{{ pkg.bagOrder ? pkg.bagOrder.bagCode : '' }}</div>
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
	name: "StaffListShipSection",
	data() {
		return {
			filter: {
				fromDate: "",
				toDate: '',
				bagCode: '',
				shipCode: '',
				isInBag: true,
				pageIndex: 1,
				pageSize: CONSTANT.DEFAULT_PAGESIZE,
			},

			totalPage: new Set(),
			totalRecord: 0,

			packages: [],
		};
	},
	mounted() {
		this.query();
	},
	methods: {
		async query() {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(ROUTES.Package.findByOption, this.filter);
			loader.hide();
			if (res.status == 200) {
				this.packages = res.data.data;
				this.totalPage = new Set();
				this.totalRecord = res.data.totalRecord;
				if (this.filter.pageIndex > res.data.totalPage) {
					this.filter.pageIndex = 1;
				}
				for (let i = 1; i <= res.data.totalPage; i++) {
					this.totalPage.add(i);
				}
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
		},
		handlePage(page) {
			this.filter.pageIndex = page;
			this.query();
		},
		handleNext() {
			if (this.filter.pageIndex < this.totalPage.size)
				this.filter.pageIndex++;
			else {
				this.filter.pageIndex = this.totalPage.size
			}
			this.query();
		},
		handleLast() {
			this.filter.pageIndex = this.totalPage.size;
			this.query();
		},
	},
};
</script>

<!-- style custom -->
<style scoped></style>
