<template>
  <div class="select">
    <div class="select__label-height-placeholder" v-if="$slots.label"></div>
    <label
      :name="name"
      class="select__label"
      ref="label"
      :class="
        selected || selected?.length || $refs.name?.search || showOptions
          ? 'float'
          : 'null'
      "
    >
      <slot name="label"></slot>
    </label>
    <VueMultiselect
      :ref="name"
      :key="options.length"
      :options="options"
      v-model="selected"
      @open="showOptions = true"
      @close="
        () => {
          showOptions = false;
          meta.touched = true;
        }
      "
      :label="label"
      :track-by="trackBy"
      :close-on-select="closeOnSelect"
      :hide-selected="hideSelected"
      :searchable="searchable"
      :multiple="multiple"
      @tag="addTag"
      :taggable="taggable"
      :placeholder="null"
      :tag-placeholder="tagPlaceholder"
      @search-change="asyncSearch"
      open-direction="bottom"
    >
      <!-- <slots name="drop-down"></slots> -->
    </VueMultiselect>
    <div class="select__error" v-if="errorMessage">
      {{ errorMessage }}
    </div>
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
      type: String,
    },
    modelValue: {
      type: [Object, String, Number, Array, null],
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
  },
  setup(props, { emit }) {
    const { $_ } = useNuxtApp();
    const {
      errorMessage,
      meta,
      value: selected,
    } = useField(props.name, props.rules, {
      initialValue: props.modelValue,
    });
    const showOptions = ref(false);

    function addTag(value) {
      emit("addTag", { label: value, value: $_.toLower(value) });
    }
    function asyncSearch(value) {
      emit("asyncSearch", value);
    }
    watch(
      meta,
      (meta) => {
        emit("update:isDirty", meta.dirty);
      },
      { deep: true }
    );
    return {
      errorMessage,
      meta,
      selected,
      addTag,
      asyncSearch,
      showOptions,
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
    @apply text-[0.875rem] font-medium absolute top-[30px] left-[10px] z-[51] text-gray-400;
    transition: 0.2s ease top;

    &.float {
      @apply left-[10px] top-[0px] text-primary !important;
    }
  }

  &__error {
    @apply text-paprika text-[0.75rem];
  }
}
</style>
