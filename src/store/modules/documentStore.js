import axios from "axios";
// import { useToast } from "vue-toast-notification";
// const toast = useToast();
// toast.error("You did it!");

const state = () => ({
  passport: null,
  passports: [],
  isDisabled: true,
  show: false,
  documents: {
    files: [],
    loading: false,
  },
});

// getters
const getters = {};

// mutations
const mutations = {
  loadPassport(state, payload) {
    state.passport = payload;
    state.isDisabled = false;
  },
  unLoadPassport(state) {
    state.passport = null;
    state.isDisabled = true;
  },
  showPassport(state) {
    state.show = true;
  },
  allPassports(state, payload) {
    state.passports = payload;
  },
  getDocuments(state, payload) {
    state.documents.files = payload;
  },
};

// actions
const actions = {
  async postPassport(context) {
    const recent_passport = context.state.passport;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
        },
      };

      await axios.post(
        `http://tonote-api.herokuapp.com/api/v1/prints`,
        {
          file: recent_passport,
          type: "Photograph",
          category: "Upload",
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  },

  async getPassports(context) {
    context.state.loading = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
        },
      };

      const response = await axios.get(
        `http://tonote-api.herokuapp.com/api/v1/prints`,
        config
      );
      context.state.loading = false;
      context.commit("allPassports", response.data.data.Photograph);
    } catch (error) {
      console.log(error);
    }
  },

  async deletePassport(context, data) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
        },
      };

      await axios.delete(
        `http://tonote-api.herokuapp.com/api/v1/prints/${data.id}`,
        config
      );
      // remove deleted passport from store
      const _passports = [...context.state.passports].filter((img) => {
        return img.id !== data.id;
      });
      context.commit("allPassports", _passports);
    } catch (error) {
      console.log(error);
    }
    // store.commit("documentStore/loadPassport", file);
  },

  // get document by id
  async getDocument(context, id) {
    context.state.documents.loading = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
        },
      };

      const response = await axios.get(
        `http://tonote-api.herokuapp.com/api/v1/documents/${id}`,
        config
      );
      context.state.documents.loading = false;
      context.commit("getDocuments", response.data.data);
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
