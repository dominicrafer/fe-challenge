<template>
  <div class="container-component" :class="`${padding} ${width} ${height}`">
    <slot />
    <InnerLoading :showing="loading" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  padding: {
    type: String,
  },
  width: {
    type: String,
    default: "w-full",
  },
  height: {
    type: String,
    default: "h-auto",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loaderMessage: {
    type: String,
    default: "Loading, please wait...",
  },
  spinnerSize: {
    type: String,
    default: "w-12 h-12 border-2",
  },
});
</script>

<style lang="postcss" scoped>
.container-component {
  @apply relative;
  @apply rounded-sm;
  @apply bg-white;
  @apply w-full min-w-fit;
}
</style>
