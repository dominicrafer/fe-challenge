<template>
  <div class="page">
    <PageHeader backRoute="/users" title="Users" />
    <div class="page__body">
      <UsersForm
        :userDetails="userDetails"
        :isLoading="pending"
        edit
        :submitHandler="submitHandler"
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
  setup(props) {
    const { $api, $_ } = useNuxtApp();
    const route = useRoute();
    let userDetails = {
      first_name: null,
      last_name: null,
      password: null,
      email: null,
      phone_number: null,
      role: null,
    };
    const { data, pending } = $api.users.getUserDetails(route.params.id);

    async function submitHandler(data) {
      try {
        const router = useRouter();
        const route = useRoute();
        await $api.users.updateUser(route.params.id, data);
        router.push("/users");
        $toast.success("Role successfully updated.");
        router.push();
      } catch (error) {
        console.log(error);
      }
    }
    watch(
      () => data.value,
      (data) => {
        userDetails.first_name = data.resource?.first_name;
        userDetails.last_name = data.resource?.last_name;
        userDetails.email = data.resource?.email;
        userDetails.phone_number = data.resource?.phone_number;
        userDetails.role = {
          label: data.resource?.role,
          value: data.resource?.role,
        };
      },
      { deep: true }
    );
    return {
      userDetails,
      pending,
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