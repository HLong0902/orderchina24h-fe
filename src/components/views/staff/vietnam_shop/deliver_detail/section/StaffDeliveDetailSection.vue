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
		<div class="delivery clearfix">
			<div id="section-non-print-2">
				<div class="check">
					<h3 class="uppercase">Mã giao hàng&nbsp;&nbsp;
						<span style="font-size: 24px;" class="bold blue">
							{{
								deliverOrder?.code
							}}
						</span>
					</h3>
					<br>
					<form>
						<span>Hình thức giao</span> &nbsp;
						<select>
							<option v-for="(item, idx) in deliveryMethod">
								{{ item.name }}
							</option>
						</select>
						&nbsp;&nbsp;
						<span>Mã vận đơn</span>&nbsp;
						<input type="text">
					</form>
					<br>
					<br>
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
										<td class="align-center">
											<input type="checkbox" :disabled="true" :checked="pkg.status == 5 ||
												pkg.status == 7
												" />
										</td>
										<td class="align-center">
											<input type="checkbox" :disabled="true" :checked="pkg.status == 5 ||
												pkg.status == 6 ||
												pkg.status == 7
												" />
										</td>
										<td class="align-center">
											<input type="checkbox" :disabled="true" :checked="pkg.status >= 7" />
										</td>
										<td class="align-center">
											<input type="checkbox" :checked="pkg.isShip" @change="
												handleCheckShip(pkg, $event)
												" :disabled="pkg.isShip == true" />
										</td>
										<td class="align-center">
											<input type="checkbox" @change="
												handlePrintOrder(
													pkg,
													$event
												)
												" :disabled="pkg.isPrintOrder == true" :checked="pkg.isPrintOrder" />
										</td>
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
								deliverOrder.code
									? deliverOrder.code
									: "......................"
							}}
						</div>
						<div>Ngày 11 tháng 05 năm 2024</div>
					</div>
				</div>
				<div class="item_2">
					<div><b>Khách hàng: </b> {{ deliverOrder.address ? deliverOrder.address.name : '' }}</div>
					<div><b>Địa chỉ: </b> {{ deliverOrder.address ? deliverOrder.address.address : '' }}</div>
					<div><b>Điện thoại: </b> {{ deliverOrder.address ? deliverOrder.address.phoneNumber : '' }}</div>
				</div>
				<div class="item_3" id="table_print_container">
					<div class="gridtable">
						<table id="print_table_header">
							<tbody>
								<tr>
									<td width="50%">Mã vận đơn</td>
									<td width="50%">Số lượng</td>
								</tr>
								<tr v-for="(pkg, index) in packages">
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
	name: "StaffDeliveDetailSection",
	data() {
		return {
			critetia: "username",
			query: "",
			packages: [],
			userInfo: {},
			address: {},

			deliveryMethod: [],

			deliverOrder: {},

			pendingPkgLst: [],

			deliverOrderRes: {},

			deliverId: this.$route.params.deliverId,
		};
	},
	mounted() {
		this.getDeliveryMethods();
		this.search();
	},
	methods: {
		async search() {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(
				ROUTES.DeliverOrder.getDetail(this.deliverId)
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
			this.deliverOrder = res.data;
			this.packages = this.deliverOrder.packages;
			this.packages.forEach(($) => {
				this.pendingPkgLst.push(Object.assign({}, $));
			});
		},
		async getDeliveryMethods() {
			const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.DELIVERY_METHOD);
			const res = await ApiCaller.post(link);
			this.deliveryMethod = res.data;
		},
		async saveForm() {
			;
			const loader = this.$loading.show();
			this.pendingPkgLst = this.pendingPkgLst.filter(
				($) => $.isShip != null || $.isPrintOrder != null
			);
			const payload = {
				packages: [...this.pendingPkgLst],
			};
			const res = await ApiCaller.post(
				ROUTES.DeliverOrder.update,
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
				let ids = this.pendingPkgLst.map(($) => $.id);
				this.packages.forEach(($) => {
					if (ids.includes($.id)) $.isPrintOrder = true;
				});
				this.pendingPkgLst = [];
				this.packages.forEach(($) => {
					this.pendingPkgLst.push(Object.assign({}, $));
					let removeIds = this.deliverOrderRes.packages.map(
						($) => $.orderCode
					);
					this.pendingPkgLst = this.pendingPkgLst.filter(
						($) => !removeIds.includes($.orderCode)
					);
				});
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
			this.pendingPkgLst
				.filter(($) => $.id == pkg.id)
				.forEach(($) => ($.isPrintOrder = value));
		},
		handleCheckShip(pkg, event) {
			const value = event.target.checked;
			this.pendingPkgLst
				.filter(($) => $.id == pkg.id)
				.forEach(($) => ($.isShip = value));
		},
	},
};
</script>

<!-- style custom -->
<style scoped></style>
