import createLogger from "vuex/dist/logger";
import Vue from "vue";
import Vuex from "vuex";
import authStore from "@/store/modules/auth";
import userStore from "@/store/modules/user";
import scheduleStore from "@/store/modules/schedule";
import teamStore from "@/store/modules/team";

import notarySessionStore from "./modules/notarySessionStore";
import documentStore from "./modules/documentStore";
import agoraStore from "./modules/agoraStore";
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";
const dataState = createPersistedState({
  // paths: ["authStore.token", "userStore.profile", "teamStore.teams"],
  storage: {
    getItem: (key) => Cookies.get(key),
    setItem: (key, value) => Cookies.set(key, value),
    removeItem: (key) => Cookies.remove(key),
  },
});

export const store = new Vuex.Store({
  modules: {
    scheduleStore,
    teamStore,
    authStore,
    userStore,
    notarySessionStore,
    documentStore,
    agoraStore,
  },
  // plugins: [dataState],
  plugins: debug ? [createLogger(), dataState] : [dataState],
});
