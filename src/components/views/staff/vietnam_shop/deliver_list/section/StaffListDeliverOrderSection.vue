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
				Mã phiếu:<input v-model="filter.bagCode" type="text" value="" name="filter_name" /> 
				SĐT người nhận:<input v-model="filter.shipCode" type="text" value="" name="filter_shipid" /> 
				Trạng thái:
				<select :value="''" name="filter_status">
					<option value="" selected>Tất cả</option>
					<option value="0">Chưa giao</option>
					<option value="1">Đã giao</option>
				</select>
				Ngày nhập:<input
					class="pickdate_from hasDatepicker"
					type="date"
					v-model="filter.fromDate"
					value=""
					name="filter_startdate_is_check_update_date"
				/>
				-
				<input
					class="pickdate_to hasDatepicker"
					type="date"
					v-model="filter.toDate"
					value=""
					name="filter_enddate_is_check_update_date"
				/>
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
					<tr>
						<td>1</td>
						<td>
							<span class="bold">Mã phiếu: <span class="blue">129673</span></span>
							<br>
							<span>Trạng thái: <span class="button-link special-blue">Chưa giao</span></span>
							<br>
							<span>{{ CommonUtils.formatDate(new Date()) }}</span>
							<br>
							<span>Hình thức giao: <span class="bold">Giao nội thành</span></span>
							<br>
							<span>Gồm <span class="orange">1</span> kiện hàng</span>
							<br>
							<span>Tổng trọng lương <span class="orange">3.9</span> kg</span>
						</td>
						<td>
							<div class="col-md-12" style="display: flex; flex-direction: row;">
								<div class="col-md-3" style="padding-left: 20px;">
									<span><fa icon="user"></fa>&nbsp;Ngô Bá Khá</span>
									<br>
									<span><fa icon="phone"></fa>&nbsp;0943.883.280</span>
									<br>
									<span><fa icon="map-marker-alt"></fa>&nbsp;Keangnam Landmark 72</span>
									<br>
									<span><fa icon="map-marker-alt"></fa>&nbsp;Ghi chú: <span class="orange">Chưa có ghi chú</span></span>
								</div>
								<!--  -->
								<div class="col-md-9" style="padding-left: 20px;">
									<table>
										<tr>
											<td>STT</td>
											<td>Mã kiện hàng</td>
											<td>Mã đơn</td>
											<td>Cân nặng</td>
										</tr>
										<tr>
											<td>1</td>
											<td>
												<span class="green">PKG#1298375928</span>
											</td>
											<td>
												<span class="blue">CN_234765</span>
											</td>
											<td>
												<span class="bold">3.2 kg</span>
											</td>
										</tr>
										<tr>
											<td>2</td>
											<td>
												<span class="green">PKG#34567322</span>
											</td>
											<td>
												<span class="blue">CN_203489</span>
											</td>
											<td>
												<span class="bold">1.7 kg</span>
											</td>
										</tr>
										<tr>
											<td>3</td>
											<td>
												<span class="green">PKG#345634</span>
											</td>
											<td>
												<span class="blue">CN_987234785</span>
											</td>
											<td>
												<span class="bold">4.1 kg</span>
											</td>
										</tr>
									</table>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td>1</td>
						<td>
							<span class="bold">Mã phiếu: <span class="blue">129673</span></span>
							<br>
							<span>Trạng thái: <span class="button-link special-blue">Chưa giao</span></span>
							<br>
							<span>{{ CommonUtils.formatDate(new Date()) }}</span>
							<br>
							<span>Hình thức giao: <span class="bold">Giao nội thành</span></span>
							<br>
							<span>Gồm <span class="orange">1</span> kiện hàng</span>
							<br>
							<span>Tổng trọng lương <span class="orange">3.9</span> kg</span>
						</td>
						<td>
							<div class="col-md-12" style="display: flex; flex-direction: row;">
								<div class="col-md-3" style="padding-left: 20px;">
									<span><fa icon="user"></fa>&nbsp;Ngô Bá Khá</span>
									<br>
									<span><fa icon="phone"></fa>&nbsp;0943.883.280</span>
									<br>
									<span><fa icon="map-marker-alt"></fa>&nbsp;Keangnam Landmark 72</span>
									<br>
									<span><fa icon="map-marker-alt"></fa>&nbsp;Ghi chú: <span class="orange">Chưa có ghi chú</span></span>
								</div>
								<!--  -->
								<div class="col-md-9" style="padding-left: 20px;">
									<table>
										<tr>
											<td>STT</td>
											<td>Mã kiện hàng</td>
											<td>Mã đơn</td>
											<td>Cân nặng</td>
										</tr>
										<tr>
											<td>1</td>
											<td>
												<span class="green">PKG#1298375928</span>
											</td>
											<td>
												<span class="blue">CN_234765</span>
											</td>
											<td>
												<span class="bold">3.2 kg</span>
											</td>
										</tr>
										<tr>
											<td>2</td>
											<td>
												<span class="green">PKG#34567322</span>
											</td>
											<td>
												<span class="blue">CN_203489</span>
											</td>
											<td>
												<span class="bold">1.7 kg</span>
											</td>
										</tr>
										<tr>
											<td>3</td>
											<td>
												<span class="green">PKG#345634</span>
											</td>
											<td>
												<span class="blue">CN_987234785</span>
											</td>
											<td>
												<span class="bold">4.1 kg</span>
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
					href="https://ql.hangquangchau24h.vn/storevn/lists_ship?page=10"
					data-ci-pagination-page="2"
					>2</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storevn/lists_ship?page=20"
					data-ci-pagination-page="3"
					>3</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storevn/lists_ship?page=10"
					data-ci-pagination-page="2"
					rel="next"
					>Trang sau »</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storevn/lists_ship?page=260660"
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
	name: "StaffListDeliverOrderSection",
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
			debugger
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
