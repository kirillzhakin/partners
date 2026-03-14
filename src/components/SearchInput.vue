<template>
  <input
    type="text"
    :value="value"
    @input="onInput"
    :placeholder="placeholder"
    class="form-control mb-2"
  />
</template>

<script>
import { debounce } from "lodash";
export default {
  props: ["value", "placeholder"],
  methods: {
    onInput: debounce(function (e) {
      this.$emit("input", e.target.value);
    }, 400),
  },
};
</script>
