<template>
  <div class="bank">
    <Container
      :loading="isLoading"
      :key="isLoading"
      padding="p-0"
      width="w-1/2"
    >
      <VForm
        @submit="onSubmit"
        v-slot="{ isSubmitting }"
        :initialValues="banksDetails"
      >
        <SectionTitle title="Bank Details" class="rounded-t-sm" />
        <div class="bank__form">
          <div class="col__auto">
            <InputField
              class="w-full"
              name="account_number"
              placeholder="Enter account number"
              v-model="formData.account_number"
              v-model:isDirty="dirtyFieldValidator.account_number"
              :rules="edit ? {
                numeric: true
              } : {
                required: true,
                numeric: true
              }"
            >
              <template #label> Account Number </template>
            </InputField>
            <InputField
              class="w-full"
              name="beneficiary_bank"
              placeholder="Enter beneficiary bank"
              v-model="formData.beneficiary_bank"
              v-model:isDirty="dirtyFieldValidator.beneficiary_bank"
              :rules="edit ? null : 'required'"
            >
              <template #label> Beneficiary Bank </template>
            </InputField>
          </div>
          <div class="col__auto">
            <InputField
              class="w-full"
              name="account_name"
              placeholder="Enter account name"
              v-model="formData.account_name"
              v-model:isDirty="dirtyFieldValidator.account_name"
              :rules="edit ? null : 'required'"
            >
              <template #label> Account Name </template>
            </InputField>
            <InputField
              class="w-full"
              name="swift_code"
              placeholder="Enter swift code"
              v-model="formData.swift_code"
              v-model:isDirty="dirtyFieldValidator.swift_code"
              :rules="edit ? null : 'required'"
            >
              <template #label> Swift Code </template>
            </InputField>
          </div>
          <InputField
              class="w-1/2"
              name="currency"
              placeholder="Enter currency"
              v-model="formData.currency"
              v-model:isDirty="dirtyFieldValidator.currency"
              :rules="edit ? null : 'required'"
            >
              <template #label> Currency </template>
          </InputField>
        </div>
        <div class="bank__footer">
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
    banksDetails: {
      type: Object,
      default() {
        return {
          account_number: null,
          beneficiary_bank: null,
          account_name: null,
          swift_code: null,
          currency: null
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
    const {  $_, $toast } = useNuxtApp();
    const formData = reactive(props.banksDetails);

    const dirtyFieldValidator = reactive({
      account_number: false,
      beneficiary_bank: false,
      account_name: false,
      swift_code: false,
      currency: false,
    });

    async function onSubmit(values) {
      console.log(values)
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
.bank {
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
