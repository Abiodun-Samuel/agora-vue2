<template>
  <!-- <div>
      <nav class="navbar navbar-expand-lg bg-white">
         <div class="container">
            <span>
               <Icon icon="bx:home" height="25" width="25" />
            </span>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
               aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse d-flex justify-content-between align-items-center" id="navbarSupportedContent">

               <router-link class="navbar-brand" to="/">
                  <img class="logo" src="../../assets/images/logo.png" alt="logo">
               </router-link>

               <div :class="$route.path == '/video' ? 'hidden__two' : ''">
                  <button class="btn btn-primary mx-1" disabled>Cancel</button>
                  <button class="btn btn-primary mx-1">Complete</button>
               </div>
            </div>
         </div>
      </nav>
   </div> -->

  <nav class="navbar navbar-expand-lg bg-white fixed-top">
    <div class="container">
      <div class="menu d-flex justify-content-between w-100 align-items-center">
        <a class="navbar-brand d-none d-lg-block text-muted" href="/">
          <!-- <i class="" data-feather="home"></i> -->
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
            class="feather feather-home ficon"
            style="font-size: 22px"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <!-- <Icon icon="bx:home" height="25" width="25" /> -->
        </a>
        <span class="nav-item">
          <router-link class="navbar-brand" to="/">
            <img class="logo" src="../../assets/images/logo.png" alt="logo" />
          </router-link>
        </span>
        <div :class="$route.path !== '/video' ? 'hidden__two' : ''">
          <button class="btn btn-sm btn-primary" disabled>Cancel</button>
          <button class="btn btn-sm btn-primary ms-1">Complete</button>
        </div>
      </div>

      <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
         </button> -->

      <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <li class="nav-item">
               <router-link class="navbar-brand" to="/">
                  <img class="logo" src="../../assets/images/logo.png" alt="logo">
               </router-link>
            </li>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">

               <li class="nav-item">
                  <div :class="$route.path !== '/video' ? 'hidden__two' : ''">
                     <button class="btn btn-primary mx-1" disabled>Cancel</button>
                     <button class="btn btn-primary mx-1">Complete</button>
                  </div>
               </li>
            </ul>
         </div> -->
    </div>
  </nav>
</template>

<script>
// import { Icon } from "@iconify/vue";
export default {
  name: "NavHeader",
  components: {
    //  Icon,
  },
};
</script>

<style>
.navbar {
  box-shadow: var(--bs-box-shadow);
  z-index: 1;
}
.navbar .logo {
  height: 25px;
  width: auto;
  object-fit: contain;
}
.hidden__two {
  visibility: hidden;
}
button[disabled],
button:disabled {
  background: red;
}
</style>
