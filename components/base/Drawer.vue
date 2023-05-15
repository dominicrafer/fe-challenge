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
        <div class="content__body" :class="bodyCustomClass">
          <div class="body__loader-body" v-if="loading">
            <div class="loader-body__loader">
              <Spinner :spinnerSize="spinnerSize" />
              Loading, please wait...
            </div>
          </div>
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
    maskClosable: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    bodyCustomClass: {
      type: String,
      default: "body-custom-class",
    },
  },
  setup(props, { attrs, slots, emit, expose }) {
    const drawer = ref(null);
    onClickOutside(drawer, () => {
      if (
        props.maskClosable &&
        // Prevent drawer from closing if datepicker menu is open
        !document.getElementsByClassName("dp__menu").length
      ) {
        emit("close");
      }
    });
    return { drawer };
  },
};
</script>

<style lang="postcss" scoped>
.drawer {
  &__content {
    @apply bg-white z-[102] fixed top-0 h-screen;
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
      @apply flex-grow p-4 overflow-auto;
      .body__loader-body {
        @apply bg-opacity-50 bg-white z-[53];
        @apply w-full h-full;
        @apply absolute;
        .loader-body__loader {
          @apply w-full h-full;
          @apply flex flex-col items-center justify-center;
          @apply text-sm font-bold text-primary;
          @apply sticky mb-[53px];
          @apply gap-[10px];
          top: 50%;
        }
      }
    }
    .content__footer {
      @apply flex-grow-0;
      @apply flex gap-3 justify-end;
      @apply p-4 border-t border-baking-soda;
    }
  }
  &__overlay {
    @apply fixed;
    @apply w-screen h-screen top-0 left-0;
    @apply z-[101];
    background: rgba(30, 28, 28, 0.88);
  }
}
</style>
