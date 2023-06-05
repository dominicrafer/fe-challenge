<template>
  <Transition appear name="fade">
    <div class="modal" v-if="show">
      <div class="modal__content" :style="{ width: `${width}px` }" ref="modal">
        <div class="modal__header">
          {{ title }}
          <Icon
            name="mdi:close-circle-outline"
            width="24"
            height="24"
            color="white"
            class="cursor-pointer"
            @click="$emit('close')"
          />
        </div>
        <div :class="`modal__body`">
          <div class="body__loader" v-if="loading">
            <Spinner :spinnerSize="spinnerSize" />
            Loading, please wait...
          </div>
          <slot v-else></slot>
        </div>
        <div class="modal__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { onClickOutside } from "@vueuse/core";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: "450",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { attrs, slots, emit, expose }) {
    const modal = ref(null);

    onClickOutside(modal, () => {
      if (props.maskClosable) {
        emit("close");
      }
    });

    return { modal };
  },
};
</script>

<style lang="postcss" scoped>
.modal {
  @apply fixed h-screen w-screen;
  @apply flex items-center justify-center;
  @apply top-0 left-0 z-[101];
  background: rgba(30, 28, 28, 0.88);

  &__content {
    @apply absolute flex flex-col;
    @apply bg-white;
    @apply rounded-md;
    @apply min-w-[320px];
    @apply min-h-[320px];
    @media (max-width: 768px) {
      @apply w-full !important;
      /* @apply min-w-fit; */
    }
    .modal__header {
      @apply flex flex-row items-center justify-between;
      @apply border-b border-baking-soda bg-primary rounded-t-md;
      @apply font-bold text-white text-lg;
      @apply px-[16px] py-[12px];
      @apply flex-grow-0;
      .modal__close-button {
        @apply cursor-pointer;
      }
    }
    .modal__body {
      z-index: 1;
      @apply flex-grow;
      @apply max-h-[80vh] p-4;
      @apply w-full h-full;
      @apply overflow-y-auto;
      @apply text-sm text-currant relative;
      .body__loader {
        @apply flex flex-col items-center justify-center;
        @apply text-sm font-bold text-primary;
        @apply sticky;
        @apply gap-[10px] mt-4;
        /* top: 50%; */
      }
    }
    .modal__footer {
      @apply flex-grow-0;
      @apply border-t border-baking-soda;
      @apply flex flex-row justify-end items-center;
      @apply p-[16px] rounded-b-xl;
      gap: 12px;
      background: #f8f8f8;
    }
  }
}
</style>
