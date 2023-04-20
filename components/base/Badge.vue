<template>
  <div class="badge" :class="variant">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: "primary",
    },
  },
};
</script>

<style lang="postcss" scoped>
.badge {
  @apply rounded-2xl p-1;
  @apply text-center;
  &.primary {
    @apply text-white bg-primary;
  }
  &.success {
    @apply text-white bg-green-600;
  }
  &.secondary {
    @apply text-white bg-secondary;
  }
}
</style>