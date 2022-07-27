<template lang="html">
  <div class="my-3" v-if="loading">
    <SkeletonLoader :loading="true" />
  </div>
  <div
    class="uploaded__images my-3"
    v-else-if="!loading && uploadedPassport?.length > 0"
  >
    <label
      class="uploaded__image"
      :for="image.id"
      v-for="image in uploadedPassport"
      :key="image.id"
    >
      <button
        class="btn text-danger bg-transparent delete__btn"
        @click="deleted(image.id, image.file)"
      >
        <span class="iconify" data-icon="clarity:edit-solid"></span>
      </button>
      <input checked type="radio" name="plan" :id="image.id" />
      <div class="plan-content" @click="select(image.file)">
        <img loading="lazy" :src="image.file" :alt="image.category" />
      </div>
    </label>
  </div>
  <div class="my-3 text-center text-danger" v-else>
    <h5 class="fw-bold">You do not have any picture saved.</h5>
  </div>
</template>

<script>
// import { onMounted, computed } from "vue";
// import SkeletonLoader from "../Loader/SkeletonLoader.vue";
// import { useStore } from "vuex";
import { mapState } from "vuex";
// let store = useStore();

export default {
  computed: mapState({
    uploadedPassport: (state) => state.documentStore.passports,
    loading: (state) => state.documentStore.loading,
  }),
  methods: {
    select(file) {
      this.$store.commit("documentStore/loadPassport", file);
    },

    deleted(id, file) {
      this.$store.dispatch("documentStore/deletePassport", { id, file });
    },
  },
  mounted() {
    this.$store.dispatch("documentStore/getPassports");
  },
};

// const uploadedPassport = computed(() => store.state.documentStore.passports);
// const loading = computed(() => store.state.documentStore.loading);
</script>

<style scoped lang="css">
.uploaded__images {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  position: relative;
  gap: 15px;
}

.uploaded__images .uploaded__image input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.uploaded__images .uploaded__image {
  cursor: pointer;
  position: relative;
}

.uploaded__images .uploaded__image .plan-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 1px;
  border: 2px solid #efefef;
  border-radius: 5px;
  -webkit-transition: -webkit-box-shadow 0.4s;
  transition: -webkit-box-shadow 0.4s;
  -o-transition: box-shadow 0.4s;
  transition: box-shadow 0.4s;
  transition: box-shadow 0.4s, -webkit-box-shadow 0.4s;
  position: relative;
  width: 120px;
  height: auto;
}
.delete__btn {
  position: absolute;
  top: -15px;
  right: -15px;
  padding: 2px;
  z-index: 1;
}
.uploaded__images .uploaded__image .plan-content img {
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
}

.uploaded__images .uploaded__image .plan-content:hover {
  -webkit-box-shadow: 0px 3px 5px 0px #e8e8e8;
  box-shadow: 0px 3px 5px 0px #e8e8e8;
}

.uploaded__images .uploaded__image input[type="radio"]:checked + .plan-content {
  border: 2px solid #216ee0;
  background: #eaf1fe;
  -webkit-transition: ease-in 0.3s;
  -o-transition: ease-in 0.3s;
  transition: ease-in 0.3s;
}
</style>
