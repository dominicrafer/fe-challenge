<template>
  <div class="textarea">
    <label class="textarea__label" :for="name" resize>{{ label }}</label>
    <textarea class="textarea__input" :id="name"></textarea>
  </div>
</template>

<script>
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
  },
  setup(props) {},
};
</script>

<style lang="postcss" scoped>
.textarea {
  @apply flex flex-col gap-[4px];
  &__label {
    @apply text-primary text-[1rem] font-medium;
  }
  &__input {
    @apply py-[6px] px-[12px];
    @apply border border-slate-400 rounded-md;
    @apply outline-none resize;

    &:hover {
      @apply border-primary;
      box-shadow: 0px 0px 8px 0px #d1e3cb;
    }
  }
}
</style>