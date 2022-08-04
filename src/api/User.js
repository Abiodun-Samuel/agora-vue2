import Api from "./index";
const END_POINT = "/v1/user/profile";

export const Profile = () => {
  return Api.get(`${END_POINT}`);
};
