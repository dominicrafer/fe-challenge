<template>
  <div class="container" :class="`${padding} ${width} ${height}`">
    <div class="container__loader-body" v-if="loading">
      <div class="loader-body__loader">
        <Spinner :spinnerSize="spinnerSize" />
        {{ loaderMessage }}
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    padding: {
      type: String,
    },
    width: {
      type: String,
      default: "w-full",
    },
    height: {
      type: String,
      default: "h-full",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loaderMessage: {
      type: String,
      default: "Fetching data...",
    },
    spinnerSize: {
      type: String,
      default: "w-12 h-12 border-2",
    },
  },
  setup(props) {},
};
</script>

<style lang="postcss" scoped>
.container {
  @apply relative;
  @apply rounded-xl;
  @apply bg-white;
  @apply h-min;
  box-shadow: 0px 4px 12px rgba(41, 68, 37, 0.12);

  &__loader-body {
    @apply bg-opacity-50 bg-white z-30;
    @apply w-full h-full;
    @apply absolute;
  }

  .loader-body__loader {
    @apply w-full h-full;
    @apply flex flex-col items-center justify-center;
    @apply text-sm font-bold text-primary;
    @apply sticky;
    @apply gap-[10px];
    top: 50%;
  }
}
</style>