import Api from "@/api/index";

const END_POINT = "/v1/teams";

export default {
  all() {
    return Api.get(`${END_POINT}`);
  },
};
