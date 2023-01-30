<template>
  <Form>
    <div class="role">
      <Container :loading="isLoading" padding="p-[16px]">
        <div class="role__form">
          <SectionTitle title="User Details" />
          <InputField
            name="default-input"
            placeholder="Enter Text"
            rules="alpha"
          >
            <template #label> Name </template>
          </InputField>
          <InputField
            name="default-input"
            placeholder="Enter Text"
            rules="alpha"
          >
            <template #label> Slug </template>
          </InputField>
          <Textarea
            name="default-textarea"
            label="Description"
            placeholder="Enter Text"
            rules="digits:3"
          />
        </div>
      </Container>
    </div>
  </Form>
</template>

<script>
import { Form } from "vee-validate";
definePageMeta({
  layout: "default",
});
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {},
  components: {
    Form,
  },
};
</script>

<style lang="postcss" scoped>
.role {
  @apply flex justify-center;
  &__form {
    @apply flex flex-col gap-[24px];
  }

  .form__col {
    @apply grid grid-cols-2 gap-[10px];
  }

  .col__button {
    @apply mt-[28px];
  }
}
</style>