<script setup>
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
                                    Thông tin tài khoản
                                </h2>
                            </div>
                            <form class="form-horizontal" method="post" action="">

                                <div class="form-group">
                                    <label class="control-label col-sm-2">Tài khoản</label>
                                    <div class="col-sm-6">
                                        <input class="input form-control" name="username" type="text"
                                            :value="info.username" readonly="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="email">E-mail</label>
                                    <div class="col-sm-6">
                                        <input class="input form-control" name="email" type="text" id="email"
                                            :value="info.email" readonly="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2">Họ và tên</label>
                                    <div class="col-sm-6">
                                        <input class="input form-control" name="fullname" type="text"
                                            :value="info.fullName">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="phone">Điện thoại</label>
                                    <div class="col-sm-6">
                                        <input class="input form-control" name="phone" type="text" id="phone"
                                            :value="promptPhone()">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="address">Địa chỉ</label>
                                    <div class="col-sm-6">
                                        <textarea name="address" class="input form-control" id="address"></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="address">Địa đểm nhận hàng</label>
                                    <div class="col-sm-6">
                                        <select id="store" name="store" class="form-control"
                                            onchange="loadSubStore(this.value)" required="">
                                            <option value="0" selected="">Hà Nội</option>
                                            <option value="1">Sài Gòn</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-offset-2 col-sm-6">
                                        <input type="submit" class="btn btn-danger" name="update" value="Lưu thông tin">
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
import CommonUtils from '../../../../../utils/CommonUtils';

export default {
    name: 'ProfileSection',
    data() {
        return {
            info: '',
        }
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        promptPhone() {
            return CommonUtils.getUserDTO().phone;
        },
        async getInfo() {
            const loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.User.info);
            this.info = res.data;
            loader.hide();
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