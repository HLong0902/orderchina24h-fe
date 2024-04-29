<script setup>
import ROUTES from '../../../../../../constants/routeDefine';
import ApiCaller from '../../../../../utils/ApiCaller';
import CONSTANT from '../../../../../../constants/constants';
import CommonUtils from '../../../../../utils/CommonUtils';
import { useCommonStore } from '../../../../../../store/CommonStore';
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
								<h2 class="page-title">
									Danh sách đơn hàng
								</h2>
							</div>

							<div class="filter">
								<form class="form-horizontal" method="get">
									Mã đơn hàng : <input class="custom_input" type="text" name="filter_id" value="">
									Từ ngày : <input class="pickdate_from custom_input hasDatepicker" type="date"
										id="datepicker_from" name="filter_startdate_create_date" value="">
									Đến ngày : <input class="pickdate_to custom_input hasDatepicker" type="date"
										id="datepicker_to" name="filter_enddate_create_date" value="">
									<br>
									<div class="space10"></div>
									Kho nhận hàng :
									<select name="filter_store" class="custom_input">
										<option value="">Chọn kho</option>
										<option v-for="(item, index) in getLocation()" :key="index" :value="index">
											{{ item }}
										</option>

									</select>
									Trạng thái đơn hàng :
									<select name="filter_status" class="custom_input">
										<option value="">Tất cả</option>
										<option v-for="status in Object.values(CONSTANT.ORDER_STATUS)" :value="status">
											{{ promptStatusByValue(status) }}
										</option>
									</select>

									<input class="button custom_flat_button" type="submit" value="Lọc">
								</form>
								<div class="space10"></div>
							</div>
							<div>
								<div class="cu-table-responsive size_medium">
									<div class="order_row row_header">
										<div class="col-md-4">
											<p>Thông tin đơn hàng</p>
										</div>
										<div class="col-md-4">
											<p>Chi tiết</p>
										</div>
										<div class="col-md-4">
											<p>Thanh toán</p>
										</div>
									</div>
									<div v-for="(order, index) in orderList" class="order_row" :class="index % 2 == 0 ? 'even' : 'odd'">
										<div class="col-md-4">
											<div>
												<img class="preview_image pull-left"
													:src="order.orderChina.imageUrl">
												<a target="_blank"
													:href="order.orderChina.itemLink"
													class="blue"><strong><span
															class="big">{{ order.orderChina.id }}</span></strong></a>
												<p class="label_order_status hasTooltip tooltipstered"
													tooltip-content="#tipOrderStatusHistory276779"><strong><span><span
																:class="promptClassByStatusValue(order.orderChina.status)">{{ promptStatusByValue(order.orderChina.status) }}</span> <fa
																icon="question-circle"></fa></span></strong></p>
												<div id="tipOrderStatusHistory276779" class="tipContent hidden">
													<div style="width:300px">
														<table class="cu-table borderless">
															<tbody>
																<tr>
																	<td><strong>Đã gửi đơn</strong></td>
																	<td class="right"><strong>2024-04-28
																			20:12:14</strong></td>
																</tr>
																<tr>
																	<td><strong>Đã đặt cọc</strong></td>
																	<td class="right"><strong></strong></td>
																</tr>
																<tr>
																	<td><strong>Đã mua hàng</strong></td>
																	<td class="right"><strong></strong></td>
																</tr>
																<tr>
																	<td><strong>Hàng đã về kho TQ</strong></td>
																	<td class="right"><strong></strong></td>
																</tr>
																<tr>
																	<td><strong>Hàng đã về kho VN</strong></td>
																	<td class="right"><strong></strong></td>
																</tr>
																<tr>
																	<td><strong>Kết thúc</strong></td>
																	<td class="right"><strong></strong></td>
																</tr>
																<tr>
																	<td><strong>Hủy</strong></td>
																	<td class="right"><strong></strong></td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
											<table class="cu-table borderless no_margin">

												<tbody>
													<tr>
														<td>Kho hàng</td>
														<td><span class="bold green">Kho {{promptLocationByInventoryId(order.address.inventoryId)}}</span> <i
																class="textTooltip fa fa-question-circle tooltipstered"></i>
														</td>
													</tr>

													<tr>
														<td>Giá vốn</td>
														<td>
															<strong>{{ CommonUtils.formatNumber(order.orderChina.totalAmount) }} đ <i
																	tooltip-content="#tipOrderPriceContent276779"
																	class="hasTooltip fa fa-question-circle tooltipstered"></i></strong>
															<div id="tipOrderPriceContent276779"
																class="tipContent hidden">
																<div style="width:300px">
																	<table class="cu-table borderless">
																		<tbody>
																			<tr>
																				<td>Tiền hàng</td>
																				<td class="right"><strong><span
																							class="sl_buy_fee">{{ CommonUtils.formatNumber(order.orderChina.totalAmount) }}</span></strong>
																					đ</td>
																			</tr>
																			<tr>
																				<td>VC Nội địa TQ</td>
																				<td class="right"><strong><span
																							class="sl_buy_fee">{{ CommonUtils.formatNumber(order.orderChina.domesticFeesChina) }}</span></strong>
																					đ</td>
																			</tr>
																		</tbody>
																	</table>
																</div>
															</div>

														</td>
													</tr>
													<tr>
														<td>Phí mua hàng</td>
														<td><strong>{{ CommonUtils.formatNumber(commonStore.charging_fee) }} đ</strong> </td>
													</tr>
													<tr>
														<td>Phí cố định</td>
														<td><strong>0 đ</strong></td>
													</tr>
												</tbody>
											</table>

										</div>
										<div class="col-md-4">
											<table class="cu-table borderless no_margin">
												<tbody>
													<tr>
														<td>Cân nặng</td>
														<td><strong>0 </strong></td>
													</tr>

													<tr>
														<td>Phí VC QT</td>
														<td><strong>Chưa xác định <i
																	class="textTooltip fa fa-question-circle tooltipstered"></i></strong>
														</td>
													</tr>
													<tr>
														<td>Phí khác</td>
														<td><strong>0 đ <i
																	class="textTooltip fa fa-question-circle tooltipstered"></i></strong>
														</td>
													</tr>
													<tr>
														<td>Đóng thùng gỗ</td>
														<td><strong>{{ order.orderChina.woodWorkingFees == null ? '-' : CommonUtils.formatNumber(order.orderChina.woodWorkingFees) }}</strong></td>
													</tr>
													<tr>
														<td>Phí kiểm đếm</td>
														<td><strong>{{ order.orderChina.woodWorkingFees == null ? '-' : CommonUtils.formatNumber(order.orderChina.tallyFee) }}</strong></td>
													</tr>
													<!--?
                                        if($globalSetings['is_enabel_cpn'] == 1)
                                        {
                                        ?-->
													<!--?
                                        }
                                        ?-->
													<tr>
														<td>SL Đặt / Mua / Kiểm</td>
														<td><strong>{{ order.orderChina.numberItem }}/{{ order.orderChina.numberItem }}/0 </strong></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="col-md-4">
											<table class="cu-table borderless no_margin">
												<tbody>
													<tr>
														<td>Tổng tiền</td>
														<td><strong><span class="red">{{ CommonUtils.formatNumber(order.orderChina.totalAmount + commonStore.charging_fee) }}</span> đ</strong></td>
													</tr>
													<tr>
														<td>Đã thanh toán</td>
														<td><strong><span class="green">{{ CommonUtils.formatNumber(order.orderChina.paid) }}</span> đ</strong></td>
													</tr>
													<tr>
														<td>Cần thanh toán</td>
														<td><strong><span class="blue big">{{ CommonUtils.formatNumber(order.orderChina.notPaid + commonStore.charging_fee) }}</span> đ</strong>
														</td>
													</tr>
													<tr>
														<td colspan="2">
															<a class="btn" @click="viewDetail(order.orderChina.id)">Xem chi tiết</a>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>

								<div class="pag">
								</div>
								<p><strong>Total: <span class="green">{{ orderList.length }}</span> (Đơn hàng)</strong></p>
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
	name: 'ListSection',
	data() {
		return {
			listInventories: [],
			orderList: [],

			commonStore: useCommonStore(),
		}
	},
	mounted() {
		this.getListInventories();
		this.getList();
	},
	methods: {
		async getListInventories() {
			let loader = this.$loading.show();
			const res = await ApiCaller.get(ROUTES.Inventory.findAll);
			this.listInventories = res.data;
			loader.hide();
		},
		getLocation() {
			return new Set(this.listInventories.map(warehouse => warehouse.location));
		},
		promptStatusByValue(status) {
			switch (status) {
				case 1:
					return 'Đang chờ cọc';
				case 2:
					return 'Đã đặt cọc';
				case 3:
					return 'Đã mua hàng';
				case 4:
					return 'Hàng đã về kho TQ';
				case 5:
					return 'Hàng đã về kho VN';
				case 6:
					return 'Sẵn sàng giao hàng';
				case 7:
					return 'Chờ xử lý khiếu nại';
				case 8:
					return 'Đã kết thúc';
				case 9:
					return 'Đã huỷ';
			}
		},
		promptClassByStatusValue(status) {
			switch (status) {
				case 1:
					return '.daduyet';
				case 2:
					return '.dathanhtoan';
				case 3:
					return '.damuahang';
				case 4:
					return '.hangdave';
				case 5:
					return '.hangdave';
				case 6:
					return '.hangdave';
				case 7:
					return '.chokhieunai';
				case 8:
					return '.daketthuc';
				case 9:
					return '.dahuy';
			}
		},
		promptLocationByInventoryId(id) {
			return this.listInventories[id].location;
		},
		async getList() {
            this.selectedOrder = new Map();
            let loader = this.$loading.show();
            const params = {
                pageIndex: 1,
                pageSize: 999999999,
            }
            const res = await ApiCaller.get(ROUTES.Order.searchOrder, params)
            loader.hide();
            this.orderList = res.data.data;
            this.orderList.forEach(order => {
                order.orderChina.isCheck = false;
            })
        },
		viewDetail(id) {
			// this.$router.push({ name: 'OrderDetailPage', params: { orderId: id }});
			window.open(this.$router.resolve({ name: 'OrderDetailPage', params: { orderId: id }}).href, '_blank');
		}
	}
}
</script>

<!-- style custom -->
<style scoped>
@import '../../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../../assets/styles/private-styles.css';
</style>