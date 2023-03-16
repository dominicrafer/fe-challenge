<template>
  <div class="select">
    <div class="select__label-height-placeholder" v-if="$slots.label"></div>
    <label
      :name="name"
      class="select__label"
      ref="label"
      :class="
        selected?.length || multiselect?.search || showOptions ? 'float' : null
      "
    >
      <slot name="label"></slot>
    </label>
    <Field :value="modelValue" :rules="rules" :name="name">
      <VueMultiselect
        ref="multiselect"
        :key="options.length"
        :options="options"
        v-model="selected"
        @open="showOptions = true"
        @close="showOptions = false"
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
        @search-change="$emit('asyncSearch')"
      >
        <!-- <slots name="drop-down"></slots> -->
      </VueMultiselect>
    </Field>
    <ErrorMessage :name="name" v-slot="{ message }">
      <div class="select__error">
        {{ message }}
      </div>
    </ErrorMessage>
  </div>
</template>

<script>
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { Field, ErrorMessage } from "vee-validate";
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
  },
  setup(props, { emit }) {
    const { $_ } = useNuxtApp();
    const multiselect = ref(null);
    const showOptions = ref(false);
    const selected = ref(props.modelValue);

    function addTag(value) {
      console.log("ADD OPTION", { label: value, value: $_.toLower(value) });
      emit("addTag", { label: value, value: $_.toLower(value) });
    }

    return {
      selected,
      multiselect,
      addTag,
      showOptions,
    };
  },
  components: {
    VueMultiselect,
    Field,
    ErrorMessage,
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
    @apply text-paprika;
  }
}
</style>
