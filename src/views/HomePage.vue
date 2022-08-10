<template>
  <div
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

        <!-- <div
          style="
            height: 500px;
            width: 500px;
            border: 1px solid red;
            position: relative;
          "
        >
          <vue-draggable-resizable
            :w="100"
            :h="100"
            @dragging="onDrag"
            @resizing="onResize"
            :parent="true"
          >
            <p>
              Hello! I'm a flexible component. You can drag me around and you
              can resize me.<br />
              X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height:
              {{ height }}
            </p>
          </vue-draggable-resizable>
        </div> -->
        <!-- <button @click="mess" class="btn btn-primary mr-2 my-2 btn-block">
          try
        </button> -->
      </div>
    </div>
    <!-- <PreLoader /> -->
    <!-- <a
      href="http://localhost:8080/?user=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vdG9ub3RlLWFwaS5oZXJva3VhcHAuY29tL2FwaS92MS91c2VyL2xvZ2luIiwiaWF0IjoxNjU5NjkwMjI3LCJleHAiOjE2NTk4NjMwMjcsIm5iZiI6MTY1OTY5MDIyNywianRpIjoiNTl0NWpuSXczbmFPU052MSIsInN1YiI6IjE4MzY3ODMwLTUzN2UtNGFjNi04MWNkLTlmYTJmYTRiZjYyZSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.v-f0GRY6aNCXlRvZB7RZZiGno4CyX3ZGK5QUXqxjJJY
    ></a> -->
  </div>
</template>

<script>
import axios from "axios";
import { generateUid } from "@/utils/helper";
import { store } from "@/store";
import Pusher from "pusher-js";
import Api from "@/api";

Pusher.logToConsole = true;
var pusher = new Pusher(process.env.VUE_APP_APP_KEY, {
  cluster: process.env.VUE_APP_APP_CLUSTER,
});

var channel = pusher.subscribe("tone-development");
channel.bind("ready-ready", function (data) {
  console.log(data);
});

export default {
  data() {
    return {
      name: null,
    };
  },
  // components: { PreLoader },
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
    async mess() {
      try {
        await Api.post("http://localhost:5000/notary-ready");
      } catch (error) {
        console.log(error);
      }
    },

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
        const name_id = generateUid(this.name);
        const response = await axios.get(
          `https://gene-agora-token.herokuapp.com/rtc/demoroom/publisher/uid/${name_id}`
        );
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("appid", response.data.appid);
        sessionStorage.setItem("uid", response.data.uid);
        sessionStorage.setItem("channel", response.data.channelName);
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
