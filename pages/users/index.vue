<template>
  <div class="page">
    <PageHeader title="Users">
      <!-- <template #left-panel>
        <Tabs :tabs="tabs" :active="activeTab" @changeTab="changeTabAction" />
      </template> -->
      <template #right-panel>
        <router-link
          :to="{
            path: '/users/create',
          }"
        >
          <Button variant="success">Create</Button>
        </router-link>
      </template>
    </PageHeader>
    <div class="page__body">
      <Table
        :loading="pending"
        :pages="
          Math.round(
            data?.resource?.pagination.total_count / pagination.page_size
          )
        "
        @paginate="paginate"
        @search="searchUsers"
        :filterable="false"
        :exportable="false"
        :sortable="false"
      >
        <template #table-data>
          <table class="table__data">
            <thead>
              <tr>
                <th align="left">Name</th>
                <th align="left">Email</th>
                <th align="left">Mobile Number</th>
                <th align="left">Role</th>
                <th align="left">Status</th>
                <th align="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(userDetails, index) in data?.resource?.data"
                :key="index"
              >
                <td align="left">{{ userDetails.name }}</td>
                <td align="left">{{ userDetails.email }}</td>
                <td align="left">{{ userDetails.phone_number }}</td>
                <td align="left">{{ userDetails.role }}</td>
                <td align="left">{{ userDetails.status }}</td>
                <td align="center">
                  <div class="table__data-actions">
                    <router-link
                      :to="{
                        name: 'users-id',
                        params: { id: userDetails.cognito_id },
                      }"
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
    let pagination = reactive({
      page: 1,
      page_size: 10,
      return_count: true,
    });
    const { data, pending, refresh } = $api.users.getUsers(pagination, [
      pagination.page,
    ]);
    function paginate(page) {
      pagination.page = page;
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
      refresh();
    }
    // DELETE POLICY

    // SEARCH USER
    async function searchUsers(search) {
      pending.value = true;
      await $api.users.searchUsers({ like_value: search });
      pending.value = false;
    }
    // SEARCH USER

    return {
      data,
      pending,
      selectedRole,
      deleteRole,
      deleteConfirmationModalVisible,
      confirmDelete,
      pagination,
      paginate,
      searchUsers,
    };
  },
};
</script>

<style lang="postcss" scoped>
.page__body {
  @apply w-full;
}
</style>
