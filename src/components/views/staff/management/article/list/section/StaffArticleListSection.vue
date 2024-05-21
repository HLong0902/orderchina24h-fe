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
        <input
            class="button"
            type="submit"
            value="Viết bài mới"
            @click="routeToCreateArticle"
        />
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
						<td>Xem chi tiết</td>
					</tr>
					<tr v-for="(art, index) in articles">
						<td>asdfasdf</td>
						<td>
							<div class="green align-center">
								asdfasdf
							</div>
						</td>
						<td class="align-center">
							ádf
						</td>
						<td>
							<div>asdfasdf</div>
						</td>
						<td class="align-center">
							<span class="bold green">asdf</span>
						</td>

						<td class="align-center">
							ádf
						</td>

						<td>
							ádf
						</td>
						<td>
							ádf
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- <ul class="pagination">
			<li class="active"><a>1</a></li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storecn/lists_package?page=10"
					data-ci-pagination-page="2"
					>2</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storecn/lists_package?page=20"
					data-ci-pagination-page="3"
					>3</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storecn/lists_package?page=10"
					data-ci-pagination-page="2"
					rel="next"
					>Trang sau »</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storecn/lists_package?page=15500"
					data-ci-pagination-page="1551"
				>
					»</a
				>
			</li>
		</ul> -->
		<p>
			<strong>Total: <span class="green">{{ articles.length }}</span> (Items)</strong>
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

			filter: {
				bagLabel: "",
				fromDate: "",
				toDate: "",
				isSend: null,
			},

			commonStore: useCommonStore(),
		};
	},
	mounted() {
		this.getListArticles();
	},
	methods: {
		async getListArticles() {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(
				ROUTES.Bag.findByOption,
				this.filter
			);
			loader.hide();
			this.articles = res.data.data;
		},
		routeToCreateArticle() {
			this.$router.push({ path: `/staff/management/add_article`})
		}
	},
};
</script>

<!-- style custom -->
<style scoped></style>
