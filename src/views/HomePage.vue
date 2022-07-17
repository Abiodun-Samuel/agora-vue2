<template>
  <div>
    <!-- <agora
      appid="3a7155f8a86345d7ad31066ac2a8ed48"
      channel="test"
      token="0063a7155f8a86345d7ad31066ac2a8ed48IABkic2J6WT2GqnsEi3yMWIeotTcKYOQZO+yGQI5S08ujwx+f9jdOgzqIgCGkq0zuyTVYgQAAQBL4dNiAgBL4dNiAwBL4dNiBABL4dNi"
      uid="7754b75e-7590-4419-b250-f9b6b1b2df95"
    >
      <agora-audio-sender />
      <agora-audio-receiver />
      <agora-video-sender />
      <agora-video-receiver />
    </agora> -->
    <!-- <agora :appid="appid" :channel="channel" :token="token" :uid="uid">
      <div>
        <agora-video-sender
          @video-ready="handleVideoReady"
          :cameraOff="cameraOff"
        />
        <agora-audio-sender
          ref="audioSender"
          :mute="mute"
          @track-created="handleTrackCreated"
        />
        <button @click="handleMpClick" class="btn btn-primary m-2">mic</button>
        <button @click="handleVideoClick" class="btn btn-primary m-2">
          video
        </button>
      </div>
      <div>
        <agora-audio-receiver />
        <agora-video-receiver />
      </div>
    </agora> -->

    <!-- {{ $route.params.agora }} <br /> -->

    <div
      class="container mt-5 d-flex align-items-center justify-content-center"
      style="height: 50vh"
    >
      <a
        class="btn btn-primary"
        href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48&&&test&&&0063a7155f8a86345d7ad31066ac2a8ed48IAAMfoW+hKEsUgk7k4QOaLK4EW0yZn13jqZprjSBnHCe5Ax+f9jFt95fIgCGkq0zCkbVYgQAAQCaAtRiAgCaAtRiAwCaAtRiBACaAtRi&&&samuel"
        >Test Link</a
      >
      <a
        class="btn btn-primary"
        href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48&&&test&&&0063a7155f8a86345d7ad31066ac2a8ed48IAA4Ha8PWJprEEHg76niROacN4X9tWCXsyzcGdLdg1xRAAx+f9h6dnLBIgCGkq0zvUzVYgQAAQBNCdRiAgBNCdRiAwBNCdRiBABNCdRi&&&segun"
        >Test Link 2</a
      >
    </div>
  </div>
  <!-- /notary_session/:appid/:channel/:token/:uid -->
</template>

<script>
export default {
  data() {
    return {
      // show: false,
      mute: false,
      level: 0,
      cameraOff: false,
      appid: null,
      channel: null,
      token: null,
      uid: null,
    };
  },
  // watch: {
  //   appid: {
  //     immediate: true,
  //     handler(newV) {
  //       const url = this.$route.params.agora.split("&&&");
  //       console.log(url);
  //       this.appid = url[0];
  //       this.channel = url[1];
  //       this.token = url[2];
  //       this.uid = url[3];
  //       if (!newV || newV === "null" || newV === undefined) {
  //         const appid = url[0];
  //         if (appid) {
  //           localStorage.setItem("appid", appid);
  //           this.appid = appid;
  //         } else {
  //           window.location.reload();
  //         }
  //       }
  //     },
  //   },
  //   channel: {
  //     immediate: true,
  //     handler(newV) {
  //       const url = this.$route.params.agora.split("&&&");
  //       console.log(url);
  //       this.appid = url[0];
  //       this.channel = url[1];
  //       this.token = url[2];
  //       this.uid = url[3];
  //       if (!newV || newV === "null" || newV === undefined) {
  //         const channel = url[1];
  //         if (channel) {
  //           sessionStorage.setItem("channel", channel);
  //           this.channel = channel;
  //         } else {
  //           window.location.reload();
  //         }
  //       }
  //     },
  //   },
  //   token: {
  //     immediate: true,
  //     handler(newV) {
  //       const url = this.$route.params.agora.split("&&&");
  //       console.log(url);
  //       this.appid = url[0];
  //       this.channel = url[1];
  //       this.token = url[2];
  //       this.uid = url[3];
  //       if (!newV && newV !== null) {
  //         const token = url[2];
  //         if (token) {
  //           localStorage.setItem("token", token);
  //           this.token =
  //             token === "null" ? null : token === null ? undefined : token;
  //         } else {
  //           window.location.reload();
  //         }
  //       }
  //     },
  //   },
  //   uid: {
  //     immediate: true,
  //     handler(newV) {
  //       const url = this.$route.params.agora.split("&&&");
  //       console.log(url);
  //       this.appid = url[0];
  //       this.channel = url[1];
  //       this.token = url[2];
  //       this.uid = url[3];
  //       if (!newV && newV !== null) {
  //         const uid = url[3];
  //         if (uid) {
  //           localStorage.setItem("uid", uid);
  //           this.uid = uid === "null" ? null : uid === null ? undefined : uid;
  //         } else {
  //           window.location.reload();
  //         }
  //       }
  //     },
  //   },
  // },
  methods: {
    handleMpClick() {
      this.mute = !this.mute;
    },
    handleVideoClick() {
      this.cameraOff = !this.cameraOff;
    },
    handleVideoReady(localVideo) {
      this.localVideoDirective = localVideo;
    },
    handleTrackCreated() {
      let id = undefined;
      const callback = () => {
        this.level = this.$refs.audioSender.getTrack().getVolumeLevel();
        id = window.requestAnimationFrame(callback);
      };
      id = window.requestAnimationFrame(callback);
      this.$once("hook:beforeDestroy", () => {
        window.cancelAnimationFrame(id);
      });
    },
  },
  // created() {
  //   // :appid/:channel/:token/:uid -
  //   const url = this.$route.params.agora.split("&&&");
  //   console.log(url);
  //   this.appid = url[0];
  //   this.channel = url[1];
  //   this.token = url[2];
  //   this.uid = url[3];
  // },
};
</script>
