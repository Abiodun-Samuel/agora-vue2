<template>
  <div v-if="$route.params.channel === 'test'" class="shadow-lg">
    <img
      class="img-fluid"
      src="https://staging-tonote-storage.s3.eu-west-1.amazonaws.com/uploads/documents/Affidavit of Change of Ownership162d432986adb9.png"
      alt="documents"
    />
  </div>
  <div
    v-else
    class="shadow-lg d-flex flex-column justify-content-center align-items-center"
    style="height: 90vh"
  >
    <img
      class="img-fluid"
      height="200"
      width="200"
      src="https://cdn0.iconfinder.com/data/icons/interface-set-vol-2/50/No_data_No_info_Missing-1024.png"
      alt=""
    />
    <p class="text-danger">No document</p>
  </div>
</template>

<script></script>

<style></style>
