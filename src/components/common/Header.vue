<script setup>
import { Icon } from '@iconify/vue';
</script>

<script>
export default {
  name: 'Header',
  data() {
    return {
      navbarItems: [
        { id: 1, label: 'TRANG CHỦ', link: '/' },
        { id: 2, label: 'GIỚI THIỆU', link: '/about' },
        {
          id: 4, label: 'BẢNG GIÁ', link: '/prices', options: [
            { id: 41, label: 'Bảng giá hàng order, mua hộ Trung Quốc', link: '/prices/team', showOptions: false },
            { id: 42, label: 'Bảng giá kí gửi hàng Trung Quốc', link: '/prices/mission', showOptions: false },
            { id: 43, label: 'Bảng giá vận chuyển chính ngạch Trung Quốc', link: '/prices/mission', showOptions: false }
          ]
        },
        {
          id: 5, label: 'HƯỚNG DẪN', link: '/instructions', options: [
            { id: 51, label: 'Hướng dẫn tải App Android', link: '/instructions/team', showOptions: false },
            { id: 52, label: 'Hướng dẫn tải App iOS', link: '/instructions/mission', showOptions: false }
          ]
        },
        { id: 7, label: 'CHÍNH SÁCH', link: '/policies' }
      ]
    };
  },
  /**
   * constructor
   */
  created() {

  },
  /**
   * defined methods
   */
  methods: {
    toggleOptions(item) {
      item.showOptions = !item.showOptions;
    },
    collapseOptions(item) {
      item.showOptions = false;
    }
  }
};
</script>

<template>
  <div class="header-nav">
    <div class="header-top header-top-wrapper">
      <div class="container">
        <div class="row">
          <div class="header-top-left col-12 col-md-6">
            <div class="exchange-rate">
              <Icon icon="bx:bxs-dollar-circle" style="margin-right: 10;" />
              <p>Tỷ giá: <span>3.580</span></p>
            </div>
            <div class="hotline">
              <Icon icon="bx:support" style="margin-right: 10;" />
              <p>Hotline: <span>0384.550.304</span></p>
            </div>
          </div>
          <div class="header-top-right col-12 col-md-6">
            <div class="my-account">
              <div class="login">
                <a href="https://muahang.nhaphangchina.vn/login" rel="nofollow">
                  <Icon icon="bxs:user-detail" style="margin-right: 10;" />
                  Đăng Nhập
                </a>
              </div>
              <div class="dash">|</div>
              <div class="resgister">
                <a rel="nofollow"
                  href="https://muahang.nhaphangchina.vn/register?utm_source=direct&amp;utm_medium=trang-chu&amp;utm_campaign=trang-chu&amp;utm_term=trang-chu&amp;utm_content=trang-chu">
                  <Icon icon="bx:log-in" style="margin-right: 10;" />
                  Đăng ký
                </a>
              </div>
            </div>
            <div class="cart">
              <a rel="nofollow" href="https://muahang.nhaphangchina.vn/cart">
                <Icon icon="bxs:cart" style="margin-right: 10;" />
                Giỏ Hàng
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-header-wrapper">
      <div class="container">
        <div class="row">
          <div class="header-left col-8 col-md-3">
            <div class="logo">
              <a href="/" title="Trang chủ">
                <img src="https://nhaphangchina.vn/images/logo_china.png" alt="Vận chuyển hàng Trung Quốc">
              </a>
            </div>
          </div>
          <div class="header-right col-4 col-md-9">
              <!-- NAVBAR HERE -->
              <ul class="navbar header-top-right">
                <li v-for="item in navbarItems" :key="item.id">
                  <a class="nav-item" :href="item.link" @mouseover="toggleOptions(item)" @mouseout="collapseOptions(item)">{{ item.label }}</a>
                  <ul class="dropdown-menu dropdown-list" v-if="item.options && item.options.length" :class="{ 'show': item.showOptions }">
                    <li v-for="option in item.options" :key="option.id">
                      <a class="nav-item" :href="option.link">{{ option.label }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.container {
  font-size: 14px;
  max-width: 65vw;
}

.navbar {
  list-style-type: none;
  font-weight: 500;
  padding-top: 1rem;
  font-size: 11pt;
}

.navbar > li > ul {
  list-style-type: none;
}

.navbar > li > a {
  color: #ffffff;
  padding-right: 1.2rem;
}

.nav-item:link { 
  text-decoration: none; 
} 
.nav-item:visited { 
  text-decoration: none; 
} 
.nav-item:hover { 
  text-decoration: none; 
} 
.nav-item:active { 
  text-decoration: none; 
}

.header-nav {
  background-color: #3c555d;
}

.header-top-left,
.header-top-left .exchange-rate,
.header-top-left .hotline,
.header-top-right,
.header-top-right .my-account,
.header-top-right .my-account>div a,
.main-header-wrapper .header-menu {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.main-header-wrapper {
  height: 14vh;
}

.header-top {
  background: rgba(0, 0, 0, .2);
  background-color: #364c54;
  display: flex;
}

.header-top-left {
  color: #fff
}

.header-top-left>div {
  min-height: 2.5rem;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  border-left: 1px solid rgba(255, 255, 255, .1)
}

.header-top-left>div:last-child {
  border-right: 1px solid rgba(255, 255, 255, .1)
}

.header-top-left>div span {
  color: #f17d80
}

.header-top-left p {
  margin-bottom: 1px
}

.header-top-left i.bx {
  margin-right: 1rem
}

.header-top-right {
  justify-content: flex-end
}

.header-top-right .my-account {
  height: 100%;
  padding: 0 2rem;
  background: rgba(255, 255, 255, .1)
}

.header-top-right .my-account .dash {
  padding: 0 1rem;
  color: #fff
}

.header-top-right .my-account>div i.bx {
  font-size: 1.6rem;
  margin-right: 1rem
}

.header-top-right .my-account>div a {
  color: #fff
}

.header-top-right .my-account>div a:hover {
  color: #f17d80
}

.header-top-right .cart {
  margin-left: 1.5rem
}

.header-top-right .cart a {
  color: #fff
}

.header-top-right .cart a:hover {
  color: #f17d80
}

.main-header-wrapper {
  padding: 1.5rem 0
}

.main-header-wrapper .header-menu {
  justify-content: flex-end;
  height: 100%
}

.main-header-wrapper .br-icon-menu {
  display: none;
  font-size: 3rem;
  color: #fff;
  line-height: 1;
}

.dropdown-list {
  width: fit-content;
  padding: 1rem;
  font-size: 11pt; 
  background-color: #ec663d;
  color: #fff;
}
.dropdown-list > li {
  padding: 3px;
}
</style>
