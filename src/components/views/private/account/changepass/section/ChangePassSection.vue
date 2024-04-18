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
                            <form class="form-horizontal" method="post" action="">

                                <div class="form-group">
                                    <label class="control-label col-sm-2">Mật khẩu </label>
                                    <div class="col-sm-6">
                                        <input class="input form-control" name="pass1" type="password" required="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-2" for="pass2">Xác nhận mật khẩu</label>
                                    <div class="col-sm-6">
                                        <input class="input form-control" name="pass2" type="password" id="pass2"
                                            required="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-offset-2 col-sm-6">
                                        <input type="submit" class="btn btn-danger" name="updatepass"
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

        }
    },
    created() {

    },
    methods: {

    }
}
</script>

<!-- style custom -->
<style scoped>
@import '../../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../../assets/styles/private-styles.css';

</style>