<!-- template section -->
<template>
<div id="content" class="clearfix fullwidth">
    <h2 class="title ">Danh sách kiện hàng từ ngày <span class="big red">2024-04-18</span> đến ngày <span class="big red">2024-05-03</span></h2>
    <div class="filer_box">
         <form action="https://ql.hangquangchau24h.vn/ships/listpackage" method="GET">
            
            Mã vận đơn:<input type="text" value="" name="filter_shipid">
            Mã đơn:<input type="text" value="" name="filter_invoiceid">
            Bao:<input type="text" value="" name="filter_name">
            <!--Mã đơn:<input type="text" value="" name="filter_invoiceid">-->
            Username:<input type="text" value="" name="filter_username">
			
            Trạng thái:
            <select name="cur_status">
                <option value="">Tất cả</option>
                <option value="nbph">NB Phát hàng</option>
                <option value="nktq">Nhập Kho TQ</option>
                <option value="dk">Đã Kiểm</option>
                <option value="nkvn">Nhập Kho VN</option>
                <option value="dg">Đã Giao</option>
             </select>
			
			
			Tư vấn :
            <select name="filter_uid">
                <option value="">Tất cả</option>
                						<option value="42">duongyen</option>
											<option value="47">anhtuyp</option>
											<option value="49">sinh</option>
											<option value="53">huongquynh</option>
											<option value="60">duongthibich1998md@gmail.com</option>
											<option value="65">TRANG-CSKH</option>
											<option value="91">CSKH-SINH2</option>
											<option value="93">THUHIEN-CSKH</option>
											<option value="94">THUYLINH-CSKH</option>
											<option value="100">LE LUA - CSKH</option>
											<option value="118">CSKH-NGOC</option>
											<option value="119">CSKH-HUYENTRANG2</option>
											<option value="120">CSKH-MAIPHUONG</option>
											<option value="121">CSKH-NGOCKHANH</option>
					             </select>
			<br>
			Ngày:<input class="pickdate_from hasDatepicker" type="text" id="datepicker_from" value="2024-04-18" name="filter_startdate_created_date"> 
			- <input class="pickdate_to hasDatepicker" type="text" id="datepicker_to" value="2024-05-03" name="filter_enddate_created_date">	
			Tìm ngày tháng của trạng thái
			<select name="date_status">
                <option value="nbph">NB Phát hàng</option>
                <option value="nktq">Nhập Kho TQ</option>
                <option value="dk">Đã Kiểm</option>
                <option value="nkvn">Nhập Kho VN</option>
                <option value="dg">Đã Giao</option>
             </select>
			
            <input class="button" type="submit" value="Tìm kiếm">            
        </form> 
    </div>
	<form id="formData" action="ships/confirm_money" method="POST">
	<input type="hidden" name="returnURL" value="aHR0cHM6Ly9xbC5oYW5ncXVhbmdjaGF1MjRoLnZuL3NoaXBzL2xpc3RwYWNrYWdl">
    <div class="gridtable">
         <table class="table tbl-cart tbl-history">
		        <tbody>
					<tr class="header-cart-table">
		                <td style="width:5%" class="text-center">#</td>
		                <td class="text-center">Mã kiện</td>
						<td class="text-center">Khách hàng</td>
		                <td class="text-center">Mã đơn</td>		                
		                <td class="text-center">Bao hàng</td>
		                <td class="text-center">Vận đơn TQ</td>
						<td class="text-center">Cân nặng </td>
						<td class="text-center">Thể tích</td>
						<td class="text-center">Số Lượng</td>
						<td class="text-center">Trạng thái</td>
		                <td style="width: 255px;" class="text-center">Lịch sử</td>
		            </tr>
						            <tr class="even">
						<td class="align-center">1</td>
						
		                <td class="align-center">
							<p class="black"><a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=773284031498508">273472</a></p>
						</td>
						<td class="text-center"><a href="https://ql.hangquangchau24h.vn/ships/listpackage?filter_username=tranbichdiepbr">tranbichdiepbr</a></td>
						<td>
															<a class="blue" target="_blank" href="https://ql.hangquangchau24h.vn/orders/detail/272584">HQC3827NT_333</a>
													</td>
						<td class="align-center big">
							
							--						</td>
						<td>
							<a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=773284031498508">773284031498508</a>
						</td>
						
		                <td class="align-center big">
							-						</td>
						<td class="align-center big">
						 -						</td>
						<td class="align-center big">
						 						</td>
						<td class="align-center big">
																<span class="is_export ">NB Phát hàng</span>
													</td>
		                <td class="text-center ">
														<a tooltip-content="#tipDetailPackageContent273472" class="custom-link hasTooltip tooltipstered">Chi tiết <i class="fa fa-question-circle"></i></a>
							<div id="tipDetailPackageContent273472" class="tipContent hidden">
								<div style="width:400px">
									<table class="table borderless">
										<tbody><tr>
											<td>NB phát hàng</td> 
											<td class="right"><strong>2024-05-03 16:50:03</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Gửi bao từ TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Nhận bao tại VN</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Kiểm hàng</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho VN</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Giao hàng</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
									</tbody></table>
								</div>
							</div>																
		                </td>             
		            </tr>
							            <tr class="odd">
						<td class="align-center">2</td>
						
		                <td class="align-center">
							<p class="black"><a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=433858789712269">273471</a></p>
						</td>
						<td class="text-center"><a href="https://ql.hangquangchau24h.vn/ships/listpackage?filter_username=Trantuyetkha19">Trantuyetkha19</a></td>
						<td>
															<a class="blue" target="_blank" href="https://ql.hangquangchau24h.vn/orders/detail/273464">HQC612NT_2363</a>
													</td>
						<td class="align-center big">
							
							--						</td>
						<td>
							<a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=433858789712269">433858789712269</a>
						</td>
						
		                <td class="align-center big">
							0.3 KG						</td>
						<td class="align-center big">
						 -						</td>
						<td class="align-center big">
						 						</td>
						<td class="align-center big">
																<span class="is_import_vn ">Đã nhập kho VN</span>
													</td>
		                <td class="text-center ">
														<a tooltip-content="#tipDetailPackageContent273471" class="custom-link hasTooltip tooltipstered">Chi tiết <i class="fa fa-question-circle"></i></a>
							<div id="tipDetailPackageContent273471" class="tipContent hidden">
								<div style="width:400px">
									<table class="table borderless">
										<tbody><tr>
											<td>NB phát hàng</td> 
											<td class="right"><strong>2024-05-03 16:12:55</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Gửi bao từ TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Nhận bao tại VN</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Kiểm hàng</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 16:13:03</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho VN</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 16:12:57</strong></td> 
										</tr>
										<tr>
											<td>Giao hàng</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
									</tbody></table>
								</div>
							</div>																
		                </td>             
		            </tr>
							            <tr class="even">
						<td class="align-center">3</td>
						
		                <td class="align-center">
							<p class="black"><a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=433855213906428">273470</a></p>
						</td>
						<td class="text-center"><a href="https://ql.hangquangchau24h.vn/ships/listpackage?filter_username=quangthienktck">quangthienktck</a></td>
						<td>
															<a class="blue" target="_blank" href="https://ql.hangquangchau24h.vn/orders/detail/275132">HQC8276NT_198</a>
													</td>
						<td class="align-center big">
							
							--						</td>
						<td>
							<a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=433855213906428">433855213906428</a>
						</td>
						
		                <td class="align-center big">
							0.5 KG						</td>
						<td class="align-center big">
						 -						</td>
						<td class="align-center big">
						 						</td>
						<td class="align-center big">
																<span class="is_import_vn ">Đã nhập kho VN</span>
													</td>
		                <td class="text-center ">
														<a tooltip-content="#tipDetailPackageContent273470" class="custom-link hasTooltip tooltipstered">Chi tiết <i class="fa fa-question-circle"></i></a>
							<div id="tipDetailPackageContent273470" class="tipContent hidden">
								<div style="width:400px">
									<table class="table borderless">
										<tbody><tr>
											<td>NB phát hàng</td> 
											<td class="right"><strong>2024-05-03 16:11:58</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Gửi bao từ TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Nhận bao tại VN</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Kiểm hàng</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 16:12:05</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho VN</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 16:12:02</strong></td> 
										</tr>
										<tr>
											<td>Giao hàng</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
									</tbody></table>
								</div>
							</div>																
		                </td>             
		            </tr>
							            <tr class="odd">
						<td class="align-center">4</td>
						
		                <td class="align-center">
							<p class="black"><a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=433858713390419">273469</a></p>
						</td>
						<td class="text-center"><a href="https://ql.hangquangchau24h.vn/ships/listpackage?filter_username=quangthienktck">quangthienktck</a></td>
						<td>
															<a class="blue" target="_blank" href="https://ql.hangquangchau24h.vn/orders/detail/275132">HQC8276NT_198</a>
													</td>
						<td class="align-center big">
							
							--						</td>
						<td>
							<a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=433858713390419">433858713390419</a>
						</td>
						
		                <td class="align-center big">
							0.2 KG						</td>
						<td class="align-center big">
						 -						</td>
						<td class="align-center big">
						 						</td>
						<td class="align-center big">
																<span class="is_import_vn ">Đã nhập kho VN</span>
													</td>
		                <td class="text-center ">
														<a tooltip-content="#tipDetailPackageContent273469" class="custom-link hasTooltip tooltipstered">Chi tiết <i class="fa fa-question-circle"></i></a>
							<div id="tipDetailPackageContent273469" class="tipContent hidden">
								<div style="width:400px">
									<table class="table borderless">
										<tbody><tr>
											<td>NB phát hàng</td> 
											<td class="right"><strong>2024-05-03 16:11:26</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Gửi bao từ TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Nhận bao tại VN</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Kiểm hàng</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 16:11:34</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho VN</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 16:11:28</strong></td> 
										</tr>
										<tr>
											<td>Giao hàng</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
									</tbody></table>
								</div>
							</div>																
		                </td>             
		            </tr>
							            <tr class="even">
						<td class="align-center">5</td>
						
		                <td class="align-center">
							<p class="black"><a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=78790742144920">273468</a></p>
						</td>
						<td class="text-center"><a href="https://ql.hangquangchau24h.vn/ships/listpackage?filter_username=zincherry357">zincherry357</a></td>
						<td>
															<a class="blue" target="_blank" href="https://ql.hangquangchau24h.vn/orders/detail/275454">HQC17636NT_150</a>
													</td>
						<td class="align-center big">
							
							--						</td>
						<td>
							<a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=78790742144920">78790742144920</a>
						</td>
						
		                <td class="align-center big">
							0.3 KG						</td>
						<td class="align-center big">
						 -						</td>
						<td class="align-center big">
						 						</td>
						<td class="align-center big">
																<span class="is_import_vn ">Đã nhập kho VN</span>
													</td>
		                <td class="text-center ">
														<a tooltip-content="#tipDetailPackageContent273468" class="custom-link hasTooltip tooltipstered">Chi tiết <i class="fa fa-question-circle"></i></a>
							<div id="tipDetailPackageContent273468" class="tipContent hidden">
								<div style="width:400px">
									<table class="table borderless">
										<tbody><tr>
											<td>NB phát hàng</td> 
											<td class="right"><strong>2024-05-03 15:54:47</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Gửi bao từ TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Nhận bao tại VN</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Kiểm hàng</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 15:54:56</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho VN</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 15:54:50</strong></td> 
										</tr>
										<tr>
											<td>Giao hàng</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
									</tbody></table>
								</div>
							</div>																
		                </td>             
		            </tr>
							            <tr class="odd">
						<td class="align-center">6</td>
						
		                <td class="align-center">
							<p class="black"><a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=JT3072238329927">273467</a></p>
						</td>
						<td class="text-center"><a href="https://ql.hangquangchau24h.vn/ships/listpackage?filter_username=Trantuyetkha19">Trantuyetkha19</a></td>
						<td>
															<a class="blue" target="_blank" href="https://ql.hangquangchau24h.vn/orders/detail/275274">HQC612NT_2370</a>
													</td>
						<td class="align-center big">
							
							--						</td>
						<td>
							<a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=JT3072238329927">JT3072238329927</a>
						</td>
						
		                <td class="align-center big">
							0.1 KG						</td>
						<td class="align-center big">
						 -						</td>
						<td class="align-center big">
						 						</td>
						<td class="align-center big">
																<span class="is_import_vn ">Đã nhập kho VN</span>
													</td>
		                <td class="text-center ">
														<a tooltip-content="#tipDetailPackageContent273467" class="custom-link hasTooltip tooltipstered">Chi tiết <i class="fa fa-question-circle"></i></a>
							<div id="tipDetailPackageContent273467" class="tipContent hidden">
								<div style="width:400px">
									<table class="table borderless">
										<tbody><tr>
											<td>NB phát hàng</td> 
											<td class="right"><strong>2024-05-03 15:51:43</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Gửi bao từ TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Nhận bao tại VN</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Kiểm hàng</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 15:51:56</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho VN</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 15:51:46</strong></td> 
										</tr>
										<tr>
											<td>Giao hàng</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
									</tbody></table>
								</div>
							</div>																
		                </td>             
		            </tr>
							            <tr class="even">
						<td class="align-center">7</td>
						
		                <td class="align-center">
							<p class="black"><a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=433856520907784">273466</a></p>
						</td>
						<td class="text-center"><a href="https://ql.hangquangchau24h.vn/ships/listpackage?filter_username=Leny">Leny</a></td>
						<td>
															<a class="blue" target="_blank" href="https://ql.hangquangchau24h.vn/orders/detail/274554">HQC12719NT_23</a>
													</td>
						<td class="align-center big">
							
							--						</td>
						<td>
							<a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=433856520907784">433856520907784</a>
						</td>
						
		                <td class="align-center big">
							0.3 KG						</td>
						<td class="align-center big">
						 -						</td>
						<td class="align-center big">
						 						</td>
						<td class="align-center big">
																<span class="is_import_vn ">Đã nhập kho VN</span>
													</td>
		                <td class="text-center ">
														<a tooltip-content="#tipDetailPackageContent273466" class="custom-link hasTooltip tooltipstered">Chi tiết <i class="fa fa-question-circle"></i></a>
							<div id="tipDetailPackageContent273466" class="tipContent hidden">
								<div style="width:400px">
									<table class="table borderless">
										<tbody><tr>
											<td>NB phát hàng</td> 
											<td class="right"><strong>2024-05-03 15:49:24</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Gửi bao từ TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Nhận bao tại VN</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Kiểm hàng</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 15:49:42</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho VN</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 15:49:27</strong></td> 
										</tr>
										<tr>
											<td>Giao hàng</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
									</tbody></table>
								</div>
							</div>																
		                </td>             
		            </tr>
							            <tr class="odd">
						<td class="align-center">8</td>
						
		                <td class="align-center">
							<p class="black"><a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=433855942871325">273465</a></p>
						</td>
						<td class="text-center"><a href="https://ql.hangquangchau24h.vn/ships/listpackage?filter_username=quangthienktck">quangthienktck</a></td>
						<td>
															<a class="blue" target="_blank" href="https://ql.hangquangchau24h.vn/orders/detail/275132">HQC8276NT_198</a>
													</td>
						<td class="align-center big">
							
							--						</td>
						<td>
							<a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=433855942871325">433855942871325</a>
						</td>
						
		                <td class="align-center big">
							0.8 KG						</td>
						<td class="align-center big">
						 -						</td>
						<td class="align-center big">
						 						</td>
						<td class="align-center big">
																<span class="is_import_vn ">Đã nhập kho VN</span>
													</td>
		                <td class="text-center ">
														<a tooltip-content="#tipDetailPackageContent273465" class="custom-link hasTooltip tooltipstered">Chi tiết <i class="fa fa-question-circle"></i></a>
							<div id="tipDetailPackageContent273465" class="tipContent hidden">
								<div style="width:400px">
									<table class="table borderless">
										<tbody><tr>
											<td>NB phát hàng</td> 
											<td class="right"><strong>2024-05-03 15:46:30</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Gửi bao từ TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Nhận bao tại VN</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Kiểm hàng</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 15:47:11</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho VN</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 15:46:36</strong></td> 
										</tr>
										<tr>
											<td>Giao hàng</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
									</tbody></table>
								</div>
							</div>																
		                </td>             
		            </tr>
							            <tr class="even">
						<td class="align-center">9</td>
						
		                <td class="align-center">
							<p class="black"><a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=433856538666982">273464</a></p>
						</td>
						<td class="text-center"><a href="https://ql.hangquangchau24h.vn/ships/listpackage?filter_username=quangthienktck">quangthienktck</a></td>
						<td>
															<a class="blue" target="_blank" href="https://ql.hangquangchau24h.vn/orders/detail/275132">HQC8276NT_198</a>
													</td>
						<td class="align-center big">
							
							--						</td>
						<td>
							<a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=433856538666982">433856538666982</a>
						</td>
						
		                <td class="align-center big">
							0.5 KG						</td>
						<td class="align-center big">
						 -						</td>
						<td class="align-center big">
						 						</td>
						<td class="align-center big">
																<span class="is_import_vn ">Đã nhập kho VN</span>
													</td>
		                <td class="text-center ">
														<a tooltip-content="#tipDetailPackageContent273464" class="custom-link hasTooltip tooltipstered">Chi tiết <i class="fa fa-question-circle"></i></a>
							<div id="tipDetailPackageContent273464" class="tipContent hidden">
								<div style="width:400px">
									<table class="table borderless">
										<tbody><tr>
											<td>NB phát hàng</td> 
											<td class="right"><strong>2024-05-03 15:45:58</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Gửi bao từ TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Nhận bao tại VN</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Kiểm hàng</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 15:46:12</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho VN</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 15:46:02</strong></td> 
										</tr>
										<tr>
											<td>Giao hàng</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
									</tbody></table>
								</div>
							</div>																
		                </td>             
		            </tr>
							            <tr class="odd">
						<td class="align-center">10</td>
						
		                <td class="align-center">
							<p class="black"><a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=78789748359677">273463</a></p>
						</td>
						<td class="text-center"><a href="https://ql.hangquangchau24h.vn/ships/listpackage?filter_username=Leny">Leny</a></td>
						<td>
															<a class="blue" target="_blank" href="https://ql.hangquangchau24h.vn/orders/detail/274557">HQC12719NT_23</a>
													</td>
						<td class="align-center big">
							
							--						</td>
						<td>
							<a target="_blank" href="https://ql.hangquangchau24h.vn/ship/finship?shipid=78789748359677">78789748359677</a>
						</td>
						
		                <td class="align-center big">
							0.2 KG						</td>
						<td class="align-center big">
						 -						</td>
						<td class="align-center big">
						 						</td>
						<td class="align-center big">
																<span class="is_import_vn ">Đã nhập kho VN</span>
													</td>
		                <td class="text-center ">
														<a tooltip-content="#tipDetailPackageContent273463" class="custom-link hasTooltip tooltipstered">Chi tiết <i class="fa fa-question-circle"></i></a>
							<div id="tipDetailPackageContent273463" class="tipContent hidden">
								<div style="width:400px">
									<table class="table borderless">
										<tbody><tr>
											<td>NB phát hàng</td> 
											<td class="right"><strong>2024-05-03 15:44:51</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Gửi bao từ TQ</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Nhận bao tại VN</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
										<tr>
											<td>Kiểm hàng</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 15:44:59</strong></td> 
										</tr>
										<tr>
											<td>Nhập kho VN</td> 
											<td class="right"><strong>TIEN KHO SG-2024-05-03 15:44:54</strong></td> 
										</tr>
										<tr>
											<td>Giao hàng</td> 
											<td class="right"><strong>-</strong></td> 
										</tr>
									</tbody></table>
								</div>
							</div>																
		                </td>             
		            </tr>
									
		        </tbody>
		    </table>
    </div>
	</form>
    <ul class="pagination"><li class="active"><a>1</a></li><li><a href="https://ql.hangquangchau24h.vn/ships/listpackage?page=10" data-ci-pagination-page="2">2</a></li><li><a href="https://ql.hangquangchau24h.vn/ships/listpackage?page=20" data-ci-pagination-page="3">3</a></li><li><a href="https://ql.hangquangchau24h.vn/ships/listpackage?page=10" data-ci-pagination-page="2" rel="next">Trang sau »</a></li><li><a href="https://ql.hangquangchau24h.vn/ships/listpackage?page=2760" data-ci-pagination-page="277"> »</a></li></ul>    <p><strong>Total: <span class="green">2766</span> (Items)</strong></p>
</div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'StaffPackageSection',
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
@import '../../../../../assets/styles/staff-styles.css';
@import '../../../../../assets/styles/staff-menu-styles.css';
</style>