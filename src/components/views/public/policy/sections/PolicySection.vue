<!-- import section -->
<script setup>
import { Icon } from "@iconify/vue";
import Sidebar from "../../../../common/Sidebar.vue";
import ApiCaller from "../../../../utils/ApiCaller";
import ROUTES from "../../../../../constants/routeDefine";
import CONSTANT from "../../../../../constants/constants";
</script>

<!-- template section -->
<template>
    <main id="main" class="main-content home">
        <div class="content-default content-archive-wapper">
            <div class="container">
                <div class="row">
                    <div class="content-layout content-blog col-12 col-md-8 col-lg-9">
                        <div class="inner-content-post">
                            <div class="inner-content-info">
                                <div class="entry-post-title">
                                    <h1 class="entry-title mt-0 mb-0">
                                        Chính sách nhập hàng
                                    </h1>
                                </div>
                            </div>
                            <div class="entry-content clearfix">
                                <div v-html="content?.body" style="font-size: 14px;">
                                </div>
                                <br>

                                <p dir="ltr" style="
										margin-top: 0pt;
										margin-bottom: 0pt;
										line-height: 1.38;
										text-align: justify;
									">
                                    &nbsp;
                                </p>

                                <p dir="ltr" style="
										margin-top: 0pt;
										margin-bottom: 0pt;
										line-height: 1.38;
										text-align: justify;
									">
                                    &nbsp;
                                </p>
                                <div style="
										margin: 0 auto;
										margin-top: 20px;
										clear: both;
										width: 100%;
									">
                                    <div style="
											margin: auto;
											border-radius: -4px; /* padding: 0 0 15px 0; */ /* box-shadow: rgba(0, 8, 0, 1) 3px 2px 8px; */
											border: 2px solid #0096ff !important;
											margin-bottom: 25px;
										">
                                        <div style="background: #0096ff">
                                            <p style="
													padding: 5px;
													color: #fff;
													text-align: center;
													font-size: 18px;
													font-weight: bold;
													text-transform: uppercase;
													margin-top: 0px;
													margin-bottom: 0;
												">
                                                <span style="color: #ffffff"><strong>Đăng Ký Tài
                                                        Khoản</strong></span>
                                            </p>
                                        </div>
                                        <div style="
												/* margin: 5px; */
												font-size: 15px;
												line-height: 22px;
												padding: 15px;
												color: #383838;
											">
                                            <p style="text-align: justify">
                                                Đăng kí tham gia OrderChina24h
                                                ngay để được tư vẫn miễn phí về
                                                tìm nguồn hàng, nhập hàng từ
                                                Trung Quốc về Việt Nam.
                                            </p>
                                            <p style="
													text-align: center;
													margin-top: 20px;
												">
                                                <router-link to="/register">
                                                    <Icon icon="bx:log-in" style="margin-right: 10" />
                                                    ĐĂNG KÝ NGAY
                                                </router-link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="single-post-related">
                                <h2 class="heading-title mt-0">
                                    <span>Bài Viết Liên Quan</span>
                                </h2>
                                <div class="bingo-blogs">
                                    <ul class="related-list">
                                        <li class="item">
                                            <h4 class="entry-title mt-0">
                                                <a title="Dịch vụ mua hộ hàng trung quốc uy tín, giá rẻ [#2024]"
                                                    href="/dich-vu-mua-ho-hang-trung-quoc-uy-tin-duoc-hon-5-trieu-khach-hang-tin-dung/">Dịch
                                                    vụ mua hộ hàng trung
                                                    quốc uy tín, giá rẻ [#2024]
                                                    <span class="time_dt">
                                                        <Icon icon="bx:time" />
                                                        2019-10-16
                                                    </span></a>
                                            </h4>
                                        </li>
                                        <li class="item">
                                            <h4 class="entry-title mt-0">
                                                <a title="Dịch vụ ký gửi hàng Trung Quốc về Việt Nam uy tín nhất"
                                                    href="/dich-vu-ky-gui-hang-hoa-trung-quoc-ve-viet-nam-uy-tin-nhat/">Dịch
                                                    vụ ký gửi hàng Trung
                                                    Quốc về Việt Nam uy tín nhất
                                                    <span class="time_dt">
                                                        <Icon icon="bx:time" />
                                                        2019-10-16
                                                    </span></a>
                                            </h4>
                                        </li>
                                        <li class="item">
                                            <h4 class="entry-title mt-0">
                                                <a title="#1 Cách mua hàng trên Taobao về Việt Nam [Tự order]"
                                                    href="/cach-mua-hang-tren-taobao-ve-viet-nam-don-gian-nhat/">#1 Cách
                                                    mua hàng trên
                                                    Taobao về Việt Nam [Tự
                                                    order]
                                                    <span class="time_dt">
                                                        <Icon icon="bx:time" />
                                                        2019-11-21
                                                    </span></a>
                                            </h4>
                                        </li>
                                        <li class="item">
                                            <h4 class="entry-title mt-0">
                                                <a title="Cách mua hàng trên 1688, order về Việt Nam #2024"
                                                    href="/cach-mua-hang-tren-1688-order-ve-viet-nam/">Cách mua hàng
                                                    trên 1688,
                                                    order về Việt Nam #2024
                                                    <span class="time_dt">
                                                        <i class="bx bx-time" aria-hidden="true">
                                                        </i>
                                                        2019-12-11</span></a>
                                            </h4>
                                        </li>
                                        <li class="item">
                                            <h4 class="entry-title mt-0">
                                                <a title="Nhập hàng Trung Quốc chính ngạch về Việt Nam [2024]"
                                                    href="/nhap-hang-trung-quoc-chinh-ngach-ve-viet-nam/">Nhập hàng
                                                    Trung Quốc chính
                                                    ngạch về Việt Nam [2024]
                                                    <span class="time_dt">
                                                        <i class="bx bx-time" aria-hidden="true">
                                                        </i>
                                                        2023-05-13</span></a>
                                            </h4>
                                        </li>
                                        <li class="item">
                                            <h4 class="entry-title mt-0">
                                                <a title="Mua hàng trên Wechat, thanh toán hộ, order nhanh chóng"
                                                    href="/mua-hang-tren-wechat-thanh-toan-ho-order-nhanh-chong/">Mua
                                                    hàng trên Wechat, thanh
                                                    toán hộ, order nhanh chóng
                                                    <span class="time_dt">
                                                        <Icon icon="bx:time" />
                                                        2023-06-23
                                                    </span></a>
                                            </h4>
                                        </li>
                                    </ul>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <Sidebar></Sidebar>
                </div>
            </div>
        </div>
    </main>
</template>

<!-- function defined -->
<script>
export default {
    name: "PolicySection",
    data() {
        return {
            content: null,
        };
    },
    mounted() {
        this.getContent();
    },
    methods: {
        async getContent() {
            const loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.Article.findByCode, { code: CONSTANT.ARTICLE.POLICY })
            loader.hide();
            this.content = res.data;
        }
    },
};
</script>

<!-- style custom -->
<style scoped>
.main-content {
    padding: 0rem 0 4rem;
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

.inner-content-post {
    padding: 1rem 1.5rem;
    background: #fff;
    border: 1px solid #e1e1e1;
}

.inner-content-info {
    margin-bottom: 1rem;
    padding-bottom: .5rem;
    border-bottom: 1px solid #e1e1e1;
}

.single-post-related {
    margin-top: 2rem;
}

.inner-content-post .inner-content-info .entry-title {
    margin-bottom: 10px;
    font-size: 20px;
}

.inner-content-post .inner-content-info .post-meta {
    margin-top: .5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 14px;
}

.inner-content-info .post-meta>div b {
    font-style: italic;
    font-weight: 500;
    color: #f17d80;
}

.inner-content-post .inner-content-info .post-meta>div {
    font-style: italic;
}

.inner-content-post .inner-content-info .post-meta-date {
    margin-left: 2rem;
    margin-top: 1rem;
    font-size: 14px;
}

.single-post-related {
    margin-top: 4rem;
}

.single-post-related .heading-title {
    margin-bottom: 1rem;
    font-size: 1.6rem;
    border-bottom: 1px solid #f17d80;
    text-align: left;
}

.single-post-related .heading-title span {
    display: inline-block;
    padding: .3rem .7rem .2rem;
    background: #f17d80;
    font-size: 20px;
    color: #fff;
}

.single-post-related .related-list {
    margin-bottom: 0;
}

.single-post-related .related-list .item:not(:last-child) {
    margin-bottom: 5px;
}

.single-post-related .related-list .entry-title {
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.time_dt {
    font-size: 13px;
    font-weight: 400;
    font-style: italic;
    color: #888;
    margin-left: 5px;
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

ul,
li,
span,
i {
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
