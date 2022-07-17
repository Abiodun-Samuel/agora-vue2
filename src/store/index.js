import createLogger from "vuex/dist/logger";
import Vue from "vue";
import Vuex from "vuex";
import userStore from "./modules/userStore";
import notarySessionStore from "./modules/notarySessionStore";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";

const dataState = createPersistedState({
  paths: ["userStore.userDetails"],
  storage: {
    getItem: (key) => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: (key) => ls.remove(key),
  },
});

export const store = new Vuex.Store({
  modules: {
    userStore,
    notarySessionStore,
  },
  plugins: [debug ? createLogger() : [], dataState],
});
