<template>
  <div class="users__filter-drawer">
    <Drawer title="Filter By" :show="show" @close="$emit('close')">
      <span>Filters</span>
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