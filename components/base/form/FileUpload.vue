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
    <div class="file-upload__input-label" @click="selectFile">
      <Icon
        name="material-symbols:attach-file"
        width="24"
        height="24"
      />
      <span class="file-upload__input" > Select File </span>
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

    function confirmFileSelection(e) {
      emit("select", e);
    }
    return {
      file,
      selectFile,
      confirmFileSelection,
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
}
</style>