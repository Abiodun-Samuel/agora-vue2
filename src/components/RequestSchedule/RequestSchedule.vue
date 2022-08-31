<template>
  <section class="container">
    <div class="content-body">
      <h3>Requesting a Notary</h3>
      <div class="mb-2">
        <li>Please select a date and time for your notary session.</li>
        <li>Choose a convenient time for you and your signers.</li>
        <li>
          We will send you a confirmation email with the meeting link and
          session time.
        </li>
        <li>You can track the status of your requests in “My Requests”.</li>
      </div>

      <hr />

      <section class="invoice-edit-wrapper">
        <div class="row invoice-edit">
          <div class="col-xl-8 col-md-6 col-12">
            <div class="">
              <h3 for="">Request title</h3>
              <div class="card">
                <input
                  type="text"
                  v-model="documentTitle"
                  class="form-control request-title"
                  placeholder="Add Title"
                />
              </div>
            </div>
            <div class="card">
              <div class="card-body pt-0">
                <ul class="nav nav-tabs" role="tablist">
                  <li class="nav-item my-1 text-primary">
                    Pick a slot
                    <!-- <a
                      class="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      href="#home"
                      aria-controls="home"
                      role="tab"
                      aria-selected="true"
                    ></a> -->
                  </li>
                </ul>

                <div class="tab-content">
                  <div
                    class="tab-pane active"
                    id="home"
                    aria-labelledby="home-tab"
                    role="tabpanel"
                  >
                    <div class="row mb-2">
                      <div class="row col-lg-8 col-12">
                        <div class="col-8">
                          <label for="">Date</label>
                          <div class="form-group mb-1">
                            <input
                              type="date"
                              class="form-control"
                              name=""
                              id=""
                            />
                          </div>
                        </div>
                        <div class="col-4">
                          <label for="">Time</label>
                          <div class="form-group mb-1">
                            <select name="" id="cars" class="form-control">
                              <option
                                v-for="(time, index) in time_slots"
                                :key="time + index"
                                value="volvo"
                              >
                                {{ time }}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr class="invoice-spacing mt-0" />

              <div class="card-body invoice-padding py-0">
                <div class="row">
                  <div class="col-12">
                    <div class="mb-2">
                      <label for="note" class="form-label fw-bold"
                        >Add Description:</label
                      >
                      <textarea
                        class="form-control"
                        rows="2"
                        id="note"
                        placeholder="Hi I'm inviting you to co-sign a document online on the ToNote Platform"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-6 col-12">
            <div class="invoice-preview-card">
              <div class="card-body invoice-padding invoice-product-details">
                <div data-repeater-list="group-a">
                  <div class="repeater-wrapper">
                    <div
                      class="border-bottom d-flex justify-content-between pb-1"
                    >
                      <div>
                        <h5>Participants</h5>
                      </div>
                      <div>
                        <button
                          type="button"
                          class="btn btn-outline-primary btn-sm"
                          @click="addNotaryParticipantModal = true"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                    <div class="row mt-2">
                      <div
                        class="col-12 d-flex product-details-border position-relative pe-0"
                      >
                        <div class="table-responsive">
                          <table class="table table-borderless fs-13">
                            <thead>
                              <tr>
                                <th>SN</th>
                                <th>Full Name</th>
                                <th>Role</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <template v-if="notaryDocument?.length === 0">
                                <tr>
                                  <td colspan="4">
                                    <i class="d-block text-center"
                                      >No participant added</i
                                    >
                                  </td>
                                </tr>
                              </template>
                              <template v-else>
                                <tr
                                  class="mtable"
                                  v-for="(
                                    signer, index
                                  ) in notaryDocument.participants"
                                  :key="index"
                                >
                                  <td>
                                    <span id="sr_no">{{ ++index }}</span>
                                  </td>
                                  <td>
                                    <div
                                      class="d-flex justify-content-left align-items-center"
                                    >
                                      <div class="avatar-wrapper">
                                        <div
                                          class="avatar bg-light-primary me-50"
                                        >
                                          <div class="avatar-content">
                                            {{
                                              getFirstLetters(
                                                signer.user.first_name +
                                                  " " +
                                                  signer.user.last_name
                                              )
                                            }}
                                          </div>
                                        </div>
                                      </div>
                                      <div class="d-flex flex-column">
                                        <h6
                                          class="user-name text-truncate mb-0"
                                        >
                                          {{
                                            signer.user.first_name +
                                            " " +
                                            signer.user.last_name
                                          }}
                                        </h6>
                                        <small
                                          class="text-truncate text-muted"
                                          >{{ signer.user.email }}</small
                                        >
                                        <small
                                          class="text-truncate text-muted"
                                          >{{ signer.user.phone }}</small
                                        >
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    {{
                                      signer.role != ""
                                        ? signer.role
                                        : "Not set"
                                    }}
                                  </td>
                                  <td>
                                    <button
                                      @click="deleteParticipant(signer.id)"
                                      class="btn btn-sm btn-outline-danger"
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              </template>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class=" ">
        <div class="clearfix">
          <button class="float-end btn btn-primary">Submit Request</button>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      documentTitle: "",
      notaryDocument: "",
    };
  },
  computed: {
    ...mapGetters("scheduleStore", ["time_slots"]),
  },
  methods: {
    ...mapActions("scheduleStore", ["getTimeSlots"]),
  },
  created() {
    this.getTimeSlots();
  },
};
// import { ref } from "vue";
// import ModalComp from "@/components/ModalComp.vue";

// import { createNamespacedHelpers } from "vuex-composition-helpers/dist";

// const { useGetters, useActions } = createNamespacedHelpers(["document"]);

// const { notaryDocument } = useGetters(["notaryDocument"]);

// const { addNotaryParticipant } = useActions(["addNotaryParticipant"]);
// const { removeNotaryParticipant } = useActions(["removeNotaryParticipant"]);

// const emit = defineEmits(['close'])

// const removeParticipantModal = ref(false);
// const participantId = ref("");
// const documentTitle = ref("");
// const notaryDocument = ref([]);

// documentTitle.value = notaryDocument.value.title;

// const addNotaryParticipantModal = ref(false);
// const isRemove = ref(false);

// const rows = ref([
//   { first_name: "", last_name: "", email: "", phone: "", role: "", action: "" },
// ]);
// const addRow = () => {
//   rows.value.push({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     role: "",
//     action: "x",
//   });
// };

// const removeRow = (index) => {
//   isRemove.value = true;
//   rows.value.splice(index, 1);
// };

// let formObj = [];
// const submitParticipant = () => {
//   rows.value.forEach((obj) => {
//     formObj.push({
//       document_id: notaryDocument.value.id,
//       first_name: obj.first_name,
//       last_name: obj.last_name,
//       email: obj.email,
//       phone: obj.phone,
//       role: obj.role,
//     });
//   });

//   addNotaryParticipant(formObj);
//   // emit('close', true)
//   addNotaryParticipantModal.value = false;
//   formObj = [];
//   rows.value = [
//     {
//       first_name: "",
//       last_name: "",
//       email: "",
//       phone: "",
//       role: "",
//       action: "-",
//     },
//   ];
// };

// const deleteParticipant = (params) => {
//   removeParticipantModal.value = true;
//   participantId.value = params;
//   console.log("THE PARTICIPANT ID: ", params);
// };
// const yesRemove = () => {
//   console.log("FROM REMOVE: ", participantId.value);
//   removeNotaryParticipant(participantId.value);
//   removeParticipantModal.value = false;
// };

// const getFirstLetters = (str) => {
//   const firstLetters = str
//     .split(" ")
//     .map((word) => word[0])
//     .join("");

//   return firstLetters;
// };
</script>

<style scoped></style>
