import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import MessageComponent from "./components/message/main.js";
import Vuex from "vuex";
import AgoraRtcVue from "agora-rtc-vue";
import { store } from "./store";
import VueToast from "vue-toast-notification";

import VueDraggableResizable from 'vue-draggable-resizable'

// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'


import "bootstrap/dist/js/bootstrap.js";
import "agora-rtc-vue/lib/agora-rtc-vue.css";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.config.productionTip = false;

// Vue.prototype.$message = MessageComponent;
Vue.component("vue-draggable-resizable", VueDraggableResizable);
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
