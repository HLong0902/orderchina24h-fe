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
			<form
				method="GET"
				@submit.prevent="handleSubmit"
			>
				Nhãn:<input v-model="filter.bagLabel" type="text" value="" name="filter_name" />
				Ngày:<input
					class="pickdate_from hasDatepicker"
					type="date"
					v-model="filter.fromDate"
					value=""
					name="filter_startdate_create_date"
				/>
				-
				<input
					class="pickdate_to hasDatepicker"
					type="date"
					v-model="filter.toDate"
					value=""
					name="filter_enddate_create_date"
				/>

				Kho TQ :
				<select v-model="filter.isSend" name="filter_status">
					<option value="" selected="">Tất cả</option>
					<option value="0">Chưa gửi</option>
					<option value="1">Đã gửi</option>
				</select>
				&nbsp;
				<input class="button" type="submit" value="Tìm kiếm" @click="filterListPackage"/>
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
							<div class="green align-center">{{ bag.bagCode }}</div>
						</td>
						<td class="align-center">
							<div class="blue">{{ bag.bagLabel }}</div>
							<p><strong>Cân nặng thực bao hàng</strong></p>
							<div><span class="green">{{ bag.weigh }}</span> KG</div>
						</td>
						<td>
							<div>{{ bag.description }}</div>
						</td>
						<td class="align-center">
							<span class="bold green">{{ promptInventoryNameById(bag.inventoryId) }}</span>
						</td>

						<td class="align-center">
							<p>
								<span class="green">{{ bag.weigh }}</span> KG /
								<span class="green">0</span> NDT
							</p>
							(<span class="red">{{ bag.packages.length }}</span> Mã)
							<a
								target="_blank"
								href="#"
								@click="viewDetail(bag.id)"
								>Danh sách mã</a
							>
						</td>

						<td>
							<p>admin đã tạo lúc 03-05-2024 22:24:48</p>
						</td>
						<td>
							<form
								action=""
								class="ajaxFormPackages"
								method="POST"
							>
								<input type="hidden" name="id" value="15510" />
								<input
									type="hidden"
									name="controller"
									value="storecn"
								/>
								<input
									type="hidden"
									name="task"
									value="send_package"
								/>
								<a
									class="button-link special-green"
									onclick="submitAjax(this)"
								>
									Gửi hàng
								</a>
								<div
									class="ajax_response alert dismissable"
								></div>
							</form>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<ul class="pagination">
			<li class="active"><a>1</a></li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storecn/lists_package?page=10"
					data-ci-pagination-page="2"
					>2</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storecn/lists_package?page=20"
					data-ci-pagination-page="3"
					>3</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storecn/lists_package?page=10"
					data-ci-pagination-page="2"
					rel="next"
					>Trang sau »</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storecn/lists_package?page=15500"
					data-ci-pagination-page="1551"
				>
					»</a
				>
			</li>
		</ul>
		<p>
			<strong>Total: <span class="green">15510</span> (Items)</strong>
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
				bagLabel: '',
				fromDate: '',
				toDate: '',
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
			const res = await ApiCaller.get(ROUTES.Bag.findByOption, this.filter);
			loader.hide();
			this.bags = res.data.data;
		},
		promptInventoryNameById(id) {
			const inventory = this.commonStore.inventories.filter(
				($) => $.id == id
			)[0];
			return inventory.name;
		},
		viewDetail(id) {
			window.open(this.$router.resolve({ name: 'StaffAddPackagePage', params: { bagId: id } }).href, '_blank');
		}
	},
};
</script>

<!-- style custom -->
<style scoped></style>
