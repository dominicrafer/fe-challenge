<template>
  <div class="role">
    <Container
      :loading="isLoading"
      padding="p-0"
      width="w-1/2"
      :key="String(isPolicyFetching && isLoading)"
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
            rules="no_spaces|max:128"
            v-model="formData.role"
            v-model:isDirty="dirtyFieldValidator.role"
            :disabled="edit"
          >
            <template #label> Role </template>
          </InputField>
          <Textarea
            name="description"
            label="Description"
            placeholder="Enter Text"
            rules="max:255"
            v-model="formData.description"
            v-model:isDirty="dirtyFieldValidator.description"
          />
        </div>
        <SectionTitle title="Policies" class="rounded-t-sm" />
        <div class="role__form">
          <Spinner class="m-auto" v-if="isPolicyFetching" />
          <div class="form__col"></div>
          <Checkbox
            v-if="!isPolicyFetching"
            inputValue="*:*"
            label="Select All"
            id="actions"
            name="policies"
            @change="selectAllPolicies"
            v-model="formData.policies"
          />
          <div
            v-show="!isPolicyFetching"
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
                @change="
                  ($event) =>
                    selectPolicy($event, policyDetails, policyActionDetails)
                "
                name="policies"
                v-model="formData.policies"
                v-model:isDirty="dirtyFieldValidator.policies"
                v-for="(policyActionDetails, actionIndex) in [
                  ...policyDetails.policies,
                  {
                    slug: `${$_.toLower(policyDetails.policy_group_name)}:*`,
                    action: 'All',
                  },
                ]"
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
    const isPolicyFetching = ref(false);
    // only execute once the fetching of role details finishes
    const {
      data: policies,
      execute,
      pending,
    } = $api.policies.getAllPolicies(!props.edit);
    watch(
      () => props.isLoading,
      async () => {
        isPolicyFetching.value = true;
        await execute();
        isPolicyFetching.value = false;
      }
    );
    watch(
      policies,
      () => {
        mapToFormData(props.roleDetails);
      },
      { deep: true }
    );
    function mapToFormData(roleDetails) {
      if ($_.includes(roleDetails.policies, "*:*")) {
        let allPolicies = ["*:*"];
        $_.forEach(policies.value.resource, (policyGroup) => {
          $_.forEach(policyGroup.policies, (action) => {
            allPolicies.push(action.slug);
          });
        });
        formData.policies = allPolicies;
      } else {
        $_.forEach(roleDetails.policies, (slug) => {
          const action = $_.split(slug, ":");
          if (action[1] === "*") {
            const policyGroup = $_.find(policies.value.resource, {
              policy_group_name: $_.startCase(action[0]),
            });
            formData.policies = [
              ...formData.policies,
              ...$_.map(policyGroup.policies, "slug"),
            ];
          }
        });
      }
    }

    // Select policy behaviour
    function selectPolicy(e, policyGroup, policyActionDetails) {
      const action = $_.split(policyActionDetails.slug, ":");
      if (e.target.checked) {
        switch (action[1]) {
          case "delete":
          case "export":
          case "write":
          case "edit":
            formData.policies.push(`${action[0]}:read`, `${action[0]}:list`);
            break;
          case "read":
            formData.policies.push(`${action[0]}:list`);
            break;
          case "*":
            formData.policies = [
              ...formData.policies,
              ...$_.map(policyGroup.policies, "slug"),
            ];
            break;
        }
        // if all module's policy is selected, automatically tick 'All' checkbox
        if (
          !$_.difference(
            $_.map(policyGroup.policies, "slug"),
            $_.pull(
              formData.policies,
              `${$_.toLower(policyGroup.policy_group_name)}:*`
            )
          ).length
        ) {
          formData.policies.push(
            `${$_.toLower(policyGroup.policy_group_name)}:*`
          );
        }
        formData.policies = $_.uniq(formData.policies);
      } else {
        // if All Module's Policy is unselected
        if (action[1] === "*") {
          formData.policies = $_.difference(
            formData.policies,
            $_.map(policyGroup.policies, "slug")
          );
        }
        switch (action[1]) {
          case "list":
            formData.policies = $_.pull(
              formData.policies,
              `${action[0]}:read`,
              `${action[0]}:write`,
              `${action[0]}:export`,
              `${action[0]}:delete`,
              `${action[0]}:edit`,
            );
            break;
          case "delete":
          case "export":
          case "write":
            formData.policies = $_.pull(
              formData.policies,
              `${action[0]}:read`,
              `${action[0]}:list`
            );
            console.log(formData.policies, `${action[0]}:read`);
            break;
          case "*":
            formData.policies = $_.difference(
              formData.policies,
              $_.map(policyGroup.policies, "slug")
            );
            break;
        }
        formData.policies = $_.pull(
          formData.policies,
          `${$_.toLower(policyGroup.policy_group_name)}:*`
        );
      }
    }
    function selectAllPolicies(e) {
      if (e.target.checked) {
        let allPolicies = [];
        $_.forEach(policies.value.resource, (policyGroup) => {
          allPolicies.push(`${$_.toLower(policyGroup.policy_group_name)}:*`);
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
            payload[key] =
              key === "policies" ? filterPolicies(values[key]) : values[key];
          }
        });
        await props.submitHandler(parsePayload(payload));
      } else {
        props.submitHandler(parsePayload(values));
      }
    }

    function filterPolicies(policies) {
      const modulesWithAllPolicySelected = $_.filter(policies, (policy) => {
        const action = $_.split(policy, ":");
        return action[0] !== "*" && action[1] === "*";
      });
      let filteredPolicies = policies;
      $_.forEach(modulesWithAllPolicySelected, (policy) => {
        const action = $_.split(policy, ":");

        filteredPolicies = $_.filter(
          filteredPolicies,
          (slug) => !$_.includes(slug, `${action[0]}:`)
        );
      });
      return [...filteredPolicies, ...modulesWithAllPolicySelected];
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
      isPolicyFetching,
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
        @apply flex gap-10  flex-wrap;
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
