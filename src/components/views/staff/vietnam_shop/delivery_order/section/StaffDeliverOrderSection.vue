<script setup></script>

<!-- template section -->
<template>
	<div id="content" class="fullwidth clearfix">
		<!--<h2 class="align-center">GIAO HÀNG</h2>-->
		<div id="section-non-print">
			<div class="search">
				<center>
					<form action="" method="GET">
						<b>Tìm theo : </b>
						<select name="search_type">
							<option value="username" selected="true">
								Tên đăng nhập
							</option>
							<option value="phone">Số điện thoại</option>
							<option value="email">Email</option>
						</select>
						<input
							type="text"
							value="dophuonghvn"
							name="search_text"
							required=""
						/>
						<input type="submit" value="Tìm kiếm" />
					</form>
				</center>
			</div>
		</div>
		<div class="delivery clearfix">
			<div id="section-non-print-2">
				<div class="check">
					<h3 class="uppercase">Chọn mã giao hàng</h3>
					<p>+ Đơn hàng mầu XANH : Là đơn hàng đã thanh toán</p>
					<p>+ Đơn hàng mầu VÀNG : Là đơn hàng chưa thanh toán</p>
					<form action="" class="ajaxFormdelivery" method="POST">
						<input
							type="hidden"
							name="controller"
							value="delivery"
						/>
						<input
							type="hidden"
							name="task"
							value="update_is_delivered"
						/>
						<div class="gridtable">
							<table>
								<tbody>
									<tr style="font-size: 10px">
										<td>STT</td>
										<td>Mã hoá đơn</td>
										<td>Mã vận đơn</td>
										<td>Đã kiểm</td>
										<td>Kho VN</td>
										<td>Đã thanh toán</td>
										<td>Check đã giao</td>
										<td>In phiếu giao</td>
									</tr>
									<tr>
										<td class="align-center">1</td>
										<td>CN2978345</td>
										<td>78796029849105</td>
										<td class="align-center"></td>
										<td class="align-center"></td>
										<td class="align-center">x</td>
										<td class="align-center"></td>
										<td class="align-center print"></td>
									</tr>
									<tr>
										<td class="align-center">1</td>
										<td>CN239467</td>
										<td>433888470524251</td>
										<td class="align-center"></td>
										<td class="align-center"></td>
										<td class="align-center">x</td>
										<td class="align-center"></td>
										<td class="align-center print"></td>
									</tr>
									<tr>
										<td class="align-center">1</td>
										<td>CN123490</td>
										<td>433888640243845</td>
										<td class="align-center"></td>
										<td class="align-center"></td>
										<td class="align-center">x</td>
										<td class="align-center"></td>
										<td class="align-center print"></td>
									</tr>
								</tbody>
							</table>
						</div>
						<input
							type="button"
							name=""
							value="Lưu"
							onclick="submitAjax(this)"
						/>
						<div class="ajax_response alert dismissable"></div>
					</form>
				</div>
			</div>

			<div class="print_order" id="section-to-print">
				<div class="float-right">
					<a
						class="button-link"
						href="javascript:if(window.print)window.print()"
						>IN PHIẾU GIAO HÀNG</a
					>
				</div>
				<div class="item_1 clearfix">
					<div class="images">
						<img
							height="70px;"
							src="http://hangquangchau24h.vn/css/logo.png"
							style="margin-top: -10px; width: 155px"
						/>
					</div>
					<div class="address">
						<h3 class="align-center">PHIẾU GIAO HÀNG</h3>
						<p>
							<b style="float: left">Hà Nội: </b>
							<span>
								117-119 Bằng Liệt, Hoàng Liệt, Hoàng Mai, Hà
								Nội</span
							>
							<br />
							<b style="float: left">Hồ Chí Minh: </b>
							<span>
								102/36D Phan Huy Ích, Phường 15, Quận Tân bình,
								Hồ Chí Minh</span
							>
							<br />
							<!--<b style="float:left">TP HCM: </b> <span></span> -->
							<b style="float: left">Hotline: </b>
							<span style="float: left; padding-left: 3px">
								096.232.1688</span
							>
						</p>
					</div>
					<div class="date">
						<div>Số: ......................</div>
						<div>Ngày 11 tháng 05 năm 2024</div>
					</div>
				</div>
				<div class="item_2">
					<div><b>Khách hàng: </b> dophuonghvn</div>
					<div>
						<b>Địa chỉ: </b> Số 8- Ngõ 2 - Hoàng Quốc Việt- Trưng
						Trắc- Phúc Yên - Vĩnh Phúc
					</div>
					<div><b>Điện thoại: </b> 0343425044</div>
				</div>
				<div class="item_3" id="table_print_container">
					<div class="gridtable">
						<table id="print_table_header">
							<tbody>
								<tr>
									<td width="50%">Mã vận đơn</td>
									<td width="50%">Số lượng</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="item_3">
					<ul>
						<li>
							<b>Người giao hàng</b>
							<div>Ký,ghi rõ họ tên</div>
						</li>
						<li>
							<b>Người nhận hàng</b>
							<div>Ký,ghi rõ họ tên</div>
						</li>
						<li>
							<b>Người lập phiếu</b>
							<div>Ký,ghi rõ họ tên</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffDeliverOrderSection",
	data() {
		return {};
	},
	mounted() {},
	methods: {},
};
</script>

<!-- style custom -->
<style scoped></style>
