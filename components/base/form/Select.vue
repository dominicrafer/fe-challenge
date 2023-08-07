<template>
  <q-select
    outlined
    v-bind="$attrs"
    :name="name"
    :error="errors?.length ? true : undefined"
    :error-message="errorMessage"
    no-error-icon
    label-slot
    :multiple="multiple"
    :modelValue="selected"
    :loading="loading"
  >
    <template #label>
      <span class="text-paprika">*</span>
      <slot name="label" v-if="$slots.label"></slot>
      {{ label }}
    </template>
  </q-select>
</template>

<script>
import { useField } from "vee-validate";
export default {
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    vLabel: {
      type: String,
    },
    modelValue: {
      type: [Object, String, Number, Array],
      default: [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const {
      errors,
      errorMessage,
      meta,
      value: selected,
      handleChange,
    } = useField(props.name, props.rules, {
      initialValue: props.modelValue,
      label: props.vLabel ? props.vLabel : props.name,
    });

    watch(
      meta,
      (meta) => {
        emit("update:isDirty", meta.dirty);
      },
      { deep: true }
    );
    return {
      errors,
      errorMessage,
      meta,
      selected,
    };
  },
};
</script>
