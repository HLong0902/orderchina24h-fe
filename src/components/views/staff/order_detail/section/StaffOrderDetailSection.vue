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
					<fa icon="newspaper" aria-hidden="true"></fa> Thông đơn hàng
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
										<strong
											>Tư vấn viên / Khách hàng</strong
										>
									</td>
									<td>
										<span class="black big"
											>Tư vấn viên 1</span
										>
									</td>
								</tr>
								<tr>
									<td colspan="2"><hr /></td>
								</tr>

								<tr>
									<td><strong>Đóng gỗ</strong></td>
									<td>
										<input
											onclick="updateWoodPack(this.checked,278574)"
											disabled="disabled"
											style="width: 20px; height: 20px"
											type="checkbox"
											name="is_wood_pack"
											v-model="woodWorkEnable"
										/>
									</td>
								</tr>
								<tr>
									<td><strong>Kiểm đếm</strong></td>
									<td>
										<input
											onclick="updateOrderChecked(this.checked,278574)"
											disabled="disabled"
											style="width: 20px; height: 20px"
											type="checkbox"
											name="is_order_checked"
											v-model="tallyEnable"
										/>
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
											order.orderChina.depositDate
										}}</span>
									</td>
								</tr>
								<tr>
									<td><strong>Trạng thái</strong></td>
									<td>
										<strong class="big"
											><span
												:class="
													promptClassByStatusValue(
														order.orderChina.status
													)
												"
												>{{
													promptStatusByValue(
														order.orderChina.status
													)
												}}</span
											>&nbsp;
											<fa
												id="tooltip-target-1"
												icon="question-circle"
											></fa>
											<b-tooltip
												style="min-width: 300px"
												placement="top"
												variant="secondary"
												target="tooltip-target-1"
												triggers="hover"
											>
												<div
													style="
														font-size: 14px;
														font-weight: 400;
														margin: 0;
														padding: 0;
													"
												>
													<table>
														<tbody>
															<tr>
																<td
																	style="
																		padding: 5px;
																		text-align: left;
																	"
																>
																	Đã gửi đơn
																</td>
																<td
																	style="
																		padding: 5px;
																		text-align: right;
																	"
																>
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
																<td
																	style="
																		padding: 5px;
																		text-align: left;
																	"
																>
																	Đã đặt cọc
																</td>
																<td
																	style="
																		padding: 5px;
																		text-align: right;
																	"
																>
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
																<td
																	style="
																		padding: 5px;
																		text-align: left;
																	"
																>
																	Đã mua hàng
																</td>
																<td
																	style="
																		padding: 5px;
																		text-align: right;
																	"
																>
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
																<td
																	style="
																		padding: 5px;
																		text-align: left;
																	"
																>
																	Hàng đã về
																	kho TQ
																</td>
																<td
																	style="
																		padding: 5px;
																		text-align: right;
																	"
																>
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
																<td
																	style="
																		padding: 5px;
																		text-align: left;
																	"
																>
																	Hàng đã về
																	kho VN
																</td>
																<td
																	style="
																		padding: 5px;
																		text-align: right;
																	"
																>
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
																<td
																	style="
																		padding: 5px;
																		text-align: left;
																	"
																>
																	Kết thúc
																</td>
																<td
																	style="
																		padding: 5px;
																		text-align: right;
																	"
																>
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
																<td
																	style="
																		padding: 5px;
																		text-align: left;
																	"
																>
																	Hủy
																</td>
																<td
																	style="
																		padding: 5px;
																		text-align: right;
																	"
																>
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
										<div
											id="tipOrderStatusHistory278574"
											class="tipContent hidden"
										>
											<div style="width: 400px">
												<table class="table borderless">
													<tbody>
														<tr>
															<td>
																<strong
																	>Đã gửi
																	đơn</strong
																>
															</td>
															<td class="right">
																<strong
																	>2024-05-07
																	14:57:14</strong
																>
															</td>
														</tr>
														<tr>
															<td>
																<strong
																	>Đã đặt
																	cọc</strong
																>
															</td>
															<td class="right">
																<strong>
																	-
																</strong>
															</td>
														</tr>
														<tr>
															<td>
																<strong
																	>Đã mua
																	hàng</strong
																>
															</td>
															<td class="right">
																<strong>
																	-
																</strong>
															</td>
														</tr>
														<tr>
															<td>
																<strong
																	>Hàng đã về
																	kho
																	TQ</strong
																>
															</td>
															<td class="right">
																<strong>
																	-
																</strong>
															</td>
														</tr>
														<tr>
															<td>
																<strong
																	>Hàng đã về
																	kho
																	VN</strong
																>
															</td>
															<td class="right">
																<strong>
																	-
																</strong>
															</td>
														</tr>
														<tr>
															<td>
																<strong
																	>Sẵn sàng
																	giao
																	hàng</strong
																>
															</td>
															<td class="right">
																<strong>
																	-
																</strong>
															</td>
														</tr>
														<tr>
															<td>
																<strong
																	>Kết
																	thúc</strong
																>
															</td>
															<td class="right">
																<strong>
																	-
																</strong>
															</td>
														</tr>
														<tr>
															<td>
																<strong
																	>Hủy</strong
																>
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
										<strong class="big"
											><span class="bold green">{{
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
										<strong class="big"
											>1¥ =
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
										<strong class="big"
											>{{
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
											<span class="red"
												>{{
													CommonUtils.formatNumber(
														commonStore.fee_by_weight
													)
												}}
												/ KG
												<fa icon="question-circle"></fa>
												<div
													id="tipOrderFee_Weight_range278574"
													class="tipContent hidden"
												>
													<div style="width: 300px">
														<p>
															<b
																>Biểu phí vận
																chuyển</b
															>
														</p>
														<p>
															0 kg -&gt; 50 kg
															===&gt;
															<b>24,000</b> VNĐ
														</p>
														<p>
															50.0000001 kg -&gt;
															200 kg ===&gt;
															<b>23,000</b> VNĐ
														</p>
														<p>
															200.000000001 kg
															-&gt; 500 kg ===&gt;
															<b>22,000</b> VNĐ
														</p>
														<p>
															500.00000001 kg
															-&gt; 50000 kg
															===&gt;
															<b>21,000</b> VNĐ
														</p>
													</div>
												</div>
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
												order.orderChina.totalAmount
											)
										}}</span>
										đ (<span class="red big">{{
											CommonUtils.formatNumber(
												order.orderChina.totalAmount /
													commonStore.exchange_rate
											)
										}}</span>
										NDT) /
										<span class="red big"
											>{{
												order.orderChina.totalProduct
											}}
											SP</span
										>
									</td>
								</tr>

								<tr>
									<td><strong>Phí mua hàng</strong></td>
									<td>
										<span class="big">{{
											CommonUtils.formatNumber(
												order.orderChina.purchaseFee
											)
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
								<tr>
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
											CommonUtils.formatNumber(
												order.orderChina
													.internationalShippingFees
											)
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
				<div class="cu-row">
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
									<input v-model="order.orderChina.serviceFee" size="6" value="0" type="text" />
									&nbsp;
									<a class="button-link" @click="handleServiceFee(order.orderChina)">Lưu</a>
								</span>
							</td>
							<td>
								<span>
									<input v-model="order.orderChina.shippingPrice" size="12" value="0" type="text" />
									&nbsp;
									<a class="button-link" @click="handleShippingPrice(order.orderChina)">Lưu</a>
								</span>
							</td>
							<td>
								<span>
									<input v-model="order.orderChina.exchangeRate" size="6" value="0" type="text" />
									&nbsp;
									<a class="button-link" @click="handleExchangeRate(order.orderChina)">Lưu</a>
								</span>
							</td>
							<td>
								<span>
									<select v-model="order.orderChina.status" style="width: 120px; height: 35px">
										<option
											v-for="(
												value, key
											) in CONSTANT.ORDER_STATUS"
											:key="key"
											:value="value"
										>
											{{
												CommonUtils.promptOrderStatusNameByValue(
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
								<td><span class="blue">Tư vấn viên 1</span></td>
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
									<a
										target="_blank"
										href="https://ql.hangquangchau24h.vn/transaction/histories?filter_username=nhungchia"
										class="green"
										>Xem lịch sử giao dịch &gt;&gt;</a
									>
									<div
										class="customer_credit_owe owe_10860"
										data-id="10860"
									></div>
									<a
										target="_blank"
										href="https://ql.hangquangchau24h.vn/transaction/reportowe?filter_username=nhungchia"
										class="green"
										>Xem chi tiết &gt;&gt;</a
									>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<!-- các thao tác trên đơn hàng -->
				<div class="cu-row">
					<hr />
					<div class="col-md-12">
						<div class="button_confirm clearfix">
							<a class="button-link special-green"
								@click="handleSettleOrder"
								>Tất toán đơn hàng >></a
							>
							&nbsp;
							<a
								@click="openModal('add-addons')"
								class="button-link special-orange"
								>Thêm chi phí khác >></a
							>
							<b-modal
								hide-header-close
								centered
								title-html="Thêm chi phí khác"
								id="add-addons"
							>
								<div>
									<span class="green">Mã giao dịch: </span
									><span class="bold">{{ otherFeeRes.id }}</span>
									<br />
									<br />
									<span class="red">Số tiền: </span
									><input
										v-model="otherFee.amount"
										placeholder="0"
										size="20"
										type="text"
									/>&nbsp;&nbsp;{{ CommonUtils.formatNumber(otherFee.amount) }}&nbsp;&nbsp;VNĐ
									<br />
									<br />
									<span class="bold">Ghi chú: </span
									><input
										v-model="otherFee.note"
										size="50"
										maxlength="200"
										type="text"
									/>
								</div>
								<template #modal-footer>
									<b-button
										variant="outline-primary"
										style="font-size: 12px"
										squared
										@click="createOtherFee"
										class="squared-button"
									>
										Lưu
									</b-button>
									<b-button
										variant="outline-danger"
										style="font-size: 12px"
										squared
										class="squared-button"
										@click="hideModal(`add-addons`)"
									>
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
					Ghi chú toàn đơn: <span class="red"></span><br />
					<form
						action=""
						class="ajaxFormNoteOrder ajaxEnter pull-left"
						method="POST"
					>
						<div class="note">
							<a
								class="bt_yellow"
								href="#"
								onclick="return openDiv('.frames')"
								>Thêm ghi chú</a
							>
							<div class="frames">
								<textarea
									class="note_first"
									name="order_note"
									rows="4"
									cols="35"
									placeholder="Ghi chú"
								></textarea>
								<a
									class="button-link"
									onclick="submitAjax(this)"
									>Lưu</a
								>
							</div>
						</div>
						<div class="ajax_response alert dismissable"></div>
					</form>
				</div>
				<div class="col-md-6">
					<form
						action=""
						class="ajaxFormOrderStatusDelete"
						method="POST"
					>
						<a class="button-link black" onclick="submitAjax(this)">
							Hủy đơn
						</a>
						<div class="ajax_response alert dismissable"></div>
					</form>
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
									}}</span
								>
							</td>
						</tr>

						<tr
							v-for="(detail, index) in order.orderDetails"
							class=""
						>
							<td>{{ index + 1 }}</td>
							<td>
								<div class="image">
									<a :href="detail.itemLink" target="_blank"
										><img
											:src="detail.itemImage"
											width="100px"
											height="100px"
									/></a>
								</div>
								<div class="info">
									<div class="price">
										<a
											:href="detail.itemLink"
											target="_blank"
										>
											<span
												style="
													font-size: 15px;
													font-weight: 600;
												"
												><fa
													icon="jpy"
													aria-hidden="true"
												></fa>
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
									<div
										class="comment_items"
										style="margin-bottom: 10px"
									>
										<p
											style="
												max-width: 400px;
												overflow: auto;
											"
											class="item_note red"
										></p>
										<p>
											<a
												class="button-link"
												href="#"
												onclick="return openDiv('.item_note_form_766903')"
												>Sửa ghi chú</a
											>
										</p>
										<form
											name="updateItemNote"
											action=""
											class="ajaxFormComplain item_note_form_766903"
											method="POST"
											enctype="multipart/form-data"
										>
											<textarea
												name="item_note"
												rows="4"
												cols="35"
												placeholder="Note"
											></textarea>
											<input
												type="hidden"
												name="oitem_id"
												value="766903"
											/>
											<input
												type="hidden"
												name="controller"
												value="orders"
											/>
											<input
												type="hidden"
												name="task"
												value="updateItemNote"
											/>
											<p>
												<a
													class="button-link"
													onclick="submitAjax(this)"
													>Lưu ghi chú</a
												>
											</p>
											<div
												class="form_upload ajax_response alert dismissable"
											></div>
										</form>
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
									<strong
										>SL Yêu cầu:
										{{ detail.numberItem }}</strong
									>
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
									<form
										action=""
										class="ajaxFormSeller ajaxAuto"
										method="POST"
									>
										<div class="ghost">
											<a href="#" target="_blank"
												>Mã Shop:
												<span
													v-if="
														!item.shopId ||
														item.shopId.length <=
															0 ||
														item.isDefault
													"
													class="bold"
													>{{ item.shopId }}</span
												>
											</a>
											<input
												v-if="!item.isDefault"
												type="text"
												value=""
												v-model="item.shopId"
												class="label_edit"
											/>
										</div>

										<div
											v-if="
												item.shopId &&
												item.shopId.length > 0 &&
												!item.isDefault
											"
											class="ghost"
										>
											<a href="#" target="_blank"
												>Phí nội địa:
											</a>
											<input
												type="text"
												@input="formatDomesticFees(idx)"
												value=""
												v-model="item.domesticFees"
												class="label_edit"
											/>
										</div>

										<div
											v-if="
												item.shopId &&
												item.shopId.length > 0 &&
												!item.isDefault
											"
											class="ghost"
										>
											<a href="#" target="_blank"
												>Phí ship thực:
											</a>
											<input
												type="text"
												value=""
												@input="
													formatDomesticFeesReal(idx)
												"
												v-model="item.domesticFeesReal"
												class="label_edit"
											/>
										</div>
									</form>

									<p
										v-if="
											!item.shopId ||
											item.shopId.length <= 0 ||
											item.isDefault
										"
										class="bold"
									>
										Phí nội địa:
										{{
											CommonUtils.formatNumber(
												item.domesticFees
											)
										}}
									</p>
									<p
										v-if="
											!item.shopId ||
											item.shopId.length <= 0 ||
											item.isDefault
										"
										class="bold"
									>
										Phí ship thực:
										{{
											CommonUtils.formatNumber(
												item.domesticFeesReal
											)
										}}
									</p>

									<hr />
								</div>
								<a
									class="button-link"
									@click="handleSaveOrderShopCode()"
									>Lưu thông tin</a
								>

								<hr />

								<div class="ghost">
									<a href="#" target="_blank"
										>Thực thanh toán:
									</a>
									<input
										type="text"
										value=""
										class="label_edit"
									/>
								</div>
								<p class="bold">Thực thanh toán: vcl</p>

								<hr />

								<form
									action=""
									class="ajaxFormShip"
									method="POST"
								>
									<div class="vandon_form">
										<span>Thêm mã shop:</span
										><input
											type="text"
											name="shopId"
											v-model="valueShopCodeAppend"
											placeholder="Nhập mã shop"
										/>
										<a
											class="button-link"
											@click="appendOrderShopCode()"
											>Thêm</a
										>
									</div>
								</form>
								<hr />

								<h3 class="uppercase align-center">
									Danh sách vận đơn
								</h3>
								<form
									action=""
									class="ajaxFormShip"
									method="POST"
								>
									<div class="vandon_form">
										<span>Mã VĐ:</span
										><input
											type="text"
											name="shipid"
											v-model="shipCode"
											@change="validateShipCode"
											placeholder="Nhập mã vận đơn"
										/>
										<a
											class="button-link"
											@click="createPackage"
											>Thêm</a
										>
									</div>
									<input
										type="hidden"
										name="sid"
										value="282240"
									/>
									<input
										type="hidden"
										name="oid"
										value="278574"
									/>
									<input
										type="hidden"
										name="customer_id"
										value="10860"
									/>
									<input
										type="hidden"
										name="controller"
										value="orders"
									/>
									<input
										type="hidden"
										name="task"
										value="insertShip"
									/>

									<div
										class="ajax_response alert dismissable"
									></div>
								</form>

								<hr />

								<div class="sellers_note">
									<p>
										<a
											class="bt_yellow"
											href="#"
											onclick="return openDiv('.item_seller_note_form_278574')"
											>Thêm ghi chú</a
										>
									</p>
									<form
										name=""
										action=""
										class="ajaxEnter ajaxFormSellerNote item_seller_note_form_278574"
										method="POST"
									>
										<textarea
											name="note_content"
											rows="4"
											cols="23"
											placeholder="Ghi chú"
										></textarea>
										<input
											type="hidden"
											name="sid"
											value="282240"
										/>
										<input
											type="hidden"
											name="controller"
											value="orders"
										/>
										<input
											type="hidden"
											name="task"
											value="insert_note_by_seller"
										/>
										<a
											class="button-link note_by_seller"
											onclick="submitAjax(this)"
											>Lưu</a
										>
										<div
											class="ajax_response alert dismissable"
										></div>
									</form>
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
													commonStore.exchange_rate
											)
										}}</span>
										) ( Tiền Công :<span class="green">{{
											CommonUtils.formatNumberFloat(
												order.orderDetails.reduce(
													(sum, item) =>
														sum +
														item.remunerationNDT,
													0
												)
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
						<strong
							><fa icon="archive" aria-hidden="true"></fa> Danh
							sách kiện hàng</strong
						>
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
						<strong
							><fa
								icon="external-link-square"
								aria-hidden="true"
							></fa>
							Danh sách các phí khác nếu có
							<fa class="question-circle"></fa
						></strong>
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
										Nội dung
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
						<strong
							><fa icon="money-bill" aria-hidden="true"></fa> Danh
							sách giao dịch</strong
						>
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
								<tr
									v-for="(
										transaction, index
									) in order.transactionHistory"
								>
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

			order_shop_code: [],
			packages: [],

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
			this.order = res.data;
			await this.getCustomer(this.order.customerInfo.id);
			await this.getInfoOf(this.order.customerInfo.id);
			await this.getListOrderShopCode(this.order.orderChina.id);
			await this.getListPackage(this.order.orderChina.id);
			this.order.orderChina.depositDate = this.formatDate(
				this.order.orderChina.depositDate
			);
			this.order.orderChina.depositDate = this.formatDate(
				this.order.orderChina.depositDate
			);
			this.order.orderChina.dateOfPurchase = this.formatDate(
				this.order.orderChina.dateOfPurchase
			);
			this.order.orderChina.dateOfChinaInventory = this.formatDate(
				this.order.orderChina.dateOfChinaInventory
			);
			this.order.orderChina.dateOfVietNamInventory = this.formatDate(
				this.order.orderChina.dateOfVietNamInventory
			);
			this.order.orderChina.dateDone = this.formatDate(
				this.order.orderChina.dateDone
			);
			this.order.orderChina.dateDelete = this.formatDate(
				this.order.orderChina.dateDelete
			);
			this.woodWorkEnable = this.order.orderChina.isWoodworkingFee;
			this.tallyEnable = this.order.orderChina.isTallyFee;
			this.isDataReady = true;
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
		promptStatusByValue(status) {
			switch (status) {
				case 1:
					return "Đang chờ cọc";
				case 2:
					return "Đã đặt cọc";
				case 3:
					return "Đã mua hàng";
				case 4:
					return "Hàng đã về kho TQ";
				case 5:
					return "Hàng đã về kho VN";
				case 6:
					return "Sẵn sàng giao hàng";
				case 7:
					return "Chờ xử lý khiếu nại";
				case 8:
					return "Đã kết thúc";
				case 9:
					return "Đã huỷ";
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
					return "chokhieunai";
				case 8:
					return "daketthuc";
				case 9:
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
			this.customerInfo = res.data;
		},
		async getInfoOf(id) {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(ROUTES.User.infoOf(id));
			this.info = res.data;
			loader.hide();
		},
		async getListOrderShopCode(orderId) {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(
				ROUTES.OrderShopCode.findByOrderId(orderId)
			);
			res.data.forEach(($) => ($.isDefault = true));
			this.order_shop_code = [
				...res.data,
				{
					shopId: "",
					domesticFees: "",
					domesticFeesReal: "",
				},
			];
			loader.hide();
		},
		async getListPackage(orderId) {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(
				ROUTES.Package.findByOrderId(orderId)
			);
			this.packages = res.data;
			loader.hide();
		},
		formatDomesticFees(index) {
			// Remove commas from the input string
			let unformattedNumber = this.order_shop_code[
				index
			].domesticFees.replace(/,/g, "");

			// Format the number with commas
			this.order_shop_code[index].domesticFees = unformattedNumber
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		formatDomesticFeesReal(index) {
			// Remove commas from the input string
			let unformattedNumber = this.order_shop_code[
				index
			].domesticFeesReal.replace(/,/g, "");

			// Format the number with commas
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
				const res = await ApiCaller.post(ROUTES.OtherFee.create, this.otherFee);
				this.otherFeeRes = res.data;
				if (res.status == 200) {
					this.$toast.success(`Thêm chi phí khác cho đơn hàng ${this.order.orderChina.orderCode}`, {
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
		async handleServiceFee(orderChina) {
			const loader = this.$loading.show()
			const payload = {
				orderId: orderChina.id,
				serviceFee: orderChina.serviceFee,
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
				shippingPrice: orderChina.shippingPrice,
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
				exchangeRate: orderChina.exchangeRate,
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
	},
};
</script>

<!-- style custom -->
<style scoped>
.cu-row {
	padding: 20px 0px;
}
</style>
