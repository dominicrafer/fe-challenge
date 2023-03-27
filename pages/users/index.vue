<template>
  <div class="page">
    <PageHeader title="Users">
      <!-- <template #left-panel>
        <Tabs :tabs="tabs" :active="activeTab" @changeTab="changeTabAction" />
      </template> -->
      <template #right-panel>
        <NuxtLink
          :to="{
            path: '/users/create',
          }"
          v-has:users.action-permission="`users:write`"
        >
          <Button variant="success" type="button"> Create </Button>
        </NuxtLink>
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
                      v-has:users.action-permission="`users:read`"
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
                        v-has:users.action-permission="`users:delete`"
                        width="20"
                        height="20"
                        color="#E45959"
                        name="material-symbols:delete-outline"
                        @click="deleteUser(userDetails.cognito_id)"
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
      title="Delete User"
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
  props: {
    module: {
      type: String,
      default: "users",
    },
  },
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
    const selectedUser = ref(null);
    function deleteUser(id) {
      selectedUser.value = id;
      deleteConfirmationModalVisible.value = true;
    }

    async function confirmDelete() {
      pending.value = true;
      await $api.users.deleteUser(selectedUser.value);
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
      selectedUser,
      deleteUser,
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
