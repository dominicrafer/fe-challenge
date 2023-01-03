<template>
  <div class="sidebar" :class="collapsed ? 'collapsed' : 'open'">
    <div class="sidebar__header">
      Title
    </div>
    <div class="sidebar__content">
      
    </div>
    <div class="sidebar__footer">

    </div>
  </div>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style lang="postcss" scoped>
.sidebar {
  @apply w-[350px] bg-primary h-screen;
  transition: all 0.3s ease;
  &__header {
    @apply px-[12px] py-[19px] text-white font-bold text-lg;
    @apply border-b border-b-gray-500;
  }
  &.collapsed {
    @apply w-[60px];
  }
}

</style>