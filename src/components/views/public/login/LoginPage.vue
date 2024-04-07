<!-- import section -->
<script setup>
import { Icon } from '@iconify/vue';
import LoginSection from './section/LoginSection.vue';
import BreadCrumbs from '../../../common/BreadCrumbs.vue';
</script>

<!-- template section -->
<template>
    <BreadCrumbs></BreadCrumbs>
    <LoginSection></LoginSection>
</template>

<!-- function defined -->
<script>
export default {
    name: 'LoginPage',
    data() {
        return {

        }
    },
    created() {

    },
    methods: {

    }
}
</script>

<!-- style custom -->
<style scoped>

</style>