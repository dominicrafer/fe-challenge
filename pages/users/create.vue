<template>
  <div class="page">
    <PageHeader backRoute="/users" title="Users" />
    <div class="page__body">
      <UsersForm :submitHandler="submitHandler" />
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
        await $api.users.createUser(data).then((response) => {
          const router = useRouter();
          router.push("/users");
          $toast.success("User successfully created.");
        });
      } catch (error) {
        console.log(error);
      }
    }
    return {
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