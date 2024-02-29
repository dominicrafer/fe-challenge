<template>
  <q-badge :color="color" v-bind="$attrs" class="p-2 uppercase rounded-full">
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
