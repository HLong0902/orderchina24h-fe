<!-- import section -->
<script setup>
import { Icon } from '@iconify/vue';
import ApiCaller from '../../../../utils/ApiCaller';
import ROUTES from '../../../../../constants/routeDefine';
import REGEX from '../../../../../constants/regexDefine';
import VueCookie from 'vue-cookie';
import StorageManager from '../../../../utils/StorageManager';
</script>

<!-- template section -->
<template>
  <div id="content">
    <main class="main" role="main">
      <div class="row main-row account-page login">
        <div class="col-md-12 container">
          <div class="dangkytaikhoan dangnhap page-my-account login-page-wrapper">
            <div class="heading-form-page">
              <h2 class="title">
                Đăng nhập tài khoản
              </h2>
            </div>
            <div class="content-form content-form-login">
              <form action="/login" method="post" class="form_dangnhap">
                <div class="form-group">
                  <label for="username">Tài khoản Hoặc Email</label>
                  <input type="text" name="username" value="" placeholder="Tài khoản Hoặc Email" v-model="username"
                    class="form-control" v-on:keyup.enter="submit" autofocus v-focus>
                  <Icon class="bx-icon" icon="bxs:user" />
                </div>
                <div v-if="errors.username" class="bubble-message">{{ errors.username }}</div>
                <div class="form-group">
                  <label for="password">Mật khẩu</label>
                  <input type="password" v-model="password" v-on:keyup.enter="submit" name="password"
                    placeholder="Mật Khẩu" class="form-control">
                  <Icon class="bx-icon" icon="bxs:lock-open-alt" />
                </div>
                <div v-if="errors.password" class="bubble-message">{{ errors.password }}</div>
                <!--<div class="g-recaptcha" data-sitekey="6LciVWEUAAAAAJ-uNC1YpswmFwr2NDp9dg1HF8li"></div>-->
                <div class="resetpass">
                  <router-link to="/forgot-pass" class="forgot-password">Quên mật khẩu ?</router-link>
                </div>
                <div class="form-group-submit">
                  <input @click="submit" v-on:keyup.enter="submit" class="btn btn-danger" name="login"
                    value="Đăng nhập">
                  <div class="mys-dash">
                    <span>Hoặc</span>
                  </div>
                  <router-link to="/register">Đăng Ký Tài Khoản</router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<!-- function defined -->
<script>
export default {
  name: 'LoginSection',
  data() {
    return {
      username: '',
      password: '',
      errors: {},
    }
  },
  mounted() {
    localStorage.removeItem('staffInfo');
    localStorage.removeItem('jwtToken');
  },
  watch: {
    password($) {
      this.validateForm();
    },
    username($) {
      this.validateForm();
    },
  },
  computed: {
    hasErrors() {
      return Object.keys(this.errors).length > 0;
    }
  },
  methods: {
    async submit() {
      this.validateForm();
      if (!this.hasErrors) {
        let loader = this.$loading.show();
        const payload = {
          username: this.username,
          password: this.password,
        }
        const res = await ApiCaller.post(ROUTES.Auth.login, payload);
        loader.hide();
        if (res.status == 200) {
          if (res.data.userDTO.role != null && res.data.userDTO.role != 0) {
            this.$toast.error(`Thông tin tài khoản không chính xác, vui lòng đăng nhập lại.`, {
              title: 'Thông báo',
              position: 'top-right',
              autoHideDelay: 7000,
            })
            return;
          }
          StorageManager.sessionStore('jwtToken', res.data.token);
          VueCookie.set("x-order-china24h", res.data.token)
          StorageManager.store('userDto', JSON.stringify(res.data.userDTO));
          this.$router.push({ path: '/manage/dashboard' })
        } else {
          if (res.data.message == 'INVALID_CREDENTIALS') {
            this.$toast.error(`Thông tin mật khẩu không chính xác, vui lòng thử lại.`, {
              title: 'Thông báo',
              position: 'top-right',
              autoHideDelay: 7000,
            })
          } else {
            this.$toast.error(`${res.data.message}`, {
              title: 'Thông báo',
              position: 'top-right',
              autoHideDelay: 7000,
            })
          }
        }
      }
    },
    validateForm() {
      this.errors = {};

      if (!this.username)
        this.errors.username = 'Tên đăng nhập / Email là bắt buộc';

      if (!this.password) {
        this.errors.password = 'Mật khẩu là bắt buộc.';
      }
    },
    isValidEmail(email) {
      return REGEX.EMAIL_PATTERN.test(email);
    },
  }
}
</script>

<!-- style custom -->
<style scoped>
.account-page {
  padding-top: 6rem;
  padding-bottom: 8rem;
  background-image: url(/login-bg.png);
  -webkit-background-size: cover;
  background-size: cover;
}

.container {
  max-width: 1200px;
}

.page-my-account {
  max-width: 30rem;
  padding-left: 15px;
  padding-right: 15px;
  margin: 0 auto;
}

.page-my-account .heading-form-page {
  margin-bottom: 2rem;
}

.page-my-account .heading-form-page h2 {
  display: inline-flex;
  position: relative;
  padding-bottom: .5rem;
  margin-bottom: 0;
  color: #fff;
  font-weight: 500;
  font-size: 20px;
}

.page-my-account .heading-form-page h2:after {
  content: '';
  width: 2.5rem;
  height: 2px;
  background: #f17d59;
  position: absolute;
  left: 0;
  bottom: 0;
}

.page-my-account form .form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.page-my-account form .form-group label {
  color: #fff;
  font-size: 14px;
}

.page-my-account form .form-group .bx-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 1rem;
  position: absolute;
  margin-bottom: .7rem;
  margin-right: .7rem;
  right: 0;
  color: #555555;
  bottom: 0;
}

.page-my-account form .form-group .form-control {
  height: 3rem;
  padding-right: 2.5rem;
  background: #f9f9f9;
  border: 1px solid #e1e1e1;
  padding: .5rem 1rem;
  font-size: 14px;
}

.page-my-account form .form-group-submit {
  display: flex;
  flex-wrap: wrap;
}

.page-my-account form .form-group-submit .btn {
  flex: 0 0 100%;
  max-width: 100%;
  height: 50px;
  background: #f17d59;
  border-radius: 0;
}


.resetpass {
  text-align: right;
}


.resetpass a {
  color: #fff;
  font-size: 14px;
}

input[type=submit] {
  font-family: Roboto;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  color: #fff;
  background: #2980b9;
  border: 0;
  cursor: pointer;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

.page-my-account form .form-group-submit .mys-dash {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 100%;
  max-width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.page-my-account form .form-group-submit .mys-dash:after,
.page-my-account form .form-group-submit .mys-dash:before {
  content: '';
  flex: 1;
  height: 1px;
  background: #e1e1e1;
}

.page-my-account form .form-group-submit .mys-dash span {
  padding-left: .5rem;
  padding-right: .5rem;
  color: #e1e1e1;
}


.page-my-account form .form-group-submit a {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 100%;
  max-width: 100%;
  font-size: 14px;
  height: 3rem;
  background: #3c555d;
  color: #fff;
}

.form-control {
  border-radius: 0;
}

.bubble-message {
  position: relative;
  background-color: #f44336;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  bottom: .75rem;
  left: 0;
}

input[type=text] {
  color: #282d3b;
  background: #f9f9f9;
  border: 1px solid #e1e1e1;
  padding: .5rem 1rem;
  width: 100%;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
}

input {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  overflow: visible;
}

main {
  display: block;
}

form label {
  font-weight: 500 !important;
}

label {
  display: block;
  font-weight: 700;
  color: #212529;
  margin-bottom: 1rem;
}
</style>