<template>
  <div class="page-header">
    <div class="page-header__left-panel">
      <router-link v-if="backRoute" :to="backRoute">
        <Icon name="mdi:arrow-left" width="24" height="24" />
      </router-link>
      <span class="page-header__title">
        {{ title }}
      </span>
    </div>

    <div class="page-header__right-panel">
      <slot name="right-panel"></slot>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
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
  components: {
    Icon,
  },
};
</script>

<style lang="postcss" scoped>
.page-header {
  @apply flex flex-row justify-between items-center;
  @apply bg-white px-[12px] py-[20px];
  @apply text-xl text-primary font-bold;
  box-shadow: 0px 4px 12px rgba(41, 68, 37, 0.12);
  &__left-panel {
    @apply flex flex-row items-center;
    @apply gap-[16px];
  }
}
</style>