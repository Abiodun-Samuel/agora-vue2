<template>
  <div>
    <NavHeader />
    <router-view />
  </div>
</template>

<script>
import NavHeader from "@/components/Header/NavHeader.vue";
export default {
  components: {
    NavHeader,
  },
};
</script>

<style>
:root {
  --bs-blue: #00cfe8;
  --bs-indigo: #6610f2;
  --bs-purple: #003bb3;
  --bs-pink: #d63384;
  --bs-red: #ea5455;
  --bs-orange: #ff9f43;
  --bs-yellow: #ffc107;
  --bs-green: #28c76f;
  --bs-teal: #20c997;
  --bs-cyan: #0dcaf0;
  --bs-white: #ffffff;
  --bs-gray: #b8c2cc;
  --bs-gray-dark: #1e1e1e;
  --bs-gray-100: #babfc7;
  --bs-gray-200: #ededed;
  --bs-gray-300: #dae1e7;
  --bs-gray-400: #636363;
  --bs-gray-500: #adb5bd;
  --bs-gray-600: #b8c2cc;
  --bs-gray-700: #4e5154;
  --bs-gray-800: #1e1e1e;
  --bs-gray-900: #2a2e30;
  --bs-primary: #003bb3;
  --bs-secondary: #82868b;
  --bs-success: #28c76f;
  --bs-info: #00cfe8;
  --bs-warning: #ff9f43;
  --bs-danger: #ea5455;
  --bs-light: #f6f6f6;
  --bs-dark: #4b4b4b;
  --bs-primary-rgb: 41, 20, 199;
  --bs-secondary-rgb: 130, 134, 139;
  --bs-success-rgb: 40, 199, 111;
  --bs-info-rgb: 0, 207, 232;
  --bs-warning-rgb: 255, 159, 67;
  --bs-danger-rgb: 234, 84, 85;
  --bs-light-rgb: 246, 246, 246;
  --bs-dark-rgb: 75, 75, 75;
  --bs-white-rgb: 255, 255, 255;
  --bs-black-rgb: 34, 41, 47;
  --bs-body-rgb: 110, 107, 123;
  --bs-font-poppins: "Poppins", sans-serif;
  --bs-font-monospace: "Montserrat", Helvetica, Arial, serif;
  --bs-gradient: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0)
  );
  --bs-body-font-size: 1rem;
  --bs-body-font-weight: 400;
  --bs-body-line-height: 1.45;
  --bs-body-color: #6e6b7b;
  --bs-body-bg: #f5f5f5;

  --bs-box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
}
body {
  background-color: var(--bs-body-bg);
  font-family: var(--bs-font-poppins);
  z-index: 1;
}
.iconify {
  height: 20px;
  width: 20px;
}
</style>
