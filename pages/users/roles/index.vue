<template>
  <div class="page">
    <PageHeader title="Roles">
      <template #right-panel>
        <router-link
          :to="{
            path: '/users/roles/create',
          }"
        >
          <Button variant="success">Create</Button>
        </router-link>
      </template>
    </PageHeader>
    <div class="page__body">
      <Table
        :loading="isLoading"
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
                <th align="left">Role</th>
                <th align="left">Description</th>
                <th align="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(roleDetails, index) in data?.resource?.roles" :key="index">
                <td align="left">{{roleDetails.role}}</td>
                <td align="left">{{roleDetails.description}}</td>
                <td align="center">
                  <div class="table__data-actions">
                    <!-- <router-link
                      :to="{
                        name: 'users-roles-id',
                        params: { id: roleDetails.role },
                      }"
                    > -->
                      <Icon
                        width="20"
                        height="20"
                        style="color: #29335c"
                        name="material-symbols:preview"
                      />
                    <!-- </router-link> -->
                    <div>
                      <Icon
                        width="20"
                        height="20"
                        name="material-symbols:delete-outline"
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
    const { data, pending, refresh} = $api.roles.getRoles(
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
    const deleteConfirmationModalVisible = ref(false)
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