<template>
  <div>
    <div class="document__box">
      <h4 class="text-center">Document</h4>
      <div
        class="image__placeholder"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        <img class="passport" v-if="show" :src="passport" />
      </div>

      <div class="card-body mail-message-wrapper pt-2">
        <div class="mail-message">
          <div v-for="(doc, index) in files" class="border mb-1" :key="index">
            <span class="d-block text-center">
              <img :src="doc.file" class="img-fluid" :alt="doc.id" />
            </span>

            <div class="clearfix">
              <h6 class="float-end">
                Page {{ ++index }} of {{ files.length }}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="fw-bolder">Upload image, take a picture or select</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="">
              <TabNav
                :tabs="['Upload', 'Picture', 'Select']"
                :selected="selected"
                @selected="setSelected"
              >
                <TabComponent :isSelected="selected === 'Upload'">
                  <ImageUpload />
                </TabComponent>
                <TabComponent :isSelected="selected === 'Picture'">
                  <TakePicture />
                </TabComponent>
                <TabComponent :isSelected="selected === 'Select'">
                  <SelectImage />
                </TabComponent>
              </TabNav>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              :disabled="isDisabled"
              @click="proceed"
              data-bs-dismiss="modal"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from "aos";
import TabNav from "@/components/Tab/TabNav.vue";
import TabComponent from "@/components/Tab/TabComponent.vue";
import ImageUpload from "../Document/ImageUpload";
import TakePicture from "../Document/TakePicture.vue";
import SelectImage from "../Document/SelectImage.vue";
import { mapState } from "vuex";
// import store from "@/store";

export default {
  data() {
    return {
      selected: "Upload",
    };
  },
  components: { TabNav, TabComponent, ImageUpload, TakePicture, SelectImage },
  computed: {
    ...mapState("documentStore", { passport: (state) => state.passport }),
    ...mapState("documentStore", { isDisabled: (state) => state.isDisabled }),
    ...mapState("documentStore", { show: (state) => state.show }),
    ...mapState("documentStore", {
      files: (state) => state.documents.files.documentUploads,
    }),
  },
  methods: {
    setSelected(tab) {
      this.selected = tab;
    },
    proceed() {
      this.$store.commit("documentStore/showPassport");
      this.$store.dispatch("documentStore/postPassport");
    },
  },

  mounted() {
    AOS.init({ duration: 500 });
    this.$store.dispatch(
      "documentStore/getDocument",
      "ba67f5db-e70f-43a6-9dcb-56620495b7c5"
    );
  },
};
</script>

<style>
#display__snapshot {
  width: 50%;
  height: auto;
}
.close-btn {
  position: absolute;
  top: 2px;
  right: 2px;
}
.document__box {
  position: relative;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: var(--bs-box-shadow);
  padding: 2rem;
}
.image__placeholder {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  /* border: 1.4px solid lightblue; */
  border-radius: 4px;
}

.passport {
  position: absolute;
  display: block;
  width: 100%;
  height: auto;
}

.web-camera-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* .web-camera-container .camera-button {
  
} */

.timer {
  border-radius: 50%;
  height: 30px;
  width: 30px;
  background: var(--bs-purple);
  color: #fff;
  padding: 4px;
}

.web-camera-container .camera-box .camera-shutter {
  opacity: 0;
  width: 450px;
  height: 337.5px;
  background-color: #fff;
  position: absolute;
}
.web-camera-container .camera-box .camera-shutter.flash {
  opacity: 1;
}
.web-camera-container .camera-shoot {
  margin: 5px 0;
}
.web-camera-container .camera-shoot button {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
}
.web-camera-container .camera-shoot button .iconify {
  height: 30px;
  width: 30px;
  padding: 3.5px;
}
.web-camera-container .camera-loading {
  overflow: hidden;
  height: 100%;
  position: absolute;
  width: 100%;
  min-height: 150px;
  margin: 3rem 0 0 -1.2rem;
}
.web-camera-container .camera-loading ul {
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 999999;
  margin: 0;
}
.web-camera-container .camera-loading .loader-circle {
  display: block;
  height: 14px;
  margin: 0 auto;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  position: absolute;
  width: 100%;
  padding: 0;
}
.web-camera-container .camera-loading .loader-circle li {
  display: block;
  float: left;
  width: 10px;
  height: 10px;
  line-height: 10px;
  padding: 0;
  position: relative;
  margin: 0 0 0 4px;
  background: #999;
  animation: preload 1s infinite;
  top: -50%;
  border-radius: 100%;
}
.web-camera-container .camera-loading .loader-circle li:nth-child(2) {
  animation-delay: 0.2s;
}
.web-camera-container .camera-loading .loader-circle li:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes preload {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
</style>
