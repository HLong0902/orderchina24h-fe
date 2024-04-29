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
                                    Cấp độ VIP
                                </h2>
                            </div>
                            <div class="info-boxs" style="background: #faa423; color: white;">
                                <span class="info-box-icon"><fa class="fa-icon" icon="usd"></fa></span>
                                <div class="info-box-content">
                                    <span class="info-box-text text-bold">VIP 0</span>
                                    <span class="info-box-number"> 0đ</span>
                                    <div class="progress progress-sm active" style="margin-bottom: 5px; ">
                                        <div class="progress-bar progress-bar-success progress-bar-striped"
                                            role="progressbar" aria-valuenow="progress" aria-valuemin="0"
                                            aria-valuemax="100" ng-style="{width: progress+'%'}" style="width: 0%;">
                                        </div>
                                    </div>
                                    <span class="progress-description text-black text-right" style="opacity: 0.7;">VIP
                                        1: 100,000,000đ</span>
                                </div>
                            </div>
                            <div class="box box-chipo info-account">
                                <div class="box-header with-border">
                                    <h3 class="box-title text-bold"><fa class="fa-icon" icon="star"></fa> Thông tin tích luỹ</h3>
                                </div>
                                <div class="box-body box-table">
                                    <table class="cu-table cu-table-bordered cu-table-striped" style="max-width: 100%">
                                        <thead>
                                            <tr>
                                                <th width="40%"></th>
                                                <th width="40%" class="text-center">Cấp hiện tại</th>
                                                <th width="20%" class="text-center">Cấp tiếp theo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class=" text-bold">Cấp độ</td>
                                                <td class="text-center text-bold">VIP 0</td>
                                                <td class="text-center text-bold">VIP 1</td>
                                            </tr>
                                            <tr>
                                                <td class=" text-bold">Chiết khấu phí dịch vụ</td>
                                                <td class="text-center text-bold">-0%</td>
                                                <td class="text-center text-bold">-5%</td>
                                            </tr>
                                            <!-- <tr>
						<td class=" text-bold">Chiết khấu phí vận chuyển</td>
						<td class="text-center text-bold">-0%</td>
						<td class="text-center text-bold">-0%</td>
					</tr> -->
                                            <tr>
                                                <td class=" text-bold">Chiết khấu % đặt cọc</td>
                                                <td class="text-center text-bold">-70%</td>
                                                <td class="text-center text-bold">-70%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="box box-chipo info-account">
                                <div class="box-header with-border">
                                    <h3 class="box-title text-bold"><fa class="fa-icon" icon="history" aria-hidden="true"></fa>
                                        Điểm tích lỹ gần đây</h3>
                                </div>
                                <div class="box-body box-table">
                                    <table class="cu-table cu-table-bordered cu-table-striped" style="max-width: 100%">
                                        <thead>
                                            <tr>
                                                <th width="10%" class="text-center">STT</th>
                                                <th width="40%" class="text-center">Mã đơn hàng</th>
                                                <th width="50%" class="text-center">Tổng tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                    <div class="pag">
                                    </div>
                                    <p><strong>Total: <span class="green">0</span> (Đơn hàng)</strong></p>
                                </div>
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
    name: 'VipSection',
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