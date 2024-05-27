<script setup>
import ROUTES from "../../../../../../../constants/routeDefine";
import ApiCaller from "../../../../../../utils/ApiCaller";
import CommonUtils from "../../../../../../utils/CommonUtils";
import { useCommonStore } from "../../../../../../../store/CommonStore";
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
						<td>Mô tả</td>
						<td>Người viết</td>

						<td>Thời gian xuất bản</td>
						<td>Thời gian chỉnh sửa gần nhất</td>
						<td width="10%">Xem chi tiết</td>
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
						<td>
							<div>{{ art.description }}</div>
						</td>
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
							<a @click="viewDetail(art.id)" class="button">Chi tiết</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

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
	},
};
</script>

<!-- style custom -->
<style scoped></style>
