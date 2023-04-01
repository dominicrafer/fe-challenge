<template>
  <div class="page">
    <PageHeader backRoute="/customers" title="Edit Customer" />
    <div class="page__body">
      <CustomerForm
        :customerDetails="customerDetails"
        :submitHandler="submitHandler"
        :isLoading="pending"
        edit
      />
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: "default",
});
export default {
  async setup(props) {
    const { $api, $_ } = useNuxtApp();
    const route = useRoute();
    let customerDetails = {
      name: null,
      tin: null,
      address: null,
      contact_name: null,
      contact_phone_number: null,
      contact_email: null,
    };
    const { data, pending } = $api.customers.getCustomerDetails(
      route.params.id,
      customerDetails
    );
    watch(
      () => data.value,
      (result) => {
        let data = result.resource;
        customerDetails.name = data?.name;
        customerDetails.address = data?.address;
        customerDetails.tin = data?.tin;
        customerDetails.contact_name = data?.contact_name;
        customerDetails.contact_phone_number = data?.contact_phone_number;
        customerDetails.contact_email = data?.contact_email;
      }
    );

    async function submitHandler(data) {
      const { $api, $toast } = useNuxtApp();
      try {
        const router = useRouter();
        const route = useRoute();
        await $api.customers.updateCustomer(route.params.id, data);
        router.push("/customers");
        $toast.success("Customer successfully updated.");
        router.push();
      } catch (error) {
        console.log(error);
      }
    }
    return {
      pending,
      customerDetails,
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
