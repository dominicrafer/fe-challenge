<template>
  <div class="page-header">
    <div class="page-header__left-panel">
      <div class="left-panel__tabs" v-if="$slots['left-panel']">
        <slot name="left-panel"></slot>
      </div>
      <router-link v-if="backRoute && !$slots['left-panel']" :to="backRoute">
        <Icon name="mdi:arrow-left" width="24" height="24" />
      </router-link>
      <span class="page-header__title" v-if="!$slots['left-panel']">
        {{ title }}
      </span>
    </div>

    <div class="page-header__right-panel">
      <slot name="right-panel"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    backRoute: {
      type: [String, Object],
      default: null,
    },
  },
};
</script>

<style lang="postcss" scoped>
.page-header {
  @apply flex flex-row justify-between items-center;
  @apply bg-white px-5 py-[10px];
  @apply text-[1.5rem] text-primary font-bold;
  box-shadow: 0 2px 6px rgb(41 68 37 / 10%);
  &__left-panel {
    @apply flex flex-row items-center;
    @apply gap-[16px];
  }
}
</style>