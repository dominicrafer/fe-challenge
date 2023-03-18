<template>
  <div class="policy">
    <Container :loading="isLoading" padding="p-0" width="w-1/2">
      <VForm @submit="onSubmit" v-slot="{ isSubmitting }">
        <SectionTitle title="Policy Details" class="rounded-t-sm" />
        <div class="policy__form">
          <InputField
            class="w-1/2"
            name="policy"
            placeholder="Enter Text"
            v-model:modelValue="formData.policy"
            v-model:isDirty="dirtyFieldValidator.policy"
            :disabled="edit"
            rules="required|alpha_number"
          >
            <template #label> Name </template>
          </InputField>
          <Textarea
            v-model:modelValue="formData.description"
            v-model:isDirty="dirtyFieldValidator.description"
            name="description"
            label="Description"
            placeholder="Enter description"
            :rules="edit ? null : 'required'"
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
            rules="required"
          >
            <template #label> Actions </template>
          </Select>
          <div class="form__footer">
            <Button variant="success" type="submit" :loading="isSubmitting"
              >Save</Button
            >
          </div>
        </div>
      </VForm>
    </Container>
  </div>
</template>

<script>
import { useForm } from "vee-validate";
definePageMeta({
  layout: "default",
});
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    submitHandler: {
      type: Function,
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
  },

  setup(props) {
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
    async function onSubmit(values) {
      if (props.edit) {
        let payload = {};

        $_.forEach(dirtyFieldValidator, (isDirty, key) => {
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

    const addTag = (newOption) => {
      actionOptions.push(newOption);
      formData.actions.push(newOption);
    };
    return {
      dirtyFieldValidator,
      actionOptions,
      formData,
      onSubmit,
      addTag,
    };
  },
};
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

  .form__footer {
    @apply self-end justify-self-end;
  }

  .col__button {
    @apply mt-[28px];
  }
}
</style>
