<script setup>
import CONSTANT from "../../../../../constants/constants";
import ROUTES from "../../../../../constants/routeDefine";
import { useCommonStore } from "../../../../../store/CommonStore";
import ApiCaller from "../../../../utils/ApiCaller";
import CommonUtils from "../../../../utils/CommonUtils";
</script>

<!-- template section -->
<template>
	<!-- <center>
		<p class="red big">
			Chú ý : Chỉ kiểm đểm số lượng khi phí dịch vụ &lt;= 2%
		</p>
	</center> -->
	<div class="order clearfix" v-if="isDataReady">
		<div class="bg_white box_info" style="display: flex">
			<div class="col-md-6" style="padding: 15px !important">
				<h3 class="subtitle">
					<fa icon="newspaper" aria-hidden="true"></fa> Thông tin đơn hàng
				</h3>
				<div class="cu-row">
					<div class="col-md-12">
						<table class="table borderless no_margin">
							<tbody>
								<tr>
									<td><strong>Đơn hàng</strong></td>
									<td>
										<h3 class="blue">
											{{ order.orderChina.orderCode }}
										</h3>
									</td>
								</tr>
								<tr class="">
									<td>
										<strong>Tư vấn viên / Khách hàng</strong>
									</td>
									<td>
										<span class="black big">{{ getStaffById(order.orderChina.staffId) }}</span>
									</td>
								</tr>
								<tr>
									<td colspan="2">
										<hr />
									</td>
								</tr>

								<tr>
									<td><strong>Đóng gỗ</strong></td>
									<td>
										<input @click="toggleWoodWork" style="width: 20px; height: 20px" type="checkbox"
											name="is_wood_pack" v-model="woodWorkEnable" />
									</td>
								</tr>
								<tr>
									<td><strong>Kiểm đếm</strong></td>
									<td>
										<input @click="toggleTally" style="width: 20px; height: 20px" type="checkbox"
											name="is_order_checked" v-model="tallyEnable" />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div class="cu-row" style="display: flex">
					<hr />
					<div class="col-md-6">
						<table class="table borderless no_margin">
							<tbody>
								<tr>
									<td><strong>Ngày gửi đơn</strong></td>
									<td>
										<span class="bold">{{
											order.orderChina.createDate
										}}</span>
									</td>
								</tr>
								<tr>
									<td><strong>Trạng thái</strong></td>
									<td>
										<strong class="big"><span :class="promptClassByStatusValue(
											order.orderChina.status
										)
											">{{
												CommonUtils.promptOrderStatusNameByValueAdmin(
													order.orderChina.status
												)
											}}</span>&nbsp;
											<fa id="tooltip-target-1" icon="question-circle"></fa>
											<b-tooltip style="min-width: 300px" placement="top" variant="secondary"
												target="tooltip-target-1" triggers="hover">
												<div style="
														font-size: 14px;
														font-weight: 400;
														margin: 0;
														padding: 0;
													">
													<table>
														<tbody>
															<tr>
																<td style="
																		padding: 5px;
																		text-align: left;
																	">
																	Đã gửi đơn
																</td>
																<td style="
																		padding: 5px;
																		text-align: right;
																	">
																	{{
																		order
																			? order
																				.orderChina
																				.createDate
																			: "-"
																	}}
																</td>
															</tr>
															<tr>
																<td style="
																		padding: 5px;
																		text-align: left;
																	">
																	Đã đặt cọc
																</td>
																<td style="
																		padding: 5px;
																		text-align: right;
																	">
																	{{
																		order
																			? order
																				.orderChina
																				.depositDate
																			: "-"
																	}}
																</td>
															</tr>
															<tr>
																<td style="
																		padding: 5px;
																		text-align: left;
																	">
																	Đã mua hàng
																</td>
																<td style="
																		padding: 5px;
																		text-align: right;
																	">
																	{{
																		order
																			? order
																				.orderChina
																				.dateOfPurchase
																			: "-"
																	}}
																</td>
															</tr>
															<tr>
																<td style="
																		padding: 5px;
																		text-align: left;
																	">
																	Hàng đã về
																	kho TQ
																</td>
																<td style="
																		padding: 5px;
																		text-align: right;
																	">
																	{{
																		order
																			? order
																				.orderChina
																				.dateOfChinaInventory
																			: "-"
																	}}
																</td>
															</tr>
															<tr>
																<td style="
																		padding: 5px;
																		text-align: left;
																	">
																	Hàng đã về
																	kho VN
																</td>
																<td style="
																		padding: 5px;
																		text-align: right;
																	">
																	{{
																		order
																			? order
																				.orderChina
																				.dateOfVietNamInventory
																			: "-"
																	}}
																</td>
															</tr>
															<tr>
																<td style="
																		padding: 5px;
																		text-align: left;
																	">
																	Kết thúc
																</td>
																<td style="
																		padding: 5px;
																		text-align: right;
																	">
																	{{
																		order
																			? order
																				.orderChina
																				.dateDone
																			: "-"
																	}}
																</td>
															</tr>
															<tr>
																<td style="
																		padding: 5px;
																		text-align: left;
																	">
																	Hủy
																</td>
																<td style="
																		padding: 5px;
																		text-align: right;
																	">
																	{{
																		order
																			? order
																				.orderChina
																				.dateDelete
																			: "-"
																	}}
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</b-tooltip>
										</strong>
										<div id="tipOrderStatusHistory278574" class="tipContent hidden">
											<div style="width: 400px">
												<table class="table borderless">
													<tbody>
														<tr>
															<td>
																<strong>Đã gửi
																	đơn</strong>
															</td>
															<td class="right">
																<strong>2024-05-07
																	14:57:14</strong>
															</td>
														</tr>
														<tr>
															<td>
																<strong>Đã đặt
																	cọc</strong>
															</td>
															<td class="right">
																<strong>
																	-
																</strong>
															</td>
														</tr>
														<tr>
															<td>
																<strong>Đã mua
																	hàng</strong>
															</td>
															<td class="right">
																<strong>
																	-
																</strong>
															</td>
														</tr>
														<tr>
															<td>
																<strong>Hàng đã về
																	kho
																	TQ</strong>
															</td>
															<td class="right">
																<strong>
																	-
																</strong>
															</td>
														</tr>
														<tr>
															<td>
																<strong>Hàng đã về
																	kho
																	VN</strong>
															</td>
															<td class="right">
																<strong>
																	-
																</strong>
															</td>
														</tr>
														<tr>
															<td>
																<strong>Sẵn sàng
																	giao
																	hàng</strong>
															</td>
															<td class="right">
																<strong>
																	-
																</strong>
															</td>
														</tr>
														<tr>
															<td>
																<strong>Kết
																	thúc</strong>
															</td>
															<td class="right">
																<strong>
																	-
																</strong>
															</td>
														</tr>
														<tr>
															<td>
																<strong>Hủy</strong>
															</td>
															<td class="right">
																<strong>
																	-
																</strong>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td><strong>Kho nhận hàng</strong></td>
									<td>
										<strong class="big"><span class="bold green">{{
											promptNameByInventoryId(
												order.address.inventoryId
											)
												}}</span>
										</strong>
										/
										<span class="blue">{{
											promptLocationByInventoryId(
												order.address.inventoryId
											)
										}}</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="col-md-6">
						<table class="table borderless no_margin">
							<tbody>
								<tr>
									<td><strong>Tỷ giá</strong></td>
									<td>
										<strong class="big">1¥ =
											{{
												CommonUtils.formatNumber(
													commonStore.exchange_rate
												)
											}}
										</strong>
										đ
									</td>
								</tr>
								<tr>
									<td><strong>Biểu phí dịch vụ </strong></td>
									<td>
										<strong class="big">{{
											order.orderChina
												.purchaseFeePerSent
										}}
										</strong>
										%
									</td>
								</tr>
								<tr>
									<td>
										<strong>Giá vận chuyển / KG</strong>
									</td>
									<td>
										<strong class="big">
											<span class="red">{{
												CommonUtils.formatNumber(order.orderChina.shippingPrice)
											}}
												/ KG
											</span>
										</strong>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div class="cu-row" style="display: flex">
					<hr />
					<div class="col-md-6">
						<table class="table borderless no_margin">
							<tbody>
								<tr>
									<td><strong>Tiền hàng</strong></td>
									<td>
										<span class="big">{{
											CommonUtils.formatNumber(
												order.orderChina.totalItemMoney
											)
										}}</span>
										đ (<span class="red big">{{
											CommonUtils.formatNumber(
												order.orderChina.totalItemMoneyNDT
											)
										}}</span>
										NDT) /
										<span class="red big">{{
											order.orderChina.totalProduct
										}}
											SP</span>
									</td>
								</tr>

								<tr>
									<td><strong>Phí mua hàng</strong></td>
									<td>
										<span class="big">{{
											CommonUtils.formatNumber(order.orderChina.purchaseFee)
										}}</span>
										đ
										<span></span>
									</td>
								</tr>
								<tr>
									<td><strong>Phí ngoại tệ</strong></td>
									<td>
										<span class="big">
											(<span class="red big">0</span> NDT)
										</span>
									</td>
								</tr>
								<tr v-if="CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN">
									<td><strong>Phí nội địa</strong></td>
									<td>
										<span class="big">{{
											CommonUtils.formatNumber(
												order.orderChina
													.domesticFeesChina
											)
										}}</span>
										đ (<span class="red big">0</span>
										NDT)
									</td>
								</tr>
								<tr>
									<td><strong>Phí VC QT</strong></td>
									<td>
										<span class="big">{{
											order.orderChina
												.shippingPrice
										}}</span>
										đ (<span class="red big">0</span>
										)
									</td>
								</tr>
								<tr>
									<td><strong>Đóng gỗ</strong></td>
									<td>
										{{
											CommonUtils.formatNumber(
												order.orderChina.woodworkingFee
											)
										}}
									</td>
								</tr>
								<tr>
									<td><strong>Phí kiểm đếm</strong></td>
									<td>
										<span class="big">{{
											CommonUtils.formatNumber(
												order.orderChina.tallyFee
											)
										}}</span>
										đ
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="col-md-6">
						<table class="table borderless no_margin">
							<tbody>
								<tr>
									<td><strong>Tổng tiền</strong></td>
									<td>
										<span class="green big">{{
											CommonUtils.formatNumber(
												order.orderChina.totalAmount
											)
										}}</span>
										<span class="small">đ</span>
									</td>
								</tr>
								<tr>
									<td><strong>Đã thanh toán</strong></td>
									<td>
										<span class="big green">{{
											CommonUtils.formatNumber(
												order.orderChina.paid
											)
										}}</span>
										đ
									</td>
								</tr>
								<tr>
									<td><strong>Còn thiếu</strong></td>
									<td>
										<span class="big blue">{{
											CommonUtils.formatNumber(
												order.orderChina.notPaid
											)
										}}</span>
										đ
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="cu-row" v-if="CommonUtils.getRole() == CONSTANT.ROLE.ADMIN">
					<hr />
					<table class="table borderless no_margin">
						<tr>
							<td width="5%">
								<span class="bold">Phí dịch vụ</span>
							</td>
							<td width="5%">
								<span class="bold">Giá vận chuyển</span>
							</td>
							<td width="5%">
								<span class="bold">Tỷ giá</span>
							</td>
							<td width="5%">
								<span class="bold">Trạng thái</span>
							</td>
						</tr>
						<tr>
							<td>
								<span>
									<input v-model="order.orderChina.purchaseFee" @input="formatpurchaseFee" size="6"
										value="0" type="text" />
									&nbsp;
									<a class="button-link" @click="handlepurchaseFee(order.orderChina)">Lưu</a>
								</span>
							</td>
							<td>
								<span>
									<input v-model="order.orderChina.shippingPrice" @input="formatShippingPrice"
										size="12" value="0" type="text" />
									&nbsp;
									<a class="button-link" @click="handleShippingPrice(order.orderChina)">Lưu</a>
								</span>
							</td>
							<td>
								<span>
									<input v-model="order.orderChina.exchangeRate" @input="formatExchangeRage" size="6"
										value="0" type="text" />
									&nbsp;
									<a class="button-link" @click="handleExchangeRate(order.orderChina)">Lưu</a>
								</span>
							</td>
							<td>
								<span>
									<select v-model="order.orderChina.status" style="width: 120px; height: 35px">
										<option v-for="(
												value, key
											) in CONSTANT.ORDER_STATUS" :key="key" :value="value">
											{{
												CommonUtils.promptOrderStatusNameByValueAdmin(
													value
												)
											}}
										</option>
									</select>
									&nbsp;
									<a class="button-link" @click="handleStatus(order.orderChina)">Lưu</a>
								</span>
							</td>
						</tr>
					</table>
				</div>
			</div>

			<div class="col-md-6" style="padding: 15px !important">
				<div class="cu-row">
					<h3 class="subtitle">
						<fa icon="user" aria-hidden="true"></fa> THÔNG TIN KHÁCH
						HÀNG
					</h3>
					<table class="table borderless no_margin">
						<tbody>
							<tr>
								<td><strong>Tài khoản</strong></td>
								<td>
									<strong>{{ customerInfo.username }}</strong>
								</td>
							</tr>
							<tr>
								<td><strong>Tên khách hàng</strong></td>
								<td>
									<strong>{{ customerInfo.fullName }}</strong>
								</td>
							</tr>
							<tr>
								<td><strong>Địa chỉ</strong></td>
								<td>
									<strong>{{ customerInfo.address }}</strong>
								</td>
							</tr>
							<tr>
								<td><strong>Số ĐT</strong></td>
								<td>
									<strong>{{ customerInfo.phone }}</strong>
								</td>
							</tr>
							<tr>
								<td><strong>Tư vấn</strong></td>
								<td><span class="blue">
										{{ getStaffById(order.orderChina.staffId) }}
									</span></td>
							</tr>
							<tr>
								<td colspan="2">
									<h4>
										Số dư hiện tại :
										<span class="bg_green">{{
											CommonUtils.formatNumber(
												info.customerDTO
													.availableBalance
											)
										}}</span>
										vnđ
									</h4>
									<!-- <a target="_blank"
										href="https://ql.hangquangchau24h.vn/transaction/histories?filter_username=nhungchia"
										class="green">Xem lịch sử giao dịch &gt;&gt;</a>
									<div class="customer_credit_owe owe_10860" data-id="10860"></div>
									<a target="_blank"
										href="https://ql.hangquangchau24h.vn/transaction/reportowe?filter_username=nhungchia"
										class="green">Xem chi tiết &gt;&gt;</a> -->
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<!-- các thao tác trên đơn hàng -->
				<div class="cu-row" v-if="CommonUtils.getRole() == CONSTANT.ROLE.ADMIN">
					<hr />
					<div class="col-md-12">
						<div class="button_confirm clearfix">
							<a class="button-link special-green" @click="handleSettleOrder">Tất toán đơn hàng >></a>
							&nbsp;
							<a @click="openModal('add-addons')" class="button-link special-orange">Thêm chi phí khác
								>></a>
							<b-modal hide-header-close centered title-html="Thêm chi phí khác" id="add-addons">
								<div>
									<span class="green">Mã giao dịch: </span><span class="bold">{{ otherFeeRes.id
										}}</span>
									<br />
									<br />
									<span class="red">Số tiền: </span><input @input="formatOtherFee"
										v-model="otherFee.amount" placeholder="0" size="20"
										type="text" />&nbsp;&nbsp;VNĐ
									<br />
									<br />
									<span class="bold">Ghi chú: </span><input v-model="otherFee.note" size="50"
										maxlength="200" type="text" />
								</div>
								<template #modal-footer>
									<b-button variant="outline-primary" style="font-size: 12px" squared
										@click="createOtherFee" class="squared-button">
										Lưu
									</b-button>
									<b-button variant="outline-danger" style="font-size: 12px" squared
										class="squared-button" @click="hideModal(`add-addons`)">
										Đóng
									</b-button>
								</template>
							</b-modal>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Sản phẩm -->
		<div class="bg_white box_info" id="products">
			<h3 class="subtitle">
				<fa icon="shopping-cart" aria-hidden="true"></fa> DANH SÁCH SẢN
				PHẨM
			</h3>
			<div class="cu-row col-md-12" style="display: flex">
				<div class="col-md-6">
					<form
						v-if="order.orderChina.status < 7 && order.orderChina.status != 0 && CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN"
						action="" class="ajaxFormOrderStatusDelete" method="POST">
						<a class="button-link black" @click="cancelOrder">
							Hủy đơn
						</a>
						<div class="ajax_response alert dismissable"></div>
					</form>
					<a v-else @click.prevent="(event) => event.preventDefault()" class="button-link special-gray">
						Huỷ đơn
					</a>&nbsp;
					<form
						v-if="order.orderChina.status < 3 && order.orderChina.status != 0 && CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN"
						action="" class="ajaxFormOrderStatusDelete" method="POST">
						<a class="button-link special-green" @click="buyOrder">
							Đã mua hàng
						</a>
						<div class="ajax_response alert dismissable"></div>
					</form>
					<a v-else @click.prevent="(event) => event.preventDefault()" class="button-link special-gray">
						Đã mua hàng
					</a>
				</div>
			</div>
			<div class="gridtable clearfix">
				<table>
					<tbody>
						<tr>
							<td width="1%">STT</td>
							<td width="44%">Sản phẩm</td>
							<td width="10%">Giá(NDT)</td>
							<td width="15%">Số lượng</td>
							<td width="10%">Tổng tiền (NDT)</td>

							<td width="20%"></td>
						</tr>

						<tr>
							<td colspan="8">
								Người bán :
								<span class="blue">
									{{
										order.orderDetails.length > 0
											? order.orderDetails[0].sellerId
											: "-"
									}}</span>
							</td>
						</tr>

						<tr v-for="(detail, index) in order.orderDetails" class="">
							<td>{{ index + 1 }}</td>
							<td>
								<div class="image">
									<a :href="detail.itemLink" target="_blank"><img :src="detail.itemImage"
											width="100px" height="100px" /></a>
								</div>
								<div class="info">
									<div class="price">
										<a :href="detail.itemLink" target="_blank">
											<span style="
													font-size: 15px;
													font-weight: 600;
												">
												<fa icon="jpy" aria-hidden="true"></fa>
												{{ detail.itemPrice }}
											</span>
											-
											{{ detail.itemTitle }}
										</a>
									</div>
									<div class="attributes">
										{{ detail.color }} <b>-/-</b>
										{{ detail.size }}
									</div>
									<p>
										<a class="button-link special-orange" v-if="detail.status != 0"
											@click="handleOutOfProduct(detail)">Hết
											hàng</a>
										<a class="button-link button_special" v-if="detail.status == 0">Sản phẩm đã hết
											hàng</a>
									</p>
									<div class="comment_items" style="margin-bottom: 10px">
										<p style="
												max-width: 400px;
												overflow: auto;
											" class="item_note red"></p>
										<form name="updateItemNote" action="" class="item_note_form_766903"
											method="POST" enctype="multipart/form-data">
											<textarea v-model="detail.description" name="item_note" rows="4" cols="35"
												placeholder="Note"></textarea>
										</form>
										<p>
											<a class="button-link" @click="updateDescription(detail)">Lưu ghi
												chú</a>
										</p>
									</div>
									<div>
										<span class="bold">Khiếu nại SP:</span>
										<div v-for="(item, idx) in detail.complains">
											<img style="width: 50px; height: 50px;"
												:src="genImageSrc(item.complainImagePath)">
											&nbsp;
											<span>{{ item.complainDescription }}</span>
										</div>
									</div>
								</div>
							</td>
							<td>
								<p><strong>Giá ban đầu : </strong></p>
								<div class="red">{{ detail.itemPrice }}</div>
								<div class="red">
									{{
										CommonUtils.formatNumberFloat(
											detail.remunerationNDT
										)
									}}
									<span class="green">(tiền công)</span>
								</div>
							</td>
							<td>
								<p>
									<strong>SL Yêu cầu:
										{{ detail.numberItem }}</strong>
								</p>
								{{ detail.numberItem }}
							</td>
							<td>
								<div class="red">
									{{
										CommonUtils.formatNumberFloat(
											detail.totalPriceNDT
										)
									}}
								</div>
							</td>

							<td v-if="index == 0" rowspan="4" class="specials">
								<!-- UPDATE SHOP ID -->
								<div v-for="(item, idx) in order_shop_code">
									<form action="" class="ajaxFormSeller ajaxAuto" method="POST">
										<div class="ghost">
											<a target="_blank">Mã Shop:
												<span v-if="
													!item.shopId ||
													item.shopId.length <=
													0 ||
													item.isDefault
												" class="bold">{{ item.shopId }}</span>
											</a>
											<input v-if="!item.isDefault" type="text" value="" v-model="item.shopId"
												class="label_edit" />
										</div>

										<div v-if="
											item.shopId &&
											item.shopId.length > 0 &&
											!item.isDefault
										" class="ghost">
											<a target="_blank">Phí nội địa:
											</a>
											<input type="text" @input="formatDomesticFees(idx)" value=""
												v-model="item.domesticFees" class="label_edit" />
										</div>

										<div v-if="
											item.shopId &&
											item.shopId.length > 0 &&
											!item.isDefault
										" class="ghost">
											<a target="_blank">Phí ship thực:
											</a>
											<input type="text" value="" @input="
												formatDomesticFeesReal(idx)
												" v-model="item.domesticFeesReal" class="label_edit" />
										</div>
									</form>

									<p v-if="
										!item.shopId ||
										item.shopId.length <= 0 ||
										item.isDefault
									" class="bold">
										Phí nội địa:
										{{
											CommonUtils.formatNumber(
												item.domesticFees
											)
										}}
									</p>
									<p v-if="
										!item.shopId ||
										item.shopId.length <= 0 ||
										item.isDefault
									" class="bold">
										Phí ship thực:
										{{
											CommonUtils.formatNumber(
												item.domesticFeesReal
											)
										}}
									</p>

									<hr />
								</div>
								<a class="button-link" @click="handleSaveOrderShopCode()">Lưu thông tin</a>

								<hr />

								<div v-if="CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN" class="ghost">
									<a target="_blank">Thực thanh toán:
									</a>
									<input v-if="CommonUtils.getRole() != 1 && order.orderChina.paymentCompany == null"
										type="text" :value="CommonUtils.formatNumber(order.orderChina.paymentCompany)"
										@change="(e) => paymentCompany = e.target.value"
										@keyup.enter.prevent="addCompanyPayment" class="label_edit" />
									<span class="bold" v-else>{{
										CommonUtils.formatNumber(order.orderChina.paymentCompany)
									}}</span>
									VNĐ
									<div>
										<span class="blue"
											v-if="order.orderChina.paymentCompanyDescriptionStaff != null">
											{{ order.orderChina.paymentCompanyDescriptionStaff }}
										</span>
										<br>
										<span class="green" style="font-size: 14px;"
											v-if="order.orderChina.paymentCompanyDescription != null">
											{{ order.orderChina.paymentCompanyDescription }}
										</span>
									</div>
								</div>
								<div v-if="CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN">
									<a class="button-link"
										v-if="order.orderChina.paymentCompany == null || CommonUtils.getRole() == CONSTANT.ROLE.ADMIN"
										@click="addCompanyPayment">{{
											CommonUtils.getRole() == CONSTANT.ROLE.ADMIN ? "Đã thanh toán" :
												"Yêu cầu thanh toán" }}</a>
								</div>

								<hr v-if="CommonUtils.getRole() != CONSTANT.ROLE.NHAN_VIEN_TU_VAN" />

								<form action="" class="ajaxFormShip" method="POST">
									<div class="vandon_form">
										<span>Thêm mã shop:</span><input type="text" name="shopId"
											v-model="valueShopCodeAppend" placeholder="Nhập mã shop" />
										<a class="button-link" @click="appendOrderShopCode()">Thêm</a>
									</div>
								</form>
								<hr />

								<h3 class="uppercase align-center">
									Danh sách vận đơn
								</h3>
								<form @submit.prevent="handleSubmit" action="" class="ajaxFormShip" method="POST">
									<div class="vandon_form">
										<span>Mã VĐ:</span><input type="text" name="shipid" v-model="shipCode"
											@change="validateShipCode" @keyup.enter.prevent="createPackage"
											placeholder="Nhập mã vận đơn" />
										<a class="button-link" @click="createPackage">Thêm</a>
									</div>
								</form>

								<hr />

								<div class="sellers_note">
									<div v-for="(note, id) in order.orderNotes">
										<span class="bold">Ghi chú {{ id + 1 }}: </span>{{ note.note }}
										<br>
										<span class="bold">Ngày nhập: </span>{{ CommonUtils.formatDate(note.createDate)
										}}
										<hr>
									</div>
								</div>
								<div>
									<a class="bt_yellow" @click="() => isHideNote = !isHideNote">Thêm ghi chú</a>
									<br>
									<textarea v-if="!isHideNote" v-model="order.orderChina.orderNote" class="note_first"
										name="order_note" rows="4" cols="30" placeholder="Ghi chú"></textarea>
									<br>
									<a v-if="!isHideNote" class="button-link"
										@click="handleOrderNote(order.orderChina)">Lưu</a>
								</div>
							</td>
						</tr>

						<tr>
							<td colspan="5" class="total">
								<div>
									<div class="right">
										Sản phẩm :
										<span class="green">{{
											order.orderChina.totalProduct
										}}</span>
										| Tổng tiền :
										<span class="red">{{
											CommonUtils.formatNumberFloat(
												order.orderDetails.reduce(
													(sum, item) =>
														sum +
														item.totalPriceNDT,
													0
												)
											)
										}}</span>
										( Thực mua :
										<span class="green">{{
											CommonUtils.formatNumberFloat(
												order.orderChina.totalAmount /
												parseInt(commonStore.exchange_rate)
											)
										}}</span>
										) ( Tiền Công : <span class="green">{{
											CommonUtils.formatNumberFloat(
												order.orderChina.purchaseFee /
												parseInt(commonStore.exchange_rate)
											)
										}}</span>
										) Phí nội địa :
										<span class="green">{{
											CommonUtils.formatNumberFloat(
												order.orderChina
													.domesticFeesChina
											)
										}}</span>
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- tab kiện hàng -->

		<div id="package" class="bg_white box_info">
			<div class="cu-row">
				<div class="col-md-12">
					<p class="subtitle">
						<strong>
							<fa icon="archive" aria-hidden="true"></fa> Danh
							sách kiện hàng
						</strong>
					</p>
				</div>
				<div class="col-md-12">
					<div class="gridtable">
						<table>
							<tbody>
								<tr class="header-cart-table">
									<td style="width: 5%">STT</td>
									<td style="width: 20%">Mã kiện</td>
									<td style="width: 30%">Mã vận đơn</td>
									<td class="center">
										Cân nặng
										<fa icon="question-circle"></fa>
									</td>
									<td class="center">
										Thể tích
										<fa icon="question-circle"></fa>
									</td>
									<td class="center">Số lượng</td>
									<td class="center">Trạng thái</td>
									<td class="center">Lịch sử</td>
								</tr>
								<tr v-for="(pkg, index) in packages">
									<td>{{ index + 1 }}</td>
									<td>{{ pkg.packageCode }}</td>
									<td>{{ pkg.shipCode }}</td>
									<td class="center">
										{{ pkg.weigh ? pkg.weigh : "-" }}
									</td>
									<td class="center">
										{{ pkg.volume ? pkg.volume : "-" }}
									</td>
									<td class="center">{{ pkg.quantity }}</td>
									<td class="center">
										{{
											CommonUtils.promptPackageStatusNameByValue(
												pkg.status
											)
										}}
									</td>
									<td class="center">{{ pkg.history }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<!-- kiện hàng -->

		<!-- Tab phí khác -->
		<div id="extrafees" class="box_info bg_white">
			<div class="cu-row">
				<div class="col-md-12">
					<p class="subtitle">
						<strong>
							<fa icon="external-link-square" aria-hidden="true"></fa>
							Danh sách các phí khác nếu có
							<fa class="question-circle"></fa>
						</strong>
					</p>
				</div>
				<div class="col-md-12">
					<div class="gridtable">
						<table>
							<tbody>
								<tr class="header-cart-table">
									<td style="width: 5%">STT</td>
									<td style="width: 15%">Mã hóa đơn</td>
									<td style="width: 15%">Số tiền</td>
									<td class="center" style="width: 65%">
										Người thêm
									</td>
								</tr>
								<tr v-for="(fee, it) in order.otherFees">
									<td>{{ it + 1 }}</td>
									<td>{{ }}</td>
									<td><span class="green">
											{{ CommonUtils.formatNumber(fee.amount) }}
										</span> VND</td>
									<td class="center">
										<span class="red">
											{{ fee.createUser }}
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<!-- end phí khác -->

		<!-- Tab giao dịch -->
		<div id="payment" class="box_info bg_white">
			<div class="cu-row">
				<div class="col-md-12">
					<p class="subtitle">
						<strong>
							<fa icon="money-bill" aria-hidden="true"></fa> Danh
							sách giao dịch
						</strong>
					</p>
				</div>
				<div class="col-md-12">
					<div class="gridtable">
						<table>
							<tbody>
								<tr class="header-cart-table">
									<td width="3%">STT</td>
									<td width="10%">Ngày giao dịch</td>
									<td width="10%">Mã giao dịch</td>
									<td width="10%">Loại giao dịch</td>
									<td width="15%">Nội dung</td>
									<td width="10%">Phát sinh($)</td>
									<td width="10%">Trước giao dịch($)</td>
									<td width="10%">Sau giao dịch($)</td>
								</tr>
								<tr v-for="(
										transaction, index
									) in order.transactionHistory">
									<td>{{ index + 1 }}</td>
									<td>
										{{
											CommonUtils.formatDate(
												transaction.createDate
											)
										}}
									</td>
									<td>{{ transaction.transactionCode }}</td>
									<td>
										{{
											promptOptionsFromValue(
												transaction.type
											)
										}}
									</td>
									<td>{{ transaction.description }}</td>
									<td>
										{{
											CommonUtils.formatNumber(
												transaction.amount
											)
										}}
										(vnđ)
									</td>
									<td>
										{{
											CommonUtils.formatNumber(
												transaction.amountBefore
											)
										}}
										(vnđ)
									</td>
									<td>
										{{
											CommonUtils.formatNumber(
												transaction.amountAfter
											)
										}}
										(vnđ)
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<!-- end giaodich -->

		<!-- Đơn hàng ship only -->
		<!-- Tab Khiếu nại -->
		<div id="payment" class="box_info bg_white">
			<div class="cu-row">
				<div class="col-md-12">
					<p class="subtitle">
						<strong>
							<fa icon="money-bill" aria-hidden="true"></fa> Danh sách khiếu nại
						</strong>
					</p>
				</div>
				<div class="col-md-12">
					<div class="gridtable">
						<table>
							<tbody>
								<tr class="header-cart-table">
									<td style="width: 5%;">STT</td>
									<td style="width: 50%;">Sản phẩm</td>
									<td style="width: 16%;">Giá bán</td>
									<td class="center" style="width:16%;">Số lượng <i
											class="textTooltip fa fa-question-circle tooltipstered"></i>
									</td>
									<td class="center" style="width:18%;">Trạng thái</td>
								</tr>
								<tr v-for="(itm, id) in order.complains">
									<td>{{ id + 1 }}</td>
									<td>{{ order.orderDetails.filter($ => $.id ==
										itm.productComplain)[0].itemTitle }}</td>
									<td>{{ itm.price }}</td>
									<td>{{ itm.total }}</td>
									<td>{{ CommonUtils.promptComplainStatusNameByValue(itm.status)
										}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffOrderDetailSection",
	data() {
		return {
			orderId: this.$route.params.orderId,
			order: null,
			customerInfo: {},
			info: {},

			paymentCompany: 0,

			order_shop_code: [],
			packages: [],

			isHideNote: true,

			valueShopCodeAppend: "",

			woodWorkEnable: false,
			tallyEnable: false,

			otherFee: {
				amount: null,
				note: "",
			},
			otherFeeRes: {},

			shipCode: "",

			isDataReady: false,

			commonStore: useCommonStore(),
		};
	},
	mounted() {
		this.getDetail(this.orderId);
	},
	methods: {
		promptLocationByInventoryId(id) {
			return this.commonStore.inventories[id]
				? this.commonStore.inventories[id].location
				: "";
		},
		promptNameByInventoryId(id) {
			return this.commonStore.inventories[id]
				? this.commonStore.inventories[id].name
				: "";
		},
		async getDetail(id) {
			let loader = this.$loading.show();
			const res = await ApiCaller.get(ROUTES.Order.getDetail(id));
			loader.hide();
			if (res.status != 200) {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			this.order = res.data;
			await this.getCustomer(this.order.customerInfo.id);
			await this.getInfoOf(this.order.customerInfo.id);
			await this.getListOrderShopCode(this.order.orderChina.id);
			await this.getListPackage(this.order.orderChina.id);
			this.order.orderChina.createDate = CommonUtils.formatDate(
				this.order.orderChina.createDate
			);
			this.order.orderChina.depositDate = CommonUtils.formatDate(
				this.order.orderChina.depositDate
			);
			this.order.orderChina.dateOfPurchase = CommonUtils.formatDate(
				this.order.orderChina.dateOfPurchase
			);
			this.order.orderChina.dateOfChinaInventory = CommonUtils.formatDate(
				this.order.orderChina.dateOfChinaInventory
			);
			this.order.orderChina.dateOfVietNamInventory = CommonUtils.formatDate(
				this.order.orderChina.dateOfVietNamInventory
			);
			this.order.orderChina.dateDone = CommonUtils.formatDate(
				this.order.orderChina.dateDone
			);
			this.order.orderChina.dateDelete = CommonUtils.formatDate(
				this.order.orderChina.dateDelete
			);
			let complainProductId = [];
			if (this.order.complains.length > 0) {
				complainProductId = this.order.complains.map($ => $.productComplain)
			}
			this.order.orderDetails.forEach($ => {
				if (complainProductId.includes($.id)) {
					$.complains = this.order.complains.filter(el => el.productComplain == $.id)
				}
			})
			this.woodWorkEnable = this.order.orderChina.isWoodworkingFee;
			this.tallyEnable = this.order.orderChina.isTallyFee;
			this.isDataReady = true;
			this.formatShippingPrice();
			this.formatExchangeRage();
			this.formatpurchaseFee();
		},
		genImageSrc(path) {
			return process.env.BASE_URL + ROUTES.Complain.getFile + '?fileName=' + path;
		},
		formatDate(timestamp) {
			if (timestamp === null) return "";
			const date = new Date(timestamp);

			// Extract date components
			const year = date.getFullYear();
			const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
			const day = date.getDate().toString().padStart(2, "0");
			const hours = date.getHours().toString().padStart(2, "0");
			const minutes = date.getMinutes().toString().padStart(2, "0");
			const seconds = date.getSeconds().toString().padStart(2, "0");
			// Construct the formatted date string
			const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

			return formattedDate;
		},
		openModal(modal) {
			this.$bvModal.show(modal);
		},
		hideModal(id) {
			this.$bvModal.hide(id);
			this.otherFeeRes = {};
			this.otherFee = {
				amount: null,
				note: '',
			}
		},
		promptClassByStatusValue(status) {
			switch (status) {
				case 1:
					return "daduyet";
				case 2:
					return "dathanhtoan";
				case 3:
					return "damuahang";
				case 4:
					return "hangdave";
				case 5:
					return "hangdave";
				case 6:
					return "hangdave";
				case 7:
					return "daduyet";
				case 8:
					return "chokhieunai";
				case 9:
					return "daketthuc";
				case 0:
					return "dahuy";
			}
		},
		promptOptionsFromValue(value) {
			switch (value) {
				case 1:
					return "Nạp tiền";
				case 0:
					return "Rút tiền";
				case 2:
					return "Đặt cọc";
				case 3:
					return "Tất toán";
				case 4:
					return "Hoàn tiền";
			}
		},
		async toggleWoodWork(event) {
			let loader = this.$loading.show();
			const value = event.target.checked;
			const payload = {
				id: this.orderId,
				isWoodworkingFee: value,
			};
			const res = await ApiCaller.post(
				ROUTES.Order.updateOrderStatus,
				payload
			);
			loader.hide();
			if (res.status == 200) {
				this.$toast.success(`Chuyển trạng thái đóng gỗ thành công`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
				this.resetForm();
				this.filterPendingTopup();
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
			}
			this.getDetail(this.orderId);
		},
		async cancelOrder() {
			let loader = this.$loading.show();
			const payload = {
				id: this.orderId,
				status: CONSTANT.ORDER_STATUS.DA_HUY,
			};
			const res = await ApiCaller.post(
				ROUTES.Order.updateOrderStatus,
				payload
			);
			loader.hide();
			if (res.status == 200) {
				this.$toast.success(`Huỷ đơn hàng ${this.order.orderChina.orderCode} thành công`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
			}
			this.getDetail(this.orderId);
		},
		async buyOrder() {
			let loader = this.$loading.show();
			const payload = {
				id: this.orderId,
				status: CONSTANT.ORDER_STATUS.DA_MUA_HANG,
			};
			const res = await ApiCaller.post(
				ROUTES.Order.updateOrderStatus,
				payload
			);
			loader.hide();
			if (res.status == 200) {
				this.$toast.success(`Chuyển trạng thái đã mua hàng cho đơn hàng ${this.order.orderChina.orderCode} thành công`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
			}
			this.getDetail(this.orderId);
		},
		async toggleTally(event) {
			let loader = this.$loading.show();
			const value = event.target.checked;
			const payload = {
				id: this.orderId,
				isTallyFee: value,
			};
			const res = await ApiCaller.post(
				ROUTES.Order.updateOrderStatus,
				payload
			);
			loader.hide();
			if (res.status == 200) {
				this.$toast.success(`Chuyển trạng thái kiểm đếm thành công`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
				this.resetForm();
				this.filterPendingTopup();
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
			}
			this.getDetail(this.orderId);
		},
		async getCustomer(id) {
			let loader = this.$loading.show();
			const link = ROUTES.User.customerInfo(id);
			const res = await ApiCaller.get(link);
			loader.hide();
			if (res.status != 200) {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			this.customerInfo = res.data;
		},
		async getInfoOf(id) {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(ROUTES.User.infoOf(id));
			this.info = res.data;
			if (res.status != 200) {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			loader.hide();
		},
		async getListOrderShopCode(orderId) {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(
				ROUTES.OrderShopCode.findByOrderId(orderId)
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
			res.data.forEach(($) => ($.isDefault = true));
			if (res.data.length == 0) {
				this.order_shop_code = [
					...res.data,
					{
						shopId: "",
						domesticFees: "",
						domesticFeesReal: "",
					},
				];
			} else this.order_shop_code = [...res.data]
		},
		async getListPackage(orderId) {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(
				ROUTES.Package.findByOrderId(orderId)
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
		},
		formatDomesticFees(index) {
			let unformattedNumber = this.order_shop_code[
				index
			].domesticFees.replace(/,/g, "");
			this.order_shop_code[index].domesticFees = unformattedNumber
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		formatDomesticFeesReal(index) {
			let unformattedNumber = this.order_shop_code[
				index
			].domesticFeesReal.replace(/,/g, "");
			this.order_shop_code[index].domesticFeesReal = unformattedNumber
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		appendOrderShopCode() {
			this.order_shop_code = [
				...this.order_shop_code,
				{
					orderId: this.orderId,
					shopId: this.valueShopCodeAppend,
					domesticFees: "",
					domesticFeesReal: "",
				},
			];
			this.valueShopCodeAppend = "";
		},
		async handleSaveOrderShopCode() {
			let payload = this.order_shop_code.map((item) => {
				const formattedItem = {};
				for (const key in item) {
					if (item.hasOwnProperty(key)) {
						if (key !== "shopId" || key !== "isDefault") {
							const value = Number(
								(item[key] + "").replace(/,/g, "")
							);
							formattedItem[key] = value;
						} else {
							formattedItem[key] = item[key];
						}
					}
				}
				formattedItem["isDefault"] = item["isDefault"];
				return formattedItem;
			});
			payload = payload.filter((el) => !el.isDefault);
			debugger
			let loader = this.$loading.show();
			let promises = [];
			payload.forEach(async (el) => {
				el.shopId += "";
				el.orderId = this.orderId;
				promises.push(ApiCaller.post(ROUTES.OrderShopCode.create, el));
			});
			Promise.all(promises).then((res) => {
				this.getListOrderShopCode(this.order.orderChina.id);
				loader.hide();
			});
		},
		async createPackage() {
			try {
				let loader = this.$loading.show();
				const payload = {
					shipCode: this.shipCode,
					orderCode: this.order.orderChina.orderCode,
				};
				const res = await ApiCaller.post(
					ROUTES.Package.create,
					payload
				);
				loader.hide();
				this.getListPackage(this.orderId);
			} finally {
				this.shipCode = "";
			}
		},
		async createOtherFee(event) {
			if (this.otherFee.amount != null || this.otherFee.amount == 0) {
				const loader = this.$loading.show();
				this.otherFee.orderId = this.order.orderChina.id;
				this.otherFee.amount = parseInt(CommonUtils.removeCommas(this.otherFee.amount))
				const res = await ApiCaller.post(ROUTES.OtherFee.create, this.otherFee);
				this.otherFeeRes = res.data;
				if (res.status == 200) {
					this.$toast.success(`Thêm chi phí khác cho đơn hàng ${this.order.orderChina.orderCode}`, {
						title: 'Thông báo',
						position: 'top-right',
						autoHideDelay: 7000,
					})
					this.getDetail(this.orderId)
					this.formatOtherFee();
				} else {
					this.$toast.error(`${res.data.message}`, {
						title: 'Thông báo',
						position: 'top-right',
						autoHideDelay: 7000,
					})
				}
				loader.hide();
			} else {
				this.$toast.error(`Số tiền bắt buộc nhập`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
			event.preventDefault();
		},
		async handleSettleOrder() {
			const loader = this.$loading.show();
			const payload = {
				id: this.order.orderChina.id,
				status: CONSTANT.ORDER_STATUS.SAN_SANG_GIAO_HANG,
			}
			const res = await ApiCaller.post(ROUTES.Order.updateOrderStatus, payload);
			if (res.status == 200) {
				this.$toast.success(`Tất toán cho đơn hàng ${this.order.orderChina.orderCode} thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
			loader.hide();
			this.getDetail(this.orderId)
		},
		async handlepurchaseFee(orderChina) {
			const loader = this.$loading.show()
			const payload = {
				orderId: orderChina.id,
				serviceFee: parseInt(CommonUtils.removeCommas(orderChina.purchaseFee)),
			}
			const res = await ApiCaller.post(ROUTES.Order.updateFee, payload);
			if (res.status == 200) {
				this.$toast.success(`Cập nhật phí dịch vụ cho đơn hàng ${orderChina.orderCode} thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
			loader.hide();
			this.getDetail(this.orderId)
		},
		async handleShippingPrice(orderChina) {
			const loader = this.$loading.show()
			const payload = {
				orderId: orderChina.id,
				shippingPrice: parseInt(CommonUtils.removeCommas(orderChina.shippingPrice)),
			}
			const res = await ApiCaller.post(ROUTES.Order.updateFee, payload);
			if (res.status == 200) {
				this.$toast.success(`Cập nhật giá vận chuyển cho đơn hàng ${orderChina.orderCode} thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
			loader.hide();
			this.getDetail(this.orderId)
		},
		async handleExchangeRate(orderChina) {
			const loader = this.$loading.show()
			const payload = {
				orderId: orderChina.id,
				exchangeRate: parseInt(CommonUtils.removeCommas(orderChina.exchangeRate)),
			}
			const res = await ApiCaller.post(ROUTES.Order.updateFee, payload);
			if (res.status == 200) {
				this.$toast.success(`Cập nhật tỷ giá cho đơn hàng ${orderChina.orderCode} thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
			loader.hide();
			this.getDetail(this.orderId)
		},
		async handleStatus(orderChina) {
			const loader = this.$loading.show()
			const payload = {
				orderId: orderChina.id,
				status: orderChina.status,
			}
			const res = await ApiCaller.post(ROUTES.Order.updateFee, payload);
			if (res.status == 200) {
				this.$toast.success(`Cập nhật trạng thái cho đơn hàng ${orderChina.orderCode} thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
			loader.hide();
			this.getDetail(this.orderId)
		},
		formatShippingPrice() {
			if (this.order.orderChina.shippingPrice) {
				let unformattedNumber = (this.order.orderChina.shippingPrice + '').replace(/,/g, '');
				this.order.orderChina.shippingPrice = unformattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
		},
		formatpurchaseFee() {
			if (this.order.orderChina.purchaseFee) {
				let unformattedNumber = (this.order.orderChina.purchaseFee + '').replace(/,/g, '');
				this.order.orderChina.purchaseFee = unformattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
		},
		formatExchangeRage() {
			if (this.order.orderChina.exchangeRate) {
				let unformattedNumber = (this.order.orderChina.exchangeRate + '').replace(/,/g, '');
				this.order.orderChina.exchangeRate = unformattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
		},
		formatOtherFee() {
			if (this.otherFee.amount) {
				let unformattedNumber = (this.otherFee.amount + '').replace(/,/g, '');
				this.otherFee.amount = unformattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
		},
		async updateDescription(detail) {
			const loader = this.$loading.show();
			const payload = {
				id: detail.id,
				description: detail.description,
			}
			const res = await ApiCaller.post(ROUTES.Order.updateOrderItem, payload);
			loader.hide();
			if (res.status != 200) {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			} else {
				this.$toast.success(`Cập nhật mô tả cho sản phẩm ${detail.itemTitle} thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
		},
		async handleOutOfProduct(detail) {
			const loader = this.$loading.show();
			const payload = {
				id: detail.id,
			}
			const res = await ApiCaller.post(ROUTES.Order.outOfProduct, payload);
			loader.hide();
			if (res.status != 200) {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			} else {
				this.$toast.success(`Đánh dấu sản phẩm ${detail.itemTitle} hết hàng thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				this.getDetail(this.orderId)
			}
		},
		getStaffById(staffId) {
			if (staffId == null || staffId == undefined) return 'Chưa có nhân viên hỗ trợ';
			else return
			this.commonStore.staffs.filter($ => $.id == staffId)[0].fullName
		},
		async addCompanyPayment() {
			debugger
			const payload = {
				id: this.order.orderChina.id,
				paymentCompany: parseInt(this.paymentCompany)
			}
			const loader = this.$loading.show();
			const res = await ApiCaller.post(ROUTES.Order.updateOrderStatus, payload);
			loader.hide();
			if (res.status == 200) {
				this.$toast.success(`Thêm phí thực thanh toán thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				this.paymentCompany = 0;
				this.getDetail(this.orderId)
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
		},
		async handleOrderNote(order) {
			const payload = {
				orderId: order.id,
				note: order.orderNote,
			}
			const loader = this.$loading.show();
			const res = await ApiCaller.post(ROUTES.OrderNote.create, payload);
			loader.hide();
			if (res.status == 200) {
				this.$toast.success(`Thêm ghi chú cho đơn hàng ${order.orderCode} thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				this.getDetail(this.orderId)
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
		},
	},
};
</script>

<!-- style custom -->
<style scoped>
.cu-row {
	padding: 20px 0px;
}

tr {
	border-bottom: none;
}
</style>
