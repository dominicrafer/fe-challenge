<template>
  <div class="page">
    <PageHeader title="Businesses">
      <template #right-panel>
        <NuxtLink
          :to="{
            path: '/businesses/create',
          }"
          v-has:businesses.action-permission="`businesses:write`"
        >
          <Button variant="success" type="button"> Create </Button>
        </NuxtLink>
      </template>
    </PageHeader>
    <div class="page__body">
      <Table
        :loading="pending"
        :filterable="false"
        :searchable="false"
        :exportable="false"
        :sortable="false"
        paginationType="dynamodb"
      >
        <template #table-data>
          <table class="table__data">
            <thead>
              <tr>
                <th align="left">Name</th>
                <th align="left">Address</th>
                <th align="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(businessDetails, index) in data?.resource?.businesses"
                :key="index"
              >
                <td align="left">{{ businessDetails.business }}</td>
                <td align="left">{{ businessDetails.address }}</td>
                <td align="center">
                  <div class="table__data-actions">
                    <router-link
                      :to="{
                        name: 'businesses-id',
                        params: { id: businessDetails.business },
                      }"
                      v-has:businesses.action-permission="`businesses:read`"
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
                        width="20"
                        height="20"
                        color="#E45959"
                        @click="deleteBusiness(businessDetails.business)"
                        name="material-symbols:delete-outline"
                        v-has:businesses.action-permission="`businesses:delete`"
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
      title="Delete Business"
      type="danger"
      confirmText="Delete"
      @close="deleteConfirmationModalVisible = false"
      @confirm="confirmDelete"
    >
      <template #message
        >Are you sure you want to continue? This cannot be undone.</template
      >
    </ConfirmationModal>
  </div>
</template>

<script>
definePageMeta({
  layout: "default",
});
export default {
  setup() {
    const { $api, $_ } = useNuxtApp();

    // PAGINATION
    let previousEvaluatedKey = ref([]);
    let nextEvaluatedKey = ref(null);

    const { data, pending, refresh } = $api.businesses.getBusinesses(
      {
        limit: 10,
        last_evaluated_sort_key: nextEvaluatedKey,
      },
      [nextEvaluatedKey]
    );

    function prevPage() {
      nextEvaluatedKey.value = $_.last(previousEvaluatedKey.value);
      if (previousEvaluatedKey.value.length) {
        previousEvaluatedKey.value.pop();
      }
    }
    function nextPage() {
      previousEvaluatedKey.value.push(nextEvaluatedKey.value);
      nextEvaluatedKey.value = $_.last(
        data?.value?.resource?.businesses
      ).business;
    }

    // DELETE BUSINESS
    const deleteConfirmationModalVisible = ref(false);
    const selectedBusiness = ref(null);
    function deleteBusiness(business) {
      selectedBusiness.value = business;
      deleteConfirmationModalVisible.value = true;
    }

    async function confirmDelete() {
      pending.value = true;
      await $api.businesses.deleteBusiness(selectedBusiness.value);
      refresh();
    }

    return {
      data,
      pending,
      nextPage,
      prevPage,
      deleteBusiness,
      deleteConfirmationModalVisible,
      confirmDelete,
    };
  },
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>
