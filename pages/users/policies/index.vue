<template>
  <div class="page">
    <PageHeader title="Policies">
      <template #right-panel>
        <router-link :to="{
          path: '/users/policies/create',
        }" v-has:users.action-permission="`policies:write`">
          <Button variant="success">New Policy</Button>
        </router-link>
      </template>
    </PageHeader>
    <div class="page__body">
      <Table :loading="pending" paginationType="dynamodb" @nextPage="nextPage" @prevPage="prevPage" :searchable="false"
        :filterable="false" :sortable="false" :exportable="false">
        <template #table-data>
          <table class="table__data">
            <thead>
              <tr>
                <th align="left">Policy</th>
                <th align="left">Description</th>
                <th align="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(policyDetails, index) in data?.resource?.policies" :key="index">
                <td align="left">{{ policyDetails.policy }}</td>
                <td align="left">{{ policyDetails.description }}</td>
                <td align="center">
                  <div class="table__data-actions">
                    <router-link :to="{
                      name: 'users-policies-id',
                      params: { id: policyDetails.policy },
                    }" v-has:users.action-permission="`users:read`">
                      <div class="flex items-center justify-center gap-1 border-b border-primary">
                        <span class="text-primary">Edit </span>
                        <Icon width="20" height="20" color="#29335c" name="material-symbols:edit" />
                      </div>
                    </router-link>

                    <div class="flex items-center justify-center gap-1 border-b border-paprika"
                      @click="deletePolicy(policyDetails.policy)">
                      <span class="text-paprika">Delete</span>
                      <Icon v-has:users.action-permission="`roles:delete`" width="20" height="20" color="#E45959"
                        name="material-symbols:delete-outline" />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </Table>
      <ConfirmationModal :show="deleteConfirmationModalVisible" title="Delete Policy" type="danger" confirmText="Delete"
        @close="deleteConfirmationModalVisible = false" @confirm="confirmDelete">
        <template #message>Are you sure you want to continue? This cannot be undone.</template>
      </ConfirmationModal>
    </div>
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
    const { data, pending, refresh } = $api.policies.getPolicies(
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
      nextEvaluatedKey.value = $_.last(data?.value?.resource?.policies).policy;
    }
    // PAGINATION

    // DELETE POLICY
    const deleteConfirmationModalVisible = ref(false);
    const selectedPolicy = ref(null);
    function deletePolicy(id) {
      selectedPolicy.value = id;
      deleteConfirmationModalVisible.value = true;
    }

    async function confirmDelete() {
      pending.value = true;
      await $api.policies.deletePolicy(selectedPolicy.value);
      refresh();
    }
    // DELETE POLICY
    return {
      data,
      pending,
      nextPage,
      prevPage,
      selectedPolicy,
      deletePolicy,
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
