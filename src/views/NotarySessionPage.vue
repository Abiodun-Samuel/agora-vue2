<template>
  <div class="container-fluid">
    <div class="my-1 py-1"></div>
    <div class="row">
      <div class="col-lg-2 my-2">
        <ToolBox />
      </div>
      <div class="col-lg-7 my-2">
        <DocumentBox />
      </div>
      <div class="col-lg-3 my-2">
        <MeetComponent
          :channel="channel"
          :appid="appid"
          :uid="uid"
          :token="token"
          @leave-meeting="handleLeaveMeeting"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DocumentBox from "../components/Document/DocumentBox.vue";
import ToolBox from "../components/Tool/ToolBox.vue";
import MeetComponent from "../components/Meet.vue";

export default {
  name: "NotarySession",
  components: {
    DocumentBox,
    ToolBox,
    MeetComponent,
  },
  data() {
    return {
      isJoinMeeting: false,
      config: null,
      uid: sessionStorage.getItem("uid"),
      appid: sessionStorage.getItem("appid"),
      channel: sessionStorage.getItem("channel"),
      token: sessionStorage.getItem("token"),
    };
  },
  methods: {
    handleJoinMeeting(config) {
      this.isJoinMeeting = true;
      this.config = config;
    },
    handleLeaveMeeting() {
      this.isJoinMeeting = false;
    },
  },
};
</script>
