<template>
  <div class="container mt-5 pt-5">
    <!-- <agora
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
    >
      <agora-audio-sender />
      <agora-audio-receiver />
      <agora-video-sender :cameraOff="cameraIsClosed" />
      <agora-video-receiver />
    </agora> -->
    {{ uidd }}
    <button @click="handleMute">MiC</button>
    <button @click="handleCamera">Video</button>

    <a
      target="_blank"
      class="btn btn-primary mx-2"
      href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48/test/0063a7155f8a86345d7ad31066ac2a8ed48IAD16GohwusML8yBHP5Sx8WHPKaxUB9PL4MzVmJIpx2UTwx+f9j35EfcIgAswS1zKMfVYgQAAQDojtViAgDojtViAwDojtViBADojtVi/abe"
      >Test a</a
    >
    <a
      target="_blank"
      class="btn btn-primary nx-2"
      href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48/test/0063a7155f8a86345d7ad31066ac2a8ed48IAD8GDbstmo0lkX7ezfgLcyGNioMSagG8jFkmr18FFSkRwx+f9jYl6JpIgAxRoX15qPVYgQAAQCma9ViAgCma9ViAwCma9ViBACma9Vi/man"
      >Test b</a
    >

    <a
      target="_blank"
      class="btn btn-primary mx-2"
      href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48/test/0063a7155f8a86345d7ad31066ac2a8ed48IAB2sP23R3BeGdfyY0CjxgSM1NeQKahqh12NUj7YFx1RWAx+f9gHZmq1IgAxRoX19KTVYgQAAQC0bNViAgC0bNViAwC0bNViBAC0bNVi/abiodun"
      >Test c</a
    >
  </div>
</template>

<script>
// import axios from "axios";
import Vue from "vue";

export default {
  data() {
    return {
      disabled: true,
      cameraIsClosed: false,
      uidd: null,
    };
  },

  methods: {
    // async generate() {
    //   let response;
    //   try {
    //     const config = {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     };

    //     response = await axios.get(
    //       `https://gene-agora-token.herokuapp.com/rtc/test/publisher/uid/${this.name}`,
    //       config
    //     );
    //     if (response.data.token.includes("/")) {
    //       this.generate();
    //     }
    //     console.log(response.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   return response;
    // },
    handleJoinSuccess(uid) {
      this.inMeeting = true;
      this.uidd = uid;
      Vue.$toast.success("Join the meeting successfully");
    },
    handleMute() {
      this.mute = !this.mute;
      Vue.$toast.warning(`Microphone Turned ${this.mute ? "OFF" : "ON"}`);
    },
    handleCamera() {
      this.cameraIsClosed = !this.cameraIsClosed;
      Vue.$toast.warning(`Camera Turned ${this.cameraIsClosed ? "OFF" : "ON"}`);
    },
    // microphoneClass() {
    //   return this.mute ? "mp-mute" : "mp-normal";
    // },
    // cameraClass() {
    //   return this.cameraIsClosed ? "video-mute" : "video-normal";
    // },
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
