<template>
  <div class="input">
    <label :name="name" class="input__label">
      <slot name="label"></slot>
    </label>
    <div class="input__input-container">
      <Field
        v-slot="{ meta, field }"
        :rules="rules"
        @input="updateValue"
        :value="modelValue"
        :name="name"
      >
        <input
          v-bind="field"
          class="input-container__input"
          :placeholder="placeholder"
          :id="name"
          :name="name"
          :type="showPassword ? 'text' : type"
          :class="`${type === 'password' || $slots.icon ? 'has-icon' : null} ${!meta.valid ? 'has-error' : null}`"
          :disabled="disabled"
        />
      </Field>
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
    <ErrorMessage :name="name" v-slot="{ message }">
      <div class="input__error">
        {{ message }}
      </div>
    </ErrorMessage>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
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
      default: "required",
    },
  },
  components: {
    Icon,
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
  @apply flex flex-col gap-[4px];
  &__input-container {
    @apply relative;
    .input-container__input {
      @apply border border-slate-400 rounded-md;
      @apply py-[6px] px-[12px];
      @apply outline-none;
      &.has-error {
        @apply border-paprika;
      }
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
  &__error {
    @apply text-paprika;
  }
}
</style>