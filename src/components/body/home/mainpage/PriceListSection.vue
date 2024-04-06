<!-- import section -->
<script setup>
import { Icon } from '@iconify/vue';
</script>

<!-- template section -->
<template>
    <section class="price-list-wrapper enable-gradient" style="background-image: url(https://nhaphangchina.vn/images/commitment.jpg);">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-10 offset-lg-1">
                    <div class="heading-title">
                        <h2 class="title">BẢNG GIÁ DỊCH VỤ ORDER HÀNG TRUNG QUỐC</h2>
                        <p class="subtitle"></p>
                    </div>
                    <div class="price-list-content row">
                        <div class="content-left col-12 col-md-4">
                            <img src="https://nhaphangchina.vn/images/image-price-list.png" alt="order hàng trung quốc">
                        </div>
                        <div class="conteent-right col-12 col-md-8">
                            <div class="row">
                                <div class="col-12 col-sm-6 step step-1">
                                    <div class="step-item">
                                        <div class="step-icon"><span class="outer-circle"></span><span
                                                class="outer-circle outer-delay"></span><span
                                                class="step-number">1</span></div>
                                        <div class="step-name">
                                            <h4>TIỀN HÀNG TRÊN WEB</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6 step step-2">
                                    <div class="step-item">
                                        <div class="step-icon"><span class="outer-circle"></span><span
                                                class="outer-circle outer-delay"></span><span
                                                class="step-number">2</span></div>
                                        <div class="step-name">
                                            <h4>PHÍ SHIP TRUNG QUỐC</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6 step step-3">
                                    <div class="step-item">
                                        <div class="step-icon"><span class="outer-circle"></span><span
                                                class="outer-circle outer-delay"></span><span
                                                class="step-number">3</span></div>
                                        <div class="step-name">
                                            <h4>PHÍ DỊCH VỤ</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6 step step-4">
                                    <div class="step-item">
                                        <div class="step-icon"><span class="outer-circle"></span><span
                                                class="outer-circle outer-delay"></span><span
                                                class="step-number">4</span></div>
                                        <div class="step-name">
                                            <h4>CƯỚC VẬN CHUYỂN</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="btn-more"><a href="/bang-gia-van-chuyen/">Chi Tiết Bảng Giá</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- action defined -->
<script>
export default {
    name: 'PriceListSection',
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

.price-list-wrapper {
    position: relative;
    padding: 3rem 0;
    min-height: 20rem;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.price-list-wrapper.enable-gradient:before {
    content: '';
    background: rgba(0, 0, 0, .5);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.container {
    max-width: 1200px;
    position: relative;
}

.container::before {
    display: table;
    content: " ";
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

.row::before {
    display: table;
    content: " ";
}

.price-list-wrapper .heading-title {
    color: #fff;
}

.price-list-wrapper .heading-title .title {
    color: #fff;
}

.price-list-wrapper .heading-title h2 {
    font-weight: 500;
    font-size: 22px;
}

.price-list-wrapper .price-list-content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

img {
    display: inline-block;
    vertical-align: middle;
    border-style: none;
    max-width: 100%;
    height: auto;
    object-fit: cover;
}

.conteent-right {
    margin-top: 20px;
}

.price-list-wrapper .price-list-content .step-item {
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
}

.price-list-wrapper .price-list-content .step-icon {
    border-radius: 50%;
    margin-right: 1.5rem;
    width: 28px;
    height: 28px;
    justify-content: center;
    position: relative;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.price-list-wrapper .price-list-content .step-icon .outer-circle {
    -webkit-animation: smallScale 2s infinite;
    animation: smallScale 2s infinite;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, .7);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.price-list-wrapper .price-list-content .step-icon .outer-circle {
    -webkit-animation: smallScale 2s infinite;
    animation: smallScale 2s infinite;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, .7);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.price-list-wrapper .price-list-content .step-icon .step-number {
    color: #f17d59;
    font-size: 16px;
    padding-top: 1px;
    position: relative;
    z-index: 1;
    line-height: 1;
    font-weight: 500;
    color: #f17d80;
}

@keyframes smallScale {
    0% {
        transform: scale(1);
        opacity: 1
    }
    to {
        transform: scale(1.5);
        opacity: 0
    }
}

.price-list-wrapper .price-list-content .step-name h4 {
    font-size: 16px;
    margin-top: 5px;
    font-weight: 500;
    margin-bottom: 0;
    color: #fff;
}

.price-list-wrapper .price-list-content .btn-more a {
    background-color: #f17d59;
    display: inline-block;
    font-size: 14px;
    padding: .4rem .5rem;
    color: #fff;
    background: #f17d59;
}

section {
    display: block;
}

</style>