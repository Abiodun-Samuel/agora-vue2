<template>
  <div>
    <label>{{ label }}</label>
    <input
      :value="value"
      class="form-control"
      :class="{ error: error }"
      :placeholder="label"
      @change="updateValue"
      v-on="listeners"
      v-bind="$attrs"
    />
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    error: {
      type: Boolean,
      default: false,
    },
    value: [String, Number],
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>
<style lang="css">
.error {
  border: 1.5px solid red;
}
</style>
