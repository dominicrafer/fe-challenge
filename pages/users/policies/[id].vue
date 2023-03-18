<template>
  <div class="page">
    <PageHeader backRoute="/users/policies" title="Policies" />
    <div class="page__body">
      <UsersPolicyForm
        :isLoading="pending"
        :policyDetails="policyDetails"
        :submitHandler="submitHandler"
        :key="pending"
        edit
      />
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: "default",
});
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  async setup(props) {
    const { $api, $_ } = useNuxtApp();
    const route = useRoute();
    const policyDetails = reactive({
      policy: null,
      description: null,
      actions: [],
    });
    const { data: policies, pending } = await $api.policies.getPolicyDetails(
      route.params.id
    );
    watch(
      policies,
      (newPolicies) => {
        policyDetails.policy = newPolicies.resource.policy;
        policyDetails.description = newPolicies.resource.description;
        policyDetails.actions = $_.map(
          newPolicies.resource.actions,
          (actionDetails) => {
            return {
              label: actionDetails.action,
              value: actionDetails.action,
            };
          }
        );
      },
      { deep: true }
    );


    async function submitHandler(data) {
      const { $api, $toast } = useNuxtApp();
      try {
        const router = useRouter();
        const route = useRoute();
        await $api.policies.updatePolicy(route.params.id, data);
        router.push("/users/policies");
        $toast.success("Policy successfully updated.");
        router.push();
      } catch (error) {
        console.log(error);
      }
    }
    return {
      pending,
      policyDetails,
      submitHandler,
    };
  },
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>