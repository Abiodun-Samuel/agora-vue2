<template>
  <nav
    style="height: 70px"
    class="header-navbar navbar-expand-lg navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center"
    data-nav="brand-center"
  >
    <!-- <div class="navbar-header d-xl-block d-none">
      <ul class="nav navbar-nav">
        <li class="nav-item">
          <template v-if="role != 'Viewer'">
            <router-link :to="{ name: 'Dashboard' }" class="navbar-brand">
              <img src="@/assets/images/logo-dark.png" alt="" height="26" />
            </router-link>
          </template>
          <template v-else>
            <a href="#!" class="navbar-brand">
              <img src="@/assets/images/logo-dark.png" alt="" height="26" />
            </a>
          </template>
        </li>
      </ul>
    </div> -->

    <div class="navbar-container d-flex content">
      <div
        class="bookmark-wrapper d-flex align-items-center"
        v-if="role != 'Viewer'"
      >
        <ul class="nav navbar-nav bookmark-icons">
          <li class="nav-item">
            <a
              role="button"
              class="dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="true"
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
                class="feather feather-home ficon"
                style="font-size: 22px"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span class="visually-hidden"></span>
            </a>

            <div
              class="dropdown-menu dropdown-menu-start"
              data-popper-placement="bottom-start"
            >
              <a
                class="dropdown-item"
                :href="redirectToUserDashboard + '/redirecting?qt=' + token"
              >
                Dashboard</a
              >
              <router-link :to="{ name: 'Dashboard' }" class="dropdown-item"
                >My Documents</router-link
              >
            </div>
          </li>
        </ul>
      </div>

      <ul class="nav navbar-nav align-items-center ms-auto">
        <li class="nav-item dropdown dropdown-user">
          <a
            class="nav-link dropdown-toggle dropdown-user-link"
            id="dropdown-user"
            href="#"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div v-if="profile" class="user-nav d-sm-flex d-none">
              <p class="user-name fw-bolder">{{ fullName }}</p>
              <span class="user-status text-capitalize">{{ team }} plan</span>
            </div>

            <span class="avatar">
              <img
                class="round"
                src="@/assets/images/avatar.png"
                alt="avatar"
                height="40"
                width="40"
              />
              <span class="avatar-status-online"></span>
            </span>
          </a>
          <div
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdown-user"
          >
            <a class="dropdown-item" role="button" @click="logout"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-power me-50"
              >
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                <line x1="12" y1="2" x2="12" y2="12"></line>
              </svg>
              Logout</a
            >
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      myTeam: "",
    };
  },
  computed: {
    ...mapGetters("userStore", ["profile"]),
    ...mapGetters("teamStore", ["teams"]),
    fullName() {
      return `${this.profile.first_name} ${this.profile.last_name}`;
    },
    team() {
      this.teams.map((t) => (this.myTeam = t.subscription.plan.name));
      return this.myTeam;
    },
  },
  methods: {
    logout() {},
  },
  created() {
    if (!this.team) {
      this.$store.dispatch("teamStore/getTeams");
    }
  },
};
</script>

<style scoped>
.dropdown-menu {
  z-index: 999 !important;
}

.dropdown-item.active,
.dropdown-item:active {
  color: #003bb3 !important;
  background-color: #fff;
}

.dropdown-toggle::after,
.dropup .dropdown-toggle::after {
  content: none;
}

.dropdown-menu-start {
  left: 20px;
}
</style>
