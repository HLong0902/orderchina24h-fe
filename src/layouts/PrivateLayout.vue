<script setup>
import PrivateHeader from '../components/views/private/share/header/PrivateHeader.vue';
import PrivateSidebar from '../components/views/private/share/sidebar/PrivateSidebar.vue';
import PrivateFooter from '../components/views/private/share/footer/PrivateFooter.vue';
</script>

<template>
    <div id="wrapper">
        <PrivateHeader></PrivateHeader>
        <PrivateSidebar></PrivateSidebar>
        <router-view></router-view>
        <PrivateFooter></PrivateFooter>
    </div>
</template>

<script>
export default {
    name: 'PrivateLayout',
};
</script>

<style scoped>
#wrapper {
    background-color: #222d32;
}
</style>