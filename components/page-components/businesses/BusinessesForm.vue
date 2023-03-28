<template>
  <div class="business">
    <Container :loading="pending" padding="p-0" width="w-1/2">
      <VForm
        @submit="onSubmit"
        v-slot="{ isSubmitting }"
        :initialValues="businessDetails"
      >
        <SectionTitle title="Business Details" class="rounded-t-sm" />
        <div class="business__form">
          <InputField
            class="w-1/2"
            name="business"
            placeholder="Enter Text"
            v-model="formData.business"
            v-model:isDirty="dirtyFieldValidator.business"
            rules="required"
          >
            <template #label> Business Name </template>
          </InputField>
          <Textarea
            name="address"
            label="Address"
            placeholder="Enter Text"
            v-model="formData.address"
            v-model:isDirty="dirtyFieldValidator.address"
            :rules="edit ? null : 'required'"
          />

          <span>Services</span>
          <template v-for="(service, index) in formData.services">
            <div class="col__auto">
              <InputField
                class="w-1/2"
                :name="`services[${index}].name`"
                placeholder="Enter Text"
                v-model="formData.services[index].name"
                v-model:isDirty="dirtyFieldValidator.services[index].name"
                rules="required"
              >
                <template #label> Service Name </template>
              </InputField>
              <InputField
                class="w-full"
                :name="`services[${index}].description`"
                placeholder="Enter Text"
                v-model="formData.services[index].description"
                v-model:isDirty="
                  dirtyFieldValidator.services[index].description
                "
                rules="required"
              >
                <template #label> Description </template>
              </InputField>
              <div>
                <Icon
                  v-if="formData.services.length > 1"
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
          <div class="flex flex-col items-end px-4 pb-4">
            <Button variant="success" @click="addService()">Add</Button>
          </div>
        </div>
        <SectionTitle title="Invoice Settings" class="rounded-t-sm" />
        <div class="business__form">
          <InputField
            class="w-1/2"
            name="invoice_number_template"
            placeholder="Enter Text"
            v-model="formData.invoice_number_template"
            v-model:isDirty="dirtyFieldValidator.invoice_number_template"
            rules="required"
          >
            <template #label> Invoice Number Template </template>
          </InputField>
          <div class="col__fixed">
            <InputField
              name="tin"
              placeholder="Enter Text"
              v-model="formData.tin"
              v-model:isDirty="dirtyFieldValidator.tin"
              rules="required"
            >
              <template #label> TIN </template>
            </InputField>
            <InputField
              name="tax"
              placeholder="Enter Text"
              v-model="formData.tax"
              v-model:isDirty="dirtyFieldValidator.tax"
              rules="required"
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
              rules="required"
            >
              <template #label> Due Date Duration </template>
            </InputField>
            <InputField
              name="follow_up_intervals"
              placeholder="Enter Text"
              v-model="formData.follow_up_intervals"
              v-model:isDirty="dirtyFieldValidator.follow_up_intervals"
              rules="required"
            >
              <template #label> Follow Up Intervals </template>
            </InputField>
          </div>
          <span>Approval Heirarchy</span>
          <template v-for="(approver, index) in formData.approval_heirarchy">
            <div
              class="col__auto"
              :key="index"
              v-if="
                ['creator', 'account_manager'].includes(
                  formData.approval_heirarchy[index].type
                )
              "
            >
              <InputField
                class="w-full"
                :name="`approver[${index}].type`"
                placeholder="Enter Text"
                rules="required"
                v-model="formData.approval_heirarchy[index].type"
                disabled
              >
                <template #label> Approver </template>
              </InputField>
            </div>
            <div class="col__auto" v-else :key="`dynamic-field-${index}`">
              <Select
                class="w-full"
                v-model="formData.approval_heirarchy[index].type"
                :name="`approver[${[index]}].type`"
                :options="approverOptions"
                trackBy="value"
                label="label"
                searchable
                :closeOnSelect="true"
                @asyncSearch="searchUser"
                rules="required"
              >
                <template #label> Approver </template>
              </Select>
              <div>
                <Icon
                  width="20"
                  height="20"
                  color="#E45959"
                  name="material-symbols:delete-outline"
                  class="cursor-pointer"
                />
              </div>
            </div>
          </template>
          <div class="flex flex-col items-end px-4 pb-4">
            <Button variant="success" @click="addApprover()">Add</Button>
          </div>
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
          address: null,
          services: [
            {
              name: null,
              description: null,
            },
          ],
          approval_heirarchy: [
            {
              type: "account_manager",
            },
            {
              type: "creator",
            },
          ],
          due_date_duration: 15,
          follow_up_intervals: 3,
          invoice_number_template: null,
          tax: null,
          tin: null,
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
    const formData = reactive(props.businessDetails);
    const approverOptions = ref([]);

    const dirtyFieldValidator = reactive({
      business: false,
      address: false,
      services: [
        {
          name: false,
          description: false,
        },
      ],
      approval_heirarchy: false,
      due_date_duration: false,
      follow_up_intervals: false,
      invoice_number_template: false,
      tax: false,
      tin: false,
    });

    function addService() {
      dirtyFieldValidator.services.push({
        name: null,
        description: null,
      });
      formData.services.push({
        name: null,
        description: null,
      });
    }
    function removeService(index) {
      dirtyFieldValidator.services = dirtyFieldValidator.services.filter(
        (item, itemIndex) => itemIndex !== index
      );
      formData.services = formData.services.filter(
        (item, itemIndex) => itemIndex !== index
      );
    }

    function addApprover() {
      formData.approval_heirarchy.splice(
        formData.approval_heirarchy.length - 1,
        0,
        { cognito_id: null, email: null, name: null, type: null }
      );
    }

    function searchUser(value) {
      console.log(value);
      approverOptions.value = [
     
        {
          label: `Jewel 2 | jewel.reventar2@ecloudvalley.com`,
          value: {
            cognito_id: "UUID",
            email: "jewel.reventar2@ecloudvalley.com",
            name: "Jewel 2",
            type: "approver",
          },
        },
        {
          label: `Jewel 2 | jewel.reventar2@ecloudvalley.com`,
          value: {
            cognito_id: "UUID",
            email: "jewel.reventar2@ecloudvalley.com",
            name: "Jewel 2",
            type: "approver",
          },
        },
      ];
    }

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
        props.submitHandler(values);
      }
    }
    return {
      formData,
      dirtyFieldValidator,
      approverOptions,
      searchUser,
      onSubmit,
      addService,
      removeService,
      addApprover,
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
  }

  &__footer {
    @apply flex flex-col items-end px-4 pb-4;
  }

  .col__button {
    @apply mt-[28px];
  }
}
</style>
