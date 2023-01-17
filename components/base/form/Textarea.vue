<template>
  <div class="textarea">
    <label class="textarea__label" :for="name" resize>{{ label }}</label>
    <Field
      v-slot="{ field, meta }"
      @input="updateValue"
      :value="modelValue"
      :name="name"
      :rules="rules"
    >
      <textarea
        v-bind="field"
        class="textarea__input"
        :placeholder="placeholder"
        :class="!meta.valid ? 'has-error' : null"
        :id="name"
      ></textarea>
    </Field>
    <ErrorMessage :name="name" v-slot="{ message }">
      <div class="textarea__error">
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
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: null,
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
    const updateValue = (event) => {
      emit("update:modelValue", event.target.value);
    };
    return { updateValue };
  },
};
</script>

<style lang="postcss" scoped>
.textarea {
  @apply flex flex-col gap-[4px];
  &__label {
    @apply text-primary text-[1rem] font-medium;
  }
  &__input {
    @apply py-[6px] px-[12px];
    @apply border border-slate-400 rounded-md;
    @apply outline-none resize;

    &.has-error {
      @apply border-paprika;
    }
    &:hover {
      @apply border-primary;
      box-shadow: 0px 0px 8px 0px #d1e3cb;
    }
  }
  &__error {
    @apply text-paprika;
  }
}
</style>
