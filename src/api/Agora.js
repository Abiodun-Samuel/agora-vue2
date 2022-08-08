import { generateUid } from "@/utils/helper";
import axios from "axios";
import Api from "@/api";

export const generateAgoraToken = (data) => {
  return axios.get(
    `https://gene-agora-token.herokuapp.com/rtc/${
      data.channel
    }/publisher/uid/${generateUid(data.uid)}`
  );
};

export const generateResourceId = async (data) => {
  return Api.post(`https://gene-agora-token.herokuapp.com/acquire`, data);
};

export const startRecording = async (data) => {
  return axios.post(`https://gene-agora-token.herokuapp.com/start`, data);
};

export const stopRecording = async (data) => {
  return axios.post(`https://gene-agora-token.herokuapp.com/stop`, data);
};

