<template>
  <div class="page">
    <PageHeader backRoute="/customers" title="Create Customer" />
    <div class="page__body">
      <CustomerForm :submitHandler="submitHandler" />
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
        await $api.customers.createCustomer(data).then((response) => {
          const router = useRouter();
          router.push("/customers");
          $toast.success("Customer successfully created.");
        });
      } catch (error) {
        console.log(error);
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
