<template>
    <div id="header">
        <div class="logo">
            <img height="70px;" src="../../../../assets/icons/logo.png" style="margin-top: -10px;">
        </div>
        <div v-if="isShow" class="user_info">
            <h2><span class="lightgreen">Chào bạn.</span> {{ promptStaffName() }} [<a style="cursor: pointer;" @click="handleLogout">Thoát</a>]
            </h2>
            <!-- <p class="bold">Quyền thao tác / <span class="green">( Kho - Trung Quốc )</span></p> -->
        </div>
    </div>
</template>

<script>
import CommonUtils from '../../../utils/CommonUtils';
import { useCommonStore } from '../../../../store/CommonStore';
import ApiCaller from '../../../utils/ApiCaller';
import ROUTES from '../../../../constants/routeDefine';
import CONSTANT from '../../../../constants/constants';
import StorageManager from '../../../utils/StorageManager';

export default {
    name: "StaffHeader",
    data() {
        return {
            isShow: false,

            commonStore: useCommonStore(),
        }
    },
    watch:{
        $route (to, from){
            this.isShow = this.checkIsLogin();
        }
    },
    mounted() {
        this.isShow = this.checkIsLogin();
        this.getListInventories();
        this.getExchangeRate();
        this.getChargingFee();
        this.getStaffs();
        this.getFeeByWeight();
    },
    methods: {
        checkIsLogin() {
            return StorageManager.retrieve('staffInfo') != null;
        },
        promptStaffName() {
            return CommonUtils.getStaffInfo().username ?
                CommonUtils.getStaffInfo().username
                :
                CommonUtils.getStaffInfo().email.split("@")[0];
        },
        async getExchangeRate() {
            const link = ROUTES.Information.getValueByCode(CONSTANT.EXCHANGE_RATE);
            const res = await ApiCaller.post(link);
            const exchangeRate = parseInt(res.data[0].value);
            this.commonStore.setExchangeRate(exchangeRate);
        },
        async getChargingFee() {
            const link = ROUTES.Information.getValueByCode(CONSTANT.CHARGING_FEE);
            const res = await ApiCaller.post(link);
            const chargingFee = parseInt(res.data[0].value);
            this.commonStore.setChargingFee(chargingFee);
        },
        async getListInventories() {
			const res = await ApiCaller.get(ROUTES.Inventory.findAll);
			const listInventories = res.data;
            this.commonStore.setInventories(listInventories);
		},
        async getStaffs() {
			const res = await ApiCaller.get(ROUTES.User.staffs);
			const staffs = res.data;
            this.commonStore.setStaffs(staffs);
		},
        async getFeeByWeight() {
            const link = ROUTES.Information.getValueByCode(CONSTANT.FEE_BY_WEIGHT);
            const res = await ApiCaller.post(link);
            const feeByWeight = parseInt(res.data[0].value);
            this.commonStore.setFeeByWeight(feeByWeight);
        },
        handleLogout() {
            localStorage.removeItem('staffInfo');
            sessionStorage.removeItem('jwtToken');
            this.$router.push({ path: "/staff/login" })
        },
    }
}
</script>

<style scoped>
@import '../../../../assets/styles/staff-styles.css';
</style>