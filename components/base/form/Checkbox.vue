<template>
  <div class="checkbox">
    <input type="checkbox" class="checkbox__input" :id="name" />
    <label :for="name" class="checkbox__label">{{ label }}</label>
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
.checkbox {
  @apply flex flex-row items-center gap-[5px];
  &__input {
    @apply accent-primary text-lg w-[18px] h-[18px] rounded-lg;
  }
  &__label {
    @apply text-[1rem] text-primary font-medium;
  }
}
</style>