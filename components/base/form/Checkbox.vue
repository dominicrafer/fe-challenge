<template>
  <div class="checkbox">
    <!-- <input
      type="checkbox"
      class="checkbox__input"
      :name="name"
      :id="id"
      :value="inputValue"
      v-model="value"
    /> -->
    <q-checkbox
      v-model="value"
      :val="inputValue"
      @update:model-value="(e) => $emit('change', e)"
      :label="label"
      size="md"
    />
    <!-- v-model="value" -->
    <!-- <label :for="id" class="checkbox__label">{{ label }}</label> -->
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

<style lang="postcss" scoped>
.checkbox {
  @apply flex flex-row items-center gap-[5px];
  &__input {
    @apply accent-primary text-lg w-[18px] h-[18px] rounded-lg;
    &:hover {
      @apply cursor-pointer;
    }
  }
  &__label {
    @apply text-[0.875rem] text-primary font-medium;
    &:hover {
      @apply cursor-pointer;
    }
  }
}
</style>
