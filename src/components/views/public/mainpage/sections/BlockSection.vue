<!-- import section -->
<script setup>
import { Icon } from '@iconify/vue';
</script>

<!-- template section -->
<template>
    <section class="block-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-8">
                    <div id="testimonials" class="testimonials-wrapper">
                        <div class="heading-title">
                            <h3 class="title">Ý KIẾN KHÁCH HÀNG</h3>
                        </div>
                        <div class="testimonials-content">
                            <div class="row mys-slick slick-initialized slick-slider">
                                <div class="slick-list draggable">
                                    <div class="slick-track"
                                        style="opacity: 1; width: 800px; transform: translate3d(0px, 0px, 0px);">
                                        <div class="slick-slide slick-current slick-active" style="width: 800px;">
                                            <div>
                                                <div class="item col-12" style="width: 100%; display: inline-block;">
                                                    <div class="item-content">
                                                        <Icon class="quote-icon" icon="bxs:quote-alt-left" />
                                                        <blockquote>Khi bắt đầu khởi nghiệp tôi rất mơ hồ về nguồn hàng,
                                                            không biết tìm nguồn hàng ở đâu rẻ và đẹp để mở shop. Rất
                                                            may mắn khi thấy bài quảng cáo của OrderChina24h trên
                                                            Facebook và cũng nhờ nhân viên của công ty tư vấn nhiệt tình
                                                            mà tôi đã tìm được đúng nguồn hàng mà mình mong muốn cho
                                                            Shop của mình</blockquote>
                                                    </div>
                                                    <div class="item-info">
                                                        <div class="item-avt"><img
                                                                src="https://OrderChina24H.vn/images/chi-nguyen-lan-huong.jpg"
                                                                alt="order hàng trung quốc"></div>
                                                        <div class="content">
                                                            <h5 class="item-name">Chị Nguyễn Lan Hương</h5>
                                                            <p class="mb-0">Shop Thời Trang</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="support-wrapper">
                        <div class="heading-title">
                            <h3 class="title">HỖ TRỢ KHÁCH HÀNG</h3>
                        </div>
                        <div class="support-content row">
                            <div class="item col-6">
                                <a href="http://zalo.me/096.247.1688" target="_blank" rel="nofollow"><img
                                        src="/zalo.png" alt="Hỗ trợ khách hàng"></a>
                                <div class="item-info">
                                    <b>Ms. Việt</b>
                                    <p>032.687.6636</p>
                                </div>
                            </div>
                            <div class="item col-6">
                                <a href="http://zalo.me/086.285.4976" target="_blank" rel="nofollow"><img
                                        src="/zalo.png" alt="Hỗ trợ khách hàng"></a>
                                <div class="item-info">
                                    <b>Ms. Ngọc</b>
                                    <p>035.537.4881</p>
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
    name: 'BlockSection',
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
.block-wrapper {
    padding: 2rem 0 2rem;
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

.block-wrapper .testimonials-wrapper {
    margin-bottom: 1.5rem;
}

.block-wrapper .heading-title {
    margin-bottom: 1rem;
}

.block-wrapper .heading-title .title {
    font-size: 18px;
    margin-bottom: 0;
}

.block-wrapper .testimonials-wrapper .testimonials-content {
    position: relative;
    overflow: hidden;
}

.mys-slick.row {
    display: block;
}

.mys-slick .slick-slide {
    display: inline-flex;
}

.mys-slick .slick-slide>div {
    display: inline-flex;
    width: 100%;
}

.block-wrapper .testimonials-wrapper .testimonials-content .item-content {
    position: relative;
    padding: 1.25rem 1rem 1rem 3rem;
    margin-bottom: 1rem;
    margin-left: 3px;
    border: 1px solid #e1e1e1;
    background: #fff;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, .15);
    border-radius: 5px;
    font-size: 14px;
    width: 90%;
}

.block-wrapper .testimonials-wrapper .testimonials-content .item-content:before {
    content: '';
    width: 0;
    height: 0;
    border-color: #fff transparent transparent;
    border-width: .7rem;
    border-style: solid;
    margin-left: -.7rem;
    position: absolute;
    bottom: -1.4rem;
    left: 5rem;
    z-index: 1;
}

.block-wrapper .testimonials-wrapper .testimonials-content .item-content .quote-icon {
    font-size: 1.5rem;
    position: absolute;
    top: 30px;
    left: 20px;
    color: #555555;
}

.block-wrapper .testimonials-wrapper .testimonials-content .item-content blockquote {
    font-style: italic;
    border: none;
    font-size: 14px;
    padding: 0;
    margin: 0 1rem 1rem;
    color: #555555;
    font-size: 13px;
}

.block-wrapper .testimonials-wrapper .testimonials-content .item-info {
    padding-left: 2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.block-wrapper .testimonials-wrapper .testimonials-content .item-avt {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 60px;
    max-width: 60px;
    flex: 0 0 60px;
    height: 60px;
    margin-right: 2rem;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #e1e1e1;
}

.block-wrapper .testimonials-wrapper .testimonials-content .item-name {
    font-size: 14px;
    font-style: italic;
    color: #555555;
}

.block-wrapper .testimonials-wrapper .testimonials-content p {
    font-size: 14px;
    font-style: italic;
    color: #555555;
}

.block-wrapper .heading-title {
    margin-bottom: 1rem;
}

.block-wrapper .heading-title .title {
    font-size: 18px;
}

.block-wrapper .support-wrapper .support-content .item {
    margin-bottom: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
}

.block-wrapper .support-wrapper .support-content .item a {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 43px;
    max-width: 43px;
    flex: 0 0 43px;
    margin-right: .7rem;
}

.block-wrapper .support-wrapper .support-content .item-info {
    flex: 1;
}

.block-wrapper .support-wrapper .support-content .item-info b {
    font-size: 14px;
    font-weight: 500;
    font-style: italic;
    color: #555555;
}

.block-wrapper .support-wrapper .support-content .item-info p {
    font-style: italic;
    color: #f17d59;
    line-height: 16px;
}

a {
    cursor: pointer;
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