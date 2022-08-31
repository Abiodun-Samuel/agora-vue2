import Api from "./index";
const END_POINT = "/v1/user";

export default {
  profile() {
    return Api.get(`${END_POINT}/profile`);
  },

  verifyOTP(data) {
    return Api.post(`${END_POINT}/document/verify`, data);
  },
};
