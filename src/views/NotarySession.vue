<template>
  <div>
    <div v-if="isJoinMeeting">
      <div class="container-fluid">
        <div class="my-1 py-1"></div>
        <div class="row">
          <div class="col-lg-2 my-2">
            <ToolBox />
          </div>
          <div class="col-lg-6 my-2">
            <DocumentBox />
          </div>
          <div class="col-lg-4 my-2">
            <MeetComponent
              :channel="channel"
              :appid="appid"
              :uid="uid"
              :token="token"
              @leave-meeting="handleLeaveMeeting"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <main-page
        @join-meeting="handleJoinMeeting"
        channel="channel"
        :appid="appid"
        :token="token"
      />
    </div>
  </div>
</template>

<script>
import DocumentBox from "../components/Document/DocumentBox.vue";
import ToolBox from "../components/Tool/ToolBox.vue";
import MeetComponent from "../components/Meet.vue";
// import VideoBox from "../components/Video/VideoBox.vue";
import MainPage from "@/components/Main.vue";

export default {
  name: "NotarySession",
  components: {
    DocumentBox,
    ToolBox,
    MeetComponent,
    // VideoBox,
    MainPage,
  },
  data() {
    return {
      // isJoinMeeting: false,
      // config: null,
      // appid: null,
      // channel: null,
      // token: null,
      uid: localStorage.getItem("uid"),
      isJoinMeeting: false,
      config: null,
      appid: localStorage.getItem("appid"),
      channel: localStorage.getItem("channel"),
      token:
        localStorage.getItem("token") === "null"
          ? null
          : localStorage.getItem("token") === null
          ? undefined
          : localStorage.getItem("token"),
    };
  },
  watch: {
    appid: {
      immediate: true,
      handler(newV) {
        if (!newV || newV === "null" || newV === undefined) {
          const appid = window.prompt("Input your appid:");
          if (appid) {
            localStorage.setItem("appid", appid);
            this.appid = appid;
          } else {
            window.location.reload();
          }
        }
      },
    },
    uid: {
      immediate: true,
      handler(newV) {
        if (!newV || newV === "null" || newV === undefined) {
          const uid = window.prompt("Input your uidd:");
          if (uid) {
            localStorage.setItem("appid", uid);
            this.uid = uid;
          } else {
            window.location.reload();
          }
        }
      },
    },
    channel: {
      immediate: true,
      handler(newV) {
        if (!newV || newV === "null" || newV === undefined) {
          const channel = window.prompt("Input your room channel:");
          if (channel) {
            localStorage.setItem("channel", channel);
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
        if (!newV && newV !== null) {
          const token = window.prompt("Input your token:");
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
    // appid: {
    //   immediate: true,
    //   handler(newV) {
    //     if (!newV || newV === "null" || newV === undefined) {
    //       const appid = this.$route.params.appid;
    //       console.log(appid);
    //       if (appid) {
    //         localStorage.setItem("appid", appid);
    //         this.appid = appid;
    //       }
    //       // else {
    //       //   window.location.reload();
    //       // }
    //     }
    //   },
    // },
    // channel: {
    //   immediate: true,
    //   handler(newV) {
    //     if (!newV || newV === "null" || newV === undefined) {
    //       const channel = this.$route.params.channel;
    //       console.log(channel);
    //       if (channel) {
    //         sessionStorage.setItem("channel", channel);
    //         this.channel = channel;
    //       }
    //       // else {
    //       //   window.location.reload();
    //       // }
    //     }
    //   },
    // },
    // token: {
    //   immediate: true,
    //   handler(newV) {
    //     if (!newV || newV === "null" || newV === undefined) {
    //       const token = this.$route.params.token;
    //       console.log(token);
    //       if (token) {
    //         localStorage.setItem("token", token);
    //         this.token =
    //           token === "null" ? null : token === null ? undefined : token;
    //       }
    //       //  else {
    //       //   window.location.reload();
    //       // }
    //     }
    //   },
    // },
    // uid: {
    //   immediate: true,
    //   handler(newV) {
    //     if (!newV || newV === "null" || newV === undefined) {
    //       const uid = this.$route.params.uid;
    //       console.log(uid);
    //       if (uid) {
    //         localStorage.setItem("uid", uid);
    //         this.uid = uid === "null" ? null : uid === null ? undefined : uid;
    //       }
    //       // else {
    //       //   window.location.reload();
    //       // }
    //     }
    //   },
    // },
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
