<ModalComp
  :show="addNotaryParticipantModal"
  @close="addNotaryParticipantModal = false"
>
    <template #header>
      <h5 class="modal-title">Add Participants</h5>
    </template>

    <template #body>
      <div class="modal-body m-auto">
        <!-- <div class="card-body"> -->

        <div
          class="row d-flex justify-content-center align-items-end"
          v-for="(row, index) in rows"
          :key="index"
        >
          <div class="col-md-2 col-12">
            <div class="mb-1">
              <label class="form-label" for="firstName">First name</label>
              <input
                type="text"
                name="first_name"
                v-model="row.first_name"
                class="form-control"
                id="firstName"
                aria-describedby="firstName"
                placeholder="Full name"
              />
            </div>
          </div>

          <div class="col-md-2 col-12">
            <div class="mb-1">
              <label class="form-label" for="lastName">Last name</label>
              <input
                type="text"
                name="last_name"
                v-model="row.last_name"
                class="form-control"
                id="lastName"
                aria-describedby="lastName"
                placeholder="Full name"
              />
            </div>
          </div>

          <div class="col-md-2 col-12">
            <div class="mb-1">
              <label class="form-label" for="email">Email</label>
              <input
                type="email"
                name="email"
                v-model="row.email"
                class="form-control"
                id="email"
                aria-describedby="email"
                placeholder="name@domain.com"
              />
            </div>
          </div>

          <div class="col-md-2 col-12">
            <div class="mb-1">
              <label class="form-label" for="phone">Phone</label>
              <input
                type="text"
                name="phone"
                v-model="row.phone"
                class="form-control"
                id="phone"
                aria-describedby="phone"
                placeholder="08012345678"
              />
            </div>
          </div>

          <div class="col-md-2 col-12">
            <div class="mb-1">
              <label class="form-label" for="role">Role</label>
              <select name="role" v-model="row.role" class="form-select">
                <option value="">Select Role</option>
                <option>Signer</option>
                <option>Viewer</option>
              </select>
            </div>
          </div>

          <div class="col-md-2 col-12 d-flex align-items-center">
            <div class="mb-1">
              <template v-if="row.action == 'x'">
                <button
                  type="button"
                  class="btn btn-outline-success"
                  :class="['btn-outline-danger', isRemove]"
                  @click="removeRow(index)"
                >
                  {{ row.action }}
                </button>
              </template>
            </div>
          </div>
          <hr />
        </div>

        <div class="row">
          <div class="col-12">
            <button
              @click="addRow"
              class="btn btn-icon btn-outline-primary waves-effect waves-float waves-light"
              type="button"
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
                class="feather feather-plus me-25"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Add New Row</span>
            </button>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </template>

    <template #footer>
      <div class="modal-footer">
        <button
          type="submit"
          @click="submitParticipant"
          class="btn btn-primary waves-effect waves-float waves-light"
          id="addSigner"
        >
          Submit
        </button>
      </div>
    </template>
  </ModalComp>

<ModalComp
  :show="removeParticipantModal"
  :size="'modal-sm'"
  @close="removeParticipantModal = false"
>
    <template #header>
      <h4 class="text-danger">Alert</h4>
    </template>
    <template #body>
      <h5 class="modal-title text-center">
        Are you sure you want to remove the participant ?
      </h5>
    </template>
    <template #footer>
      <div class="d-flex justify-content-end align-items-center">
        <button class="btn btn-outline-danger" @click="yesRemove">
          Yes Remove
        </button>
      </div>
    </template>
  </ModalComp>
