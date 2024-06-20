<script setup>
import ApiCaller from '../../../../../utils/ApiCaller';
import ROUTES from '../../../../../../constants/routeDefine';
import { useCommonStore } from '../../../../../../store/CommonStore';
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
                            <form @submit.prevent="handleSubmit" class="form-horizontal" method="post" action="">

                                <div class="form-group">
                                    <label class="control-label col-sm-2">Tài khoản</label>
                                    <div class="col-sm-6">
                                        <input class="input form-control" name="username" type="text"
                                            v-model="info.username" readonly="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="email">E-mail</label>
                                    <div class="col-sm-6">
                                        <input class="input form-control" name="email" type="text" id="email"
                                            v-model="info.email" readonly="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2">Họ và tên</label>
                                    <div class="col-sm-6">
                                        <input class="input form-control" name="fullname" type="text"
                                            v-model="info.fullName">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="phone">Điện thoại</label>
                                    <div class="col-sm-6">
                                        <input class="input form-control" name="phone" type="text" id="phone"
                                            v-model="info.phone">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="address">Địa chỉ</label>
                                    <div class="col-sm-6">
                                        <textarea name="address" class="input form-control"
                                            v-model="info.address"></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="address">Kho nhận hàng</label>
                                    <div class="col-sm-6">
                                        <span class="green">KHO HN</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="address">Địa đểm nhận hàng</label>
                                    <div class="col-sm-6">
                                        <select v-model="info.inventoryId" name="store" class="form-control">
                                            <option :value="null">Chọn kho</option>
                                            <option v-for="item in commonStore.inventories" :key="item.id"
                                                :value="item.id">
                                                [{{ item.id }}] - {{ item.name }}, {{ item.location }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-offset-2 col-sm-6">
                                        <input @click="updateInfo" type="submit" class="btn btn-danger" name="update"
                                            value="Lưu thông tin">
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
            commonStore: useCommonStore(),
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
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                return;
            }
            this.info = res.data;
            loader.hide();
        },
        async updateInfo() {
            const link = ROUTES.User.updateInfo(this.info.id)
            const loader = this.$loading.show();
            const res = await ApiCaller.put(link, this.info);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(`Cập nhật thông tin thành công`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                this.getInfo();
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
</script>

<!-- style custom -->
<style scoped>
@import '../../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../../assets/styles/private-styles.css';
</style>