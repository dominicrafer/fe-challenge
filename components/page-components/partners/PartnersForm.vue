<template>
  <Form>
    <div class="partners">
      <Container :loading="isLoading" padding="p-[16px]">
        <div class="partners__form">
          <SectionTitle title="Partner Details" />
          <InputField
            name="default-input"
            placeholder="Enter Text"
            rules="alpha"
          >
            <template #label> Partner Name </template>
          </InputField>
          <Textarea
            name="default-textarea"
            label="Description"
            placeholder="Enter Text"
            rules="digits:3"
          />
          <SectionTitle title="Partner Settings" />
          <div class="form__col">
            <InputField
              name="default-input"
              placeholder="Enter Text"
              rules="alpha"
            >
              <template #label> Miles To Points </template>
            </InputField>
            <InputField
              name="default-input"
              placeholder="Enter Text"
              rules="alpha"
            >
              <template #label> Points To Miles </template>
            </InputField>
          </div>
          <div class="form__col">
            <InputField
              name="default-input"
              placeholder="Enter Text"
              rules="alpha"
            >
              <template #label> Maximum Miles To Points </template>
            </InputField>
            <InputField
              name="default-input"
              placeholder="Enter text"
              rules="alpha"
            >
              <template #label> Maximum Points To Miles </template>
            </InputField>
          </div>
          <div class="form__col">
            <InputField
              name="default-input"
              placeholder="Enter text"
              rules="alpha"
            >
              <template #label> Maximum Daily Conversion </template>
            </InputField>
            <InputField
              name="default-input"
              placeholder="Enter text"
              rules="alpha"
            >
              <template #label>Cost Per Mile </template>
            </InputField>
          </div>
          <SectionTitle title="Partner Contract Duration" />
          <div class="form__col">
            <DatePicker
              name="campaign-start-date"
              enableTimePicker
              rules="required"
            >
              <template #label> Starts At </template>
            </DatePicker>
            <DatePicker
              name="campaign-end-date"
              enableTimePicker
              rules="required"
            >
              <template #label> Ends At </template>
            </DatePicker>
          </div>
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
.partners {
  @apply flex justify-center;
  &__form {
    @apply flex flex-col gap-[24px];
  }

  .form__col {
    @apply grid grid-cols-2 gap-[10px];
  }
}
</style>