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

    <div class="my-2">
      <a
        target="_blank"
        class="btn btn-primary mx-2"
        href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48/test/0063a7155f8a86345d7ad31066ac2a8ed48IADJ1TPHpYd882cOZMuHfEXhapt1Imf8avqJv3RxtMNtOAx+f9hp0D9dIgD9QV7GgWfWYgQAAQBBL9ZiAgBBL9ZiAwBBL9ZiBABBL9Zi/shaffi"
        >shaffi</a
      >
      <a
        target="_blank"
        class="btn btn-primary nx-2"
        href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48/test/0063a7155f8a86345d7ad31066ac2a8ed48IACzFYUNOnATg1qjRQsnFTCMUHWTuy8eyAdHXcE+niasYgx+f9i7N499IgD9QV7G5mfWYgQAAQCmL9ZiAgCmL9ZiAwCmL9ZiBACmL9Zi/fikayo"
        >fikayo</a
      >

      <a
        target="_blank"
        class="btn btn-primary mx-2"
        href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48/test/0063a7155f8a86345d7ad31066ac2a8ed48IAArCofJ555mEcIdsZie20jn0n8mVHr63ZAtdajwWWVtVAx+f9gHZmq1IgD9QV7GEWjWYgQAAQDRL9ZiAgDRL9ZiAwDRL9ZiBADRL9Zi/abiodun"
        >abiodun</a
      >

      <a
        target="_blank"
        class="btn btn-primary mx-2"
        href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48/test/0063a7155f8a86345d7ad31066ac2a8ed48IACED6LnUeZwYfkERp3tqwpb8o6Vo1Fvul62tnITydU2Zgx+f9jHpyatIgD9QV7GaG3WYgQAAQAoNdZiAgAoNdZiAwAoNdZiBAAoNdZi/unknown"
        >extra</a
      >
    </div>

    <div class="mt-3">
      <p>Another Room</p>
      <a
        target="_blank"
        class="btn btn-primary mx-2"
        href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48/testtwo/0063a7155f8a86345d7ad31066ac2a8ed48IADMCmULF6Pkykr4L368VgGdfmUsDjHtkrPJ0LV1TSigUw9L1mlCSbEsIgD9QV7G0mzWYgQAAQCSNNZiAgCSNNZiAwCSNNZiBACSNNZi/adegoke"
        >goke</a
      >

      <a
        target="_blank"
        class="btn btn-primary mx-2"
        href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48/testtwo/0063a7155f8a86345d7ad31066ac2a8ed48IAAkqJfNzAai5lLmHAyleWdZLVeHv2hCnaAOfC2zPyXE3g9L1mnHpyatIgD9QV7GOm3WYgQAAQD6NNZiAgD6NNZiAwD6NNZiBAD6NNZi/unknown"
        >extra</a
      >
    </div>
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
