import Vue from "vue";
import { generateAgoraToken, generateResourceId } from "../../api/Agora";
import router from "@/router";

const state = () => ({
  agora: false,
  resource: null,
  sid: null,
  recordUID: null,
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

          router.push({ path: "/waiting-page" });
        }
      })
      .catch((error) => Vue.$toast.error(error));
  },

  getResourceId() {
    generateResourceId()
      .then((response) => {
        console.log(response);
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
