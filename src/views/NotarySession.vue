<template>
  <div>
    <meet
      v-if="isJoinMeeting"
      :channel="channel"
      :appid="appId"
      :token="token"
      :preMute="config.mute"
      :preCameraOff="config.cameraOff"
      @leave-meeting="handleLeaveMeeting"
    />
    <div v-else>
      <main-page
        @join-meeting="handleJoinMeeting"
        :channel="channel"
        :appid="appid"
        :token="token"
      />
      <!-- {{ $store.state.notarySessionStore.session_details.agora_token }} <br /> -->
      <!-- {{ $route.query.ai }} <br />
      {{ $route.query.channel }} <br /> -->
    </div>
  </div>
</template>

<script>
import Meet from "@/components/Meet.vue";
import MainPage from "@/components/Main.vue";

export default {
  name: "NotarySession",
  components: {
    Meet,
    MainPage,
  },
  data() {
    return {
      isJoinMeeting: false,
      config: null,
      appid: this.$route.query.ai,
      channel: this.$route.query.channel,
      token: this.$route.query.at,
    };
  },
  // watch: {
  //   appid: {
  //     immediate: true,
  //     handler(newV) {
  //       if (!newV || newV === "null" || newV === undefined) {
  //         const appid = process.env.VUE_APP_AGORA_APP_ID;
  //         if (appid) {
  //           localStorage.setItem("appid", appid);
  //           this.appid = appid;
  //         }
  //         // else {
  //         //   window.location.reload();
  //         // }
  //       }
  //     },
  //   },
  //   channel: {
  //     immediate: true,
  //     handler(newV) {
  //       if (!newV || newV === "null" || newV === undefined) {
  //         const channel = this.$route.query.channel;
  //         if (channel) {
  //           sessionStorage.setItem("channel", channel);
  //           this.channel = channel;
  //         }
  //         //  else {
  //         //   window.location.reload();
  //         // }
  //       }
  //     },
  //   },
  //   token: {
  //     immediate: true,
  //     handler(newV) {
  //       if (!newV && newV !== null) {
  //         const token = this.$route.query.at;
  //         if (token) {
  //           localStorage.setItem("token", token);
  //           this.token =
  //             token === "null" ? null : token === null ? undefined : token;
  //         }
  //         // else {
  //         //   window.location.reload();
  //         // }
  //       }
  //     },
  //   },
  // },
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
    this.appid = process.env.VUE_APP_AGORA_APP_ID;
    this.token = this.$route.query.at;
    this.channel = this.$route.query.channel;
  },
};
</script>
