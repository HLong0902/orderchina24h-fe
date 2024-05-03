<!-- template section -->
<template>
<div id="content" class="clearfix fullwidth">
    

    <div class="lists_ship clearfix">
        <h2 class="float-left">Danh sách đóng bao tại kho Trung Quốc</h2>
       
    </div>
    <div class="filer_box">
         <form action="https://ql.hangquangchau24h.vn/storecn/lists_package" method="GET">
                        Nhãn:<input type="text" value="" name="filter_name">
            Ngày:<input class="pickdate_from hasDatepicker" type="text" id="datepicker_from" value="" name="filter_startdate_create_date"> - <input class="pickdate_to hasDatepicker" type="text" id="datepicker_to" value="" name="filter_enddate_create_date">

            Kho TQ :
            <select name="filter_status">
                <option value="" selected="">Tất cả</option>
                <option value="0">Chưa gửi</option>
                <option value="1">Đã gửi</option>
            </select>
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
                        Mã bao
                    </td>
					<td>
                        Nhãn bao
                    </td>
					<td>
                        Ghi chú
                    </td>
					<td>
                        Kho VN nhận
                    </td>
					
                    <td>
                        Cân nặng(kg)
                    </td>
                    <td>
                        Trạng thái
                    </td>
                    <td>
                        Chỉnh sửa
                    </td>
                </tr>
                    <tr>
                    <td>
                        1 
                    </td>
                    <td>
                        <div class="green align-center">
                           15510                        </div>
                    </td>
					<td class="align-center">
                        <div class="blue ">
                           BH15510 - HN-HOANGMAI                        </div>
							<p><strong>Cân nặng thực bao hàng</strong></p>
														<form action="" class="ajaxFormItem ajaxAuto" method="POST">
								<input placeholder="Cân nặng thực bao hàng" type="text" value="0" size="6" name="total_real_weight" class="label_edit">
								<input type="hidden" name="pid" value="15510" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_total_real_weight" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
							                    </td>
					<td>
						
													<form action="" class="ajaxFormItem ajaxAuto" method="POST">	
								<input placeholder="Ghi chú bao hàng" type="text" value="03-05-20/CN135VN26178" name="package_note" class="label_edit">
								<input type="hidden" name="pid" value="15510" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_package_note" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
												</td>
					<td class="align-center">
                        <span class="bold green">Kho HN</span>                    </td>
                   
                    <td class="align-center">
						<p>
                           <span class="green">0</span> KG / 
						   <span class="green">0</span> NDT 
                       </p>
                        (<span class="red">0</span> Mã) <a target="_blank" href="https://ql.hangquangchau24h.vn/storecn/shipinpack?pid=15510">Danh sách mã</a>
                    </td>
                  
                    <td>
						<p>admin đã tạo lúc 03-05-2024 22:24:48</p>
												                    </td>
                    <td>
                                                                                    <form action="" class="ajaxFormPackages" method="POST">
                                    <input type="hidden" name="id" value="15510">
                                    <input type="hidden" name="controller" value="storecn">
                                    <input type="hidden" name="task" value="send_package">
                                    <a class="button-link special-green" onclick="submitAjax(this)"> Gửi hàng </a>
                                    <div class="ajax_response alert dismissable"></div>
                                </form>
                            							
							 <a href="https://ql.hangquangchau24h.vn/storecn/importpackage/15510">Đóng bao</a>							
                                                                    </td>
                </tr>
                        <tr>
                    <td>
                        2 
                    </td>
                    <td>
                        <div class="green align-center">
                           15509                        </div>
                    </td>
					<td class="align-center">
                        <div class="blue ">
                           BH15509 - HN-HOANGMAI                        </div>
							<p><strong>Cân nặng thực bao hàng</strong></p>
														<form action="" class="ajaxFormItem ajaxAuto" method="POST">
								<input placeholder="Cân nặng thực bao hàng" type="text" value="0" size="6" name="total_real_weight" class="label_edit">
								<input type="hidden" name="pid" value="15509" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_total_real_weight" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
							                    </td>
					<td>
						
													<form action="" class="ajaxFormItem ajaxAuto" method="POST">	
								<input placeholder="Ghi chú bao hàng" type="text" value="03-05-19/CN135VN26179" name="package_note" class="label_edit">
								<input type="hidden" name="pid" value="15509" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_package_note" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
												</td>
					<td class="align-center">
                        <span class="bold green">Kho HN</span>                    </td>
                   
                    <td class="align-center">
						<p>
                           <span class="green">0</span> KG / 
						   <span class="green">0</span> NDT 
                       </p>
                        (<span class="red">0</span> Mã) <a target="_blank" href="https://ql.hangquangchau24h.vn/storecn/shipinpack?pid=15509">Danh sách mã</a>
                    </td>
                  
                    <td>
						<p>admin đã tạo lúc 03-05-2024 22:24:48</p>
												                    </td>
                    <td>
                                                                                    <form action="" class="ajaxFormPackages" method="POST">
                                    <input type="hidden" name="id" value="15509">
                                    <input type="hidden" name="controller" value="storecn">
                                    <input type="hidden" name="task" value="send_package">
                                    <a class="button-link special-green" onclick="submitAjax(this)"> Gửi hàng </a>
                                    <div class="ajax_response alert dismissable"></div>
                                </form>
                            							
							 <a href="https://ql.hangquangchau24h.vn/storecn/importpackage/15509">Đóng bao</a>							
                                                                    </td>
                </tr>
                        <tr>
                    <td>
                        3 
                    </td>
                    <td>
                        <div class="green align-center">
                           15508                        </div>
                    </td>
					<td class="align-center">
                        <div class="blue ">
                           BH15508 - HN-HOANGMAI                        </div>
							<p><strong>Cân nặng thực bao hàng</strong></p>
														<form action="" class="ajaxFormItem ajaxAuto" method="POST">
								<input placeholder="Cân nặng thực bao hàng" type="text" value="0" size="6" name="total_real_weight" class="label_edit">
								<input type="hidden" name="pid" value="15508" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_total_real_weight" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
							                    </td>
					<td>
						
													<form action="" class="ajaxFormItem ajaxAuto" method="POST">	
								<input placeholder="Ghi chú bao hàng" type="text" value="03-05-18/CN135VN26180" name="package_note" class="label_edit">
								<input type="hidden" name="pid" value="15508" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_package_note" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
												</td>
					<td class="align-center">
                        <span class="bold green">Kho HN</span>                    </td>
                   
                    <td class="align-center">
						<p>
                           <span class="green">0</span> KG / 
						   <span class="green">0</span> NDT 
                       </p>
                        (<span class="red">0</span> Mã) <a target="_blank" href="https://ql.hangquangchau24h.vn/storecn/shipinpack?pid=15508">Danh sách mã</a>
                    </td>
                  
                    <td>
						<p>admin đã tạo lúc 03-05-2024 22:24:48</p>
												                    </td>
                    <td>
                                                                                    <form action="" class="ajaxFormPackages" method="POST">
                                    <input type="hidden" name="id" value="15508">
                                    <input type="hidden" name="controller" value="storecn">
                                    <input type="hidden" name="task" value="send_package">
                                    <a class="button-link special-green" onclick="submitAjax(this)"> Gửi hàng </a>
                                    <div class="ajax_response alert dismissable"></div>
                                </form>
                            							
							 <a href="https://ql.hangquangchau24h.vn/storecn/importpackage/15508">Đóng bao</a>							
                                                                    </td>
                </tr>
                        <tr>
                    <td>
                        4 
                    </td>
                    <td>
                        <div class="green align-center">
                           15507                        </div>
                    </td>
					<td class="align-center">
                        <div class="blue ">
                           BH15507 - HN-HOANGMAI                        </div>
							<p><strong>Cân nặng thực bao hàng</strong></p>
														<form action="" class="ajaxFormItem ajaxAuto" method="POST">
								<input placeholder="Cân nặng thực bao hàng" type="text" value="0" size="6" name="total_real_weight" class="label_edit">
								<input type="hidden" name="pid" value="15507" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_total_real_weight" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
							                    </td>
					<td>
						
													<form action="" class="ajaxFormItem ajaxAuto" method="POST">	
								<input placeholder="Ghi chú bao hàng" type="text" value="03-05-17/CN135VN26181" name="package_note" class="label_edit">
								<input type="hidden" name="pid" value="15507" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_package_note" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
												</td>
					<td class="align-center">
                        <span class="bold green">Kho HN</span>                    </td>
                   
                    <td class="align-center">
						<p>
                           <span class="green">0</span> KG / 
						   <span class="green">0</span> NDT 
                       </p>
                        (<span class="red">0</span> Mã) <a target="_blank" href="https://ql.hangquangchau24h.vn/storecn/shipinpack?pid=15507">Danh sách mã</a>
                    </td>
                  
                    <td>
						<p>admin đã tạo lúc 03-05-2024 22:24:48</p>
												                    </td>
                    <td>
                                                                                    <form action="" class="ajaxFormPackages" method="POST">
                                    <input type="hidden" name="id" value="15507">
                                    <input type="hidden" name="controller" value="storecn">
                                    <input type="hidden" name="task" value="send_package">
                                    <a class="button-link special-green" onclick="submitAjax(this)"> Gửi hàng </a>
                                    <div class="ajax_response alert dismissable"></div>
                                </form>
                            							
							 <a href="https://ql.hangquangchau24h.vn/storecn/importpackage/15507">Đóng bao</a>							
                                                                    </td>
                </tr>
                        <tr>
                    <td>
                        5 
                    </td>
                    <td>
                        <div class="green align-center">
                           15506                        </div>
                    </td>
					<td class="align-center">
                        <div class="blue ">
                           BH15506 - HN-HOANGMAI                        </div>
							<p><strong>Cân nặng thực bao hàng</strong></p>
														<form action="" class="ajaxFormItem ajaxAuto" method="POST">
								<input placeholder="Cân nặng thực bao hàng" type="text" value="0" size="6" name="total_real_weight" class="label_edit">
								<input type="hidden" name="pid" value="15506" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_total_real_weight" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
							                    </td>
					<td>
						
													<form action="" class="ajaxFormItem ajaxAuto" method="POST">	
								<input placeholder="Ghi chú bao hàng" type="text" value="03-05-16/CN135VN26183" name="package_note" class="label_edit">
								<input type="hidden" name="pid" value="15506" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_package_note" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
												</td>
					<td class="align-center">
                        <span class="bold green">Kho HN</span>                    </td>
                   
                    <td class="align-center">
						<p>
                           <span class="green">0</span> KG / 
						   <span class="green">0</span> NDT 
                       </p>
                        (<span class="red">0</span> Mã) <a target="_blank" href="https://ql.hangquangchau24h.vn/storecn/shipinpack?pid=15506">Danh sách mã</a>
                    </td>
                  
                    <td>
						<p>admin đã tạo lúc 03-05-2024 22:24:48</p>
												                    </td>
                    <td>
                                                                                    <form action="" class="ajaxFormPackages" method="POST">
                                    <input type="hidden" name="id" value="15506">
                                    <input type="hidden" name="controller" value="storecn">
                                    <input type="hidden" name="task" value="send_package">
                                    <a class="button-link special-green" onclick="submitAjax(this)"> Gửi hàng </a>
                                    <div class="ajax_response alert dismissable"></div>
                                </form>
                            							
							 <a href="https://ql.hangquangchau24h.vn/storecn/importpackage/15506">Đóng bao</a>							
                                                                    </td>
                </tr>
                        <tr>
                    <td>
                        6 
                    </td>
                    <td>
                        <div class="green align-center">
                           15505                        </div>
                    </td>
					<td class="align-center">
                        <div class="blue ">
                           BH15505 - HN-HOANGMAI                        </div>
							<p><strong>Cân nặng thực bao hàng</strong></p>
														<form action="" class="ajaxFormItem ajaxAuto" method="POST">
								<input placeholder="Cân nặng thực bao hàng" type="text" value="0" size="6" name="total_real_weight" class="label_edit">
								<input type="hidden" name="pid" value="15505" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_total_real_weight" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
							                    </td>
					<td>
						
													<form action="" class="ajaxFormItem ajaxAuto" method="POST">	
								<input placeholder="Ghi chú bao hàng" type="text" value="03-05-15/CN135VN26184" name="package_note" class="label_edit">
								<input type="hidden" name="pid" value="15505" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_package_note" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
												</td>
					<td class="align-center">
                        <span class="bold green">Kho HN</span>                    </td>
                   
                    <td class="align-center">
						<p>
                           <span class="green">0</span> KG / 
						   <span class="green">0</span> NDT 
                       </p>
                        (<span class="red">0</span> Mã) <a target="_blank" href="https://ql.hangquangchau24h.vn/storecn/shipinpack?pid=15505">Danh sách mã</a>
                    </td>
                  
                    <td>
						<p>admin đã tạo lúc 03-05-2024 22:24:47</p>
												                    </td>
                    <td>
                                                                                    <form action="" class="ajaxFormPackages" method="POST">
                                    <input type="hidden" name="id" value="15505">
                                    <input type="hidden" name="controller" value="storecn">
                                    <input type="hidden" name="task" value="send_package">
                                    <a class="button-link special-green" onclick="submitAjax(this)"> Gửi hàng </a>
                                    <div class="ajax_response alert dismissable"></div>
                                </form>
                            							
							 <a href="https://ql.hangquangchau24h.vn/storecn/importpackage/15505">Đóng bao</a>							
                                                                    </td>
                </tr>
                        <tr>
                    <td>
                        7 
                    </td>
                    <td>
                        <div class="green align-center">
                           15504                        </div>
                    </td>
					<td class="align-center">
                        <div class="blue ">
                           BH15504 - HN-HOANGMAI                        </div>
							<p><strong>Cân nặng thực bao hàng</strong></p>
														<form action="" class="ajaxFormItem ajaxAuto" method="POST">
								<input placeholder="Cân nặng thực bao hàng" type="text" value="0" size="6" name="total_real_weight" class="label_edit">
								<input type="hidden" name="pid" value="15504" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_total_real_weight" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
							                    </td>
					<td>
						
													<form action="" class="ajaxFormItem ajaxAuto" method="POST">	
								<input placeholder="Ghi chú bao hàng" type="text" value="03-05-14/CN135VN26185" name="package_note" class="label_edit">
								<input type="hidden" name="pid" value="15504" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_package_note" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
												</td>
					<td class="align-center">
                        <span class="bold green">Kho HN</span>                    </td>
                   
                    <td class="align-center">
						<p>
                           <span class="green">0</span> KG / 
						   <span class="green">0</span> NDT 
                       </p>
                        (<span class="red">0</span> Mã) <a target="_blank" href="https://ql.hangquangchau24h.vn/storecn/shipinpack?pid=15504">Danh sách mã</a>
                    </td>
                  
                    <td>
						<p>admin đã tạo lúc 03-05-2024 22:24:47</p>
												                    </td>
                    <td>
                                                                                    <form action="" class="ajaxFormPackages" method="POST">
                                    <input type="hidden" name="id" value="15504">
                                    <input type="hidden" name="controller" value="storecn">
                                    <input type="hidden" name="task" value="send_package">
                                    <a class="button-link special-green" onclick="submitAjax(this)"> Gửi hàng </a>
                                    <div class="ajax_response alert dismissable"></div>
                                </form>
                            							
							 <a href="https://ql.hangquangchau24h.vn/storecn/importpackage/15504">Đóng bao</a>							
                                                                    </td>
                </tr>
                        <tr>
                    <td>
                        8 
                    </td>
                    <td>
                        <div class="green align-center">
                           15503                        </div>
                    </td>
					<td class="align-center">
                        <div class="blue ">
                           BH15503 - HN-HOANGMAI                        </div>
							<p><strong>Cân nặng thực bao hàng</strong></p>
														<form action="" class="ajaxFormItem ajaxAuto" method="POST">
								<input placeholder="Cân nặng thực bao hàng" type="text" value="0" size="6" name="total_real_weight" class="label_edit">
								<input type="hidden" name="pid" value="15503" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_total_real_weight" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
							                    </td>
					<td>
						
													<form action="" class="ajaxFormItem ajaxAuto" method="POST">	
								<input placeholder="Ghi chú bao hàng" type="text" value="03-05-13/CN135VN26186" name="package_note" class="label_edit">
								<input type="hidden" name="pid" value="15503" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_package_note" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
												</td>
					<td class="align-center">
                        <span class="bold green">Kho HN</span>                    </td>
                   
                    <td class="align-center">
						<p>
                           <span class="green">0</span> KG / 
						   <span class="green">0</span> NDT 
                       </p>
                        (<span class="red">0</span> Mã) <a target="_blank" href="https://ql.hangquangchau24h.vn/storecn/shipinpack?pid=15503">Danh sách mã</a>
                    </td>
                  
                    <td>
						<p>admin đã tạo lúc 03-05-2024 22:24:47</p>
												                    </td>
                    <td>
                                                                                    <form action="" class="ajaxFormPackages" method="POST">
                                    <input type="hidden" name="id" value="15503">
                                    <input type="hidden" name="controller" value="storecn">
                                    <input type="hidden" name="task" value="send_package">
                                    <a class="button-link special-green" onclick="submitAjax(this)"> Gửi hàng </a>
                                    <div class="ajax_response alert dismissable"></div>
                                </form>
                            							
							 <a href="https://ql.hangquangchau24h.vn/storecn/importpackage/15503">Đóng bao</a>							
                                                                    </td>
                </tr>
                        <tr>
                    <td>
                        9 
                    </td>
                    <td>
                        <div class="green align-center">
                           15502                        </div>
                    </td>
					<td class="align-center">
                        <div class="blue ">
                           BH15502 - HN-HOANGMAI                        </div>
							<p><strong>Cân nặng thực bao hàng</strong></p>
														<form action="" class="ajaxFormItem ajaxAuto" method="POST">
								<input placeholder="Cân nặng thực bao hàng" type="text" value="0" size="6" name="total_real_weight" class="label_edit">
								<input type="hidden" name="pid" value="15502" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_total_real_weight" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
							                    </td>
					<td>
						
													<form action="" class="ajaxFormItem ajaxAuto" method="POST">	
								<input placeholder="Ghi chú bao hàng" type="text" value="03-05-12/CN135VN26188" name="package_note" class="label_edit">
								<input type="hidden" name="pid" value="15502" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_package_note" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
												</td>
					<td class="align-center">
                        <span class="bold green">Kho HN</span>                    </td>
                   
                    <td class="align-center">
						<p>
                           <span class="green">0</span> KG / 
						   <span class="green">0</span> NDT 
                       </p>
                        (<span class="red">0</span> Mã) <a target="_blank" href="https://ql.hangquangchau24h.vn/storecn/shipinpack?pid=15502">Danh sách mã</a>
                    </td>
                  
                    <td>
						<p>admin đã tạo lúc 03-05-2024 22:24:47</p>
												                    </td>
                    <td>
                                                                                    <form action="" class="ajaxFormPackages" method="POST">
                                    <input type="hidden" name="id" value="15502">
                                    <input type="hidden" name="controller" value="storecn">
                                    <input type="hidden" name="task" value="send_package">
                                    <a class="button-link special-green" onclick="submitAjax(this)"> Gửi hàng </a>
                                    <div class="ajax_response alert dismissable"></div>
                                </form>
                            							
							 <a href="https://ql.hangquangchau24h.vn/storecn/importpackage/15502">Đóng bao</a>							
                                                                    </td>
                </tr>
                        <tr>
                    <td>
                        10 
                    </td>
                    <td>
                        <div class="green align-center">
                           15501                        </div>
                    </td>
					<td class="align-center">
                        <div class="blue ">
                           BH15501 - HN-HOANGMAI                        </div>
							<p><strong>Cân nặng thực bao hàng</strong></p>
														<form action="" class="ajaxFormItem ajaxAuto" method="POST">
								<input placeholder="Cân nặng thực bao hàng" type="text" value="0" size="6" name="total_real_weight" class="label_edit">
								<input type="hidden" name="pid" value="15501" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_total_real_weight" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
							                    </td>
					<td>
						
													<form action="" class="ajaxFormItem ajaxAuto" method="POST">	
								<input placeholder="Ghi chú bao hàng" type="text" value="03-05-11/CN135VN26189" name="package_note" class="label_edit">
								<input type="hidden" name="pid" value="15501" class="label_edit">
								<input type="hidden" name="controller" value="storecn" class="label_edit">
								<input type="hidden" name="task" value="update_package_note" class="label_edit">
								<a class="button-link" onclick="submitAjax(this)">Lưu</a>
								<div class="ajax_response alert dismissable"></div>
							</form>
												</td>
					<td class="align-center">
                        <span class="bold green">Kho HN</span>                    </td>
                   
                    <td class="align-center">
						<p>
                           <span class="green">0</span> KG / 
						   <span class="green">0</span> NDT 
                       </p>
                        (<span class="red">0</span> Mã) <a target="_blank" href="https://ql.hangquangchau24h.vn/storecn/shipinpack?pid=15501">Danh sách mã</a>
                    </td>
                  
                    <td>
						<p>admin đã tạo lúc 03-05-2024 22:24:47</p>
												                    </td>
                    <td>
                                                                                    <form action="" class="ajaxFormPackages" method="POST">
                                    <input type="hidden" name="id" value="15501">
                                    <input type="hidden" name="controller" value="storecn">
                                    <input type="hidden" name="task" value="send_package">
                                    <a class="button-link special-green" onclick="submitAjax(this)"> Gửi hàng </a>
                                    <div class="ajax_response alert dismissable"></div>
                                </form>
                            							
							 <a href="https://ql.hangquangchau24h.vn/storecn/importpackage/15501">Đóng bao</a>							
                                                                    </td>
                </tr>
                    </tbody>
        </table>
    </div>
    <ul class="pagination"><li class="active"><a>1</a></li><li><a href="https://ql.hangquangchau24h.vn/storecn/lists_package?page=10" data-ci-pagination-page="2">2</a></li><li><a href="https://ql.hangquangchau24h.vn/storecn/lists_package?page=20" data-ci-pagination-page="3">3</a></li><li><a href="https://ql.hangquangchau24h.vn/storecn/lists_package?page=10" data-ci-pagination-page="2" rel="next">Trang sau »</a></li><li><a href="https://ql.hangquangchau24h.vn/storecn/lists_package?page=15500" data-ci-pagination-page="1551"> »</a></li></ul>    <p><strong>Total: <span class="green">15510</span> (Items)</strong></p>
</div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'StaffListPackageSection',
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

</style>