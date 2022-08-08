<template>
  <div class="mt-5 d-flex justify-content-center">
    <video height="500" width="500" controls>
      <source
        :src="`https://notary-session.s3.eu-west-2.amazonaws.com/${recordedFiles}`"
        type="video/mp4"
      />
    </video>
  </div>
</template>
<script>
import { store } from "@/store";
export default {
  computed: {
    recordedFiles() {
      return store.state.agoraStore.filename; 
      // return store.getters["agoraStore/files"];
    },
  },
  updated() {},
};
</script>
<style lang=""></style>
