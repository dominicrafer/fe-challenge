<template>
  <q-select
    outlined
    v-bind="$attrs"
    v-model="selected"
    :name="name"
    :error="errors?.length ? true : undefined"
    :error-message="errorMessage"
    no-error-icon
    label-slot
    :multiple="multiple"
    :loading="loading"
  >
    <template #label>
      <span class="text-paprika">*</span>
      <slot name="label" v-if="$slots.label"></slot>
      {{ label }}
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
const props = defineProps({
  name: {
    type: String,
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
  rules: {
    type: [String, Object],
  },
});
const emit = defineEmits(["update:isDirty", "update:modelValue"]);
const {
  errors,
  errorMessage,
  meta,
  value: selected,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
  label: props.vLabel ? props.vLabel : props.name,
});
watch(selected, (val) => {
  emit("update:modelValue", val);
});
watch(
  meta,
  (meta) => {
    emit("update:isDirty", meta.dirty);
  },
  { deep: true }
);
</script>
