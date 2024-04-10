<!-- import section -->
<script setup>
import { Icon } from '@iconify/vue';
import ROUTES from '../../../../../constants'
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
                                        <input type="text" class="form-control" name="username" placeholder="Tên đăng nhập"
                                            v-model="username" value="" required>
                                            <Icon class="bx-icon" icon="bx:user-circle" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="fullname" placeholder="Tên đầy đủ"
                                            v-model="fullname" value="" required>
                                            <Icon class="bx-icon" icon="bx:user" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="email" placeholder="Email"
                                            v-model="email" value="" required>
                                            <Icon class="bx-icon" icon="bx:mail-send" />
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" name="password"
                                            v-model="password" placeholder="Mật khẩu" value="" required>
                                        <Icon class="bx-icon" icon="bxs:lock-open-alt" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="address" placeholder="Địa chỉ"
                                            v-model="address" value="" required>
                                            <Icon class="bx-icon" icon="entypo:address" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="phone" placeholder="Số điện thoại"
                                            v-model="phone" value="" required>
                                            <Icon class="bx-icon" icon="bxs:phone" />
                                    </div>
                                    <div class="form-group">
                                        <select class="form-control" v-model="inventory" required name="substore">
                                            <option label="Chọn kho hàng" value="">Chọn kho hàng</option>
                                            <option label="[1] Thịnh Liệt, Hoàng Mai, HN" value="1">[1] Thịnh Liệt,
                                                Hoàng Mai, HN</option>
                                            <option label="[2] Mộ Lao, Hà Đông - Hà Nội" value="2">[2] Mộ Lao, Hà Đông -
                                                Hà Nội</option>
                                            <option label="[3] Yên Hòa - Cầu Giấy - Hà Nội" value="6">[3] Yên Hòa - Cầu
                                                Giấy - Hà Nội</option>
                                            <option label="[4] Phạm Văn Bạch, Tân Bình, HCM" value="3">[4] Phạm Văn
                                                Bạch, Tân Bình, HCM</option>
                                            <option label="[5] Trường Sa, Quận 3, HCM" value="4">[5] Trường Sa, Quận 3,
                                                HCM</option>
                                            <option label="[6] Phường 14, Quận 10, HCM" value="7">[6] Phường 14, Quận
                                                10, HCM</option>
                                            <option label="[7] Thanh Khê Đông, Quận Thanh Khê, ĐN" value="5">[7] Thanh
                                                Khê Đông, Quận Thanh Khê, ĐN</option>
                                        </select>
                                        <Icon class="bx-icon" icon="bx:chevron-down" />
                                    </div>
                                    <div class="form-group-submit">
                                        <input @click="submit" class="btn btn-danger" name="save" value="Đăng ký">
                                        <div class="mys-dash">
                                            <span>Hoặc</span>
                                        </div>
                                        <router-link
                                            to="/login">
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
            username: '',
            email: '',
            fullname: '',
            address: '',
            password: '',
            phone: '',
            inventory: '',
        }
    },
    methods: {
        submit() {
            console.log(process.env.BASE_URL)
            this.$emit('submit', {});
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
    -webkit-appearance: none;
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

.page-my-account form .form-group-submit .mys-dash:after, .page-my-account form .form-group-submit .mys-dash:before {
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

</style>