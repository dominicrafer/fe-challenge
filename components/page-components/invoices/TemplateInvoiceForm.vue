<template>
  <div class="invoice">
    <Container
      :loading="isLoading"
      :key="isLoading"
      padding="p-0"
      class="w-[1024px]"
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
          :disabled="![null].includes(invoiceDetails.status)"
        >
          <template #label> Select Project </template>
        </Select>
      </div>

      <Container
        :loading="fetchInvoiceDetails"
        padding="p-0"
        class="w-[1024px]"
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
                  {{
                    formData.business_details.name === null
                      ? "-"
                      : formData.business_details.name
                  }}

                  <label> TIN NO. </label>
                  <span>
                    <InputField
                      padding="p-0"
                      fontSize="text-xs"
                      inputWidth="w-8/12"
                      name="business_tin"
                      v-model="formData.business_details.tin"
                      :rules="{
                        required: true,
                        numeric: true,
                      }"
                      :disabled="
                        ![null, 'draft'].includes(invoiceDetails.status)
                      "
                  /></span>
                  <label>Address: </label>
                  <Textarea
                    fontSize="text-xs"
                    class="w-8/12"
                    padding="px-0"
                    name="business_address"
                    v-model="formData.business_details.address"
                    :rules="{
                      required: true,
                    }"
                    :disabled="![null, 'draft'].includes(invoiceDetails.status)"
                  />
                </div>
                <Container :loading="fetchBusinessUserDetails">
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
                      :disabled="
                        ![null, 'draft'].includes(invoiceDetails.status)
                      "
                    />
                    <label> EMAIL:</label>
                    {{
                      formData.business_details.business_contact_email === null
                        ? "-"
                        : formData.business_details.business_contact_email
                    }}
                    <label> CONTACT NO.</label>
                    {{
                      formData.business_details
                        .business_contact_phone_number === null
                        ? "-"
                        : formData.business_details
                            .business_contact_phone_number
                    }}
                  </div>
                </Container>

                <p><strong>BILL TO</strong></p>
                <div class="left-section__billing-details">
                  <label> CUSTOMER:</label>
                  {{
                    formData.customer_details.name === null
                      ? "-"
                      : formData.customer_details.name
                  }}
                  <label> ADDRESS:</label>
                  <Textarea
                    fontSize="text-xs"
                    class="w-8/12"
                    padding="py-0"
                    name="customer_address"
                    :rules="{
                      required: true,
                    }"
                    v-model="formData.customer_details.address"
                    :disabled="![null, 'draft'].includes(invoiceDetails.status)"
                  />
                  <label> CONTACT</label>
                  <InputField
                    padding="p-0"
                    inputWidth="w-8/12"
                    fontSize="text-xs"
                    name="customer_contact_name"
                    :rules="{
                      required: true,
                    }"
                    v-model="formData.customer_details.customer_contact_name"
                    :disabled="![null, 'draft'].includes(invoiceDetails.status)"
                  />
                  <label> EMAIL: </label>
                  <InputField
                    padding="p-0"
                    inputWidth="w-8/12"
                    fontSize="text-xs"
                    name="customer_contact_email"
                    :rules="{
                      required: true,
                      email: true,
                    }"
                    v-model="formData.customer_details.customer_contact_email"
                    :disabled="![null, 'draft'].includes(invoiceDetails.status)"
                  />
                  <label> CONTACT NO.: </label>
                  <InputField
                    padding="p-0"
                    inputWidth="w-8/12"
                    fontSize="text-xs"
                    name="customer_contact_phone_number"
                    :rules="{
                      required: true,
                      phone_number: true,
                    }"
                    v-model="
                      formData.customer_details.customer_contact_phone_number
                    "
                    :disabled="![null, 'draft'].includes(invoiceDetails.status)"
                  />
                  <label> TIN: </label>
                  <InputField
                    padding="p-0"
                    inputWidth="w-8/12"
                    fontSize="text-xs"
                    name="customer_tin"
                    :rules="{
                      required: true,
                      numeric: true,
                    }"
                    v-model="formData.customer_details.tin"
                    :disabled="![null, 'draft'].includes(invoiceDetails.status)"
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
                    :disabled="![null, 'draft'].includes(invoiceDetails.status)"
                  />
                </div>

                <div class="right-section__invoice-details">
                  <label class="w-1/2"> DUE DATE: </label>
                  <DatePicker
                    v-model="formData.invoice_due_date"
                    name="invoice_due_date"
                    format="Y/M/d"
                    :timePicker="false"
                    :enableTimePicker="false"
                    disabled
                  />
                </div>

                <div class="right-section__invoice-details mb-5">
                  <label class="w-8/12"> P.O NO/Quote NO: </label>
                  <div>
                    <div
                      class="reference_section"
                      v-for="(value, key) in formData.customer_details
                        .references"
                    >
                      <label class="text-[10px]"> {{ key }}: </label>
                      <InputField
                        class="w-full"
                        padding="p-0"
                        fontSize="text-xs"
                        :name="key"
                        :rules="{
                          required: true,
                          numeric: true,
                        }"
                        v-model="formData.customer_details.references[key]"
                        :disabled="
                          ![null, 'draft'].includes(invoiceDetails.status)
                        "
                      />
                    </div>
                  </div>
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
                    @click="
                      ![null, 'draft'].includes(invoiceDetails.status)
                        ? null
                        : formData.line_item_details.push({
                            description: 'Line item description',
                            value: '0.00',
                          });
                      calculate();
                    "
                  />
                </div>
              </div>
              <div class="body__table-content">
                <div
                  class="table-content__content"
                  v-for="(
                    invoiceItemDetails, index
                  ) in formData.line_item_details"
                  :key="index"
                >
                  <InputField
                    padding="p-0"
                    fontSize="text-xs"
                    class="field w-full"
                    :name="`description_${index}`"
                    rules="required"
                    v-model="invoiceItemDetails.description"
                    :disabled="![null, 'draft'].includes(invoiceDetails.status)"
                  >
                  </InputField>
                  <InputField
                    padding="p-0"
                    fontSize="text-xs"
                    class="field w-2/12"
                    :name="`value_${index}`"
                    :rules="{
                      required: true,
                    }"
                    v-model="invoiceItemDetails.value"
                    :disabled="![null, 'draft'].includes(invoiceDetails.status)"
                    @input="calculate()"
                  >
                  </InputField>
                  <div>
                    <Icon
                      width="20"
                      height="20"
                      style="color: #dc2626"
                      class="cursor-pointer"
                      name="mdi:close-circle-outline"
                      @click="
                        ![null, 'draft'].includes(invoiceDetails.status)
                          ? null
                          : formData.line_item_details.splice(index, 1);
                        calculate();
                      "
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
                  <div class="text-right">
                    {{ numberWithCommas(formData.invoice_excluded_vat_amount) }}
                  </div>
                </div>
                <div class="footer__content vat">
                  <label class="text-right"
                    >VAT Amount (Tax Rate:
                    {{ formData.business_details.tax * 100 }}%)</label
                  >
                  <div class="text-right">
                    {{ numberWithCommas(formData.invoice_vat_amount) }}
                  </div>
                </div>
                <div class="footer__content total">
                  <label class="text-right"><strong>TOTAL</strong></label>
                  <div class="text-right border-b border-gray-300">
                    {{ numberWithCommas(formData.invoice_amount) }}
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
                name="notes"
                rows="5"
                v-model="formData.business_details.notes"
                :disabled="![null, 'draft'].includes(invoiceDetails.status)"
              />
              <div class="bank__section">
                <p class="mb-[12px] font-bold w-full">REMIT PAYMENT TO :</p>
                <Select
                  class="w-full"
                  v-model="selectedBank"
                  name="bank"
                  :options="bankOptions"
                  trackBy="value"
                  label="label"
                  searchable
                  :closeOnSelect="true"
                  :hideSelected="true"
                  :disabled="![null, 'draft'].includes(invoiceDetails.status)"
                />
              </div>
              <div class="bank__details">
                <Container :loading="fetchBankDetails">
                  <ul>
                    <div class="left-section__bank_details">
                      <li>
                        <label> BENEFICIARY’S BANK: </label>
                      </li>
                      {{
                        formData.bank_details.beneficiary_bank === null
                          ? "-"
                          : formData.bank_details.beneficiary_bank
                      }}
                    </div>
                    <div class="left-section__bank_details">
                      <li>
                        <label> SWIFT CODE: </label>
                      </li>
                      {{
                        formData.bank_details.swift_code === null
                          ? "-"
                          : formData.bank_details.swift_code
                      }}
                    </div>
                    <div class="left-section__bank_details">
                      <li>
                        <label> A/C NO. : </label>
                      </li>
                      {{
                        formData.bank_details.account_number === null
                          ? "-"
                          : formData.bank_details.account_number +
                            " (" +
                            formData.bank_details.currency +
                            ")"
                      }}
                    </div>
                    <div class="left-section__bank_details">
                      <li>
                        <label> A/C NAME : </label>
                      </li>
                      {{
                        formData.bank_details.account_name === null
                          ? "-"
                          : formData.bank_details.account_name
                      }}
                    </div>
                  </ul>
                </Container>
              </div>

              <div class="footer__signatory">
                <div class="signatory__line">
                  <div class="line__complimentory-close">Thank You</div>

                  <strong>eCloudvalley Technology (Philippines) Inc. </strong>
                </div>
              </div>
            </div>
          </div>
          <div class="invoice__footer">
            <div class="flex flex-row gap-5">
              <Button
                v-if="[null, 'draft'].includes(invoiceDetails.status)"
                variant="success"
                type="submit"
                :loading="isSubmitting"
                @click="formData.status = 'draft'"
                >Save as draft</Button
              >
              <Button
                v-if="[null, 'draft'].includes(invoiceDetails.status)"
                variant="success"
                type="submit"
                @click="formData.status = 'for_approval'"
                :loading="isSubmitting"
                >Save</Button
              >
            </div>
          </div>
        </VForm>
      </Container>
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
          business_details: {
            name: null,
            address: null,
            due_date_duration: null,
            invoice_number_template: null,
            tax: null,
            tin: null,
            business_contact_name: null,
            business_contact_email: null,
            business_contact_phone_number: null,
            business_contact_uuid: null,
            notes: null,
          },
          bank_details: {
            account_number: null,
            beneficiary_bank: null,
            swift_code: null,
            account_name: null,
            currency: null,
          },
          customer_details: {
            id: null,
            name: null,
            tin: null,
            address: null,
            customer_contact_name: null,
            customer_contact_email: null,
            customer_contact_phone_number: null,
            references: {},
          },
          approvers: [],
          project_id: null,
          project_name: null,
          project_service_type: null,
          business_name: null,
          bank_account_number: null,
          customer_name: null,
          line_item_details: [],
          invoice_excluded_vat_amount: null,
          invoice_vat_amount: null,
          invoice_amount: null,
          name: null,
          status: null,
          invoice_date: null,
          invoice_due_date: null,
        };
      },
    },
    selectedProject: {
      type: Object,
      default: null,
    },
    selectedBusinessUser: {
      type: Object,
      default: null,
    },
    selectedBank: {
      type: Object,
      default: null,
    },
    bankOptions: {
      type: Array,
      default: [],
    },
    submitHandler: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { $api, $_, $dayjs, $toast } = useNuxtApp();
    const formData = reactive(props.invoiceDetails);

    // PROJECT DETAILS
    const selectedProject = ref(props.selectedProject);

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

    async function setProjectFormData(result) {
      formData.project_id = result.value.id;
      formData.project_name = result.value.name;
      formData.project_service_type = result.value.service_type;
      formData.business_name = result.value.business_name;
      formData.bank_account_number = result.value.bank_account_number;
      formData.customer_name = result.value.customer_name;
      formData.customer_details.references = result.value.references;
    }

    // BUSINESS DETAILS
    const fetchInvoiceDetails = ref(false);

    const fetchBusinessUserOptions = ref(false);
    const fetchBusinessUserDetails = ref(false);
    const selectedBusinessUser = ref(props.selectedBusinessUser);
    let businessUserOptions = reactive([]);

    async function getBusinessData(business) {
      const { data } = await $api.businesses.getBusinessDetails(business, {
        business: null, // services as acronym and sk in dyanmodb
        business_name: null, // serves as acronym descirption and is an attribute
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

      formData.business_details = {
        ...formData.business_details,
        address: details?.address,
        due_date_duration: details?.due_date_duration,
        invoice_number_template: details?.invoice_number_template,
        tin: details?.tin,
        notes: details?.notes,
        name: details?.business_name,
        tax: parseFloat(details?.tax),
      };

      formData.invoice_date = $dayjs().format("YYYY/M/D");
      formData.approvers = details?.approval_heirarchy;

      if (formData.name === null) {
        formData.name = details?.invoice_number_template;
      }
    }

    async function getBusinessUserData(cognito_id) {
      fetchBusinessUserDetails.value = true;
      if (cognito_id === undefined) {
        return true;
      }
      const { data } = await $api.users.getUserDetails(cognito_id);
      let details = data.value.resource;
      selectedBusinessUser.value = {
        label: details?.name,
        value: details?.cognito_id,
      };

      formData.business_details = {
        ...formData.business_details,
        business_contact_uuid: details?.cognito_id,
        business_contact_name: details?.name,
        business_contact_email: details?.email,
        business_contact_phone_number: details?.phone_number,
      };
      fetchBusinessUserDetails.value = false;
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
      fetchInvoiceDetails.value = true;
      await Promise.all([
        getBusinessData(business_name),
        getBusinessUserData(cognito_id),
      ]);
      fetchInvoiceDetails.value = false;
    }

    // BANK DETAILS

    const fetchBankDetails = ref(false);
    const selectedBank = ref(props.selectedBank);
    let bankOptions = reactive(props.bankOptions);

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
      formData.bank_details = {
        ...formData.bank_details,
        ...details,
      };
      fetchBankDetails.value = false;
    }

    // CUSTOMER DETAILS

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

      formData.customer_details = {
        ...formData.customer_details,
        id: details?.id,
        name: details?.name,
        tin: details?.tin,
        address: details?.address,
        customer_contact_name: details?.contact_name,
        customer_contact_email: details?.contact_email,
        customer_contact_phone_number: details?.contact_phone_number,
      };
    }

    // LINE ITEMS
    const salesVatExcludedValue = ref(null);
    const salesTaxableValue = ref(null);
    const salesTotalValue = ref(null);

    function calculate() {
      let vatExcluded = $_.reduce(
        formData.line_item_details,
        (sum, items) => {
          let parsedValue = items.value.replaceAll(",", "");

          return sum + parseFloat(parsedValue);
        },
        0
      );
      const taxable = vatExcluded * formData.business_details.tax;
      const total = vatExcluded + taxable;

      formData.invoice_excluded_vat_amount = vatExcluded.toFixed(2);
      formData.invoice_vat_amount = taxable.toFixed(2);
      formData.invoice_amount = total.toFixed(2);
    }

    function numberWithCommas(x) {
      if (x !== null && x !== undefined) {
        return `${formData.bank_details.currency} ${x
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      }
    }

    // WATCHERS
    watch(selectedProject, (result) => {
      setProjectFormData(result);
      setBusinessFormData(
        result.value.business_name,
        result.value.account_manager_uuid
      );
      getBankOptions();
      setBankFormData(result.value.bank_account_number);
      setCustomerFormData(result.value.customer_id);
    });

    watch(selectedBusinessUser, (result) => {
      if (formData.business_details.business_contact_uuid != result.value) {
        getBusinessUserData(result.value);
      }
    });

    watch(
      () => formData.invoice_date,
      (result) => {
        formData.invoice_due_date = $dayjs(result)
          .add(formData.business_details.due_date_duration, "day")
          .format("YYYY/M/D");
      },
      {
        deep: true,
      }
    );

    watch(
      selectedBank,
      (result) => {
        if (formData.bank_details.account_number != result.value) {
          setBankFormData(result.value);
        }
      },
      { deep: true }
    );

    async function onSubmit(values) {
      if (formData.line_item_details <= 0) {
        return $toast.error("Please provide line items.");
      }

      await props.submitHandler(formData);
    }
    return {
      formData,
      projectOptions,
      selectedProject,
      fetchProjectOptions,
      searchProject,
      fetchInvoiceDetails,
      fetchBusinessUserOptions,
      selectedBusinessUser,
      fetchBusinessUserDetails,
      businessUserOptions,
      searchBusinessUser,
      selectedBank,
      bankOptions,
      fetchBankDetails,
      numberWithCommas,
      calculate,
      onSubmit,
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
          @apply flex flex-row gap-x-2;
          @apply border-t border-gray-200;

          &:last-of-type {
            @apply border-b border-gray-200 pb-2;
          }

          label,
          input,
          textarea {
            @apply mt-2;
          }

          label,
          textarea {
            @apply mb-2;
          }

          .reference_section {
            @apply w-full flex flex-row gap-1;
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
      .bank__section {
        @apply w-[40%] flex flex-row;
      }
      .bank__details {
        @apply w-[40%] flex flex-col gap-3;
        .left-section__bank_details {
          @apply grid gap-1;
          .input-container__input {
            @apply p-0 !important;
          }
          grid-template-columns: 150px 1fr;
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
      @apply text-xs !important;
      &:disabled {
        @apply text-gray-400;
      }
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
      @apply h-[25px] !important;
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

    .multiselect--disabled,
    .multiselect__select {
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
