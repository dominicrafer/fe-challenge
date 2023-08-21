<template>
  <q-radio v-bind="$attrs" v-model="value" :val="inputValue" @update:model-value="(e) => $emit('change', e)" :label="label"
    size="md" />
</template>

<script>
import { useField } from "vee-validate";
export default {
  props: {
    label: {
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
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Object, Boolean, Number],
    },
  },
  setup(props, { emit }) {
    const { value, meta } = useField(props.name, undefined, {
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
    return { value };
  },
};
</script>
