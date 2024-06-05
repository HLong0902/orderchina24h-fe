<script setup>
import { Icon } from '@iconify/vue';
import ApiCaller from '../../../../utils/ApiCaller';
import ROUTES from '../../../../../constants/routeDefine';
import REGEX from '../../../../../constants/regexDefine';
import StorageManager from '../../../../utils/StorageManager';
</script>

<!-- template section -->
<template>
    <div style="padding-top:100px; min-width: 100vh;">
        <h2 class="align-center">Staff Login</h2>
        <form @submit.prevent="handleSubmit" class="align-center" method="POST">
            <input type="hidden" name="ci_csrf_token" value="">
            <div class="group-input">
                <input placeholder="Username" type="text" v-model="username" name="txt_username">
            </div>
            <div v-if="errors.username" class="bubble-message">{{ errors.username }}</div>
            <div class="group-input">
                <input placeholder="Password" type="password" v-model="password" name="txt_password">
            </div>
            <div v-if="errors.password" class="bubble-message">{{ errors.password }}</div>
            <!--<div style="width: 200px; margin: 0 auto;" class="group-input"><div class="g-recaptcha" data-sitekey="6LciVWEUAAAAAJ-uNC1YpswmFwr2NDp9dg1HF8li"></div></div>-->
            <input @click="submit" v-on:keyup.enter="submit" type="submit" name="btn_login" value="Login">
        </form>
    </div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'StaffLoginSection',
    data() {
        return {
            username: '',
            password: '',
            errors: {},
        }
    },
    watch: {
        password($) {
            this.validateForm();
        },
        username($) {
            this.validateForm();
        },
    },
    mounted() {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('jwtToken');
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
                    if (res.data.userDTO.role == null || res.data.userDTO.role == 0) {
                        this.$toast.error(`Thông tin tài khoản không chính xác, vui lòng đăng nhập lại.`, {
                            title: 'Thông báo',
                            position: 'top-right',
                            autoHideDelay: 7000,
                        })
                        return;
                    }
                    StorageManager.sessionStore('jwtToken', res.data.token);
                    StorageManager.store('staffInfo', JSON.stringify(res.data.userDTO));
                    this.$router.push({ path: '/staff/dashboard' })
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
    },

}
</script>

<!-- style custom -->
<style scoped>
@import '../../../../../assets/styles/staff-styles.css';

.bubble-message {
    position: relative;
    color: #f44336;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.8rem;
    bottom: .75rem;
    left: 0;
}
</style>