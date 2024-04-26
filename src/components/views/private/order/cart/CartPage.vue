<script setup>
import CartSection_Step1 from './section/CartSection_Step1.vue';
import CartSection_Step2 from './section/CartSection_Step2.vue';
</script>

<!-- template section -->
<template>
    <CartSection_Step1 v-if="step === 1"></CartSection_Step1>
    <CartSection_Step2 v-if="step === 2"></CartSection_Step2>
</template>

<!-- function defined -->
<script>
export default {
    name: 'CartPage',
    data() {
        return {
            step: null,
        }
    },
    watch: {
        $route(to, from) {
            this.getStep();
        }
    },
    mounted() {
        this.getStep();
    },
    methods: {
        getStep() {
            switch (this.$route.path) {
                case '/manage/cart':
                    this.step = 1;
                    break;
                case '/manage/cart/step2':
                    this.step = 2;
                    break;
                case '/manage/cart/step3':
                    this.step = 3;
                    break;
                default:
                    this.step = 1;
            }
        }
    }
}
</script>

<!-- style custom -->
<style scoped></style>