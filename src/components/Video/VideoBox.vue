<template>
  <!-- <close-button v-if="inMeeting" @click="handleLeave" /> -->
  <div class="videocall__box">
    <div id="remote__users">
      <agora
        :clientConfig="{
          mode: 'rtc',
          codec: 'vp8',
          role: 'publisher',
        }"
        ref="ar"
        :channel="$route.params.channel"
        :uid="$route.params.uid"
        :appid="$route.params.appid"
        :token="$route.params.token"
        :autoStart="true"
        @join-success="handleJoinSuccess"
        @user-joined="handleUserJoin"
        :errorHandler="handleError"
      >
        <agora-audio-sender
          :mute="mute"
          @track-created="handleAudioTrackCreated"
          ref="audioSender"
        />
        <agora-video-sender
          :cameraOff="cameraIsClosed"
          ref="videoSender"
          @video-ready="handleVideoReady"
          @video-close="handleVideoClose"
        />
        <!-- "mp-mute" : "mp-normal"
"video-mute" : "video-normal" -->

        <!-- <button v-if="!camera" class="icon__off" @click="camera__on">
                <Icon icon="carbon:video-off-filled" />
              </button>
              <button v-if="camera" class="icon__on" @click="camera__off">
                <Icon icon="carbon:video-filled" />
              </button> -->
        <div class="d-flex justify-content-center gap-1 align-items-center">
          <button id="mic-btn" @click="handleMute">
            <div v-show="mute">
              <span class="iconify" data-icon="fa:microphone-slash"></span>
            </div>
            <div v-show="!mute">
              <span class="iconify" data-icon="fa:microphone"></span>
            </div>
          </button>

          <button id="camera-btn" @click="handleCamera">
            <div v-show="cameraIsClosed">
              <span class="iconify" data-icon="carbon:video-off-filled"></span>
            </div>
            <div v-show="!cameraIsClosed">
              <span class="iconify" data-icon="carbon:video-filled"></span>
            </div>
          </button>
        </div>
        <agora-audio-receiver />

        <agora-video-receiver @video-ready="handleRemoteVideoReady">
          <!-- <div class="player"></div> -->
        </agora-video-receiver>
      </agora>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      handleError: (error) => {
        //   Vue.$toast.error(error.message || error);
        console.log(error || error.message);
      },
      localVolumeLevel: 0,
      uidd: null,
      mute: false,
      cameraIsClosed: false,
      remoteDirectiveList: [],
      remoteMuteStatus: [],
      localDirective: null,
    };
  },
  props: {
    channel: {
      type: [String, null],
    },
    appid: {
      type: [String, null],
    },
    token: {
      type: [String, null],
    },
    uid: {
      type: [String, null],
    },
    preMute: {
      type: Boolean,
      default: false,
    },
    preCameraOff: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleVideoClose() {
      this.localDirective = null;
    },
    handleVideoReady(localVideo, info) {
      console.log("video-ready trigger:", info);
      this.localDirective = localVideo;
      // this.playLocalVideoOnTopBanner();
    },
    handleAudioTrackCreated() {
      let id = undefined;
      const audioSender = this.$refs.audioSender;
      const callback = () => {
        try {
          const track = audioSender.getTrack();
          if (track && track.getVolumeLevel) {
            this.localVolumeLevel = track.getVolumeLevel();
          } else {
            this.localVolumeLevel = 0;
          }
          id = window.requestAnimationFrame(callback);
        } catch (e) {
          console.error(e);
        }
      };
      id = window.requestAnimationFrame(callback);
      this.$once("hook:beforeDestroy", () => {
        window.cancelAnimationFrame(id);
      });
    },
    handleRemoteVideoReady(remoteUserList) {
      this.remoteDirectiveList = remoteUserList;
    },
    handleUserJoin(user) {
      // this.$message(`${user.uid} join meeting`);
      // weak net fallback
      this.$refs.ar.getClient().setStreamFallbackOption(user.uid, 2);

      // if you are sharing your screen,
      // you need not subscribe the screen video of yourself.
      this.remoteUsers = this.$refs.ar
        .getRemoteUsers()
        .filter(
          (user) => !this.openScreenSharing || user.uid !== this.shareScreenUID
        );
      this.handleCheckRemoteUserAudioMuteStatus();
    },
    handleCheckRemoteUserAudioMuteStatus() {
      let id = undefined;
      const audioReceiver = this?.$refs?.audioReceiver;
      const callback = () => {
        this.remoteMuteStatus = audioReceiver?.getUserMuteStatus();
        id = window.requestAnimationFrame(callback);
      };
      id = window.requestAnimationFrame(callback);
      this.$once("hook:beforeDestroy", () => {
        window.cancelAnimationFrame(id);
      });
    },
    handleJoinSuccess(uid) {
      this.inMeeting = true;
      this.uidd = uid;
      Vue.$toast.success(`${uid} has joined the call`);
    },
    handleMute() {
      this.mute = !this.mute;
      Vue.$toast.warning(`Microphone Turned ${this.mute ? "OFF" : "ON"}`);
    },
    handleCamera() {
      this.cameraIsClosed = !this.cameraIsClosed;
      Vue.$toast.warning(`Camera Turned ${this.cameraIsClosed ? "OFF" : "ON"}`);
    },
    //  microphoneClass() {
    //    return this.mute ? "fa:microphone-slash" : "fa:microphone";
    //  },
    //  cameraClass() {
    //    return this.cameraIsClosed ? "video-mute" : "video-normal";
    //  },
  },
};
</script>

<style lang="css">
.videocall__box {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: var(--bs-box-shadow);
}

.videocall__box {
  min-height: 80vh;
  position: sticky;
  top: 70px;
}

.default-agora-rtc-video-sender-player > div {
  border-radius: 7px !important;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  background-color: black;
}
.default-agora-rtc-video-sender-player {
  width: 100% !important;
  height: 200px !important;
  /* background: black; */
}
.default-agora-rtc-video-receiver-player > div {
  border-radius: 7px !important;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  background-color: black;
}
.default-agora-rtc-video-receiver-player {
  position: relative;
  width: 100px !important;
  height: 100px !important;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);

  /* background: black; */
  /* width: 200px !important;
  height: 200px !important; */
}

#remote__users {
  position: relative;
  display: grid;
  /* grid-gap: 5px; */
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
utton:active {
  background-color: #dde8ff;
  color: #003bb3;
}

button {
  border: none;
  display: flex;
  padding: 3px 5px;
  font-size: 1rem;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
}

button:hover {
  background-color: #003bb3;
  color: #dde8ff;
}

button[disabled] {
  background-color: #e2e5ed;
  color: #878787;
}

button[disabled]:hover {
  background-color: #d3dffc;
}
</style>
