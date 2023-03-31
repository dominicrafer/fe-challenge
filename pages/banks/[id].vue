<template>
  <div class="page">
    <PageHeader backRoute="/banks" title="Edit Bank" />
    <div class="page__body">
      <BanksForm :banksDetails="banksDetails" :submitHandler="submitHandler"    :isLoading="pending"
        edit/>
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
    let banksDetails = {
      account_number: false,
      beneficiary_bank: false,
      account_name: false,
      swift_code: false,
      currency: false,
    };
    const { data, pending } = $api.banks.getBankDetails(
      route.params.id,
      banksDetails
    );
    watch(
      () => data.value,
      (result) => {
        let data = result.resource?.bank;
        banksDetails.account_number = data?.account_number;
        banksDetails.beneficiary_bank = data?.beneficiary_bank;
        banksDetails.account_name = data?.account_name;
        banksDetails.swift_code = data?.swift_code;
        banksDetails.currency = data?.currency;
      }
    );

    async function submitHandler(data) {
      const { $api, $toast } = useNuxtApp();
      try {
        const router = useRouter();
        const route = useRoute();
        await $api.banks.updateBank(route.params.id, data);
        router.push("/banks");
        $toast.success("Bank successfully updated.");
        router.push();
      } catch (error) {
        console.log(error);
      }
    }
    return {
      pending,
      banksDetails,
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
