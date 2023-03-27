<template>
  <div class="role">
    <Container :loading="isLoading" padding="p-0" width="w-1/2" :key="String(pending && isLoading)">
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
          <Spinner class="m-auto" v-if="pending" />
          <div class="form__col"></div>
          <Checkbox
            v-if="!pending"
            inputValue="*:*"
            label="Select All"
            id="actions"
            name="policies"
            @change="selectAllPolicies"
            v-model="formData.policies"
          />
          <div
            v-show="!pending"
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
                @change="selectPolicy"
                name="policies"
                v-model="formData.policies"
                v-model:isDirty="dirtyFieldValidator.policies"
                v-for="(
                  policyActionDetails, actionIndex
                ) in policyDetails.policies"
                :key="actionIndex"
              />
            </div>
          </div>
          <div class="role__footer">
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
import Button from "~~/components/base/form/Button.vue";
export default {
  components: { Button },
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
  setup(props) {
    const { $api, $_ } = useNuxtApp();
    const formData = reactive(props.roleDetails);
    const dirtyFieldValidator = reactive({
      role: false,
      description: false,
      policies: false,
    });
    const {
      data: policies,
      pending,
      refresh,
    } = $api.policies.getAllPolicies(!props.edit);
    watch(
      () => props.isLoading,
      () => {
        refresh();
      }
    );
    watch(
      policies,
      () => {
        mapToFormData(props.roleDetails);
      },
      { deep: true }
    );
    function mapToFormData() {
      console.log(props.roleDetails.policies, "props.roleDetails.policies");
      if ($_.includes(props.roleDetails.policies, "*:*")) {
        let allPolicies = ["*:*"];
        $_.forEach(policies.value.resource, (policyGroup) => {
          $_.forEach(policyGroup.policies, (action) => {
            allPolicies.push(action.slug);
          });
        });
        formData.policies = allPolicies;
      }
    }
    // watch(
    //   formData,
    //   (form) => {
    //     if ($_.includes(form.policies, '*:*')) {
    //       console.log('select all')
    //       selectAllPolicies();
    //     }
    //   },
    //   { deep: true }
    // );
    function selectPolicy(e) {
      console.log(e);
      if (!e.target.checked && $_.includes(formData.policies, "*:*")) {
        formData.policies = $_.pull(formData.policies, "*:*");
      }
    }
    function selectAllPolicies(e) {
      if (e.target.checked) {
        let allPolicies = [];
        $_.forEach(policies.value.resource, (policyGroup) => {
          $_.forEach(policyGroup.policies, (action) => {
            allPolicies.push(action.slug);
          });
        });
        allPolicies.push("*:*");
        formData.policies = allPolicies;
      } else {
        formData.policies = [];
      }
    }
    async function onSubmit(values) {
      if (props.edit) {
        let payload = {};

        $_.forEach(dirtyFieldValidator, (isDirty, key) => {
          if (isDirty) {
            payload[key] = values[key];
          }
        });
        await props.submitHandler(
          parsePayload({
            ...payload,
            policies: values.policies,
          })
        );
      } else {
        props.submitHandler(parsePayload(values));
      }
    }
    function parsePayload(payload) {
      let parsedPayload = {
        role: payload.role,
        description: payload.description,
        policies: $_.includes(payload.policies, "*:*")
          ? ["*:*"]
          : payload.policies,
      };
      return parsedPayload;
    }
    return {
      pending,
      policies,
      formData,
      dirtyFieldValidator,
      selectPolicy,
      onSubmit,
      selectAllPolicies,
    };
  },
};
</script>

<style lang="postcss" scoped>
.role {
  @apply flex justify-center;

  &__form {
    @apply flex flex-col gap-[24px] px-4 pt-4 pb-4;
    .form__policy {
      @apply flex flex-col gap-4 text-[1rem];
      .policy__name {
        @apply font-bold;
      }
      .policy__actions {
        @apply flex gap-10;
      }
    }

    .form__col {
      @apply flex gap-[10px];
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
