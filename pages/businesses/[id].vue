<template>
  <div class="page">
    <PageHeader backRoute="/businesses" title="Edit Business" />
    <div class="page__body">
      <BusinessesForm
        :businessDetails="businessDetails"
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
    let businessDetails = {
      business: null,
      business_name: null,
      address: null,
      services: [],
      approval_heirarchy: [],
      due_date_duration: null,
      follow_up_intervals: null,
      invoice_number_template: null,
      tax: null,
      tin: null,
      note: null,
    };
    const { data, pending } = $api.businesses.getBusinessDetails(
      route.params.id,
      businessDetails
    );
    watch(
      () => data.value,
      (result) => {
        let data = result.resource?.business;
        businessDetails.business = data?.business;
        businessDetails.business_name = data?.business_name;
        businessDetails.address = data?.address;

        $_.forEach(data?.services, (item) => {
          businessDetails.services.push({
            name: item.service,
            description: item.description,
          });
        });
        $_.forEach(data?.approval_heirarchy, (item) => {
          businessDetails.approval_heirarchy.push(item);
        });

        businessDetails.approval_heirarchy = data?.approval_heirarchy;
        businessDetails.due_date_duration = data?.due_date_duration;
        businessDetails.follow_up_intervals = data?.follow_up_intervals;
        businessDetails.invoice_number_template = data?.invoice_number_template;
        businessDetails.tax = data?.tax;
        businessDetails.tin = data?.tin;
        businessDetails.notes = data?.notes;
      }
    );

    async function submitHandler(data) {
      const { $api, $toast } = useNuxtApp();
      try {
        const router = useRouter();
        const route = useRoute();
        await $api.businesses.updateBusiness(route.params.id, data);
        router.push("/businesses");
        $toast.success("Business successfully updated.");
        router.push();
      } catch (error) {
        console.log(error);
      }
    }
    return {
      pending,
      businessDetails,
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
