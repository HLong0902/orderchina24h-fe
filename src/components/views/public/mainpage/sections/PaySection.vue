<!-- import section -->
<script setup>
import { Icon } from '@iconify/vue';
import ApiCaller from '../../../../utils/ApiCaller';
import ROUTES from '../../../../../constants/routeDefine';
</script>

<!-- template section -->
<template>
    <section class="section-pay-wrapper" style="background-image: url(/crupto.png);">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="heading-title custom">
                        <h3 class="title">THÔNG TIN NGÂN HÀNG</h3>
                    </div>
                </div>
                <div class="col-12">
                    <div class="pay-content row justify-content-md-center">
                        <div class="item col-12 col-sm-6 col-lg-4">
                            <div class="item-content">
                                <div class="item-image"><img
                                        src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Techcombank_logo.png"
                                        alt="order hàng trung quốc">
                                </div>
                                <div class="pay-info">
                                    <h5 class="pay-info-name mt-0">{{ bankInfo.accountName }}</h5>
                                    <div class="pay-info-stk"><small>STK:</small>{{ bankInfo.accountNumber }}</div>
                                    <div class="pay-info-branch"><small>Chi Nhánh:</small>{{ bankInfo.agency }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- function defined -->
<script>
export default {
    name: 'PaySection',
    data() {
        return {
            bankInfo: {},
        }
    },
    mounted() {
        this.getBankInfo();
    },
    methods: {
        async getBankInfo() {
            const loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.BankAccount.findAll);
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                return;
            }
            this.bankInfo = res.data[0];

        }
    }
}
</script>

<!-- style custom -->
<style scoped>
.section-pay-wrapper {
    padding: 2.5rem 0 1rem;
    background-color: #f8f8f8;
}

.container {
    max-width: 1200px;
}

.row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}

.heading-title.custom {
    margin-bottom: 1rem;
    position: relative;
    text-align: center;
}

.heading-title.custom .title {
    font-size: 22px;
    justify-content: center;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.heading-title.custom .title:before {
    height: 3px;
    margin-right: 1.5rem;
    content: '';
    flex: 1;
    background: #212529;
}

.heading-title.custom .title:after {
    height: 3px;
    margin-left: 1.5rem;
    content: '';
    flex: 1;
    background: #212529;
}

.justify-content-md-center {
    justify-content: center !important;
}

.section-pay-wrapper .item {
    margin-bottom: 1.5rem;
}

.section-pay-wrapper .item-content {
    height: 100%;
    border: 2px dashed #f17d80;
    padding: 1rem;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.section-pay-wrapper .item-content .item-image {
    display: inline-flex;
    height: 100%;
    padding: .5rem;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 40%;
    max-width: 40%;
    flex: 0 0 40%;
    margin-right: 1rem;
    border: 1px solid #e1e1e1;
}

.section-pay-wrapper .item-content .item-image img {
    object-fit: contain;
}

.section-pay-wrapper .item-content .pay-info {
    flex: 1;
}

.section-pay-wrapper .item-content .pay-info-stk,
.section-pay-wrapper .item-content .pay-info-branch {
    font-size: 14px;
    color: #f17d59;
    line-height: 20px;
}

.section-pay-wrapper .item-content .pay-info-stk small,
.section-pay-wrapper .item-content .pay-info-branch small {
    font-weight: 500;
    color: #282d3b;
    margin-right: .5rem;
}

small {
    font-size: 80%;
}

img {
    display: inline-block;
    vertical-align: middle;
    border-style: none;
    max-width: 100%;
    height: auto;
    object-fit: cover;
}
</style>