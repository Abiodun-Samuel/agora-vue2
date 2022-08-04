<template>
  <div class="videocall__box">
    <div class="meet">
      <agora
        ref="ar"
        :channel="channel"
        :appid="appid"
        :token="token"
        :uid="uid"
        :autoStart="true"
        :errorHandler="handleError"
        @user-joined="handleUserJoin"
        @user-published="handleUserPublished"
        @user-left="handleUserLeft"
        @join-success="handleJoinSuccess"
        @client-created="handleClientCreated"
        @stream-fallback="handleStreamFallback"
        enableDualStream
      >
        <agora-audio-sender
          :mute="mute"
          @track-created="handleAudioTrackCreated"
          ref="audioSender"
        ></agora-audio-sender>
        <agora-audio-receiver ref="audioReceiver" :refuse="refuseList" />
        <agora-video-sender
          :cameraOff="cameraIsClosed"
          ref="videoSender"
          @video-close="handleVideoClose"
          @video-ready="handleVideoReady"
        >
          <div class="sender shadow-lg"></div>
        </agora-video-sender>
        <agora-video-receiver
          ref="videoReceiver"
          customizationPlayer
          @video-ready="handleRemoteVideoReady"
          :refuse="refuseList"
        ></agora-video-receiver>
      </agora>

      <!-- for local user   -->
      <div
        class="d-flex justify-content-between align-items-center sender__icons"
      >
        <VoiceDot
          :level="
            audioStatusObj[uid] && audioStatusObj[uid].level
              ? audioStatusObj[uid].level
              : 0
          "
        />

        <div class="d-flex justify-content-end align-items-center gap-1">
          <button id="icon" @click="handleMute">
            <div v-show="mute">
              <span class="iconify" data-icon="fa:microphone-slash"></span>
            </div>
            <div v-show="!mute">
              <span class="iconify" data-icon="fa:microphone"></span>
            </div>
          </button>

          <button id="icon" @click="handleCamera">
            <div v-show="cameraIsClosed">
              <span class="iconify" data-icon="carbon:video-off-filled"></span>
            </div>
            <div v-show="!cameraIsClosed">
              <span class="iconify" data-icon="carbon:video-filled"></span>
            </div>
          </button>
        </div>
        <div class="text-left">
          <span class="text-primary small">
            {{ uid }}
            <!-- {{
              uid.length > 15
                ? displayName(uid).substring(0, 15) + "..."
                : displayName(uid)
            }} -->
          </span>
        </div>
      </div>
    </div>

    <div data-aos="zoom" :class="pined ? 'player-pin' : 'player'">
      <div
        data-aos="zoom"
        :class="pined ? 'user-vision-pin' : 'user-vision'"
        v-for="user_id in userIdList"
        :key="user_id"
      >
        <div
          v-if="playList.find((e) => e.uid === user_id)"
          v-player="playList.find((e) => e.uid === user_id)"
          :class="pined ? 'player-vision-pin' : 'player-vision'"
          v-show="!streamFallbackList.includes(user_id)"
        ></div>

        <div class="ban">
          <VoiceDot
            v-if="user_id !== uid"
            :level="
              audioStatusObj[user_id || uid] &&
              audioStatusObj[user_id || uid].level
                ? audioStatusObj[user_id || uid].level
                : 0
            "
            :mute="
              audioStatusObj[user_id || uid] &&
              audioStatusObj[user_id || uid].mute !== false
            "
          />
          <p>
            {{ user_id }}
            <!-- {{
              user_id.length > 15
                ? displayName(user_id.substring(0, 15)) + "..."
                : displayName(user_id)
            }} -->
          </p>
        </div>

        <avatar-audio
          avatar="../assets/yonghu.svg"
          :level="
            audioStatusObj[user_id || uid] &&
            audioStatusObj[user_id || uid].level
              ? audioStatusObj[user_id || uid].level
              : 0
          "
          :mute="
            audioStatusObj[user_id || uid] &&
            audioStatusObj[user_id || uid].mute !== false
          "
          :cameraOff="
            !playList.find((e) => e.uid === user_id) ||
            streamFallbackList.includes(user_id)
          "
        />
        <div class="central">
          <pin-button
            class="pin-button-local"
            :pined="
              pined && (user_id ? pinedUid === user_id : pinedUid === uid)
            "
            @click="handlePinUser(user_id || uid)"
          />
        </div>
      </div>
    </div>
    <!-- <div class="banner">
      <on-call-button v-if="!inMeeting" @click="handleCall" />
      <close-button v-if="inMeeting" @click="handleLeave" />
      <mp-button :class="microphoneClass" @click="handleMute" />
      <video-button :class="cameraClass" @click="handleCamera" />
    </div> -->
  </div>
</template>

<script>
import Vue from "vue";
import AOS from "aos";
import VoiceDot from "./voice-dot/VoiceDot.vue";
import AvatarAudio from "./avatar-audio/main";
import PinButton from "./pin-button/main";
import AgoraRTC from "agora-rtc-sdk-ng";
import { generateName } from "@/utils/helper";
AgoraRTC.setLogLevel(4);

export default {
  name: "MeetComponent",
  components: {
    VoiceDot,
    AvatarAudio,
    PinButton,
  },
  // props: {
  //   channel: {
  //     type: [String],
  //   },
  //   uid: {
  //     type: [String],
  //   },
  //   appid: {
  //     type: [String],
  //   },
  //   token: {
  //     type: [String],
  //   },
  //   preMute: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   preCameraOff: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  data() {
    return {
      uid: sessionStorage.getItem("uid"),
      channel: sessionStorage.getItem("channel"),
      appid: sessionStorage.getItem("appid"),
      token: sessionStorage.getItem("token"),
      preMute: false,
      preCameraOff: false,
      mute: false,
      handleError: (error) => {
        // Vue.$toast.error(e);
        console.log(error.message || error);
      },
      cameraIsClosed: false,
      inMeeting: false,
      remoteUsers: [],
      showExpandUserList: false,
      localDirective: null,
      localScreenDirective: null,
      localVolumeLevel: 0,
      remoteVolumeLevelList: [],
      remoteDirectiveList: [],
      remoteMuteStatus: [],
      pined: false,
      pinedUid: null,
      openScreenSharing: false,
      youAreShareScreening: false,
      shareScreenUID: 99991234,
      streamFallbackList: [],
    };
  },
  computed: {
    refuseList() {
      return this.openScreenSharing ? [this.shareScreenUID] : [];
    },
    microphoneClass() {
      return this.mute ? "mp-mute" : "mp-normal";
    },
    cameraClass() {
      return this.cameraIsClosed ? "video-mute" : "video-normal";
    },
    users() {
      let result = [...this.remoteUsers];
      // result.unshift(this.uid ? this.uid + "(you)" : "you");
      return result;
    },
    userList() {
      let result = [...this.remoteUsers];
      // this.uid && result.unshift(this.uid);
      return result;
    },
    unpinedUserIdList() {
      let result = [...this.remoteUsers.map((user) => user.uid)];
      // this.uid && result.unshift(this.uid);
      return result;
    },
    userIdList() {
      if (this.pined) {
        return [this.pinedUid];
      }
      return this.unpinedUserIdList;
    },
    playList() {
      let result = [...this.remoteDirectiveList];
      // this.localDirective && result.unshift(this.localDirective);
      // this.localScreenDirective && result.unshift(this.localScreenDirective);
      return result;
    },
    remoteAudioStatusObj() {
      const volumeLevel = Object.assign(
        {},
        ...this.remoteVolumeLevelList.map((e) => ({ [e.uid]: e.result }))
      );
      const muteStatus = Object.assign(
        {},
        ...this.remoteMuteStatus.map((e) => ({ [e.uid]: e.result }))
      );
      return Object.assign(
        {},
        ...this.remoteUsers
          .map((user) => user.uid)
          .map((k) => ({
            [k]: {
              level: volumeLevel[k] || 0,
              mute: muteStatus[k] !== false,
            },
          }))
      );
    },
    audioStatusObj() {
      return this.localVolumeLevel || this.localVolumeLevel === 0
        ? {
            ...{
              [this.uid]: { level: this.localVolumeLevel, mute: this.mute },
            },
            ...this.remoteAudioStatusObj,
          }
        : {
            ...this.remoteAudioStatusObj,
          };
    },
    otherIsShareScreening() {
      return (
        !this.youAreShareScreening &&
        this.unpinedUserIdList.includes(this.shareScreenUID)
      );
    },
  },
  watch: {
    cameraIsClosed(newV) {
      if (!newV && this.$refs.videoSender && this.$refs.localCameraPlayer) {
        // this.playLocalVideoOnTopBanner();
      }
    },
  },
  created() {
    this.mute = this.preMute;
    this.cameraIsClosed = this.preCameraOff;
    AOS.init({ duration: 500 });
  },
  methods: {
    displayName(text) {
      return generateName(text);
    },
    handleCustom() {
      const tracks = this.$refs.ar.getLocalTracks();
      console.log(tracks);
    },
    handleJoinSuccess() {
      this.inMeeting = true;
      // this.uid = uid;
      Vue.$toast.success(
        `${generateName(this.uid)} has the joined the meeting.`
      );
    },
    handleClientCreated() {
      window._agMeet = this;
      window._client = this.$refs.ar.getClient();
      window._AgoraRTC = this.$refs.ar.getAgoraRtc();
      window._sClient = this.$refs?.screenAr?.getClient();
    },
    handleMute() {
      this.mute = !this.mute;
      Vue.$toast.warning(`Microphone ${this.mute ? "off" : "on"}`);
    },
    handleCall() {
      if (this.inMeeting) {
        Vue.$toast.error("You are already in the meeting");
        return;
      }
      this.$refs.ar.start().then(({ result, message }) => {
        if (!result) {
          Vue.$toast.error("Invalid room channel", message);
        }
      });
    },
    handleLeave() {
      if (!this.inMeeting) {
        Vue.$toast.error("You have not joined any meeting");
        return;
      }

      this.$refs.ar.leave().then(() => {
        this.inMeeting = false;
        this.remoteUsers = [];
        // eslint-disable-next-line vue/no-mutating-props
        this.uid = null;
        Vue.$toast.success("Left the meeting successfully");
        this.$emit("leave-meeting");
      });
    },
    handleCamera() {
      this.cameraIsClosed = !this.cameraIsClosed;
      Vue.$toast.warning(`Camera is ${this.cameraIsClosed ? "off" : "on"}`);
    },
    handleUserJoin(user) {
      Vue.$toast.success(`${generateName(user.uid)} has joined the meeting`);
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
    handleUserPublished(user, mediaType) {
      if (mediaType === "audio") {
        this.handleGetRemoteVolumeLevelList();
      }
    },
    handleUserLeft(user) {
      Vue.$toast.success(`${generateName(user.uid)} has left the meeting.`);
      this.remoteUsers = this.$refs.ar
        .getRemoteUsers()
        .filter(
          (user) => !this.openScreenSharing || user.uid !== this.shareScreenUID
        );

      if (user.uid === this.pinedUid) {
        this.pined = false;
        this.pinedUid = null;
      }
    },
    handleExpandUserList() {
      this.showExpandUserList = !this.showExpandUserList;
    },
    handleVideoReady(localVideo, info) {
      console.log("video-ready trigger:", info);
      this.localDirective = localVideo;
    },
    handleScreenVideoReady(screenVideo) {
      this.youAreShareScreening = true;
      this.localScreenDirective = screenVideo;
    },
    handleVideoClose() {
      this.localDirective = null;
    },
    handleScreenVideoClose() {
      this.youAreShareScreening = false;
      this.localScreenDirective = null;
    },
    handleScreenVideoFailed() {
      this.handleScreenVideoClose();
      this.openScreenSharing = false;
    },
    handleRemoteVideoReady(remoteUserList) {
      this.remoteDirectiveList = remoteUserList;
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
          // console.error(e);
        }
      };
      id = window.requestAnimationFrame(callback);
      this.$once("hook:beforeDestroy", () => {
        window.cancelAnimationFrame(id);
      });
    },
    handleGetRemoteVolumeLevelList() {
      let id = undefined;
      const audioReceiver = this?.$refs?.audioReceiver;
      const callback = () => {
        this.remoteVolumeLevelList = audioReceiver?.getVolumeLevel();
        id = window.requestAnimationFrame(callback);
      };
      id = window.requestAnimationFrame(callback);
      this.$once("hook:beforeDestroy", () => {
        window.cancelAnimationFrame(id);
      });
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
    handlePinUser(uid) {
      if (this.pined && this.pinedUid === uid) {
        this.pined = false;
        this.pinedUid = null;
      } else {
        this.pinedUid = uid;
        this.pined = true;
      }
    },
    handleStreamFallback(uid, type) {
      const list = this.streamFallbackList;
      if (type === "recover") {
        this.streamFallbackList = list.filter((e) => e !== uid);
      } else if (type === "fallback") {
        this.streamFallbackList = [...new Set([...list, uid])];
      } else {
        Vue.$toast.error("stream fallback type error");
      }
    },
  },
};
</script>

<style lang="css">
.videocall__box {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  padding: 8px;
}

.videocall__box {
  height: 85vh;
  position: sticky;
  top: 70px;
  overflow-y: scroll;
}
video.agora_video_player {
  object-fit: cover !important;
}

.iconify {
  height: 0.95rem;
  width: 0.95rem;
}

#icon:active {
  /* background-color: #dde8ff; */
  color: #003bb3;
}
#icon {
  border: none;
  display: flex;
  padding: 1.5px;
  font-size: 0.7rem;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
}
#icon:hover {
  /* background-color: #003bb3; */
  color: #003bb3;
}
</style>

<style scoped lang="stylus">
@import "../styles/meet/index.styl"
</style>
