<template>
  <q-page-sticky expand position="top" class="z-[100]">
    <q-toolbar class="page-header">
      <router-link v-if="backRoute && !$slots['left-panel']" :to="backRoute">
        <Icon name="mdi:arrow-left" width="24" height="24" />
      </router-link>
      <span class="page-header__title" v-if="!$slots['left-panel']">
        {{ title }}
      </span>
      <slot name="left-panel"></slot>
      <q-space />
      <slot name="right-panel"></slot>
    </q-toolbar>
  </q-page-sticky>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  backRoute: {
    type: [String, Object],
    default: null,
  },
});
</script>

<style lang="postcss" scoped>
.page-header {
  @apply flex flex-row justify-between items-center gap-2 z-[100];
  @apply bg-white px-5 py-[10px];
  @apply text-[1.5rem] text-primary font-bold;
  box-shadow: 0 2px 6px rgb(41 68 37 / 10%);
}
</style>
