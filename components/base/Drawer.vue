<template>
  <div class="drawer">
    <Transition appear name="fade">
      <div class="drawer__overlay" v-if="show">
        <div class="drawer__overlay-background"></div>
      </div>
    </Transition>
    <Transition appear :name="`slide-${position}`">
      <div
        class="drawer__content"
        ref="drawer"
        :class="position === 'right' ? 'right-0' : 'left-0'"
        :style="{ width: `${width}px` }"
        v-if="show"
      >
        <div class="content__header">
          <span class="header__title">{{ title }}</span>
          <Icon
            name="mdi:close-circle-outline"
            width="24"
            color="white"
            height="24"
            @click="$emit('close')"
          />
        </div>
        <div class="content__body">
          <slot></slot>
        </div>
        <div class="content__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { onClickOutside } from "@vueuse/core";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: "right",
    },
    title: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: "450",
    },
  },
  setup(props, { attrs, slots, emit, expose }) {
    const drawer = ref(null);
    onClickOutside(drawer, () => emit("close"));

    return { drawer };
  },
};
</script>

<style lang="postcss" scoped>
.drawer {
  &__content {
    @apply bg-white z-50 fixed top-0 h-screen;
    @apply flex flex-col items-stretch;
    .content__header {
      @apply p-[12px] border-b border-baking-soda;
      @apply flex flex-row justify-between items-center;
      @apply flex-grow-0 bg-primary;
      .header__title {
        @apply text-lg font-bold text-white;
      }
      svg {
        @apply cursor-pointer;
      }
    }
    .content__body {
      @apply flex-grow;
    }
    .content__footer {
      @apply flex-grow-0;
      @apply p-[12px] border-t border-baking-soda;
    }
  }
  &__overlay {
    @apply fixed;
    @apply w-screen h-screen top-0 left-0;
    @apply z-40;
    background: rgba(30, 28, 28, 0.88);
  }
}
</style>