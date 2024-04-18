<script setup>
import PrivateHeader from '../components/views/private/share/header/PrivateHeader.vue';
import PrivateNavbar from '../components/views/private/share/navbar/PrivateNavbar.vue';
import Footer from '../components/common/Footer.vue'
</script>

<template>
    <div id="wrapper">
        <PrivateHeader></PrivateHeader>
        <PrivateNavbar></PrivateNavbar>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
export default {
    name: 'PrivateLayout',
};
</script>

<style>
#content {
    padding-bottom: 25px;
}
.container {
    width: 1170px;
}
</style>