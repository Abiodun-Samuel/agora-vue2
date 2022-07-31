import Api from "./index";
const END_POINT = "v1/user";

export default {
  login(data) {
    return Api.post(`${END_POINT}/login`, data);
  },

  logout(data) {
    return Api.post(`${END_POINT}/logout`, data);
  },

  show() {
    return Api.get(`${END_POINT}/profile`);
  },

  verifyOTP(data) {
    return Api.post(`${END_POINT}/email/verify`, data);
  },
};
