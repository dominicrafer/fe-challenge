<template>
  <div class="section-title">
    <span :class="`${fontSize} ${fontWeight} ${fontColor}`">
      {{ title }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  fontSize: {
    type: String,
    default: "text-xl",
  },
  fontWeight: {
    type: String,
    default: "font-bold",
  },
  fontColor: {
    type: String,
    default: "text-white",
  },
});
</script>

<style lang="postcss" scoped>
.section-title {
  @apply bg-primary text-white p-4;
}
</style>
