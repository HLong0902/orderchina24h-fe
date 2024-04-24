<script setup>
import CommonUtils from '../../../../../utils/CommonUtils';
import ApiCaller from '../../../../../utils/ApiCaller';
import ROUTES from '../../../../../../constants/routeDefine';
</script>

<!-- template section -->
<template>
    <div id="content">
        <div class="container">
            <main class="main" role="main">
                <div class="row main-row">
                    <div class="col-sm-9">
                        <div class="cart-by-page">
                            <div class="titles">
                                <h2 class="page-title">
                                    Thay đổi mật khẩu
                                </h2>
                            </div>
                            <form @submit.prevent="handleSubmit" class="form-horizontal" method="post" action="">

                                <div class="form-group">
                                    <label class="control-label col-sm-2">Mật khẩu hiện tại</label>
                                    <div class="col-sm-6">
                                        <input v-model="oldPassword" class="input form-control" name="pass1" type="password" required="">
                                        <div v-if="errors.oldPassword" class="bubble-message">{{ errors.oldPassword }}</div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2">Mật khẩu mới </label>
                                    <div class="col-sm-6">
                                        <input v-model="password" class="input form-control" name="pass1" type="password" required="">
                                        <div v-if="errors.password" class="bubble-message">{{ errors.password }}</div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="pass2">Xác nhận mật khẩu mới</label>
                                    <div class="col-sm-6">
                                        <input v-model="confirmPassword" class="input form-control" name="pass2" type="password" id="pass2"
                                            required="">
                                            <div v-if="errors.confirmPassword" class="bubble-message">{{ errors.confirmPassword }}</div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-offset-2 col-sm-6">
                                        <input @click="submit" type="submit" class="btn btn-danger" name="updatepass"
                                            value="Đổi mật khẩu">
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'ChangePassSection',
    data() {
        return {
            oldPassword: '',
            password: '',
            confirmPassword: '',

            errors:{},
        }
    },
    watch: {
        oldPassword($) {
            this.validateForm();
        },
        password($) {
            this.validateForm();
        },
        confirmPassword($) {
            this.validateForm();
        }
    },
    computed: {
        hasErrors() {
            return Object.keys(this.errors).length > 0;
        }
    },
    methods: {
        validateForm() {
            this.errors = {};

            if (!this.oldPassword) {
                this.errors.oldPassword = 'Mật khẩu hiện tại là bắt buộc.';
            }

            if (!this.password) {
                this.errors.password = 'Mật khẩu mới là bắt buộc.';
            } else if (this.password.length < 6) {
                this.errors.password = 'Mật khẩu mới phải lớn hơn 6 ký tự.';
            } else if (this.password == this.oldPassword) {
                this.errors.password = 'Mật khẩu mới phải khác mật khẩu hiện tại';
            }

            if(this.confirmPassword.length > 0 && this.confirmPassword != this.password) {
                this.errors.confirmPassword = '\'Xác nhận mật khẩu mới\' phải trùng với \'Mật khẩu mới\''
            }
        },
        async submit() {
            this.validateForm();
            if (!this.hasErrors) {
                const payload = {
                    email: CommonUtils.getUserDTO().email,
                    oldPassword: this.oldPassword,
                    newPassword: this.password,
                }
                const res = await ApiCaller.post(ROUTES.Auth.changePass, payload);
                if (res.status == 200) {
                    this.$toast.success(`Thay đổi mật khẩu thành công`, {
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
@import '../../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../../assets/styles/private-styles.css';

</style>