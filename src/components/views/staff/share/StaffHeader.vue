<template>
    <div id="header">
        <div class="logo">
            <img height="70px;" src="https://ql.hangquangchau24h.vn//static/images/logo.png" style="margin-top: -10px;">
        </div>
        <div v-if="checkIsLogin()" class="user_info">
            <h2><span class="lightgreen">Chào bạn.</span> {{ promptStaffName() }} [<a style="cursor: pointer;" @click="handleLogout">Thoát</a>]
            </h2>
            <p class="bold">Quyền thao tác / <span class="green">( Kho - Trung Quốc )</span></p>
        </div>
    </div>
</template>

<script>
import CommonUtils from '../../../utils/CommonUtils';

export default {
    name: "StaffHeader",
    setup() {

    },
    mounted() {

    },
    methods: {
        checkIsLogin() {
            return localStorage.getItem('staffInfo') != null;
        },
        promptStaffName() {
            return CommonUtils.getStaffInfo().username ?
                CommonUtils.getStaffInfo().username
                :
                CommonUtils.getStaffInfo().email.split("@")[0];
        },
        handleLogout() {
            localStorage.removeItem('staffInfo');
            sessionStorage.removeItem('staffJwtToken');
            this.$router.push({ path: "/staff/login" })
        },
    }
}
</script>

<style scoped>
@import '../../../../assets/styles/staff-styles.css';
</style>