<!-- import section -->
<script setup>
import { Icon } from '@iconify/vue';
import BreadCrumbs from '../../../common/BreadCrumbs.vue';
import PolicySection from './sections/PolicySection.vue';
</script>

<!-- template section -->
<template>
    <BreadCrumbs></BreadCrumbs>
    <PolicySection></PolicySection>
</template>

<!-- function defined -->
<script>
export default {
    name: 'Policy',
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