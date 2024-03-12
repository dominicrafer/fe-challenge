<template>
  <div class="policy">
    <Container :loading="isLoading" padding="p-0" :key="String(isLoading)">
      <VForm
        @submit="onSubmit"
        v-slot="{ isSubmitting }"
        :initialValues="policyDetails"
      >
        <SectionTitle title="Policy Details" class="rounded-t-sm" />
        <div class="policy__form">
          <InputField
            class="w-1/2"
            name="policy"
            placeholder="Enter Text"
            v-model:modelValue="formData.policy"
            v-model:isDirty="dirtyFieldValidator.policy"
            :disabled="edit"
            rules="required|max:128"
          >
            <template #label> Name </template>
          </InputField>
          <InputField
            type="textarea"
            v-model:modelValue="formData.description"
            v-model:isDirty="dirtyFieldValidator.description"
            name="description"
            label="Description"
            placeholder="Enter description"
            :rules="edit ? { required: false } : 'required|max:255'"
          />
          <Select
            v-model:modelValue="formData.actions"
            v-model:isDirty="dirtyFieldValidator.actions"
            name="actions"
            :multiple="true"
            :options="actionOptions"
            @addTag="addTag"
            trackBy="value"
            label="label"
            taggable
            searchable
            :closeOnSelect="false"
            rules="select_required"
          >
            <template #label> Actions </template>
          </Select>
        </div>
        <div class="policy__footer">
          <Button
            color="positive"
            type="submit"
            label="Save"
            :loading="isSubmitting"
          ></Button>
        </div>
      </VForm>
      <ConfirmationDialog
        :title="`${edit ? 'Cancel Updating Policy' : 'Cancel Policy Creation'}`"
        v-model="leaveWarningModalVisible"
        @close="leaveWarningModalVisible = false"
        @confirm="confirmLeave"
      >
        <template #message
          >Are you sure you want to cancel
          {{ edit ? "updating" : "creating" }} this policy? Changes will not be
          saved.</template
        >
      </ConfirmationDialog>
    </Container>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  submitHandler: {
    type: Function,
    required: true,
  },
  policyDetails: {
    type: Object,
    default() {
      return {
        policy: null,
        description: null,
        actions: [],
      };
    },
  },
  edit: {
    type: Boolean,
    default: false,
  },
});
const leaveWarningModalVisible = ref(false);
const leaveRoute = ref<any>(null);
const allowRouteLeave = ref(false);
onBeforeRouteLeave((to, from, next) => {
  if (allowRouteLeave.value) {
    next();
  } else {
    leaveWarningModalVisible.value = true;
    leaveRoute.value = to;
  }
});
const { $_ } = useNuxtApp();
const actionOptions = [
  {
    label: "Read",
    value: "read",
  },
  {
    label: "List",
    value: "list",
  },
  {
    label: "Write",
    value: "write",
  },
  {
    label: "Delete",
    value: "delete",
  },
  {
    label: "Export",
    value: "export",
  },
];
const dirtyFieldValidator = reactive({
  policy: false,
  description: false,
  actions: false,
});
const formData = reactive(props.policyDetails);
async function onSubmit(values: any) {
  allowRouteLeave.value = true;
  if (props.edit) {
    let payload: any = {};

    $_.forEach(dirtyFieldValidator, (isDirty: boolean, key: any) => {
      if (isDirty) {
        payload[key] =
          key === "actions"
            ? $_.map(values.actions, (action) => action.value)
            : values[key];
      }
    });
    await props.submitHandler(payload);
  } else {
    await props.submitHandler({
      ...values,
      actions: $_.map(values.actions, (action) => action.value),
    });
  }
}

const addTag = (newOption: any) => {
  actionOptions.push(newOption);
  formData.actions.push(newOption);
};

function confirmLeave() {
  const router = useRouter();
  leaveWarningModalVisible.value = false;
  allowRouteLeave.value = true;
  router.push(leaveRoute.value);
}
</script>

<style lang="postcss" scoped>
.policy {
  @apply flex justify-center;

  &__form {
    @apply flex flex-col gap-[24px] px-4 pt-4 pb-4;
  }

  .form__col {
    @apply grid grid-cols-2 gap-[10px];
  }

  .col__button {
    @apply mt-[28px];
  }

  &__footer {
    @apply flex flex-col items-end px-4 pb-4;
  }
}
</style>
