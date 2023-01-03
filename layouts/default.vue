<template>
  <div class="default">
    <Sidebar :collapsed="isSidebarCollapsed" />
    <div class="default__content">
      <Header @collapse-sidebar="isSidebarCollapsed = !isSidebarCollapsed" />
      <div class="flex-grow">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const isSidebarCollapsed = ref(false);
    return {
      isSidebarCollapsed,
    };
  },
};
</script>

<style lang="postcss" scoped>
.default {
  @apply w-[100vw] h-[100vh];
  @apply flex flex-row;
  &__content {
    @apply w-full h-full flex flex-col;
  }
}
</style>