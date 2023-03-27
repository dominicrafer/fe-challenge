<template>
  <div class="page">
    <PageHeader backRoute="/businesses" title="Create Business" />
    <div class="page__body">
      <BusinessesForm :submitHandler="submitHandler" />
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
        // await $api.roles.createRole(data).then((response) => {
        //     const router = useRouter();
        //     router.push("/businesses");
        //     $toast.success("Business successfully created.");
        // });
      }
      catch (error) {
        console.log(error);
      }
    }
    return { submitHandler };
  }
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>