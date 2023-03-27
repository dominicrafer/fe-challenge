<template>
  <div class="partners__sort-drawer">
    <Drawer title="Sort By" :show="show" @close="$emit('close')">
      <span>Sort</span>
    </Drawer>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="postcss" scoped>
</style>