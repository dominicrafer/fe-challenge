<template>
  <Form>
    <div class="campaigns">
      <Container padding="p-[16px]">
        <div class="campaigns__form">
          <SectionTitle title="Campaign Details" />
          <InputField
            name="default-input"
            placeholder="Enter Text"
            rules="alpha"
          >
            <template #label> Title </template>
          </InputField>
          <InputField
            name="default-input"
            placeholder="Enter Text"
            rules="alpha"
          >
            <template #label> Campaign Code </template>
          </InputField>
          <Textarea
            name="default-textarea"
            label="Description"
            placeholder="Enter Text"
            rules="digits:3"
          />
          <SectionTitle title="Campaign Settings" />
          <div class="form__col">
            <InputField
              name="default-input"
              placeholder="Temp. Convert to dropdown"
              rules="alpha"
            >
              <template #label> Discount Access </template>
            </InputField>
            <InputField
              name="default-input"
              placeholder="Temp. Convert to dropdown"
              rules="alpha"
            >
              <template #label> Available Channels </template>
            </InputField>
          </div>
          <div class="form__col">
            <InputField
              name="default-input"
              placeholder="Temp. Convert to dropdown"
              rules="alpha"
            >
              <template #label> Discount Type </template>
            </InputField>
            <InputField
              name="default-input"
              placeholder="Enter text"
              rules="alpha"
            >
              <template #label> Discount Value </template>
            </InputField>
          </div>
          <div class="form__col">
            <InputField
              name="default-input"
              placeholder="Enter text"
              rules="alpha"
            >
              <template #label> Maximum Conversion Value </template>
            </InputField>
            <InputField
              name="default-input"
              placeholder="Enter text"
              rules="alpha"
            >
              <template #label>Minimum Miles Redemption </template>
            </InputField>
          </div>
          <div class="form__col">
            <InputField
              name="default-input"
              placeholder="Enter text"
              rules="alpha"
            >
              <template #label> Maximum Customer Redemption </template>
            </InputField>
            <InputField
              name="default-input"
              placeholder="Enter text"
              rules="alpha"
            >
              <template #label>Maximum Global Redemption </template>
            </InputField>
          </div>
          <div class="form__col">
            <InputField
              name="default-input"
              placeholder="Enter text"
              rules="alpha"
            >
              <template #label> Maximum Daily Redemption </template>
            </InputField>
          </div>
          <SectionTitle title="Campaign Duration" />
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
  setup() {},
  components: {
    Form,
  },
};
</script>

<style lang="postcss" scoped>
.campaigns {
  @apply flex justify-center;
  &__form {
    @apply flex flex-col gap-[24px];
  }

  .form__col {
    @apply grid grid-cols-2 gap-[10px];
  }
}
</style>