<script setup>
import ROUTES from '../../../../../constants/routeDefine';
import { useCommonStore } from '../../../../../store/CommonStore';
import ApiCaller from '../../../../utils/ApiCaller';
import CommonUtils from '../../../../utils/CommonUtils';
</script>

<!-- template section -->
<template>
	<div id="content" class="clearfix fullwidth">
		<h2 class="title">Danh sách đơn hàng</h2>
		<div class="list_status clearfix">
			<ul>
				<li>
					<a
						href="https://ql.hangquangchau24h.vn/orders/lists"
						class="black"
					>
						Tòan bộ : <span>(277488)</span>
					</a>
				</li>
				<li>
					<a
						href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=0"
						class="chuaduyet hidden"
					>
						Chưa duyệt : <span>(0)</span>
					</a>
				</li>
				<li>
					<a
						href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=1"
						class="green"
					>
						Đã duyệt : <span>(969)</span>
					</a>
				</li>
				<li>
					<a
						href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=2"
						class="dathanhtoan"
					>
						Đã đặt cọc : <span>(186)</span>
					</a>
				</li>
				<li>
					<a
						href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=3"
						class="damuahang"
					>
						Đã mua hàng : <span>(681)</span>
					</a>
				</li>
				<li>
					<a
						href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=3.1"
						class="hangdave_tq"
					>
						Hàng đã về kho TQ : <span>(256)</span>
					</a>
				</li>
				<li>
					<a
						href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=4"
						class="hangdave"
					>
						Hàng đã về kho VN : <span>(550)</span>
					</a>
				</li>
				<li>
					<a
						href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=4.5"
						class="ssgiao"
					>
						Sẵn sàng giao hàng : <span>(0)</span>
					</a>
				</li>
				<li>
					<a
						href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=4.6"
						class="damuahang"
					>
						Chờ xử lý khiếu nại : <span>(72)</span>
					</a>
				</li>
				<li>
					<a
						href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=5"
						class="black"
					>
						Đã kết thúc : <span>(223161)</span>
					</a>
				</li>
				<li>
					<a
						href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=-1"
						class="red"
					>
						Đã hủy : <span>(51613)</span>
					</a>
				</li>
			</ul>
		</div>
		<div class="filer_box">
			<form
				action="https://ql.hangquangchau24h.vn/orders/lists"
				method="GET"
			>
				Mã đơn hàng:<input type="text" value="" name="filter_id" /> Mã
				KH:<input type="text" value="" name="filter_cid" />
				Username:<input type="text" value="" name="filter_username" />
				Họ Tên:<input type="text" value="" name="filter_fullname" />
				Phone:<input type="text" value="" name="filter_phone" />
				Email:<input type="text" value="" name="filter_email" />
				<input class="button" type="submit" value="Tìm kiếm" />
			</form>
		</div>
		<div class="gridtable">
			<table>
				<tbody>
					<tr>
						<td>STT</td>
						<td>Mã hóa đơn/Ngày mua hàng</td>
						<td>Tên khách</td>
						<td style="width: 300px">Thông tin liên hệ</td>
						<td>Nhận hàng tại kho</td>
						<td>Thông tin sản phẩm</td>
						<td>Đã thanh toán</td>
						<td>Trạng thái</td>
						<td style="width: 170px">Thao tác</td>
					</tr>
					<tr v-for="(order, index) in orderList">
						<td class="align-center">{{ index + 1 }}</td>
						<td>
							<span class="uppercase">
								<a
									class="blue"
									href="#"
									@click="viewDetail(order.orderChina.id)"
								>
									{{ order.orderChina.orderCode }}
								</a>
							</span>
							<p><b>{{ CommonUtils.formatDate(order.orderChina.dateOfPurchase) }}</b></p>
						</td>
						<td>
							<p>{{ order.address.name }}</p>
							<p>
								<a
									href="https://ql.hangquangchau24h.vn/orders/lists?filter_username=Dothuyduong263"
								>
									<span class="blue"> {{ order.address.name }} </span>
								</a>
							</p>
						</td>
						<td><span>
							<p><b>SĐT:</b> {{ order.address.phoneNumber }}</p> 
							<p><b>Địa chỉ:</b> {{ order.address.address }}</p>
						</span></td>
						<td>
							<span class="bold green">{{ promptNameByInventoryId(order.address.inventoryId) }}</span>
							<p>{{ promptLocationByInventoryId(order.address.inventoryId) }}</p>
						</td>
						<td>
							<div>Tổng số SP: <span class="red">{{ order.orderChina.totalProduct }}</span></div>
							<div>
								Tổng tiền:
								<span class="red">
									{{ CommonUtils.formatNumber(order.orderChina.totalAmount / commonStore.exchange_rate) }}(<span class="green">{{ CommonUtils.formatNumber(order.orderChina.totalAmount) }}</span>
									<span class="small">đ</span>)
								</span>
							</div>
						</td>
						<td><span class="red">{{ CommonUtils.formatNumber(order.orderChina.paid) }}</span> VNĐ</td>
						<td>
							<span :class="promptClassByStatusValue(order.orderChina.status)">{{ promptStatusByValue(order.orderChina.status) }}</span>
						</td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</div>
		<ul class="pagination">
			<li class="active"><a>1</a></li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=1&amp;page=10"
					data-ci-pagination-page="2"
					>2</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=1&amp;page=20"
					data-ci-pagination-page="3"
					>3</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=1&amp;page=10"
					data-ci-pagination-page="2"
					rel="next"
					>Trang sau »</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=1&amp;page=960"
					data-ci-pagination-page="97"
				>
					»</a
				>
			</li>
		</ul>
		<p>
			<strong>Total: <span class="green">{{ orderList.length }}</span> (Items)</strong>
		</p>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffOrderSection",
	data() {
		return {
			orderList: [],

			commonStore: useCommonStore(),
		};
	},
	mounted() {
		this.getListOrders();
	},
	methods: {
		async getListOrders() {
			let loader = this.$loading.show();
			const params = {
				pageIndex: 1,
				pageSize: 999999,
			};
			const res = await ApiCaller.get(ROUTES.Order.adminSearchOrder, params);
			loader.hide();
			this.orderList = res.data.data;
		},
		viewDetail(id) {
			window.open(this.$router.resolve({ name: 'StaffOrderDetailPage', params: { orderId: id } }).href, '_blank');
		},
		promptLocationByInventoryId(id) {
			return this.commonStore.inventories[id].name + ' - ' + this.commonStore.inventories[id].location;
		},
		promptNameByInventoryId(id) {
			return this.commonStore.inventories[id].name;
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
					return 'daduyet';
				case 2:
					return 'dathanhtoan';
				case 3:
					return 'damuahang';
				case 4:
					return 'hangdave';
				case 5:
					return 'hangdave';
				case 6:
					return 'hangdave';
				case 7:
					return 'chokhieunai';
				case 8:
					return 'daketthuc';
				case 9:
					return 'dahuy';
			}
		},
	},
};
</script>

<!-- style custom -->
<style scoped></style>
