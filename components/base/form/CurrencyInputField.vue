<template>
  <q-field
    filled
    v-model="value"
    :label="label"
    :error="errors.length ? true : undefined"
    :error-message="errorMessage"
  >
    <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
      <money3
        class="q-field__input text-left"
        :model-value="modelValue"
        @update:model-value="emitValue"
        v-bind="{
          ...options,
          ...$attrs,
        }"
      />
    </template>
  </q-field>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  options: {
    type: Object,
    default() {
      return {
        decimal: ".",
        thousands: ",",
        prefix: "",
        suffix: "",
        precision: 2,
        focusOnRight: false,
        min: null,
        max: null,
      };
    },
  },
  name: {
    type: String,
    required: true,
  },
  rules: {
    type: [String, Object],
  },
});
const emit = defineEmits(["update:isDirty"]);
const { errorMessage, meta, errors, value } = useField(
  props.name,
  props.rules,
  {
    bails: false,
    initialValue: props.modelValue,
    label: props.label ? props.label : props.name,
  }
);
watch(
  meta,
  (meta) => {
    emit("update:isDirty", meta.dirty);
  },
  { deep: true }
);
</script>
