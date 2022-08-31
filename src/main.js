import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import AgoraRtcVue from "agora-rtc-vue";
import { store } from "./store";
import VueToast from "vue-toast-notification";
import VueDraggableResizable from "vue-draggable-resizable";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import Vuelidate from "vuelidate";

//import styles
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import "bootstrap/dist/js/bootstrap.js";
import "agora-rtc-vue/lib/agora-rtc-vue.css";
import "nprogress/nprogress.css";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.config.productionTip = false;

const requireComponent = require.context(
  // The relative path of the components folder
  "./components/Base",
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(
    camelCase(
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );
  // Register component globally
  Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.component("vue-draggable-resizable", VueDraggableResizable);
Vue.use(VueToast, {
  duration: 3000,
  queue: false,
  position: "top-right",
  dismissible: true,
  pauseOnHover: true,
})
  .use(AgoraRtcVue)
  .use(Vuelidate);

new Vue({
  Vuex,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
