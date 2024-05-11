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
			<h2 class="float-left">Danh sách vận đơn chưa xác định</h2>
		</div>
		<p class="note red">
			Là danh sách các mã vận đơn không tìm thấy ở đơn hàng nào.
		</p>
		<p class="note red">
			Mã vận đơn sẽ mất sau khi nó được thêm vào đơn hàng và đã kiểm.
		</p>
		<div class="filer_box">
			<form
				@submit.prevent="handleSubmit"
				method="GET"
			>
				Bao hàng:<input v-model="filter.bagCode" type="text" value="" name="filter_name" /> Mã
				vận đơn:<input v-model="filter.shipCode" type="text" value="" name="filter_shipid" />
				Ngày:<input
					class="pickdate_from hasDatepicker"
					type="date"
					v-model="filter.fromDate"
					value=""
					name="filter_startdate_cn_receive_date"
				/>
				-
				<input
					class="pickdate_to hasDatepicker"
					type="date"
					v-model="filter.toDate"
					value=""
					name="filter_enddate_cn_receive_date"
				/>

				Chưa đóng bao :
				<input v-model="filter.isBag" type="checkbox" value="1" name="filter_is_package" />

				Chưa chọn kho :
				<input v-model="filter.isInventory" type="checkbox" value="1" name="filter_is_store" />
                &nbsp;
				<input @click="query" class="button" type="submit" value="Tìm kiếm" />
			</form>
		</div>
		<div class="gridtable">
			<table>
				<tbody>
					<tr>
						<td width="5%">STT</td>
						<td width="30%">
							Mã vận đơn
							<input
								class="checkall_rq_ships"
								style="width: 25px; height: 25px; float: right"
								type="checkbox"
								:checked="this.packages.every($ => $.isChecked)"
								@click="checkAllItems"
							/>
							<form
								action=""
								class="ajaxForm updateListShipUDF"
								method="POST"
							>
								<select v-model="inventoryId" name="sub_store" class="onChangeSave1">
									<option :value="null">Chọn kho</option>
									<option v-for="item in commonStore.inventories" :key="item.id" :value="item.id">
										[{{ item.id }}] - {{ item.name }}, {{ item.location }}
									</option>
								</select>
								&nbsp;
								<a
									class="button-link"
									@click="handleUpdate"
									>Lưu</a
								>
							</form>
						</td>
						<td width="10%">Kho</td>
						<td width="15%">Nhập kho TQ</td>
						<td width="10%">Nhập kho VN</td>
						<td width="10%">Bao đã đóng</td>
						<td width="10%">Actions</td>
					</tr>
					<tr v-for="(pkg, idx) in packages">
						<td>{{ idx + 1 }}</td>
						<td>
							<span class="green"> {{ pkg.shipCode }} </span>
							<input
								class="item_check"
								name="check_id"
								:pkgId="pkg.id"
								style="width: 25px; height: 25px; float: right"
								type="checkbox"
								v-model="pkg.isChecked"
								@input="checkSingleItem"
							/>
						</td>
						<td>
							<span class="bold black">{{ pkg.inventoryChinaName }}</span>
						</td>
						<td>
							<div class="black">{{ pkg.updateUser }}</div>
							<div class="blue">{{ CommonUtils.formatDate(pkg.createDate) }}</div>
						</td>
						<td>{{ pkg.inventoryVietNamName }}</td>
						<td>
							<div class="greeb">{{ pkg.bagOrder ? pkg.bagOrder.bagCode : '-' }}</div>
							<div class="green">
								<span class="bold black">{{ pkg.inventoryVietNamName }}</span>
							</div>
						</td>
						<td>{{ pkg.bagOrder ? 'Đã đóng bao' : 'Chưa đóng bao' }} </td>
					</tr>
					
				</tbody>
			</table>
		</div>
		<!-- <ul class="pagination">
			<li class="active"><a>1</a></li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storevn/shipundefine?page=10"
					data-ci-pagination-page="2"
					>2</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storevn/shipundefine?page=20"
					data-ci-pagination-page="3"
					>3</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storevn/shipundefine?page=10"
					data-ci-pagination-page="2"
					rel="next"
					>Trang sau »</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storevn/shipundefine?page=129690"
					data-ci-pagination-page="12970"
				>
					»</a
				>
			</li>
		</ul> -->
		<p>
			<strong>Total: <span class="green">{{ packages.length }}</span> (Items)</strong>
		</p>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffShipUndefinedSection",
	data() {
		return {
			filter: {
				bagCode: '',
				shipCode: '',
				fromDate: '',
				toDate: '',
				isBag: false,
				isInventory: false,
			},

			inventoryId: null,

			packages: [],
			selected: [],

			commonStore: useCommonStore(),
		};
	},
	mounted() {
		this.query();
	},
	methods: {
		async query() {
			const loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.Package.findPackageUnknown, this.filter);
            if (res.status == 200) {
                this.packages = res.data.data;
				this.packages.forEach($ => $.isChecked = false);
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
            loader.hide();
		},
		checkSingleItem(event) {
			const pkgId = event.target.attributes.pkgId.value;
			const item = this.packages.filter($ => $.id == pkgId)[0];
			
			if(event.target.checked) {
				this.selected.push(item);
			}
			else {
				this.selected = this.selected.filter($ => $.id != item.id);
			}
			this.packages.filter($ => $.id == pkgId).forEach($ => $.isChecked = event.target.checked)
		},
		checkAllItems(event) {
			if(event.target.checked) {
				this.selected.push(...this.packages)
			} else {
				this.selected = [];
			}
			this.packages.forEach($ => $.isChecked = event.target.checked)
		},
		async handleUpdate() {
			if(this.inventoryId != null) {
				let promises = [];
				this.selected.forEach($ => {
					const payload = {
						shipCode: $.shipCode,
						status: CONSTANT.PACKAGE_STATUS.NHAP_KHO_VN,
						inventoryVietNamId: this.inventoryId,
					}
					promises.push(ApiCaller.post(ROUTES.Package.update, payload));
				})
				Promise.all(promises).then(res => {
					this.query();
				})
			} else {
				this.$toast.error(`Bạn chưa chọn kho hàng, vui lòng chọn kho trước khi thao tác`, {
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
<style scoped></style>
