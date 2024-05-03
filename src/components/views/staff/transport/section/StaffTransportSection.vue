
<!-- template section -->
<template>
<div id="content" class="clearfix fullwidth">
    

    <h2 class="title "> Danh sách vận đơn</h2>
    <div class="filer_box">
         <form action="https://ql.hangquangchau24h.vn/ships/transport" method="GET">
                        Mã vận đơn:<input type="text" value="" name="filter_invoiceid">
            Username:<input type="text" value="" name="filter_username">
            Họ Tên:<input type="text" value="" name="filter_fullname">
<!--             Trạng thái:
                <select name="">
                    <option value="">Tất cả</option>
                    <option value="">Demo trạng thái</option>
                </select> -->
			Ngày:<input class="pickdate_from hasDatepicker" type="text" id="datepicker_from" value="" name="filter_startdate_create_date"> 
			- <input class="pickdate_to hasDatepicker" type="text" id="datepicker_to" value="" name="filter_enddate_create_date">	
			<br><br>
			Ship Bến xe :<input type="checkbox" value="1" name="filter_is_ship_benxe">
			
			Đã nhận tiền ?:
                <select name="filter_is_get">
                    <option value="">Tất cả</option>
                    <option value="0">Chưa nhận</option>
                    <option value="1">Đã nhận</option>
                </select>
			
			Nhân viên :<input type="text" value="" name="filter_user_approve">
			Trạng thái :
                <select name="filter_is_paid">
                    <option value="">Tất cả</option>
                    <option value="0">Chưa thanh toán</option>
                    <option value="1">Đã thanh toán</option>
                </select>
            <input class="button" type="submit" value="Tìm kiếm">
                        
        </form> 
    </div>
	<form id="formData" action="ships/confirm_money" method="POST">
	<input type="hidden" name="returnURL" value="aHR0cHM6Ly9xbC5oYW5ncXVhbmdjaGF1MjRoLnZuL3NoaXBzL3RyYW5zcG9ydA==">
    <div class="gridtable">
        <table>
            <tbody>
                <tr>
                    <td>
                        STT
                    </td>
                    <td>
                        Ngày tạo vận đơn
                    </td>
                    <td>
                        Mã Vận đơn
                    </td>
                    <td>
                        Khách hàng    
                    </td>
                    <td>
                        Khối lượng(kg)
                    </td>
                    <td>
                        Số tiền(VNĐ)
                    </td>
                    <td>
                        Đã thanh toán( VNĐ )
                    </td>
                    <td>
                        Ghi chú
                    </td>
                    <td>
                        Trạng thái
                    </td>
                    <td width="150px">
                        Chỉnh sửa
                    </td>
					                  </tr>
                            <tr class="">
                    <td class="align-center">
                       1                       
                    </td>
                    <td> 
                        <div class="green">
                            20-03-2024 16:57:09                        </div> 
                    </td>
                    <td>
                        <div class="black uppercase">
                             HQC4947NT_249_VC2                        </div> 
						 <span class="green"></span>
                    </td>
                    <td>
                        <div class="blue">lengandabliss</div>
                        <div>lengandabliss</div>                
                    </td>
                    <td>
                        <span>
                                                    </span>                                                            
                    </td>
                    <td>
                         <span class="red">
                            105,846                         </span>
                    </td>
                    <td>
                        <span class="red">0</span>                   
                    </td>
                    <td>
                        <span>
                            42*42*45 /8000= 9.9 kg = 29.9 tệ x 3540 = 105.846đ                        </span>
                    </td>
                    <td width="150px">
                        <div class="green">
                            <span class="daduyet">Đã duyệt</span>                        </div> 
                        <div>
                            TIEN KHO SG(2024-03-20 16:57:09)                        </div>                     
                    </td>
                    <td>
                        
                                            </td>
					                </tr>
                            <tr class="">
                    <td class="align-center">
                       2                       
                    </td>
                    <td> 
                        <div class="green">
                            20-03-2024 16:46:37                        </div> 
                    </td>
                    <td>
                        <div class="black uppercase">
                             HQC4947NT_249_VC1                        </div> 
						 <span class="green"></span>
                    </td>
                    <td>
                        <div class="blue">lengandabliss</div>
                        <div>lengandabliss</div>                
                    </td>
                    <td>
                        <span>
                                                    </span>                                                            
                    </td>
                    <td>
                         <span class="red">
                            136,998                         </span>
                    </td>
                    <td>
                        <span class="red">0</span>                   
                    </td>
                    <td>
                        <span>
                            33*35*130 /8000 = 18.7 kg = 38.7 tệ x 3540 = 136,998đ                        </span>
                    </td>
                    <td width="150px">
                        <div class="green">
                            <span class="daduyet">Đã duyệt</span>                        </div> 
                        <div>
                            TIEN KHO SG(2024-03-20 16:46:37)                        </div>                     
                    </td>
                    <td>
                        
                                            </td>
					                </tr>
                            <tr class="">
                    <td class="align-center">
                       3                       
                    </td>
                    <td> 
                        <div class="green">
                            26-02-2024 15:12:25                        </div> 
                    </td>
                    <td>
                        <div class="black uppercase">
                             HQC17977NT_24_VC1                        </div> 
						 <span class="green"></span>
                    </td>
                    <td>
                        <div class="blue">Hayate2501</div>
                        <div>Nguyễn Hữu Huy</div>                
                    </td>
                    <td>
                        <span>
                                                    </span>                                                            
                    </td>
                    <td>
                         <span class="red">
                            121,351                         </span>
                    </td>
                    <td>
                        <span class="red">0</span>                   
                    </td>
                    <td>
                        <span>
                            34*48*70 /8000 = 14.28kg = 34.28 tệ x 3540 = 121.351đ                        </span>
                    </td>
                    <td width="150px">
                        <div class="green">
                            <span class="daduyet">Đã duyệt</span>                        </div> 
                        <div>
                            TIEN KHO SG(2024-02-26 15:12:25)                        </div>                     
                    </td>
                    <td>
                        
                                            </td>
					                </tr>
                            <tr class="">
                    <td class="align-center">
                       4                       
                    </td>
                    <td> 
                        <div class="green">
                            24-01-2024 15:26:55                        </div> 
                    </td>
                    <td>
                        <div class="black uppercase">
                             HQC4947NT_238_VC1                        </div> 
						 <span class="green"></span>
                    </td>
                    <td>
                        <div class="blue">lengandabliss</div>
                        <div>lengandabliss</div>                
                    </td>
                    <td>
                        <span>
                                                    </span>                                                            
                    </td>
                    <td>
                         <span class="red">
                            253,676                         </span>
                    </td>
                    <td>
                        <span class="red">0</span>                   
                    </td>
                    <td>
                        <span>
                            70*72*80 / 8000 = 51.66kg = 71.66 tệ x 3540=253.676đ                         </span>
                    </td>
                    <td width="150px">
                        <div class="green">
                            <span class="daduyet">Đã duyệt</span>                        </div> 
                        <div>
                            TIEN KHO SG(2024-01-24 15:26:55)                        </div>                     
                    </td>
                    <td>
                        
                                            </td>
					                </tr>
                            <tr class="">
                    <td class="align-center">
                       5                       
                    </td>
                    <td> 
                        <div class="green">
                            19-01-2024 15:24:44                        </div> 
                    </td>
                    <td>
                        <div class="black uppercase">
                             HQC5448NT_66_VC1                        </div> 
						 <span class="green"></span>
                    </td>
                    <td>
                        <div class="blue">diemttn1610</div>
                        <div>diemttn1610</div>                
                    </td>
                    <td>
                        <span>
                                                    </span>                                                            
                    </td>
                    <td>
                         <span class="red">
                            210,630                         </span>
                    </td>
                    <td>
                        <span class="red">0</span>                   
                    </td>
                    <td>
                        <span>
                            30*77*137 /8000 = 39.5 kg = 59.5 tệ x 3540 = 210.630đ                        </span>
                    </td>
                    <td width="150px">
                        <div class="green">
                            <span class="daduyet">Đã duyệt</span>                        </div> 
                        <div>
                            TIEN KHO SG(2024-01-19 15:24:44)                        </div>                     
                    </td>
                    <td>
                        
                                            </td>
					                </tr>
                            <tr class="">
                    <td class="align-center">
                       6                       
                    </td>
                    <td> 
                        <div class="green">
                            19-01-2024 15:19:22                        </div> 
                    </td>
                    <td>
                        <div class="black uppercase">
                             HQC4947NT_239_VC1                        </div> 
						 <span class="green"></span>
                    </td>
                    <td>
                        <div class="blue">lengandabliss</div>
                        <div>lengandabliss</div>                
                    </td>
                    <td>
                        <span>
                                                    </span>                                                            
                    </td>
                    <td>
                         <span class="red">
                            183,619                         </span>
                    </td>
                    <td>
                        <span class="red">0</span>                   
                    </td>
                    <td>
                        <span>
                            50*60*85 /8000 = 31.87 kg = 51.87 tệ x 3540 =183.619đ                        </span>
                    </td>
                    <td width="150px">
                        <div class="green">
                            <span class="daduyet">Đã duyệt</span>                        </div> 
                        <div>
                            TIEN KHO SG(2024-01-19 15:19:22)                        </div>                     
                    </td>
                    <td>
                        
                                            </td>
					                </tr>
                            <tr class="">
                    <td class="align-center">
                       7                       
                    </td>
                    <td> 
                        <div class="green">
                            19-01-2024 15:13:25                        </div> 
                    </td>
                    <td>
                        <div class="black uppercase">
                             HQC4947NT_238_VC1                        </div> 
						 <span class="green"></span>
                    </td>
                    <td>
                        <div class="blue">lengandabliss</div>
                        <div>lengandabliss</div>                
                    </td>
                    <td>
                        <span>
                                                    </span>                                                            
                    </td>
                    <td>
                         <span class="red">
                            164,822                         </span>
                    </td>
                    <td>
                        <span class="red">0</span>                   
                    </td>
                    <td>
                        <span>
                            41*72*72 /8000 = 26.56 kg = 46.56 tệ x 3540 =164.822đ                        </span>
                    </td>
                    <td width="150px">
                        <div class="green">
                            <span class="daduyet">Đã duyệt</span>                        </div> 
                        <div>
                            TIEN KHO SG(2024-01-19 15:13:25)                        </div>                     
                    </td>
                    <td>
                        
                                            </td>
					                </tr>
                            <tr class="">
                    <td class="align-center">
                       8                       
                    </td>
                    <td> 
                        <div class="green">
                            19-01-2024 15:10:30                        </div> 
                    </td>
                    <td>
                        <div class="black uppercase">
                             HQC4947NT_238_VC1                        </div> 
						 <span class="green"></span>
                    </td>
                    <td>
                        <div class="blue">lengandabliss</div>
                        <div>lengandabliss</div>                
                    </td>
                    <td>
                        <span>
                                                    </span>                                                            
                    </td>
                    <td>
                         <span class="red">
                            225,321                         </span>
                    </td>
                    <td>
                        <span class="red">0</span>                   
                    </td>
                    <td>
                        <span>
                            50*72*97 /8000 = 43.65 kg = 63.65 tệ x 3540 = 225.321đ                        </span>
                    </td>
                    <td width="150px">
                        <div class="green">
                            <span class="daduyet">Đã duyệt</span>                        </div> 
                        <div>
                            TIEN KHO SG(2024-01-19 15:10:30)                        </div>                     
                    </td>
                    <td>
                        
                                            </td>
					                </tr>
                            <tr class="">
                    <td class="align-center">
                       9                       
                    </td>
                    <td> 
                        <div class="green">
                            19-01-2024 15:05:06                        </div> 
                    </td>
                    <td>
                        <div class="black uppercase">
                             HQC4947NT_238_VC1                        </div> 
						 <span class="green"></span>
                    </td>
                    <td>
                        <div class="blue">lengandabliss</div>
                        <div>lengandabliss</div>                
                    </td>
                    <td>
                        <span>
                                                    </span>                                                            
                    </td>
                    <td>
                         <span class="red">
                            332,406                         </span>
                    </td>
                    <td>
                        <span class="red">0</span>                   
                    </td>
                    <td>
                        <span>
                            45*62*212 /8000 = 73.9 kg = 93.9 tệ x 3540 = 332.406đ                        </span>
                    </td>
                    <td width="150px">
                        <div class="green">
                            <span class="daduyet">Đã duyệt</span>                        </div> 
                        <div>
                            TIEN KHO SG(2024-01-19 15:05:06)                        </div>                     
                    </td>
                    <td>
                        
                                            </td>
					                </tr>
                            <tr class="">
                    <td class="align-center">
                       10                       
                    </td>
                    <td> 
                        <div class="green">
                            15-01-2024 18:13:53                        </div> 
                    </td>
                    <td>
                        <div class="black uppercase">
                             HQC4947NT_238_VC1                        </div> 
						 <span class="green"></span>
                    </td>
                    <td>
                        <div class="blue">lengandabliss</div>
                        <div>lengandabliss</div>                
                    </td>
                    <td>
                        <span>
                                                    </span>                                                            
                    </td>
                    <td>
                         <span class="red">
                            200,010                         </span>
                    </td>
                    <td>
                        <span class="red">0</span>                   
                    </td>
                    <td>
                        <span>
                            40*77*95 /8000 = 36.5 kg = 56.5 tệ x 3540 = 200.010đ                        </span>
                    </td>
                    <td width="150px">
                        <div class="green">
                            <span class="daduyet">Đã duyệt</span>                        </div> 
                        <div>
                            TIEN KHO SG(2024-01-15 18:13:53)                        </div>                     
                    </td>
                    <td>
                        
                                            </td>
					                </tr>
                        </tbody>
        </table>
    </div>
	</form>
    <ul class="pagination"><li class="active"><a>1</a></li><li><a href="https://ql.hangquangchau24h.vn/ships/transport?page=10" data-ci-pagination-page="2">2</a></li><li><a href="https://ql.hangquangchau24h.vn/ships/transport?page=20" data-ci-pagination-page="3">3</a></li><li><a href="https://ql.hangquangchau24h.vn/ships/transport?page=10" data-ci-pagination-page="2" rel="next">Trang sau »</a></li><li><a href="https://ql.hangquangchau24h.vn/ships/transport?page=150" data-ci-pagination-page="16"> »</a></li></ul>    <p><strong>Total: <span class="green">153</span> (Items)</strong></p>
</div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'StaffTransportSection',
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