<template>
  <div class="page">
    <PageHeader backRoute="/banks" title="Create Bank" />
    <div class="page__body">
      <BanksForm :submitHandler="submitHandler" />
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
        await $api.banks.createBank(data).then((response) => {
          const router = useRouter();
          router.push("/banks");
          $toast.success("Bank successfully created.");
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
