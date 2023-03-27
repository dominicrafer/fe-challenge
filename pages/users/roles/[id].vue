<template>
  <div class="page">
    <PageHeader backRoute="/users/roles" title="Edit Role" />
    <div class="page__body">
      <UsersRoleForm
        :roleDetails="roleDetails"
        :submitHandler="submitHandler"
        :isLoading="pending"
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
  async setup(props) {
    const { $api, $_ } = useNuxtApp();
    const route = useRoute();
    let roleDetails = {
      role: null,
      description: null,
      policies: [],
    };
    const { data, pending } = $api.roles.getRoleDetails(
      route.params.id,
      roleDetails
    );
    watch(
      () => data.value,
      (policies) => {
        console.log(policies, 'policies')
        roleDetails.role = policies.resource?.role;
        roleDetails.description = policies.resource?.description;
        roleDetails.policies = policies.resource?.policies;
      }
    );

    async function submitHandler(data) {
      const { $api, $toast } = useNuxtApp();
      try {
        const router = useRouter();
        const route = useRoute();
        await $api.roles.updateRole(route.params.id, data);
        router.push("/users/roles");
        $toast.success("Role successfully updated.");
        router.push();
      } catch (error) {
        console.log(error);
      }
    }
    return {
      pending,
      roleDetails,
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