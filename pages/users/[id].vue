<template>
  <div class="page">
    <PageHeader backRoute="/users" title="Edit User" />
    <div class="page__body">
      <ErrorList :errors="errors" v-show="!$_.isEmpty(errors)" />
      <UsersForm
        :userDetails="userDetails"
        :isLoading="pending"
        edit
        :submitHandler="submitHandler"
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
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  async setup(props) {
    const { $api, $_, $toast } = useNuxtApp();
    const route = useRoute();
    const { data, pending } = await $api.users.getUserDetails(route.params.id);
    const form = ref(null);
    let userDetails = {
      first_name: data.value.resource.first_name,
      last_name: data.value.resource.last_name,
      password: data.value.resource.email,
      email: data.value.resource.email,
      phone_number: data.value.resource.phone_number,
      role: {
        label: data.value.resource.role,
        value: data.value.resource.role,
      },
    };
    let errors = ref(null);
    async function submitHandler(data) {
      const { error } = await $api.users.updateUser(route.params.id, data);
      if (!error.value) {
        const router = useRouter();
        router.push("/users");
        $toast.success("Role successfully updated.");
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
      userDetails,
      pending,
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