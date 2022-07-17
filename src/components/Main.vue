<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12 mt-2">
        <h3 class="fw-bolder">Test Audio and Video Quality</h3>
        <p>
          Before your session is set up, please confirm that your camera and
          microphone are switched on.
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-7 col-md-6 my-2">
        <div class="main">
          <agora
            channel="channel"
            :autoStart="false"
            :errorHandler="
              (error) => {
                &quot;Vue.$toast.error(error.message || error);&quot;;
              }
            "
          >
            <agora-video-sender
              customizationPlayer
              @video-ready="handleVideoReady"
              :cameraOff="cameraOff"
            />
            <agora-audio-sender
              ref="audioSender"
              :mute="mute"
              @track-created="handleTrackCreated"
            />
          </agora>
          <div
            ref="cameraArea"
            v-if="localVideoDirective"
            class="camera-area shadow-lg"
            :class="playerClass"
            v-player="localVideoDirective"
          >
            <voice-dot class="voice-dot-local" :mute="mute" :level="level" />
            <mp-button-white
              class="mp-btn-local"
              :class="mpClass"
              @click="handleMpClick"
            ></mp-button-white>
            <video-button-white
              class="video-btn-local"
              :class="videoClass"
              @click="handleVideoClick"
            ></video-button-white>
          </div>
        </div>
      </div>
      <div class="col-lg-5 col-md-6 my-2">
        <!-- {{ $route.query.channel }} -->
        <!-- {{ userDetails.id }} -->
        <div v-if="userDetails?.role[0] === 'User'" class="display-container">
          <div style="height: 30px" class="mb-3 ps-5">
            <h4 class="element fw-bold"></h4>
          </div>
          <div class="text-center">
            <button class="btn btn-primary" @click="handleJoin">Proceed</button
            ><br />
          </div>
        </div>
        <div v-else>
          <h4 class="element hidden"></h4>
          <div class="display-container">
            <h4 class="fw-bold mb-3 ps-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Asperiores, dicta
            </h4>
            <div class="text-center">
              <button class="btn btn-primary" @click="handleJoin">
                Proceed</button
              ><br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from "aos";
import Typed from "typed.js";
import VoiceDot from "./voice-dot/main.vue";
import MpButtonWhite from "./buttons/mp-button-white";
import VideoButtonWhite from "./buttons/video-button-white";
import { mapState } from "vuex";

export default {
  name: "MainComponent",
  components: {
    VoiceDot,
    MpButtonWhite,
    VideoButtonWhite,
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
  },
  data() {
    return {
      localVideoDirective: null,
      mute: false,
      level: 0,
      cameraOff: false,
    };
  },
  computed: {
    ...mapState({
      userDetails: (state) => state.userStore.userDetails,
    }),
    mpClass() {
      return this.mute ? "mp-mute" : "mp-normal";
    },
    videoClass() {
      return this.cameraOff ? "video-mute" : "video-normal";
    },
    playerClass() {
      return this.cameraOff ? "camera-off" : "";
    },
  },
  methods: {
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
    handleJoin() {
      this.$emit("join-meeting", {
        channel: this.channel,
        mute: this.mute,
        cameraOff: this.cameraOff,
      });
    },
    handleMpClick() {
      this.mute = !this.mute;
    },
    handleVideoClick() {
      this.cameraOff = !this.cameraOff;
    },
  },
  mounted() {
    AOS.init({ duration: 500 });
    new Typed(".element", {
      strings: ["Connecting to the next available notary..."],
      typeSpeed: 40,
      showCursor: false,
      loop: true,
      backSpeed: 0,
    });

    this.$store.commit("notarySessionStore/SESSION_DETAILS", {
      token: this.$route.query.at,
      channel: this.$route.query.channel,
      appId: this.$route.query.ai,
    });

    // check if not loggged in
    if (!this.$store.state.userStore.userDetails) {
      this.$store.dispatch("userStore/login", this.$route.query.ut);
    }
  },
};
</script>

<style lang="css" scoped>
@import "../styles/main/index.css";
.display-container {
  height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
button:disabled,
button[disabled] {
  background: #f2f2f2 !important;
  color: #7b7b7b !important;
  border-color: #f2f2f2 !important;
  border: none;
  cursor: not-allowed !important;
  box-shadow: none;
}
</style>
