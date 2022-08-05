<template>
  <div>
    {{ recordedFiles }}
  </div>
</template>
<script>
import { store } from "@/store";
export default {
  computed: {
    recordedFiles() {
      return store.getters["agoraStore/files"];
    },
  },
};
</script>
<style lang=""></style>
