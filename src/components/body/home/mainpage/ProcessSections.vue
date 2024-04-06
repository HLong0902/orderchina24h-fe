<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
    <section class="process-wrapper">
        <div class="container">
            <div class="inline-hr"></div>
            <div class="row">
                <div class="column col-12 col-sm-6 col-md-4 col-md-custom-5">
                    <div class="item">
                        <div class="item-info">
                            <div class="process-icon"><img src="https://nhaphangchina.vn/images/tracking.png"
                                    alt="order hàng trung quốc"></div>
                            <div class="process-name"><span>Tìm kiếm <br>sản phẩm</span></div>
                        </div>
                        <div class="steps-process"><img src="https://nhaphangchina.vn/images/steps.png"
                                alt="order hàng trung quốc"></div>
                    </div>
                </div>
                <div class="column col-12 col-sm-6 col-md-4 col-md-custom-5">
                    <div class="item">
                        <div class="item-info">
                            <div class="process-icon"><img src="https://nhaphangchina.vn/images/packing-list.png"
                                    alt="order hàng trung quốc"></div>
                            <div class="process-name"><span>Tạo<br> đơn hàng</span></div>
                        </div>
                        <div class="steps-process"><img src="https://nhaphangchina.vn/images/steps.png"
                                alt="order hàng trung quốc"></div>
                    </div>
                </div>
                <div class="column col-12 col-sm-6 col-md-4 col-md-custom-5">
                    <div class="item">
                        <div class="item-info">
                            <div class="process-icon"><img src="https://nhaphangchina.vn/images/delivery.png"
                                    alt="order hàng trung quốc"></div>
                            <div class="process-name"><span>Đặt cọc<br> tiền hàng</span></div>
                        </div>
                        <div class="steps-process"><img src="https://nhaphangchina.vn/images/steps.png"
                                alt="order hàng trung quốc"></div>
                    </div>
                </div>
                <div class="column col-12 col-sm-6 col-md-4 col-md-custom-5">
                    <div class="item">
                        <div class="item-info">
                            <div class="process-icon"><img src="https://nhaphangchina.vn/images/delivery-truck.png"
                                    alt="order hàng trung quốc"></div>
                            <div class="process-name"><span>Theo dõi đơn hàng</span></div>
                        </div>
                        <div class="steps-process"><img src="https://nhaphangchina.vn/images/steps.png"
                                alt="order hàng trung quốc"></div>
                    </div>
                </div>
                <div class="column col-12 col-sm-6 col-md-4 col-md-custom-5">
                    <div class="item">
                        <div class="item-info">
                            <div class="process-icon"><img src="https://nhaphangchina.vn/images/package.png"
                                    alt="order hàng trung quốc"></div>
                            <div class="process-name"><span>Thanh toán &amp; nhận hàng</span></div>
                        </div>
                        <div class="steps-process"><img src="https://nhaphangchina.vn/images/checked.png"
                                alt="order hàng trung quốc"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ProcessSections',
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

<style scoped>
.process-wrapper {
    padding: 2rem 0 1rem;
}

section {
    display: block;
}

.container {
    max-width: 1200px;
}

.process-wrapper .inline-hr {
    height: 5px;
    margin-bottom: 2rem;
    background: url(https://nhaphangchina.vn/images/hr.jpg) repeat-x 0 0 transparent;
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

.process-wrapper .column {
    margin-bottom: 1rem;
}

.process-wrapper .item {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.process-wrapper .item-info {
    flex: 1;
    height: 100%;
    background: #f9f9f9;
    border: 1px solid #e1e1e1;
    padding: 0.6rem;
    margin-right: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.process-wrapper .item-info .process-icon {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 40px;
    max-width: 40px;
    flex: 0 0 40px;
    margin-right: 0.5rem;
}

img {
    display: inline-block;
    vertical-align: middle;
    border-style: none;
    max-width: 100%;
    height: auto;
    object-fit: cover;
}

.process-wrapper .item-info .process-name {
    color: #111111;
    flex: 1;
    font-family: Roboto;
    font-size: 0.8rem;
    font-weight: 700;
    color: #212529;
    line-height: 1.625;
    text-transform: uppercase;
}

.col-md-custom-5 {
    width: 20%;
}
</style>