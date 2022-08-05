<template>
  <div>
    <main-page
      @join-meeting="handleJoinMeeting"
      channel="channel"
      :appid="appid"
      :token="token"
    />
  </div>
</template>

<script>
import MainPage from "@/components/Main.vue";
import { store } from "@/store";
// import { randomNumber } from "@/utils/helper";
import AgoraRTC from "agora-rtc-sdk-ng";
AgoraRTC.setLogLevel(4);

export default {
  components: {
    MainPage,
  },
  data() {
    return {
      isJoinMeeting: false,
      config: null,
      // uid: sessionStorage.getItem("uid"),
      // channel: sessionStorage.getItem("channel"),
      appid: sessionStorage.getItem("appid"),
      token: sessionStorage.getItem("token"),
    };
  },
  computed: {
    userDetails() {
      return store.getters["userStore/userDetails"];
    },
  },
  methods: {
    handleJoinMeeting(config) {
      this.isJoinMeeting = true;
      this.config = config;
    },
    handleLeaveMeeting() {
      this.isJoinMeeting = false;
    },
  },
  mounted() {
    // if (this.userDetails.name) {
    //   store.dispatch("agoraStore/StartRecording", {
    //     channel: sessionStorage.getItem("channel"),
    //     uid: randomNumber(10),
    //     mode: "web",
    //     // token:
    //     //   "0063a7155f8a86345d7ad31066ac2a8ed48IADaR0LjXcFWns3gChmGJM00DTuB69na9SXEzYmFRIi6jvVg3hTeLEQ+IgAHwB1uNUztYgQAAQD1E+1iAgD1E+1iAwD1E+1iBAD1E+1i",
    //     url: "https://tonote-notary-session.netlify.app/notary-session",
    //   });
    // }
  },
};
</script>

<style lang="css"></style>
