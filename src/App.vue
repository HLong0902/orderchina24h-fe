<script setup>
import Header from './components/common/Header.vue'
import MainPage from './components/home/MainPage.vue';
import Footer from './components/common/Footer.vue';
</script>

<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- <MainPage></MainPage> -->
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>
