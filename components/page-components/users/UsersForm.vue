<template>
  <Form>
    <div class="users">
      <Container :loading="isLoading" padding="p-0" width="xl:w-1/2 w-full">
        <SectionTitle title="User Details" class="rounded-t-sm" />
        <div class="users__form">
          <InputField
            name="name"
            placeholder="Enter Text"
            rules="alpha"
            v-model="formData.name"
          >
            <template #label> Name </template>
          </InputField>
          <div class="form__col">
            <InputField
              name="email"
              placeholder="Enter Text"
              rules="alpha"
              v-model="formData.email"
            >
              <template #label> Email </template>
            </InputField>
            <InputField
              name="mobile-numer"
              placeholder="Enter Text"
              rules="alpha"
              v-model="formData.mobile"
            >
              <template #label> Mobile Number </template>
            </InputField>
          </div>
          <Select
            name="role"
            placeholder="Select role"
            rules="alpha"
            v-model="formData.role"
            class="w-1/2"
          >
            <template #label> Role </template>
          </Select>
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
  setup(props) {
    const formData = {
      name: null,
      email: null,
      mobile: null,
      role: null,
    };
    return {
      formData,
    };
  },
  components: {
    Form,
  },
};
</script>

<style lang="postcss" scoped>
.users {
  @apply flex justify-center;

  &__form {
    @apply flex flex-col gap-[24px] px-4 pt-4 pb-10;
  }

  .form__col {
    @apply grid grid-cols-2 gap-[12px];
  }

  .col__button {
    @apply mt-[28px];
  }
}
</style>
