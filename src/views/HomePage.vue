<template>
  <div class="container mt-5 pt-5" style="height: 90vh">
    <div class="row d-flex justify-content-center align-items-center">
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
    </div>
    <!-- {{ $route.query.user }} -->
    <!-- <PreLoader /> -->
  </div>
</template>

<script>
import axios from "axios";
import { generateUid } from "@/utils/helper";
// import PreLoader from "@/components/Loader/PreLoader.vue";

export default {
  data() {
    return {
      name: null,
    };
  },
  // components: { PreLoader },
  computed: {},
  mounted() {},
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
