<template>
  <div>
    <meet
      v-if="isJoinMeeting"
      :channel="channel"
      :appid="appid"
      :uid="uid"
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
      <!-- {{ $route.params.ai }} <br />
      {{ $route.params.channel }} <br /> -->
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
      appid: null,
      channel: null,
      token: null,
      uid: null,
    };
  },
  watch: {
    appid: {
      immediate: true,
      handler(newV) {
        if (!newV || newV === "null" || newV === undefined) {
          const appid = this.$route.params.appid;
          console.log(appid);
          if (appid) {
            localStorage.setItem("appid", appid);
            this.appid = appid;
          }
          // else {
          //   window.location.reload();
          // }
        }
      },
    },
    channel: {
      immediate: true,
      handler(newV) {
        if (!newV || newV === "null" || newV === undefined) {
          const channel = this.$route.params.channel;
          console.log(channel);
          if (channel) {
            sessionStorage.setItem("channel", channel);
            this.channel = channel;
          }
          // else {
          //   window.location.reload();
          // }
        }
      },
    },
    token: {
      immediate: true,
      handler(newV) {
        if (!newV || newV === "null" || newV === undefined) {
          const token = this.$route.params.token;
          console.log(token);
          if (token) {
            localStorage.setItem("token", token);
            this.token =
              token === "null" ? null : token === null ? undefined : token;
          }
          //  else {
          //   window.location.reload();
          // }
        }
      },
    },
    uid: {
      immediate: true,
      handler(newV) {
        if (!newV || newV === "null" || newV === undefined) {
          const uid = this.$route.params.uid;
          console.log(uid);
          if (uid) {
            localStorage.setItem("uid", uid);
            this.uid = uid === "null" ? null : uid === null ? undefined : uid;
          }
          // else {
          //   window.location.reload();
          // }
        }
      },
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
};
</script>
