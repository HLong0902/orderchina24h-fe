<script setup>
import ROUTES from "../../../../../../constants/routeDefine";
import { useCommonStore } from "../../../../../../store/CommonStore";
import ApiCaller from "../../../../../utils/ApiCaller";
</script>

<!-- template section -->
<template>
	<div id="content" class="clearfix fullwidth">
		<h2>Tạo bao hàng</h2>
		<form action="" method="POST" @submit.prevent="handleSubmit">
			<div class="group-input col-md-12">
				<div>
					<div class="group-input col-md-12">
						<label class="label_input" style="padding-right: 12px">Mã bao</label>
						<input v-model="bagCode" type="text" value="" class="label_edit inp" />
					</div>
					<div v-if="errors.bagCode" class="bubble-message">
						{{ errors.bagCode }}
					</div>
				</div>

				<div>
					<div class="group-input col-md-12">
						<label class="label_input">Kho VN nhận hàng</label>
						<select v-model="inventoryId" class="inp" name="store">
							<option v-for="(item, index) in commonStore.inventories" :key="index" :value="item.id">
								{{ item.name }} - {{ item.location }}
							</option>
						</select>
					</div>
					<div v-if="errors.inventoryId" class="bubble-message extend">
						{{ errors.inventoryId }}
					</div>
				</div>
			</div>

			<div class="group-input col-md-12">
				<div>
					<div class="group-input col-md-12">
						<label class="label_input">Nhãn bao</label>
						<input v-model="bagLabel" type="text" value="" class="label_edit inp" />
					</div>
					<div v-if="errors.bagLabel" class="bubble-message">
						{{ errors.bagLabel }}
					</div>
				</div>

				<div>
					<div class="group-input col-md-12">
						<label class="label_input" style="padding-right: 50px">Cân nặng</label>
						<input type="number" id="quantity" name="quantity" min="0" max="9999999" step="0.1" value="0"
							v-model="weight" />&nbsp;&nbsp;<b>Kg</b>
					</div>
					<div v-if="errors.weight" class="bubble-message extend">
						{{ errors.weight }}
					</div>
				</div>
			</div>

			<div class="group-input col-md-12">
				<label class="label_input" style="padding-right: 10px">Ghi chú</label>
				<textarea v-model="note" style="width: 655px" class="inp col-md-12" placeholder="Ghi chú" type="text"
					name="note"></textarea>
			</div>

			<div class="group-input col-md-12">
				<div class="group-input col-md-12">
					<label class="label_input">Trạng thái</label>
					<select v-model="status" class="inp" name="store" required="">
						<option value="1">Mở</option>
						<option value="0">Đóng</option>
					</select>
				</div>
				<div v-if="errors.status" class="bubble-message">
					{{ errors.status }}
				</div>
			</div>
		</form>
		<hr />
		<b style="font-size: 20px">Danh sách mã kiện hàng</b>
		<div class="col-md-5" style="display: flex; align-items: center; flex-direction: row">
			<div class="gridtable col-md-5">
				<table>
					<tbody>
						<tr>
							<td width="5%">STT</td>
							<td width="20%">Mã kiện hàng</td>
							<td width="20%">Mã vận đơn</td>
							<td width="1%" class="td-icon">
								<a style="color: black" href="#" @click="isAddNewRow = true">
									<fa icon="circle-plus" style="font-size: 20px"></fa>
								</a>
							</td>
						</tr>
						<tr v-for="(pkg, index) in packages">
							<td width="5%">{{ index + 1 }}</td>
							<td width="20%">{{ pkg.packageCode ? pkg.packageCode : '' }}</td>
							<td width="20%">{{ pkg.shipCode }}</td>
							<td width="1%" class="td-icon">
								<a style="color: black" href="#" @click="handleDelete(pkg.id)">
									<fa icon="trash-can" style="font-size: 20px"></fa>
								</a>
							</td>
						</tr>

						<tr v-if="isAddNewRow">
							<td width="5%">{{ packages.length + 1 }}</td>
							<td width="20%"></td>
							<td width="20%">
								<input @keyup.enter.prevent="getPackageByShipCode" v-model="shipCode"
									style="width: 100%" type="text" value="" class="label_edit inp" />
							</td>
							<td width="1%" class="td-icon"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<hr />

		<input type="submit" name="save" :class="{ isDisabled: isEdit }" :disable="isEdit" value="Thêm mới"
			@click.prevent="handleSubmit" />
		&nbsp;
		<input type="submit" name="save" value="Chỉnh sửa" :class="{ isDisabled: !isEdit }" :disable="isEdit"
			@click.prevent="handleEdit" />
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffAddPackageSection",
	data() {
		return {
			bagCode: "",
			bagLabel: "",
			inventoryId: null,
			weight: 0,
			note: "",
			status: 1,

			errors: {},

			packages: [],

			shipCode: "",

			isAddNewRow: false,

			commonStore: useCommonStore(),

			isEdit: false,

			bagId: this.$route.params.bagId,
		};
	},
	mounted() {
		if (this.bagId) {
			this.findById(this.bagId);
			this.isEdit = true;
		}
	},
	watch: {
		bagCode($) {
			if ($.length > 0) this.errors.bagCode = null;
		},
		bagLabel($) {
			if ($.length > 0) this.errors.bagLabel = null;
		},
		inventoryId($) {
			if ($ != null) this.errors.inventoryId = null;
		},
		weight($) {
			if ($ > 0.00000000001) this.errors.weight = null;
			else this.errors.weight = "Cân nặng bắt buộc nhập.";
		},
		status($) {
			if ($ != null) this.errors.status = null;
		},
		$route($) {
			if (!$.params.bagId || $.params.bagId == '') {
				// this.resetForm();
				this.isEdit = false;
				// this.isAddNewRow = false;
			} else {
				this.isEdit = true;
				if (!this.isAddNewRow)
					this.findById($.params.bagId);
			}
		}
	},
	computed: {
		hasErrors() {
			return Object.keys(this.errors).length > 0;
		},
	},
	methods: {
		validateForm() {
			this.errors = {};

			if (!this.bagCode) this.errors.bagCode = "Mã bao bắt buộc nhập.";

			if (!this.bagLabel)
				this.errors.bagLabel = "Nhãn bao bắt buộc nhập.";

			if (!this.inventoryId)
				this.errors.inventoryId = "Kho VN nhận hàng bắt buộc chọn.";

			if (this.weight == 0)
				this.errors.weight = "Cân nặng bắt buộc nhập.";

			if (!this.status)
				this.errors.status = "Trạng thái bao hàng bắt buộc chọn.";

			// if (this.packages.length == 0) {
			// 	this.$toast.error(
			// 		`Danh sách kiện hàng không được bỏ trống`,
			// 		{
			// 			title: "Thông báo",
			// 			position: "top-right",
			// 			autoHideDelay: 7000,
			// 		}
			// 	);
			// }
		},
		async getPackageByShipCode() {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(ROUTES.Package.findByOption, {
				shipCode: this.shipCode.trim(),
			});
			loader.hide();
			if (res.status != 200) {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			const data = res.data.data[0];
			if (!data) {
				this.packages.push({
					packageCode: '',
					shipCode: this.shipCode,
				});
				this.isAddNewRow = false;
			} else {
				if (
					!this.packages.some((item) => item.shipCode === data.shipCode)
				) {
					this.packages.push(data);
					this.isAddNewRow = false;
				} else {
					this.$toast.error(
						`Mã vận đơn ${this.shipCode} đã tồn tại trong danh sách`,
						{
							title: "Thông báo",
							position: "top-right",
							autoHideDelay: 7000,
						}
					);
				}
			}
			this.shipCode = "";
		},
		handleDelete(id) {
			this.packages = this.packages.filter(($) => $.id != id);
		},
		async handleSubmit() {
			this.validateForm();
			if (!this.hasErrors) {
				const loader = this.$loading.show();
				const payload = {
					inventoryId: this.inventoryId,
					bagCode: this.bagCode,
					bagLabel: this.bagLabel,
					weigh: this.weight,
					description: this.note,
					status: this.status,
					packages: this.packages,
				};
				const res = await ApiCaller.post(ROUTES.Bag.create, payload);
				loader.hide();
				if (res.status == 200) {
					this.$toast.success(
						`Tạo bao hàng ${this.bagCode} thành công`,
						{
							title: "Thông báo",
							position: "top-right",
							autoHideDelay: 7000,
						}
					);
					this.resetForm();
					this.$router.push({ path: "/staff/storecn/listPackage" });
				} else {
					this.$toast.error(`${res.data.message}`, {
						title: "Thông báo",
						position: "top-right",
						autoHideDelay: 7000,
					});
				}
			}
		},
		async handleEdit() {
			this.validateForm();
			if (!this.hasErrors) {
				const loader = this.$loading.show();
				const payload = {
					id: this.bagId,
					inventoryId: this.inventoryId,
					bagCode: this.bagCode,
					bagLabel: this.bagLabel,
					weigh: this.weight,
					description: this.note,
					status: this.status,
					packages: this.packages,
				};
				const res = await ApiCaller.post(ROUTES.Bag.update, payload);
				loader.hide();
				if (res.status == 200) {
					this.$toast.success(
						`Cập nhật bao hàng ${this.bagCode} thành công`,
						{
							title: "Thông báo",
							position: "top-right",
							autoHideDelay: 7000,
						}
					);
					await this.findById(this.bagId);
				} else {
					this.$toast.error(`${res.data.message}`, {
						title: "Thông báo",
						position: "top-right",
						autoHideDelay: 7000,
					});
				}
			}
		},
		resetForm() {
			(this.bagCode = ""), (this.bagLabel = ""), (this.inventoryId = 1), (this.note = '');
			this.weight = 0;
			this.packages = [];
		},
		async findById(id) {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(ROUTES.Bag.findById(id));
			loader.hide();
			if (res.status != 200) {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			let bag = res.data;
			this.bagCode = bag.bagCode;
			this.bagLabel = bag.bagLabel;
			this.inventoryId = bag.inventoryId;
			this.weight = bag.weigh;
			this.note = bag.description;
			this.packages = bag.packages;
		},
	},
};
</script>

<!-- style custom -->
<style scoped>
.label_input {
	margin: 0px 10px;
}

.inp {
	margin-right: 50px;
}

.td-icon {
	text-align: center;
}

.group-input {
	display: flex;
	padding: 10px 0px;
	align-items: center;
}

.bubble-message {
	position: relative;
	color: #f44336;
	border-radius: 5px;
	font-size: 0.8rem;
	bottom: 0.75rem;
	left: 0;
	padding-left: 71px;
	padding-top: 10px;
}

.bubble-message.extend {
	position: relative;
	color: #f44336;
	border-radius: 5px;
	font-size: 0.8rem;
	bottom: 0.75rem;
	left: 0;
	padding-left: 120px;
	padding-top: 10px;
}

.isDisabled {
	background-color: #c8c8c8 !important;
}
</style>
