<template>
  <div class="page">
    <PageHeader backRoute="/invoices" title="Edit Project Invoice" />
    <div class="page__body">
      <TemplateInvoiceForm
        v-if="!pending"
        :invoiceDetails="invoiceDetails"
        :submitHandler="submitHandler"
        :isLoading="pending"
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
    let selectedProject = {
      label: null,
      value: {
        account_manager_name: null,
        account_manager_uuid: null,
        bank_account_number: null,
        business_name: null,
        customer_id: null,
        customer_name: null,
        id: null,
        name: null,
        service_type: null,
      },
    };
    let invoiceDetails = {
      business_details: {
        name: null,
        address: null,
        due_date_duration: null,
        invoice_number_template: null,
        tax: null,
        tin: null,
        business_contact_name: null,
        business_contact_email: null,
        business_contact_phone_number: null,
        business_contact_uuid: null,
        notes: null,
      },
      bank_details: {
        account_number: null,
        beneficiary_bank: null,
        swift_code: null,
        account_name: null,
        currency: null,
      },
      customer_details: {
        id: null,
        name: null,
        tin: null,
        address: null,
        customer_contact_name: null,
        customer_contact_email: null,
        customer_contact_phone_number: null,
        references: "N/A",
      },
      approvers: [],
      project_id: null,
      project_name: null,
      project_service_type: null,
      business_name: null,
      bank_account_number: null,
      customer_name: null,
      line_item_details: [],
      invoice_excluded_vat_amount: null,
      invoice_vat_amount: null,
      invoice_amount: null,
      name: null,
      status: null,
      invoice_date: null,
      invoice_due_date: null,
    };
    const { data, pending } = $api.invoices.getInvoiceDetails(
      route.params.id,
      invoiceDetails
    );
    watch(
      () => data.value,
      (result) => {
        let data = result.resource;
        invoiceDetails.business_details = {
          name: data?.business_details?.name,
          address: data?.business_details?.address,
          due_date_duration: data?.business_details?.due_date_duration,
          invoice_number_template:
            data?.business_details?.invoice_number_template,
          tax: data?.business_details?.tax,
          tin: data?.business_details?.tin,
          business_contact_name: data?.business_details?.business_contact_name,
          business_contact_email:
            data?.business_details?.business_contact_email,
          business_contact_phone_number:
            data?.business_details?.business_contact_phone_number,
          business_contact_uuid: data?.business_details?.business_contact_uuid,
          notes: data?.business_details?.notes,
        };
        invoiceDetails.bank_details = {
          account_number: data?.bank_details?.account_number,
          beneficiary_bank: data?.bank_details?.beneficiary_bank,
          swift_code: data?.bank_details?.swift_code,
          account_name: data?.bank_details?.account_name,
          currency: data?.bank_details?.currency,
        };

        invoiceDetails.customer_details = {
          id: data?.customer_details?.id,
          name: data?.customer_details?.name,
          tin: data?.customer_details?.tin,
          address: data?.customer_details?.address,
          customer_contact_name: data?.customer_details?.customer_contact_name,
          customer_contact_email:
            data?.customer_details?.customer_contact_email,
          customer_contact_phone_number:
            data?.customer_details?.customer_contact_phone_number,
          references: data?.customer_details?.references,
        };

        $_.forEach(data?.line_item_details, function (item) {
          invoiceDetails.line_item_details.push({
            description: item.description,
            value: item.value,
          });
        });

        $_.forEach(data?.approvers, function (item) {
          invoiceDetails.approvers.push({
            approver: item.approver,
            approver_email: item.approver_email,
            approver_uuid: item.approver_uuid,
            type: item.type,
          });
        });

        invoiceDetails.project_id = data?.project_id;
        invoiceDetails.project_name = data?.project_name;
        invoiceDetails.project_service_type = data?.project_service_type;
        invoiceDetails.business_name = data?.business_name;
        invoiceDetails.bank_account_number = data?.bank_account_number;
        invoiceDetails.customer_name = data?.customer_name;
        invoiceDetails.invoice_excluded_vat_amount =
          data?.invoice_excluded_vat_amount;
        invoiceDetails.invoice_vat_amount = data?.invoice_vat_amount;
        invoiceDetails.invoice_amount = data?.invoice_amount;
        invoiceDetails.name = data?.name;
        invoiceDetails.status = data?.status;
        invoiceDetails.invoice_date = data?.invoice_date;
        invoiceDetails.invoice_due_date = data?.invoice_due_date;

        // let am_details = $_.find(invoiceDetails?.approvers, {
        //   type: "account_manager",
        // });

        // selectedProject.label = `${invoiceDetails?.project_name} - ${invoiceDetails?.customer_name}`;
        // selectedProject.value = {
        //   account_manager_uuid: am_details.approver_uuid,
        //   account_manager_name: am_details.approver_uuid,
        //   bank_account_number: invoiceDetails?.bank_account_number,
        //   business_name: invoiceDetails?.business_name,
        //   customer_id: invoiceDetails?.customer_details?.id,
        //   customer_name: invoiceDetails?.customer_name,
        //   id: invoiceDetails?.project_id,
        //   name: invoiceDetails?.project_name,
        //   service_type: invoiceDetails?.project_service_type,
        // };
      },
      {
        deep: true,
      }
    );

    async function submitHandler(data) {
      const { $api, $toast } = useNuxtApp();
      try {
        const router = useRouter();
        const route = useRoute();
        await $api.invoices.updateInvoice(route.params.id, data);
        router.push("/invoices");
        $toast.success("Invoice successfully updated.");
        router.push();
      } catch (error) {
        console.log(error);
      }
    }
    return {
      pending,
      invoiceDetails,
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
