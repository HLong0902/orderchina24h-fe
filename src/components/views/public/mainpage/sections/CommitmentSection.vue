<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
    <section class="service-commitment-wrapprt enable-bg-color" style="background-image: url(/world-map.png);">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="heading-title custom">
                        <h2 class="title" style="text-transform: uppercase;">Cam kết dịch vụ</h2>
                        <p class="subtitle">OrderChina24h luôn luôn cố gắng không ngừng nghỉ nhằm mang lại cho khách
                            hàng dịch vụ mua hàng tốt nhất, uy tín nhất, vận chuyển nhanh chóng nhất, mang lại sự hài
                            lòng khi khách hàng sử dụng dịch vụ <i><strong>nhập hàng Trung Quốc</strong></i> của chúng
                            tôi.</p>
                    </div>
                </div>
                <div class="commitment-content">
                    <div class="col-12 col-md-10 offset-md-1">
                        <ul class="commitment-list">
                            <li>
                                <h5>
                                    <Icon icon="bx:chevrons-right" />CAM KẾT ĐẶT HÀNG
                                </h5>
                                <p>Đền bù 100% tiền hàng nếu OrderChina24h đặt sai link của quý khách. Cam kết mua
                                    hàng trong vòng 24h kể từ lúc đơn hàng được đặt cọc.</p>
                            </li>
                            <li>
                                <h5>
                                    <Icon icon="bx:chevrons-right" />CAM KẾT BỒI THƯỜNG
                                </h5>
                                <p>Chúng tôi cam kết đền bù 100% tiền hàng nếu có sai sót trong quá trình đặt hàng Trung
                                    Quốc, cũng như thất lạc khi vận chuyển hàng hóa.</p>
                            </li>
                            <li>
                                <h5>
                                    <Icon icon="bx:chevrons-right" />CAM KẾT ĐÚNG GIÁ
                                </h5>
                                <p>Cam kết mua hàng Trung Quốc đúng giá được công bố trên các website và đúng phí vận
                                    chuyển nội địa không gian dối.</p>
                            </li>
                            <li>
                                <h5>
                                    <Icon icon="bx:chevrons-right" />THỜI GIAN VẬN CHUYỂN
                                </h5>
                                <p>OrderChina24h luôn luôn cố gắng tối ưu chi phí, thời gian để việc vận chuyển hàng
                                    hóa từ Trung Quốc về Việt Nam nhanh nhất, an toàn nhất có thể.</p>
                            </li>
                            <li>
                                <h5>
                                    <Icon icon="bx:chevrons-right" />TỶ GIÁ NHÂN DÂN TỆ
                                </h5>
                                <p>Tỷ giá công khai minh bạch khớp với hệ thống đặt hàng. Luôn luôn ưu tiên để tỷ giá
                                    thấp nhất nhằm mang lại lợi ích tối đa cho khách hàng.</p>
                            </li>
                            <li>
                                <h5>
                                    <Icon icon="bx:chevrons-right" />CAM KẾT HỖ TRỢ
                                </h5>
                                <p>OrderChina24h luôn luôn cố gắng phục vụ 24/7 nhằm mang lại dịch vụ tốt nhất tới quý
                                    khách hàng.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'CommitmentSection',
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
.container {
    max-width: 1200px;
}

.container::before {
    display: table;
    content: " ";
}

.container::after {
    clear: both;
}

.row:before {
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

.row:after {
    clear: both;
}

.service-commitment-wrapprt {
    padding: 2.5rem 0 2rem 0;
    position: relative;
    min-height: 20rem;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.service-commitment-wrapprt.enable-bg-color {
    background-color: rgba(41, 128, 185, 0.20);
}

.heading-title.custom {
    margin-bottom: 2rem;
}

.service-commitment-wrapprt .heading-title {
    margin-bottom: 0;
}

.heading-title.custom {
    position: relative;
    margin-bottom: 4rem;
    text-align: center;
}

.heading-title.custom .title {
    font-size: 22px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    position: relative;
}

.heading-title.custom .title:before {
    height: 3px;
    content: '';
    flex: 1;
    background: #212529;
    margin-right: 1.5rem;
}

.heading-title.custom .title::after {
    height: 3px;
    content: '';
    flex: 1;
    background: #212529;
    margin-left: 1.5rem;
}

.service-commitment-wrapprt .heading-title .subtitle {
    max-width: 70%;
    margin: auto;
    color: #555555;
}

.service-commitment-wrapprt .row>[class*=commitment-] {
    display: flex;
    flex-wrap: wrap;
    padding-top: .1rem;
    position: relative;
}

.service-commitment-wrapprt .commitment-list {
    padding-bottom: 0;
    margin-right: -1.5rem;
    margin-bottom: 0;
    margin-left: -1.5rem;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    padding-left: 1rem;
    max-width: 100%;
}

.service-commitment-wrapprt .commitment-list li {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 50%;
    max-width: 50%;
    flex: 0 0 50%;
    margin-bottom: 2rem;
    padding-left: 15px;
    padding-right: 15px;
    line-height: 1.75;
    white-space: inherit !important;
}

.service-commitment-wrapprt .commitment-list li h5 {
    font-size: 16px;
    color: #f17d59 !important;
    font-weight: 500;
    margin-bottom: 1rem;
}

.service-commitment-wrapprt .commitment-list li i.bx {
    position: relative;
    top: 1px;
}

.service-commitment-wrapprt .commitment-list li p {
    margin-bottom: 0;
    line-height: 1.86;
    color: #555555;
    font-size: 14px;
}
</style>