<template>
  <div class="d-flex justify-content-center align-items-center" style="100vh">
    <div class="text-center mt-5">
      <img
        class="not__found shadow-sm mt-5 d-block"
        src="@/assets/notfound.jpg"
        alt="page not found"
      />
      <router-link to="/" class="btn btn-primary my-2">Home</router-link>
    </div>
  </div>
</template>
<style lang="css">
.not__found {
  height: 350px;
  width: 350px;
  padding: 3px;
  border-radius: 4px;
  background: #fff;
}
</style>
