<template>
  <div class="select">
    <label :name="name" class="select__label">
      <slot name="label"></slot>
    </label>
    <Field
      v-slot="{ meta, field }"
      :value="modelValue"
      :rules="rules"
      :name="name"
    >
      <VueMultiselect
        v-bind="field"
        v-model="selected"
        :options="options"
        :placeholder="placeholder"
        :searchable="searchable"
        :multiple="multiple"
        :taggable="taggable"
        :tag-placeholder="tagPlaceholder"
        @search-change="$emit('asyncSearch')"
        :class="!meta.valid ? `has-error` : null"
      >
        <slots name="drop-down"></slots>
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
      type: [Object, String, Number],
      default: null,
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
  },
  setup(props) {
    const selected = ref(props.modelValue);

    return {
      selected,
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
  @apply flex flex-col gap-[4px];
  &__label {
    @apply text-[1rem] font-medium;
    @apply ml-[10px];
  }
  &__error {
    @apply text-paprika;
  }
}
</style>