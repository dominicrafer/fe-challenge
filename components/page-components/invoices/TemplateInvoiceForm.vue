<template>
  <div class="invoice">
    <Container
      :loading="isLoading"
      :key="isLoading"
      padding="p-0"
      class="w-[1000px]"
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

    <Container
      :loading="fetchBusinessDetails"
      padding="p-0"
      class="w-[1000px]"
    >
      <VForm
        @submit="onSubmit"
        v-slot="{ isSubmitting }"
        :initialValues="invoiceDetails"
      >
        <div class="invoice__form">
          <div class="form__header">
            <div class="header__left-section">
              <img src="@/assets/images/ecv.svg" />
              <div class="left-section__company-details">
                <label>Business: </label>
                <Select 
                  class="w-8/12" 
                  name="business" 
                  v-model="selectedBusiness" 
                  :options="businessOptions"       
                  trackBy="value"
                  label="label"
                  openDirection="bottom"
                  disabled
                />
                <label > TIN NO. </label>
                <span>
                  <InputField
                    padding="p-0"
                    fontSize="text-xs"
                    inputWidth="w-8/12"
                    name="business_tin"
                    v-model="formData.business.tin"
                /></span>
                <label>Address: </label>
                <Textarea
                  fontSize="text-xs"
                  class="w-8/12 "
                  padding="px-0"
                  name="business_address"
                  v-model="formData.business.address"
                />
              </div>
              <div class="left-section__contact-details">
                <label> CONTACT:</label>
                <Select 
                  class="w-8/12 text-xs" 
                  name="business_user_name" 
                  v-model="selectedBusinessUser" 
                  :options="businessUserOptions"   
                  searchable
                  @asyncSearch="searchBusinessUser"
                  :isLoading="fetchBusinessUserOptions" 
                  trackBy="value"
                  label="label"
                  openDirection="bottom"
                  hideSelected
                />
                <label> EMAIL:</label>
                <InputField
                  padding="p-0"
                  inputWidth="w-8/12"
                  fontSize="text-xs"
                  name="business_contact_email"
                  v-model="formData.business.business_contact_email" 
                  disabled
                >
                </InputField>
                <label> CONTACT NO.</label>
                <InputField
                  padding="p-0"
                  inputWidth="w-8/12"
                  fontSize="text-xs"
                  name="business_contact_phone_number"
                  v-model="formData.business.business_contact_phone_number" 
                  disabled
                />
              </div>
              <p><strong>BILL TO</strong></p>
              <div class="left-section__billing-details">
                <label> CUSTOMER:</label>
                <Select 
                  class="w-8/12 text-xs" 
                  name="customer_name" 
                  v-model="selectedCustomer" 
                  :options="customerOptions"   
                  searchable
                  trackBy="value"
                  label="label"
                  openDirection="bottom"
                  hideSelected
                  disabled
                />
                <label> ADDRESS:</label>
                <Textarea
                  fontSize="text-xs"
                  class="w-8/12 "
                  padding="py-0"
                  name="customer_address"
                  v-model="formData.customer.address"
                />
                <label> CONTACT</label>
                <InputField
                  padding="p-0"
                  inputWidth="w-8/12"
                  fontSize="text-xs"
                  name="customer_contact_name"
                  v-model="formData.customer.customer_contact_name" 
                />
                <label> EMAIL: </label>
                <InputField
                  padding="p-0"
                  inputWidth="w-8/12"
                  fontSize="text-xs"
                  name="customer_contact_email"
                  v-model="formData.customer.customer_contact_email" 
                />
                <label> CONTACT NO.: </label>
                <InputField
                  padding="p-0"
                  inputWidth="w-8/12"
                  fontSize="text-xs"
                  name="customer_contact_phone_number"
                  v-model="formData.customer.customer_contact_phone_number" 
                />
                <label> TIN: </label>
                <InputField
                  padding="p-0"
                  inputWidth="w-8/12"
                  fontSize="text-xs"
                  name="customer_tin"
                  v-model="formData.customer.tin" 
                />
              </div>
            </div>
            <div class="header__right-section">
              <div class="right-section__header">INVOICE</div>
                <div class="right-section__invoice-details">
                  <label class="w-1/2"> INVOICE NO.: </label>
                  <InputField
                    padding="p-0"
                    fontSize="text-xs"
                    name="business_invoice_number_template"
                    v-model="formData.name" 
                    disabled
                  />
                </div>
                <div class="right-section__invoice-details">
                  <label class="w-1/2"> INVOICE DATE: </label>
                  <DatePicker
                    v-model="formData.invoice_date"
                    name="invoice_date"
                    format="Y/M/d"
                    :timePicker="false"
                    :enableTimePicker="false"
                  />
                </div>
           
                <div class="right-section__invoice-details">
                  <label class="w-1/2"> DUE DATE: </label>
                  <DatePicker
                    v-model="formData.due_date"
                    name="invoice_due_date"
                    format="Y/M/d"
                    :timePicker="false"
                    :enableTimePicker="false"
                    disabled
                  />
                </div>

                <div class="right-section__invoice-details">
                  <label class="w-full"> P.O NO/Quote NO: </label>
                  <Textarea
                    class="w-1/2"
                    fontSize="text-xs"
                    padding="px-1 py-0"
                    name="customer_references"
                    v-model="formData.customer.references"
                  />
                </div>
            </div>
          </div>
          <div class="form__body">
            <div class="body__table-header">
              <strong>DESCRIPTION</strong>
              <strong>AMOUNT</strong>
              <div class="header__actions">
                <Icon
                  width="20"
                  height="20"
                  style="color: #16a34a"
                  name="mdi:plus-circle-outline"
                  @click="invoiceItems.push(1)"
                />
              </div>
            </div>
            <div class="body__table-content">
              <div
                class="table-content__content"
                v-for="(invoiceItemDetails, index) in invoiceItems"
                :key="index"
              >
                <InputField
                  padding="p-0"
                  fontSize="text-xs"
                  class="field w-full"
                  name="account_number"
                  modelValue=""
                >
                </InputField>
                <InputField
                  padding="p-0"
                  fontSize="text-xs"
                  class="field w-2/12"
                  name="account_number"
                  modelValue=""
                >
                </InputField>
                <div>
                  <Icon
                    width="20"
                    height="20"
                    style="color: #DC2626"
                    class="cursor-pointer"
                    name="mdi:close-circle-outline"
                    @click="invoiceItems.pop(1)"
                  />
                </div>
              </div>
              <div class="table-content__content">
                <label><br /></label>
                <div></div>
              </div>
            </div>
            <div class="body__table-footer">
              <div class="footer__content sales">
                <label class="text-right"
                  >Total Sales Amount (VAT-excluded)</label
                >
                <div class="text-right">1,199,709.00</div>
              </div>
              <div class="footer__content vat">
                <label class="text-right">VAT Amount (Tax Rate: 12%)</label>
                <div class="text-right">143,965.08</div>
              </div>
              <div class="footer__content total">
                <label class="text-right"><strong>TOTAL</strong></label>
                <div class="text-right border-b border-gray-300">
                  Php 1,343,674.08
                </div>
              </div>
            </div>
          </div>
          <div class="form__footer">
            <p class="footer__title">IMPORTANT REMINDER</p>

            <Textarea
              class="w-full footer__description"
              fontSize="text-xs"
              padding="py-0"
              name="address"
              rows="5"
              v-model="formData.business.notes"
            />
            <p class="footer__payments">REMIT PAYMENT TO :</p>
            <div class="payments__section">
              <ul>
                <li>
                  <div class="left-section__payment-details">
                    <label> BENEFICIARY’S BANK: </label>
                    <InputField
                      padding="p-0"
                      fontSize="text-xs"
                      name="business_invoice_number_template"
                      v-model="formData.name" 
                    />
                  </div>
                </li>
                <li>SWIFT CODE : {{ formData.bank.swift_code }}</li>
                <li>A/C NO. : {{ formData.bank.account_number }} ({{ formData.bank.currency }})</li>
                <li>A/C NAME : {{ formData.bank.account_name }}.</li>
              </ul>
            </div>
           

            <div class="footer__signatory">
              <div class="signatory__line">
                <div class="line__complimentory-close">Thank You</div>

                <strong>eCloudvalley Technology (Philippines) Inc. </strong>
              </div>
            </div>
          </div>
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
            notes: null,
          },
          bank: {
            account_number: null,
            beneficiary_bank: null,
            swift_code: null,
            account_name: null,
            currency: null
          },
          customer: {
            name: null,
            tin: null,
            address: null,
            customer_contact_name: null,
            customer_contact_email: null,
            customer_contact_phone_number: null,
            references: null,
          },
          name: null,
          line_items: null,
          invoice_amount: null,
          status: null,
          invoice_date: null,
          due_date: null,
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
    const { $api, $_, $dayjs } = useNuxtApp();
    const formData = reactive(props.invoiceDetails);
    const invoiceItems = reactive([1]);

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
          label: item["business_name"],
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
        label: details?.business_name,
        value: details?.business,
      };
      formData.business = {
        ...formData.business,
        ...details,
        name: details?.business,
      };

      formData.invoice_date = $dayjs().format('YYYY/M/D')

      if (formData.name === null) {
        formData.name = details?.invoice_number_template
      }
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

    const selectedCustomer = ref(null);
    let customerOptions = reactive([]);

    async function setCustomerFormData(customer_id) {
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

    watch(selectedBusinessUser, (result) => {
      if (formData.business.business_contact_uuid != result.value) {
        getBusinessUserData(result.value);
      }
    });

    watch(() => formData.invoice_date, (result) => {
      formData.due_date = $dayjs(result).add(formData.business.due_date_duration, 'day').format('YYYY/M/D')
    }, {
      deep: true
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
      customerOptions,
      selectedCustomer,
      onSubmit,
      invoiceItems,
    };
  },
};
</script>

<style lang="postcss">
.invoice {
  @apply flex flex-col gap-5 justify-center items-center;
  
  &__form {
    @apply p-10 text-xs;
    .form__header {
      @apply flex gap-3 items-start justify-between;
      .header__left-section {
        @apply w-full flex flex-col gap-5;
        img {
          @apply w-[120px];
          @apply self-start;
        }

        .left-section__company-details {
          @apply grid gap-1;
          .input-container__input {
            @apply p-0 !important;
          }
          grid-template-columns: 150px 1fr;
        }
        .left-section__contact-details {
          @apply grid gap-1;
          .input-container__input {
            @apply p-0 !important;
          }
          grid-template-columns: 150px 1fr;
        }
        .left-section__billing-details {
          @apply grid gap-1;
          grid-template-columns: 150px 1fr;
          select {
            @apply px-1 border-b border-gray-200 w-[100px];
          }
        }
      }
      .header__right-section {
        @apply w-[40%] flex flex-col gap-3;
        .right-section__header {
          @apply justify-center flex items-end h-[55px];
          @apply text-[32px] font-semibold;
        }
        .right-section__invoice-details {
          /* @apply grid grid-cols-2; */
          @apply flex flex-row gap-x-5;
          @apply border-t border-gray-200;

          &:last-of-type {
            @apply border-b border-gray-200;
          }

          label, input, textarea {
            @apply mt-2;
          }

          label, textarea {
            @apply mb-2;
          }
        }
      }
    }

    .form__body {
      @apply w-full flex flex-col mt-5;
      .body__table-header {
        @apply flex items-center mb-2;
        @apply border-b-4 border-[#50C4FF];
        strong {
          @apply block w-full text-[#50C4FF] text-center;
        }
        .header__actions {
            @apply flex gap-2 mb-2;
            @apply cursor-pointer;
            div {
              @apply rounded-md;
            }
        }

      }
      .body__table-content {
        @apply flex flex-col;
 
        .table-content__content {
          @apply py-[3px] gap-4;
          @apply flex items-end w-full border-b border-gray-300;
        }
      }
      .body__table-footer {
        @apply flex flex-col;
        .footer__content {
          @apply py-[3px] gap-4;
          @apply flex items-start w-full border-b border-gray-300;
          &.vat {
            @apply border-b-4 border-[#50C4FF];
          }
          &.total {
            @apply border-none border-b;
          }
          &.sales,
          &.vat,
          &.total {
            label {
              @apply w-3/4;
            }
            div {
              @apply w-1/4;
            }
          }

          label {
            @apply w-full;
          }
          div {
            @apply w-full;
          }
        }
      }
    }
    .form__footer {
      .footer__title {
        @apply font-bold mb-[12px];
      }
      .footer__description {
        @apply mb-[12px];
      }
      .footer__payments {
        @apply mb-[12px] font-bold;

        .payments__section {
          @apply w-[40%] flex flex-col gap-3;
          /* .left-section__payment-details {
            @apply grid gap-1;
            .input-container__input {
              @apply p-0 !important;
            }
            grid-template-columns: 150px 1fr;
          } */
        }

      }
      .footer__signatory {
        @apply mt-[40px];
        @apply flex flex-col w-full items-end;
        .signatory__line {
          @apply w-[400px] text-center;
          @apply pb-[40px] border-b border-black;
          .line__complimentory-close {
            @apply opacity-70;
            @apply italic font-bold w-full text-center text-2xl mt-[12px] mb-[24px];
          }
        }
      }
      ul {
        list-style: inside;
        @apply list-disc;
      }
    }

    textarea {
      @apply border-none border-b-4 border-gray-200;
      @apply resize-y !important;
    }
    /* PLUGINS CUSTOM CSS */
    .dp__input {
      @apply   text-xs !important;
      /* @apply border-none border-b; */
    }
    .dp__icon {
      @apply pt-3;
    }
    textarea:hover,
    input:hover {
      @apply bg-gray-100 !important;
    }
    .multiselect {
      @apply cursor-pointer;
      @apply text-xs;
    }
    .multiselect__input:hover {
      @apply bg-white !important;
    }
    .multiselect__tags {
      @apply min-h-[16px] p-0 !important;
      @apply h-[25px] !important
    }
    .multiselect__select {
      @apply text-xs;
      @apply h-[16px];
    }
    .multiselect__single {
      @apply text-xs !important;
      @apply p-0;
    }
    .multiselect__spinner {
      @apply z-40;
      @apply h-[16px] w-[16[x]];
    }

    .multiselect--disabled, .multiselect__select{
      @apply bg-white;
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
