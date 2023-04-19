<template>
  <div class="page">
    <PageHeader backRoute="/users" title="Create User" />
    <div class="page__body">
      <ErrorList :errors="errors" v-show="!$_.isEmpty(errors)" />
      <UsersForm
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
    const form = ref(null);
    let errors = ref(null);
    let isLoading = ref(false);
    async function submitHandler(data) {
      const { $api, $toast } = useNuxtApp();
      isLoading.value = true;
      const { error } = await $api.users.createUser(data);
      isLoading.value = false;
      if (!error.value) {
        const router = useRouter();
        router.push("/users");
        $toast.success("User successfully created.");
      } else {
        errors.value = error.value.data.errors;
        form.value.allowRouteLeave = false;
        const errorList = document.getElementById("error-list");
        setTimeout(() => {
          errorList.scrollIntoView();
        }, 200);
      }
    }
    return {
      submitHandler,
      isLoading,
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