import Vue from "vue";
import { generateAgoraToken } from "../../api/Agora";
import router from "@/router";

const state = () => ({
  agora: false,
});

// getters
const getters = {};

// actions
const actions = {
  getAgoraToken({ commit, state }, payload) {
    generateAgoraToken(payload)
      .then((response) => {
        commit("SET_AGORADETAILS");
        if (state.agora) {
          sessionStorage.setItem("uid", response.data.uid);
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("appid", response.data.appid);
          sessionStorage.setItem("channel", response.data.channelName);

          router.push({ path: "/notary-session" });
        }
      })
      .catch((error) => Vue.$toast.error(error));
  },
};

// mutations
const mutations = {
  SET_AGORADETAILS(state) {
    state.agora = true;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
