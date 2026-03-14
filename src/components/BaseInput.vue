<template>
  <div class="mb-2">
    <label v-if="label" class="form-label">
      {{ label }}
    </label>
    <input
      :type="type"
      :value="value"
      class="form-control"
      :class="{ 'is-invalid': error }"
      @input="$emit('input', $event.target.value)"
    />

    <div v-if="error" class="invalid-feedback">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseInput",

  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    error: {
      type: String,
      default: "",
    },
  },
};
</script>
