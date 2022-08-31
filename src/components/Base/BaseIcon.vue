<template>
  <Icon :icon="icon_name" />
</template>
<script>
import { Icon } from "@iconify/vue2";
export default {
  props: {
    icon_name: {
      type: String,
      required: true,
      default: "",
    },
  },
  components: {
    Icon,
  },
};
</script>
