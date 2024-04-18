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
                                    Tra cứu mã vận đơn
                                </h2>
                            </div>
                            <div rel="body" class="contentPopup" style="padding:20px;">
                                <form name="findShip" action="" method="get" class="form-horizontal"
                                    enctype="multipart/form-data">
                                    <div class="input col-sm-6">
                                        <input type="text" class="form-control " value="" name="shipid"
                                            placeholder="Nhập mã vận đơn cần tra cứu">
                                    </div>
                                    <div class="button">
                                        <input type="submit" value="Tra cứu" class="btn bg_yellow">
                                    </div>
                                </form>
                                <div class="clearfix"></div>
                                <p class="note">Nhập mã vận đơn và nhấn tra cứu để biết tình trạng vận chuyển của gói
                                    hàng.</p>
                            </div>


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
    name: 'FinShipSection',
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