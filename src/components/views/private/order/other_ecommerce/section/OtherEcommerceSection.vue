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
								<h2 class="page-title">Tạo đơn trên sàn TMĐT khác</h2>
							</div>
							<div class="tab_container">
								<div class="tab_content">
									<h3>Thêm thông tin chi tiết các sản phẩm muốn đặt vào trong bảng và lựa chọn tạo đơn
									</h3>
									<div class="space20"></div>

									<div class="space10"></div>
									<div class="cu-table-responsive">
										<table class="cu-table tbl-cart tbl-list-order">
											<tbody id="abc">
												<tr class="header-cart-table">
													<!-- <td width="10%">
														Ảnh sản phẩm
													</td> -->
													<td width="10%">Link sản phẩm</td>
													<td width="15%">
														Tên sản phẩm
													</td>
													<td width="15%">
														Giá sản phẩm
													</td>
													<td width="10%">
														Màu sắc kích thước
													</td>
													<td width="10%">
														Số lượng
													</td>
													<td width="15%">Ghi chú thêm</td>
													<td width="7%">
														Thao tác
													</td>
												</tr>
												<tr>
													<!-- <td>
                                                        <input @keyup.enter.prevent="addItem" v-model="tmpItem.itemImage" class="form-control" type="text" placeholder="Link ảnh SP">
													</td> -->
													<td>
														<input @keyup.enter.prevent="addItem" v-model="tmpItem.itemLink"
															class="form-control" type="text" placeholder="Link SP">
													</td>
													<td>
														<input @keyup.enter.prevent="addItem"
															v-model="tmpItem.itemTitle" class="form-control" type="text"
															placeholder="Nhập tên SP">
													</td>
													<td>
														<input @keyup.enter.prevent="addItem"
															v-model="tmpItem.itemPrice" class="form-control" type="text"
															placeholder="Nhập giá SP">
													</td>
													<td>
														<input @keyup.enter.prevent="addItem" v-model="tmpItem.color"
															class="form-control" type="text"
															placeholder="Màu sắc, kích thước">
													</td>
													<td>
														<input @keyup.enter.prevent="addItem"
															v-model="tmpItem.numberItem" class="form-control"
															type="text" placeholder="Số lượng SP">
													</td>
													<td>
														<input @keyup.enter.prevent="addItem"
															v-model="tmpItem.description" class="form-control"
															type="text" placeholder="Ghi chú cho SP">
													</td>
													<td>
														<a class="bg_green" @click="addItem" title="Thêm">Thêm</a>
													</td>
												</tr>
												<tr v-for="(detail, index) in details">
													<!-- <td>
                                                        <img style="width: 100px; height: 100px;" :src="detail.itemImage">
                                                    </td> -->
													<td>
														<a target="_blank" :href="detail.itemLink">Liên kết tới SP</a>
													</td>
													<td>
														<span class="blue">{{ detail.itemTitle }}</span>
													</td>
													<td>
														<span class="green">
															{{ CommonUtils.formatNumber(detail.itemPrice) }} NDT
														</span>
													</td>
													<td>
														<span class="green">{{ detail.color }}</span>
													</td>
													<td>
														<span class="red bold">{{ detail.numberItem }}</span>
													</td>
													<td>
														<span class="small">{{ detail.description }}</span>
													</td>
													<td>
														<a target="_blank" class="bg_yellow_real"
															@click="removeItem(index)" title="Xoá">Xoá</a>
													</td>
												</tr>
											</tbody>
										</table>
										<div
											style="display: flex; flex-direction: row; text-align: center; align-items: center;">
											<span class="bold">Địa chỉ nhận hàng:</span>&nbsp;&nbsp;<input
												style="width: 50%;" @keyup.enter.prevent="addItem" v-model="address"
												class="form-control" type="text" placeholder="Địa chỉ nhận hàng">
											<br><br><br>
										</div>
										<a target="_blank" class="bg_yellow" @click="submit" title="Gửi đơn hàng">Gửi
											đơn hàng</a>
										<hr>
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
	name: "OtherEcommerceSection",
	data() {
		return {
			details: [],

			address: '',

			tmpItem: {
				itemImage: '',
				itemLink: '',
				itemTitle: '',
				itemPrice: '',
				color: '',
				size: '',
				numberItem: '',
				description: '',
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
			if (!this.tmpItem.itemLink) {
				this.$toast.error(`Bạn chưa điền Link SP`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			if (!this.tmpItem.itemTitle) {
				this.$toast.error(`Bạn chưa điền Tên sản phẩm`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			if (!this.tmpItem.itemPrice) {
				this.$toast.error(`Bạn chưa điền Giá sản phẩm`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			if (!this.tmpItem.color) {
				this.$toast.error(`Bạn chưa điền Màu sắc, kích thước`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			if (!this.tmpItem.numberItem) {
				this.$toast.error(`Bạn chưa điền số lượng SP`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			if (!this.address) {
				this.$toast.error(`Bạn chưa điền địa chỉ nhận hàng`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}

			this.details.push({
				// itemImage: this.tmpItem.itemImage,
				itemLink: this.tmpItem.itemLink,
				itemTitle: this.tmpItem.itemTitle,
				itemPrice: this.tmpItem.itemPrice,
				color: this.tmpItem.color,
				size: this.tmpItem.size,
				numberItem: this.tmpItem.numberItem,
				description: this.tmpItem.description,
			})
			this.tmpItem = {
				// itemImage: '',
				itemLink: '',
				itemTitle: '',
				itemPrice: '',
				color: '',
				size: '',
				numberItem: '',
				description: '',
			};
		},
		removeItem(index) {
			this.details.splice(index, 1);
		},
		async submit() {
			const loader = this.$loading.show();
			const payload = {
				address: this.address,
				orderItemDTOS: this.details,
			}
			const res = await ApiCaller.post(ROUTES.Order.createOrderOtherEcommerce, payload);
			loader.hide();
			if (res.status == 200) {
				this.$toast.success(`Đặt hàng thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				this.cartStore.setOrderedCart(res.data)
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
			this.$router.push({ path: "/manage/cart/step3" });
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
