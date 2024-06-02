<script setup>
import ROUTES from "../../../../../../../constants/routeDefine";
import ApiCaller from "../../../../../../utils/ApiCaller";
import CommonUtils from "../../../../../../utils/CommonUtils";
import { useCommonStore } from "../../../../../../../store/CommonStore";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CONSTANT from "../../../../../../../constants/constants";
</script>

<!-- template section -->
<template>
	<div id="content" class="clearfix fullwidth">
		<div class="lists_ship clearfix">
			<h2 class="float-left">Tạo bài viết mới</h2>
		</div>
		<br>
		<div>
			<b style="font-size: 16px; font-weight: 400;">Tiêu đề bài viết:</b>
			<input v-model="title" size="50" type="text" required="" />
			<br>
			<br>
			<ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
			<input class="button" type="submit" value="Lưu bài viết" @click="createArticle" />
		</div>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffArticleEditSection",
	data() {
		return {

			id: this.$route.params.articleId,
			article: {},

			title: '',
			editor: ClassicEditor,
			editorData: "<p></p>",
			editorConfig: CONSTANT.CKEDITOR_DEFAULT_CONFIG,
		};
	},
	mounted() {
		this.getArticle();
	},
	methods: {
		async getArticle() {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(ROUTES.Article.findById, { id: this.id });
			loader.hide();
			if (res.status != 200) {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			this.article = res.data;
			this.title = this.article.title;
			this.editorData = this.article.body;
		},
		async createArticle() {
			if (!this.title || this.title.length == 0) {
				this.$toast.error(`Tiêu đề bài viết bắt buộc nhập`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			const loader = this.$loading.show();
			const payload = {
				id: this.id,
				title: this.title,
				body: this.editorData,
			}
			const res = await ApiCaller.post(ROUTES.Article.update, payload);
			if (res.status == 200) {
				this.$toast.success(`Chỉnh sửa bài viết thành công`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				this.$router.push({ path: "/staff/management/articles" });
			} else {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
			loader.hide();
		}
	},
};
</script>

<!-- style custom -->
<style>
.ck-editor__editable {
	min-height: 300px !important;
}
</style>
