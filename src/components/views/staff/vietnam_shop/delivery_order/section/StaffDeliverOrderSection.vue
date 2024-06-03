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
						<input v-model="query" type="text" name="search_text" required=""
							placeholder="Nhập điều kiện" />
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
					<form v-if="packages.length > 0" action="" class="ajaxFormdelivery" method="POST">
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
										<td v-if="CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN">Check đã giao
										</td>
										<td>In phiếu giao</td>
									</tr>
									<tr v-for="(pkg, index) in packages">
										<template v-if="!pkg.isShip">
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
											<td class="align-center">
												<input type="checkbox" :disabled="true" :checked="pkg.status == 5" />
											</td>
											<td class="align-center">
												<input type="checkbox" :disabled="true" :checked="pkg.status == 5 ||
													pkg.status == 6
													" />
											</td>
											<td class="align-center">
												<input type="checkbox" :disabled="true" :checked="pkg.isPay" />
											</td>
											<td class="align-center"
												v-if="CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN">
												<input type="checkbox" :checked="pkg.isShip" @change="handleCheckShip(
													pkg,
													$event
												)" />
											</td>
											<td class="align-center">
												<input type="checkbox" @change="
													handlePrintOrder(
														pkg,
														$event
													)
													" :disabled="pkg.isPrintOrder == true
														" :checked="pkg.isPrintOrder" />
											</td>
										</template>
									</tr>
								</tbody>
							</table>
						</div>
						<input type="button" name="" value="Lưu" @click="saveForm" />
						<div class="ajax_response alert dismissable"></div>
					</form>
				</div>
			</div>

			<div class="print_order" id="section-to-print">
				<div class="float-right exclude">
					<a class="button-link" href="javascript:if(window.print)window.print()">IN PHIẾU GIAO HÀNG</a>
				</div>
				<div class="item_1 clearfix">
					<div class="images">
						<img height="70px;" src="/src/assets/icons/logo.png" style="margin-top: -10px; width: 155px" />
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
								032.687.6636</span>
						</p>
					</div>
					<div class="date">
						<div>
							Số:
							{{
								deliverOrderRes.code
									? deliverOrderRes.code
									: "......................"
							}}
						</div>
						<div>Ngày 11 tháng 05 năm 2024</div>
					</div>
				</div>
				<div class="item_2">
					<div><b>Khách hàng: </b> {{ selectedAddr ? selectedAddr.name : '' }}</div>
					<div><b>Địa chỉ: </b> {{ selectedAddr ? selectedAddr.address : '' }}</div>
					<div><b>Điện thoại: </b> {{ selectedAddr ? selectedAddr.phoneNumber : '' }}</div>
				</div>
				<div class="item_3" id="table_print_container">
					<div class="gridtable">
						<table id="print_table_header">
							<tbody>
								<tr>
									<td width="50%">Mã vận đơn</td>
									<td width="50%">Số lượng</td>
								</tr>
								<tr v-for="(pkg, index) in selectedLst">
									<td width="50%" style="text-align: center;">{{ pkg.shipCode }}</td>
									<td width="50%" style="text-align: center;">1</td>
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

			pendingPkgLst: [],

			selectedLst: new Set(),
			selectedAddr: null,

			deliverOrderRes: {},
		};
	},
	mounted() { },
	methods: {
		async search() {
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
			loader.hide();
			if (res.status != 200) {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			this.packages = res.data;
			this.packages.forEach($ => {
				$.isPrintOrder = false;
				this.pendingPkgLst.push(Object.assign({}, $));
			})
		},
		async saveForm() {

			const loader = this.$loading.show();
			this.pendingPkgLst = this.pendingPkgLst.filter($ => $.isShip != null || $.isPrintOrder != null);
			const payload = {
				packages: [...this.pendingPkgLst],
			};
			const res = await ApiCaller.post(
				ROUTES.DeliverOrder.create,
				payload
			);
			this.deliverOrderRes = res.data;
			if (res.status == 200) {
				this.$toast.success(
					`Tạo phiếu giao hàng với mã ${this.deliverOrderRes.code} thành công`,
					{
						title: "Thông báo",
						position: "top-right",
						autoHideDelay: 7000,
					}
				);
				let ids = this.pendingPkgLst.map($ => $.id);
				this.packages.forEach($ => {
					if (ids.includes($.id)) $.isPrintOrder = true;
				})
				this.pendingPkgLst = [];
				this.packages.forEach($ => {
					this.pendingPkgLst.push(Object.assign({}, $));
					let removeIds = this.deliverOrderRes.packages.map($ => $.orderCode);
					this.pendingPkgLst = this.pendingPkgLst.filter($ => !removeIds.includes($.orderCode))
				})
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
			}
			loader.hide();
		},
		handlePrintOrder(pkg, event) {
			const value = event.target.checked;
			if (value) {
				if (this.selectedAddr == null) {
					this.selectedAddr = pkg.order.address;
					this.pendingPkgLst
						.filter($ => $.id == pkg.id)
						.forEach($ => $.isPrintOrder = value);
					this.selectedLst.add(pkg);
				} else {
					debugger
					if (pkg.order.address.id != this.selectedAddr.id) {
						this.$toast.error(`Địa chỉ nhận của đơn chứa mã vận đơn ${pkg.shipCode} không trùng với địa chỉ đã lựa chọn`, {
							title: 'Thông báo',
							position: 'top-right',
							autoHideDelay: 7000,
						})
						event.target.checked = !value;
						return;
					} else {
						this.pendingPkgLst
							.filter($ => $.id == pkg.id)
							.forEach($ => $.isPrintOrder = value);
						this.selectedLst.add(pkg);
					}
				}
				debugger
			} else {
				if (!this.pendingPkgLst.filter($ => $.id == pkg.id)[0].isShip) {
					this.selectedLst.delete(pkg);
					if (this.selectedLst.size == 0)
						this.selectedAddr = null;
				}
			}

		},
		handleCheckShip(pkg, event) {
			const value = event.target.checked;
			this.pendingPkgLst
				.filter($ => $.id == pkg.id)
				.forEach($ => $.isShip = value);

			if (value) {
				this.selectedLst.add(pkg);
			} else {

				if (!this.pendingPkgLst.filter($ => $.id == pkg.id)[0].isPrintOrder)
					this.selectedLst.delete(pkg);
			}
		},
	},
};
</script>

<!-- style custom -->
<style scoped></style>
