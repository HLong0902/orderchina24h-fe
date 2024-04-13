<script setup>
import Header from '../components/common/Header.vue';
import Footer from '../components/common/Footer.vue';
</script>

<template>
    <div id="app">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
export default {
    name: 'PublicLayout',
};
</script>