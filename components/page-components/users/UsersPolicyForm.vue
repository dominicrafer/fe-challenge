<template>
  <VeeForm @submit="submitHandler" v-slot="{isSubmitting}">
    <div class="policy">
      <Container :loading="isLoading" padding="p-0" width="w-1/2">
        <SectionTitle title="Policy Details" class="rounded-t-sm" />
        <div class="policy__form">
          <InputField
            name="policy"
            placeholder="Enter Text"
            v-model="formData.policy"
          >
            <template #label> Name </template>
          </InputField>
          <Select
            v-model="formData.actions"
            name="actions"
            class="w-1/2"
            :multiple="true"
            :options="actionOptions"
            @addTag="addTag"
            trackBy="value"
            label="label"
            taggable
            searchable
            :closeOnSelect="false"
          >
            <template #label> Actions </template>
          </Select>
          <div class="form__footer">
            <Button variant="success" type="submit" :loading="isSubmitting">Save</Button>
          </div>
        </div>
      </Container>
    </div>
  </VeeForm>
</template>

<script>
import { Form as VeeForm } from "vee-validate";
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
      type: Function
    }
  },
  setup(props, { emit }) {
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
    let formData = reactive({
      policy: null,
      actions: [{ label: "Delete", value: "delete" }],
    });
    async function submitHandler(values) {
      await props.submitHandler({
        ...values,
        actions: $_.map(values.actions, "value"),
      })
    }

    const addTag = (newOption) => {
      actionOptions.push(newOption);
      formData.actions.push(newOption)
    };

    return {
      actionOptions,
      formData,
      submitHandler,
      addTag,
    };
  },
  components: {
    VeeForm,
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
