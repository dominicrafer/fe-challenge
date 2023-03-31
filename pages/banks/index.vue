<template>
  <div class="page">
    <PageHeader title="Banks">
      <template #right-panel>
        <router-link :to="{
          path: '/banks/create',
        }">
          <Button>Create</Button>
        </router-link>
      </template>
    </PageHeader>
    <div class="page__body">
      <Table :loading="pending" :filterable="false" :searchable="false" :exportable="false" :sortable="false"
        paginationType="dynamodb">
        <template #table-data>
          <table class="table__data">
            <thead>
              <tr>
                <th align="left">Account Number</th>
                <th align="left">Beneficiary Bank</th>
                <th align="left">Account Name</th>
                <th align="left">Swift Code</th>
                <th align="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bankDetails, index) in data?.resource?.banks" :key="index">
                <td align="left">{{ bankDetails.account_number }}</td>
                <td align="left">{{ bankDetails.beneficiary_bank }}</td>
                <td align="left">{{ bankDetails.account_name }}</td>
                <td align="left">{{ bankDetails.swift_code }}</td>
                <td align="center">
                  <div class="table__data-actions">
                    <router-link :to="{
                      name: 'banks-id',
                      params: { id: bankDetails.account_number },
                    }">
                      <Icon width="20" height="20" style="color: #29335c" name="material-symbols:preview" />
                    </router-link>
                    <div>
                      <Icon width="20" height="20" color="#E45959" @click="deleteBank(bankDetails.account_number)"
                        name="material-symbols:delete-outline" />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </Table>
    </div>
    <ConfirmationModal :show="deleteConfirmationModalVisible" title="Delete Bank" type="danger" confirmText="Delete"
      @close="deleteConfirmationModalVisible = false" @confirm="confirmDelete">
      <template #message>Are you sure you want to continue? This cannot be undone.</template>
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

    const { data, pending, refresh } = $api.banks.getBanks(
      {
        limit: 10,
        last_evaluated_sort_key: nextEvaluatedKey,
      },
      [nextEvaluatedKey]
    )

    console.log(data)

    function prevPage() {
      nextEvaluatedKey.value = $_.last(previousEvaluatedKey.value);
      if (previousEvaluatedKey.value.length) {
        previousEvaluatedKey.value.pop();
      }
    }
    function nextPage() {
      previousEvaluatedKey.value.push(nextEvaluatedKey.value);
      nextEvaluatedKey.value = $_.last(data?.value?.resource?.banks).account_number;
    }

    // DELETE BUSINESS
    const deleteConfirmationModalVisible = ref(false);
    const selectedBank = ref(null);
    function deleteBank(account_number) {
      selectedBank.value = account_number;
      deleteConfirmationModalVisible.value = true;
    }

    async function confirmDelete() {
      pending.value = true;
      await $api.banks.deleteBank(selectedBank.value);
      refresh();
    }

    return {
      data,
      pending,
      nextPage,
      prevPage,
      deleteBank,
      deleteConfirmationModalVisible,
      confirmDelete
    };
  },
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>