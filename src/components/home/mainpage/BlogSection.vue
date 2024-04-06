<!-- import section -->
<script setup>
import { Icon } from '@iconify/vue';
</script>

<!-- template section -->
<template>
    <section class="section-blog-wrapper">
        <div class="container">
            <div class="row">
                <div class="blogs-wrapper col-12">
                    <div class="heading-title custom">
                        <h3 class="title">TIN MỚI NHẤT</h3>
                    </div>
                    <div class="blogs-content row">
                        <div class="item col-12 col-sm-6 col-md-4">
                            <div class="item-image"><a
                                    href="/tim-hieu-ve-may-tam-nuoc-trung-quoc-va-cach-mua-ve-viet-nam/"
                                    target="_blank"><img class="img-rr"
                                        src="https://nhaphangchina.vn/pictures/news/2024/03/29/zpc1711681703.jpg"
                                        alt="Tìm hiểu về máy tăm nước Trung Quốc và cách mua về Việt Nam"></a></div>
                            <div class="item-content">
                                <h4 class="title"><a
                                        href="/tim-hieu-ve-may-tam-nuoc-trung-quoc-va-cach-mua-ve-viet-nam/">Tìm hiểu về
                                        máy tăm nước Trung Quốc và cách mua về Việt Nam</a></h4>
                                <p class="excerpt">Tăm nước Trung Quốc có những loại nào nên mua và sử dụng, cùng
                                    Nhaphangchina.vn tìm hiểu ngay các thông tin quan trọng về sản phẩm...</p>
                                <a class="more" href="/tim-hieu-ve-may-tam-nuoc-trung-quoc-va-cach-mua-ve-viet-nam/"
                                    target="_blank">Xem Chi Tiết</a>
                            </div>
                        </div>
                        <div class="item col-12 col-sm-6 col-md-4">
                            <div class="item-image"><a
                                    href="/noi-dien-da-nang-trung-quoc-co-tot-khong-cach-mua-nhu-nao/"
                                    target="_blank"><img class="img-rr"
                                        src="https://nhaphangchina.vn/pictures/news/2024/03/13/gpw1710320164.jpg"
                                        alt="Nồi điện đa năng Trung Quốc có tốt không? Cách mua như nào?"></a></div>
                            <div class="item-content">
                                <h4 class="title"><a
                                        href="/noi-dien-da-nang-trung-quoc-co-tot-khong-cach-mua-nhu-nao/">Nồi điện đa
                                        năng Trung Quốc có tốt không? Cách mua như nào?</a></h4>
                                <p class="excerpt">Nồi điện đa năng Trung Quốc ngày càng trở nên phổ biến và nhận được
                                    sự quan tâm của nhiều người dùng bởi đa dạng tính năng, kiểu...</p>
                                <a class="more" href="/noi-dien-da-nang-trung-quoc-co-tot-khong-cach-mua-nhu-nao/"
                                    target="_blank">Xem Chi Tiết</a>
                            </div>
                        </div>
                        <div class="item col-12 col-sm-6 col-md-4">
                            <div class="item-image"><a href="/nhung-cau-hoi-thuong-gap/" target="_blank"><img
                                        class="img-rr"
                                        src="https://nhaphangchina.vn/pictures/news/2024/03/05/xdw1709604679.jpg"
                                        alt="Những câu hỏi thường gặp"></a></div>
                            <div class="item-content">
                                <h4 class="title"><a href="/nhung-cau-hoi-thuong-gap/">Những câu hỏi thường gặp</a></h4>
                                <p class="excerpt">Nhaphangchina.vn là website chuyên hỗ trợ khách hàng mua sắm trên các
                                    sàn thương mại điện tử của Trung Quốc, giúp đặt hàng nhanh...</p>
                                <a class="more" href="/nhung-cau-hoi-thuong-gap/" target="_blank">Xem Chi Tiết</a>
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
    name: 'BlogSection',
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
.section-blog-wrapper {
    padding: .5rem 0 1rem;
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

.heading-title.custom .title::after {
    height: 3px;
    margin-left: 1.5rem;
    content: '';
    flex: 1;
    background: #212529;
}

.section-blog-wrapper .item {
    margin-bottom: 1.5rem;
}

.section-blog-wrapper .item .item-image {
    margin-bottom: 1.5rem;
}

.img-rr {
    height: 228px;
    object-fit: cover;
    width: 100%;
}

.section-blog-wrapper .item .item-content .more {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: .4rem 1rem;
    min-height: 1.5rem;
    background: #f17d59;
    font-size: 14px;
    color: #fff;
}

h4 {
    line-height: 1.3;
    font-size: 20px;
    margin-bottom: 10px;
    color: #555555;
    font-weight: 600;
}

a {
    cursor: pointer;
    color: #111111;
}

p {
    margin-bottom: 15px;
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