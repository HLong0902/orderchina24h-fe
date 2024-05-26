<!-- template section -->
<template>
    <div id="content" class="clearfix fullwidth">


        <h2 class="title "> Danh sách đơn hàng</h2>
        <div class="list_status clearfix">
            <ul>
                <li>
                    <a href="/shipOrders/lists" class="black">
                        Toàn bộ : <span>(3)</span>
                    </a>
                </li>
                <li>

                    <a href="/shipOrders/lists?filter_status=0" class="blue">
                        Chưa duyệt : <span>(0)</span>
                    </a>
                </li>
                <li>

                    <a href="/shipOrders/lists?filter_status=1" class="green">
                        Đã duyệt : <span>(1)</span>
                    </a>
                </li>
                <li>

                    <a href="/shipOrders/lists?filter_status=2" class="hangdave">
                        Hàng đã về - chờ giao hàng : <span>(0)</span>
                    </a>
                </li>
                <li>

                    <a href="/shipOrders/lists?filter_status=3" class="black">
                        Đã kết thúc : <span>(1)</span>
                    </a>
                </li>
                <li>

                    <a href="/shipOrders/lists?filter_status=-1" class="red">
                        Đã hủy : <span>(1)</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="filer_box">
            <form action="/shipOrders/lists" method="GET">
                Mã hóa đơn:<input type="text" value="" name="filter_invoiceid">
                Username:<input type="text" value="" name="filter_username">
                Họ Tên:<input type="text" value="" name="filter_fullname">
                Phone:<input type="text" value="" name="filter_phone">
                Email:<input type="text" value="" name="filter_email">
                <input class="button" type="submit" value="Tìm kiếm">
            </form>
        </div>
        <div class="gridtable">
            <table>
                <tbody>
                    <tr>
                        <td>
                            STT
                        </td>
                        <td>
                            Mã hóa đơn/Ngày mua hàng
                        </td>
                        <td>
                            Tên khách
                        </td>
                        <td>
                            Thông tin liên hệ
                        </td>
                        <td>
                            Nhận hàng tại kho
                        </td>
                        <td>
                            Tổng số vận đơn
                        </td>
                        <td>
                            Trạng thái
                        </td>
                    </tr>
                    <tr>
                        <td class="align-center">
                            1
                        </td>
                        <td>
                            <span class="uppercase">
                                <a class="blue" href="/shipOrders/detail/37" target="_blank">
                                    natuqldd-KG-15-12-2023-4 </a>
                            </span>
                        </td>
                        <td>
                            Họ tên: Anh Tú
                            <br>
                            Tên đăng nhập:
                            <a href="/shipOrders/lists?filter_username=natuqldd"> <span class="blue">
                                    natuqldd </span> </a>
                        </td>
                        <td>
                            N/A </td>
                        <td>

                        </td>
                        <td>
                            <div>Tổng số SP: <span class="red">0</span></div>
                        </td>
                        <td>
                            <span class="chuaduyet">Chưa duyệt</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="align-center">
                            2
                        </td>
                        <td>
                            <span class="uppercase">
                                <a class="blue" href="/shipOrders/detail/36" target="_blank">
                                    natuqldd-KG-15-12-2023-3 </a>
                            </span>
                        </td>
                        <td>
                            Họ tên: Anh Tú
                            <br>
                            Tên đăng nhập:
                            <a href="/shipOrders/lists?filter_username=natuqldd"> <span class="blue">
                                    natuqldd </span> </a>
                        </td>
                        <td>
                            N/A </td>
                        <td>

                        </td>
                        <td>
                            <div>Tổng số SP: <span class="red">0</span></div>
                        </td>
                        <td>
                            <span class="damuahang">Đã mua hàng</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="align-center">
                            3
                        </td>
                        <td>
                            <span class="uppercase">
                                <a class="blue" href="/shipOrders/detail/35" target="_blank">
                                    natuqldd-KG-15-12-2023-2 </a>
                            </span>
                        </td>
                        <td>
                            Họ tên: Anh Tú
                            <br>
                            Tên đăng nhập:
                            <a href="/shipOrders/lists?filter_username=natuqldd"> <span class="blue">
                                    natuqldd </span> </a>
                        </td>
                        <td>
                            N/A </td>
                        <td>

                        </td>
                        <td>
                            <div>Tổng số SP: <span class="red">0</span></div>
                        </td>
                        <td>
                            <span class="daduyet">Đã duyệt</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="align-center">
                            4
                        </td>
                        <td>
                            <span class="uppercase">
                                <a class="blue" href="/shipOrders/detail/34" target="_blank">
                                    natuqldd-KG-15-12-2023-1 </a>
                            </span>
                        </td>
                        <td>
                            Họ tên: Anh Tú
                            <br>
                            Tên đăng nhập:
                            <a href="/shipOrders/lists?filter_username=natuqldd"> <span class="blue">
                                    natuqldd </span> </a>
                        </td>
                        <td>
                            N/A </td>
                        <td>

                        </td>
                        <td>
                            <div>Tổng số SP: <span class="red">0</span></div>
                        </td>
                        <td>
                            <span class="chuaduyet">Chưa duyệt</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="align-center">
                            5
                        </td>
                        <td>
                            <span class="uppercase">
                                <a class="blue" href="/shipOrders/detail/33" target="_blank">
                                    natuqldd-KG-14-12-2023-3 </a>
                            </span>
                        </td>
                        <td>
                            Họ tên: Anh Tú
                            <br>
                            Tên đăng nhập:
                            <a href="/shipOrders/lists?filter_username=natuqldd"> <span class="blue">
                                    natuqldd </span> </a>
                        </td>
                        <td>
                            N/A </td>
                        <td>

                        </td>
                        <td>
                            <div>Tổng số SP: <span class="red">0</span></div>
                        </td>
                        <td>
                            <span class="chuaduyet">Chưa duyệt</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="align-center">
                            6
                        </td>
                        <td>
                            <span class="uppercase">
                                <a class="blue" href="/shipOrders/detail/32" target="_blank">
                                    natuqldd-KG-14-12-2023-2 </a>
                            </span>
                        </td>
                        <td>
                            Họ tên: Anh Tú
                            <br>
                            Tên đăng nhập:
                            <a href="/shipOrders/lists?filter_username=natuqldd"> <span class="blue">
                                    natuqldd </span> </a>
                        </td>
                        <td>
                            N/A </td>
                        <td>

                        </td>
                        <td>
                            <div>Tổng số SP: <span class="red">0</span></div>
                        </td>
                        <td>
                            <span class="chuaduyet">Chưa duyệt</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="align-center">
                            7
                        </td>
                        <td>
                            <span class="uppercase">
                                <a class="blue" href="/shipOrders/detail/31" target="_blank">
                                    natuqldd-KG-14-12-2023-1 </a>
                            </span>
                        </td>
                        <td>
                            Họ tên: Anh Tú
                            <br>
                            Tên đăng nhập:
                            <a href="/shipOrders/lists?filter_username=natuqldd"> <span class="blue">
                                    natuqldd </span> </a>
                        </td>
                        <td>
                            N/A </td>
                        <td>

                        </td>
                        <td>
                            <div>Tổng số SP: <span class="red">0</span></div>
                        </td>
                        <td>
                            <span class="chuaduyet">Chưa duyệt</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="align-center">
                            8
                        </td>
                        <td>
                            <span class="uppercase">
                                <a class="blue" href="/shipOrders/detail/30" target="_blank">
                                    natuqldd-KG-20-10-2023-2 </a>
                            </span>
                        </td>
                        <td>
                            Họ tên: Anh Tú
                            <br>
                            Tên đăng nhập:
                            <a href="/shipOrders/lists?filter_username=natuqldd"> <span class="blue">
                                    natuqldd </span> </a>
                        </td>
                        <td>
                            N/A </td>
                        <td>
                            <span class="bold black">Kho SG</span>
                        </td>
                        <td>
                            <div>Tổng số SP: <span class="red">0</span></div>
                        </td>
                        <td>
                            <span class="dahuy bg_black">Đã hủy</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="align-center">
                            9
                        </td>
                        <td>
                            <span class="uppercase">
                                <a class="blue" href="/shipOrders/detail/29" target="_blank">
                                    natuqldd-KG-20-10-2023-1 </a>
                            </span>
                        </td>
                        <td>
                            Họ tên: Anh Tú
                            <br>
                            Tên đăng nhập:
                            <a href="/shipOrders/lists?filter_username=natuqldd"> <span class="blue">
                                    natuqldd </span> </a>
                        </td>
                        <td>
                            N/A </td>
                        <td>
                            <span class="bold black">Kho SG</span>
                        </td>
                        <td>
                            <div>Tổng số SP: <span class="red">0</span></div>
                        </td>
                        <td>
                            <span class="chuaduyet">Chưa duyệt</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="align-center">
                            10
                        </td>
                        <td>
                            <span class="uppercase">
                                <a class="blue" href="/shipOrders/detail/28" target="_blank">
                                    truongkin189-KG-12-08-2023-1 </a>
                            </span>
                        </td>
                        <td>
                            Họ tên: truongkin189
                            <br>
                            Tên đăng nhập:
                            <a href="/shipOrders/lists?filter_username=truongkin189"> <span class="blue">
                                    truongkin189 </span> </a>
                        </td>
                        <td>
                            N/A </td>
                        <td>

                        </td>
                        <td>
                            <div>Tổng số SP: <span class="red">0</span></div>
                        </td>
                        <td>
                            <span class="chuaduyet">Chưa duyệt</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ul class="pagination">
            <li class="active"><a>1</a></li>
            <li><a href="/shipOrders/lists?page=10" data-ci-pagination-page="2">2</a></li>
            <li><a href="/shipOrders/lists?page=20" data-ci-pagination-page="3">3</a></li>
            <li><a href="/shipOrders/lists?page=10" data-ci-pagination-page="2" rel="next">Trang sau »</a></li>
            <li><a href="/shipOrders/lists?page=30" data-ci-pagination-page="4"> »</a></li>
        </ul>
        <p><strong>Total: <span class="green">37</span> (Items)</strong></p>
    </div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'StaffShipOrderSection',
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
<style scoped></style>