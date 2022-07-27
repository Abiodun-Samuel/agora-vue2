<template>
  <div class="my-3" data-aos="zoom-in">
    <div v-show="!uploadImgSrc" class="file-input shadow">
      <input
        type="file"
        name="file-input"
        id="file-input"
        class="file-input__input"
        accept="image/*"
        @change="handleImageUpload"
      />
      <div class="d-flex justify-content-center align-items-center">
        <label class="file-input__label" for="file-input">
          <span class="iconify" data-icon="bi:image"></span>
          <p>Upload Image</p>
        </label>
      </div>
    </div>
    <div
      class="mt-2"
      v-if="uploadImgSrc"
      @click="deleteImage"
      id="display__snapshot"
    >
      <span
        class="iconify delete__btn btn btn-danger"
        data-icon="clarity:edit-solid"
        data-aos="zoom-in"
      ></span>
      <img :src="uploadImgSrc" class="img-fluid shadow" data-aos="zoom-in" />
    </div>
  </div>
</template>

<script>
import AOS from "aos";
export default {
  data() {
    return {
      uploadImgSrc: false,
    };
  },
  methods: {
    deleteImage() {
      let file = document.querySelector("input[type=file]");
      file.value = "";
      this.uploadImgSrc = false;
      this.$store.commit("documentStore/unLoadPassport");
    },

    handleImageUpload() {
      const file = document.querySelector("input[type=file]").files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        this.uploadImgSrc = reader.result;
        this.$store.commit("documentStore/loadPassport", this.uploadImgSrc);
      };
      reader.readAsDataURL(file);
    },
  },
  mounted() {
    AOS.init({ duration: 500 });
  },
};
</script>

<style lang="css" scoped>
.file-input {
  width: 100%;
  height: 200px;
  border: 1.25px solid #f3f3f3;
  border-radius: 4px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.file-input__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.file-input__label {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: var(--bs-gray-100);
}
.file-input__label p {
  margin: 5px;
  padding: 0;
}

.file-input__label .iconify {
  height: 45px;
  width: 45px;
}

#display__snapshot {
  position: relative;
  width: 200px;
  height: auto;
  margin: 0 auto;
}
.delete__btn {
  position: absolute;
  top: -5px;
  right: -5px;
  padding: 2px;
  box-shadow: var(--bs-box-shadow);
  z-index: 10;
}
.iconify {
  height: 25px;
  width: 25px;
}
</style>
