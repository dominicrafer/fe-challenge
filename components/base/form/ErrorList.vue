<template>
  <div class="error-list" id="error-list">
    <Alert
      type="danger"
      v-for="(errorDetails, key) in errors"
      :title="$_.startCase(key)"
      :key="key"
      >{{ $_.isArray(errorDetails) ? errorDetails[0] : errorDetails }}</Alert
    >
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="postcss" scoped>
.error-list {
  @apply flex flex-col gap-2 mb-2;
}
</style>