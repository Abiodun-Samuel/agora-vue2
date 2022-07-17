import axios from "axios";
import Vue from "vue";

const state = () => ({
  session_details: {
    agora_token: null,
    channel: null,
    appId: null,
    //  agora_token:
    //    "0063a7155f8a86345d7ad31066ac2a8ed48IAAS5KkI60E9ZxuECCtg2LaWHY8YC0vhlpQUovec2jcG9Ax+f9jdOgzqIgCGkq0zv4rUYgQAAQBPR9NiAgBPR9NiAwBPR9NiBABPR9Ni",
    //  channel: "test",
    //  appId: "3a7155f8a86345d7ad31066ac2a8ed48",
  },
});

// getters
const getters = {};

// mutations
const mutations = {
  SESSION_DETAILS(state, payload) {
    state.session_details.agora_token = payload.token;
    state.session_details.channel = payload.channel;
    state.session_details.appId = payload.appId;
  },
};

// actions
const actions = {
  async login({ commit }, payload) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${payload}`,
        },
      };

      const response = await axios.get(
        `http://tonote-api.herokuapp.com/api/v1/user/profile`,
        config
      );
      commit("USER_DETAILS", response.data.data);
      Vue.$toast.success("Login success");
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
