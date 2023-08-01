<template>
  <Dialog :title="title">
    <slot name="message" />
    <q-card-actions
      align="right"
      class="mt-8 pt-2 pb-0 px-0 border-t border-gray-200"
    >
      <q-btn
        flat
        label="Cancel"
        color="secondary"
        @click="$emit('close')"
        v-close-popup
      />
      <q-btn label="Confirm" color="warning" @click="$emit('confirm')" />
    </q-card-actions>
  </Dialog>
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
    type: {
      type: String,
      default: "default",
    },
    confirmText: {
      type: String,
      default: "Confirm",
    },
  },
  setup(props, { attrs, slots, emit, expose }) {
    const modal = ref(null);
    onClickOutside(modal, () => emit("close"));

    return { modal };
  },
};
</script>

<style lang="postcss" scoped>
.modal {
  @apply fixed h-screen w-screen;
  @apply flex items-center justify-center;
  @apply top-0 left-0 z-[60];
  background: rgba(30, 28, 28, 0.88);

  &__content {
    @apply absolute flex flex-col;
    @apply bg-white;
    @apply rounded-md;
    /* @apply min-w-[220px];
    @apply min-h-[220px]; */
    .modal__header {
      @apply flex flex-row items-center justify-between;
      @apply border-b border-baking-soda  rounded-t-md;
      @apply font-bold text-white text-lg;
      @apply px-[16px] py-[12px] flex-grow-0;
      .modal__close-button {
        @apply cursor-pointer;
      }
      &.default {
        @apply bg-primary;
      }
      &.danger {
        @apply bg-paprika;
      }
      &.warning {
        @apply bg-yellow-500;
      }
    }
    .modal__body {
      z-index: 1;
      @apply max-h-[80vh] p-4 flex-grow;
      @apply w-full h-full;
      @apply overflow-y-auto;
      @apply text-sm;
      &.default {
        @apply text-currant;
      }
      &.danger {
        @apply font-semibold;
        @apply text-paprika;
      }
    }
    .modal__footer {
      @apply border-t border-baking-soda;
      @apply flex flex-row justify-end items-center;
      @apply p-3 rounded-b-xl;
      gap: 12px;
      background: #f8f8f8;
      button {
        @apply w-auto;
      }
    }
  }
}
</style>
