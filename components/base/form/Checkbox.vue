<template>
  <div class="checkbox">
    <q-checkbox
      v-bind="$attrs"
      v-model="value"
      :val="inputValue"
      @update:model-value="(e: any) => $emit('change', e)"
      :label="label"
      size="md"
    />
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  vLabel: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  id: {
    type: [String, Number],
    required: true,
  },
  inputValue: {
    type: [String, Object, Boolean, Number],
  },
  modelValue: {
    type: [String, Object, Boolean, Number],
  },
  rules: {
    type: [String, Object],
  },
});
const emit = defineEmits(["update:isDirty", "change"]);
const { value, meta } = useField(props.name, props.rules, {
  type: "checkbox",
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
</script>

<style lang="postcss" scoped></style>
