<script setup>
import CONSTANT from "../../../../../../constants/constants";
import ROUTES from "../../../../../../constants/routeDefine";
import { useCommonStore } from "../../../../../../store/CommonStore";
import ApiCaller from "../../../../../utils/ApiCaller";
import CommonUtils from "../../../../../utils/CommonUtils";
import html2pdf from "html2pdf.js";
</script>

<!-- template section -->
<template>
	<div id="content" class="fullwidth clearfix">
		<!--<h2 class="align-center">GIAO HÀNG</h2>-->
		<div id="section-non-print">
			<div class="search">
				<center>
					<form @submit.prevent="handleSubmit">
						<b>Tìm theo : </b>
						<select v-model="critetia" name="search_type">
							<option value="username" selected>
								Tên đăng nhập
							</option>
							<option value="phone">Số điện thoại</option>
							<option value="email">Email</option>
						</select>
						&nbsp;
						<input
							v-model="query"
							type="text"
							name="search_text"
							required=""
							placeholder="Nhập điều kiện"
						/>
						&nbsp;
						<input @click="search" type="submit" value="Tìm kiếm" />
					</form>
				</center>
			</div>
		</div>
		<div class="delivery clearfix">
			<div id="section-non-print-2">
				<div class="check">
					<h3 class="uppercase">Chọn mã giao hàng</h3>
					<p>+ Đơn hàng mầu XANH : Là đơn hàng đã thanh toán</p>
					<p>+ Đơn hàng mầu VÀNG : Là đơn hàng chưa thanh toán</p>
					<form
						v-if="packages.length > 0"
						action=""
						class="ajaxFormdelivery"
						method="POST"
					>
						<div class="gridtable">
							<table>
								<tbody>
									<tr style="font-size: 10px">
										<td>STT</td>
										<td>Mã hoá đơn</td>
										<td>Mã vận đơn</td>
										<td>Đã kiểm</td>
										<td>Kho VN</td>
										<td>Đã thanh toán</td>
										<td>Check đã giao</td>
										<td>In phiếu giao</td>
									</tr>
									<tr v-for="(pkg, index) in packages">
										<td class="align-center">
											{{ index + 1 }}
										</td>
										<td>
											<span class="green">{{
												pkg.orderCode
											}}</span>
										</td>
										<td>
											<span class="red">{{
												pkg.shipCode
											}}</span>
										</td>
										<td class="align-center"></td>
										<td class="align-center"></td>
										<td class="align-center">x</td>
										<td class="align-center">
											<input type="checkbox" />
										</td>
										<td class="align-center">
											<input type="checkbox" />
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<input
							type="button"
							name=""
							value="Lưu"
							onclick="submitAjax(this)"
						/>
						<div class="ajax_response alert dismissable"></div>
					</form>
				</div>
			</div>

			<div class="print_order" id="section-to-print">
				<div class="float-right exclude">
					<!-- <a
						@click="printElement"
						class="button-link"
						>IN PHIẾU GIAO HÀNG</a
					> -->
					<a
						class="button-link"
						href="javascript:if(window.print)window.print()"
						>IN PHIẾU GIAO HÀNG</a
					>
				</div>
				<div class="item_1 clearfix">
					<div class="images">
						<img
							height="70px;"
							src="/src/assets/icons/logo.png"
							style="margin-top: -10px; width: 155px"
						/>
					</div>
					<div class="address">
						<h3 class="align-center">PHIẾU GIAO HÀNG</h3>
						<p>
							<b style="float: left">Kho Hà Nội: </b>
							<span> Hữu Hoà, Thanh Trì, Hà Nội </span>
							<br />
							<!--<b style="float:left">TP HCM: </b> <span></span> -->
							<b style="float: left">Hotline: </b>
							<span style="float: left; padding-left: 3px">
								032.687.6636</span
							>
						</p>
					</div>
					<div class="date">
						<div>Số: ......................</div>
						<div>Ngày 11 tháng 05 năm 2024</div>
					</div>
				</div>
				<div class="item_2">
					<div><b>Khách hàng: </b> {{ address.name }}</div>
					<div><b>Địa chỉ: </b> {{ address.address }}</div>
					<div><b>Điện thoại: </b> {{ address.phoneNumber }}</div>
				</div>
				<div class="item_3" id="table_print_container">
					<div class="gridtable">
						<table id="print_table_header">
							<tbody>
								<tr>
									<td width="50%">Mã vận đơn</td>
									<td width="50%">Số lượng</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="item_3">
					<ul>
						<li>
							<b>Người giao hàng</b>
							<div>Ký, ghi rõ họ tên</div>
						</li>
						<li>
							<b>Người nhận hàng</b>
							<div>Ký, ghi rõ họ tên</div>
						</li>
						<li>
							<b>Người lập phiếu</b>
							<div>Ký, ghi rõ họ tên</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffDeliverOrderSection",
	data() {
		return {
			critetia: "username",
			query: "",
			packages: [],
			userInfo: {},
			address: {},
		};
	},
	mounted() {},
	methods: {
		async search() {
			this.getAddressByUsername();
			const loader = this.$loading.show();
			let payload = null;
			switch (this.critetia) {
				case "email":
					payload = {
						email: this.query,
					};
					break;
				case "phone":
					payload = {
						phone: this.query,
					};
					break;
				case "username":
				default:
					payload = {
						username: this.query,
					};
					break;
			}
			const res = await ApiCaller.post(
				ROUTES.Package.packageForTicket,
				payload
			);
			this.packages = res.data;
			loader.hide();
		},
		async getAddressByUsername() {
			const loader = this.$loading.show();
			let payload = null;
			switch (this.critetia) {
				case "email":
					payload = {
						email: this.query,
					};
					break;
				case "phone":
					payload = {
						phone: this.query,
					};
					break;
				case "username":
				default:
					payload = {
						username: this.query,
					};
					break;
			}
			const res = await ApiCaller.post(
				ROUTES.Address.findByUsername,
				payload
			);
			this.address = res.data;
			loader.hide();
		},
	},
};
</script>

<!-- style custom -->
<style scoped></style>
