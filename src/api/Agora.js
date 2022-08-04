import { generateUid } from "@/utils/helper";
import axios from "axios";

export const generateAgoraToken = (data) => {
  return axios.get(
    `https://gene-agora-token.herokuapp.com/rtc/${
      data.channel
    }/publisher/uid/${generateUid(data.uid)}`
  );
};

export const generateResourceId = (data) => {
  return axios.post(`https://gene-agora-token.herokuapp.com/acquire`, data);
};
