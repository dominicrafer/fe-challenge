<template>
  <div class="select">
    <div class="select__label-height-placeholder" v-if="$slots.label"></div>

    <label
      class="select__label"
      ref="label"
      @click="$refs[name].activate()"
      :class="
        !floatingLabel
          ? 'float'
          : ($_.isArray(selected) ? selected?.length : selected) ||
            $refs[name]?.search ||
            showOptions
          ? 'float'
          : null
      "
      v-if="$slots.label"
    >
      <span
        class="text-paprika"
        v-if="
          showRequiredIcon &&
          ($_.includes(rules, 'select_required') ||
            $_.has(rules, 'select_required'))
        "
        >*</span
      >
      <slot name="label"></slot>
    </label>
    <multiselect
      :id="name"
      :class="{ 'has-error': errors.length }"
      :ref="name"
      :options="options"
      v-model="selected"
      @open="showOptions = true"
      @close="
        () => {
          showOptions = false;
          meta.touched = true;
          $emit('close', selected);
        }
      "
      :label="label"
      :track-by="trackBy"
      :close-on-select="closeOnSelect"
      :hide-selected="hideSelected"
      :searchable="searchable"
      :multiple="multiple"
      :show-labels="false"
      @select="select"
      @tag="addTag"
      :taggable="taggable"
      :placeholder="
        !floatingLabel
          ? placeholder
          : ($_.isArray(selected) ? selected?.length : selected) ||
            $refs.name?.search ||
            showOptions
          ? placeholder
          : null
      "
      :tag-placeholder="tagPlaceholder"
      @search-change="asyncSearch"
      :open-direction="openDirection"
      :loading="isLoading || isLoadingState"
      :disabled="disabled"
    >
      <template v-slot:selection="{ values, search, isOpen }">
        <slot :values="values" :search="search" :isOpen="isOpen"></slot>
      </template>
    </multiselect>
    <div class="select__instructions" v-if="$slots.instructions">
      <slot name="instructions" />
    </div>
    <div class="select__error error" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
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
      default: undefined,
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
    floatingLabel: {
      type: Boolean,
      default: true,
    },
    vLabel: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const { $_ } = useNuxtApp();
    const {
      errors,
      errorMessage,
      meta,
      value: selected,
      handleChange,
    } = useField(props.name, props.rules, {
      initialValue: props.modelValue,
      label: props.vLabel ? props.vLabel : props.name,
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

    function select(value) {
      emit('update:modelValue', value)
      emit("select", value);
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
    Multiselect,
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
