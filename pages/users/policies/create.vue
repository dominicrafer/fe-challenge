<template>
  <div class="page">
    <PageHeader backRoute="/users/policies" title="Create Policy" />
    <div class="page__body">
      <ErrorList :errors="errors" v-show="!$_.isEmpty(errors)" />
      <UsersPolicyForm :submitHandler="submitHandler" ref="form" />
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

  setup(props) {
    const form = ref(null);
    let errors = ref(null);
    async function submitHandler(data) {
      const { $api, $toast } = useNuxtApp();
      const { error } = await $api.policies.createPolicy(data);

      if (!error.value) {
        const router = useRouter();
        router.push("/users/policies");
        $toast.success("Policy successfully created.");
      } else {
        errors.value = error.value.data.errors;
        form.value.allowRouteLeave = false;
        const errorList = document.getElementById("error-list");
        setTimeout(() => {
          errorList.scrollIntoView();
        }, 200);
      }
    }
    return { submitHandler, errors, form };
  },
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>
