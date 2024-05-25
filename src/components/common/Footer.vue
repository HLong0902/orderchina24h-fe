<script setup>
/**
 * import section
 */
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';
</script>

<script>
/**
 * full function section
 */
export default {
   name: 'Footer',
   data() {
      return {

      }
   },
   created() {

   },
   methods: {

   },
   mounted() {
      // Load the Facebook SDK asynchronously
      (function (d, s, id) {
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) { return; }
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v13.0&appId=YOUR_APP_ID&autoLogAppEvents=1";
         fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
   }
}
</script>

<template>
   <footer class="footer-wrapper">
      <div class="main-footer enable-gradient">
         <div class="container">
            <div class="row">
               <div class="col-12 col-md-6 col-lg-4">
                  <div class="widget-contact">
                     <div class="widget-title">
                        <h4 class="title">Thông tin liên hệ</h4>
                     </div>
                     <div class="item-list">
                        <div class="item">
                           <div class="address">
                              <h5>Kho Hà Nội</h5>
                              <Icon class="icon" icon="bx:home-alt" />
                              <div class="address-content">
                                 <p>Hữu Hoà - Thanh Trì - Hà Nội</p>
                              </div>
                           </div>
                           <div class="phone">
                              <Icon class="icon" icon="bx:phone-call" />032.687.6636
                           </div>
                           <div class="phone">
                              <Icon class="icon" icon="octicon:mail-16" />orderchina24h.vn@gmail.com
                           </div>
                        </div>
                        <div class="item">
                           <div class="address">
                              <h5>Kho Trung Quốc</h5>
                              <Icon class="icon" icon="bx:home-alt" />
                              <div class="address-content">
                                 <p>广西壮族自治区崇左市凭祥市</p>
                              </div>
                           </div>
                           <div class="phone">
                              <Icon class="icon" icon="bx:phone-call" />032.687.6636
                           </div>
                           <div class="phone">
                              <Icon class="icon" icon="octicon:mail-16" />orderchina24h.vn@gmail.com
                           </div>
                        </div>

                     </div>
                  </div>
               </div>
               <div class="col-12 col-md-6 col-lg-4">
                  <div class="row">
                     <div class="d-flex menu-col-2 col-12">
                        <div class="widget-menu-1 flex-50">
                           <div class="widget-title">
                              <h4 class="title">Về Chúng Tôi</h4>
                           </div>
                           <div class="menu-ve-chung-toi-container">
                              <ul id="footer-menu-1" class="footer-menu-1 list-style-type">
                                 <li id="menu-item-293"
                                    class="menu-item menu-item-type-custom menu-item-object-custom menu-item-293">
                                    <RouterLink to="/gioi-thieu-ve-nhap-hang-china/">
                                       Giới Thiệu
                                    </RouterLink>
                                 </li>
                                 <li id="menu-item-295"
                                    class="menu-item menu-item-type-custom menu-item-object-custom menu-item-295"><a
                                       href="/danh-muc-tin-tuc">Tin Tức</a></li>
                                 <li id="menu-item-296"
                                    class="menu-item menu-item-type-custom menu-item-object-custom menu-item-296">
                                    <router-link to="/danh-muc-chinh-sach">Chính Sách Bảo Mật</router-link>
                                 </li>
                                 <li id="menu-item-297"
                                    class="menu-item menu-item-type-custom menu-item-object-custom menu-item-297">
                                    <router-link to="/danh-muc-chinh-sach">Chính Sách Khiếu Nại</router-link>
                                 </li>
                              </ul>
                           </div>
                        </div>
                        <div class="widget-menu-2 flex-50">
                           <div class="widget-title">
                              <h4 class="title">Chăm Sóc Khách Hàng</h4>
                           </div>
                           <div class="menu-cham-soc-khach-hang-container">
                              <ul id="footer-menu-2" class="footer-menu-2 list-style-type">
                                 <li id="menu-item-294"
                                    class="menu-item menu-item-type-custom menu-item-object-custom menu-item-294">
                                    <router-link
                                       to="/huong-dan-tai-va-dang-ky-tai-khoan-tai-app-mua-hang-trung-quoc-nhchina-nhap-hang-china">Hướng
                                       Dẫn</router-link>
                                 </li>
                                 <li id="menu-item-299"
                                    class="menu-item menu-item-type-custom menu-item-object-custom menu-item-299">
                                    <router-link
                                       to="/huong-dan-tai-va-dang-ky-tai-khoan-tai-app-mua-hang-trung-quoc-nhchina-nhap-hang-china">Hướng
                                       dẫn tạo tài
                                       khoản</router-link>
                                 </li>
                                 <li id="menu-item-300"
                                    class="menu-item menu-item-type-custom menu-item-object-custom menu-item-300">
                                    <router-link
                                       to="/huong-dan-tai-va-dang-ky-app-mua-hang-trung-quoc-nhap-hang-china-tren-ios">Hướng
                                       dẫn nạp tiền</router-link>
                                 </li>
                                 <li id="menu-item-301"
                                    class="menu-item menu-item-type-custom menu-item-object-custom menu-item-301">
                                    <router-link to="/danh-muc-chinh-sach">Trả hàng &amp; vận chuyển</router-link>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div class="footer-socials col-12">
                        <a href="https://www.facebook.com/profile.php?id=100090809792385" rel="nofollow"
                           target="_blank">
                           <Icon class="icon" icon="bxl:facebook" />
                        </a>
                        <a href="#" target="_blank">
                           <Icon class="icon" icon="bxl:twitter" />
                        </a>
                        <a href="#" target="_blank">
                           <Icon class="icon" icon="bxl:instagram" />
                        </a>
                        <a href="#" target="_blank">
                           <Icon class="icon" icon="bxl:youtube" />
                        </a>
                     </div>
                     <div class="col-12">
                        <a target="_blank" rel="nofollow"
                           href="https://www.dmca.com/Protection/Status.aspx?ID=128cf177-fbc9-4de8-a197-8e755718db0f&amp;refurl=https://OrderChina24H.vn/"
                           title="DMCA.com Protection Status" class="dmca-badge"> <img
                              src="https://images.dmca.com/Badges/_dmca_premi_badge_4.png?ID=128cf177-fbc9-4de8-a197-8e755718db0f"
                              alt="DMCA.com Protection Status"></a>
                     </div>

                  </div>
               </div>
               <div class="col-12 col-md-12 col-lg-4">
                  <div class="widget-fanpage">
                     <div class="fb-page fb_iframe_widget"
                        data-href="https://www.facebook.com/profile.php?id=100090809792385" data-tabs="messages"
                        data-width="561" data-height="305" data-small-header="false" data-adapt-container-width="true"
                        data-hide-cover="false" data-show-facepile="true" fb-xfbml-state="rendered"
                        fb-iframe-plugin-query="adapt_container_width=true&amp;app_id=&amp;container_width=370&amp;height=305&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100090809792385;locale=vi_VN&amp;sdk=joey&amp;show_facepile=true&amp;small_header=false&amp;tabs=messages&amp;width=561">
                        <span style="vertical-align: bottom; width: 370px; height: 305px;"><iframe
                              name="f12df3bb39af9e697" width="561px" height="305px"
                              data-testid="fb:page Facebook Social Plugin" title="fb:page Facebook Social Plugin"
                              frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no"
                              allow="encrypted-media"
                              src="https://www.facebook.com/v5.0/plugins/page.php?adapt_container_width=true&amp;app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df2edb9453f1e27cd6%26domain%3DOrderChina24H.vn%26is_canvas%3Dfalse%26origin%3Dhttps%3A%2F%2Forderchina24h.vn%2Ff5f8118f8f858bf9f%26relation%3Dparent.parent&amp;container_width=370&amp;height=305&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100090809792385;locale=vi_VN&amp;sdk=joey&amp;show_facepile=true&amp;small_header=false&amp;tabs=messages&amp;width=561"
                              style="border: none; visibility: visible; width: 370px; height: 305px;"
                              class=""></iframe></span>
                     </div>
                  </div>
                  <div class="widget-extension">
                     <div class="extension-content">
                        <div class="extension-item">
                           <a href="https://chromewebstore.google.com/detail/extension-order-china-24h/olhhmicighhhfokcaafaagokgpdhmoch?hl=en-US&utm_source=ext_sidebar"
                              title="Extension Google Chrome" target="_blank" rel="nofollow">
                              <img src="/chrome.png" alt="Extension Google Chrome">
                              <span class="txt">Tải về cho trình duyệt <br><b>Google Chrome</b></span>
                           </a>
                        </div>
                        <div class="extension-item">
                           <a href="https://chromewebstore.google.com/detail/extension-order-china-24h/olhhmicighhhfokcaafaagokgpdhmoch?hl=en-US&utm_source=ext_sidebar"
                              title="Extension CốcCốc" target="_blank" rel="nofollow">
                              <img src="/coccoc.png" alt="Extension CốcCốc">
                              <span class="txt">Tải về cho trình duyệt <br><b>Cốc Cốc</b></span>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </footer>
</template>

<style scoped>
footer {
   display: block;
}

.footer-wrapper .main-footer {
   background: url(/footer.png);
   background-position: center;
   background-size: cover;
   background-attachment: fixed;
   background-color: #f17d59;
   color: #ffffff;
   padding: 7rem 0 1rem;
   position: relative;
   color: #fff;
   z-index: 1;
}

.footer-wrapper .main-footer.enable-gradient:before {
   content: '';
   background: rgba(0, 0, 0, .8);
   position: absolute;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   z-index: 2;
}

.container {
   max-width: 1200px;
}

.row>div {
   z-index: 3;
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

.footer-wrapper .main-footer .widget-title {
   margin-bottom: 3rem;
}

.footer-wrapper .main-footer .widget-title .title {
   position: relative;
   padding-bottom: 1rem;
   font-size: 16px;
}

.footer-wrapper .main-footer .widget-title .title:before {
   content: '';
   width: 3rem;
   height: 2px;
   background: #fff;
   position: absolute;
   bottom: 0;
   left: 0;
}

.footer-wrapper .main-footer .widget-contact .item:not(:last-child) {
   margin-bottom: 3rem;
   font-size: 14px;
}

.footer-wrapper .main-footer .widget-contact .item h5 {
   width: 100%;
   font-size: 16px;
   margin-bottom: .2rem;
}

.footer-wrapper .main-footer .widget-contact .item .address>div {
   display: inline-flex;
   flex-direction: column;
   /* flex-wrap: wrap; */
   width: 80%;
   /* align-items: flex-start; */
}

.footer-wrapper .main-footer .widget-contact .item .icon {
   -webkit-box-flex: 0;
   -ms-flex: 0 0 22px;
   max-width: 22px;
   flex: 0 0 22px;
   font-size: 2.2rem;
   margin-right: 0.5rem;
}

a:link {
   text-decoration: none;
   color: #ffffff;
}

a:visited {
   text-decoration: none;
   color: #ffffff;
}

a:hover {
   text-decoration: none;
   color: #ffffff;
}

a:active {
   text-decoration: none;
   color: #ffffff;
}

.footer-wrapper .footer-socials {
   margin-top: 3rem;
   display: flex;
   flex-wrap: wrap;
}

.footer-wrapper .footer-socials a {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   margin-right: 1rem;
   margin-bottom: 1rem;
   width: 40px;
   height: 40px;
   font-size: 2rem;
   background: #363636;
}

.menu-ve-chung-toi-container,
.menu-cham-soc-khach-hang-container {
   font-size: 14px;
   padding-right: 2rem;
}

.menu-ve-chung-toi-container>ul>li,
.menu-cham-soc-khach-hang-container>ul>li {
   margin-bottom: 0.5rem;
}

.footer-wrapper .widget-extension .extension-content {
   display: flex;
   flex-wrap: wrap;
   padding-top: 1.5rem;
}

ul {
   list-style-type: none;
   padding-left: 0rem;
}

.footer-wrapper .main-footer .widget-extension .extension-item {
   padding-left: 15px;
   padding-right: 15px;
   margin-bottom: 15px;
   display: flex;
   flex-wrap: wrap;
   align-items: center;
}

.footer-wrapper .main-footer .widget-extension .extension-item a {
   padding: 1rem 2rem 1rem 1rem;
   background: #363636;
   border-radius: 999px;
   line-height: 1.5;
   display: flex;
}

.footer-wrapper .main-footer .widget-extension .extension-item img {
   width: 50px;
   margin-right: 2rem;
}
</style>