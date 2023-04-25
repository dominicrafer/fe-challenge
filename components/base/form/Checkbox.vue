<template>
  <div class="checkbox">
    <input
      type="checkbox"
      class="checkbox__input"
      :name="name"
      :id="id"
      :value="inputValue"
      @change="($event) => $emit('onChange', $event)"
      :checked="isChecked"
    />
    <label :for="id" class="checkbox__label">{{ label }}</label>
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
    checked: {
      type: Boolean,
      default: false,
    },
    inputValue: {
      type: [String, Object, Boolean, Number],
    },
    modelValue: {
      type: [String, Object, Boolean, Number, Array],
    },
  },
  setup(props, { emit }) {
    const { $_ } = useNuxtApp();
    console.log(props.modelValue, "props.modelValue");
    const { value, meta } = useField(props.name, undefined, {
      type: "checkbox",
      initialValue: props.modelValue,
    });
    const isChecked = computed(() => {
      if (props.checked) {
        return true;
      }
      if ($_.isArray(props.modelValue)) {
        return $_.includes(props.modelValue, props.inputValue);
      }

      return props.modelValue === props.inputValue;
    });
    watch(
      meta,
      (meta) => {
        emit("update:isDirty", meta.dirty);
      },
      { deep: true }
    );
    return { value, isChecked };
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
