<template>
  <div class="business">
    <Container
      :loading="isLoading"
      :key="isLoading && pending"
      padding="p-0"
      width="w-1/2"
    >
      <VForm
        @submit="onSubmit"
        v-slot="{ isSubmitting }"
        :initialValues="businessDetails"
      >
        <SectionTitle title="Business Details" class="rounded-t-sm" />
        <div class="business__form">
          <div class="col__auto">
            <InputField
              class="w-full"
              name="business"
              placeholder="Enter business"
              v-model="formData.business"
              v-model:isDirty="dirtyFieldValidator.business"
              :rules="edit ? null : 'required'"
            >
              <template #label> Business </template>
            </InputField>
            <InputField
              class="w-full"
              name="business_name"
              placeholder="Enter business_name"
              v-model="formData.business_name"
              v-model:isDirty="dirtyFieldValidator.business_name"
              :rules="edit ? null : 'required'"
            >
              <template #label> Business Name </template>
            </InputField>
          </div>
          <Textarea
            name="address"
            label="Address"
            placeholder="Enter address"
            v-model="formData.address"
            v-model:isDirty="dirtyFieldValidator.address"
            :rules="edit ? null : 'required'"
          />

          <span>Services</span>
          <div class="col__auto">
            <InputField
              class="w-full"
              :name="`service-name`"
              placeholder="Enter service"
              v-model="serviceName"
            >
              <template #label> Service Name </template>
            </InputField>
            <InputField
              class="w-full"
              :name="`service-description`"
              placeholder="Enter service description"
              v-model="serviceDescription"
            >
              <template #label> Description </template>
            </InputField>
            <div>
              <Button
                variant="success"
                @click="addService(serviceName, serviceDescription)"
                >Add</Button
              >
            </div>
          </div>
          <template v-for="(service, index) in formData.services">
            <div class="col__auto services">
              <div class="services__details">
                <p class="details__default_badge">{{ service.service }}</p>
                <p class="details__service_info">
                  {{ service.description }}
                </p>
              </div>
              <div>
                <Icon
                  width="20"
                  height="20"
                  color="#E45959"
                  @click="removeService(index)"
                  name="material-symbols:delete-outline"
                  class="cursor-pointer"
                />
              </div>
            </div>
          </template>
        </div>
        <SectionTitle title="Invoice Settings" class="rounded-t-sm" />
        <div class="business__form">
          <InputField
            class="w-1/2"
            name="invoice_number_template"
            placeholder="Enter invoice number template"
            v-model="formData.invoice_number_template"
            v-model:isDirty="dirtyFieldValidator.invoice_number_template"
            :rules="edit ? null : 'required'"
          >
            <template #label> Invoice Number Template </template>
          </InputField>
          <div class="col__fixed">
            <InputField
              name="tin"
              placeholder="Enter tin"
              v-model="formData.tin"
              v-model:isDirty="dirtyFieldValidator.tin"
              :rules="{
                numeric: true,
                required: edit ? false : true,
                max: 9,
              }"
            >
              <template #label> TIN </template>
            </InputField>
            <InputField
              name="tax"
              placeholder="Enter Text"
              v-model="formData.tax"
              v-model:isDirty="dirtyFieldValidator.tax"
              :rules="{
                regex: /^\d*\.?\d*$/,
                required: edit ? false : true,
              }"
            >
              <template #label> Tax </template>
            </InputField>
          </div>
          <div class="col__fixed">
            <InputField
              name="due_date_duration"
              placeholder="Enter Text"
              v-model="formData.due_date_duration"
              v-model:isDirty="dirtyFieldValidator.due_date_duration"
              :rules="{
                numeric: true,
                required: edit ? false : true,
              }"
            >
              <template #label> Due Date Duration </template>
            </InputField>
            <InputField
              name="follow_up_intervals"
              placeholder="Enter Text"
              v-model="formData.follow_up_intervals"
              v-model:isDirty="dirtyFieldValidator.follow_up_intervals"
              :rules="{
                numeric: true,
                required: edit ? false : true,
              }"
            >
              <template #label> Follow Up Intervals </template>
            </InputField>
          </div>
          <Textarea
            name="notes"
            label="Notes"
            placeholder="Enter notes"
            v-model="formData.notes"
            v-model:isDirty="dirtyFieldValidator.notes"
            :rules="edit ? null : 'required'"
          />

          <div class="col__auto">
            <Select
              class="w-full"
              v-model="selectedApprover"
              name="selected-approver"
              :options="approverOptions"
              trackBy="value"
              label="label"
              searchable
              :closeOnSelect="true"
              :hideSelected="true"
              openDirection="bottom"
              :isLoading="fetchingApproverOptions"
              @asyncSearch="searchUser"
            >
              <template #label> Approval Heirarchy </template>
            </Select>
            <div>
              <Button variant="success" @click="addApprover(selectedApprover)"
                >Add</Button
              >
            </div>
          </div>
          <template v-for="(approver, index) in formData.approval_heirarchy">
            <div
              v-if="['creator', 'account_manager'].includes(approver.type)"
              class="col__auto heirarchy"
            >
              <div class="heirarchy__details">
                <span class="details__default_badge">
                  {{ approver.type }}
                </span>
              </div>
              <div>
                <p class="details__fixed">Fixed</p>
              </div>
            </div>
            <div class="col__auto heirarchy" v-else>
              <div class="heirarchy__details">
                <div class="details__type mb-2">
                  <span
                    :class="
                      approver.type === 'approver'
                        ? `type__approver_badge`
                        : `type__signatory_badge`
                    "
                  >
                    {{ approver.type }}
                  </span>
                  <span
                    class="type__signatory_action"
                    @click="setAsSignatory(index)"
                    v-if="approver.type !== 'signatory'"
                    >set as signatory</span
                  >
                </div>
                <p class="details__approver_info">
                  {{ approver.approver_name }}
                </p>
                <p class="details__approver_info">
                  {{ approver.approver_email }}
                </p>
              </div>
              <div class="heirarchy__actions">
                <div class="actions__swapper">
                  <Icon
                    width="20"
                    height="20"
                    name="material-symbols:keyboard-arrow-down"
                    class="cursor-pointer"
                    @click="moveTarget(index, 'down')"
                    v-if="index !== formData.approval_heirarchy.length - 2"
                  />
                  <Icon
                    width="20"
                    height="20"
                    name="material-symbols:keyboard-arrow-up"
                    class="cursor-pointer"
                    @click="moveTarget(index, 'up')"
                    v-if="index !== 0"
                  />
                </div>
                <div>
                  <Icon
                    width="20"
                    height="20"
                    color="#E45959"
                    name="material-symbols:delete-outline"
                    class="cursor-pointer"
                    @click="removeApprover(index)"
                  />
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="business__footer">
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
    businessDetails: {
      type: Object,
      default() {
        return {
          business: null,
          business_name: null,
          address: null,
          services: [],
          approval_heirarchy: [
            {
              type: "creator",
            },
          ],
          due_date_duration: 15,
          follow_up_intervals: 3,
          invoice_number_template: null,
          tax: null,
          tin: null,
          notes: null,
        };
      },
    },
    initialApprovalHeirarchyValues: {
      type: Array,
      default: [],
    },
    initialServicesValues: {
      type: Array,
      default: [],
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
    const { $api, $_, $toast } = useNuxtApp();
    const formData = reactive(props.businessDetails);

    const serviceName = ref(null);
    const serviceDescription = ref(null);

    const selectedApprover = reactive({});
    let approverOptions = reactive([]);
    let fetchingApproverOptions = ref(false);

    const initialApprovalHeirarchyValues = reactive(
      props.initialApprovalHeirarchyValues
    );

    const initialServicesValues = reactive(props.initialServicesValues);

    // approval_heirarchy and services are not included in dirty validation
    // as there are multiple complications when validating multiple fields
    // we handle their dirty validation manually on the onSubmit() function
    const dirtyFieldValidator = reactive({
      business: false,
      business_name: false,
      address: false,
      due_date_duration: false,
      follow_up_intervals: false,
      invoice_number_template: false,
      tax: false,
      tin: false,
    });

    function addService(serviceName, serviceDescription) {
      const exists = $_.some(formData.services, {
        service: serviceName,
      });

      if (!exists && serviceName) {
        formData.services.push({
          service: serviceName,
          description: serviceDescription,
        });
      }
    }

    function removeService(index) {
      formData.services = formData.services.filter(
        (item, itemIndex) => itemIndex !== index
      );
    }

    function addApprover(approver) {
      if (
        !$_.isEmpty(approver) &&
        !$_.some(
          formData.approval_heirarchy,
          (obj) => obj.approver_email === approver.value.approver_email
        ) &&
        formData.approval_heirarchy.length < 10
      ) {
        formData.approval_heirarchy.splice(
          formData.approval_heirarchy.length - 1,
          0,
          approver.value
        );
      }
    }

    function removeApprover(index) {
      formData.approval_heirarchy = formData.approval_heirarchy.filter(
        (item, itemIndex) => itemIndex !== index
      );
    }

    function setAsSignatory(index) {
      const existingIndex = $_.findIndex(formData.approval_heirarchy, {
        ["type"]: "signatory",
      });

      if (existingIndex !== -1) {
        formData.approval_heirarchy[existingIndex] = {
          ...formData.approval_heirarchy[existingIndex],
          type: "approver",
        };
      }

      formData.approval_heirarchy[index] = {
        ...formData.approval_heirarchy[index],
        type: "signatory",
      };
    }

    async function searchUser(value) {
      if (value.length > 3) {
        fetchingApproverOptions.value = true;
        const { data } = await $api.users.searchUsers({
          like_value: value,
        });

        approverOptions.splice(0);

        $_.forEach(data.value.resource, (item) => {
          approverOptions.push({
            label: `${item["name"]} | ${item["email"]}`,
            value: {
              approver: item.name,
              approver_email: item.email,
              approver_uuid: item.cognito_id,
              type: "approver",
            },
          });
        });

        fetchingApproverOptions.value = false;
      }
    }

    function moveTarget(index, direction) {
      if (direction === "up") {
        const abovePosition = formData.approval_heirarchy[index - 1];
        const belowPosition = formData.approval_heirarchy[index];
        formData.approval_heirarchy[index - 1] = belowPosition;
        formData.approval_heirarchy[index] = abovePosition;
      } else {
        const abovePosition = formData.approval_heirarchy[index];
        const belowPosition = formData.approval_heirarchy[index + 1];
        formData.approval_heirarchy[index + 1] = abovePosition;
        formData.approval_heirarchy[index] = belowPosition;
      }
    }

    async function onSubmit(values) {
      // Remove this key from the object as this is not used for the payload
      delete values["selected-approver"];
      delete values["service-name"];
      delete values["service-description"];

      values["due_date_duration"] = parseInt(values["due_date_duration"]);
      values["follow_up_intervals"] = parseInt(values["follow_up_intervals"]);

      const singatoryExists = $_.some(formData.approval_heirarchy, {
        type: "signatory",
      });

      if (!singatoryExists) {
        $toast.error("Approval heirarchy must contain a signatory.");
        return false;
      }

      if (formData.services.length <= 0) {
        $toast.error("Please provide atleast 1 service.");
        return false;
      }

      if (props.edit) {
        let payload = {};

        $_.forEach(dirtyFieldValidator, (isDirty, key) => {
          if (isDirty) {
            payload[key] = values[key];
          }
        });

        if (!$_.isEqual(formData.services, initialServicesValues)) {
          payload["services"] = formData.services;
        }

        if (
          !$_.isEqual(
            formData.approval_heirarchy,
            initialApprovalHeirarchyValues
          )
        ) {
          payload["approval_heirarchy"] = formData.approval_heirarchy;
        }

        await props.submitHandler(payload);
      } else {
        // we append approval heirarchy and services on this point
        // because there values were not mutated on the form value
        values["approval_heirarchy"] = formData.approval_heirarchy;
        values["services"] = formData.services;
        await props.submitHandler(values);
      }
    }

    return {
      formData,
      serviceName,
      serviceDescription,
      dirtyFieldValidator,
      selectedApprover,
      approverOptions,
      fetchingApproverOptions,
      searchUser,
      addService,
      removeService,
      addApprover,
      removeApprover,
      setAsSignatory,
      moveTarget,
      onSubmit,
    };
  },
};
</script>

<style lang="postcss" scoped>
.business {
  @apply flex justify-center;

  &__form {
    @apply flex flex-col gap-[24px] px-4 pt-4 pb-10;

    .col__fixed {
      @apply grid grid-cols-2 gap-[12px];
    }

    .col__auto {
      @apply flex flex-row gap-5 items-end;
    }

    span {
      @apply pl-[10px];
      @apply font-medium text-sm;
    }

    .services {
      @apply flex justify-between rounded shadow-md;
      @apply p-5;
      &__details {
        @apply flex flex-col;
      }

      .details__default_badge {
        @apply text-sm font-medium rounded py-0.5 px-1;
        @apply text-purple-800;
      }

      .details__service_info {
        @apply ml-1 text-sm font-medium;
      }
    }
    .heirarchy {
      @apply flex justify-between rounded shadow-md;
      @apply p-5;
      &__details {
        @apply flex flex-col;

        .details__default_badge {
          @apply text-sm font-medium rounded py-0.5 px-1;
          @apply text-gray-800;
        }
        .type__approver_badge {
          @apply text-sm font-medium rounded py-0.5 px-1;
          @apply text-green-800;
        }

        .type__signatory_badge {
          @apply text-sm font-medium rounded py-0.5 px-1;
          @apply text-blue-800;
        }
        .type__signatory_action {
          @apply text-xs text-blue-800;
          @apply cursor-pointer;
          &:hover {
            @apply text-gray-500;
          }
        }

        .details__approver_info {
          @apply ml-1 text-sm font-medium;
        }
      }
      &__actions {
        @apply flex flex-row gap-4;
      }

      .details__fixed {
        @apply text-xs text-gray-400;
      }
    }
  }

  &__footer {
    @apply flex flex-col items-end px-4 pb-4;
  }

  .col__button {
    @apply mt-[28px];
  }
}
</style>
