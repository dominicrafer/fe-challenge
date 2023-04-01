<template>
  <div class="page">
    <PageHeader title="Customers">
      <!-- <template #left-panel>
        <Tabs :tabs="tabs" :active="activeTab" @changeTab="changeTabAction" />
      </template> -->
      <template #right-panel>
        <NuxtLink
          :to="{
            path: '/customers/create',
          }"
          v-has:customers.action-permission="`customers:write`"
        >
          <Button variant="success" type="button"> Create </Button>
        </NuxtLink>
      </template>
    </PageHeader>
    <div class="page__body">
      <Table
        :loading="pending"
        :pages="
          Math.ceil(data?.resource?.pagination.total_count / params.page_size)
        "
        @sort="customersSortDrawerVisible = true"
        @filter="customersFilterDrawerVisible = true"
        @paginate="paginate"
        @search="searchCustomers"
        :exportable="false"
      >
        <template #table-data>
          <table class="table__data">
            <thead>
              <tr>
                <th align="left">Name</th>
                <th align="left">Contact Name</th>
                <th align="left">Contact Mobile Number</th>
                <th align="left">Contact Email</th>
                <th align="left">Status</th>
                <th align="left">Created At</th>
                <th align="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(customerDetails, index) in data?.resource?.data"
                :key="index"
              >
                <td align="left">{{ customerDetails.name }}</td>
                <td align="left">{{ customerDetails.contact_name }}</td>
                <td align="left">{{ customerDetails.contact_phone_number }}</td>
                <td align="left">{{ customerDetails.contact_email }}</td>
                <td align="left">{{ customerDetails.status }}</td>
                <td align="left">{{ customerDetails.created_at }}</td>
                <td align="center">
                  <div class="table__data-actions">
                    <router-link
                      :to="{
                        name: 'customers-id',
                        params: { id: customerDetails.id },
                      }"
                      v-has:customers.action-permission="`customers:read`"
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
                        v-has:customers.action-permission="`customers:delete`"
                        width="20"
                        height="20"
                        color="#E45959"
                        name="material-symbols:delete-outline"
                        @click="
                          customerDetails.status != 'deleted'
                            ? deleteCustomer(customerDetails.id)
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
      title="Delete Customer"
      type="danger"
      confirmText="Delete"
      @close="deleteConfirmationModalVisible = false"
      @confirm="confirmDelete"
    >
      <template #message
        >Are you sure you want to continue? This cannot be undone.</template
      >
    </ConfirmationModal>
    <CustomersFilterDrawer
      :filters="filters"
      :show="customersFilterDrawerVisible"
      @close="customersFilterDrawerVisible = false"
      @apply="applyFilters"
    />
    <CustomersSortDrawer
      :sorts="sorts"
      :show="customersSortDrawerVisible"
      @close="customersSortDrawerVisible = false"
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
      default: "customers",
    },
  },
  setup() {
    const { $api, $_ } = useNuxtApp();
    const customersFilterDrawerVisible = ref(false);
    const customersSortDrawerVisible = ref(false);
    // PAGINATION
    let search = ref(null);
    let filters = reactive(["name", "contact_name"]);
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

    const { data, pending, refresh } = $api.customers.getCustomers(params, [
      params.page,
    ]);

    function paginate(page) {
      params.page = page;
    }
    // PAGINATION

    // SEARCH USER
    async function searchCustomers(searchValue) {
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
      customersFilterDrawerVisible.value = false;
    }
    function applySorts(appliedSorts) {
      sorts = appliedSorts;
      params.sorts = $_.values(sorts);
      refresh();
      customersSortDrawerVisible.value = false;
    }

    // DELETE POLICY
    const deleteConfirmationModalVisible = ref(false);
    const selectedCustomer = ref(null);
    function deleteCustomer(id) {
      selectedCustomer.value = id;
      deleteConfirmationModalVisible.value = true;
    }

    async function confirmDelete() {
      pending.value = true;
      await $api.customers.deleteCustomer(selectedCustomer.value);
      refresh();
    }
    // DELETE POLICY

    return {
      data,
      pending,
      selectedCustomer,
      deleteCustomer,
      deleteConfirmationModalVisible,
      customersFilterDrawerVisible,
      customersSortDrawerVisible,
      confirmDelete,
      filters,
      sorts,
      params,
      paginate,
      searchCustomers,
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
</style>
