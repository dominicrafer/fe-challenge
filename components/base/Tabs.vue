<template>
  <div class="tabs">
    <div
      class="tabs__option"
      v-for="(tab, index) in tabs"
      :key="index"
      :class="tab.label == active || tab.value == active ? 'active' : null"
      @click="$emit('changeTab', tab?.value || tab?.label)"
    >
      <span class="option__label" :class="tab.label == active || tab.value == active ? 'active' : null">
        {{ tab.label }}
      </span>
      <span
        class="option__counter"
        v-if="tab.counter !== 'undefined'"
        :class="tab.label == active || tab.value == active ? 'active' : null"
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
  @apply flex flex-row items-center bg-[#f3f4f6];
  &__option {
    @apply text-center whitespace-nowrap uppercase;
    @apply cursor-pointer;
    @apply px-5 py-3;
    &.active {
      @apply bg-white;
    }
    .option__label {
      @apply text-sm font-semibold text-gray-400;
      &.active {
        @apply text-primary font-bold !important;
      }
    }
  }
}
</style>