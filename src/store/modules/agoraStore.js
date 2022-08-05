import Vue from "vue";
import {
  generateAgoraToken,
  generateResourceId,
  startRecording,
  stopRecording,
} from "../../api/Agora";
import router from "@/router";

const state = () => ({
  agora: false,
  resource: null,
  sid: null,
  recorderUid: null,
  filename: [],
  mode: "web",
});

// getters
const getters = {
  files(state) {
    return state.filename;
  },
};

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

  async getResourceId({ commit }, data) {
    try {
      const response = await generateResourceId(data);
      commit("SET_RESOURCE", response.data.resourceId);
      commit("SET_RECORDERUID", data.uid);
    } catch (error) {
      Vue.$toast.error(error);
    }
  },

  async StartRecording({ commit, dispatch, state }, data) {
    try {
      await dispatch("getResourceId", data);
      if (state.resource) {
        const response = await startRecording({
          ...data,
          resource: state.resource,
        });
        commit("SET_SID", response.data.sid);
      }
    } catch (error) {
      Vue.$toast.error(error);
    }
  },

  async StopRecording({ commit, state }) {
    try {
      const response = await stopRecording({
        channel: sessionStorage.getItem("channel"),
        uid: state.recorderUid,
        mode: state.mode,
        sid: state.sid,
        resource: state.resource,
      });
      commit("SET_FILE", response.data);
    } catch (error) {
      Vue.$toast.error(error);
    }
  },
};

// mutations
const mutations = {
  SET_AGORADETAILS(state) {
    state.agora = true;
  },
  SET_RESOURCE(state, payload) {
    state.resource = payload;
  },
  SET_RECORDERUID(state, payload) {
    state.recorderUid = payload;
  },
  SET_SID(state, payload) {
    state.sid = payload;
  },
  SET_FILE(state, payload) {
    state.filename.push(
      payload.serverResponse.extensionServiceState[1].payload.fileList[1]
        .filename
    );
  },
  RESET(state) {
    state.resource = null;
    state.sid = null;
    state.recorderUid = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
