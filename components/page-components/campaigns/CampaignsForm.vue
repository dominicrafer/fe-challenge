<template>
  <Form>
    <div class="campaigns">
      <Container :loading="isLoading" padding="p-[16px]">
        <div class="campaigns__form">
          <SectionTitle title="Campaign Details" />
          <InputField
            name="campign-title"
            placeholder="Enter Text"
            rules="alpha"
          >
            <template #label> Title </template>
          </InputField>
          <InputField
            name="campaign-code"
            placeholder="Enter Text"
            rules="alpha"
          >
            <template #label> Campaign Code </template>
          </InputField>
          <Textarea
            name="campaign-description"
            label="Description"
            placeholder="Enter Text"
            rules="digits:3"
          />
          <SectionTitle title="Campaign Settings" />
          <div class="form__col">
            <Select
              name="campaign-discount-access"
              placeholder="Select discount access"
              rules="alpha"
              searchable
            >
              <template #label> Discount Access </template>
            </Select>
            <Select
              name="campaign-channels"
              placeholder="Select Channels"
              rules="alpha"
              multiple
            >
              <template #label> Available Channels </template>
            </Select>
          </div>
          <div class="form__col">
            <Select
              name="campaign-discount-type"
              placeholder="Select discount type"
              rules="alpha"
            >
              <template #label> Discount Type </template>
            </Select>
            <InputField
              name="campaign-discount-value"
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