<template>
  <div class="textarea">
    <label class="textarea__label" :for="name" resize>{{ label }}</label>
    <textarea
      :name="name"
      :value="modelValue"
      @input="updateValue"
      @blur="meta.touched = true"
      class="textarea__input"
      :placeholder="placeholder"
      :class="!meta.valid && meta.dirty ? 'has-error' : null"
      :id="name"
    ></textarea>
    <div class="textarea__error" v-if="errorMessage">
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
    isDirty: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { errorMessage, meta } = useField(props.name, props.rules, {
      initialValue: props.modelValue,
    });
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
    return { updateValue, errorMessage, meta };
  },
};
</script>

<style lang="postcss" scoped>
.textarea {
  @apply flex flex-col gap-[4px];
  &__label {
    @apply text-primary text-[0.875rem] pl-[10px] font-medium;
  }
  &__input {
    @apply py-[6px] px-[12px] text-[0.875rem];
    @apply border border-gray-200 rounded-md;
    @apply outline-none resize;

    &.has-error {
      @apply border-paprika;
    }
  }
  &__error {
    @apply text-paprika text-[0.75rem];
  }
}
</style>
