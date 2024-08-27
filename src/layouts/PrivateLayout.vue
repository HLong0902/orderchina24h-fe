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

.tooltip.b-tooltip {
    opacity: 1;
}

.tooltip .tooltip-inner{
  min-width: 400px !important;
  border: 3px solid black;
}

.container {
    width: 100%;
}

.tooltip.bs-tooltip-top .tooltip-inner {
  background-color: #2d2d2d !important;
  color: #fff !important;               
  border-radius: 4px !important;        
  font-weight: 400;
  padding: 10px 20px;
}
</style>