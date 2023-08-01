<template>
  <div class="checkbox">
    <q-checkbox v-model="value" :val="inputValue" @update:model-value="(e) => $emit('change', e)" :label="label"
      size="md" />
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
  },
  setup(props, { emit }) {
    const { value, meta } = useField(props.name, undefined, {
      type: "checkbox",
      initialValue: props.modelValue,
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

<style lang="postcss" scoped></style>
