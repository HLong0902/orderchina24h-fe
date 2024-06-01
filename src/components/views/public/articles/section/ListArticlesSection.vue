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
                <div class="row has-sidebar">
                    <div class="content-archive content-layout col-12 col-md-8 col-lg-9">
                        <div class="row">
                            <article v-for="(item, index) in articles" class="column col-12 col-sm-6 col-lg-4">
                                <div class="type-post status-publish format-standard hentry">
                                    <div class="post-image">
                                        <a style="background-image: url('/public/sample.png');">
                                        </a>
                                    </div>
                                    <div class="post-content">
                                        <div class="post-content-wrapper">
                                            <h4 class="entry-title mt-0">
                                                <a>{{ item.title }}</a>
                                            </h4>
                                            <div class="post-excerpt" v-html="item.body.substring(0, 200)">
                                            </div>
                                            <div class="mys-button button-post">
                                                <a @click="viewDetail(item.id)">Xem
                                                    Chi Tiết</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
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
            articles: [],
        };
    },
    mounted() {
        this.getListArticles();
    },
    methods: {
        async getListArticles() {
            const loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.Article.findAll);
            loader.hide();
            this.articles = res.data;
            this.articles = this.articles.filter($ => !CONSTANT.DEFAULT_ARTICLE.includes($.code))
        },
        viewDetail(id) {
            window.open(
                this.$router.resolve({
                    name: "ViewArticlePage",
                    params: { article_id: id },
                }).href,
                "_blank"
            );
        },
    },
};
</script>

<!-- style custom -->
<style scoped>
@import "../../../../../assets/styles/public-styles.css";

.main-content {
    padding: 3.5rem 0 4rem !important;
}

.container {
    max-width: 1200px !important;
}

.row {
    display: -webkit-box !important;
    display: -ms-flexbox !important;
    display: flex !important;
    -ms-flex-wrap: wrap !important;
    flex-wrap: wrap !important;
    margin-right: -15px !important;
    margin-left: -15px !important;
}

.inner-content-post {
    padding: 1rem 1.5rem !important;
    background: #fff !important;
    border: 1px solid #e1e1e1 !important;
}

.mys-button.button-post {
    font-weight: 300;
    font-size: 14px;
}

.mys-button.button-post>a {
    background-color: #f17d59 !important;
    color: #fff !important;
    padding: .4rem 1rem !important;
}

.entry-title {
    font-size: 18px !important;
}

.post-excerpt {
    font-size: 14px !important;
}

.inner-content-info {
    margin-bottom: 1rem !important;
    padding-bottom: .5rem !important;
    border-bottom: 1px solid #e1e1e1 !important;
}

.single-post-related {
    margin-top: 2rem !important;
}

.inner-content-post .inner-content-info .entry-title {
    margin-bottom: 10px !important;
    font-size: 20px !important;
}

.inner-content-post .inner-content-info .post-meta {
    margin-top: .5rem !important;
    display: flex !important;
    flex-wrap: wrap !important;
    align-items: center !important;
    font-size: 14px !important;
}

.inner-content-info .post-meta>div b {
    font-style: italic !important;
    font-weight: 500 !important;
    color: #f17d80 !important;
}

.inner-content-post .inner-content-info .post-meta>div {
    font-style: italic !important;
}

.inner-content-post .inner-content-info .post-meta-date {
    margin-left: 2rem !important;
    margin-top: 1rem !important;
    font-size: 14px !important;
}

.single-post-related {
    margin-top: 4rem !important;
}

.single-post-related .heading-title {
    margin-bottom: 1rem !important;
    font-size: 1.6rem !important;
    border-bottom: 1px solid #f17d80 !important;
    text-align: left !important;
}

.single-post-related .heading-title span {
    display: inline-block !important;
    padding: .3rem .7rem .2rem !important;
    background: #f17d80 !important;
    font-size: 20px !important;
    color: #fff !important;
}

.single-post-related .related-list {
    margin-bottom: 0 !important;
}

.single-post-related .related-list .item:not(:last-child) {
    margin-bottom: 5px !important;
}

.single-post-related .related-list .entry-title {
    margin-bottom: 0 !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

.time_dt {
    font-size: 13px !important;
    font-weight: 400 !important;
    font-style: italic !important;
    color: #888 !important;
    margin-left: 5px !important;
}

img {
    display: inline-block !important;
    vertical-align: middle !important;
    border-style: none !important;
    max-width: 100% !important;
    height: auto !important;
    object-fit: cover !important;
}

b,
strong {
    font-weight: 700 !important;
    font-size: 14px !important;
}

p {
    margin-bottom: 15px !important;
    font-size: 14px !important;
}

ul,
li,
span,
i {
    font-size: 14px !important;
}

aside {
    display: block !important;
}

h4,
a {
    color: #111111 !important;
    font-weight: 600 !important;
}

li {
    line-height: 1.75 !important;
    white-space: inherit !important;
}

main {
    display: block !important;
}

article {
    display: block !important;
}

ul {
    padding: 0 0 15px 15px !important;
}
</style>
