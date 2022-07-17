import axios from "axios";
import Vue from "vue";

const state = () => ({
  userDetails: null,
});

// getters
const getters = {};

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
      Vue.$toast.success("Login successfull");
    } catch (error) {
      console.log(error);
    }
  },
};

// mutations
const mutations = {
  USER_DETAILS(state, payload) {
    state.userDetails = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
