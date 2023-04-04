<template>
  <div class="textarea">
    <label class="textarea__label" :for="name" resize v-if="label">{{ label }}</label>
    <textarea
      :name="name"
      :value="modelValue"
      @input="updateValue"
      @blur="meta.touched = true"
      :rows="rows"
      class="textarea__input"
      :placeholder="placeholder"
      :class="`${!meta.valid && meta.dirty ? 'has-error' : null} ${padding} ${fontSize}`"
      :id="name"
      :disabled="disabled"
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
      type: [String, Object],
    },
    modelValue: {
      type: [String, Number],
    },
    isDirty: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    padding: {
      type: String,
      default: 'py-2 py-4'
    },
    fontSize: {
      type: String,
      default: 'text-[0.875rem]'
    },
    rows: {
      type: [String, Number],
      default: '3'
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
