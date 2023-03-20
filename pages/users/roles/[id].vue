<template>
  <div class="page">
    <PageHeader backRoute="/users/roles" title="Roles" />
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
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  async setup(props) {
    const { $api } = useNuxtApp();
    const route = useRoute();
    const roleDetails = reactive({
      role: null,
      description: null,
      policies: [],
    });
    const { data: roles, pending } = await $api.roles.getRoleDetails(
      route.params.id
    );
    watch(
      roles,
      (role) => {
        roleDetails.role = role.resource.role;
        roleDetails.description = role.resource.description;
        roleDetails.policies = role.resource.policies;
      },
      { deep: true }
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