<template>
  <div class="content-wrapper container-xxl p-0">
    <div class="content-body">
      <RequestSchedule />
    </div>
  </div>
</template>

<script setup>
import RequestSchedule from "./RequestSchedule.vue";

import { createNamespacedHelpers } from "vuex-composition-helpers/dist";

const { useGetters } = createNamespacedHelpers(["document"]);

const { notaryDocument } = useGetters(["notaryDocument"]);
// const { getUserDocument } = useActions(["getUserDocument"]);
// const { addParticipant } = useActions(["addParticipant"]);

console.log("REQUEST NOTARY: ", notaryDocument.value);
</script>

<style scoped>
@import "@/assets/admin/css/bootstrap.min.css";

.table > :not(caption) > * {
  padding: 0.72rem 2rem;
  background-color: var(--bs-table-bg);
  border-bottom-width: 1px;
  box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg);
}

.table-bordered > :not(caption) * {
  border-width: 1px;
}

.btn:focus,
.btn-outline-primary:focus {
  outline: none !important;
  box-shadow: none !important;
}
</style>
