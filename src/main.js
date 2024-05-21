import "./style.css";
import Vue, { createApp } from "@vue/compat";
import { createPinia } from "pinia";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import router from "./routes";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import CKEditor from "@ckeditor/ckeditor5-vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;

library.add(far, fab, fas);

const pinia = createPinia();
const app = createApp(App);
app.component("fa", FontAwesomeIcon);
app.use(router);
app.use(
	LoadingPlugin,
	{
		// props
		canCancel: false, // default false
		color: "#238bfa",
		loader: "dots",
		width: 64,
		height: 64,
		backgroundColor: "#e6e6e680",
		opacity: 0.5,
		zIndex: 999,
	},
	{
		// slots
	}
);
app.use(CKEditor);
app.use(ToastPlugin);
app.use(pinia);
app.use(BootstrapVue);
app.use(IconsPlugin);
app.mount("#app");
