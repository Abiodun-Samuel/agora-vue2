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
  methods: {
    handleJoinMeeting(config) {
      this.isJoinMeeting = true;
      this.config = config;
    },
    handleLeaveMeeting() {
      this.isJoinMeeting = false;
    },
  },
};
</script>

<style lang="css"></style>
