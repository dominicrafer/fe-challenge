<template>
  <q-radio v-model="value" :val="inputValue" @update:model-value="(e) => $emit('change', e)" :label="label"
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

<style lang="postcss" scoped>
.radio-button {
  @apply flex flex-row items-center gap-[5px];

  &__input {
    @apply accent-primary text-lg w-[18px] h-[18px] rounded-lg;
  }

  &__label {
    @apply text-[1rem] text-primary font-medium;
  }
}
</style>
