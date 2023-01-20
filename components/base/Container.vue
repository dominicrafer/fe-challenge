<template>
  <div class="container" :class="padding">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    padding: {
      type: String,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {},
};
</script>

<style lang="postcss" scoped>
.container {
  @apply min-w-[250px];
  @apply rounded-xl;
  @apply bg-white;
  min-height: 600px;
  box-shadow: 0px 4px 12px rgba(41, 68, 37, 0.12);
}
</style>