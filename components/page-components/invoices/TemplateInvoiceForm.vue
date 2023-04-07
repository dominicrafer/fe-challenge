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
      :key="fetchBusinessDetails"
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
                <span> eCloudvalley Technology (Philippines) Inc.</span>
                <div class="tin_details">
                  <label> TIN NO.</label>
                  <span>
                    <InputField
                      padding="p-0"
                      inputWidth="w-auto"
                      fontSize="text-[12px]"
                      class="inputfield"
                      name="account_number"
                      placeholder="Enter account number"
                      modelValue="0998-533-1531"
                  /></span>
                </div>
                <Textarea
                  fontSize="text-xs"
                  padding="px-2 py-0"
                  name="address"
                  placeholder="Enter address"
                  modelValue="Warehouse 1 900 Romualdez Street Barangay 664-A Zone 71 Paco, Manila 1007"
                />
              </div>
              <div class="left-section__contact-details">
                <label> CONTACT:</label>
                <InputField
                  padding="p-0"
                  inputWidth="w-auto"
                  fontSize="text-[12px]"
                  class="inputfield"
                  name="account_number"
                  placeholder="Enter account number"
                  modelValue="khrisel Rea"
                >
                </InputField>
                <label> EMAIL:</label>
                <InputField
                  padding="p-0"
                  inputWidth="w-auto"
                  fontSize="text-[12px]"
                  class="inputfield"
                  name="account_number"
                  placeholder="Enter account number"
                  modelValue="khrisel.rea@ecloudvalley.com"
                >
                </InputField>
                <label> CONTACT NO.</label>
                <InputField
                  padding="p-0"
                  inputWidth="w-auto"
                  fontSize="text-[12px]"
                  class="inputfield"
                  name="account_number"
                  placeholder="Enter account number"
                  modelValue="0998-533-1531"
                />
              </div>
              <p><strong>BILL TO</strong></p>
              <div class="left-section__billing-details">
                <label> CUSTOMER:</label>

                <Select class="w-full" name="selected-approver" :options="[]" />
                <label> ADDRESS:</label>
                <Textarea
                  fontSize="text-xs"
                  padding="px-2 py-0"
                  name="address"
                  placeholder="Enter address"
                  modelValue="Warehouse 1 900 Romualdez Street Barangay 664-A Zone 71 Paco, Manila 1007"
                />
                <label> CONTACT</label>
                <span>
                  <InputField
                    padding="p-0"
                    inputWidth="w-auto"
                    fontSize="text-[12px]"
                    class="inputfield"
                    name="account_number"
                    placeholder="Enter account number"
                    modelValue="0998-533-1531"
                /></span>
                <label> EMAIL ADD.:</label>
                <span>
                  <InputField
                    padding="p-0"
                    inputWidth="w-auto"
                    fontSize="text-[12px]"
                    class="inputfield"
                    name="account_number"
                    placeholder="Enter account number"
                    modelValue="0998-533-1531"
                /></span>
                <label> CONTACT NO.:</label>
                <span>
                  <InputField
                    padding="p-0"
                    inputWidth="w-auto"
                    fontSize="text-[12px]"
                    class="inputfield"
                    name="account_number"
                    placeholder="Enter account number"
                    modelValue="0998-533-1531"
                /></span>
                <label> TIN NO.</label>
                <span>
                  <InputField
                    padding="p-0"
                    inputWidth="w-auto"
                    fontSize="text-[12px]"
                    class="inputfield"
                    name="account_number"
                    placeholder="Enter account number"
                    modelValue="0998-533-1531"
                /></span>
              </div>
            </div>
            <div class="header__right-section">
              <div class="right-section__header">INVOICE</div>
              <div class="right-section__invoice-details">
                <label>INVOICE NO.:</label>
                <InputField
                  padding="p-0"
                  inputWidth="w-auto"
                  fontSize="text-[12px]"
                  class="inputfield"
                  name="account_number"
                  placeholder="Enter account number"
                  modelValue="0998-533-1531"
                >
                </InputField>
                <label>INVOICE DATE:</label>
                <DatePicker
                  name="account_number"
                  inputClassName="dp-custom-input"
                />
                <label>DUE DATE:</label>
                <InputField
                  padding="p-0"
                  inputWidth="w-auto"
                  fontSize="text-[12px]"
                  class="inputfield"
                  name="account_number"
                  placeholder="Enter account number"
                  modelValue="0998-533-1531"
                >
                </InputField>
                <label>P.O NO/Quote NO:</label>
                <InputField
                  padding="p-0"
                  inputWidth="w-auto"
                  fontSize="text-[12px]"
                  class="inputfield"
                  name="account_number"
                  placeholder="Enter account number"
                  modelValue="0998-533-1531"
                >
                </InputField>
              </div>
            </div>
          </div>
          <div class="form__body">
            <div class="body__table-header">
              <strong>DESCRIPTION</strong>
              <strong>AMOUNT</strong>
            </div>
            <div class="body__table-content">
              <div
                class="table-content__content"
                v-for="(invoiceItemDetails, index) in invoiceItems"
                :key="index"
              >
                <Textarea
                  class="w-full"
                  fontSize="text-xs"
                  padding="px-2 py-0"
                  name="address"
                  placeholder="Enter address"
                  modelValue="Warehouse 1 900 Romualdez Street Barangay 664-A Zone 71 Paco, Manila 1007"
                />
                <InputField
                  padding="p-0"
                  fontSize="text-[12px]"
                  align="text-right"
                  class="field w-full"
                  name="account_number"
                  placeholder="Enter account number"
                  modelValue="0998-533-1531"
                >
                </InputField>
                <div class="content__actions">
                  <Button variant="success" @click="invoiceItems.push(1)"
                    >Add</Button
                  >
                  <Button variant="danger" @click="invoiceItems.push(1)"
                    >Remove</Button
                  >
                </div>
              </div>
              <div class="table-content__content">
                <label>PureGo Phase 2: Milestone 2</label>
                <div>Php 1,199,709.00</div>
              </div>
              <div class="table-content__content">
                <label>PureGo Phase 2: Milestone 2</label>
                <div>
                  Php 1,199,709.00ceqwceqw qwec qwq eqwe qwiunye qwigunev
                  iuqwygbncqwuic gnkqewbruyv geqwknrv byqwg
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
              padding="px-2 py-0"
              name="address"
              rows="5"
              placeholder="Enter address"
              modelValue="To all withholding agents: To claim withholding tax subsidies, you
              must submit the corresponding Certificate of Creditable Tax
              Withheld (BIR Form No. 2307) upon remittance of payment."
            />
            <p class="footer__payments">REMIT PAYMENT TO :</p>
            <ul>
              <li>
                BENEFICIARY’S BANK : Mega International Commercial Bank Co.,
                Ltd. Manila Branch
              </li>
              <li>SWIFT CODE : ICBCPHMM</li>
              <li>A/C NO. : 56110-001852-5 (PHP)</li>
              <li>A/C NAME : ECLOUDVALLEY TECHNOLOGY (PHILIPPINES) INC.</li>
            </ul>

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
          @apply flex flex-col;

          .tin_details {
            @apply flex flex-row gap-2;
            .input-container__input {
              @apply p-0 !important;
            }
          }
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
        @apply w-[40%] flex flex-col gap-6;
        .right-section__header {
          @apply justify-center flex items-end h-[55px];
          @apply text-[32px] font-semibold;
        }
        .right-section__invoice-details {
          @apply grid grid-cols-2;
          label {
            @apply py-[5px];
            @apply border-t border-gray-200;
            &:last-of-type {
              @apply border-b border-gray-200;
            }
          }

          .inputfield {
            @apply py-[5px];
            @apply border-t border-gray-200;
            &:last-of-type {
              @apply border-b border-gray-200;
            }
          }
        }
      }
    }

    .form__body {
      @apply w-full flex flex-col mt-5;
      .body__table-header {
        @apply flex items-center;
        @apply border-b-4 border-[#50C4FF];
        strong {
          @apply block w-full text-[#50C4FF] text-center;
        }
      }
      .body__table-content {
        @apply flex flex-col;
        .table-content__content {
          @apply py-[3px] gap-4;
          @apply flex items-end w-full border-b border-gray-300;
          .field {
            input {
              @apply text-right;
            }
          }
          .content__actions {
            @apply flex gap-2;
            button {
              @apply text-xs !important;
            }
            div {
              @apply rounded-md;
            }
          }
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
    /* PLUGINS CUSTOM CSS */
    .dp-custom-input {
      @apply pl-[25px] pt-0 pr-0 pb-0 text-xs h-full !important;
    }
    .dp__input_icons {
      padding: 0px 6px;
    }
    .dp__main,
    .dp__input_wrap,
    .dp__main > div {
      @apply h-full;
    }

    .multiselect {
      @apply min-h-[25px] cursor-pointer;
      &:hover {
        .multiselect__tags {
          @apply bg-gray-100;
        }
      }
    }
    .multiselect__tags {
      @apply min-h-[25px] p-0 !important;
    }
    .multiselect__content-wrapper {
      @apply top-[25px];
    }
    .multiselect__select {
      @apply h-[30px];
    }
    textarea:hover,
    input:hover {
      @apply bg-gray-100 !important;
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
