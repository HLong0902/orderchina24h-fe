<!-- import section -->
<script setup>
import { Icon } from '@iconify/vue';
</script>

<!-- template section -->
<template>
    <div class="mys-bang-gia-option">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-5">
                    <div class="option-content" style="margin-top: 50px;">
                        <div class="title h4">Thông tin liên hệ</div>
                        <div class="content">
                            <!-- <p>Nếu trong quá trình đặt hàng quý khách quý khách có vấn đề gì khó khắn hãy liên hệ ngay với OrderChina24h. Vui lòng gọi tới Holtine sau để được tư vấn miễn phí.</p>
                                             <div class="content-link"><a target="_blank" rel="nofollow" href="tel:096.247.1688">096.247.1688</a><a target="_blank" rel="nofollow" href="tel:086.285.4976">086.285.4976</a></div> -->
                            <div class="note">Inbox trực tiếp qua Fanpage của
                                OrderChina24H tại đây:</div>
                            <div class="link-fanpage"><a target="_blank" rel="nofollow"
                                    href="https://www.facebook.com/profile.php?id=100090809792385&ref=embed_page"
                                    title="Fanpage OrderChina24H">Fanpage
                                    OrderChina24H</a></div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-7">
                    <div class="item">
                        <div class="thumb">
                            <div class="icon"><img src="/icon-1.png" alt="Image Thanh Toán"></div>
                        </div>
                        <div class="title">Phương thức thanh toán</div>
                        <p>Chúng tôi cung cấp các phương thức thanh toán khác nhau
                            phù hợp với quý khách</p>
                        <div class="link"><a target="_blank"
                                href="/huong-dan-tai-va-dang-ky-app-mua-hang-trung-quoc-nhap-hang-china-tren-ios"
                                title="Xem chi tiết">Xem chi tiết</a></div>
                    </div>
                    <div class="item">
                        <div class="thumb">
                            <div class="icon"><img src="/icon-2.png" alt="Image Đổi Trả">
                            </div>
                        </div>
                        <div class="title">Hướng dẫn mua hàng</div>
                        <p>Quý khách hãy tham khảo bài viết sau để có thể tự lên đơn
                            và đặt hàng trung quốc.</p>
                        <div class="link"><a target="_blank"
                                href="/huong-dan-tai-va-dang-ky-tai-khoan-tai-app-mua-hang-trung-quoc-nhchina-nhap-hang-china/"
                                title="Xem chi tiết">Xem chi tiết</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'FQASection',
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
.mys-bang-gia-option {
    width: 100%;
    height: auto;
    padding: 50px 0;
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

.mys-bang-gia-option .col-md-5 .option-content {
    width: 100%;
    height: auto;
    background: #fff3cd;
}

.mys-bang-gia-option .col-md-5 .option-content .h4 {
    width: 100%;
    height: auto;
    background: rgba(0, 0, 0, .1);
    margin: 0;
    padding: 10px;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    color: #856404;
    font-size: 17px;
}

.mys-bang-gia-option .col-md-5 .option-content .content {
    width: 100%;
    height: auto;
    padding: 10px 10px;
}

.mys-bang-gia-option .col-md-5 .option-content .content p {
    width: 100%;
    height: auto;
    text-align: center;
    color: #856404;
    font-size: 15px;
    line-height: 23px;
    padding-top: 15px;
}

.mys-bang-gia-option .col-md-5 .option-content .content .content-link {
    width: 100%;
    height: auto;
    text-align: center;
    padding: 20px 0;
}

.mys-bang-gia-option .col-md-5 .option-content .content .content-link a {
    background: #f17d59;
    color: #FFF;
    font-weight: 600;
    font-size: 17px;
    padding: 8px 25px;
    border-radius: 20px;
    margin: 0 10px;
}

.mys-bang-gia-option .col-md-5 .option-content .content .note {
    width: 100%;
    height: auto;
    text-align: center;
    font-weight: 600;
    font-style: italic;
    color: #856404;
    font-size: 14px;
    margin: 5px 0;
}

.mys-bang-gia-option .col-md-5 .option-content .content .link-fanpage {
    width: 100%;
    height: auto;
    text-align: center;
    margin: 20px 0;
}

.mys-bang-gia-option .col-md-5 .option-content .content .link-fanpage a {
    background: #f17d59;
    color: #FFF;
    font-weight: 600;
    padding: 10px 25px;
    border-radius: 25px;
}

.mys-bang-gia-option .col-md-7 {
    display: flex;
}

.mys-bang-gia-option .col-md-7 .item {
    width: calc(50% - 10px);
    height: calc(120% - 50px);
    background: #fff3cd;
    position: relative;
    top: 50px;
    padding: 50px 15px 50px 15px;
    margin: 0 10px;
    border-radius: 3px;
}

.mys-bang-gia-option .col-md-7 .item .thumb {
    width: 100%;
    height: auto;
    position: absolute;
    top: -50px;
    left: 0;
}

.mys-bang-gia-option .col-md-7 .item .thumb .icon {
    width: 100px;
    height: 100px;
    margin: auto;
}

.mys-bang-gia-option .col-md-7 .item .thumb .icon img {
    width: 100%;
    height: 100%;
}

img {
    display: inline-block;
    vertical-align: middle;
    border-style: none;
    max-width: 100%;
    height: auto;
    object-fit: cover;
}

.mys-bang-gia-option .col-md-7 .item .title {
    width: 100%;
    height: auto;
    text-align: center;
    text-transform: uppercase;
    color: #856404;
    font-weight: 600;
    font-size: 17px;
    padding: 15px 0;
}

.mys-bang-gia-option .col-md-7 .item p {
    width: 100%;
    height: auto;
    color: #856404;
    font-size: 16px;
    line-height: 25px;
}

.mys-bang-gia-option .col-md-7 .item .link {
    width: 100%;
    height: auto;
    text-align: center;
    margin: 20px 0;
    position: absolute;
    left: 0;
    bottom: 0;
}

.mys-bang-gia-option .col-md-7 .item .link a {
    background: #f17d59;
    color: #FFF;
    padding: 8px 20px;
    border-radius: 20px;
}

td,
th {
    padding: 1rem .6rem .7rem;
    text-align: inherit;
    font-size: 14px;
}

tr {
    border-bottom: 1px solid #e1e1e1;
}

article {
    display: block;
}

main {
    display: block;
}

p {
    margin-bottom: 15px;
}

.inner-content-post h2 {
    font-size: 16px;
}

h1,
h2,
h3,
h4,
h5,
h6,
h1 a,
h2 a,
h3 a,
h4 a,
h5 a,
h6 a {
    color: #111111;
    font-weight: 600;
    margin-bottom: 12px;
    line-height: 1.25;
}

table {
    border-collapse: collapse;
    margin: 0 0 2.5rem;
    width: 100%;
    background-color: transparent;
    border-spacing: 0;
}
</style>