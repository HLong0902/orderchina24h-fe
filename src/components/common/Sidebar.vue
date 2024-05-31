<!-- import section -->
<script setup>
import { Icon } from '@iconify/vue';
</script>

<!-- template section -->
<template>
    <div class="sidebar col-12 col-md-4 col-lg-3">
        <div class="main-sidebar">
            <aside class="widget-mys-support">
                <h5 class="widget-title">Hỗ trợ khách hàng</h5>
                <div class="support-content row">
                    <div class="item col-6">
                        <a href="http://zalo.me/096.247.1688" target="_blank" rel="nofollow"><img src="/zalo.png"
                                alt="Hỗ trợ khách hàng"></a>
                        <div class="item-info">
                            <b>Ms. Việt</b>
                            <p>032.687.6636</p>
                        </div>
                    </div>
                    <div class="item col-6">
                        <a href="http://zalo.me/086.285.4976" target="_blank" rel="nofollow"><img src="/zalo.png"
                                alt="Hỗ trợ khách hàng"></a>
                        <div class="item-info">
                            <b>Ms. Ngọc</b>
                            <p>035.537.4881</p>
                        </div>
                    </div>
                </div>
            </aside>
            <aside class="widget-extension">
                <h5 class="widget-title">Extension Đặt hàng</h5>
                <div class="extension-content">
                    <p class="desc">Công cụ đặt hàng taobao, 1688 trên Chrome tiện lợi và nhanh
                        chóng</p>
                    <div class="item-ext">
                        <div class="item">
                            <a href="https://chromewebstore.google.com/detail/extension-order-china-24h/olhhmicighhhfokcaafaagokgpdhmoch?hl=en-US&utm_source=ext_sidebar"
                                title="Extension Google Chrome" target="_blank" rel="nofollow">
                                <img src="/chrome.png" alt="Extension Google Chrome">
                            </a>
                        </div>
                        <div class="item">
                            <a href="https://chromewebstore.google.com/detail/extension-order-china-24h/olhhmicighhhfokcaafaagokgpdhmoch?hl=en-US&utm_source=ext_sidebar"
                                title="Extension CốcCốc" target="_blank" rel="nofollow">
                                <img src="/coccoc.png" alt="Extension CốcCốc">
                            </a>
                        </div>
                        <span class="caption">(Lưu ý chỉ sử dụng trên máy tính)</span>
                    </div>
                </div>
            </aside>
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
/* sidebar */
.main-sidebar aside:not(:last-child) {
    margin-bottom: 4rem;
    text-align: center;
}

.main-sidebar .widget-mys-support {
    padding: 1rem;
    border: 1px solid #e1e1e1;
}

.main-sidebar aside {
    background: #fff;
}

.main-sidebar .widget-title {
    border-color: #f17d59;
}

.main-sidebar .widget-title {
    position: relative;
    padding-left: .7rem;
    margin-bottom: 2rem;
    border-left: 3px solid #f17d59;
    font-size: 18px;
}

.main-sidebar .widget-title:before {
    content: '';
    height: 1px;
    background: #e1e1e1;
    position: absolute;
    right: 0;
    bottom: -10px;
    left: 0;
}

.main-sidebar .widget-mys-support .support-content {
    text-align: center;
}

.main-sidebar .widget-mys-support .support-content .item a {
    display: block;
    margin-bottom: .2rem;
}

/* extensions */
.main-sidebar .widget-extension {
    border-color: #e1e1e1;
    padding: 1rem;
    border: 1px solid #e1e1e1;
}

.main-sidebar .widget-title {
    border-color: #f17d59;
    position: relative;
    padding-left: .7rem;
    margin-bottom: 2rem;
    border-left: 3px solid #f17d59;
}

.main-sidebar .widget-title:before {
    background-color: #e1e1e1;
    content: '';
    height: 1px;
    background: #e1e1e1;
    position: absolute;
    right: 0;
    bottom: -10px;
    left: 0;
}

.main-sidebar .widget-extension .extension-content {
    text-align: center;
    font-weight: 300;
}

.main-sidebar .widget-extension .extension-content .item-ext {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
}

.main-sidebar .widget-extension .extension-content .item-ext .item {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 50%;
    max-width: 50%;
    flex: 0 0 50%;
    padding: 0 1rem;
}

.main-sidebar .widget-extension .extension-content .caption {
    color: #898989;
    margin-top: .5rem;
    font-size: 13px;
    font-style: italic;
}

img {
    display: inline-block;
    vertical-align: middle;
    border-style: none;
    max-width: 100%;
    height: auto;
    object-fit: cover;
}

b,
strong {
    font-weight: 700;
    font-size: 14px;
}

p {
    margin-bottom: 15px;
    font-size: 14px;
}

aside {
    display: block;
}

h4,
a {
    color: #111111;
    font-weight: 600;
}

li {
    line-height: 1.75;
    white-space: inherit !important;
}

main {
    display: block;
}

article {
    display: block;
}

ul {
    padding: 0 0 15px 15px;
}
</style>