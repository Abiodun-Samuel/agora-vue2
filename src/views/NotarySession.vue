<template>
  <div>
    <div v-if="isJoinMeeting">
      <div class="container">
        <div class="my-1 py-1"></div>
        <div class="row">
          <!-- toolbox display section  -->
          <div class="col-lg-2 my-2">
            <ToolBox />
          </div>
          <!-- document display section  -->
          <div class="col-lg-7 my-2">
            <DocumentBox />
          </div>
          <!-- video display section  -->
          <div class="col-lg-3 my-2">
            <VideoBox
              :channel="channel"
              :appid="appid"
              :uid="uid"
              :token="token"
              @leave-meeting="handleLeaveMeeting"
            />
            <!-- :preMute="config.mute"
              :preCameraOff="config.cameraOff" -->
          </div>
        </div>
      </div>
    </div>
    <!-- <meet
      
      :channel="channel"
      :appid="appid"
      :uid="uid"
      :token="token"
      :preMute="config.mute"
      :preCameraOff="config.cameraOff"
      @leave-meeting="handleLeaveMeeting"
    /> -->
    <div v-else>
      <main-page
        @join-meeting="handleJoinMeeting"
        :channel="channel"
        :appid="appid"
        :token="token"
      />
    </div>
  </div>
</template>

<script>
import DocumentBox from "../components/Document/DocumentBox.vue";
import ToolBox from "../components/Tool/ToolBox.vue";
import VideoBox from "../components/Video/VideoBox.vue";
import MainPage from "@/components/Main.vue";

export default {
  name: "NotarySession",
  components: {
    DocumentBox,
    ToolBox,
    VideoBox,
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
