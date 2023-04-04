<template>
  <div class="invoice">
    <Container :loading="isLoading" padding="p-0" width="w-[800px]">
      <div class="p-5">
        <Select
          class="w-full"
          v-model="selectedProject"
          name="project"
          :options="projectOptions"
          trackBy="value"
          label="label"
          searchable
          :closeOnSelect="true"
          :hideSelected="true"
          openDirection="bottom"
          :isLoading="fetchProjectOptions"
          @asyncSearch="searchProject"
        >
          <template #label> Select Project </template>
        </Select>
      </div>
    </Container>
    <VForm
      @submit="onSubmit"
      v-slot="{ isSubmitting }"
      :initialValues="invoiceDetails"
      class="invoice"
    >
      <Container
        :loading="fetchBusinessDetails"
        padding="p-0"
        width="w-[800px]"
      >
        <SectionTitle title="Business Details" class="rounded-t-sm" />
        <div class="invoice__form">
          <Select
            v-model="selectedBusiness"
            name="business"
            :options="businessOptions"
            trackBy="value"
            label="label"
            searchable
            :hideSelected="true"
            :closeOnSelect="true"
            openDirection="bottom"
            :rules="edit ? null : 'required'"
            disabled
          >
            <template #label> Business </template>
          </Select>
          <InputField
            name="business_tin"
            placeholder="Enter tin"
            v-model="formData.business.tin"
            v-model:isDirty="dirtyFieldValidator.business"
            :rules="{
              numeric: true,
              required: edit ? false : true,
              max: 9,
            }"
            :disabled="formData.business.name == null"
          >
            <template #label> TIN </template>
          </InputField>
          <Textarea
            name="business_address"
            label="Address"
            placeholder="Enter address"
            v-model="formData.business.address"
            v-model:isDirty="dirtyFieldValidator.address"
            :rules="edit ? null : 'required'"
            :disabled="formData.business.name == null"
          />
          <Select
            class="w-full"
            v-model="selectedBusinessUser"
            name="business_contact_name"
            :options="businessUserOptions"
            trackBy="value"
            label="label"
            searchable
            :closeOnSelect="true"
            :hideSelected="true"
            openDirection="bottom"
            :isLoading="fetchBusinessUserOptions"
            @asyncSearch="searchBusinessUser"
          >
            <template #label> Business Contact Person </template>
          </Select>
          <div class="col__auto">
            <InputField
              class="w-full"
              name="business_contact_email"
              v-model="formData.business.business_contact_email"
              disabled
            >
              <template #label> Business Contact Email </template>
            </InputField>
            <InputField
              class="w-full"
              name="business_contact_phone_number"
              v-model="formData.business.business_contact_phone_number"
              disabled
            >
              <template #label> Business Contact Phone Number </template>
            </InputField>
          </div>
        </div>
      </Container>
      <Container
        :loading="fetchCustomerDetails"
        padding="p-0"
        width="w-[800px]"
      >
        <SectionTitle title="Customer Details" class="rounded-t-sm" />
        <div class="invoice__form">
          <Select
            v-model="selectedCustomer"
            name="customer"
            :options="customerOptions"
            trackBy="value"
            label="label"
            searchable
            :hideSelected="true"
            :closeOnSelect="true"
            openDirection="bottom"
            :rules="edit ? null : 'required'"
            disabled
          >
            <template #label> Customer </template>
          </Select>
          <InputField
            name="customer_tin"
            placeholder="Enter tin"
            v-model="formData.customer.tin"
            v-model:isDirty="dirtyFieldValidator.customer"
            :rules="{
              numeric: true,
              required: edit ? false : true,
              max: 9,
            }"
            :disabled="formData.customer.name == null"
          >
            <template #label> TIN </template>
          </InputField>
          <Textarea
            name="customer_address"
            label="Address"
            placeholder="Enter address"
            v-model="formData.customer.address"
            v-model:isDirty="dirtyFieldValidator.address"
            :rules="edit ? null : 'required'"
            :disabled="formData.customer.name == null"
          />
          <InputField
            name="customer_contact_name"
            placeholder="Enter customer contact name"
            v-model="formData.customer.customer_contact_name"
            v-model:isDirty="dirtyFieldValidator.customer"
            :rules="edit ? null : 'required'"
            :disabled="formData.customer.name == null"
          >
            <template #label> Customer Contact Person </template>
          </InputField>
          <div class="col__auto">
            <InputField
              class="w-full"
              name="customer_contact_email"
              v-model="formData.customer.customer_contact_email"
              :rules="
                edit
                  ? {
                      email: true,
                    }
                  : {
                      email: true,
                      required: true,
                    }
              "
              :disabled="formData.customer.name == null"
            >
              <template #label> Customer Contact Email </template>
            </InputField>
            <InputField
              class="w-full"
              name="customer_contact_phone_number"
              v-model="formData.customer.customer_contact_phone_number"
              :rules="
                edit
                  ? {
                      phone_number: true,
                    }
                  : {
                      phone_number: true,
                      required: true,
                    }
              "
              :disabled="formData.customer.name == null"
            >
              <template #label> Customer Contact Phone Number </template>
            </InputField>
          </div>
        </div>
      </Container>
      <Container :loading="fetchBankDetails" padding="p-0" width="w-[800px]">
        <SectionTitle title="Bank Details" class="rounded-t-sm" />
        <div class="invoice__form">
          <Select
            v-model="selectedBank"
            name="bank"
            :options="bankOptions"
            trackBy="value"
            label="label"
            searchable
            :hideSelected="true"
            :closeOnSelect="true"
            openDirection="bottom"
            :rules="edit ? null : 'required'"
            :disabled="formData.bank.account_number == null"
          >
            <template #label> Beneficiary Bank </template>
          </Select>
          <div class="col__auto">
            <InputField
              class="w-full"
              name="swift_code"
              v-model="formData.bank.swift_code"
              :rules="edit ? null : 'required'"
              :disabled="formData.bank.account_number == null"
            >
              <template #label> Swift Code </template>
            </InputField>
            <InputField
              class="w-full"
              name="account_name"
              v-model="formData.bank.account_name"
              :rules="edit ? null : 'required'"
              :disabled="formData.bank.account_number == null"
            >
              <template #label> Account Name </template>
            </InputField>
          </div>
        </div>
      </Container>
    </VForm>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    invoiceDetails: {
      type: Object,
      default() {
        return {
          business: {
            name: null,
            address: null,
            services: [],
            approval_heirarchy: [],
            due_date_duration: null,
            follow_up_intervals: null,
            invoice_number_template: null,
            tax: null,
            tin: null,
            business_contact_name: null,
            business_contact_email: null,
            business_contact_phone_number: null,
            business_contact_uuid: null,
          },
          bank: {
            account_number: null,
            account_number: null,
            account_name: null,
            swift_code: null,
            currency: null,
          },
          customer: {
            name: null,
            tin: null,
            address: null,
            customer_contact_name: null,
            customer_contact_email: null,
            customer_contact_phone_number: null,
          },
          line_items: null,
          invoice_date: null,
          invoice_amount: null,
          status: null,
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
    const { $api, $_ } = useNuxtApp();
    const formData = reactive(props.invoiceDetails);

    // PROJECT DETAILS
    const selectedProject = ref(null);
    const dirtyFieldValidator = reactive({
      project: false,
      business: false,
      bank: false,
      customer: false,
      line_items: false,
      invoice_date: false,
      invoice_amount: false,
      status: false,
    });

    let projectOptions = reactive([]);
    const fetchProjectOptions = ref(false);

    async function searchProject(value) {
      if (value.length > 2) {
        fetchProjectOptions.value = true;
        const { data } = await $api.projects.searchProjects({
          like_value: value,
        });
        projectOptions.splice(0);
        $_.forEach(data.value.resource, (item) => {
          projectOptions.push({
            label: `${item["name"]} - ${item["customer_name"]}`,
            value: item,
          });
        });
        fetchProjectOptions.value = false;
      }
    }

    // BUSINESS DETAILS
    const fetchBusinessDetails = ref(false);
    const selectedBusiness = ref(null);
    let businessOptions = reactive([]);

    const fetchBusinessUserOptions = ref(false);
    const selectedBusinessUser = ref(null);
    let businessUserOptions = reactive([]);

    async function getBusinessOptions() {
      const { data } = await $api.businesses.getBusinesses({}, []);
      businessOptions.splice(0);
      $_.forEach(data.value.resource.businesses, (item) => {
        businessOptions.push({
          label: item["business"],
          value: item["business"],
        });
      });
    }

    async function getBusinessData(business) {
      const { data } = await $api.businesses.getBusinessDetails(business, {
        business: null,
        address: null,
        services: [],
        approval_heirarchy: [],
        due_date_duration: null,
        follow_up_intervals: null,
        invoice_number_template: null,
        tax: null,
        tin: null,
      });
      let details = data.value.resource?.business;

      selectedBusiness.value = {
        label: details?.business,
        value: details?.business,
      };
      formData.business = {
        ...formData.business,
        ...details,
        name: details?.business,
      };
    }

    async function getBusinessUserData(cognito_id) {
      if (cognito_id === undefined) {
        return true;
      }
      const { data } = await $api.users.getUserDetails(cognito_id);
      let details = data.value.resource;
      selectedBusinessUser.value = {
        label: details?.name,
        value: details?.cognito_id,
      };

      formData.business = {
        ...formData.business,
        business_contact_uuid: details?.cognito_id,
        business_contact_name: details?.name,
        business_contact_email: details?.email,
        business_contact_phone_number: details?.phone_number,
      };
    }

    async function searchBusinessUser(value) {
      if (value.length > 3) {
        fetchBusinessUserOptions.value = true;
        const { data } = await $api.users.searchUsers({
          like_value: value,
        });

        businessUserOptions.splice(0);

        $_.forEach(data.value.resource, (item) => {
          businessUserOptions.push({
            label: item["name"],
            value: item["cognito_id"],
          });
        });

        fetchBusinessUserOptions.value = false;
      }
    }

    async function setBusinessFormData(business_name, cognito_id) {
      fetchBusinessDetails.value = true;
      await Promise.all([
        getBusinessData(business_name),
        getBusinessUserData(cognito_id),
      ]);
      fetchBusinessDetails.value = false;
    }

    // BANK DETAILS

    const fetchBankDetails = ref(false);
    const selectedBank = ref(null);
    let bankOptions = reactive([]);

    async function getBankOptions() {
      const { data } = await $api.banks.getBanks({}, []);
      bankOptions.splice(0);
      $_.forEach(data.value.resource.banks, (item) => {
        bankOptions.push({
          label: `${item["beneficiary_bank"]} - ${item["account_number"]}`,
          value: item["account_number"],
        });
      });
    }

    async function setBankFormData(account_number) {
      fetchBankDetails.value = true;
      const { data } = await $api.banks.getBankDetails(account_number, {
        beneficiary_bank: null,
        account_number: null,
        account_name: null,
        swift_code: null,
        currency: null,
      });
      let details = data.value.resource?.bank;

      selectedBank.value = {
        label: `${details?.beneficiary_bank} - ${details?.account_number}`,
        value: details?.account_number,
      };
      formData.bank = {
        ...formData.bank,
        ...details,
      };
      fetchBankDetails.value = false;
    }

    // CUSTOMER DETAILS

    const fetchCustomerDetails = ref(false);
    const selectedCustomer = ref(null);
    let customerOptions = reactive([]);

    async function setCustomerFormData(customer_id) {
      fetchCustomerDetails.value = true;
      const { data } = await $api.customers.getCustomerDetails(customer_id, {
        name: null,
        tin: null,
        address: null,
        contact_name: null,
        contact_phone_number: null,
        contact_email: null,
      });

      let details = data.value.resource;

      selectedCustomer.value = {
        label: details?.name,
        value: details?.id,
      };

      formData.customer = {
        ...formData.customer,
        name: details?.name,
        tin: details?.tin,
        address: details?.address,
        customer_contact_name: details?.contact_name,
        customer_contact_email: details?.contact_email,
        customer_contact_phone_number: details?.contact_phone_number,
      };

      fetchCustomerDetails.value = false;
    }
    // WATCHERS
    watch(
      selectedProject,
      (result) => {
        getBusinessOptions();
        setBusinessFormData(
          result.value.business_name,
          result.value.account_manager_uuid
        );
        getBankOptions();
        setBankFormData(result.value.bank_account_number);
        setCustomerFormData(result.value.customer_id);
      },
      { deep: true }
    );

    watch(
      selectedBusiness,
      (result) => {
        if (formData.business.name != result.value) {
          setBusinessFormData(result.value);
        }
      },
      { deep: true }
    );

    watch(
      selectedBank,
      (result) => {
        if (formData.bank.account_number != result.value) {
          setBankFormData(result.value);
        }
      },
      { deep: true }
    );

    watch(selectedBusinessUser, (result) => {
      if (formData.business.business_contact_uuid != result.value) {
        getBusinessUserData(result.value);
      }
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
      projectOptions,
      selectedProject,
      fetchProjectOptions,
      searchProject,
      fetchBusinessDetails,
      selectedBusiness,
      businessOptions,
      fetchBusinessUserOptions,
      selectedBusinessUser,
      businessUserOptions,
      searchBusinessUser,
      fetchBankDetails,
      selectedBank,
      bankOptions,
      fetchCustomerDetails,
      customerOptions,
      selectedCustomer,
      onSubmit,
    };
  },
};
</script>

<style lang="postcss" scoped>
.invoice {
  @apply flex flex-col gap-5 justify-center items-center;

  &__form {
    @apply flex flex-col gap-[24px] px-4 pt-4 pb-10;
  }
  .col__fixed {
    @apply grid grid-cols-2 gap-[12px];
  }

  .col__auto {
    @apply flex flex-row gap-5 items-end;
  }

  &__footer {
    @apply flex flex-col items-end px-4 pb-4;
  }
}
</style>
