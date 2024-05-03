<!-- template section -->
<template>
<div id="content" class="fullwidth clearfix">
    

    <div class="lists_ship clearfix">
					<h2 class="align-center">Kiểm hàng &amp; Nhập kho </h2>
				    
    </div>
	<br>
	<center><p class="red big">Chú ý : Chỉ kiểm đểm số lượng khi phí dịch vụ &lt;= 2%</p></center>
    <div class="formSearchVandon">
        <form action="" method="post" id="ajaxFormSearch">
			<span>Tìm theo mã shop : </span><input type="checkbox" name="findType" style="width:20px;height:20px;"> <br>
						Mã vận đơn:	
						<input type="text" name="keyword" value="">
			
            <input type="hidden" name="controller" value="tools">
            <input type="hidden" name="task" value="check_order_ajax">
            <input type="hidden" name="type_check" value="storecn_check">
            <input type="submit" name="" value="Tìm kiếm"><br>
			<!-- <input type="checkbox" name="sweep" value="1"> Quét nhập kho -->
						<input type="checkbox" name="addShipUndefine" value="1"> Tự động lưu mã không xác định nếu không tìm thấy mẫ VĐ
			        </form>
    </div>

    <div id="response_ajax_search"></div>
	<div class="all_ajax_tables">
    <div id="item_2" class="clearfix">
        <div id="response_ajax_listShip"></div>
        <div id="response_ajax_listStoreShip"></div>
    </div>
	
    <div id="response_ajax_listOrder"></div>

    <div id="item_3" class="clearfix">
        <div id="response_ajax_listOrderIsCheck"></div>
        <div id="response_ajax_listShipUndefined"></div>
    </div>

    <div id="item_4" class="clearfix">
        <div id="response_ajax_listShipDelay"></div>

    </div>
	</div>
</div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'StaffCheckOrderSection',
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