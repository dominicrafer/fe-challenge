<template>
  <div class="page">
    <PageHeader title="Invoices">
      <!-- <template #left-panel>
          <Tabs :tabs="tabs" :active="activeTab" @changeTab="changeTabAction" />
        </template> -->
      <template #right-panel>
        <Popper arrow placement="left">
          <Button variant="success" type="button"> Create </Button>
          <template #content>
            <div class="col__auto">
              <NuxtLink
                :to="{
                  path: '/invoices/manual/create',
                }"
                v-has:invoices.action-permission="`invoices:write`"
              >
                <Button variant="primary" type="button"> Manual </Button>
              </NuxtLink>
              <NuxtLink
                :to="{
                  path: '/invoices/project/create',
                }"
                v-has:invoices.action-permission="`invoices:write`"
              >
                <Button variant="primary" type="button"> Project </Button>
              </NuxtLink>
            </div>
          </template>
        </Popper>
      </template>
    </PageHeader>
    <div class="page__body">
      <Table
        :loading="pending"
        :pages="
          Math.ceil(data?.resource?.pagination.total_count / params.page_size)
        "
        @sort="invoicesSortDrawerVisible = true"
        @filter="invoicesFilterDrawerVisible = true"
        @paginate="paginate"
        @search="searchInvoices"
        :exportable="false"
      >
        <template #table-data>
          <table class="table__data">
            <thead>
              <tr>
                <th align="left">Invoice</th>
                <th align="left">Type</th>
                <th align="left">Project</th>
                <th align="left">Business</th>
                <th align="left">Customer</th>
                <th align="left">Status</th>
                <th align="left">Invoice Date</th>
                <th align="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(invoiceDetails, index) in data?.resource?.data"
                :key="index"
              >
                <td align="left">{{ invoiceDetails.name }}</td>
                <td align="left">{{ invoiceDetails.type }}</td>
                <td align="left">{{ invoiceDetails.project_name }}</td>
                <td align="left">{{ invoiceDetails.business_name }}</td>
                <td align="left">{{ invoiceDetails.customer_name }}</td>
                <td align="left">{{ invoiceDetails.status }}</td>
                <td align="left">{{ invoiceDetails.invoice_date }}</td>
                <td align="center">
                  <div class="table__data-actions">
                    <router-link
                      :to="{
                        name: 'invoices-id',
                        params: { id: invoiceDetails.id },
                      }"
                      v-has:invoices.action-permission="`invoices:read`"
                    >
                      <Icon
                        width="20"
                        height="20"
                        style="color: #29335c"
                        name="material-symbols:preview"
                      />
                    </router-link>
                    <div>
                      <Icon
                        v-has:invoices.action-permission="`invoices:delete`"
                        width="20"
                        height="20"
                        color="#E45959"
                        name="material-symbols:delete-outline"
                        @click="
                          invoiceDetails.status != 'deleted'
                            ? deleteInvoice(invoiceDetails.id)
                            : null
                        "
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </Table>
    </div>
    <ConfirmationModal
      :show="deleteConfirmationModalVisible"
      title="Delete Invoice"
      type="danger"
      confirmText="Delete"
      @close="deleteConfirmationModalVisible = false"
      @confirm="confirmDelete"
    >
      <template #message
        >Are you sure you want to continue? This cannot be undone.</template
      >
    </ConfirmationModal>
    <InvoicesFilterDrawer
      :filters="filters"
      :show="invoicesFilterDrawerVisible"
      @close="invoicesFilterDrawerVisible = false"
      @apply="applyFilters"
    />
    <InvoicesSortDrawer
      :sorts="sorts"
      :show="invoicesSortDrawerVisible"
      @close="invoicesSortDrawerVisible = false"
      @apply="applySorts"
    />
  </div>
</template>

<script>
definePageMeta({
  layout: "default",
});
export default {
  props: {
    module: {
      type: String,
      default: "invoices",
    },
  },
  setup() {
    const { $api, $_ } = useNuxtApp();
    const invoicesFilterDrawerVisible = ref(false);
    const invoicesSortDrawerVisible = ref(false);
    // PAGINATION
    let search = ref(null);
    let filters = reactive([
      "name",
      "project_name",
      "customer_name",
      "business_name",
    ]);
    let sorts = reactive({
      name: "created_at:desc",
    });
    let params = reactive({
      page: 1,
      page_size: 10,
      return_count: true,
      sorts: $_.values(sorts),
      //search_filters
      //sorts
    });

    const { data, pending, refresh } = $api.invoices.getInvoices(params, [
      params.page,
    ]);

    function paginate(page) {
      params.page = page;
    }
    // PAGINATION

    // SEARCH USER
    async function searchInvoices(searchValue) {
      search.value = searchValue;
      if (!searchValue) {
        delete params.search_filters;
      } else {
        params.search_filters = [
          {
            search_keys: filters,
            value: searchValue,
          },
        ];
      }

      refresh();
    }
    // SEARCH USER

    function applyFilters(appliedFilters) {
      filters = appliedFilters.filterBy;
      invoicesFilterDrawerVisible.value = false;
    }
    function applySorts(appliedSorts) {
      sorts = appliedSorts;
      params.sorts = $_.values(sorts);
      refresh();
      invoicesSortDrawerVisible.value = false;
    }

    // DELETE POLICY
    const deleteConfirmationModalVisible = ref(false);
    const selectedInvoice = ref(null);
    function deleteInvoice(id) {
      selectedInvoice.value = id;
      deleteConfirmationModalVisible.value = true;
    }

    async function confirmDelete() {
      pending.value = true;
      await $api.invoices.deleteInvoice(selectedInvoice.value);
      refresh();
    }
    // DELETE POLICY

    return {
      data,
      pending,
      selectedInvoice,
      deleteInvoice,
      deleteConfirmationModalVisible,
      invoicesFilterDrawerVisible,
      invoicesSortDrawerVisible,
      confirmDelete,
      filters,
      sorts,
      params,
      paginate,
      searchInvoices,
      search,
      applyFilters,
      applySorts,
    };
  },
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
.col__auto {
  @apply flex flex-row gap-5 items-end;
}
</style>
