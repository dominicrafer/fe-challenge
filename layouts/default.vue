<template>
  <div class="default">
    <Sidebar />
    <div class="default__content">
      <Header />
      <div class="flex-grow">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="postcss" scoped>
.default {
  @apply w-[100vw] h-[100vh];
  @apply flex flex-row;
  @apply overflow-hidden;

  &__content {
    @apply w-full h-full flex flex-col;
  }
}
</style>