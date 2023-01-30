<template>
  <Form>
    <div class="login">
      <Container>
        <div class="login-content">
          <div class="login-content__header">
            <span>LOGO HERE</span>
          </div>
          <div class="login-content__body">
            <InputField
              name="default-input"
              placeholder="Enter email"
              rules="alpha"
            >
              <template #label> Email </template>
            </InputField>
            <InputField
              name="default-input"
              placeholder="Enter password"
              :type="`password`"
              rules="alpha"
            >
              <template #label> Password </template>
            </InputField>
          </div>
          <div class="login-content__footer">
            <Button> Login </Button>
          </div>
        </div>
      </Container>
    </div>
  </Form>
</template>

<script>
import { Form } from "vee-validate";
definePageMeta({
  layout: "login",
});
export default {
  setup() {},
  components: {
    Form,
  },
};
</script>

<style lang="postcss" scoped>
.login {
  @apply w-[65%];
  .login-content {
    @apply px-4 py-8;
    &__header {
    }
    &__body {
      @apply flex flex-col;
      @apply mt-5;
      @apply gap-3;
    }
    &__footer {
      @apply flex justify-end;
      @apply mt-5;
    }
  }
}

@media screen and (max-width: 1440px) {
  .login {
    @apply w-[100%]
  }
}
</style>