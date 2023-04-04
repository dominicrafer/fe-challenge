<template>
  <div class="invoice">
    <Container
      :loading="isLoading"
      :key="isLoading"
      padding="p-0"
      width="w-[1000px]"
    >
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
        :key="fetchBusinessDetails"
        padding="p-0"
        width="w-[1000px]"
      >
        <div class="invoice__form">
          <div class="form__details col__auto">
            <div class="details_left_panel">
              <div>
                <img
                  width="200"
                  src="https://d1cheirdp8wubm.cloudfront.net/ecv-production/photos/page/652736830639822040f01c.middle.png?v01"
                />
              </div>
              <div class="business_information">
                <div>
                  {{ formData.business.name }}
                </div>
                <div>TIN No. {{ formData.business.tin }}</div>
                <div>{{ formData.business.address }}</div>
              </div>
              <div class="flex flex-col justify-between mt-5">
                <div class="col__auto">
                  <p>CONTACT:</p>
                  <p>{{ formData.business.business_contact_name }}</p>
                </div>
                <div class="col__auto">
                  <p>EMAIL:</p>
                  <p>{{ formData.business.business_contact_email }}</p>
                </div>
                <div class="col__auto">
                  <p>CONTACT NO:</p>
                  <p>{{ formData.business.business_contact_phone_number }}</p>
                </div>
              </div>
            </div>
            <div class="details_right_panel">
              <div class="panel_header">
                <span>INVOICE</span>
              </div>
              <div class="panel_content col__auto">
                <p class="left_panel">INVOICE NO:</p>
                <p class="right_panel">INVOICE</p>
              </div>
              <div class="panel_content col__auto">
                <p class="left_panel">INVOICE DATE:</p>
                <p class="right_panel">INVOICE</p>
              </div>
              <div class="panel_content col__auto">
                <p class="left_panel">DUE DATE:</p>
                <p class="right_panel">INVOICE</p>
              </div>
              <div class="panel_content col__auto">
                <p class="left_panel">P.O NO/Quote NO:</p>
                <p class="right_panel">INVOICE INVOICE</p>
              </div>
            </div>
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
          project: null,
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
          bank: null,
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

    .form__details {
      .details_left_panel {
        @apply flex flex-col;
        @apply w-8/12;
      }
      .details_right_panel {
        @apply w-4/12;
        @apply flex flex-col;
        .panel_header {
          @apply w-full p-2;
          @apply font-normal text-5xl text-center;
          @apply border-b;
          @apply mb-2;
        }

        .panel_content {
          @apply border-b;
          @apply mb-2;
          .left_panel {
            @apply w-8/12;
          }

          .right_panel {
            @apply w-4/12;
          }
        }
      }
    }
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
