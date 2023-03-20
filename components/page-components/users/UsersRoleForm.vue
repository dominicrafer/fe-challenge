<template>
  <div class="role">
    <Container
      :loading="pending"
      padding="p-0"
      width="w-1/2"
      :key="pending || isLoading"
    >
      <VForm
        @submit="onSubmit"
        v-slot="{ isSubmitting }"
        :initialValues="roleDetails"
      >
        <SectionTitle title="Role Details" class="rounded-t-sm" />
        <div class="role__form">
          <InputField
            class="w-1/2"
            name="role"
            placeholder="Enter Text"
            v-model="formData.role"
            v-model:isDirty="dirtyFieldValidator.role"
          >
            <template #label> Role </template>
          </InputField>
          <Textarea
            name="description"
            label="Description"
            placeholder="Enter Text"
            v-model="formData.description"
            v-model:isDirty="dirtyFieldValidator.description"
          />
        </div>
        <SectionTitle title="Policies" class="rounded-t-sm" />
        <div class="role__form">
          <div
            class="form__policy"
            v-for="(policyDetails, index) in policies?.resource"
            :key="index"
          >
            <span class="policy__name">{{
              policyDetails.policy_group_name
            }}</span>
            <div class="policy__actions">
              <Checkbox
                :id="policyActionDetails.slug"
                :inputValue="policyActionDetails.slug"
                :label="$_.startCase(policyActionDetails.action)"
                name="actions"
                v-model="formData.policies"
                v-model:isDirty="dirtyFieldValidator.policies"
                v-for="(
                  policyActionDetails, actionIndex
                ) in policyDetails.policies"
                :key="actionIndex"
              />
            </div>
          </div>
        </div>
        <div class="role__footer">
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
    roleDetails: {
      type: Object,
      default() {
        return {
          role: null,
          description: null,
          policies: [],
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
  async setup(props) {
    const { $api, $_ } = useNuxtApp();
    const formData = reactive(props.roleDetails);

    const dirtyFieldValidator = reactive({
      role: false,
      description: false,
      policies: false,
    });
    const { data: policies, pending } = await $api.policies.getAllPolicies();

    async function onSubmit(values) {
      if (props.edit) {
        let payload = {};

        $_.forEach(dirtyFieldValidator, (isDirty, key) => {
          console.log(isDirty, key);
          if (isDirty) {
            payload[key] = values[key];
          }
        });
        // await props.submitHandler(payload);
      } else {
        try {
          await props.submitHandler(values);
        } catch (error) {
          console.log("WAAATT");
        }
      }
    }
    return { formData, dirtyFieldValidator, policies, pending, onSubmit };
  },
};
</script>

<style lang="postcss" scoped>
.role {
  @apply flex justify-center;

  &__form {
    @apply flex flex-col gap-[24px] px-4 pt-4 pb-10;
    .form__policy {
      @apply flex flex-col gap-4 text-[1rem];
      .policy__name {
        @apply font-bold;
      }
      .policy__actions {
        @apply flex gap-10;
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