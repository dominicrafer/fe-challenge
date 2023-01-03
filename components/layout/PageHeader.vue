<template>
  <div class="page-header">
    <span class="page-header__title">
      {{ title }}
    </span>
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
  },
};
</script>

<style lang="postcss" scoped>
.page-header {
  @apply bg-white px-[12px] py-[20px];
  @apply text-xl text-primary font-bold;
  box-shadow: 0px 4px 12px rgba(41, 68, 37, 0.12);
}
</style>