<template>
  <button
    class="button"
    :type="type"
    :class="`${loading ? 'disabled' : variant} ${radius} ${size}`"
    :disabled="loading"
  >
    <div v-if="$slots['icon-start']">
      <slot name="icon-start"></slot>
    </div>
    <div class="flex items-center" v-if="showLoading && loading">
      <Spinner size="w-5 h-5" reverse />
    </div>
    <slot></slot>
    <div v-if="$slots['icon-end']">
      <slot name="icon-end"></slot>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: "primary",
    },
    type: {
      type: String,
      default: "button",
    },
    radius: {
      type: String,
      default: "rounded-md",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showLoading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: null
    }
  },
  setup(props) {},
};
</script>

<style lang="postcss" scoped>
.button {
  @apply flex flex-row gap-2 items-center font-normal text-center;
  @apply py-[8px] px-[10px];
  @apply text-[0.875rem] border border-transparent whitespace-nowrap;
  transition: all ease-in 0.1s;
  &.sm {
    @apply text-[0.75rem] py-[6px] px-[8px];
  }
  &:hover {
    /* @apply opacity-75; */
    filter: brightness(110%);
    &.disabled {
      @apply filter-none cursor-not-allowed;
    }
  }

  &.primary {
    @apply bg-primary text-white;
  }
  &.primary-outline {
    @apply bg-white text-primary border border-primary;
    &:hover {
      @apply bg-primary text-white;
    }
  }

  &.secondary {
    @apply bg-secondary text-white;
  }

  &.secondary-outline {
    @apply bg-white text-secondary border border-secondary;
    &:hover {
      @apply bg-white text-secondary;
    }
  }

  &.success {
    @apply bg-green-600 text-white;
  }

  &.success-outline {
    @apply bg-white text-green-600 border border-green-600;
  }

  &.danger {
    @apply bg-red-500 text-white;
  }

  &.danger-outline {
    @apply bg-white text-paprika border border-paprika;
  }

  &.warning {
    @apply bg-yellow-500 text-white;
  }
  &.warning-outline {
    @apply bg-white text-yellow-500 border border-yellow-500;
  }

  &.disabled {
    @apply bg-baking-soda text-mackerel;
  }

  &.link {
    @apply bg-transparent text-blue-500;

    &:hover {
      filter: brightness(100%);
      @apply underline;
    }
  }
}
</style>
