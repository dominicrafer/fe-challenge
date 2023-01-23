<template>
  <div class="tabs">
    <div
      class="tabs__option"
      v-for="(tab, index) in tabs"
      :key="index"
      :class="index == active ? 'active' : null"
      @click="$emit('changeTab', index)"
    >
      <span class="option__label" :class="index == active ? 'active' : null">
        {{ tab.label }}
      </span>
      <span
        class="option__counter"
        v-if="tab.counter !== 'undefined'"
        :class="index == active ? 'active' : null"
      >
        {{ tab.counter }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: [],
    },
    active: {
      type: [String, Number],
      default: 0,
    },
  },
  setup(props) {},
};
</script>

<style lang="postcss" scoped>
.tabs {
  @apply flex flex-row items-center;
  &__option {
    @apply text-center whitespace-nowrap;
    @apply cursor-pointer;
    @apply px-2;
    &.active {
      @apply border-b-2 border-primary;
    }
  }
  .option__label {
    @apply text-sm font-semibold;
    color: rgba(65, 60, 60, 0.7);
    &.active {
      @apply font-bold text-currant;
    }
  }
}
</style>