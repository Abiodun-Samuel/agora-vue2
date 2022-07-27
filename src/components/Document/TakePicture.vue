<template>
  <div class="my-2" data-aos="zoom-in">
    <div class="camera__container">
      <div class="alert__box">
        <p class="small text-danger">
          Place your head within the box. <br />
          No glasses or face-cap. <br />
          Background must be plain.
        </p>
        <p data-aos="zoom-in" v-if="timer" class="timer">
          {{ timer }}
        </p>
      </div>
      <video ref="video" id="passport__video" autoplay></video>
      <div class="photoArea"></div>
    </div>
    <div class="control d-flex justify-content-center align-items-center">
      <button
        class="btn btn-primary d-flex justify-content-center align-items-center"
        @click="takePhoto()"
      >
        <span class="iconify" data-icon="fluent:camera-20-filled"></span>
      </button>
    </div>
    <canvas
      width="140"
      height="190"
      ref="canvas"
      style="display: none"
    ></canvas>
    <div>
      <img
        v-show="snapImgSrc"
        :src="snapImgSrc"
        class="snap__shoot"
        width="140"
        height="190"
        data-aos="zoom-in"
      />
    </div>
  </div>
</template>

<script>
// import { onMounted, ref, onUnmounted } from "vue";
import AOS from "aos";

export default {
  data() {
    return {
      localMediaStream: null,
      video: null,
      canvas: null,
      snapImgSrc: false,
      timer: null,
    };
  },
  methods: {
    takePhoto() {
      if (this.localMediaStream) {
        let count = 3;
        this.timer = 3;
        setInterval(() => {
          if (count >= 1) {
            count--;
            this.timer = count;
          }
        }, 1000);

        setTimeout(() => {
          var ctx = this.$refs.canvas.getContext("2d");
          ctx.drawImage(this.$refs.video, 180, 80, 280, 380, 0, 0, 140, 190);
          this.snapImgSrc = this.$refs.canvas.toDataURL("image/jpeg");
          this.$store.commit(
            "documentStore/loadPassport",
            this.$refs.canvas.toDataURL("image/jpeg")
          );
        }, 3000);
      }
    },

    startCapture() {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
      window.URL = window.URL || window.webkitURL;

      navigator.getUserMedia(
        { video: true },
        (stream) => {
          this.$refs.video.srcObject = stream;
          this.localMediaStream = stream;
        },
        (e) => {
          console.log(e);
        }
      );
    },

    stopCapture() {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
      window.URL = window.URL || window.webkitURL;

      navigator.getUserMedia(
        { video: true },
        function (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(function (track) {
            track.stop();
            track.enabled = false;
          });
        },
        function (e) {
          console.log(e);
        }
      );
    },
  },
  mounted() {
    AOS.init({ duration: 500 });
    this.startCapture();
  },
  unmounted() {
    this.stopCapture();
  },
};
</script>

<style lang="css" scoped>
.iconify {
  height: 20px;
  width: 20px;
}
button {
  border-radius: 50%;
  padding: 5px;
  height: 35px;
  width: 35px;
}

.camera__container {
  width: auto;
  height: 240px;
  position: relative;
}
.camera__container video {
  width: 100%;
  height: 100%;
  position: absolute;
}

.camera__container .photoArea {
  border: 2px dashed white;
  width: 140px;
  height: 190px;
  margin: 0 auto;
  position: relative;
  top: 40px;
}
.control {
  position: relative;
  margin-top: 6rem;
  margin-bottom: 1rem;
  z-index: 100;
}
.alert__box {
  display: flex;
  justify-content: space-between;
}
.timer {
  border-radius: 50%;
  height: 30px;
  width: 30px;
  background: var(--bs-purple);
  color: #fff;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
