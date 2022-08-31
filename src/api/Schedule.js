import Api from "./index";
const END_POINT = "/v1";

export default {
  timeSlots() {
    return Api.get(`${END_POINT}/time-slots`);
  },
};
