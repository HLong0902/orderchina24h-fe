<script setup>
import { Icon } from '@iconify/vue';
import ROUTES from '../../../../../constants/routeDefine'
import ApiCaller from '../../../../utils/ApiCaller'
import REGEX from '../../../../../constants/regexDefine';
</script>

<!-- template section -->
<template>
    <div id="content">
        <main class="main" role="main">
            <div class="row main-row account-page login">
                <div class="col-sm-12 container">

                    <div class="row">
                        <div style="height:100px;clear: both;"></div>
                        <div class="col-sm-6 col-md-offset-3 page-my-account">

                            <div class="heading-form-page">
                                <h2 class="title">Lấy lại mật khẩu</h2>
                            </div>
                            <!-- h4 class="text-center">Hoặc đăng ký tài khoản </h4 -->

                            <div class="dangkytaikhoan">

                                <form class="form-horizontal" method="post" role="form">
                                    <div class="reset_password">
                                        <div class="form-group">
                                            <input type="text" v-model="email" class="form-control" name="email"
                                                placeholder="Username hoặc email ...">
                                        </div>
                                        <div v-if="errors.email" class="bubble-message">{{ errors.email }}</div>

                                        <div class="form-group pull-left">
                                            <input @click="submit" class="btn btn-danger forgotpart" name="save"
                                                value="Lấy lại mật khẩu">
                                        </div>
                                        <div class="mys-dash">
                                            <span>Hoặc</span>
                                        </div>
                                        <router-link class="reset-login" to="/login">Đăng nhập</router-link>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div style="height:100px;clear: both;"></div>
                    </div>


                </div>

            </div>
        </main>
    </div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'ForgotPassSection',
    data() {
        return {
            email: '',
            errors: {},
        }
    },
    watch: {
        email($) {
            this.validateForm();
        },
    },
    computed: {
        hasErrors() {
            return Object.keys(this.errors).length > 0;
        }
    },
    created() {

    },
    methods: {
        mounted() {
            this.$toast.clear();
        },
        validateForm() {
            this.errors = {};

            if (!this.email) {
                this.errors.email = 'Email là bắt buộc.';
            } else if (!this.isValidEmail(this.email)) {
                this.errors.email = 'Địa chỉ email không hợp lệ.';
            }
        },
        isValidEmail(email) {
            return REGEX.EMAIL_PATTERN.test(email);
        },
        async submit() {
            this.validateForm();
            if (!this.hasErrors) {
                let loader = this.$loading.show();
                const payload = {
                    email: this.email,
                }
                const res = await ApiCaller.post(ROUTES.Auth.forgotPass, payload);
                loader.hide()
                if (res.status == 200) {
                    this.$router.push({ path: '/login' })
                    this.$toast.success(`Mật khẩu mới đã được gửi về mail của bạn`, {
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
    }
}
</script>

<!-- style custom -->
<style scoped>
.account-page {
    padding-top: 6rem;
    padding-bottom: 8rem;
    background-image: url(https://muahang.nhaphangchina.vn/static/images/banner-account.jpg);
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

.page-my-account form .form-group {
    margin-bottom: 1.5rem;
}

.btn.btn-danger.forgotpart {
    background-color: #f17d59;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: #fff;
    border: 0 !important;
    border-radius: 0px;
    cursor: pointer;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
}

.mys-dash {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 100%;
    max-width: 100%;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.mys-dash:before {
    content: '';
    flex: 1;
    height: 1px;
    background: #e1e1e1;
}

.mys-dash:after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e1e1e1;
}

.mys-dash span {
    padding-left: 1rem;
    padding-right: 1rem;
    color: #e1e1e1;
}

a.reset-login {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 100%;
    max-width: 100%;
    height: 2.5rem;
    background: #3c555d;
    color: #fff;
}

.forgotpart {
    width: 100%;
    padding: 5px 0px;
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