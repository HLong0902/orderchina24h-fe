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
			<h2 class="float-left">Danh sách đóng bao tại kho Trung Quốc</h2>
		</div>
		<div class="filer_box">
			<form method="GET" @submit.prevent="handleSubmit">
				Nhãn:<input v-model="filter.bagLabel" type="text" value="" name="filter_name" />
				Ngày:<input class="pickdate_from hasDatepicker" type="date" v-model="filter.fromDate" value=""
					name="filter_startdate_create_date" />
				-
				<input class="pickdate_to hasDatepicker" type="date" v-model="filter.toDate" value=""
					name="filter_enddate_create_date" />

				Kho TQ :
				<select v-model="filter.isSend" name="filter_status">
					<option value="" selected="">Tất cả</option>
					<option value="0">Chưa gửi</option>
					<option value="1">Đã gửi</option>
				</select>
				&nbsp;
				<input class="button" type="submit" value="Tìm kiếm" @click="filterListPackage" />
			</form>
		</div>
		<div class="gridtable">
			<table>
				<tbody>
					<tr>
						<td>STT</td>
						<td>Mã bao</td>
						<td>Nhãn bao</td>
						<td>Ghi chú</td>
						<td>Kho VN nhận</td>

						<td>Cân nặng(kg)</td>
						<td>Trạng thái</td>
						<td>Chỉnh sửa</td>
					</tr>
					<tr v-for="(bag, index) in bags">
						<td>{{ index + 1 }}</td>
						<td>
							<div class="green align-center">
								{{ bag.bagCode }}
							</div>
						</td>
						<td class="align-center">
							<div class="blue">{{ bag.bagLabel }}</div>
							<p><strong>Cân nặng thực bao hàng</strong></p>
							<div>
								<span class="green">{{ bag.weigh }}</span> KG
							</div>
						</td>
						<td>
							<div>{{ bag.description }}</div>
						</td>
						<td class="align-center">
							<span class="bold green">{{
								promptInventoryNameById(bag.inventoryId)
							}}</span>
						</td>

						<td class="align-center">
							<p>
								<span class="green">{{ bag.weigh }}</span> KG /
								<span class="green">0</span> NDT
							</p>
							(<span class="red">{{ bag.packages.length }}</span>
							Mã)
							<a target="_blank" href="#" @click="viewDetail(bag.id)">Danh sách mã</a>
						</td>

						<td>
							<p v-for="(log, id) in bag.bagOrderLogs">
								<span class="red">{{
									extractUsername(log.bagLog)
								}}</span>
								{{
									removeStr(
										removeStr(
											log.bagLog,
											extractDate(log.bagLog)
										),
										extractUsername(log.bagLog)
									)
								}}
								<span class="green">{{
									extractDate(log.bagLog)
								}}</span>
							</p>
						</td>
						<td>
							<form action="" class="ajaxFormPackages" method="POST" v-if="bag.status != 0">
								<a class="button-link special-green" @click="handleAction(bag)">
									{{
										CommonUtils.promptBagStatusNameByValue(
											getNextStateOfPkg(bag.status)
										)
									}}
								</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
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
			<strong>Total: <span class="green">{{ bags.length }}</span> (Items)</strong>
		</p>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffListPackageSection",
	data() {
		return {
			bags: [],

			filter: {
				bagLabel: "",
				fromDate: "",
				toDate: "",
				isSend: null,
			},

			commonStore: useCommonStore(),
		};
	},
	mounted() {
		this.filterListPackage();
	},
	methods: {
		async filterListPackage() {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(
				ROUTES.Bag.findByOption,
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
			this.bags = res.data.data;
		},
		promptInventoryNameById(id) {
			const inventory = this.commonStore.inventories.filter(
				($) => $.id == id
			)[0];
			return inventory ? inventory.name : "";
		},
		viewDetail(id) {
			window.open(
				this.$router.resolve({
					name: "StaffAddPackagePage",
					params: { bagId: id },
				}).href,
				"_blank"
			);
		},
		async handleAction(bag) {
			const loader = this.$loading.show();
			const payload = {
				id: bag.id,
				status: this.getNextStateOfPkg(bag.status),
			};
			const res = await ApiCaller.post(ROUTES.Bag.update, payload);
			if (res.status == 200) {
				this.$toast.success(
					`Chuyển trạng thái ${CommonUtils.promptBagStatusNameByValue(
						bag.status
					)} cho bao hangf ${bag.bagCode} thành công`,
					{
						title: "Thông báo",
						position: "top-right",
						autoHideDelay: 7000,
					}
				);
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
			}
			loader.hide();
			this.filterListPackage();
		},
		getNextStateOfPkg(status) {
			switch (status) {
				case 1:
					return 2;
				case 2:
					return 3;
				case 3:
					return 0;
			}
		},
		extractDate(str) {
			const datetimePattern = /\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}/;
			const datetimeMatch = str.match(datetimePattern);
			if (datetimeMatch) {
				return datetimeMatch[0];
			}
		},
		extractUsername(str) {
			const regex = /^\w+/;
			const match = str.match(regex);
			if (match) {
				return match[0];
			}
		},
		removeStr(src, dest) {
			src = src.replace(dest, "");
			return src;
		},
	},
};
</script>

<!-- style custom -->
<style scoped></style>
