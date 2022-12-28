<template>
  <button class="button" :type="type" :class="variant">
    <div>
      <slot name="icon-start"></slot>
    </div>
    <slot></slot>
    <div>
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
  },
  setup(props) {},
};
</script>

<style lang="postcss" scoped>
.button {
  @apply flex flex-row gap-[5px] items-center;
  @apply py-[6px] px-[10px] rounded-md;
  @apply text-[1rem];
  transition: all ease-in 150ms;
  &:hover {
    /* @apply opacity-75; */
    filter: brightness(80%);
  }
  &.primary {
    @apply bg-primary text-white;
  }
  &.secondary {
    @apply bg-slate-400 text-white;
  }
  &.success {
    @apply bg-green-500 text-white;
  }
  &.danger {
    @apply bg-red-700 text-white;
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