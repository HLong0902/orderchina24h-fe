import "./style.css";
import Vue, { createApp } from "@vue/compat";
import { createPinia } from "pinia";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import router from "./routes";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false;

library.add(fas, fab)

const pinia = createPinia();
const app = createApp(App)
app.component('fa', FontAwesomeIcon)
app.use(router)
app.use(pinia)
app.use(BootstrapVue)
app.use(IconsPlugin)
app.mount('#app')