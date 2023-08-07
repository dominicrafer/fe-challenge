<template>
  <q-btn v-bind="$attrs" class="button" :color="color"></q-btn>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    }
  }
};
</script>

<style lang="postcss" scoped>
.button {
  @apply px-2 py-2 text-[12px];
}
</style>
