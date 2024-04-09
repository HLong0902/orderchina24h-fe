import "./style.css";
import Vue, { createApp } from "@vue/compat";
import { createPinia } from "pinia";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import router from "./routes";

Vue.config.productionTip = false;

const pinia = createPinia();
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(BootstrapVue)
app.use(IconsPlugin)
app.mount('#app')