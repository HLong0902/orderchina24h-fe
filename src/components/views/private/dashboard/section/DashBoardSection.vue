<template>
    <div class="content-wrapper" style="min-height: 763px;">
        <div>
            <section class="content">
                <div class="row">
                    <div class="box box-chipo pd15 box-deposit">
                        <div class="clearfix  alert alert-warning">
                            <h5 class="text-center"><span>Mọi thắc mắc quý khách vui lòng liên hệ nhân viên kinh doanh
                                    <b>Nguyễn Thùy Dương</b> đang hỗ trợ tài khoản của quý khách:</span></h5>
                            <div class="support-content margin container">
                                <!--<div class="col-md-4"></div>-->
                                <div class="col-md-8 col-offset-left-2">
                                    <div class="item">
                                        <a href="http://zalo.me/0862758810" target="_blank" rel="nofollow">
                                            <img src="https://nhaphangchina.vn/images/zalo.png" alt="Hỗ trợ khách hàng">
                                        </a>
                                        <div class="item-info">
                                            <b>Nguyễn Thùy Dương</b>
                                            <p>0862758810</p>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <a href="tel://0862758810" target="_blank" rel="nofollow">
                                            <img src="https://nhaphangchina.vn/images/phone.png"
                                                alt="Hỗ trợ khách hàng">
                                        </a>
                                        <div class="item-info">
                                            <b>Nguyễn Thùy Dương</b>
                                            <p>0862758810</p>
                                        </div>
                                    </div>
                                    <div class="item item2">
                                        <button type="button" class="btn btn-default btn-meh"><fa icon="face-meh"
                                                style="font-size: 24px; padding-right: 8px;"></fa><span>Đổi nhân
                                                viên</span></button>

                                    </div>
                                </div>
                                <!--<div class="col-md-4"></div>-->
                                <div class="col-md-8 col-offset-left-2 md-rating">
                                    <div class="well-sm">
                                        <div class="ratingdefault pull-left">
                                            <input type="radio" name="rating" value="5" id="51"><label for="5">☆</label>
                                            <input type="radio" name="rating" value="4" id="41" checked=""><label
                                                for="4">☆</label>
                                            <input type="radio" name="rating" value="3" id="31"><label for="3">☆</label>
                                            <input type="radio" name="rating" value="2" id="21"><label for="2">☆</label>
                                            <input type="radio" name="rating" value="1" id="11"><label for="1">☆</label>
                                        </div>
                                        <div class="pull-left text-right text-right1" style="padding-left:25px;">
                                            <a class="btn btn-success btn-green" id="open-review-box"
                                                style="width: 150px !important;max-width: 150px;"><fa
                                                    icon="star"></fa>Đánh giá tư vấn</a>
                                        </div>
                                    </div>


                                    <div class="row" id="post-review-box" style="display:none;clear:both;">
                                        <div class="col-md-10">
                                            <form accept-charset="UTF-8" id="formrating">
                                                <input id="ratings-hidden" name="rating" type="hidden">
                                                <input id="uid-hidden" type="hidden" value="189">
                                                <textarea class="form-control animated" cols="50" id="new-review"
                                                    name="comment" placeholder="Enter your review here..."
                                                    rows="5"></textarea>

                                                <div class="text-right">
                                                    <div class="rating">

                                                        <input type="radio" name="rating" value="5" id="5"><label
                                                            for="5">☆</label>
                                                        <input type="radio" name="rating" value="4" id="4"><label
                                                            for="4">☆</label>
                                                        <input type="radio" name="rating" value="3" id="3"><label
                                                            for="3">☆</label>
                                                        <input type="radio" name="rating" value="2" id="2"><label
                                                            for="2">☆</label>
                                                        <input type="radio" name="rating" value="1" id="1"><label
                                                            for="1">☆</label>
                                                    </div>
                                                    <div
                                                        style="float: right; display:none;   position: relative;    top: -32px;    height: 0px;">
                                                        <input style="margin-right: 5px;" type="checkbox"
                                                            name="is_change_sale" id="is_change_sale"><label
                                                            style="display: inline-block; position: relative;top: -2px;"
                                                            for="is_change_sale">YC thay đổi nhân viên KD</label>
                                                    </div>
                                                    <div style="clear:both;height:1px;width:100%;"></div>
                                                    <a class="btn btn-danger btn-sm" href="#" id="close-review-box"
                                                        style="display:none; margin-right: 10px;">
                                                        <span class="glyphicon glyphicon-remove"></span>Hủy</a>
                                                    <a class="btn btn-success btn-sm" id="save">Lưu</a>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <section class="content-header">
                        <h1>
                            Thống kê chung
                        </h1>
                        <ol class="breadcrumb">
                            <li><router-link to="/manage/dashboard"><fa icon="dashboard"></fa> Trang chủ</router-link></li>
                            <li class="active">Thống kê chung</li>
                        </ol>
                    </section>
                    <section class="content">
                        <div class="row">
                            <div class="col-lg-3 col-xs-6">
                                <!-- small box -->
                                <div class="small-box bg-green">
                                    <div class="inner">
                                        <h4 class="text-bold db-balance">0đ</h4>
                                        <p>Số dư</p>
                                    </div>
                                    <div class="icon"><fa icon="usd"></fa></div>
                                    <a href="/member/wallet" class="small-box-footer">Xem chi tiết <fa
                                            icon="arrow-circle-right"></fa></a>
                                </div>
                            </div>
                            <div class="col-lg-3 col-xs-6">
                                <!-- small box -->
                                <div class="small-box bg-aqua">
                                    <div class="inner">
                                        <h4 class="text-bold db-count-order">0 đơn</h4>
                                        <p>Đơn hàng nhập</p>
                                    </div>
                                    <div class="icon"><fa icon="file"></fa></div>
                                    <a href="/order/lists" class="small-box-footer">Xem chi tiết <fa
                                            icon="arrow-circle-right"></fa></a>
                                </div>
                            </div>

                            <!-- ./col -->
                            <div class="col-lg-3 col-xs-6">
                                <!-- small box -->
                                <div class="small-box bg-yellow">
                                    <div class="inner">
                                        <h4 class="text-bold db-count-cart">0 sản phẩm</h4>
                                        <p>Giỏ hàng</p>
                                    </div>
                                    <div class="icon">
                                        <fa icon="shopping-cart"></fa>
                                    </div>
                                    <a href="/cart" class="small-box-footer">Xem chi tiết <fa
                                            icon="arrow-circle-right"></fa></a>
                                </div>
                            </div>
                            <!-- ./col -->
                            <div class="col-lg-3 col-xs-6">
                                <!-- small box -->
                                <div class="small-box bg-red">
                                    <div class="inner">
                                        <h4>...</h4>
                                        <p>Khiếu nại</p>
                                    </div>
                                    <div class="icon">
                                        <fa icon="frown"></fa>
                                    </div>
                                    <a href="/complain/lists" class="small-box-footer">Xem chi tiết <fa
                                            icon="arrow-circle-right"></fa></a>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div class="row">
                        <div class="col-md-5">
                            <div class="box box-warning">
                                <div class="box-header with-border">
                                    <h3 class="box-title">Thông tin đơn mới cập nhật</h3>
                                    <div class="box-tools pull-right">
                                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><fa
                                                icon="minus"></fa>
                                        </button>
                                        <button type="button" class="btn btn-box-tool" data-widget="remove"><fa
                                                icon="times"></fa></button>
                                    </div>
                                </div>
                                <!-- /.box-header -->
                                <div class="box-body" style="display: block;">
                                    <div class="table-responsive">
                                        <table class="table no-margin">
                                            <thead>
                                                <tr>
                                                    <th>Mã đơn hàng</th>
                                                    <th>Trạng thái</th>
                                                    <th>Thời gian</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <!-- ngRepeat: order in orderNewUpdate -->
                                                <!-- ngIf: countOrder <= 0 -->
                                                <tr ng-if="countOrder <= 0" class="ng-scope">
                                                    <td colspan="3" class="text-center text-red">
                                                        <strong><fa class="frown"></fa> Không có đơn hàng
                                                            nào</strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!-- /.table-responsive -->
                                </div>
                                <!-- /.box-body -->
                                <div class="box-footer clearfix" style="display: block;">
                                    <a href="/order/lists" class="btn btn-sm btn-default btn-flat pull-right">Vào đơn
                                        hàng</a>
                                </div>
                                <!-- /.box-footer -->
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="box box-warning direct-chat direct-chat-warning">
                                <div class="box-header with-border">
                                    <h3 class="box-title">Trao đổi thông tin mới</h3>
                                    <div class="box-tools pull-right">
                                        <span data-toggle="tooltip" title="" class="badge bg-yellow ng-binding"
                                            data-original-title="0 Trao đổi mới">0</span>
                                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><fa
                                                icon="minus"></fa>
                                        </button>
                                        <button type="button" class="btn btn-box-tool" data-widget="remove"><fa
                                                icon="times"></fa></button>
                                    </div>
                                </div>
                                <!-- /.box-header -->
                                <div class="box-body" style="display: block;">
                                    <!-- Conversations are loaded here -->
                                    <div class="direct-chat-messages" style="max-height: 442px; height: auto">
                                        <!-- Message. Default to the left -->
                                        <!-- ngRepeat: notification in notificationList --> <!-- /.direct-chat-msg -->
                                        <!-- ngIf: notificationList == null || notificationList.length <= 0 -->
                                        <div class="direct-chat-msg ng-scope"
                                            ng-if="notificationList == null || notificationList.length <= 0">
                                            <p class="text-center text-red">Hiện không có trao đổi mới nào</p>
                                        </div>
                                        <!-- end ngIf: notificationList == null || notificationList.length <= 0 -->
                                        <!-- /.direct-chat-msg -->
                                    </div>
                                    <!--/.direct-chat-messages-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"
                id="mi-modal">
                <div class="modal-dialog modal-sx">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">×</span></button>
                            <h4 class="modal-title" id="myModalLabel">Bạn đang yêu cầu đổi nhân viên tư vấn?</h4>

                        </div>
                        <div class="modal-body">
                            <p>Chân thành xin lỗi nếu nhân viên tư vấn hiện tại chưa thể làm bạn hài lòng! Bạn chắc muốn
                                đổi nhân viên tư vấn?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" id="modal-btn-si">Đồng ý</button>
                            <button type="button" class="btn btn-danger" id="modal-btn-no">Hủy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
    name: "DashBoardSection",
    setup() {

    },
    mounted() {

    }
}
</script>

<style scoped>
@import '../../../../../assets/styles/_all-skins.css';
@import '../../../../../assets/styles/tuorder.min.css';
@import '../../../../../assets/styles/font-awesome.min.css';
@import '../../../../../assets/styles/bootstrap.min.css';

.col-offset-left-2 {
    margin-left: 20% !important;
}

#mi-modal .modal-body {
    color: #333;
    font-size: 15px;
}

#mi-modal .modal-body p {
    font-size: 15px;
}

#mi-modal .modal-content {
    border-radius: 10px;
}

#myModalLabel {
    color: #333;
}

.item2 {
    position: relative;
    top: 15px;
}

.btn-meh,
.btn-meh:hover {
    background-color: #c22026;
    color: #fff;
    /* line-height: 35px; */
    border-radius: 20px;
    padding: 5px 20px;
    display: inline-flex;
    align-items: center;
    height: auto;
    border: none;
}

.btn-meh .fa {
    position: relative;
    top: -1px;
}

.item {
    display: inline-flex;
    max-width: 180px;
    margin: 10px 30px;
}

img {
    display: inline-block;
    vertical-align: middle;
    border-style: none;
    max-width: 100%;
    height: auto;
    object-fit: cover;
}

.support-content .well-sm {
    padding-left: 29px;
}

.support-content .text-right a {
    border-radius: 7px;
}

.support-content .text-right1 {
    padding-right: 49px;
}

.support-content .text-right1 a {
    border-radius: 20px !important;
}

.support-content .text-right i.fa-star-o {
    padding-right: 7px;
}

.support-content a {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 43px;
    /*max-width: 43px;*/
    flex: 0 0 43px;
    margin-right: 10px;
}

.support-content .item-info {
    flex: 1;
    display: inline-block;
}

.support-content .item-info b {
    font-size: 14px;
    font-weight: 600;
    font-style: italic;
    color: #555
}

.support-content .item-info p {
    font-style: italic;
    color: #c1392b;
    line-height: 16px;
    font-size: 13.5px;
    padding-top: 2px;
    font-weight: 600;
}

.ratingdefault {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
}

.ratingdefault>input {
    display: none;
}

.ratingdefault>label {
    position: relative;
    width: 1em;
    font-size: 27px;
    color: #FFD600;
    cursor: pointer;
}

.ratingdefault>label::before {
    content: "\2605";
    position: absolute;
    opacity: 0;
}

.ratingdefault>label:hover:before,
.ratingdefault>label:hover~label:before {
    opacity: 1 !important;
}

.ratingdefault>input:checked~label:before {
    opacity: 1;
}

.rating {
    display: flex;
    flex-direction: row-reverse;
    justify-content: left;
    width: 50%;
}

.rating>input {
    display: none;
}

.rating>label {
    position: relative;
    width: 1em;
    font-size: 27px;
    color: #FFD600;
    cursor: pointer;
}

.rating>label::before {
    content: "\2605";
    position: absolute;
    opacity: 0;
}

.rating>label:hover:before,
.rating>label:hover~label:before {
    opacity: 1 !important;
}

.rating>input:checked~label:before {
    opacity: 1;
}

.rating:hover>input:checked~label:before {
    opacity: 0.4;
}

body {
    background: #222225;
    color: white;
}

h1,
p {
    text-align: center;

}

h1 {
    margin-top: 150px;
}

p {
    font-size: 1.2rem;
}

@media only screen and (max-width: 600px) {
    h1 {
        font-size: 14px;
    }

    p {
        font-size: 12px;
    }

    .support-content .md-rating {
        padding-left: 0px;
        margin-left: -20px !important;
        margin-right: -20px !important;
        padding-top: 15px !important;
    }

    .support-content .md-rating .well-sm {
        padding-left: 9px !important;
    }

    .support-content .md-rating .ratingdefault>label {
        font-size: 22px;
    }

    .support-content .md-rating .text-right1 {
        padding-right: 5px !important;
        padding-left: 10px !important
    }

    .support-content .md-rating.col-offset-left-2 {
        margin-left: 0px;
    }
}

.content-wrapper {
    margin-left: max(250px, 15vw) !important;
}

.content {
    min-height: 250px;
    padding: 15px;
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
}

.pd15 {
    padding: 15px;
}

.box-deposit .alert-warning {
    color: #8a6d3b !important;
    background-color: #fcf8e3 !important;
    border-color: #faebcc !important;
    margin-bottom: 0;
}

</style>