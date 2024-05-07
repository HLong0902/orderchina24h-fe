<!-- template section -->
<template>
<div id="content" class="container fullwidth">
	

    <div class="lists_ship clearfix">
      <h2 class="align-center">ĐÓNG BAO</h2>
  </div>
  
  <div class="formSearchVandon">
      <center><h3 class="blue">Mã BAO : <strong>15554</strong>  |  <span class="green">Nhãn BAO : </span><strong>BH15554 - HN-HOANGMAI</strong></h3></center>
      <center><p class="black">Tạo bởi : <strong>huong.mh lúc 07-05-2024 14:59:46</strong></p></center>
      <center><p class="note red">Chú ý : Chỉ đóng được các mã cùng kho với bao hàng.</p></center>
      <center><p class="note red">Trường hợp nhập mã bằng tay chỉ cần nhấn Phím [TAB] sau khi nhập là tự động xử lý.</p></center>
      <form action="" method="post" id="ajaxFormImport">
          Mã vận đơn: 
          <input type="text" name="keyword" value="" id="keywordsearch">
          <input type="hidden" name="pid" value="15554">
          <input type="hidden" name="row_id" value="0" id="row_id">
          <input type="hidden" name="pname" value="BH15554 - HN-HOANGMAI">
          <input type="hidden" name="store" value="0">
          <input type="hidden" name="sub_store" value="1">
          <input type="hidden" name="controller" value="storecn">
          <input type="hidden" name="task" value="add_ship_to_package">
          <input type="submit" name="" value="Đóng bao">

      </form>
      <div id="response_ajax_search"></div>
      <div id="response_ajax_append">
          <ul>	
                              
                          </ul>
      </div>
  </div>

</div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'ImportPackageSection',
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