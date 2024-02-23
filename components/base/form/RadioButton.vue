<!-- @ts-ignore -->
<template>
  <q-radio
    v-bind="$attrs"
    v-model="value"
    :val="inputValue"
    @update:model-value="(e: any) => $emit('change', e)"
    :label="label"
    size="md"
  />
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  id: {
    type: [String, Number],
    required: true,
  },
  inputValue: {
    type: [String, Number],
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Object, Boolean, Number],
  },
});
const emit = defineEmits(["update:isDirty", "change"]);
const { value, meta }: any = useField(props.name, undefined, {
  type: "radio",
  initialValue: props.modelValue,
  label: props.label ? props.label : props.name,
});

watch(
  meta,
  (meta) => {
    emit("update:isDirty", meta.dirty);
  },
  { deep: true }
);
</script>
