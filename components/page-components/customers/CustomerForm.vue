<template>
  <div class="customer">
    <Container
      :loading="isLoading"
      :key="isLoading"
      padding="p-0"
      width="w-1/2"
    >
      <VForm
        @submit="onSubmit"
        v-slot="{ isSubmitting }"
        :initialValues="customerDetails"
      >
        <SectionTitle title="Customer Details" class="rounded-t-sm" />
        <div class="customer__form">
          <InputField
            class="w-1/2"
            name="name"
            placeholder="Enter name"
            v-model="formData.name"
            v-model:isDirty="dirtyFieldValidator.name"
            :rules="edit ? null : 'required'"
          >
            <template #label> Customer Name </template>
          </InputField>
          <Textarea
            name="address"
            label="Customer Address"
            placeholder="Enter address"
            v-model="formData.address"
            v-model:isDirty="dirtyFieldValidator.address"
            :rules="edit ? null : 'required'"
          />
          <div class="col__auto">
            <InputField
              class="w-full"
              name="tin"
              placeholder="Enter tin"
              v-model="formData.tin"
              v-model:isDirty="dirtyFieldValidator.tin"
              :rules="
                edit
                  ? null
                  : {
                      required: true,
                      numeric: true,
                    }
              "
            >
              <template #label> TIN </template>
            </InputField>
            <InputField
              class="w-full"
              name="contact_name"
              placeholder="Enter Contact Name"
              v-model="formData.contact_name"
              v-model:isDirty="dirtyFieldValidator.contact_name"
              :rules="edit ? null : 'required'"
            >
              <template #label> Contact Name </template>
            </InputField>
          </div>
          <div class="col__auto">
            <InputField
              class="w-full"
              name="contact_phone_number"
              placeholder="Enter contact phone number"
              v-model="formData.contact_phone_number"
              v-model:isDirty="dirtyFieldValidator.contact_phone_number"
              :rules="edit ? null : 'required'"
            >
              <template #label> Contact Phone Number </template>
            </InputField>
            <InputField
              class="w-full"
              name="contact_email"
              placeholder="Enter contact email"
              v-model="formData.contact_email"
              v-model:isDirty="dirtyFieldValidator.contact_email"
              :rules="edit ? null : 'required'"
            >
              <template #label> Contact Email </template>
            </InputField>
          </div>
        </div>
        <div class="customer__footer">
          <Button variant="success" type="submit" :loading="isSubmitting"
            >Save</Button
          >
        </div>
      </VForm>
    </Container>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    customerDetails: {
      type: Object,
      default() {
        return {
          name: null,
          tin: null,
          address: null,
          contact_name: null,
          contact_phone_number: null,
          contact_email: null,
        };
      },
    },
    edit: {
      type: Boolean,
      default: false,
    },
    submitHandler: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { $_, $toast } = useNuxtApp();
    const formData = reactive(props.customerDetails);

    const dirtyFieldValidator = reactive({
      name: false,
      tin: false,
      address: false,
      contact_name: false,
      contact_phone_number: false,
      contact_email: false,
    });

    async function onSubmit(values) {
      if (props.edit) {
        let payload = {};

        $_.forEach(dirtyFieldValidator, (isDirty, key) => {
          if (isDirty) {
            payload[key] = values[key];
          }
        });
        await props.submitHandler(payload);
      } else {
        await props.submitHandler(values);
      }
    }

    return {
      formData,
      dirtyFieldValidator,
      onSubmit,
    };
  },
};
</script>

<style lang="postcss" scoped>
.customer {
  @apply flex justify-center;

  &__form {
    @apply flex flex-col gap-[24px] px-4 pt-4 pb-10;

    .col__fixed {
      @apply grid grid-cols-2 gap-[12px];
    }

    .col__auto {
      @apply flex flex-row gap-5 items-end;
    }
  }

  &__footer {
    @apply flex flex-col items-end px-4 pb-4;
  }
}
</style>
