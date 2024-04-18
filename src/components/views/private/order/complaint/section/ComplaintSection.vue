<!-- template section -->
<template>
    <div id="content">
        <div class="container">
            <main class="main" role="main">
                <div class="row main-row">
                    <div class="cart-by-page">
                        <div class="site_container">

                            <div id="content" class="container fullwidth">
                                <h3 class="page-title"> Danh sách khiếu nại Shop</h3>
                                <div class="list_status clearfix">
                                    <ul>
                                        <li>
                                            <a href="https://giaodich.hangquangchau24h.vn/complain/lists" class="green">
                                                Tòan bộ : <span>(0)</span>
                                            </a>

                                        </li>
                                        <li>

                                            <a href="https://giaodich.hangquangchau24h.vn/complain/lists?filter_is_complain=1"
                                                class="yellow">
                                                Chờ khiếu nại : <span>(0)</span>
                                            </a>

                                        </li>
                                        <li>

                                            <a href="https://giaodich.hangquangchau24h.vn/complain/lists?filter_is_complain=2"
                                                class="orange">
                                                Đang khiếu nại : <span>(0)</span>
                                            </a>

                                        </li>
                                        <li>

                                            <a href="https://giaodich.hangquangchau24h.vn/complain/lists?filter_is_complain=3"
                                                class="blue">
                                                Khiếu nại thành công : <span>(0)</span>
                                            </a>

                                        </li>
                                        <li>

                                            <a href="https://giaodich.hangquangchau24h.vn/complain/lists?filter_is_complain=4"
                                                class="red">
                                                Khiếu nại thất bại : <span>(0)</span>
                                            </a>

                                        </li>
                                        <li>

                                            <a href="https://giaodich.hangquangchau24h.vn/complain/lists?filter_is_complain=5"
                                                class="green">
                                                Đã xử lý đơn hàng : <span>(0)</span>
                                            </a>

                                        </li>
                                        <li>

                                            <a href="https://giaodich.hangquangchau24h.vn/complain/lists?filter_is_complain=-1"
                                                class="black">
                                                Đã hủy : <span>(0)</span>
                                            </a>

                                        </li>
                                    </ul>
                                </div>
                                <div class="clearfix"></div>
                                <div class="filter_box">
                                </div>
                                <div class="clearfix"></div>
                                <div class="gridtable ships">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td width="3%">
                                                    STT
                                                </td>

                                                <td width="14%">
                                                    Đơn hàng
                                                </td>
                                                <td width="30%">
                                                    Sản phẩm khiếu nại
                                                </td>
                                                <td width="10%">
                                                    Giá/Số lượng
                                                </td>
                                                <td width="30%">
                                                    Ghi chú
                                                </td>
                                                <td width="10%">
                                                    Trạng thái
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <p><strong>Total: <span class="green">0</span> (Items)</strong></p>
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
    name: 'ComplaintSection',
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

ul {
    list-style: inside;
}
body, h1, h2, h3, h4, h5, h6, form, input, select, ul, p, textarea {
    margin: 0px;
    padding: 0;
}

.list_status ul li {
    list-style: none;
    float: left;
    padding: 0px 10px;
}

.gridtable {
    margin: 0px;
    padding: 0px;
    width: 96%;
    border: 1px solid #000000;
    -moz-border-radius-bottomleft: 0px;
    -webkit-border-bottom-left-radius: 0px;
    border-bottom-left-radius: 0px;
    -moz-border-radius-bottomright: 0px;
    -webkit-border-bottom-right-radius: 0px;
    border-bottom-right-radius: 0px;
    -moz-border-radius-topright: 0px;
    -webkit-border-top-right-radius: 0px;
    border-top-right-radius: 0px;
    -moz-border-radius-topleft: 0px;
    -webkit-border-top-left-radius: 0px;
    border-top-left-radius: 0px;
    font-size: 12px;
}

.gridtable table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
}

.gridtable table {
    font-size: 14px;
}

.gridtable tr:nth-child(odd) {
    background-color: #FFF;
}

.gridtable tr:first-child td {
    background: -o-linear-gradient(bottom, #999999 5%, #999999 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.05, #999999), color-stop(1, #999999));
    background: -moz-linear-gradient(center top, #999999 5%, #999999 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#999999", endColorstr="#999999");
    background: -o-linear-gradient(top, #999999, 999999);
    background-color: #999999;
    border: 0px solid #000000;
    text-align: center;
    border-width: 0px 0px 1px 1px;
    padding: 7px;
    font-family: Arial;
    font-weight: bold;
    color: #ffffff;
}

.gridtable tr:first-child td:first-child {
    border-width: 0px 0px 1px 0px;
}

</style>