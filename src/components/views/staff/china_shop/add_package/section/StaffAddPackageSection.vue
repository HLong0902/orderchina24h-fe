<!-- template section -->
<template>
<div id="content" class="clearfix fullwidth">
	

	<h2>Tạo bao hàng</h2>
	<form action="" method="POST">
	
		<div class="group-input">
			<label class="label_input">Kho việt nam nhận hàng</label>
			<!--<select name="store" required>
				<option value="0">Hà Nội</option>
				<option value="1">Sài Gòn</option>
			</select>-->
			<select name="store" required="">
				<optgroup label="Hà Nội" value="0">
										<option value="1">Hoàng Mai - Hà Nội</option>
									</optgroup>
				<optgroup label="Sài gòn" value="1">
										<option value="3">102/59 Phan Huy Ích - Phường 15 - Quận Tân Bình - HCM</option>
									</optgroup>
			</select>
		</div>
		
		<div class="group-input">
			<label class="label_input">Ghi chú</label>
			<textarea placeholder="Ghi chú" type="text" name="note"></textarea>
		</div>
		
		<input type="submit" name="save" value="Thêm mới">
	</form>
</div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'StaffAddPackageSection',
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