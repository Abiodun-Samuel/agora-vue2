import Vue from "vue";
import Auth from "@/api/Auth";
import User from "@/api/User";
import router from "@/router/index";

export const loginUser = ({ commit, dispatch }, formData) => {
  Auth.login(formData)
    .then((response) => {
      commit("SET_TOKEN", response.data.token);
      commit("SET_TOKEN_TYPE", response.data.token_type);

      User.profile()
        .then((response) => {
          commit("userStore/SET_USER_PROFILE", response.data.data, {
            root: true,
          });
          router.push({ name: "NotaryRequest" });
          Vue.$toast.success("Welcome to ToNote ");
        })

        .catch((error) => {
          console.log(error);
        });

      dispatch("teamStore/getTeams", null, {
        root: true,
      });
    })
    .catch((error) => {
      if (error.response.status == 401 || error.response.status == 404) {
        commit("SET_AUTH_ERROR", error.response.data.message);
        Vue.$toast.error(`${error.response.data.errors.root}`);
      }
    });
};
