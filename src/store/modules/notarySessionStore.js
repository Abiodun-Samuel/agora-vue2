import axios from "axios";
// import Vue from "vue";

const state = () => ({
  agora_token: null,
  channel: null,
  appid: null,
  uid: null,
});

// getters
const getters = {};

// mutations
const mutations = {
  SESSION_DETAILS(state, payload) {
    state.agora_token = payload.token;
    state.channel = payload.channelName;
    state.appid = payload.appid;
    state.uid = payload.uid;
  },
};

// actions
const actions = {
  async AGORA_CALL_DETAILS({ commit }, payload) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let response;
      response = await axios.get(
        `https://gene-agora-token.herokuapp.com/rtc/test/publisher/uid/${payload}`,
        config
      );
      if (response.data.token.includes("/")) {
        response = await axios.get(
          `https://gene-agora-token.herokuapp.com/rtc/test/publisher/uid/${payload}`,
          config
        );
      }
      commit("SESSION_DETAILS", response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
