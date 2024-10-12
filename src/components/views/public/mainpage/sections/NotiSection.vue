<script setup></script>

<!-- template section -->
<template>
  <section v-for="(item, idx) in articles" v-if="isVisible">
    <div :id="idx" class="popup">
      <div class="centered-content" style="position: relative">
        <h3 style="background-color: #f17d59; border-radius: 5px 5px 0 0">
          &nbsp; THÔNG BÁO
        </h3>
        <div class="inner-content-post">
          <div class="entry-content clearfix">
            <div style="font-size: 14px" v-html="item.body"></div>
          </div>
          <button
            class="btn float-right"
            style="
              position: absolute;
              background-color: #f17d59;
              right: 0;
              border-radius: 5px;
              margin-top: -6px;
              margin-right: 1px;
            "
            @click="toggleVisibility(idx)"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<!-- function defined -->
<script>
import ApiCaller from "../../../../utils/ApiCaller.js";
import ROUTES from "../../../../../constants/routeDefine.js";

export default {
  name: "NotiSection",
  data() {
    return {
      isVisible: true,
      articles: [],
      bankInfo: {},
    };
  },
  mounted() {
    this.getListArticles();
  },
  methods: {
    async toggleVisibility(idx) {
      document.getElementById(idx).style.display = "none";
    },
    async getListArticles() {
      const loader = this.$loading.show();
      const res = await ApiCaller.get(ROUTES.Article.homePage);
      loader.hide();
      console.log("----");
      if (res.status !== 200) {
        this.$toast.error(`${res.data.message}`, {
          title: "Thông báo",
          position: "top-right",
          autoHideDelay: 7000,
        });
        return;
      }
      this.articles = res.data;
    },
  },
};
</script>

<!-- style custom -->
<style scoped>
.popup {
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  align-content: center;
}

.centered-content {
  position: relative;
  width: fit-content;
  min-width: 40%;
  margin: auto;
  background-size: contain;
  background-color: white;
  border-radius: 5px;
}

/*Ipad dọc(768 x 1024)*/
@media screen and (max-width: 768px) {
  .centered-content {
    width: 92%;
    height: 10%;
    margin-left: 2%;
    position: absolute !important;
    top: 2%;
  }
}
</style>
