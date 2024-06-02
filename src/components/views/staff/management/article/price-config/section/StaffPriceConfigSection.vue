<script setup>
import ROUTES from "../../../../../../../constants/routeDefine";
import ApiCaller from "../../../../../../utils/ApiCaller";
import { Icon } from '@iconify/vue';
import CONSTANT from "../../../../../../../constants/constants";
</script>

<!-- template section -->
<template>
	<div id="content" class="clearfix fullwidth">
		<div class="lists_ship clearfix">
			<h2 class="float-left">Cấu hình bảng giá đặt hàng</h2>
		</div>
		<br>
		<div>
			<div class="row">
				<div class="content-layout content-blog col-12">
					<div class="inner-content-post">
						<div class="inner-content-info">
							<div class="heading-title custom">
								<h1 class="title mt-0">Bảng Giá cập nhật mới nhất</h1><b>Bảng giá dịch vụ đặt hàng &amp;
									vận chuyển hàng của Orderchina24h
									công khai, rõ ràng, tuyệt đối không có giá ảo, chi phí phát sinh! </b>
							</div>
						</div>
						<div class="entry-content clearfix">
							<div class="wrap-bang-gia">
								<div class="mys-item-table">
									<h2>1. Chi phí một đơn hàng order</h2>
									<div class="table-info">
										<table class="mys-table">
											<thead>
												<tr>
													<th></th>
													<th>Giải thích</th>
													<th style="text-align: center !important;">Bắt
														buộc</th>
													<th style="text-align: center !important;">Tùy
														chọn</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>1. Giá sản phẩm</td>
													<td>Là giá được niêm yết trên website Trung Quốc
													</td>
													<td class="txt-center mys-text-success"><svg
															xmlns="http://www.w3.org/2000/svg"
															xmlns:xlink="http://www.w3.org/1999/xlink"
															aria-hidden="true" role="img" width="1em" height="1em"
															viewBox="0 0 24 24" class="iconify iconify--bx">
															<path fill="currentColor"
																d="m10.933 13.519l-2.226-2.226l-1.414 1.414l3.774 3.774l5.702-6.84l-1.538-1.282z">
															</path>
															<path fill="currentColor"
																d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2M5 19V5h14l.002 14z">
															</path>
														</svg></td>
													<td></td>
												</tr>
												<tr>
													<td><span data-href="phidichvu" class="ky-gui-anchor">2. Phí dịch
															vụ</span></td>
													<td>Phí giao dịch mua hàng khách trả cho Nhập
														Hàng China </td>
													<td class="txt-center mys-text-success"><svg
															xmlns="http://www.w3.org/2000/svg"
															xmlns:xlink="http://www.w3.org/1999/xlink"
															aria-hidden="true" role="img" width="1em" height="1em"
															viewBox="0 0 24 24" class="iconify iconify--bx">
															<path fill="currentColor"
																d="m10.933 13.519l-2.226-2.226l-1.414 1.414l3.774 3.774l5.702-6.84l-1.538-1.282z">
															</path>
															<path fill="currentColor"
																d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2M5 19V5h14l.002 14z">
															</path>
														</svg></td>
													<td></td>
												</tr>
												<tr>
													<td><span data-href="phishiptq" class="ky-gui-anchor">3. Phí ship
															Trung Quốc</span></td>
													<td>Phí chuyển hàng từ nhà cung cấp tới kho của
														OrderChina24h tại Trung Quốc</td>
													<td class="txt-center mys-text-success"><svg
															xmlns="http://www.w3.org/2000/svg"
															xmlns:xlink="http://www.w3.org/1999/xlink"
															aria-hidden="true" role="img" width="1em" height="1em"
															viewBox="0 0 24 24" class="iconify iconify--bx">
															<path fill="currentColor"
																d="m10.933 13.519l-2.226-2.226l-1.414 1.414l3.774 3.774l5.702-6.84l-1.538-1.282z">
															</path>
															<path fill="currentColor"
																d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2M5 19V5h14l.002 14z">
															</path>
														</svg></td>
													<td></td>
												</tr>
												<tr>
													<td><span data-href="phivanchuyen" class="ky-gui-anchor">4. Phí vận
															chuyển</span></td>
													<td>Phí vận chuyển từ kho Trung Quốc về kho của
														OrderChina24h tại Việt Nam (Đơn vị Kg)</td>
													<td class="txt-center mys-text-success"><svg
															xmlns="http://www.w3.org/2000/svg"
															xmlns:xlink="http://www.w3.org/1999/xlink"
															aria-hidden="true" role="img" width="1em" height="1em"
															viewBox="0 0 24 24" class="iconify iconify--bx">
															<path fill="currentColor"
																d="m10.933 13.519l-2.226-2.226l-1.414 1.414l3.774 3.774l5.702-6.84l-1.538-1.282z">
															</path>
															<path fill="currentColor"
																d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2M5 19V5h14l.002 14z">
															</path>
														</svg></td>
													<td></td>
												</tr>
												<tr>
													<td><span data-href="phikiemdem" class="ky-gui-anchor">5. Phí kiểm
															đếm</span></td>
													<td>Dịch vụ đảm bảo sản phẩm của khách không bị
														nhà cung cấp giao sai hoặc thiếu</td>
													<td></td>
													<td class="txt-center mys-text-success"><svg
															xmlns="http://www.w3.org/2000/svg"
															xmlns:xlink="http://www.w3.org/1999/xlink"
															aria-hidden="true" role="img" width="1em" height="1em"
															viewBox="0 0 24 24" class="iconify iconify--bx">
															<path fill="currentColor"
																d="m10.933 13.519l-2.226-2.226l-1.414 1.414l3.774 3.774l5.702-6.84l-1.538-1.282z">
															</path>
															<path fill="currentColor"
																d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2M5 19V5h14l.002 14z">
															</path>
														</svg></td>
												</tr>
												<tr>
													<td><span data-href="phidonggo" class="ky-gui-anchor">6. Phí đóng
															gỗ</span></td>
													<td>Hình thức đảm bảo an toàn, hạn chế rủi ro đối
														với hàng dễ vỡ, dễ biến dạng</td>
													<td></td>
													<td class="txt-center mys-text-success"><svg
															xmlns="http://www.w3.org/2000/svg"
															xmlns:xlink="http://www.w3.org/1999/xlink"
															aria-hidden="true" role="img" width="1em" height="1em"
															viewBox="0 0 24 24" class="iconify iconify--bx">
															<path fill="currentColor"
																d="m10.933 13.519l-2.226-2.226l-1.414 1.414l3.774 3.774l5.702-6.84l-1.538-1.282z">
															</path>
															<path fill="currentColor"
																d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2M5 19V5h14l.002 14z">
															</path>
														</svg></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="mys-alert mys-alert-dismissible"><svg xmlns="http://www.w3.org/2000/svg"
										xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
										width="1em" height="1em" viewBox="0 0 24 24" class="iconify iconify--bxs">
										<path fill="currentColor"
											d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m1 16h-2v-2h2zm.976-4.885c-.196.158-.385.309-.535.459c-.408.407-.44.777-.441.793v.133h-2v-.167c0-.118.029-1.177 1.026-2.174c.195-.195.437-.393.691-.599c.734-.595 1.216-1.029 1.216-1.627a1.934 1.934 0 0 0-3.867.001h-2C8.066 7.765 9.831 6 12 6s3.934 1.765 3.934 3.934c0 1.597-1.179 2.55-1.958 3.181">
										</path>
									</svg> Lưu ý: Những phí thuộc hình thức (*) là phí bắt buộc, còn lại là tùy chọn,
									quý khách có thể chọn sử dụng hoặc không </div>
								<div class="mys-item-table">
									<h2>2. Bảng giá dịch vụ mua hàng</h2>
									<div class="table-info">
										<table class="mys-table">
											<thead>
												<tr>
													<th width="50%">Giá trị đơn hàng</th>
													<th width="25%">Phí dịch vụ</th>
													<th width="25%">Tiền cọc (% giá trị đơn hàng)
													</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(item, idx) in serviceFees">
													<td>
														<input type="text"
															@keyup.enter.prevent="updateItemDescription(item)"
															v-model="item.description" size="50">
													</td>
													<td>
														<input @keyup.enter.prevent="updateItemValue(item)" type="text"
															v-model="item.value" size="5">&nbsp;%
													</td>
													<td>70%</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="mys-alert mys-alert-dismissible"><b>Lưu ý:</b>
										<ol type="number" style="margin-bottom:-10px;">
											<li>Giá trị tiền hàng để tính phí dịch vụ được tính trên
												tổng tiền hàng theo đơn hàng từng shop Trung Quốc.</li>
											<li>Phí dịch vụ mặc định thấp nhất đối với một đơn hàng
												là 5.000. </li>
											<li>Phí dịch vụ mua hàng không bao gồm phí ship nội địa
												Trung Quốc. </li>
										</ol>
									</div>
								</div>
								<div class="mys-item-table">
									<h2 id="phivanchuyen">3. Phí vận chuyển quốc tế</h2>
									<h3 style="font-weight:500;"><i style="text-decoration:underline;">a. Bảng giá vận
											chuyển
											hàng lẻ, kuadi, hàng order</i></h3>
									<div class="table-info">
										<table class="mys-table">
											<thead>
												<tr>
													<th>Trọng lượng</th>
													<th width="30%">Hà Nội</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(item, idx) in feeShipWeight">
													<td>
														<input type="text"
															@keyup.enter.prevent="updateItemDescription(item)"
															v-model="item.description">
													</td>
													<td>
														<input type="text" @keyup.enter.prevent="updateItemValue(item)"
															v-model="item.value">&nbsp;
														<sup>đ/kg</sup>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="mys-alert mys-alert-dismissible"><b>Lưu ý: </b>
										<ul>
											<li>Đối với những đơn hàng order : nhằm tối ưu chi phí
												cho khách hàng OrderChina24h sẽ không tính khối hoặc cân quy đổi trừ
												những đơn hàng quá khổ không đóng được vào bao hàng. </li>
											<li> Một đơn hàng có trọng lượng min là 0.5kg và sẽ không
												làm tròn cân đối với những đơn &gt;0.5kg </li>
										</ul>
									</div>
									<h3 style="font-weight:500;"><i style="text-decoration:underline;">b. Bảng giá vận
											chuyển
											hàng lô &gt; 150kg (Cùng 1 mặt hàng)</i></h3>
									<div class="table-info">
										<table class="mys-table">
											<thead>
												<tr>
													<th>Trọng lượng</th>
													<th width="30%">Hà Nội</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(item, idx) in batchGoods">
													<td>
														<input type="text"
															@keyup.enter.prevent="updateItemDescription(item)"
															v-model="item.description" size="50">&nbsp;
													</td>
													<td>
														<input type="text" @keyup.enter.prevent="updateItemValue(item)"
															v-model="item.value" size="7">&nbsp;
														<sup>đ/kg</sup>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="mys-alert mys-alert-dismissible"><b>Lưu ý: </b>
										<div>
											<div>- Hàng lô là lô hàng chỉ có một mặt hàng với tổng
												cân đơn hàng &gt; 100kg (Không áp dụng đối với các mặt hàng khó đi như
												các mặt hàng nhạy cảm, thuốc lá điện tử, fake) </div>
											<div>- Quý khách khi lên đơn hàng sẽ báo với nhân viên
												công ty trước khi lên đơn để chúng tôi tách riêng hàng lô và hàng tạp
												nếu không báo sẽ bị tính vào hàng order</div><!--&lt;div&gt;
                                           - Những đơn hàng cồng kềnh có thể đóng vào bao chúng tôi sẽ tính theo bảng giá Kg để tối ưu chi phí cho quý khách. Ngoại trừ 1 số lô hàng không thể đóng vào bao được khi đó sẽ Liên hệ giữa 2 bên.
                                       &lt;/div&gt;-->
										</div>
									</div>
									<div class="table-info">
										<table class="mys-table">
											<thead>
												<tr>
													<th>Khối lượng</th>
													<th width="30%">Hà Nội</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(item, idx) in batchGoodsVolume">
													<td>
														<input type="text"
															@keyup.enter.prevent="updateItemDescription(item)"
															v-model="item.description">&nbsp;
													</td>
													<td>
														<input type="text" @keyup.enter.prevent="updateItemValue(item)"
															v-model="item.value">&nbsp;<sup>đ/m3</sup>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="mys-alert mys-alert-dismissible"><b>Lưu ý: </b>
										<div>
											<li>Đối với hàng hoá vận chuyển theo Hình thức chính
												ngạch, các thông số như thuế nhập khẩu và thuế VAT sẽ được chúng tôi
												thông báo tới Quý khách sau khi Quý khách đặt cọc. Hoặc Quý khách liên
												hệ nhân viên Kinh doanh để có được thông tin về chi phí lô hàng. </li>
										</div>
									</div>
									<h3 style="font-weight:500;"><i style="text-decoration:underline;">c. Bảng giá vận
											chuyển
											hàng nặng - gọn ( &gt; 300kg)</i></h3>
									<div class="table-info">
										<table class="mys-table">
											<thead>
												<tr>
													<th>Trọng lượng</th>
													<th width="30%">Hà Nội</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(item, idx) in heavyGoods">
													<td>
														<input type="text"
															@keyup.enter.prevent="updateItemDescription(item)"
															v-model="item.description">&nbsp;
													</td>
													<td>
														<input type="text" @keyup.enter.prevent="updateItemValue(item)"
															v-model="item.value">&nbsp;
														<sup>đ/kg</sup>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="mys-alert mys-alert-dismissible"><b>Lưu ý: </b>
										<div>
											<div>- Hàng nặng là các mặt hàng như ốc vít, đầu khóa,
												máy khoan, máy bơm, tay nắm cửa. </div>
											<div>- Quý khách khi lên đơn hàng sẽ báo với nhân viên
												công ty trước khi lên đơn để chúng tôi tách riêng hàng nặng đi riêng.
											</div>
										</div>
									</div>
									<h3 style="font-weight:500;"><i style="text-decoration:underline;">d. Bảng giá vận
											chuyển
											hàng hóa cồng kềnh </i></h3>
									<p>Dài*Rộng*Cao*giá khối = Số tiền vận chuyển </p>
									<div class="table-info">
										<table class="mys-table">
											<thead>
												<tr>
													<th>Thể tích</th>
													<th width="30%">Hà Nội</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(item, idx) in bulkyGoods">
													<td>
														<input type="text"
															@keyup.enter.prevent="updateItemDescription(item)"
															v-model="item.description">&nbsp;<sup>3</sup>
													</td>
													<td>
														<input type="text" @keyup.enter.prevent="updateItemValue(item)"
															v-model="item.value">&nbsp;<sup>đ/m3</sup>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="mys-alert mys-alert-dismissible"><b>Lưu ý: </b>
										<div>
											<div>Quy định đối với các hàng hóa cồng kềnh: Áp dụng đối
												với các mặt hàng có trọng lượng nhẹ, thể tích lớn</div><b>Quy tắc phân
												biệt hàng nặng và hàng cồng kềnh </b>
											<ul>
												<li>Phí vận chuyển được tính theo hai cách là trọng
													lượng theo hàng nặng, và thể tích cho hàng cồng kềnh/hàng.</li>
												<li>Hàng nặng và cồng kềnh được phân biệt theo cách
													sau: <ul>
														<li>Hàng nặng có trọng lượng thực tế lớn hơn
															cân nặng quy đổi </li>
														<li>Hàng cồng kềnh có trọng lượng thực tế nhỏ
															hơn hoặc bằng cân nặng quy đổi </li>
													</ul>
												</li>
											</ul><b>Quy định tính phí đối với hàng cồng kềnh </b>
											<ul>
												<li>Cân nặng thực : Là trọng lượng thực tế của kiện
													hàng.</li>
												<li>Cân nặng quy đổi: Là cân nặng được quy đổi theo
													thể tích được tính theo công thức sau: Cân nặng quy đổi (Kg) = (Dài
													(cm) * Rộng (cm) * Cao (cm)/7000) </li>
												<li>Cân nặng tính tiền: Là cân nặng sử dụng tính các
													chi phí cho kiện hàng (VD: Chi phí vận chuyển Quốc tế, chi phí lưu
													kho, chi phí đóng kiện gỗ,…).</li>
											</ul><b><i> → Theo đó, Chi phí vận
													chuyển được tính theo nguyên tắc sau:</i></b>
											<ul>
												<li>Cân nặng (tịnh) &gt; Cân nặng quy đổi thì Chi phí
													vận chuyển= Cân nặng thực </li>
												<li>Cân nặng (tịnh) &lt; Cân nặng quy đổi thì Chi phí
													vận chuyển=Cân nặng quy đổi </li>
												<li>Khách hàng có thể cân, đo lại kích thước kiện
													hàng và thực hiện tính theo công thức trên, gửi hình ảnh xác thực
													cân nặng, kích thước của kiện hàng để xác minh thông tin tính phí
													của Orderchina24h trong trường hợp thấy chi phí của chúng tôi không
													đúng (nếu cần). </li>
											</ul>
										</div>
									</div>
								</div>
								<div class="mys-item-table">
									<h2 id="phikiemdem">4. Phí kiểm đếm sản phẩm</h2>
									<div class="table-info">
										<table class="mys-table">
											<thead>
												<tr>
													<th>Số lượng SP/đơn lớn</th>
													<th>Mức thu phí (nghìn/1 SP)</th>
													<th>Mức thu phí SP phụ kiện (giá SP &lt;10 tệ)
													</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(item, idx) in kdsp">
													<td>
														<input type="text"
															@keyup.enter.prevent="updateItemDescription(item)"
															v-model="item.description">&nbsp;
													</td>
													<td>
														<input type="text" @keyup.enter.prevent="updateItemValue(item)"
															v-model="item.value">&nbsp;<sup>đ</sup>
													</td>
													<td><input type="text" v-model="kdsp1[idx].value">&nbsp;<sup>đ</sup>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="mys-alert mys-alert-dismissible"><b>Lưu ý: </b>
									<ol type="number" style="margin-bottom:0;">
										<li>Orderchina24h sẽ kiểm tra hàng khi nhận được tại kho
											Trung Quốc theo số lượng và các thuộc tính cơ bản phân loại hàng hóa mà
											khách hàng đã thao tác chọn khi đưa vào giỏ hàng (đối với hàng thời trang
											thường là thuộc tính kích cỡ, màu sắc nhưng loại trừ trường hợp màu sắc sản
											phẩm thực tế có thể đậm/nhạt hơn so với màu sắc sản phẩm đăng bán trên
											website). Kiểm tra các lỗi phát hiện bằng mắt thường xuất các mảng lớn như
											rách/gãy/thủng.</li>
										<li>Không cam kết sẽ kiểm tra chất liệu, thông số kỹ thuật,
											chất lượng sản phẩm, hàng nhái (fake), thương hiệu sản phẩm. </li>
										<li> Khách hàng chú ý, với đơn hàng gồm nhiều sản phẩm, về
											làm nhiều đợt thì hàng về tới đâu công ty sẽ tính phí tới đó. Chứ không tính
											theo tổng đơn hàng.Chúng tôi chỉ tính hàng về đến kho tại Hà Nội hoặc HCM do
											quý khách chọn địa điểm, Quý khách sẽ tự đến kho lấy hoặc thanh toán thêm
											tiền vận chuyển từ kho Việt Nam về địa chỉ của Quý khách. </li>
									</ol>
								</div>
								<div class="mys-item-table">
									<h2 id="phidonggo">5. Phí đóng gỗ</h2>
									<div class="table-info">
										<table class="mys-table">
											<thead>
												<tr>
													<th>Trọng lượng</th>
													<th>Kg đầu tiên</th>
													<th>Kg tiếp theo</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(item, idx) in woodFees">
													<td>Phí đóng kiện</td>
													<td>
														<input type="text"
															@keyup.enter.prevent="updateItemDescription(item)"
															v-model="item.description">
													</td>
													<td>
														<input type="text" @keyup.enter.prevent="updateItemValue(item)"
															v-model="item.value"> tệ
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="mys-alert mys-alert-dismissible"><b>Lưu ý: </b><span>Đối với những hàng hóa
										dễ
										vỡ, quý khách nên đóng gỗ cho lô hàng (tùy chọn) </span></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffPriceConfigSection",
	data() {
		return {
			bulkyGoods: null,
			serviceFees: null,
			feeShipWeight: null,
			batchGoods: null,
			batchGoodsVolume: null,
			heavyGoods: null,
			kdsp: null,
			kdsp1: null,
			woodFees: null,
		};
	},
	mounted() {
		this.getBulkyGoods();
		this.getServiceFees();
		this.getFeeShipWeights();
		this.getBatchGoods();
		this.getBatchGoodsVolume();
		this.getHeavyGoods();
		this.getKDSP();
		this.getKDSP1();
		this.getWoodFee();
	},
	methods: {
		async getBulkyGoods() {
			const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.BULKY_GOODS);
			const res = await ApiCaller.post(link);
			this.bulkyGoods = res.data
		},
		async getServiceFees() {
			const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.SERVICE_FEE);
			const res = await ApiCaller.post(link);
			this.serviceFees = res.data
		},
		async getFeeShipWeights() {
			const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.FEE_SHIP_WEIGHT);
			const res = await ApiCaller.post(link);
			this.feeShipWeight = res.data
		},
		async getBatchGoods() {
			const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.BATCH_GOODS);
			const res = await ApiCaller.post(link);
			this.batchGoods = res.data
		},
		async getBatchGoodsVolume() {
			const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.BATCH_GOODS_VOLUME);
			const res = await ApiCaller.post(link);
			this.batchGoodsVolume = res.data
		},
		async getHeavyGoods() {
			const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.HEAVY_GOOD);
			const res = await ApiCaller.post(link);
			this.heavyGoods = res.data
		},
		async getKDSP() {
			const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.KDSP);
			const res = await ApiCaller.post(link);
			this.kdsp = res.data
		},
		async getKDSP1() {
			const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.KDSP_1);
			const res = await ApiCaller.post(link);
			this.kdsp1 = res.data
		},
		async getWoodFee() {
			const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.WOOD_FEE);
			const res = await ApiCaller.post(link);
			this.woodFees = res.data
		},
		async updateItemValue(item) {
			const loader = this.$loading.show();
			const payload = {
				id: item.id,
				value: item.value,
			}
			const res = await ApiCaller.post(ROUTES.Information.updateItem, payload);
			loader.hide();
			this.getBulkyGoods();
			this.getServiceFees();
			this.getFeeShipWeights();
			this.getBatchGoods();
			this.getBatchGoodsVolume();
			this.getHeavyGoods();
			this.getKDSP();
			this.getKDSP1();
			this.getWoodFee();
		},
		async updateItemDescription(item) {
			const loader = this.$loading.show();
			const payload = {
				id: item.id,
				description: item.description,
			}
			const res = await ApiCaller.post(ROUTES.Information.updateItem, payload);
			loader.hide();
			this.getBulkyGoods();
			this.getServiceFees();
			this.getFeeShipWeights();
			this.getBatchGoods();
			this.getBatchGoodsVolume();
			this.getHeavyGoods();
			this.getKDSP();
			this.getKDSP1();
			this.getWoodFee();
		}
	},
};
</script>

<!-- style custom -->
<style>
.ck-editor__editable {
	min-height: 300px !important;
}

.main-content {
	padding: 3.5rem 0 4rem;
}

.container {
	max-width: 1200px;
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

.inner-content-post {
	border-color: #e1e1e1;
	padding: 1.5rem 1.5rem 2rem;
	background: #fff;
	border: 1px solid #e1e1e1;
}

.inner-content-info {
	margin-bottom: 3.5rem;
}

.heading-title.custom {
	margin-bottom: 1rem;
	position: relative;
	text-align: center;
}

.heading-title.custom .title {
	font-size: 22px;
	font-weight: 600;
	justify-content: center;
	position: relative;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
}

.heading-title.custom .title:before {
	height: 3px;
	margin-right: 1.5rem;
	content: '';
	flex: 1;
	background: #212529;
}

.heading-title.custom .title:after {
	height: 3px;
	margin-left: 1.5rem;
	content: '';
	flex: 1;
	background: #212529;
}

.wrap-bang-gia .mys-table thead tr {
	text-align: left !important;
	background-color: #f17d59;
	/* background: none; */
	border: none;
	color: #fff;
}

.wrap-bang-gia .mys-table th:first-child {
	padding-left: .8rem;
	min-width: 80px;
}

.wrap-bang-gia .mys-table thead th {
	min-width: 80px;
}

.wrap-bang-gia .mys-table tbody tr td:first-child,
.wrap-bang-gia .mys-table tbody tr td {
	border-color: #e1e1e1;
	border-left: 1px solid #e1e1e1;
	padding-left: .4rem;
	border-right: 1px solid #e1e1e1;
}

.wrap-bang-gia .mys-table tbody tr td {
	border-color: #e1e1e1;
}

.wrap-bang-gia .mys-table tbody tr td {
	border-right: 1px solid #e1e1e1;
}

.wrap-bang-gia .mys-table tbody tr td {
	border-color: #e1e1e1;
	border-right: 1px solid #e1e1e1;
}

.wrap-bang-gia .mys-text-success {
	color: #659f13;
	font-size: 18px;
}

.txt-center {
	text-align: center;
}

.wrap-bang-gia .mys-alert-dismissible {
	color: #856404;
	background: #fff3cd;
	border: 1px solid #ffeeba;
}

.wrap-bang-gia .mys-alert {
	margin-bottom: 1.5rem;
	padding: 1rem 1rem;
}

.bxs-star {
	color: #e6bf4e;
	font-size: 18px;
}

.inner-content-post h2 {
	font-size: 16px;
}

.inner-content-post h3 {
	font-size: 14px;
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

td,
th {
	padding: 1rem .6rem .7rem;
	text-align: inherit;
	font-size: 14px;
}

tr {
	border-bottom: 1px solid #e1e1e1;
}

article {
	display: block;
}

main {
	display: block;
}

p {
	margin-bottom: 15px;
}

.inner-content-post h2 {
	font-size: 16px;
}

h1,
h2,
h3,
h4,
h5,
h6,
h1 a,
h2 a,
h3 a,
h4 a,
h5 a,
h6 a {
	color: #111111;
	font-weight: 600;
	margin-bottom: 12px;
	line-height: 1.25;
}

table {
	border-collapse: collapse;
	margin: 0 0 2.5rem;
	width: 100%;
	background-color: transparent;
	border-spacing: 0;
}
</style>
