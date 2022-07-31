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
    {{ $route.query.user }}
  </div>
</template>

<script>
import axios from "axios";
// import { mapState } from "vuex";

export default {
  data() {
    return {
      name: null,
    };
  },

  computed: {
    // ...mapState("documentStore", {
    //   uploadedPassport: (state) => state.passports,
    // }),
    // ...mapState("notarySessionStore", {
    //   notary: (state) => state.notary,
    // }),
  },
  mounted() {
    this.$store.dispatch("documentStore/getPassports");
  },

  methods: {
    async generate() {
      try {
        const name_id = this.name
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "");

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
