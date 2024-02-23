<template>
  <div class="file-upload">
    <label class="file-upload__label">
      <span
        class="text-paprika"
        v-if="
          showRequiredIcon &&
          ($_.includes(rules, 'required') || $_.has(rules, 'required'))
        "
        >*
      </span>
      <slot />
    </label>
    <input
      type="file"
      :name="name"
      hidden
      :accept="accept"
      ref="file"
      @change="confirmFileSelection"
    />
    <div
      class="file-upload__image-container"
      v-if="imageDisplay"
      :class="{ 'has-error': errors.length }"
    >
      <Icon
        @click="removeImage"
        name="material-symbols:close"
        width="20"
        height="20"
        color="white"
        class="image-container__close"
      />
      <img :src="imageDisplay" alt="" class="image-container__image" />
    </div>
    <div
      class="file-upload__input-label"
      @click="selectFile"
      :class="{ 'has-error': errors.length }"
      v-else
    >
      <Icon name="material-symbols:attach-file" width="24" height="24" />
      <span class="file-upload__input"> Select File </span>
    </div>
    <div class="file-upload__error" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
const props = defineProps({
  modelValue: {
    type: File,
  },
  label: {
    type: String,
  },
  accept: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  rules: {
    type: [String, Object],
  },
  showRequiredIcon: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["select", "unselect"]);
const file = ref<Ref | null>(null);
const { errors, errorMessage, handleChange } = useField(
  props.name,
  props.rules,
  {
    bails: false,
    initialValue: props.modelValue,
    label: props.label,
  }
);
function selectFile() {
  if (file.value) {
    file.value.click();
  }
}

let imageDisplay = ref<string | null>(null);
function confirmFileSelection(e: Event | any) {
  if (e) {
    handleChange(e?.target?.files[0]);
    emit("select", e);
    imageDisplay.value = URL.createObjectURL(e.target.files[0]);
  }
}

function removeImage() {
  imageDisplay.value = null;
  handleChange(null);
  emit("unselect");
}
</script>

<style lang="postcss" scoped>
.file-upload {
  @apply flex flex-col gap-2 pl-[10px];
  &__label {
    @apply text-primary font-medium text-[0.875rem];
  }
  &__input-label {
    @apply flex items-center gap-1;
    @apply border border-blue-400 rounded-md p-2;
    @apply text-sm underline font-semibold text-blue-400 cursor-pointer;
    &.has-error {
      @apply border-paprika;
    }
  }
  &__image-container {
    @apply relative bg-gray-300 min-h-[100px] flex flex-col items-center;
    .image-container__close {
      @apply cursor-pointer absolute bg-gray-500 rounded-full right-[8px] top-[8px];
    }
    .image-container__image {
      @apply m-auto;
    }
  }
  &__error {
    @apply text-paprika;
    @apply text-[0.75rem] ml-[10px];
  }
}
</style>
