import Vue from "vue";
import { Profile } from "../../api/User";

const state = () => ({
  userProfile: {
    name: null,
  },
  token: null,
});

// getters
const getters = {
  token(state) {
    return state.token;
  },
  userDetails(state) {
    return state.userProfile;
  },
};

// actions
const actions = {
  setToken({ commit, dispatch, state }, payload) {
    if (payload) {
      // set  auth token
      commit("SET_TOKEN", payload);
      // dispatch login action
      if (state.token) {
        dispatch("getUserProfile");
      }
    } else {
      Vue.$toast.error("Unauthorized");
    }
  },
  getUserProfile({ commit, dispatch, state }) {
    Profile()
      .then((response) => {
        commit("SET_USERPROFILE", response.data.data);
        // dispatch agoratoken action
        dispatch(
          "agoraStore/getAgoraToken",
          {
            channel: "demo",
            uid: state.userProfile.name,
          },
          { root: true }
        );

        Vue.$toast.success("Welcome");
      })
      .catch((error) => Vue.$toast.error(error));
  },
};

// mutations
const mutations = {
  SET_TOKEN(state, payload) {
    state.token = payload;
  },
  SET_USERPROFILE(state, payload) {
    state.userProfile.name = `${payload.first_name} ${payload.last_name}`;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
