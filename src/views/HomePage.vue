<template>
  <div>
    <!-- <agora
      appid="3a7155f8a86345d7ad31066ac2a8ed48"
      channel="test"
      token="0063a7155f8a86345d7ad31066ac2a8ed48IAD+WkPnZ/lRdmEo0RhG0vDodxh9Fjb6p8DORa59aRwjTAx+f9jdOgzqIgCGkq0zMPvUYgQAAQDAt9NiAgDAt9NiAwDAt9NiBADAt9Ni"
      uid="7754b75e-7590-4419-b250-f9b6b1b2df95"
    >
      <agora-audio-sender />
      <agora-audio-receiver />
      <agora-video-sender />
      <agora-video-receiver />
    </agora> -->
    <agora :appid="appid" :channel="channel" :token="token" :uid="uid">
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
        <!-- <button class="btn btn-primary">mic</button>
        <button class="btn btn-primary">video</button> -->
      </div>
    </agora>

    {{ appid }} <br />
    {{ channel }} <br />
    {{ token }} <br />
    {{ uid }}

    <div
      class="container mt-5 d-flex align-items-center justify-content-center"
      style="height: 50vh"
    >
      <a
        class="btn btn-primary"
        href="http://localhost:8081/?appid=3a7155f8a86345d7ad31066ac2a8ed48&channel=test&token=0063a7155f8a86345d7ad31066ac2a8ed48IAD+WkPnZ/lRdmEo0RhG0vDodxh9Fjb6p8DORa59aRwjTAx+f9jdOgzqIgCGkq0zMPvUYgQAAQDAt9NiAgDAt9NiAwDAt9NiBADAt9Ni&uid=7754b75e-7590-4419-b250-f9b6b1b2df95"
        target="_blank"
        >Test Link</a
      >
    </div>
  </div>
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
  // watch: {
  //   appid: {
  //     immediate: true,
  //     handler(newV) {
  //       if (!newV || newV === "null" || newV === undefined) {
  //         const appid = this.$route.query.appid;
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
  //       if (!newV || newV === "null" || newV === undefined) {
  //         const channel = this.$route.query.channel;
  //         if (channel) {
  //           localStorage.setItem("channel", channel);
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
  //       if (!newV && newV !== null) {
  //         const token = this.$route.query.token;
  //         if (token) {
  //           localStorage.setItem("token", token);
  //           this.token = token;
  //           // token === "null" ? null : token === null ? undefined : token;
  //         } else {
  //           window.location.reload();
  //         }
  //       }
  //     },
  //   },
  //   uid: {
  //     immediate: true,
  //     handler(newV) {
  //       if (!newV && newV !== null) {
  //         const uid = this.$route.query.uid;
  //         if (uid) {
  //           localStorage.setItem("uid", uid);
  //           this.uid = uid;
  //           // token === "null" ? null : token === null ? undefined : token;
  //         } else {
  //           window.location.reload();
  //         }
  //       }
  //     },
  //   },
  // },
  created() {
    this.appid = this.$route.query.appid;
    this.channel = this.$route.query.channel;
    this.token = this.$route.query.token;
    this.uid = this.$route.query.uid;
  },
};
</script>
