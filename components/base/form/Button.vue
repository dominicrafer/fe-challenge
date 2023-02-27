<template>
  <button class="button" :type="type" :class="`${variant} ${radius}`" :disabled="loading">
    <div v-if="$slots['icon-start']">
      <slot name="icon-start"></slot>
    </div>
    <div class="flex flex-col items-center" v-if="showLoading && loading">
      <Spinner size="w-8 h-8" reverse />
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
      default: 'rounded-md'
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showLoading: {
      type: Boolean,
      default: false,
    }
  },
  setup(props) { },
};
</script>

<style lang="postcss" scoped>
.button {
  @apply flex flex-row gap-2 items-center font-normal text-center;
  @apply py-[8px] px-[10px] w-full;
  @apply text-[0.875rem] border border-transparent whitespace-nowrap;
  transition: all ease-in 0.1s;

  &:hover {
    /* @apply opacity-75; */
    filter: brightness(110%);
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
    @apply bg-slate-400 text-white;
  }

  &.success {
    @apply bg-green-500 text-white;
  }

  &.danger {
    @apply bg-red-400 text-white;
  }

  &.warning {
    @apply bg-yellow-400 text-white;
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