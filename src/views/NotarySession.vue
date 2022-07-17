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
        const url = this.$route.params.agora.split("&&&");
        console.log(url);
        this.appid = url[0];
        this.channel = url[1];
        this.token = url[2];
        this.uid = url[3];
        if (!newV || newV === "null" || newV === undefined) {
          const appid = url[0];
          if (appid) {
            localStorage.setItem("appid", appid);
            this.appid = appid;
          } else {
            window.location.reload();
          }
        }
      },
    },
    channel: {
      immediate: true,
      handler(newV) {
        const url = this.$route.params.agora.split("&&&");
        console.log(url);
        this.appid = url[0];
        this.channel = url[1];
        this.token = url[2];
        this.uid = url[3];
        if (!newV || newV === "null" || newV === undefined) {
          const channel = url[1];
          if (channel) {
            sessionStorage.setItem("channel", channel);
            this.channel = channel;
          } else {
            window.location.reload();
          }
        }
      },
    },
    token: {
      immediate: true,
      handler(newV) {
        const url = this.$route.params.agora.split("&&&");
        console.log(url);
        this.appid = url[0];
        this.channel = url[1];
        this.token = url[2];
        this.uid = url[3];
        if (!newV && newV !== null) {
          const token = url[2];
          if (token) {
            localStorage.setItem("token", token);
            this.token =
              token === "null" ? null : token === null ? undefined : token;
          } else {
            window.location.reload();
          }
        }
      },
    },
    uid: {
      immediate: true,
      handler(newV) {
        const url = this.$route.params.agora.split("&&&");
        console.log(url);
        this.appid = url[0];
        this.channel = url[1];
        this.token = url[2];
        this.uid = url[3];
        if (!newV && newV !== null) {
          const uid = url[3];
          if (uid) {
            localStorage.setItem("uid", uid);
            this.uid = uid === "null" ? null : uid === null ? undefined : uid;
          } else {
            window.location.reload();
          }
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
  mounted() {
    // this.appid = process.env.VUE_APP_AGORA_APP_ID;
    // this.token = this.$route.query.at;
    // this.channel = this.$route.query.channel;
  },
};
</script>
