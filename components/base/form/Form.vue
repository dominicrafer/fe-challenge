<template>
  <VForm
    :initialValues="initialValues"
    @submit="submitHandler"
    @invalid-submit="onInvalidSubmit"
    v-slot="{ isSubmitting }"
  >
    <slot :isSubmitting="isSubmitting" />
  </VForm>
</template>
<script>
export default {
  props: {
    initialValues: {
      type: Object,
      default: {},
    },
    submitHandler: {
      type: Function,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    function onInvalidSubmit() {
      const firstElement = document.getElementsByClassName("has-error")[0];
      firstElement.scrollIntoView({ behavior: "smooth" });
      firstElement.focus();
    }
    return { onInvalidSubmit };
  },
};
</script>

<style lang="postcss" scoped></style>
