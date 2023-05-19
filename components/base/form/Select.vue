<template>
  <div class="select">
    <q-select
      v-model="selected"
      :options="options"
      :error="errors.length ? true : undefined"
      :error-message="errorMessage"
      :label="label"
    >
      <template #label v-if="$slots.label">
        <slot name="label"></slot>
      </template>
    </q-select>
  </div>
</template>

<script>
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { useField } from "vee-validate";
export default {
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
    rules: {
      type: [String, Object],
    },
    modelValue: {
      type: [Object, String, Number, Array],
      default: [],
    },
    placeholder: {
      type: String,
      default: "Select option",
    },
    options: {
      type: Array,
      default: ["123", "ABC", "123ABC"],
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    taggable: {
      type: Boolean,
      default: false,
    },
    tagPlaceholder: {
      type: String,
      default: "Create tag",
    },
    trackBy: {
      type: String,
    },
    label: {
      type: String,
    },
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    hideSelected: {
      type: Boolean,
      default: false,
    },
    openDirection: {
      type: String,
      default: null,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showRequiredIcon: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const { $_ } = useNuxtApp();
    console.log("props.modelValue", props.modelValue);
    const {
      errors,
      errorMessage,
      meta,
      value: selected,
    } = useField(props.name, props.rules, {
      initialValue: props.modelValue,
    });
    const showOptions = ref(false);
    const isLoadingState = ref(props.isLoading);
    function addTag(value) {
      emit("addTag", { label: value, value: $_.toLower(value) });
    }
    let debounce = null;
    function asyncSearch(value) {
      isLoadingState.value = true;
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        emit("asyncSearch", value);
        isLoadingState.value = false;
      }, 1000);
    }

    function select() {
      emit("update:modelValue", selected.value);
    }
    watch(
      () => props.isLoading,
      (loading) => {
        isLoadingState.value = loading;
      }
    );
    watch(
      meta,
      (meta) => {
        emit("update:isDirty", meta.dirty);
      },
      { deep: true }
    );
    return {
      errors,
      errorMessage,
      meta,
      selected,
      addTag,
      asyncSearch,
      select,
      showOptions,
      isLoadingState,
    };
  },
  components: {
    VueMultiselect,
  },
};
</script>

<style lang="postcss" scoped>
.select {
  @apply inline-flex flex-col gap-[4px] relative;
  &__label-height-placeholder {
    @apply h-[20px] w-full;
  }

  &__label {
    @apply text-[0.875rem] font-medium absolute top-[30px] left-[10px] z-10 text-gray-400;
    transition: 0.2s ease top;

    &.float {
      @apply left-[10px] top-[0px] text-primary !important;
      @apply z-0;
    }
  }

  &__error {
    @apply text-paprika text-[0.75rem] ml-[10px];
  }
  &__instructions {
    @apply text-gray-400 ml-[10px] text-xs;
    line-height: 4px;
  }
}
</style>
