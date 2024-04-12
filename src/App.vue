<script setup>
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue';
import PrivateSidebar from './components/views/private/share/sidebar/PrivateSidebar.vue';
import PrivateHeader from './components/views/private/share/header/PrivateHeader.vue';
</script>

<template>
  <div id="app">
    <!-- <Header></Header> -->
    <PrivateHeader></PrivateHeader>
    <PrivateSidebar></PrivateSidebar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>
