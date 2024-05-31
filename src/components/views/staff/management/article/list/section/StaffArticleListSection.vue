<script setup>
import ROUTES from "../../../../../../../constants/routeDefine";
import ApiCaller from "../../../../../../utils/ApiCaller";
import CommonUtils from "../../../../../../utils/CommonUtils";
import { useCommonStore } from "../../../../../../../store/CommonStore";
import CONSTANT from "../../../../../../../constants/constants";
</script>

<!-- template section -->
<template>
	<div id="content" class="clearfix fullwidth">
		<div class="lists_ship clearfix">
			<h2 class="float-left">Danh sách bài viết</h2>
		</div>
		<input class="button" type="submit" value="Viết bài mới" @click="routeToCreateArticle" />
		<div class="gridtable">
			<table>
				<tbody>
					<tr>
						<td>STT</td>
						<td>Tiêu đề</td>
						<td>Nội dung</td>
						<!-- <td>Mã bài viết</td> -->
						<td>Người viết</td>

						<td>Thời gian tạo</td>
						<td>Thời gian chỉnh sửa</td>
						<td width="10%">Thao tác</td>
					</tr>
					<tr v-for="(art, index) in articles">
						<td>{{ index + 1 }}</td>
						<td>
							<div class="green align-center">
								{{ art.title }}
							</div>
						</td>
						<td class="align-center">
							<div v-html="art.body.substring(0, 200)"></div>
						</td>
						<!-- <td>
							<span class="red">{{ art.code }}</span>
						</td> -->
						<td class="align-center">
							<span class="bold green">{{ art.createUser }}</span>
						</td>

						<td class="align-center">
							{{ CommonUtils.formatDate(art.createDate) }}
						</td>

						<td>
							{{
								art.updateDate
									? CommonUtils.formatDate(art.updateDate)
									: ""
							}}
						</td>
						<td>
							<a @click="viewDetail(art.id)" class="button bold">Chi tiết</a>
							<br>
							<a v-if="!CONSTANT.DEFAULT_ARTICLE.includes(art.code)"
								@click="openModal('confirm-delete', art)" class="button-link red">Xoá bài viết</a>

						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<b-modal hide-header-close centered title-html="Xác nhận thao tác!" id="confirm-delete">
			<div>
				<span>Bạn có chắc chắn muốn xoá bài viết
					<span class="blue">{{ selectedArticle.title }}</span>
					không?
				</span>
			</div>
			<template #modal-footer>
				<b-button variant="outline-primary" style="font-size: 12px" squared
					@click="deleteArticle(selectedArticle.id, selectedArticle.title)" class="squared-button">
					Xác nhận
				</b-button>
				<b-button variant="outline-danger" style="font-size: 12px" squared class="squared-button"
					@click="hideModal(`confirm-delete`)">
					Đóng
				</b-button>
			</template>
		</b-modal>

		<p>
			<strong>Total:
				<span class="green">{{ articles.length }}</span> (Items)</strong>
		</p>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffArticleListSection",
	data() {
		return {
			articles: [],

			selectedArticle: {},

			commonStore: useCommonStore(),
		};
	},
	mounted() {
		this.getListArticles();
	},
	methods: {
		async getListArticles() {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(ROUTES.Article.findAll);
			loader.hide();
			if (res.status != 200) {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
			}
			this.articles = res.data;
		},
		routeToCreateArticle() {
			this.$router.push({ path: `/staff/management/add_article` });
		},
		viewDetail(id) {
			window.open(
				this.$router.resolve({
					name: "StaffArticleEditPage",
					params: { articleId: id },
				}).href,
				"_blank"
			);
		},
		openModal(modal, art) {
			this.$bvModal.show(modal);
			this.selectedArticle = art;
		},
		hideModal(id) {
			this.$bvModal.hide(id);
			this.selectedArticle = {};
		},
		async deleteArticle(id, title) {
			const payload = {
				id: id,
			}
			const loader = this.$loading.show();
			const res = await ApiCaller.post(ROUTES.Article.delete, payload);
			loader.hide()
			if (res.status != 200) {
				this.$toast.error(`${res.data.message}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			} else {
				this.$toast.success(`Đã xoá bài viết ${title}`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
			}
			this.hideModal(`confirm-delete`);
			this.getListArticles();
		},
	},
};
</script>

<!-- style custom -->
<style scoped></style>
