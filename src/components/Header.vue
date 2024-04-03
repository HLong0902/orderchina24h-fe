<script setup>
import { ref } from 'vue'
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
        { id: 3, label: 'DỊCH VỤ', link: '/services' },
        {
          id: 4, label: 'BẢNG GIÁ', link: '/prices', options: [
            { id: 41, label: 'Our Team', link: '/prices/team', showOptions: false },
            { id: 42, label: 'Mission', link: '/prices/mission', showOptions: false }
          ]
        },
        {
          id: 5, label: 'HƯỚNG DẪN', link: '/instructions', options: [
            { id: 51, label: 'Our Team', link: '/instructions/team', showOptions: false },
            { id: 52, label: 'Mission', link: '/instructions/mission', showOptions: false }
          ]
        },
        { id: 6, label: 'KINH NGHIỆM', link: '/experiences' },
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
      debugger
      item.showOptions = !item.showOptions;
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
                  <a class="nav-item" :href="item.link" @click.prevent="toggleOptions(item)">{{ item.label }}</a>
                  <ul v-if="item.options && item.options.length" :class="{ 'show': item.showOptions }">
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
  max-width: 75vw;
}

.navbar {
  list-style-type: none;
  font-weight: 600;
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
  align-items: center
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
  line-height: 1
}

@media (max-width: 74.9375em) {
  .header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end
  }

  .main-header-wrapper .header-menu {
    display: none
  }

  .main-header-wrapper .br-icon-menu {
    display: inline-flex
  }
}

@media (max-width: 47.9375em) {
  .header-top {
    display: none
  }

  .header-top-left {
    display: none
  }

  .header-top-right {
    min-height: 5rem
  }
}
</style>
