<template>
  <div class="file-upload">
    <label class="file-upload__label">
      <slot />
    </label>
    <input
      type="file"
      hidden
      :accept="accept"
      ref="file"
      @change="confirmFileSelection"
    />
    <div class="file-upload__image-container" v-if="imageDisplay">
      <Icon
        @click="removeImage"
        name="material-symbols:close"
        width="20"
        height="20"
        color="white"
        class="image-container__close "
      />
      <img :src="imageDisplay" alt="" class="image-container__image" />
    </div>
    <div class="file-upload__input-label" @click="selectFile" v-else>
      <Icon name="material-symbols:attach-file" width="24" height="24" />
      <span class="file-upload__input"> Select File </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    accept: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const file = ref(null);
    
    function selectFile() {
      file.value.click();
    }

    let imageDisplay = ref(null);
    function confirmFileSelection(e) {
      emit("select", e);
      imageDisplay.value = URL.createObjectURL(e.target.files[0])
    }

    function removeImage() {
      imageDisplay.value = null;
      emit("unselect");
    }
    return {
      file,
      selectFile,
      confirmFileSelection,
      removeImage,
      imageDisplay
    };
  },
};
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
  }
  &__image-container {
    @apply relative bg-gray-300 min-h-[100px] flex flex-col items-center;
    .image-container__close {
      @apply cursor-pointer absolute bg-gray-500 rounded-full right-[8px] top-[8px];
    }
    .image-container__image {
      @apply m-auto
    }
  }
}
</style>
