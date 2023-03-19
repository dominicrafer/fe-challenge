<template>
  <div class="input">
    <div class="input__label-height-placeholder" v-if="$slots.label"></div>
    <div class="input__input-container">
      <input
        :id="name"
        :name="name"
        :value="value"
        :type="showPassword ? 'text' : type"
        :class="`${type === 'password' || $slots.icon ? 'has-icon' : null} ${
          !meta.valid && meta.dirty ? 'has-error' : null
        } ${!$slots.label ? 'show-placeholder' : null}`"
        :disabled="disabled"
        :placeholder="placeholder"
        @blur="meta.touched = true"
        @input="updateValue"
        class="input-container__input"
      />
      <label
        :name="name"
        class="input-container__floating-label"
        :class="modelValue ? 'float' : null"
        v-if="$slots.label"
      >
        <slot name="label"></slot>
      </label>

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
    <div class="input__error" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { useField } from "vee-validate";
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
    },
    rules: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
    isDirty: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { errorMessage, meta, value, handleBlur  } = useField(props.name, props.rules, {
      initialValue: props.modelValue,
    });

    const showPassword = ref(false);
    const updateValue = (event) => {
      emit("update:modelValue", event.target.value);
    };
    watch(
      meta,
      (meta) => {
        emit("update:isDirty", meta.dirty);
      },
      { deep: true }
    );
    return {
      value,
      errorMessage,
      meta,
      showPassword,
      updateValue,
    };
  },
};
</script>

<style lang="postcss" scoped>
.input {
  @apply flex flex-col gap-[4px] relative justify-start;
  &__label-height-placeholder {
    @apply h-[20px] w-full;
  }
  &__input-container {
    @apply relative;

    .input-container__input {
      @apply w-full;
      @apply border-b border-gray-200;
      @apply py-[6px] px-[12px];
      @apply outline-none;
      @apply text-[0.875rem];

      &.has-error {
        @apply border-paprika;
      }

      &.has-icon {
        @apply pl-[12px] pr-[28px];
      }

      /* &:focus ~ .input-container__floating-label,
      &:not(:focus):valid ~ .input-container__floating-label,
      &:disabled ~ .input-container__floating-label,
      &:autofill ~ .input-container__floating-label {
        @apply left-[10px] top-[-25px] text-primary !important;
        opacity: 1;
      } */
      &.show-placeholder {
        &::placeholder {
          @apply text-gray-400 !important;
        }
      }
      &:not(:focus),
      &:focus:not(:invalid) {
        &::placeholder {
          @apply text-transparent;
          transition: 0.2s ease all;
        }
      }
    }

    .input-container__icon {
      @apply cursor-pointer;
      @apply absolute right-[10px] top-[4px];
    }

    .input-container__floating-label {
      @apply z-50 absolute pointer-events-none text-gray-400 font-medium;
      @apply left-[10px] top-[5px] text-[0.875rem];
      transition: 0.2s ease all;
      &.float {
        @apply left-[10px] top-[-25px] text-primary !important;
        opacity: 1;
      }
    }
  }

  &__error {
    @apply text-paprika;
    @apply text-[0.75rem];
  }
}
</style>