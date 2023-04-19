<template>
  <div class="page">
    <PageHeader backRoute="/users/roles" title="Create Role" />
    <div class="page__body">
      <ErrorList :errors="errors" v-show="!$_.isEmpty(errors)" />
      <UsersRoleForm
        :submitHandler="submitHandler"
        :isLoading="isLoading"
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
  setup(props) {
    let errors = ref(null);
    let isLoading = ref(false);
    const form = ref(null);
    async function submitHandler(data) {
      const { $api, $toast } = useNuxtApp();
      isLoading.value = true;
      const { error } = await $api.roles.createRole(data);
      isLoading.value = false;
      if (!error.value) {
        const router = useRouter();
        router.push("/users/roles");
        $toast.success("Role successfully created.");
      } else {
        errors.value = error.value.data.errors;
        form.value.allowRouteLeave = false;
        const errorList = document.getElementById("error-list");
        setTimeout(() => {
          errorList.scrollIntoView();
        }, 200);
      }
    }
    return { submitHandler, errors, isLoading, form };
  },
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>