import Vue from "vue";
import Schedule from "@/api/Schedule";
// import Auth from "@/api/Auth";
// import User from "@/api/User";
// import router from "@/router/index";

export const getTimeSlots = ({ commit }) => {
  Schedule.timeSlots()
    .then((response) => {
      commit("SET_TIME_SLOTS", response.data);
    })
    .catch((error) => {
      if (error.response.status == 401 || error.response.status == 404) {
        commit("SET_TIME_SLOTS", []);
        Vue.$toast.error(`${error.response.data.errors.root}`);
      }
    });
};
