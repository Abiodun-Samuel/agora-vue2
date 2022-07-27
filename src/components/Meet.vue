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
          customizationPlayer
          ref="videoSender"
          @video-ready="handleVideoReady"
          @video-close="handleVideoClose"
        ></agora-video-sender>
        <agora-video-receiver
          ref="videoReceiver"
          customizationPlayer
          @video-ready="handleRemoteVideoReady"
          :refuse="refuseList"
        ></agora-video-receiver>
      </agora>
    </div>
    <div class="player">
      <div class="user-vision" v-for="user_id in userIdList" :key="user_id">
        <div
          v-if="playList.find((e) => e.uid === user_id)"
          v-player="playList.find((e) => e.uid === user_id)"
          class="player-vision"
          v-show="!streamFallbackList.includes(user_id)"
        ></div>

        <div class="ban">
          <mp-button
            v-if="user_id === uid"
            :class="microphoneClass"
            @click="handleMute"
          />
          <video-button
            v-if="user_id === uid"
            :class="cameraClass"
            @click="handleCamera"
          />
          <voice-dot
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
            {{ user_id || "you"
            }}<span v-if="user_id === uid && inMeeting"> ( you ) </span>
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
import MpButton from "./buttons/mp-button";
// import CloseButton from "./buttons/close-button";
// import OnCallButton from "./buttons/on-call-button";
import VideoButton from "./buttons/video-button";
import VoiceDot from "./voice-dot/main";
import AvatarAudio from "./avatar-audio/main";
import PinButton from "./pin-button/main";
// import AgoraRTC from "agora-rtc-sdk-ng";
// AgoraRTC.setLogLevel(4);

export default {
  name: "MeetComponent",
  components: {
    MpButton,
    // CloseButton,
    // OnCallButton,
    VideoButton,
    VoiceDot,
    AvatarAudio,
    PinButton,
  },
  props: ["channel", "uid", "appid", "token", "preMute", "preCameraOff"],
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
      mute: false,
      handleError: (error) => {
        Vue.$toast.error(error.message || error);
        // this.$message.error(error.message || error);
      },
      // uid: this.uidd,
      // uid: null,
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
      result.unshift(this.uid ? this.uid + "(you)" : "you");
      // this.youAreShareScreening && result.unshift(this.shareScreenUID);
      return result;
    },
    userList() {
      let result = [...this.remoteUsers];
      this.uid && result.unshift(this.uid);
      // this.youAreShareScreening && result.unshift(this.shareScreenUID);
      return result;
    },
    unpinedUserIdList() {
      let result = [...this.remoteUsers.map((user) => user.uid)];
      this.uid && result.unshift(this.uid);
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
      this.localDirective && result.unshift(this.localDirective);
      this.localScreenDirective && result.unshift(this.localScreenDirective);
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
  },
  methods: {
    handleCustom() {
      const tracks = this.$refs.ar.getLocalTracks();
      console.log(tracks);
    },
    handleJoinSuccess() {
      this.inMeeting = true;
      // this.uid = uid;
      Vue.$toast.success("Join the meeting successfully");
    },
    // handleJoinSuccess(uid) {
    //   this.inMeeting = true;
    //   // this.uid = uid;
    //   Vue.$toast.success("Join the meeting successfully");
    // },
    handleClientCreated() {
      window._agMeet = this;
      window._client = this.$refs.ar.getClient();
      window._AgoraRTC = this.$refs.ar.getAgoraRtc();
      window._sClient = this.$refs?.screenAr?.getClient();
      // client.setStreamFallbackOption()
    },
    handleMute() {
      this.mute = !this.mute;
      Vue.$toast.warning(`Microphone Turned ${this.mute ? "OFF" : "ON"}`);
    },
    handleCall() {
      if (this.inMeeting) {
        Vue.$toast.error("You are already in the meeting");
        return;
      }
      this.$refs.ar.start().then(({ result, message }) => {
        if (!result) {
          Vue.$toast.error("join channel error", message);
        }
      });
    },
    handleLeave() {
      if (!this.inMeeting) {
        Vue.$toast.error("You have not joined any meetings");
        return;
      }

      this.$refs.ar.leave().then(() => {
        this.inMeeting = false;
        this.remoteUsers = [];
        // this.uid = null;
        Vue.$toast.success("Left the meeting successfully");
        this.$emit("leave-meeting");
      });
    },
    handleCamera() {
      this.cameraIsClosed = !this.cameraIsClosed;
      Vue.$toast.warning(`Camera Turned ${this.cameraIsClosed ? "OFF" : "ON"}`);
    },
    handleUserJoin(user) {
      Vue.$toast.warning(`${user.uid} join meeting`);

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
      // console.log("user published ", mediaType, user.uid);

      if (mediaType === "audio") {
        this.handleGetRemoteVolumeLevelList();
      }
    },
    handleUserLeft(user, reason) {
      Vue.$toast.success(`${user.uid} left meeting because ${reason}`);
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
    handleShareScreen() {
      if (!this.youAreShareScreening) {
        if (this.otherIsShareScreening) {
          Vue.$toast.warning(`other is sharing, and you will replace him.`);
        }
      } else {
        Vue.$toast.success(`you will quit screen sharing.`);
      }
      this.openScreenSharing = !this.openScreenSharing;
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

<style lang="stylus">
video.agora_video_player
  object-fit: cover !important
</style>

<style scoped lang="stylus">
@import "../styles/meet/index.styl"
</style>
