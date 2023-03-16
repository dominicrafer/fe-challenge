<template>
  <div class="page">
    <PageHeader backRoute="/users/policies" title="Policies" />
    <div class="page__body">
      <UsersPolicyForm :submitHandler="submitHandler" />
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
    async function submitHandler(data) {
      const { $api, $toast } = useNuxtApp();
      try {
        await $api.policies.createPolicy(data);
        const router = useRouter();
        router.push("/users/policies");
        $toast.success("Policy successfully created.");
        router.push();
      } catch (error) {
        console.log(error);
      }
    }
    return { submitHandler };
  },
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>
