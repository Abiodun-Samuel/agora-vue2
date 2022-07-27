<template>
  <div class="tool__box d-sm-none d-lg-block">
    <div class="d-flex justify-content-center">
      <div class="sidebar-nav card p-2">
        <div>
          <div>
            Add to document
            <hr />
          </div>
          <!-- <div class="form-check form-check-primary form-switch">
            <input
              type="checkbox"
              class="form-check-input"
              ref="addMeAsSigner"
              id="collapse-sidebar-switch"
              @click="addMe"
            />
            <label class="form-check-label" for="collapse-sidebar-switch"
              >Add me as Signer</label
            >
          </div>
          <hr />
          <div class="border-bottom mb-1 pb-1">
            <div class="d-grid col-lg-12 col-md-12 mb-1 mb-lg-0">
              <button
                type="button"
                class="btn btn-primary waves-effect waves-float waves-light"
                @click="addSignerModal = true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-plus"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span> Add Signer</span>
              </button>
            </div>
          </div> -->

          <div class="signer-list">
            <div class="border-bottom mb-1 pb-1">
              <label class="form-label">Select a signer</label>
              <select
                class="form-select select2"
                @change="selectSigner"
                v-model="signerEmail"
              >
                <option value="">Select Signer</option>
                <option
                  v-for="(signer, index) in participants"
                  :value="signer.user.email"
                  :data-email="signer.user.email"
                  :key="index"
                >
                  {{ signer.user.first_name }} {{ signer.user.last_name }}
                </option>
              </select>
            </div>
          </div>

          <div class="signer-wrapper">
            <ToolKits :tools="toolKit" @bindTool="addMouseMoveListener" />
          </div>
        </div>
        <!-- <div v-else class="signer-wrapper">
          <div class="tool">
            <li>
              Image
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                class="ml-auto tool-svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </li>
          </div>
        </div> -->
      </div>
    </div>
  </div>

  <!-- <ModalComp :show="addSignerModal" @close="addSignerModal = false">
    <template #header>
      <h5 class="modal-title">Add Signer</h5>
    </template>

    <template #body>
      <AddSigner @close="addSignerModal = false" />
    </template>
  </ModalComp>

  <ModalComp
    :show="removeMeFromSignerModal"
    :size="'modal-sm'"
    @close="removeMeFromSignerModal = false"
  >
    <template #header>
      <h4 class="ms-auto">Warning</h4>
    </template>
    <template #body>
      <h4 class="modal-title text-center">
        Are you sure you want to remove this signer ?
      </h4>
      <p class="modal-text text-center">
        This will remove all tools added in the signer's name
      </p>
    </template>
    <template #footer>
      <div class="d-flex justify-content-end align-items-center">
        <button class="btn btn-outline-danger" @click="yesRemove">
          Yes Remove
        </button>
      </div>
    </template>
  </ModalComp> -->
</template>

<script setup>
import ToolKits from "./ToolKits.vue";
import { useStore } from "vuex";
import { computed } from "vue";
let store = useStore();

const participants = computed(
  () => store.state.documentStore.documents.files.participants
);
// const userDetails = computed(() => store.state.userStore.userDetails);

// const addMe = () => {};
</script>

<style>
.tool__box {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: var(--bs-box-shadow);
  height: 80vh;
  position: sticky;
  top: 70px;
}
</style>
