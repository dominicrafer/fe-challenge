<template>
  <div class="input">

    <div class="input__input-container">
      <Field v-slot="{ meta, field }" :rules="rules" @input="updateValue" :name="name" :value="modelValue">

        <input v-bind="field" class="input-container__input" :id="name" :name="name" :type="showPassword ? 'text' : type"
          :class="`${type === 'password' || $slots.icon ? 'has-icon' : null} ${!meta.valid ? 'has-error' : null
            } ${!$slots.label ? 'show-placeholder': null}`" :disabled="disabled" :placeholder="placeholder" required />
        <label :name="name" class="input-container__floating-label" v-if="$slots.label">
          <slot name="label"></slot>
        </label>
      </Field>

      <div class="input-container__icon">
        <slot name="icon"></slot>
        <Icon name="mdi:eye-outline" v-if="type === 'password' && !showPassword" @click="showPassword = !showPassword" />
        <Icon name="mdi:eye-off-outline" v-if="type === 'password' && showPassword"
          @click="showPassword = !showPassword" />
      </div>

    </div>
    <ErrorMessage :name="name" v-slot="{ message }">
      <div class="input__error">
        {{ message }}
      </div>
    </ErrorMessage>

  </div>
</template>

<script>
import { Field, ErrorMessage } from "vee-validate";
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
  },
  components: {
    Field,
    ErrorMessage,
  },
  setup(props, { emit }) {
    const showPassword = ref(false);
    const updateValue = (event) => {
      emit("update:modelValue", event.target.value);
    };

    return {
      showPassword,
      updateValue,
    };
  },
};
</script>

<style lang="postcss" scoped>
.input {
  @apply flex flex-col gap-[4px] relative;

  &__input-container {
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


      &:focus~.input-container__floating-label,
      &:not(:focus):valid~.input-container__floating-label,
      &:disabled~.input-container__floating-label,
      &:autofill~.input-container__floating-label {
        @apply text-[0.875rem] left-[10px] top-[-20px] !important;
        opacity: 1;
      }
    &.show-placeholder {
      &::placeholder {
        @apply text-gray-400 !important;
      }
    }
      &:not(:focus),
      &:focus:not(:invalid) {
        &::placeholder {
          color: transparent;
          transition: 0.2s ease all;
        }
      }

    }

    .input-container__icon {
      @apply cursor-pointer;
      @apply absolute right-[10px] top-[4px];
    }

    .input-container__floating-label {
      @apply z-50 absolute pointer-events-none text-primary font-medium;
      @apply left-[10px] top-[5px] text-[0.875rem];
      transition: 0.2s ease all;
    }
  }

  &__error {
    @apply text-paprika;
    @apply text-[0.875rem];
  }
}
</style>