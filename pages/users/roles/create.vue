<template>
  <div class="page">
    <PageHeader backRoute="/users" title="Roles">
      <template #right-panel>
        <Button variant="success">Save</Button>
      </template>
    </PageHeader>
    <div class="page__body">
      <UsersRoleForm :submitHandler="submitHandler" />
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
      await $api.roles.createRole(data).then(() => {
        const router = useRouter();
        router.push("/users/roles");
        $toast.success("Policy successfully created.");
      }).catch(() => {
        console.log('err')
      });
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