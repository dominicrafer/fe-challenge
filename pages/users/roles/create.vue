<template>
  <div class="page">
    <PageHeader backRoute="/users/roles" title="Create Role"/>
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
      try {
        await $api.roles.createRole(data).then((response) => {
          console.log(response);
          const router = useRouter();
          router.push("/users/roles");
          $toast.success("Role successfully created.");
        });
      } catch (error) {
        console.log(error)
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