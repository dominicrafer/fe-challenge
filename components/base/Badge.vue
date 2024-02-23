<template>
  <q-badge :color="color" v-bind="$attrs" class="p-2 uppercase">
    <slot />
  </q-badge>
</template>

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: "primary",
  },
});
</script>
