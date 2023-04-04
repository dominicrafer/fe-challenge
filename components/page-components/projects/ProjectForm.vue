<template>
  <div class="project">
    <Container
      :loading="isLoading"
      :key="isLoading"
      padding="p-0"
      width="w-1/2"
    >
      <VForm
        @submit="onSubmit"
        v-slot="{ isSubmitting }"
        :initialValues="projectDetails"
      >
        <SectionTitle title="Project Details" class="rounded-t-sm" />
        <div class="project__form">
          <InputField
            class="w-full"
            name="name"
            placeholder="Enter name"
            v-model="formData.name"
            v-model:isDirty="dirtyFieldValidator.name"
            :rules="edit ? null : 'required'"
          >
            <template #label> Project Name </template>
          </InputField>
          <Select
            class="w-full"
            v-model="formData.customer"
            v-model:isDirty="dirtyFieldValidator.customer"
            name="customer"
            :options="customerOptions"
            trackBy="value"
            label="label"
            searchable
            :closeOnSelect="true"
            :hideSelected="true"
            openDirection="bottom"
            :isLoading="fetchCustomerOptions"
            @asyncSearch="searchCustomer"
            :rules="edit ? null : 'required'"
          >
            <template #label> Customer </template>
          </Select>
          <Textarea
            name="references"
            label="Project References"
            placeholder="Enter references"
            v-model="formData.references"
            v-model:isDirty="dirtyFieldValidator.references"
            :rules="edit ? null : 'required'"
          />
          <div class="col__auto">
            <Select
              class="w-full"
              v-model="formData.business"
              v-model:isDirty="dirtyFieldValidator.business"
              name="business"
              :options="businessOptions"
              trackBy="value"
              label="label"
              :hideSelected="true"
              openDirection="top"
              :rules="edit ? null : 'required'"
            >
              <template #label> Business </template>
            </Select>
            <Select
              class="w-full"
              v-model="formData.service"
              v-model:isDirty="dirtyFieldValidator.service"
              name="service"
              :options="serviceTypeOptions"
              trackBy="value"
              label="label"
              openDirection="top"
              :isLoading="fetchServiceOptions"
              :rules="edit ? null : 'required'"
            >
              <template #label> Service Type </template>
            </Select>
          </div>
          <div class="col__auto">
            <Select
              class="w-full"
              v-model="formData.account_number"
              v-model:isDirty="dirtyFieldValidator.account_number"
              name="account_number"
              :options="bankOptions"
              trackBy="value"
              label="label"
              openDirection="bottom"
              :rules="edit ? null : 'required'"
            >
              <template #label> Bank </template>
            </Select>
            <Select
              class="w-full"
              v-model="formData.account_manager"
              v-model:isDirty="dirtyFieldValidator.account_manager"
              name="account_manager"
              :options="userOptions"
              trackBy="value"
              label="label"
              searchable
              :closeOnSelect="true"
              :hideSelected="true"
              openDirection="bottom"
              :isLoading="fetchUserOptions"
              @asyncSearch="searchUser"
              :rules="edit ? null : 'required'"
            >
              <template #label> Account Manager </template>
            </Select>
          </div>
        </div>
        <div class="project__footer">
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
    projectDetails: {
      type: Object,
      default() {
        return {
          name: null,
          business: null,
          account_number: null,
          service: null,
          account_manager: null,
          customer: null,
          references: null,
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
    const formData = reactive(props.projectDetails);

    let businessOptions = reactive([]);
    let bankOptions = reactive([]);
    let serviceTypeOptions = reactive([]);
    const fetchServiceOptions = ref(false);
    let userOptions = reactive([]);
    const fetchUserOptions = ref(false);
    let customerOptions = reactive([]);
    const fetchCustomerOptions = ref(false);

    const dirtyFieldValidator = reactive({
      name: false,
      business: false,
      account_number: false,
      service: false,
      account_manager: false,
      customer: false,
      references: false,
    });

    async function getBusinesses() {
      const { data } = await $api.businesses.getBusinesses({}, []);

      $_.forEach(data.value.resource.businesses, (item) => {
        businessOptions.push({
          label: item["business"],
          value: item["business"],
        });
      });
    }

    async function getBanks() {
      const { data } = await $api.banks.getBanks({}, []);

      $_.forEach(data.value.resource.banks, (item) => {
        bankOptions.push({
          label: `${item["beneficiary_bank"]} - ${item["account_number"]}`,
          value: item["account_number"],
        });
      });
    }

    async function getBusinessServices(business) {
      const { data } = await $api.businesses.getBusinessServices(business, []);
      serviceTypeOptions.splice(0);
      $_.forEach(data.value.resource.business_services, (item) => {
        serviceTypeOptions.push({
          label: item["service"],
          value: item["service"],
        });
      });
      fetchServiceOptions.value = false;
    }

    async function searchUser(value) {
      if (value.length > 3) {
        fetchUserOptions.value = true;
        const { data } = await $api.users.searchUsers({
          like_value: value,
        });

        userOptions.splice(0);

        $_.forEach(data.value.resource, (item) => {
          userOptions.push({
            label: item["name"],
            value: {
              name: item["name"],
              cognito_id: item["cognito_id"],
            },
          });
        });

        fetchUserOptions.value = false;
      }
    }

    async function searchCustomer(value) {
      if (value.length > 3) {
        fetchCustomerOptions.value = true;
        const { data } = await $api.customers.searchCustomer({
          like_value: value,
        });

        customerOptions.splice(0);

        $_.forEach(data.value.resource, (item) => {
          customerOptions.push({
            label: item["name"],
            value: {
              id: item["id"],
              name: item["name"],
            },
          });
        });

        fetchCustomerOptions.value = false;
      }
    }

    getBusinesses();
    getBanks();

    watch(
      () => formData.business,
      (result) => {
        fetchServiceOptions.value = true;
        formData.service = null;
        getBusinessServices(result.value);
      }
    );

    async function onSubmit(values) {
      if (props.edit) {
        let payload = {};

        $_.forEach(dirtyFieldValidator, (isDirty, key) => {
          if (isDirty) {
            if (key == "account_manager") {
              payload["account_manager_uuid"] =
                values["account_manager"]["value"]["cognito_id"];
              payload["account_manager_name"] =
                values["account_manager"]["value"]["name"];
            } else if (key == "account_number") {
              payload["bank_account_number"] =
                values["account_number"]["value"];
            } else if (key == "business") {
              payload["business_name"] = values["business"]["value"];
            } else if (key == "customer") {
              payload["customer_id"] = values["customer"]["value"]["id"];
              payload["customer_name"] = values["customer"]["value"]["name"];
            } else if (key == "service_type") {
              payload["service_type"] = values["service"]["value"];
            } else {
              payload[key] = values[key];
            }
          }
        });
        await props.submitHandler(payload);
      } else {
        values["account_manager_uuid"] =
          values["account_manager"]["value"]["cognito_id"];
        values["account_manager_name"] =
          values["account_manager"]["value"]["name"];
        values["bank_account_number"] = values["account_number"]["value"];
        values["business_name"] = values["business"]["value"];
        values["customer_id"] = values["customer"]["value"]["id"];
        values["customer_name"] = values["customer"]["value"]["name"];
        values["service_type"] = values["service"]["value"];

        delete values["account_manager"];
        delete values["account_number"];
        delete values["business"];
        delete values["customer"];
        delete values["service"];

        await props.submitHandler(values);
      }
    }

    return {
      formData,
      dirtyFieldValidator,
      onSubmit,
      businessOptions,
      bankOptions,
      serviceTypeOptions,
      fetchServiceOptions,
      searchUser,
      userOptions,
      fetchUserOptions,
      searchCustomer,
      customerOptions,
      fetchCustomerOptions,
    };
  },
};
</script>

<style lang="postcss" scoped>
.project {
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
