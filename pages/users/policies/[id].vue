<template>
  <div class="page">
    <PageHeader backRoute="/users/policies" title="Edit Policy" />
    <div class="page__body">
      <ErrorList :errors="errors" v-show="!$_.isEmpty(errors)" />
      <UsersPolicyForm
        :isLoading="pending"
        :policyDetails="policyDetails"
        :submitHandler="submitHandler"
        edit
        ref="form"
      />
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: "default",
});
export default {
  async setup(props) {
    const { $api, $_ } = useNuxtApp();
    const route = useRoute();
    const { data, pending } = await $api.policies.getPolicyDetails(
      route.params.id
    );
    const form = ref(null);
    let errors = ref(null);
    let policyDetails = {
      policy: data.value.resource.policy,
      description: data.value.resource.description,
      actions: $_.map(data.value.resource.actions, (actionDetails) => {
        return {
          label: actionDetails.action,
          value: actionDetails.action,
        };
      }),
    };

    async function submitHandler(data) {
      const { $api, $toast } = useNuxtApp();
      const { error } = await $api.policies.updatePolicy(route.params.id, data);
      if (!error.value) {
        const router = useRouter();
        router.push("/users/policies");
        $toast.success("Policy successfully updated.");
      } else {
        errors.value = error.value.data.errors;
        if (error.value.data.errorCode !== "SERVER_ERROR") {
          form.value.allowRouteLeave = false;
        }
        const errorList = document.getElementById("error-list");
        setTimeout(() => {
          errorList.scrollIntoView();
        }, 200);
      }
    }
    return {
      pending,
      policyDetails,
      submitHandler,
      errors,
      form,
    };
  },
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>
