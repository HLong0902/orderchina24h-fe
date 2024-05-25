<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
    <section class="services-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="heading-title custom">
                        <h2 class="title">VẬN CHUYỂN HÀNG TRUNG QUỐC</h2>
                        <p class="subtitle">Nhập hàng China chuyên cung cấp các dịch vụ <i><strong>mua hàng Trung
                                    Quốc</strong></i> trên các trang thương mại điện tử, nhập hàng Trung Quốc qua
                            Wechat, săn sales Zara, Hm, Bershka, Lining và <i><strong>vận chuyển hàng từ Trung Quốc về
                                    Việt Nam</strong></i> với tốc độ nhanh, giá hợp lý, uy tín và đảm bảo. Cam kết đền
                            bù 100% giá trị đơn hàng nếu trong quá trình vận chuyển không may hàng hóa có xảy ra thất
                            lạc. Chúng tôi luôn luôn hướng tới là doanh nghiệp vận chuyển uy tín nhất, chất lượng dịch
                            vụ tốt nhất, mang lại giá trị cao nhất thiết thực tới các khách hàng</p>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="item" style="background-image: url(/bg.jpg); background-position: Top Left">
                        <div class="services-icon"><a
                                href="https://OrderChina24H.vn/dich-vu-mua-ho-hang-trung-quoc-uy-tin-duoc-hon-5-trieu-khach-hang-tin-dung/"
                                target="_blank"><img src="/services-1.png" alt="order hàng trung quốc"></a></div>
                        <div class="services-info">
                            <h3 class="title"><a
                                    href="https://OrderChina24H.vn/dich-vu-mua-ho-hang-trung-quoc-uy-tin-duoc-hon-5-trieu-khach-hang-tin-dung/"
                                    target="_blank">ORDER HÀNG</a></h3>
                            <p>Dịch vụ order hàng tận gốc trên các trang của Trung Quốc như Taobao, 1688, Tmall,
                                Alibaba, Zara, HM...</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="item" style="background-image: url(/bg.jpg); background-position: Center">
                        <div class="services-icon"><a
                                href="https://OrderChina24H.vn/dich-vu-ky-gui-hang-hoa-trung-quoc-ve-viet-nam-uy-tin-nhat/"
                                target="_blank"><img src="/services-2.png" alt="order hàng trung quốc"></a></div>
                        <div class="services-info">
                            <h3 class="title"><a
                                    href="https://OrderChina24H.vn/dich-vu-ky-gui-hang-hoa-trung-quoc-ve-viet-nam-uy-tin-nhat/"
                                    target="_blank">KÝ GỬI HÀNG</a></h3>
                            <p>Nhận vận chuyển hàng ký gửi với các khách tự thanh toán đơn, các đơn vị không có kho
                                Trung Quốc</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="item" style="background-image: url(/bg.jpg); background-position: Bottom Left">
                        <div class="services-icon"><a href="#" target="_blank"><img src="/chinh-ngach.png"
                                    alt="nhập hàng chính ngạch"></a></div>
                        <div class="services-info">
                            <h3 class="title"><a href="https://OrderChina24H.vn/bang-gia-van-chuyen-chinh-ngach/"
                                    target="_blank" style="text-transform:uppercase">nhập hàng chính ngạch</a></h3>
                            <p>Nhập Hàng Trung Quốc chính ngạch uy tín đầy đủ hoá đơn chứng từ không tắc biên.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ServiceSection',
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
.services-wrapper {
    padding: 2rem 0 0 0;
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

.services-wrapper .col-12 {
    margin-bottom: 1.5rem;
}

.heading-title.custom {
    margin-bottom: 0.5rem;
    position: relative;
    margin-bottom: 0.5rem;
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
    margin-right: 1.5rem;
    content: '';
    flex: 1;
    height: 3px;
    background: #212529;
}

.heading-title.custom .title:after {
    margin-left: 1.5rem;
    content: '';
    flex: 1;
    height: 3px;
    background: #212529;
}

.heading-title.custom .subtitle {
    margin-bottom: 0;
    color: #555555;
    font-size: 14px;
}

.services-wrapper .item {
    height: 80%;
    padding: 1rem 1.5rem;
    border: 1px solid #e1e1e1;
    background: url(/bg.jpg) no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
}

.services-wrapper .item .services-icon {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 60px;
    max-width: 60px;
    flex: 0 0 60px;
    margin-right: 1cqmax;
}

.services-wrapper .item .services-info {
    flex: 1;
}

.services-info h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #111111;
    font-weight: 600;
}

.services-info p {
    color: #555555;
    font-size: 14px;
    padding-bottom: 1rem;
}

img {
    display: inline-block;
    vertical-align: middle;
    border-style: none;
    width: 50px;
    height: auto;
    object-fit: cover;
}

a {
    color: #111111;
    cursor: pointer;
}
</style>