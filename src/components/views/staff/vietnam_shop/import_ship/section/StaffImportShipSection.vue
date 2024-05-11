<script setup>
import CONSTANT from "../../../../../../constants/constants";
import ROUTES from "../../../../../../constants/routeDefine";
import { useCommonStore } from "../../../../../../store/CommonStore";
import ApiCaller from "../../../../../utils/ApiCaller";
import CommonUtils from "../../../../../utils/CommonUtils";
</script>

<!-- template section -->
<template>
	<div id="content" class="clearfix fullwidth">
		<div class="lists_ship clearfix">
			<h2 class="align-center">QUÉT NHẬP KHO</h2>
		</div>

		<div class="formSearchVandon">
			<center>
				<h3 class="blue">Nhân viên quét : <strong>{{ CommonUtils.getStaffInfo().username }}</strong></h3>
			</center>
			<center>
				<h3 class="green">
					Ngày Quét : <strong>{{ CommonUtils.formatDate(new Date()) }}</strong>
				</h3>
			</center>
			<form @submit.prevent="handleSubmit" action="" method="post" id="ajaxFormImport">
				Mã vận đơn:
				<input v-model="shipCode" type="text" name="keyword" value="" id="keywordsearch" />
                &nbsp;
				<input @click="updatePackage" type="submit" name="" value="Nhập kho VN" />
			</form>
			<div id="response_ajax_search"></div>
			<div id="response_ajax_append"></div>
		</div>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffImportShipSection",
	data() {
		return {
            shipCode: '',
        };
	},
	mounted() {},
	methods: {
        async updatePackage() {
            const loader = this.$loading.show();
            const payload = {
                shipCode: this.shipCode,
                status: CONSTANT.PACKAGE_STATUS.NHAP_KHO_VN,
            }
            const res = await ApiCaller.post(ROUTES.Package.update, payload);
            if (res.status == 200) {
                this.$toast.success(`Nhập kho VN cho mã VĐ ${this.shipCode} thành công`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
				this.shipCode = '';
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
            loader.hide();
        }
    },
};
</script>

<!-- style custom -->
<style scoped></style>
