<script setup>
import ROUTES from "../../../../../../constants/routeDefine";
import ApiCaller from "../../../../../utils/ApiCaller";
import CONSTANT from "../../../../../../constants/constants";
import CommonUtils from "../../../../../utils/CommonUtils";
import { useCommonStore } from "../../../../../../store/CommonStore";
</script>

<!-- template section -->
<template>
	<div id="content">
		<div class="container">
			<main class="main" role="main">
				<div class="row main-row">
					<div class="col-sm-9">
						<div class="cart-by-page">
							<div class="titles">
								<h2 class="page-title">Thêm đơn ký gửi</h2>
							</div>
							<div class="tab_container">
								<div class="tab_content">
									<h3>Thêm các mã vận đơn vào trong bảng và lựa chọn tạo đơn ký gửi</h3>
									<div class="space20"></div>

									<div class="space10"></div>
									<div class="cu-table-responsive">
										<table class="cu-table tbl-cart tbl-list-order">
											<tbody id="abc">
												<tr class="header-cart-table">
													<td width="5%">
														<input @change="handleCheckAll"
															:checked="packages.every($ => $.isCheck)" type="checkbox">
													</td>
													<td width="5%">STT</td>
													<td width="15%">
														Vận đơn(*)
													</td>
													<td width="15%">
														Tên người nhận(*)
													</td>
													<td width="25%">
														Chú ý, mô tả mặt hàng
													</td>
													<td width="15%">
														Đóng gỗ (nếu có) <input class="isCheckBox"
															v-model="order.isWoodworkingFee" type="checkbox" value=""
															required="">
													</td>
													<td width="10%"></td>
												</tr>
												<tr>
													<td width="5%">
													</td>
													<td width="5%"></td>
													<td width="15%">
														<input placeholder="Mã vận đơn" v-model="tmpItem.shipCode"
															@keyup.enter.prevent="addItem" class="form-control"
															type="text" value="" required="">
													</td>
													<td width="15%">
														<input placeholder="Nhập tên người nhận"
															v-model="tmpItem.receiver" @keyup.enter.prevent="addItem"
															class="form-control" type="text" value="" required="">
													</td>
													<td width="25%">
														<textarea rows="1" v-model="tmpItem.note" maxlength="300"
															@keyup.enter.prevent="addItem" name="payment_note"
															class="inputAccount form-control"></textarea>
													</td>
													<td width="15%">
													</td>
													<td width="10%">
														<a class="bg_green" @click="addItem" title="Thêm">Thêm</a>
													</td>
												</tr>
												<tr v-for="(pkg, index) in packages">
													<td width="5%"><input @change="handleCheckItem($event, index)"
															v-model="pkg.isCheck" type="checkbox"></td>
													<td>
														<span class="small">{{ index + 1 }}</span>
													</td>
													<td>
														<span class="small">{{ pkg.shipCode }}</span>
													</td>
													<td>
														<span class="bg_green small">
															{{ pkg.receiver }}
														</span>
													</td>
													<td>
														<span class="green">{{ pkg.note }}</span>
													</td>
													<td>
														<span class="small"></span>
													</td>
													<td>
														<a target="_blank" class="bg_yellow_real"
															@click="removeItem(index)" title="Xoá">Xoá</a>
													</td>
												</tr>
											</tbody>
										</table>
										<a target="_blank" class="bg_yellow" @click="submit" title="Gửi đơn hàng">Gửi
											đơn hàng</a>
										<hr>
										<div style="display: flex; flex-direction: row;" class="col-md-12">
											<span style="display: flex; flex-direction: row;" class="col-md-12">
												<b>Địa chỉ giao hàng</b>
												<input v-model="order.address" class="form-control" type="text" value=""
													required="">
											</span>
										</div>
										<br><br>
										<br>
										<div style="display: flex; flex-direction: row;" class="col-md-12">
											<b class="col-md-2">Bảo hiểm</b>
											<div class="col-md-10">
												<span class="col-md-2">
													<b>Không đóng</b>
													&nbsp;
													<input @change="handleUncheck" :checked="!premium" type="checkbox"
														value="" required="">
												</span>
												<span class="col-md-2">
													<b>5% giá trị hàng</b>
													&nbsp;
													<input @change="handleCheck5" v-model="check5" type="checkbox"
														:value="5" required="">
												</span>
												<span class="col-md-2">
													<b>10% giá trị hàng</b>
													&nbsp;
													<input @change="handleCheck10" v-model="check10" type="checkbox"
														:value="10" required="">
												</span>
											</div>
										</div>
										<div v-if="premium && (check10 || check5)" style="display: flex;"
											class="col-md-4">
											<b>Nhập giá trị hàng</b>
											<input v-model="order.priceProduct" class="form-control" type="text"
												value="" required="">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "DepositOrderSection",
	data() {
		return {
			packages: [],

			check5: false,
			check10: false,

			premium: false,

			tmpItem: {
				shipCode: '',
				receiver: '',
				note: '',
			},

			order: {
				premium: '', 					// phí bảo hiểm
				priceProduct: '', 				// giá trị hàng
				isWoodworkingFee: false, 			// đóng gỗ
				packages: '', 				 	// thông tin kiện hàng
				address: '', 				 	// địa chỉ nhận hàng
				userReceiveName: '', 			// tên người nhận
			}
		};
	},
	mounted() { },
	methods: {
		addItem() {
			if (!this.tmpItem.shipCode || this.tmpItem.shipCode == '') {
				this.$toast.error(`Mã vận đơn là bắt buộc`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}

			if (!this.tmpItem.receiver || this.tmpItem.receiver == '') {
				this.$toast.error(`Tên người nhận là bắt buộc`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}

			this.packages.push({
				shipCode: this.tmpItem.shipCode,
				note: this.tmpItem.note,
				receiver: this.tmpItem.receiver,
				isCheck: false,
			})
			this.tmpItem = {
				shipCode: '',
				receiver: '',
				note: '',
			};
		},
		removeItem(index) {
			this.packages.splice(index, 1);
		},
		handleCheckItem(event, idx) {
			const value = event.target.checked;
			this.packages[idx].isCheck = value;
		},
		handleCheckAll(event) {
			const value = event.target.checked;
			this.packages.forEach($ => $.isCheck = value);
		},
		handleCheck5(event) {
			const value = event.target.checked;
			this.check5 = value;
			this.check10 = false;
			if (value) {
				this.order.premium = 5;
				this.premium = true;
			} else {
				this.premium = false;
			}
		},
		handleCheck10(event) {
			const value = event.target.checked;
			this.check10 = value;
			this.check5 = false;
			if (value) {
				this.order.premium = 10;
				this.premium = true;
			} else {
				this.premium = false;
			}
		},
		handleUncheck(event) {

			const value = event.target.checked;
			if (value == true) {
				this.check5 = false;
				this.check10 = false;
				this.premium = false;
			} else {
				this.premium = true;
				this.check5 = true;
			}
		},
		async submit() {
			let filter_pkg = this.packages.filter($ => $.isCheck);
			if (filter_pkg.length == 0) {
				this.$toast.error(`Bạn chưa thêm mã vận đơn nào`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			if (this.premium && (this.order.priceProduct == '' || this.order.priceProduct == 0)) {
				this.$toast.error(`Bạn chưa nhập giá trị đơn hàng`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			if (this.order.address == '' || this.order.address == null || this.order.address == undefined) {
				this.$toast.error(`Bạn chưa nhập địa chỉ nhận hàng`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			const loader = this.$loading.show();
			const payload = this.order;
			payload.packages = filter_pkg;
			const res = await ApiCaller.post(ROUTES.Order.createDepositOrder, payload);
			loader.hide();
			if (res.status == 200) {
				this.$toast.success(`Tạo đơn ký gửi thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				this.order = {
					premium: '', 					// phí bảo hiểm
					priceProduct: '', 				// giá trị hàng
					isWoodworkingFee: false, 			// đóng gỗ
					packages: '', 				 	// thông tin kiện hàng
					address: '', 				 	// địa chỉ nhận hàng
					userReceiveName: '', 			// tên người nhận
				}
				this.packages = [];
				this.check10 = false;
				this.check5 = false;
				this.premium = false;
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
		}
	},
};
</script>

<!-- style custom -->
<style scoped>
@import "../../../../../../assets/styles/bootstrap.min.css";
@import "../../../../../../assets/styles/w2-ui.min.css";
@import "../../../../../../assets/styles/private-styles.css";

a:hover {
	color: #337ab7 !important;
	text-decoration: none;
	/* Removes underline */
	cursor: pointer;
}
</style>
