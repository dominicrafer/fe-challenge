<template>
  <q-file v-bind="$attrs" v-model="value" :name="name" :label="label" :error="errors.length ? true : undefined"
    :error-message="errorMessage" :placeholder="placeholder" no-error-icon>

    <template v-slot:prepend>
      <q-icon name="attach_file" />
    </template>
  </q-file>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  inputClass: {
    type: String,
    default: null,
  },
  step: {
    type: String,
    default: "1",
  },
  rules: {
    type: [String, Object],
  },
  modelValue: {
    type: [File, FileList],
  },

  isDirty: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue", "update:isDirty", "change"]);

const { errorMessage, meta, errors, value, handleChange } = useField(
  props.name,
  props.rules,
  {
    bails: false,
    initialValue: props.modelValue,
    label: props.label ? props.label : props.name,
  }
);
watch(value, (val) => {
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
