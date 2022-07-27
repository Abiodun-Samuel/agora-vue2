<template>
  <div class="container mt-5 pt-5" style="height: 90vh">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-lg-6">
        <input class="form-control" type="text" v-model="name" />
        <button
          v-if="!join"
          @click="generate"
          class="btn btn-primary mr-2 my-2 btn-block"
        >
          Generate
        </button>
        <br />

        <router-link
          v-if="join"
          :to="{ path: '/notary_session' }"
          class="btn btn-success"
          >Join</router-link
        >
      </div>
      <!-- <a
        target="_blank"
        class="btn btn-primary my-2 me-2"
        href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48/test/0063a7155f8a86345d7ad31066ac2a8ed48IADJ1TPHpYd882cOZMuHfEXhapt1Imf8avqJv3RxtMNtOAx+f9hp0D9dIgD9QV7GgWfWYgQAAQBBL9ZiAgBBL9ZiAwBBL9ZiBABBL9Zi/shaffi"
        >shaffi</a
      >

      <a
        target="_blank"
        class="btn btn-primary m-2"
        href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48/test/0063a7155f8a86345d7ad31066ac2a8ed48IACzmBsyqWaTVRh94OUJlgImR3pbroLwciR+vK9bg52legx+f9hDDA4HIgDC3bJ1gYXWYgQAAQBBTdZiAgBBTdZiAwBBTdZiBABBTdZi/ibrahim"
        >ibrahim</a
      >
      <a
        target="_blank"
        class="btn btn-primary nx-2"
        href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48/test/0063a7155f8a86345d7ad31066ac2a8ed48IACzFYUNOnATg1qjRQsnFTCMUHWTuy8eyAdHXcE+niasYgx+f9i7N499IgD9QV7G5mfWYgQAAQCmL9ZiAgCmL9ZiAwCmL9ZiBACmL9Zi/fikayo"
        >fikayo</a
      >

      <a
        target="_blank"
        class="btn btn-primary m-2"
        href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48/test/0063a7155f8a86345d7ad31066ac2a8ed48IAArCofJ555mEcIdsZie20jn0n8mVHr63ZAtdajwWWVtVAx+f9gHZmq1IgD9QV7GEWjWYgQAAQDRL9ZiAgDRL9ZiAwDRL9ZiBADRL9Zi/abiodun"
        >abiodun</a
      >

      <a
        target="_blank"
        class="btn btn-primary m-2"
        href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48/test/0063a7155f8a86345d7ad31066ac2a8ed48IACED6LnUeZwYfkERp3tqwpb8o6Vo1Fvul62tnITydU2Zgx+f9jHpyatIgD9QV7GaG3WYgQAAQAoNdZiAgAoNdZiAwAoNdZiBAAoNdZi/unknown"
        >extra</a
      >
      <a
        target="_blank"
        class="btn btn-primary m-2"
        href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48/test/0063a7155f8a86345d7ad31066ac2a8ed48IAAb8LNQUtvThrQC7zvnTlh3qVR75vqP4nlTCUwdngBqMgx+f9gYSBPmIgAArzYmrwPhYgQAAQBvy+BiAgBvy+BiAwBvy+BiBABvy+Bi/sam"
        >sam</a
      > -->
    </div>

    <!-- <div class="mt-3">
      <p>Another Room</p>
      <a
        target="_blank"
        class="btn btn-primary my-2 me-2"
        href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48/testtwo/0063a7155f8a86345d7ad31066ac2a8ed48IADMCmULF6Pkykr4L368VgGdfmUsDjHtkrPJ0LV1TSigUw9L1mlCSbEsIgD9QV7G0mzWYgQAAQCSNNZiAgCSNNZiAwCSNNZiBACSNNZi/adegoke"
        >goke</a
      >

      <a
        target="_blank"
        class="btn btn-primary m-2"
        href="/notary_session/3a7155f8a86345d7ad31066ac2a8ed48/testtwo/0063a7155f8a86345d7ad31066ac2a8ed48IAAkqJfNzAai5lLmHAyleWdZLVeHv2hCnaAOfC2zPyXE3g9L1mnHpyatIgD9QV7GOm3WYgQAAQD6NNZiAgD6NNZiAwD6NNZiBAD6NNZi/unknown"
        >extra</a
      >
    </div> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      join: false,
      name: null,
    };
  },

  computed: {},

  methods: {
    enter() {
      window.open("http://localhost:8081/notary_session", "_blank");
      this.join = false;
      // this.$router.push("/notary_session");
    },
    async generate() {
      try {
        const response = await axios.get(
          `https://gene-agora-token.herokuapp.com/rtc/test/publisher/uid/${this.name}`
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("appid", response.data.appid);
        localStorage.setItem("uid", response.data.uid);
        localStorage.setItem("channel", response.data.channelName);
        setTimeout(() => {
          this.join = true;
        }, 500);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
