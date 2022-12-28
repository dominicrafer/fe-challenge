<template>
  <div class="radio-button">
    <input type="radio" class="radio-button__input" :id="name" />
    <label :for="name" class="radio-button__label">{{ label }}</label>
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
.radio-button {
  @apply flex flex-row items-center gap-[5px];
  &__input {
    @apply accent-primary text-lg w-[18px] h-[18px] rounded-lg;
  }
  &__label {
    @apply text-[1rem] text-primary font-medium;
  }
}
</style>