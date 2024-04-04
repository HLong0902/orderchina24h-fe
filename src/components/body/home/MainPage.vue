<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
    <section class="extension-wrapper enable-gradient">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-6">
                    <h1 class="heading-title-seo">DỊCH VỤ NHẬP HÀNG TRUNG QUỐC</h1>
                    <div class="search-wrapper">
                        <form action="" method="post" target="_blank" id="search-form" class="search-form">
                            <div class="search-content">
                                <div class="fancy-select">
                                    <select name="type" class="fs-trigger select-form custom-select">
                                        <option value="2">TAOBAO.COM</option>
                                        <option value="1">1688.COM</option>
                                        <option value="3">TMALL.COM</option>
                                    </select>
                                </div>
                                <input type="text" name="query" placeholder="Tìm kiếm sản phẩm" class="search-inp"
                                    autocomplete="off">
                                <button type="submit" name="btn_s" class="search-submit">
                                    <Icon icon="bx:search-alt-2" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-12 col-lg-6">
                    <div class="extension-install">
                        <div class="heading-title">
                            <h2 class="title">CÔNG CỤ ĐẶT HÀNG TRUNG QUỐC</h2>
                            <span class="caption">(Lưu ý: Chỉ sử dụng trên máy tính)</span>
                        </div>
                        <div class="extension-content">
                            <div class="extension-item">
                                <a href="https://chrome.google.com/webstore/detail/công-cụ-đặt-hàng-trung-qu/ehdmdmdeiigdjfclmgenojncmpofclhm"
                                    title="Extension Google Chrome" target="_blank" rel="nofollow">
                                    <img src="https://nhaphangchina.vn/images/chrome.png" alt="order hàng trung quốc">
                                    <span class="txt">Tải về cho trình duyệt <b>Google Chrome</b></span>
                                </a>
                            </div>
                            <div class="extension-item">
                                <a href="https://chrome.google.com/webstore/detail/công-cụ-đặt-hàng-trung-qu/ehdmdmdeiigdjfclmgenojncmpofclhm"
                                    title="Extension CốcCốc" target="_blank" rel="nofollow">
                                    <img src="https://nhaphangchina.vn/images/coccoc.png" alt="order hàng trung quốc">
                                    <span class="txt">Tải về cho trình duyệt <b>Cốc Cốc</b></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'MainPage',
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

.extension-wrapper {
    background-image: url("https://nhaphangchina.vn/images/bg-extension.jpg");
    height: 29.5vw;
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
        display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.extension-wrapper.enable-gradient:before {
    content: '';
    background-image: linear-gradient(to right, rgba(108, 134, 114, .6), rgba(129, 140, 99, .6), rgba(165, 141, 87, .6), rgba(206, 135, 94, .6), rgba(241, 125, 128, .6));
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
}

.container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    max-width: 1200px;
    z-index: 2;
}

.container::before{
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

.heading-title-seo,
.extension-wrapper > h1, h2, a, span {
    color: #fff;
    font-weight: 500;
    font-size: 24px;
    padding-bottom: 10px;
}

.search-content {
    display: flex;
}

.search-content > div, input, button, select {
    height: 2.5rem;
}

.search-submit {
    background-color: #f17d59;
    border: none;
    font-family: Roboto;
    font-size: 1.4rem;
    font-weight: 700;
    text-align: center;
    color: #fff;
    cursor: pointer;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    width: 2.5rem;
    padding-bottom: 20px;
    padding-left: 10px;
}

.fancy-select select {
    float: left;
    width: 100% !important;
    height: 100% !important;
    padding-left: 1rem !important;
    padding-right: 1.5rem !important;
    border-top: 0;
    border-bottom: 0;
    border-left: 0;
    border-right: 1px solid #bdbdbd;
    color: #555555;
    font-weight: 600;
    font-size: 10pt;
}

.search-inp {
    font-size: 10pt;
    padding-left: 1rem;
    padding-right: 5rem;
    border: 0;
}

</style>