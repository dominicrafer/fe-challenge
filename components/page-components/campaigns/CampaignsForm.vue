<template>
  <div class="campaigns">
    <Container class="campagins__card-form" title="Campaign Details">
      <Form>
        <div>
          <div class="component__samples">
            <InputField
              name="default-input"
              placeholder="Enter Text"
              rules="alpha"
            >
              <template #label> Text Input </template>
            </InputField>
          </div>
        </div>
      </Form>
    </Container>
  </div>
</template>

<script>
import { Form } from "vee-validate";
definePageMeta({
  layout: "default",
});
export default {
  setup() {},
  components: {
    Form,
  },
};
</script>

<style lang="postcss" scoped>
.campaigns {
  @apply flex flex-row justify-center;
  @apply w-full;
  gap: 40px;
  &__card-form {
    @apply flex flex-col;
  }
}
</style>