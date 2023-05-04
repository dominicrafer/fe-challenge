<template>
  <div class="page">
    <PageHeader title="Roles">
      <template #right-panel>
        <router-link
          :to="{
            path: '/users/roles/create',
          }"
          v-has:users.action-permission="`roles:write`"
        >
          <Button variant="success">New Role</Button>
        </router-link>
      </template>
    </PageHeader>
    <div class="page__body">
      <Table
        :loading="pending"
        @nextPage="nextPage"
        @prevPage="prevPage"
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
              <tr
                v-for="(roleDetails, index) in data?.resource?.roles"
                :key="index"
              >
                <td align="left">{{ roleDetails.role }}</td>
                <td align="left">{{ roleDetails.description }}</td>
                <td align="center">
                  <div class="table__data-actions">
                    <router-link
                      :to="{
                        name: 'users-roles-id',
                        params: { id: roleDetails.role },
                      }"
                      v-has:roles.action-permission="[
                        `roles:edit`,
                        'roles:read',
                      ]"
                    >
                      <div
                        class="flex items-center justify-center gap-1 border-b border-primary"
                      >
                        <span class="text-primary">Edit </span>
                        <Icon
                          width="20"
                          height="20"
                          color="#29335c"
                          name="material-symbols:edit"
                        />
                      </div>
                    </router-link>

                    <div
                      class="flex items-center justify-center gap-1 border-b border-red-500"
                      @click="deleteRole(roleDetails.role)"
                    >
                      <span class="text-red-500">Delete</span>
                      <Icon
                        v-has:roles.action-permission="`roles:delete`"
                        width="20"
                        height="20"
                        color="#EF4444"
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
    <ConfirmationModal
      :show="deleteConfirmationModalVisible"
      title="Delete Role"
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
    const { $api, $_, $toast } = useNuxtApp();
    // PAGINATION
    let previousEvaluatedKey = ref([]);
    let nextEvaluatedKey = ref(null);
    const { data, pending, refresh } = $api.roles.getRoles(
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
      nextEvaluatedKey.value = $_.last(data?.value?.resource?.roles).role;
    }
    // PAGINATION

    // DELETE POLICY
    const deleteConfirmationModalVisible = ref(false);
    const selectedRole = ref(null);
    function deleteRole(id) {
      selectedRole.value = id;
      deleteConfirmationModalVisible.value = true;
    }

    async function confirmDelete() {
      pending.value = true;
      await $api.roles.deleteRole(selectedRole.value);
      $toast.success("Role successfully deleted");
      refresh();
    }
    // DELETE POLICY
    return {
      data,
      pending,
      nextPage,
      prevPage,
      selectedRole,
      deleteRole,
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
