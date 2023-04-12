<template>
  <div class="page">
    <PageHeader backRoute="/invoices" title="Create Project Invoice" />
    <div class="page__body">
      <TemplateInvoiceForm :submitHandler="submitHandler" />
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
        await $api.invoices.createInvoice(data).then((response) => {
          const router = useRouter();
          router.push("/invoices");
          $toast.success("Invoice successfully created.");
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
