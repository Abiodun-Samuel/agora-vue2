<template>
  <div>
    <ul class="nav nav-tabs">
      <li v-for="tab in tabs" :key="tab" class="nav-item">
        <a
          class="nav-link"
          :class="{ active: tab === selected }"
          @click="setTab(tab)"
          >{{ tab }}</a
        >
      </li>
    </ul>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    /* Holds all of the tabs data */
    tabs: {
      type: Array,
      required: true,
    },
    selected: {
      type: String,
      required: true,
    },
  },
  methods: {
    setTab(tab) {
      this.$emit("selected", tab);
    },
  },
};
</script>

<style scoped>
.nav {
  width: 270px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  background-color: #ebebeb;
  border: 1.3px solid rgb(223, 223, 255);
  padding: 4px;
}

.nav-link.active {
  background-color: var(--bs-purple);
  color: white;
  border-radius: 4px;
  box-shadow: var(--bs-box-shadow);
  transition: 350ms;
}
</style>
