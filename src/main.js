import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import MessageComponent from "./components/message/main.js";
import Vuex from "vuex";
import AgoraRtcVue from "agora-rtc-vue";
import { store } from "./store";
import VueToast from "vue-toast-notification";

import "bootstrap/dist/js/bootstrap.js";
import "agora-rtc-vue/lib/agora-rtc-vue.css";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.config.productionTip = false;

Vue.prototype.$message = MessageComponent;
Vue.use(VueToast, {
  duration: 3000,
  queue: false,
  position: "top-right",
  dismissible: true,
  pauseOnHover: true,
});
Vue.use(AgoraRtcVue);
Vue.use(Vuex);
Vue.use(router);
Vue.use(store);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
