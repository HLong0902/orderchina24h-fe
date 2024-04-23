<!-- import section -->
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
                <div class="col-md-12 container">
                    <div class="page-my-account register-page-wrapper">
                        <div class="heading-form-page">
                            <h2 class="page-title">Đăng ký thành viên</h2>
                        </div>
                        <!-- h4 class="text-center">Hoặc đăng ký tài khoản </h4 -->
                        <div class="dangkytaikhoan">
                            <form class="form-horizontal" action="https://muahang.nhaphangchina.vn/register"
                                method="post" role="form">
                                <div class="full">
                                    <div class="form-group">
                                        <input type="text" class="form-control disable-input" name="username"
                                            placeholder="Tên đăng nhập" :value="username" readonly>
                                        <Icon class="bx-icon" icon="bx:user-circle" />
                                    </div>
                                    <div v-if="errors.username" class="bubble-message">{{ errors.username }}</div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="fullname" placeholder="Tên đầy đủ"
                                            @input="onChangeEmail" v-model="fullname" value="" required>
                                        <Icon class="bx-icon" icon="bx:user" />
                                    </div>
                                    <div v-if="errors.fullname" class="bubble-message">{{ errors.fullname }}</div>
                                    <div class="form-group">
                                        <input type="text" id="email" class="form-control" name="email"
                                            placeholder="Email" v-model="email" value="" required>
                                        <Icon class="bx-icon" icon="bx:mail-send" />
                                    </div>
                                    <div v-if="errors.email" class="bubble-message">{{ errors.email }}</div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" name="password" v-model="password"
                                            placeholder="Mật khẩu" value="" required>
                                        <Icon class="bx-icon" icon="bxs:lock-open-alt" />
                                    </div>
                                    <div v-if="errors.password" class="bubble-message">{{ errors.password }}</div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="address" placeholder="Địa chỉ"
                                            v-model="address" value="" required>
                                        <Icon class="bx-icon" icon="entypo:address" />
                                    </div>
                                    <div v-if="errors.address" class="bubble-message">{{ errors.address }}</div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="phone" placeholder="Số điện thoại"
                                            v-model="phone" value="" required>
                                        <Icon class="bx-icon" icon="bxs:phone" />
                                    </div>
                                    <div v-if="errors.phone" class="bubble-message">{{ errors.phone }}</div>
                                    <div class="form-group">
                                        <select class="form-control" v-model="inventory" required name="substore">
                                            <option label="Chọn kho hàng" value="">Chọn kho hàng</option>
                                            <option v-for="item in listInventories" :key="item.id" :value="item.id">
                                                [{{ item.id }}] - {{ item.name }}, {{ item.location }}
                                            </option>
                                        </select>
                                        <Icon class="bx-icon" icon="bx:chevron-down" />
                                    </div>
                                    <div class="form-group-submit">
                                        <input @click="submit" class="btn btn-danger" name="save" value="Đăng ký">
                                        <div class="mys-dash">
                                            <span>Hoặc</span>
                                        </div>
                                        <router-link to="/login">
                                            <Icon icon="bx:log-in" style="margin-right: 10;" />
                                            Đăng nhập tài khoản
                                        </router-link>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
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
    name: 'RegisterSection',
    data() {
        return {
            email: '',
            username: '',
            fullname: '',
            address: '',
            password: '',
            phone: '',
            inventory: '',
            errors: {},
            listInventories: [],
        }
    },
    created() {
        this.getListInventories();
    },
    watch: {
        email($) {
            this.updateUsername($);
            this.validateForm();
        },
        fullname($) {
            this.validateForm();
        },
        address($) {
            this.validateForm();
        },
        phone($) {
            this.phone = this.phone.replace(/ /g,'');
            this.validateForm();
        },
        password($) {
            this.validateForm();
        }
    },
    computed: {
        hasErrors() {
            return Object.keys(this.errors).length > 0;
        }
    },
    methods: {
        mounted() {
            this.updateUsername(this.email);
            this.$toast.clear();
        },
        async updateUsername(email) {
            this.username = this.email.split('@')[0];
        },
        validateForm() {
            this.errors = {};

            if (!this.fullname)
                this.errors.fullname = 'Tên đầy đủ là bắt buộc';
            
            if (!this.address)
                this.errors.address = 'Địa chỉ là bắt buộc';

            if (!this.phone)
                this.errors.phone = 'Số điện thoại là bắt buộc';
            else if (!this.isValidPhone(this.phone))
                this.errors.phone = 'Số điện thoại không đúng định dạng.';

            if (!this.email) {
                this.errors.email = 'Email là bắt buộc.';
            } else if (!this.isValidEmail(this.email)) {
                this.errors.email = 'Địa chỉ email không hợp lệ.';
            }

            if (!this.password) {
                this.errors.password = 'Mật khẩu là bắt buộc.';
            } else if (this.password.length < 6) {
                this.errors.password = 'Mật khẩu phải lớn hơn 6 ký tự.';
            }
        },
        isValidEmail(email) {
            return REGEX.EMAIL_PATTERN.test(email);
        },
        isValidPhone(phone) {
            return REGEX.PHONE_PATTERN.test(phone);
        },
        async getListInventories() {
            const res = await ApiCaller.get(ROUTES.Inventory.findAll);
            this.listInventories = res.data;
        },
        async submit() {
            this.validateForm();
            if (!this.hasErrors) {
                const payload = {
                    username: this.username,
                    fullName: this.fullname,
                    email: this.email,
                    password: this.password,
                    address: this.address,
                    phone: this.phone,
                    inventoryId: this.inventory,
                }
                const res = await ApiCaller.post(ROUTES.Auth.register, payload);
                debugger
                if (res.status == 200) {
                    this.$router.push({ path: '/login' })
                    this.$toast.success(`Tạo tài khoản ${res.data.username} thành công`, {
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
    padding-top: 3rem;
    padding-bottom: 4rem;
    background-image: url(https://muahang.nhaphangchina.vn/static/images/banner-account.jpg);
    -webkit-background-size: cover;
    background-size: cover;
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

.page-my-account form .form-group .form-control.disable-input {
    background: #cfcfcf;
    opacity: 0.7;
}

.page-my-account form .form-group .form-control.disable-input::placeholder {
    color: #a7a7a7;
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
</style>../../../../../constants/routeDefine