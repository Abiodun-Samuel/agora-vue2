<template>
  <div
    class="container d-flex justify-content-center align-items-center"
    style="height: 100vh"
  >
    <!-- <div class="row d-flex justify-content-center align-items-center">
      <div class="col-lg-6">
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
      </div>
    </div> -->
    <PreLoader />
    <!-- <a
      href="http://localhost:8080/?user=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vdG9ub3RlLWFwaS5oZXJva3VhcHAuY29tL2FwaS92MS91c2VyL2xvZ2luIiwiaWF0IjoxNjU5NTQ5MDgzLCJleHAiOjE2NTk3MjE4ODMsIm5iZiI6MTY1OTU0OTA4MywianRpIjoidXhBMGgyeEF5YnFucTd2TSIsInN1YiI6IjE4MzY3ODMwLTUzN2UtNGFjNi04MWNkLTlmYTJmYTRiZjYyZSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.gG66TCe3Z35b3loktIaT77SmK-OAEDmoBKb4fc1y7yg"
    ></a> -->
  </div>
</template>

<script>
import axios from "axios";
import { generateUid } from "@/utils/helper";
import { store } from "@/store";
import PreLoader from "@/components/Loader/PreLoader.vue";

export default {
  data() {
    return {
      name: null,
    };
  },
  components: { PreLoader },
  computed: {
    userDetails() {
      return store.getters["userStore/userDetails"];
    },
  },
  mounted() {
    store.dispatch("userStore/setToken", this.$route.query.user);
  },

  methods: {
    async generate() {
      try {
        const name_id = generateUid(this.name);
        console.log(name_id);
        const response = await axios.get(
          `https://gene-agora-token.herokuapp.com/rtc/test/publisher/uid/${name_id}`
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("appid", response.data.appid);
        localStorage.setItem("uid", response.data.uid);
        localStorage.setItem("channel", response.data.channelName);
        setTimeout(() => {
          this.$router.push({ path: "/notary_session" });
        }, 500);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped></style>
