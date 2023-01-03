<template>
  <div class="header">
    <div class="cursor-pointer header__sidebar-button" @click="$emit('collapse-sidebar')">
      <Icon name="mdi:menu" width="20" height="20"/>
      Hide Menu
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Header",
      required: true,
    },
  },
};
</script>

<style lang="postcss" scoped>
.header {
  @apply px-[12px] py-[20px] bg-white w-full text-sm text-primary border-b border-baking-soda;
  box-shadow: 0px 4px 12px rgba(41, 68, 37, 0.12);
  &__sidebar-button {
    @apply flex flex-row items-center gap-[4px];
  }
}
</style>