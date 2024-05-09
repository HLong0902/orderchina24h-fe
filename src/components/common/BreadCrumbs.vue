<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
<!--    <div class="page-title-wrapper">-->
<!--        <div class="breadcrumbs-wrapper">-->
<!--            <div class="container">-->
<!--                <ul class="breadcrumbs list-style-type">-->
<!--                    <li><Icon icon="bxs:home" /></li>-->
<!--                    <li v-for="(crumb, index) in breadcrumbs" :key="index">-->
<!--                        <router-link :to="crumb.to">{{ crumb.label }}</router-link>-->
<!--                    </li>-->
<!--                </ul>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
</template>

<script>
export default {
    computed: {
        breadcrumbs() {
            const route = this.$route;
            const matchedRoutes = route.matched;

            return matchedRoutes.map((routeItem) => ({
                label: routeItem.meta.breadcrumb || routeItem.name,
                to: this.getRoutePath(route, routeItem),
            }));
        },
    },
    methods: {
        getRoutePath(route, routeItem) {
            const matchedSegments = route.matched.slice(0, route.matched.indexOf(routeItem) + 1);
            return matchedSegments.map((segment) => segment.path).join('/');
        },
    },
};
</script>

<style scoped>

.page-title-wrapper {
    background: #fff;
}

.container {
    max-width: 1200px;
}

.page-title-wrapper .breadcrumbs-wrapper .breadcrumbs {
    min-height: 5rem;
    padding: 1rem 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.page-title-wrapper .breadcrumbs-wrapper .breadcrumbs li {
    display: inline-flex;
    align-items: center;
    margin-bottom: 0;
    line-height: 1;
    margin-right: .5rem;
    white-space: inherit !important;
}

.page-title-wrapper .breadcrumbs-wrapper .breadcrumbs .home {
    color: #555555;
}

a {
    cursor: pointer;
    color: #555555;
}

ul {
   list-style-type: none;
   padding-left: 0rem;
}

</style>