<template>
  <!-- <div
    class="container d-flex justify-content-center align-items-center"
    style="height: 100vh"
  >
    <div class="row">
      <div class="col-lg-10">
        <input
          class="form-control"
          type="text"
          v-model="name"
          placeholder="Enter your name"
        />
        <button
          :disabled="!name || !name.trim()"
          @click="generate"
          class="btn btn-primary mr-2 my-2 btn-block"
        >
          Proceed
        </button>

        {{ userDetails.name }}
      </div>
    </div>
  </div> -->
  <h1></h1>
</template>

<script>
import axios from "axios";
// import { generateUid } from "@/utils/helper";
import { store } from "@/store";
// import Pusher from "pusher-js";
// import Api from "@/api";

// Pusher.logToConsole = true;
// var pusher = new Pusher(process.env.VUE_APP_APP_KEY, {
//   cluster: process.env.VUE_APP_APP_CLUSTER,
// });

// var channel = pusher.subscribe("tone-development");
// channel.bind("ready-ready", function (data) {
//   console.log(data);
// });
export default {
  data() {
    return {
      name: null,
    }; },
  watch: {},
  computed: {
    agora() {
      return store.state.agoraStore.resource;
    },
    userDetails() {
      return store.getters["userStore/userDetails"];
    },
  },
  mounted() {
    // store.dispatch("userStore/setToken", this.$route.query.user);
  },

  methods: {
    // async gen() {
    //   try {
    //     const response = await axios.post(
    //       `https://gene-agora-token.herokuapp.com/acquire`,
    //       {
    //         channel: "demoroom",
    //         uid: 1503150315,
    //         mode: "web",
    //         url: "https://tonote-notary-session.netlify.app/notary-session",
    //       }
    //     );
    //     console.log(response);
    //     // commit("SET_RESOURCE", response.data.resourceId);
    //   } catch (error) {
    //     // Vue.$toast.error(error);
    //   }
    //   // store.dispatch("agoraStore/getResourceId", {
    //   //   channel: "room",
    //   //   uid: 1503150315,
    //   //   mode: "web",
    //   //   url: "https://tonote-notary-session.netlify.app/notary-session",
    //   // });
    // },
    async generate() {
      try {
        const name_id = this.name;
        const response = await axios.get(
          `https://gene-agora-token.herokuapp.com/rtc/newroom/publisher/uid/${name_id}`
        );
        sessionStorage.setItem("agora", JSON.stringify(response.data));
        setTimeout(() => {
          this.$router.push({ path: "/waiting-page" });
        }, 500);
        store.commit("userStore/SET_NAME", this.name);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped></style>
