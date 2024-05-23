<script setup>
import StorageManager from '../components/utils/StorageManager';
import StaffFooter from '../components/views/staff/share/StaffFooter.vue';
import StaffHeader from '../components/views/staff/share/StaffHeader.vue';
import StaffNavbar from '../components/views/staff/share/StaffNavbar.vue';
</script>

<template>
    <div id="wrapper">
        <StaffHeader></StaffHeader>
        <StaffNavbar v-if="checkIsLogin()"></StaffNavbar>
        <router-view></router-view>
        <!-- <StaffFooter></StaffFooter> -->
    </div>
</template>

<script>
export default {
    name: 'StaffLayout',
    methods: {
        checkIsLogin() {
            return StorageManager.retrieve('staffInfo') != null;
        },
    }
};
</script>

<style>
@import '../assets/styles/staff-styles.css';

#wrapper {
    min-height: 100vh;
}
</style>