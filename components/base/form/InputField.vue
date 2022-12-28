<template>
  <div class="input">
    <label :name="name" class="input__label">
      <slot name="label"></slot>
    </label>
    <div class="input__input-container">
      <input
        :id="name"
        :type="showPassword ? 'text' : type"
        :placeholder="placeholder"
        class="input-container__input"
        :class="type === 'password' || $slots.icon ? 'has-icon' : null"
        :disabled="disabled"
      />
      <div class="input-container__icon">
        <slot name="icon"></slot>
        <Icon
          name="mdi:eye-outline"
          v-if="type === 'password' && !showPassword"
          @click="showPassword = !showPassword"
        />
        <Icon
          name="mdi:eye-off-outline"
          v-if="type === 'password' && showPassword"
          @click="showPassword = !showPassword"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: null,
    },
    name: {
      type: [String, Number],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    Icon,
  },
  setup(props) {
    const showPassword = ref(false);

    return {
      showPassword,
    };
  },
};
</script>

<style lang="postcss" scoped>
.input {
  @apply flex flex-col gap-[4px];
  &__input-container {
    @apply relative;
    .input-container__input {
      @apply border border-slate-400 rounded-md;
      @apply py-[6px] px-[12px];
      @apply outline-none;
      &.has-icon {
        @apply pl-[12px] pr-[28px];
      }
      &:focus {
        @apply border-primary;
        box-shadow: 0px 0px 8px 0px #d1e3cb;
      }
    }
    .input-container__icon {
      @apply cursor-pointer;
      @apply absolute right-[10px] top-[6px];
    }
  }
  &__label {
    @apply text-[1rem] font-medium;
    @apply ml-[10px];
  }
}
</style>