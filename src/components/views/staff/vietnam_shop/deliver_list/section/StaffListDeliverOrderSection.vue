<script setup>
import ROUTES from "../../../../../../constants/routeDefine";
import ApiCaller from "../../../../../utils/ApiCaller";
import CommonUtils from "../../../../../utils/CommonUtils";
import { useCommonStore } from "../../../../../../store/CommonStore";
import CONSTANT from "../../../../../../constants/constants";
</script>

<!-- template section -->
<template>
	<div id="content" class="clearfix fullwidth">
		<div class="lists_ship clearfix">
			<h2 class="float-left">Danh sách phiếu giao hàng</h2>
		</div>
		<div class="filer_box">
			<form @submit.prevent="handleSubmit" method="GET">
				Mã phiếu:<input v-model="filter.code" type="text" value="" name="filter_name" />
				SĐT người nhận:<input v-model="filter.phone" type="text" value="" name="filter_shipid" />
        Username KH:<input v-model="filter.username" type="text" value="" name="filter_shipid" />
				Trạng thái:
				<select v-model="filter.status" name="filter_status">
					<option :value="''" selected>Tất cả</option>
					<option :value="1">Chưa giao</option>
					<option :value="2">Đã giao</option>
				</select>
				Ngày nhập:<input class="pickdate_from hasDatepicker" type="date" v-model="filter.fromDate" value=""
					name="filter_startdate_is_check_update_date" />
				-
				<input class="pickdate_to hasDatepicker" type="date" v-model="filter.toDate" value=""
					name="filter_enddate_is_check_update_date" />
				&nbsp;
				<input class="button" @click="query" type="submit" value="Tìm kiếm" />
			</form>
		</div>
		<div class="gridtable">
			<table>
				<tbody>
					<tr>
						<td width="5%">STT</td>
						<td width="25%">Thông tin phiếu</td>
            <td width="25%">Thông tin khách hàng</td>
            <td width="25%">Thông tin nhận hàng</td>
						<td width="70%">Danh sách kiện</td>
					</tr>
					<tr v-for="(deliverOrder, index) in deliverOrderLst">
						<td>{{ index + 1 }}</td>
						<td>
							<span class="bold">Mã phiếu: <span class="blue">
									<a style="cursor: pointer; color: #0000ff;"
										@click="viewDetail(deliverOrder.code)">{{ deliverOrder.code }}</a>
								</span></span>
							<br>
							<span>Trạng thái: <span
									:class="CommonUtils.promptDeliverOrderStatusClassByValue(deliverOrder.status)">{{
										CommonUtils.promptDeliverOrderStatusNameByValue(deliverOrder.status)
									}}</span></span>
              <span v-if="deliverOrder.status == 1">
                <span class="button-link bg-danger" style="margin-left:10px" @click="removeDelivery(deliverOrder.id)"> Hủy giao</span>
              </span>
							<br>
							<span v-if="deliverOrder.status == 1 && CommonUtils.getRole() !== CONSTANT.ROLE.NHAN_VIEN_TU_VAN">
								Kho hàng:
								<select v-model="deliverOrder.inventoryId">
									<option v-for="item in commonStore.inventories" :key="item.id"
										:value="item.id">
										[{{ item.id }}] - {{ item.name }}, {{ item.location }}
									</option>
								</select>
								&nbsp;
								<a @click="updateDeliveryStatus(deliverOrder)" class="button-link">Đã giao</a>
							</span>
							<span v-else>
								Kho hàng: {{
									promptLocationByInventoryId(deliverOrder.inventoryId)
								}} - {{
									promptNameByInventoryId(deliverOrder.inventoryId)
								}}
							</span>
							<br>
							<span class="text-success"><b>Ngày giao: {{ CommonUtils.formatDate(deliverOrder.updateDate) }}</b></span>
							<br>
							<span>Gồm <span class="red">{{ deliverOrder.packages.length }}</span> kiện hàng</span>
							<br>
              <div v-if="deliverOrder.totalVolume > 0">
                <span>Tổng khối lượng <span class="green">{{ CommonUtils.formatNumberFloat6(deliverOrder.totalVolume) }}</span> khối</span>
              </div>
              <div v-if="deliverOrder.totalWeight > 0">
                    <span>Tổng trọng lượng <span class="green">{{ deliverOrder.totalWeight }}</span> kg</span>
              </div>
							<br>
							<span>Hình thức giao:
								<span v-if="deliverOrder.status == 2">
									 <b>{{ deliverOrder.deliveryForm }}</b>
								</span>
								<span v-else>
									<select @change="updateDeliveryOrder(deliverOrder)" v-model="deliverOrder.deliveryFormCode">
										<option :value="item.value" v-for="(item, idx) in deliveryMethod">
											{{ item.name }}
										</option>
									</select>
								</span>
							</span>
							<br>
							<span v-if="CommonUtils.getRole() !== CONSTANT.ROLE.NHAN_VIEN_TU_VAN && (deliverOrder.deliveryFormCode == CONSTANT.DELIVERY_METHOD_CODE.GHTK || deliverOrder.deliveryFormCode == CONSTANT.DELIVERY_METHOD_CODE.VIETTEL_POST)">
								Mã vận đơn:
								<span v-if="deliverOrder.status == 2">
									{{ deliverOrder.shipDeliveryCode }}
								</span>
								<span v-else-if="deliverOrder.status == 1">
									<input  @keyup.enter.prevent="updateDeliveryOrder(deliverOrder)" v-model="deliverOrder.shipDeliveryCode" type="text">
								</span>
								<br>
							</span>
							<span v-if="CommonUtils.getRole() !== CONSTANT.ROLE.NHAN_VIEN_TU_VAN">
								COD:
                				<span v-if="deliverOrder.status == 2">{{deliverOrder.cod ? deliverOrder.cod  : "" }}</span>
								<input v-else @keyup.enter.prevent="updateDeliveryOrder(deliverOrder)" v-model="deliverOrder.cod" type="text">
							</span>
						</td>
            <td>
              <div class="col-md-12" style="display: flex; flex-direction: row;">
                <div class="col-md-12" style="padding-left: 20px;">
									<span>
										<fa icon="user"></fa>&nbsp;Tên người nhận: <b>{{ deliverOrder.customer.username }}</b>
									</span>
                  <br>
                  <span>
										<fa icon="phone"></fa>&nbsp;Số điện thoại: <b>{{ deliverOrder.customer.phone }}</b>
									</span>
                  <br>
                  <span>
										<fa icon="map-marker-alt"></fa>&nbsp;Địa chỉ: <b>{{ deliverOrder.customer.address }}</b>
									</span>
                  <br>
                  <span>
										<fa icon="user"></fa> <span>&nbsp;Nhân viên tư vấn: </span>
                    <span v-if="deliverOrder.staffName"><b>{{deliverOrder.staffName}}</b></span>
									</span>
                  <br>
                  <span>
										<fa icon="map-marker-alt"></fa> <span>&nbsp;Ghi chú: </span> <br>
                    <span class="orange" v-if="deliverOrder.status == 2">{{deliverOrder.note}}</span>
                    <span v-else>
                       <input @keyup.enter.prevent="updateDeliveryOrder(deliverOrder)" v-model="deliverOrder.note" type="text" value="" class="label_edit inp" placeholder="nhập ghi chú" />
                    </span>
									</span>
                </div>
              </div>
            </td>
            <td>
              <div class="col-md-12" style="display: flex; flex-direction: row;" v-if="deliverOrder.status == 1">
                <div class="col-md-8" style="padding-left: 13px;" >
                  <span>
                    <fa icon="user"></fa>&nbsp;Tên người nhận:
                    <input  v-model="deliverOrder.address.name" type="text" value="" class="label_edit inp" placeholder="Nhập tên người nhận" />
                  </span>
                  <br>
                  <span>
										<fa icon="phone"></fa> &nbsp;Số điện thoại:&nbsp;&nbsp;&nbsp;
                    <input  v-model="deliverOrder.address.phoneNumber" type="text" value="" class="label_edit inp" placeholder="Nhập số điện thoại" />
									</span>
                  <br>
                  <span>
										<fa icon="map-marker-alt"></fa> <span>&nbsp;Địa chỉ nhận hàng: </span> <br>
                    <input  v-model="deliverOrder.address.address" type="text" value="" class="label_edit inp" placeholder="Nhập địa chỉ" />
									</span>
                </div>
                <div class="col-md-4" style="padding-top:5%">
                  <span class="button-link bg-info" @click="updateAddressDelivery(deliverOrder.address, deliverOrder.id)">Cập nhật</span>
                </div>
              </div>
              <div class="col-md-12" style="display: flex; flex-direction: row;" v-else>
                <div class="col-md-12" style="padding-left: 13px;">
                  <span>
                    <fa icon="user"></fa>&nbsp;Tên người nhận:&nbsp; {{deliverOrder.address.name}}
                  </span>
                  <br>
                  <span>
										<fa icon="phone"></fa> &nbsp;Số điện thoại: &nbsp; {{deliverOrder.address.phoneNumber}}
									</span>
                  <br>
                  <span>
										<fa icon="map-marker-alt"></fa> <span>&nbsp;Địa chỉ nhận hàng: &nbsp; {{deliverOrder.address.address}}</span> <br>
									</span>
                </div>
              </div>
            </td>
						<td>
							<div class="col-md-12" style="display: flex; flex-direction: row;">
								<div class="col-md-12" style="padding-left: 5px;">
									<table>
										<tr>
											<td width="5%">STT</td>
											<td width="10%">Mã đơn</td>
											<td width="25%">Mã kiện hàng</td>
											<td width="10%">Cân nặng/Khối</td>
										</tr>
										<tr v-for="(pkg, idx) in deliverOrder.packages">
											<td>{{ idx + 1 }}</td>
											<td>
												<span class="blue">{{ pkg.orderCode }}</span>
											</td>
											<td>
												<span class="green">{{ pkg.shipCode }}</span>
											</td>
											<td>
												<span class="bold" v-if="pkg.weigh>0">{{pkg.weigh}} kg</span>
												<span class="bold" v-else-if="pkg.volume>0">{{pkg.volume}} m3</span>
												<span class="bold" v-else>0 kg</span>
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
		<ul class="pagination">
			<li @click="handlePage(page)" v-for="(page, index) in totalPage"
				:class="{ active: filter.pageIndex == page }">
				<a>{{ page
					}}</a>
			</li>
			<li>
				<a @click="handleNext" data-ci-pagination-page="2" rel="next">Trang sau »</a>
			</li>
			<li>
				<a @click="handleLast" data-ci-pagination-page="97">»</a>
			</li>
		</ul>
		<p>
			<strong>Total: <span class="green">{{ totalRecord }}</span> (Items)</strong>
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
				code: "",
				phone: "",
				status: '',
        username:"",
				pageIndex: 1,
				pageSize: CONSTANT.DEFAULT_PAGESIZE,
			},

			totalPage: new Set(),
			totalRecord: 0,

			deliverOrderLst: [],
			deliveryMethod: [],
			commonStore: useCommonStore(),
		};
	},
	mounted() {
		this.getDeliveryMethods();
		this.query();
	},
	methods: {
		async query() {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(
				ROUTES.DeliverOrder.findByOption,
				this.filter
			);
			if (res.status == 200) {
				this.deliverOrderLst = res.data.data;
				this.totalPage = new Set();
				this.totalRecord = res.data.totalRecord;
				if (this.filter.pageIndex > res.data.totalPage) {
					this.filter.pageIndex = 1;
				}
				for (let i = 1; i <= res.data.totalPage; i++) {
					this.totalPage.add(i);
				}
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: "Thông báo",
					position: "top-right",
					autoHideDelay: 7000,
				});
			}
			loader.hide();
		},
		async updateDeliveryOrder(deliveryOrder) {
			const payload = {
				id: deliveryOrder.id,
				shipDeliveryCode: deliveryOrder.shipDeliveryCode,
				deliveryFormCode: deliveryOrder.deliveryFormCode,
				cod: deliveryOrder.cod,
        note: deliveryOrder.note
			}
			const loader = this.$loading.show();
			const res = await ApiCaller.post(ROUTES.DeliverOrder.updateDelivery, payload);
			loader.hide();
			if (res.status == 200) {
                this.$toast.success(`Cập nhật thông tin cho phiếu giao hàng ${deliveryOrder.code} thành công`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
				this.query();
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
		},
    async updateAddressDelivery(address, deliveryId) {
      const payload = {
       ...address,
        deliveryId:deliveryId
      }
      const loader = this.$loading.show();
      const res = await ApiCaller.post(ROUTES.Address.createOrUpdateDeliveryUpdate, payload);
      loader.hide();
      if (res.status == 200) {
        this.$toast.success(`Cập nhật thông tin địa chỉ thành công`, {
          title: 'Thông báo',
          position: 'top-right',
          autoHideDelay: 7000,
        })
        this.query();
      } else {
        this.$toast.error(`${res.data.message}`, {
          title: 'Thông báo',
          position: 'top-right',
          autoHideDelay: 7000,
        })
      }
    },
		async updateDeliveryStatus(deliverOrder) {
			const payload = {
				id: deliverOrder.id,
				inventoryId: deliverOrder.inventoryId,
				status: CONSTANT.DELIVERY_STATUS.DA_GIAO,
			}
			const loader = this.$loading.show()
			const res = await ApiCaller.post(ROUTES.DeliverOrder.updateStatus, payload);
			loader.hide();
			if (res.status == 200) {
                this.$toast.success(`Cập nhật thông tin cho phiếu giao hàng ${deliverOrder.code} thành công`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
				this.query();
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
		},
		async getDeliveryMethods() {
			const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.DELIVERY_METHOD);
			const res = await ApiCaller.post(link);
			this.deliveryMethod = res.data;
		},
    async removeDelivery(id) {
      let loader = this.$loading.show();
      const link = ROUTES.DeliverOrder.removeDelivery(id);
      const res = await ApiCaller.post(link);
      if (res.status == 200) {
        await this.query();
        this.$toast.success(`Xóa phiếu giao hàng thành công`, {
          title: 'Thông báo',
          position: 'top-right',
          autoHideDelay: 7000,
        });
        loader.hide();
      } else {
        this.$toast.error(`${res.data.message}`, {
          title: 'Thông báo',
          position: 'top-right',
          autoHideDelay: 7000,
        })
      }
    },
		promptLocationByInventoryId(id) {
            return this.commonStore.inventories?.filter($ => $.id == id)[0]?.location;
        },
        promptNameByInventoryId(id) {
            return this.commonStore.inventories?.filter($ => $.id == id)[0]?.name;
        },
		viewDetail(id) {
			window.open(this.$router.resolve({ name: 'StaffDeliverDetailPage', params: { deliverId: id } }).href, '_blank');
		},
		handlePage(page) {
			this.filter.pageIndex = page;
			this.query();
		},
		handleNext() {
			if (this.filter.pageIndex < this.totalPage.size)
				this.filter.pageIndex++;
			else {
				this.filter.pageIndex = this.totalPage.size
			}
			this.query();
		},
		handleLast() {
			this.filter.pageIndex = this.totalPage.size;
			this.query();
		},
	},
};
</script>

<!-- style custom -->
<style scoped></style>
